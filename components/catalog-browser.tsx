"use client";

import { useEffect, useMemo, useState } from "react";
import { StoryCard } from "./story-card";
import type { Story } from "@/lib/content/types";

type Sort = "new" | "popular" | "rating";

interface CatalogBrowserProps {
  stories: Story[];
  genres: string[];
}

export function CatalogBrowser({ stories, genres }: CatalogBrowserProps) {
  const [genre, setGenre] = useState("ทั้งหมด");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("new");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    if (initial) setQuery(initial);
    const onQuery = (event: Event) => {
      setQuery(String((event as CustomEvent<string>).detail ?? ""));
    };
    window.addEventListener("mymunga:query", onQuery);
    return () => window.removeEventListener("mymunga:query", onQuery);
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stories
      .filter((story) => (genre === "ทั้งหมด" ? true : story.genre === genre))
      .filter((story) => {
        if (!needle) return true;
        return [story.title, story.author, story.genre, ...story.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      })
      .sort((a, b) => {
        if (sort === "popular") return b.readers - a.readers;
        if (sort === "rating") return b.rating - a.rating;
        return a.updatedAt < b.updatedAt ? 1 : -1;
      });
  }, [genre, query, sort, stories]);

  return (
    <section className="section" id="catalog">
      <div className="section-head">
        <div>
          <p className="eyebrow">CATALOG</p>
          <h2>เรื่องทั้งหมด</h2>
        </div>
        <label className="sort">
          <span className="sr-only">เรียงลำดับ</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="new">มาใหม่</option>
            <option value="popular">ยอดนิยม</option>
            <option value="rating">คะแนนสูงสุด</option>
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="กรองตามหมวด">
        {["ทั้งหมด", ...genres].map((item) => (
          <button
            key={item}
            type="button"
            className={genre === item ? "chip active" : "chip"}
            aria-pressed={genre === item}
            onClick={() => setGenre(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="result-count" role="status">
        พบ {visible.length} เรื่อง{query.trim() ? ` สำหรับ “${query.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="empty-state">
          <p>ยังไม่พบเรื่องที่ตรงกับคำค้นนี้</p>
          <button type="button" className="ghost" onClick={() => setQuery("")}>
            ล้างคำค้น
          </button>
        </div>
      ) : (
        <div className="grid">
          {visible.map((story, index) => (
            <StoryCard key={story.slug} story={story} priority={index < 2} />
          ))}
        </div>
      )}
    </section>
  );
}
