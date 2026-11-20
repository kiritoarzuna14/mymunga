"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPlay, IconStar } from "./icons";
import { formatReaders } from "@/lib/format";
import type { Story } from "@/lib/content/types";

export function HeroCarousel({ stories }: { stories: Story[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  function go(next: number) {
    if (stories.length === 0) return;
    const clamped = ((next % stories.length) + stories.length) % stories.length;
    const rail = railRef.current;
    const child = rail?.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setIndex(clamped);
  }

  function onScroll() {
    const rail = railRef.current;
    if (!rail || rail.clientWidth === 0) return;
    const next = Math.round(rail.scrollLeft / rail.clientWidth);
    const clamped = Math.min(Math.max(next, 0), stories.length - 1);
    if (clamped !== index) setIndex(clamped);
  }

  return (
    <section className="hero-carousel" aria-roledescription="carousel" aria-label="เรื่องแนะนำ">
      <div className="hero-rail" ref={railRef} onScroll={onScroll}>
        {stories.map((story, slide) => (
          <article
            key={story.slug}
            className="hero-slide"
            style={{
              background: `linear-gradient(120deg, ${story.cover.colors[0]} 0%, ${story.cover.colors[1]} 62%, #fff8e1 100%)`,
            }}
            aria-roledescription="slide"
            aria-label={`${slide + 1} จาก ${stories.length}: ${story.title}`}
            aria-hidden={slide !== index}
          >
            <div className="hero-slide__body">
              <p className="hero-slide__eyebrow">FEATURED · {story.genre}</p>
              <h2>{story.title}</h2>
              <p className="hero-slide__synopsis">{story.synopsis}</p>
              <div className="hero-slide__meta">
                <span className="hero-slide__score">
                  <IconStar size={14} /> {story.rating.toFixed(1)}
                </span>
                <span>{formatReaders(story.readers)} คนอ่าน</span>
                <span>{story.chapters.length} ตอน</span>
              </div>
              <div className="hero-slide__actions">
                <Link className="primary" href={`/stories/${story.slug}`}>
                  <IconPlay size={16} /> อ่านตอนแรก
                </Link>
                <Link className="ghost" href={`/stories/${story.slug}`}>
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
            <div className="hero-slide__art" aria-hidden="true">
              {story.cover.art ? (
                <img src={`/covers/${story.cover.art}.png`} alt="" loading={slide === 0 ? "eager" : "lazy"} />
              ) : (
                <span>{story.cover.label}</span>
              )}
            </div>
          </article>
        ))}
      </div>

      {stories.length > 1 && (
        <>
          <button type="button" className="hero-arrow hero-arrow--prev" onClick={() => go(index - 1)} aria-label="เรื่องก่อนหน้า">
            <IconChevronLeft size={20} />
          </button>
          <button type="button" className="hero-arrow hero-arrow--next" onClick={() => go(index + 1)} aria-label="เรื่องถัดไป">
            <IconChevronRight size={20} />
          </button>
          <div className="hero-dots" role="tablist" aria-label="เลือกเรื่องที่แนะนำ">
            {stories.map((story, dot) => (
              <button
                key={story.slug}
                type="button"
                role="tab"
                aria-selected={dot === index}
                aria-label={story.title}
                className={dot === index ? "active" : undefined}
                onClick={() => go(dot)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
