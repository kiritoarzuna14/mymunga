import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterList } from "@/components/chapter-list";
import { Cover } from "@/components/cover";
import { FollowButton } from "@/components/follow-button";
import { StoryCTA } from "@/components/story-cta";
import { IconStar } from "@/components/icons";
import { findStory, storiesForCatalog } from "@/lib/content/data";
import { formatReaders, formatRelative, formatThaiDate } from "@/lib/format";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return storiesForCatalog().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) return { title: "ไม่พบเรื่อง" };
  return {
    title: story.title,
    description: story.synopsis.slice(0, 150),
    openGraph: {
      title: `${story.title} · MyMunga`,
      description: story.synopsis.slice(0, 150),
      type: "article",
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) notFound();

  const freeCount = story.chapters.filter((chapter) => chapter.isFree).length;

  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="เส้นทาง">
        <Link href="/">หน้าแรก</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/discover?genre=${encodeURIComponent(story.genre)}`}>{story.genre}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{story.title}</span>
      </nav>

      <section className="story-hero">
        <div
          className="story-backdrop"
          aria-hidden="true"
          style={{
            background: `linear-gradient(120deg, ${story.cover.colors[0]} 0%, ${story.cover.colors[1]} 55%, #ffffff 100%)`,
          }}
        />
        <div className="story-hero__top">
          <div className="story-hero__cover">
            <Cover cover={story.cover} title={story.title} size="detail" priority />
          </div>
          <div className="story-hero__head">
            <div className="badges">
              <span className="badge">{story.type}</span>
              <span className="badge badge--soft">{story.genre}</span>
              <span className="badge badge--soft">{story.status}</span>
            </div>
            <h1>{story.title}</h1>
            <p className="story-author">
              โดย {story.author} · อัปเดต {formatRelative(story.updatedAt)}
            </p>
          </div>
        </div>
        <div className="story-hero__body">
          <div className="story-stats">
            <div>
              <strong>
                <IconStar size={13} /> {story.rating.toFixed(1)}
              </strong>
              <small>คะแนน</small>
            </div>
            <div>
              <strong>{formatReaders(story.readers)}</strong>
              <small>คนอ่าน</small>
            </div>
            <div>
              <strong>{story.chapters.length}</strong>
              <small>ตอน</small>
            </div>
            <div>
              <strong>{freeCount}</strong>
              <small>ตอนฟรี</small>
            </div>
          </div>
          <p className="story-synopsis">{story.synopsis}</p>
          <div className="tag-row">
            {story.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="story-actions">
            <StoryCTA storySlug={story.slug} chapters={story.chapters} />
            <FollowButton slug={story.slug} />
          </div>
        </div>
      </section>

      <div className="story-layout">
        <section className="chapter-section" aria-labelledby="chapters-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">CHAPTERS</p>
              <h2 id="chapters-title">สารบัญ</h2>
            </div>
            <span className="muted small">{story.chapters.length} ตอน</span>
          </div>
          <ChapterList storySlug={story.slug} chapters={story.chapters} />
        </section>

        <aside className="story-aside" aria-label="ข้อมูลเพิ่มเติม">
          <div className="aside-card">
            <h2>เกี่ยวกับเรื่องนี้</h2>
            <dl>
              <div>
                <dt>ประเภท</dt>
                <dd>{story.type}</dd>
              </div>
              <div>
                <dt>หมวด</dt>
                <dd>{story.genre}</dd>
              </div>
              <div>
                <dt>สถานะ</dt>
                <dd>{story.status}</dd>
              </div>
              <div>
                <dt>เริ่มเผยแพร่</dt>
                <dd>{story.chapters[0] ? formatThaiDate(story.chapters[0].publishedAt) : "—"}</dd>
              </div>
            </dl>
            <p className="aside-note">
              เนื้อหาและภาพในหน้านี้เป็นข้อมูลตัวอย่างสำหรับพัฒนาระบบ ยังไม่ใช่ผลงานที่เผยแพร่จริง
            </p>
          </div>
        </aside>
      </div>

      <div className="sticky-cta">
        <span>{story.title}</span>
        <StoryCTA storySlug={story.slug} chapters={story.chapters} compact />
      </div>
    </div>
  );
}
