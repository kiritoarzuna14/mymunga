"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cover } from "./cover";
import { readFollows, readProgress, readUnlocked, subscribe } from "@/lib/library";
import type { ReadingProgress, Story } from "@/lib/content/types";

type Tab = "resume" | "follows" | "unlocked";

interface LibraryViewProps {
  stories: Story[];
}

export function LibraryView({ stories }: LibraryViewProps) {
  const [tab, setTab] = useState<Tab>("resume");
  const [progress, setProgress] = useState<Record<string, ReadingProgress>>({});
  const [follows, setFollows] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    function load() {
      setProgress(readProgress());
      setFollows(readFollows());
      setUnlocked(readUnlocked());
    }
    load();
    return subscribe(load);
  }, []);

  const resume = Object.values(progress)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map((entry) => {
      const story = stories.find((item) => item.slug === entry.storySlug);
      return story ? { story, chapterNumber: entry.chapterNumber, ratio: entry.ratio } : null;
    })
    .filter((item): item is { story: Story; chapterNumber: number; ratio: number } => Boolean(item));

  const followed = follows
    .map((slug) => stories.find((story) => story.slug === slug))
    .filter((story): story is Story => Boolean(story));

  const unlockedStories = stories
    .map((story) => ({
      story,
      chapters: story.chapters.filter((chapter) => unlocked.includes(chapter.id)),
    }))
    .filter((entry) => entry.chapters.length > 0);

  return (
    <section className="library">
      <div className="tabs" role="tablist" aria-label="หมวดในชั้นหนังสือ">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "resume"}
          className={tab === "resume" ? "active" : undefined}
          onClick={() => setTab("resume")}
        >
          อ่านต่อ ({resume.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "follows"}
          className={tab === "follows" ? "active" : undefined}
          onClick={() => setTab("follows")}
        >
          ติดตาม ({followed.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "unlocked"}
          className={tab === "unlocked" ? "active" : undefined}
          onClick={() => setTab("unlocked")}
        >
          ปลดล็อกแล้ว ({unlocked.length})
        </button>
      </div>

      {tab === "resume" &&
        (resume.length === 0 ? (
          <div className="empty-state">
            <p>ยังไม่มีเรื่องที่อ่านค้างไว้</p>
            <Link className="primary small" href="/">
              ไปเลือกเรื่อง
            </Link>
          </div>
        ) : (
          <ul className="shelf-list">
            {resume.map(({ story, chapterNumber, ratio }) => (
              <li key={story.slug}>
                <Link href={`/read/${story.slug}/${chapterNumber}`} className="shelf-row">
                  <Cover cover={story.cover} title={story.title} size="row" />
                  <div className="shelf-row__body">
                    <strong>{story.title}</strong>
                    <small>
                      อ่านถึงตอนที่ {chapterNumber} · {Math.round(ratio * 100)}%
                    </small>
                    <div className="mini-track" aria-hidden="true">
                      <span style={{ width: `${Math.round(ratio * 100)}%` }} />
                    </div>
                  </div>
                  <span className="shelf-row__cta">อ่านต่อ →</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}

      {tab === "follows" &&
        (followed.length === 0 ? (
          <div className="empty-state">
            <p>ยังไม่ได้ติดตามเรื่องไหน กด “ติดตาม” บนหน้ารายละเอียดเรื่องได้เลย</p>
          </div>
        ) : (
          <ul className="shelf-list">
            {followed.map((story) => (
              <li key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="shelf-row">
                  <Cover cover={story.cover} title={story.title} size="row" />
                  <div className="shelf-row__body">
                    <strong>{story.title}</strong>
                    <small>
                      {story.genre} · {story.chapters.length} ตอน
                    </small>
                  </div>
                  <span className="shelf-row__cta">ดูเรื่อง →</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}

      {tab === "unlocked" &&
        (unlockedStories.length === 0 ? (
          <div className="empty-state">
            <p>ยังไม่มีตอนที่ปลดล็อกไว้</p>
          </div>
        ) : (
          <div className="unlocked-groups">
            {unlockedStories.map(({ story, chapters }) => (
              <div key={story.slug} className="unlocked-group">
                <h2>{story.title}</h2>
                <div className="chips">
                  {chapters.map((chapter) => (
                    <Link key={chapter.id} href={`/read/${story.slug}/${chapter.number}`} className="chip">
                      ตอนที่ {chapter.number}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </section>
  );
}
