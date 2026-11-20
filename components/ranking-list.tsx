import Link from "next/link";
import { Cover } from "./cover";
import { IconStar } from "./icons";
import { formatReaders } from "@/lib/format";
import type { Story } from "@/lib/content/types";

export function RankingList({ stories, limit = 5 }: { stories: Story[]; limit?: number }) {
  const ranked = [...stories].sort((a, b) => b.readers - a.readers).slice(0, limit);

  return (
    <section className="section" aria-labelledby="ranking-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">RANKING</p>
          <h2 id="ranking-title">อันดับวันนี้</h2>
        </div>
        <Link href="/discover" className="link-more">
          ดูอันดับทั้งหมด
        </Link>
      </div>
      <ol className="ranking">
        {ranked.map((story, index) => (
          <li key={story.slug}>
            <Link href={`/stories/${story.slug}`} className="ranking__row">
              <span className={index < 3 ? "ranking__number top" : "ranking__number"} aria-hidden="true">
                {index + 1}
              </span>
              <Cover cover={story.cover} title={story.title} size="thumb" />
              <span className="ranking__body">
                <strong>{story.title}</strong>
                <small>
                  {story.type} · {story.genre} · {story.author}
                </small>
                <small className="ranking__stat">
                  <IconStar size={12} /> {story.rating.toFixed(1)} · {formatReaders(story.readers)} คนอ่าน
                </small>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
