"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ComicPage } from "../comic-page";
import { ChapterSheet } from "./chapter-sheet";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconFullscreen,
  IconList,
} from "../icons";
import { useAutoHideChrome, useWakeLock } from "@/lib/hooks";
import { isUnlocked, saveProgress } from "@/lib/library";
import type { ChapterSummary } from "@/lib/content/types";

interface MangaReaderProps {
  storySlug: string;
  storyTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  pages: number;
  chapters: ChapterSummary[];
}

export function MangaReader({
  storySlug,
  storyTitle,
  chapterNumber,
  chapterTitle,
  pages,
  chapters,
}: MangaReaderProps) {
  const [current, setCurrent] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const { visible, toggle } = useAutoHideChrome();
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timer = useRef<number | null>(null);
  useWakeLock();

  const persist = useCallback(
    (page: number) => {
      saveProgress({ storySlug, chapterNumber, ratio: page / pages, updatedAt: Date.now() });
    },
    [chapterNumber, pages, storySlug],
  );

  // คำนวณหน้าปัจจุบันจากตำแหน่ง scroll โดยตรง (ไม่พึ่ง rAF/IntersectionObserver
  // ซึ่งถูก throttle ได้เมื่อแท็บอยู่เบื้องหลัง)
  useEffect(() => {
    let lastRun = 0;
    function onScroll() {
      const now = Date.now();
      if (now - lastRun < 80) return;
      lastRun = now;

      const probe = window.scrollY + window.innerHeight * 0.45;
      let page = 1;
      pageRefs.current.forEach((node, index) => {
        if (node && node.offsetTop <= probe) page = index + 1;
      });
      setCurrent(page);

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => persist(page), 350);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [persist]);

  function goTo(page: number) {
    const clamped = Math.min(Math.max(Math.round(page), 1), pages);
    pageRefs.current[clamped - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrent(clamped);
  }

  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawer]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawer(false);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === "ArrowDown") {
        event.preventDefault();
        goTo(current + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp" || event.key === "ArrowUp") {
        event.preventDefault();
        goTo(current - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, pages]);

  // แตะกลางจอเพื่อซ่อน/แสดง chrome (ไม่ยุ่งกับการเลื่อนอ่าน)
  function handleTap(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a, button, input")) return;
    toggle();
  }

  const progress = Math.round((current / pages) * 100);
  const next = chapters.find((chapter) => chapter.number === chapterNumber + 1);
  const prev = chapters.find((chapter) => chapter.number === chapterNumber - 1);

  return (
    <div className="reader reader--manga">
      <div className={visible ? "reader-top" : "reader-top is-hidden"}>
        <Link href={`/stories/${storySlug}`} className="reader-back" aria-label="กลับไปหน้ารายละเอียดเรื่อง">
          <IconArrowLeft size={19} />
        </Link>
        <div className="reader-titles">
          <strong>{storyTitle}</strong>
          <small>
            ตอนที่ {chapterNumber} · {chapterTitle}
          </small>
        </div>
        <button
          type="button"
          className="reader-icon"
          aria-label="สลับโหมดเต็มหน้าจอ"
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen();
            else void document.documentElement.requestFullscreen?.().catch(() => undefined);
          }}
        >
          <IconFullscreen size={19} />
        </button>
      </div>

      <div className={visible ? "reader-progress" : "reader-progress is-hidden"} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="reader-pages" onClick={handleTap}>
        {Array.from({ length: pages }, (_, index) => {
          const page = index + 1;
          return (
            <div
              key={page}
              data-page={page}
              ref={(node) => {
                pageRefs.current[index] = node;
              }}
              className="reader-page"
            >
              <ComicPage seed={storySlug} page={page} total={pages} />
              <span className="reader-page__number">{page}</span>
            </div>
          );
        })}
      </div>

      <div className="chapter-end">
        <p className="eyebrow">
          <IconCheck size={13} /> จบตอนที่ {chapterNumber}
        </p>
        <h2>{chapterTitle}</h2>
        <div className="chapter-end__actions">
          {next ? (
            <Link className="primary" href={`/read/${storySlug}/${next.number}`}>
              ตอนถัดไป · {next.title} <IconChevronRight size={16} />
            </Link>
          ) : (
            <Link className="primary" href={`/stories/${storySlug}`}>
              กลับไปสารบัญ <IconChevronRight size={16} />
            </Link>
          )}
          {prev ? (
            <Link className="ghost" href={`/read/${storySlug}/${prev.number}`}>
              <IconChevronLeft size={16} /> ตอนก่อน
            </Link>
          ) : null}
          <Link className="ghost" href={`/stories/${storySlug}`}>
            <IconList size={16} /> สารบัญ
          </Link>
        </div>
      </div>

      <div className={visible ? "reader-bar" : "reader-bar is-hidden"} role="group" aria-label="ควบคุมการอ่าน">
        <button type="button" className="reader-bar__btn" onClick={() => setDrawer(true)} aria-label="เปิดสารบัญตอน">
          <IconList size={19} />
        </button>
        <button
          type="button"
          className="reader-bar__btn"
          onClick={() => goTo(current - 1)}
          disabled={current <= 1}
          aria-label="หน้าก่อน"
        >
          <IconChevronLeft size={20} />
        </button>
        <div className="reader-bar__center">
          <span>
            หน้า {current} / {pages}
          </span>
          <input
            className="reader-slider"
            type="range"
            min={1}
            max={pages}
            value={current}
            onChange={(event) => goTo(Number(event.target.value))}
            aria-label="เลื่อนไปยังหน้า"
          />
        </div>
        <button
          type="button"
          className="reader-bar__btn"
          onClick={() => goTo(current + 1)}
          disabled={current >= pages}
          aria-label="หน้าถัดไป"
        >
          <IconChevronRight size={20} />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        หน้า {current} จาก {pages}
      </p>

      {drawer && (
        <ChapterSheet
          storySlug={storySlug}
          chapters={chapters}
          current={chapterNumber}
          isUnlocked={isUnlocked}
          onClose={() => setDrawer(false)}
        />
      )}
    </div>
  );
}
