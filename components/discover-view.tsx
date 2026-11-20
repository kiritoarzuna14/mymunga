"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { StoryCard } from "./story-card";
import { IconClose, IconFlame, IconHeart, IconSearch, IconSparkle, IconStar } from "./icons";
import { formatReaders } from "@/lib/format";
import type { Story } from "@/lib/content/types";

interface DiscoverViewProps {
  stories: Story[];
  genres: string[];
}

const genreIcons: Record<string, ReactNode> = {
  แฟนตาซี: <IconSparkle size={18} />,
  โรแมนซ์: <IconHeart size={18} />,
  แอ็กชัน: <IconFlame size={18} />,
  อบอุ่นหัวใจ: <IconStar size={18} />,
};

export function DiscoverView({ stories, genres }: DiscoverViewProps) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("ทั้งหมด");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    const initialGenre = params.get("genre");
    if (initial) setQuery(initial);
    if (initialGenre && genres.includes(initialGenre)) setGenre(initialGenre);
    if (!initial) inputRef.current?.focus();
  }, [genres]);

  const trending = useMemo(() => [...stories].sort((a, b) => b.readers - a.readers).slice(0, 3), [stories]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stories
      .filter((story) => (genre === "ทั้งหมด" ? true : story.genre === genre))
      .filter((story) =>
        needle
          ? [story.title, story.author, story.genre, ...story.tags].join(" ").toLowerCase().includes(needle)
          : true,
      )
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [genre, query, stories]);

  const searching = query.trim().length > 0 || genre !== "ทั้งหมด";

  return (
    <div className="discover">
      <div className="discover__search">
        <IconSearch size={20} className="discover__search-icon" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาเรื่อง ผู้เขียน หรือแท็ก"
          aria-label="ค้นหาเรื่อง"
        />
        {query && (
          <button type="button" className="discover__clear" onClick={() => setQuery("")} aria-label="ล้างคำค้น">
            <IconClose size={16} />
          </button>
        )}
      </div>

      <section className="section" aria-labelledby="genres-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">CATEGORIES</p>
            <h2 id="genres-title">หมวดหมู่</h2>
          </div>
        </div>
        <div className="genre-grid">
          <button
            type="button"
            className={genre === "ทั้งหมด" ? "genre-tile active" : "genre-tile"}
            aria-pressed={genre === "ทั้งหมด"}
            onClick={() => setGenre("ทั้งหมด")}
          >
            <span className="genre-tile__icon">
              <IconSparkle size={18} />
            </span>
            <span>ทั้งหมด</span>
            <small>{stories.length} เรื่อง</small>
          </button>
          {genres.map((item) => {
            const count = stories.filter((story) => story.genre === item).length;
            return (
              <button
                key={item}
                type="button"
                className={genre === item ? "genre-tile active" : "genre-tile"}
                aria-pressed={genre === item}
                onClick={() => setGenre(item)}
              >
                <span className="genre-tile__icon">{genreIcons[item] ?? <IconStar size={18} />}</span>
                <span>{item}</span>
                <small>{count} เรื่อง</small>
              </button>
            );
          })}
        </div>
      </section>

      {!searching && (
        <section className="section" aria-labelledby="trending-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">TRENDING NOW</p>
              <h2 id="trending-title">กำลังมาแรง</h2>
            </div>
          </div>
          <div className="trend-list">
            {trending.map((story, index) => (
              <Link key={story.slug} href={`/stories/${story.slug}`} className="trend-row">
                <span className="trend-row__rank">{index + 1}</span>
                <span className="trend-row__body">
                  <strong>{story.title}</strong>
                  <small>
                    {story.genre} · {formatReaders(story.readers)} คนอ่าน
                  </small>
                </span>
                <span className="trend-row__score">
                  <IconStar size={13} /> {story.rating.toFixed(1)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="results-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">RESULTS</p>
            <h2 id="results-title">{searching ? "ผลการค้นหา" : "เรื่องทั้งหมด"}</h2>
          </div>
          <span className="muted small">{results.length} เรื่อง</span>
        </div>
        {results.length === 0 ? (
          <div className="empty-state">
            <p>ไม่พบเรื่องที่ตรงกับ “{query}”</p>
            <button type="button" className="ghost small" onClick={() => { setQuery(""); setGenre("ทั้งหมด"); }}>
              ล้างตัวกรอง
            </button>
          </div>
        ) : (
          <div className="grid">
            {results.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
