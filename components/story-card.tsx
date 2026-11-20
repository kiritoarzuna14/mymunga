import Link from "next/link";
import { Cover } from "./cover";
import { IconStar } from "./icons";
import { formatReaders } from "@/lib/format";
import type { Story } from "@/lib/content/types";

export function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  return (
    <Link href={`/stories/${story.slug}`} className="poster">
      <div className="poster__cover">
        <Cover cover={story.cover} title={story.title} priority={priority} />
        <span className="poster__badge">{story.type}</span>
      </div>
      <div className="poster__title">{story.title}</div>
      <div className="poster__meta">
        <span className="poster__rating">
          <IconStar size={12} /> {story.rating.toFixed(1)}
        </span>
        <span aria-hidden="true">·</span>
        <span>{formatReaders(story.readers)}</span>
      </div>
      <div className="poster__author">
        {story.author} · {story.chapters.length} ตอน
      </div>
    </Link>
  );
}
