"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cover } from "./cover";
import { readProgress, subscribe } from "@/lib/library";
import type { Story } from "@/lib/content/types";

export function ContinueReading({ stories }: { stories: Story[] }) {
  const [items, setItems] = useState<Array<{ story: Story; chapterNumber: number; ratio: number }>>([]);

  useEffect(() => {
    function load() {
      const progress = readProgress();
      const next = Object.values(progress)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map((entry) => {
          const story = stories.find((item) => item.slug === entry.storySlug);
          return story ? { story, chapterNumber: entry.chapterNumber, ratio: entry.ratio } : null;
        })
        .filter((item): item is { story: Story; chapterNumber: number; ratio: number } => Boolean(item))
        .slice(0, 6);
      setItems(next);
    }
    load();
    return subscribe(load);
  }, [stories]);

  if (items.length === 0) {
    return (
      <section className="section" aria-labelledby="resume-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">CONTINUE</p>
            <h2 id="resume-title">อ่านต่อ</h2>
          </div>
        </div>
        <div className="empty-shelf">
          <p>ยังไม่มีความคืบหน้าการอ่าน — เริ่มจากตอนแรกของเรื่องที่สนใจได้เลย</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-labelledby="resume-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">CONTINUE</p>
          <h2 id="resume-title">อ่านต่อ</h2>
        </div>
        <Link href="/library" className="link-more">
          ชั้นหนังสือทั้งหมด →
        </Link>
      </div>
      <div className="rail">
        {items.map(({ story, chapterNumber, ratio }) => (
          <Link key={story.slug} href={`/read/${story.slug}/${chapterNumber}`} className="rail-card">
            <Cover cover={story.cover} title={story.title} size="row" />
            <div className="rail-card__body">
              <strong>{story.title}</strong>
              <small>ตอนที่ {chapterNumber}</small>
              <div className="mini-track" aria-hidden="true">
                <span style={{ width: `${Math.round(ratio * 100)}%` }} />
              </div>
              <small className="muted">อ่านแล้ว {Math.round(ratio * 100)}%</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
