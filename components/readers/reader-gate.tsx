"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isUnlocked, unlockChapter } from "@/lib/library";
import type { Chapter, ChapterSummary } from "@/lib/content/types";
import { MangaReader } from "./manga-reader";
import { NovelReader } from "./novel-reader";
import { IconArrowLeft, IconLock, IconPlay } from "../icons";

interface ReaderGateProps {
  chapter: Chapter;
  chapters: ChapterSummary[];
}

export function ReaderGate({ chapter, chapters }: ReaderGateProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(chapter.isFree || isUnlocked(chapter.id));
  }, [chapter.id, chapter.isFree]);

  if (allowed === null) {
    return <div className="reader-loading">กำลังเปิดตอน...</div>;
  }

  if (!allowed) {
    return (
      <div className="paywall">
        <div className="paywall__preview" aria-hidden="true">
          <div className="paywall__blur" />
        </div>
        <div className="paywall__card">
          <span className="paywall__icon">
            <IconLock size={22} />
          </span>
          <p className="eyebrow">ตอนนี้ต้องปลดล็อก</p>
          <h1>
            ตอนที่ {chapter.number} · {chapter.title}
          </h1>
          <p>
            ปลดล็อกด้วย {chapter.priceCredits} เครดิต แล้วอ่านซ้ำได้ตลอด พร้อมติดตามความคืบหน้าข้ามอุปกรณ์
          </p>
          <button
            type="button"
            className="primary"
            onClick={() => {
              unlockChapter(chapter.id);
              setAllowed(true);
            }}
          >
            <IconPlay size={16} /> ปลดล็อกตอนนี้ · {chapter.priceCredits} เครดิต
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              unlockChapter(chapter.id);
              setAllowed(true);
            }}
          >
            ใช้โหมดตัวอย่าง (ยังไม่มีการชำระเงิน)
          </button>
          <Link href={`/stories/${chapter.storySlug}`} className="ghost link">
            <IconArrowLeft size={15} /> กลับไปสารบัญ
          </Link>
          <p className="paywall__note">
            ระบบเครดิตและการชำระเงินจริงยังไม่เปิดใช้งาน — การปลดล็อกนี้เก็บไว้ในเครื่องนี้เท่านั้นเพื่อทดสอบหน้าอ่าน
          </p>
        </div>
      </div>
    );
  }

  if (chapter.body.kind === "novel") {
    return (
      <NovelReader
        storySlug={chapter.storySlug}
        storyTitle={chapter.storyTitle}
        chapterNumber={chapter.number}
        chapterTitle={chapter.title}
        paragraphs={chapter.body.paragraphs}
        chapters={chapters}
      />
    );
  }

  return (
    <MangaReader
      storySlug={chapter.storySlug}
      storyTitle={chapter.storyTitle}
      chapterNumber={chapter.number}
      chapterTitle={chapter.title}
      pages={chapter.body.pages}
      chapters={chapters}
    />
  );
}
