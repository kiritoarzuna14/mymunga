"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChapterSheet } from "./chapter-sheet";
import {
  IconArrowLeft,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconList,
  IconType,
} from "../icons";
import { useAutoHideChrome, useWakeLock } from "@/lib/hooks";
import {
  defaultReaderSettings,
  isUnlocked,
  readProgress,
  readReaderSettings,
  saveProgress,
  saveReaderSettings,
  type ReaderSettings,
} from "@/lib/library";
import type { ChapterSummary } from "@/lib/content/types";

interface NovelReaderProps {
  storySlug: string;
  storyTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  paragraphs: string[];
  chapters: ChapterSummary[];
}

export function NovelReader({
  storySlug,
  storyTitle,
  chapterNumber,
  chapterTitle,
  paragraphs,
  chapters,
}: NovelReaderProps) {
  const [settings, setSettings] = useState<ReaderSettings>(defaultReaderSettings);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { visible } = useAutoHideChrome();
  const lastSave = useRef(0);
  useWakeLock();

  useEffect(() => {
    const stored = readReaderSettings();
    setSettings(stored);
    const saved = readProgress()[storySlug];
    if (saved && saved.chapterNumber === chapterNumber && saved.ratio > 0.02) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * saved.ratio, behavior: "auto" });
    }
  }, [chapterNumber, storySlug]);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      setProgress(ratio);
      const now = Date.now();
      if (now - lastSave.current > 600) {
        lastSave.current = now;
        saveProgress({ storySlug, chapterNumber, ratio, updatedAt: now });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapterNumber, storySlug]);

  // ล็อกการเลื่อนเบื้องหลังขณะเปิด sheet
  useEffect(() => {
    if (!showSettings && !drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showSettings, drawer]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSettings(false);
        setDrawer(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function update(patch: Partial<ReaderSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveReaderSettings(next);
  }

  const next = chapters.find((chapter) => chapter.number === chapterNumber + 1);
  const prev = chapters.find((chapter) => chapter.number === chapterNumber - 1);

  return (
    <div className={`reader reader--novel reader--${settings.theme}`}>
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
          aria-expanded={showSettings}
          aria-label="ตั้งค่าการอ่าน"
          onClick={() => setShowSettings(true)}
        >
          <IconType size={20} />
        </button>
      </div>

      <div className={visible ? "reader-progress" : "reader-progress is-hidden"} aria-hidden="true">
        <span style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <article
        className={`novel-body novel-body--${settings.fontSize} novel-body--${settings.lineHeight}`}
        lang="th"
      >
        <p className="novel-eyebrow">
          {storyTitle} · ตอนที่ {chapterNumber}
        </p>
        <h1>{chapterTitle}</h1>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      <div className="chapter-end">
        <p className="eyebrow">
          <IconCheck size={13} /> จบตอนที่ {chapterNumber}
        </p>
        <h2>{chapterTitle}</h2>
        <div className="chapter-end__actions">
          {next ? (
            <Link className="primary" href={`/read/${storySlug}/${next.number}`}>
              ตอนถัดไป <IconChevronRight size={16} />
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

      <div className={visible ? "reader-bar reader-bar--novel" : "reader-bar reader-bar--novel is-hidden"} role="status">
        <button type="button" className="reader-bar__btn small" onClick={() => setDrawer(true)} aria-label="เปิดสารบัญตอน">
          <IconList size={18} />
        </button>
        <span className="reader-bar__percent">อ่านแล้ว {Math.round(progress * 100)}%</span>
        <div className="reader-track" aria-hidden="true">
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <button type="button" className="reader-bar__btn small" onClick={() => setShowSettings(true)} aria-label="ตั้งค่าการอ่าน">
          <IconType size={18} />
        </button>
      </div>

      {showSettings && (
        <div className="sheet-overlay" onClick={(event) => event.target === event.currentTarget && setShowSettings(false)}>
          <div className="sheet sheet--settings" role="dialog" aria-modal="true" aria-label="ตั้งค่าการอ่าน">
            <div className="sheet__head">
              <div>
                <p className="eyebrow">READING</p>
                <h2>ตั้งค่าการอ่าน</h2>
              </div>
              <button type="button" className="icon-btn" onClick={() => setShowSettings(false)} aria-label="ปิดการตั้งค่า">
                <IconClose size={20} />
              </button>
            </div>

            <div className="setting-group">
              <span>ขนาดตัวอักษร</span>
              <div className="segmented">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={settings.fontSize === size ? "active" : undefined}
                    aria-pressed={settings.fontSize === size}
                    onClick={() => update({ fontSize: size })}
                  >
                    {size === "sm" ? "เล็ก" : size === "md" ? "ปกติ" : "ใหญ่"}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <span>ระยะบรรทัด</span>
              <div className="segmented">
                {(["tight", "normal", "loose"] as const).map((lineHeight) => (
                  <button
                    key={lineHeight}
                    type="button"
                    className={settings.lineHeight === lineHeight ? "active" : undefined}
                    aria-pressed={settings.lineHeight === lineHeight}
                    onClick={() => update({ lineHeight })}
                  >
                    {lineHeight === "tight" ? "แน่น" : lineHeight === "normal" ? "ปกติ" : "โปร่ง"}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <span>ธีม</span>
              <div className="segmented">
                {(["light", "sepia", "dark"] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={settings.theme === theme ? "active" : undefined}
                    aria-pressed={settings.theme === theme}
                    onClick={() => update({ theme })}
                  >
                    {theme === "light" ? "สว่าง" : theme === "sepia" ? "กระดาษ" : "มืด"}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="ghost small sheet__reset" onClick={() => update(defaultReaderSettings)}>
              รีเซ็ตค่าเริ่มต้น
            </button>
          </div>
        </div>
      )}

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
