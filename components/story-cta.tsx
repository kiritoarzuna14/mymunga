"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconPlay } from "./icons";
import { readProgress, subscribe } from "@/lib/library";
import type { ChapterSummary } from "@/lib/content/types";

interface StoryCTAProps {
  storySlug: string;
  chapters: ChapterSummary[];
  compact?: boolean;
}

export function StoryCTA({ storySlug, chapters, compact = false }: StoryCTAProps) {
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);

  useEffect(() => {
    function sync() {
      setChapterNumber(readProgress()[storySlug]?.chapterNumber ?? null);
    }
    sync();
    return subscribe(sync);
  }, [storySlug]);

  const first = chapters[0];
  if (!first) return null;

  const label = chapterNumber ? `อ่านต่อตอนที่ ${chapterNumber}` : "อ่านตอนแรก";

  return (
    <Link className={compact ? "primary small" : "primary"} href={`/read/${storySlug}/${chapterNumber ?? first.number}`}>
      <IconPlay size={15} /> {label}
    </Link>
  );
}
