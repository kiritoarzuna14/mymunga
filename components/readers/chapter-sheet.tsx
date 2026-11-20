"use client";

import Link from "next/link";
import { IconCheck, IconClose, IconLock } from "../icons";
import { formatThaiDate } from "@/lib/format";
import type { ChapterSummary } from "@/lib/content/types";

interface ChapterSheetProps {
  storySlug: string;
  chapters: ChapterSummary[];
  current: number;
  isUnlocked?: (chapterId: string) => boolean;
  onClose: () => void;
}

export function ChapterSheet({ storySlug, chapters, current, isUnlocked, onClose }: ChapterSheetProps) {
  return (
    <div className="sheet-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="สารบัญตอน">
        <div className="sheet__head">
          <div>
            <p className="eyebrow">CHAPTERS</p>
            <h2>สารบัญ · {chapters.length} ตอน</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="ปิดสารบัญ">
            <IconClose size={20} />
          </button>
        </div>
        <ol className="sheet__list">
          {chapters.map((chapter) => {
            const active = chapter.number === current;
            const locked = !chapter.isFree && !isUnlocked?.(chapter.id);
            return (
              <li key={chapter.id}>
                <Link
                  href={`/read/${storySlug}/${chapter.number}`}
                  className={active ? "sheet-row active" : "sheet-row"}
                  aria-current={active ? "true" : undefined}
                  onClick={onClose}
                >
                  <span className="sheet-row__number">{String(chapter.number).padStart(2, "0")}</span>
                  <span className="sheet-row__body">
                    <strong>{chapter.title}</strong>
                    <small>{formatThaiDate(chapter.publishedAt)}</small>
                  </span>
                  {active ? (
                    <span className="sheet-row__state">
                      <IconCheck size={16} /> กำลังอ่าน
                    </span>
                  ) : locked ? (
                    <IconLock size={15} />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
