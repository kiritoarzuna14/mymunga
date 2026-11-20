"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconCheck, IconLock } from "./icons";
import { readProgress, subscribe } from "@/lib/library";
import { formatThaiDate } from "@/lib/format";
import type { ChapterSummary } from "@/lib/content/types";

interface ChapterListProps {
  storySlug: string;
  chapters: ChapterSummary[];
}

export function ChapterList({ storySlug, chapters }: ChapterListProps) {
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    function sync() {
      setCurrent(readProgress()[storySlug]?.chapterNumber ?? null);
    }
    sync();
    return subscribe(sync);
  }, [storySlug]);

  return (
    <ol className="chapter-list">
      {chapters.map((chapter) => {
        const isCurrent = current === chapter.number;
        const isRead = current !== null && chapter.number < current;
        return (
          <li key={chapter.id}>
            <Link
              href={`/read/${storySlug}/${chapter.number}`}
              className={isCurrent ? "chapter-row is-current" : "chapter-row"}
              aria-current={isCurrent ? "true" : undefined}
            >
              <span className="chapter-row__number">{String(chapter.number).padStart(2, "0")}</span>
              <span className="chapter-row__body">
                <strong>{chapter.title}</strong>
                <small>
                  {formatThaiDate(chapter.publishedAt)}
                  {isRead ? " · อ่านแล้ว" : isCurrent ? " · กำลังอ่าน" : ""}
                </small>
              </span>
              {isRead ? (
                <span className="chapter-row__state is-read" aria-label="อ่านแล้ว">
                  <IconCheck size={16} />
                </span>
              ) : chapter.isFree ? (
                <span className="badge badge--free">ฟรี</span>
              ) : (
                <span className="badge badge--lock">
                  <IconLock size={12} /> {chapter.priceCredits}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
