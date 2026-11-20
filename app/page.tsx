import Link from "next/link";
import { CatalogBrowser } from "@/components/catalog-browser";
import { ContinueReading } from "@/components/continue-reading";
import { HeroCarousel } from "@/components/hero-carousel";
import { RankingList } from "@/components/ranking-list";
import { StoryCard } from "@/components/story-card";
import { IconChevronRight, IconFlame, IconHeart, IconSparkle, IconStar } from "@/components/icons";
import { genres, storiesForCatalog } from "@/lib/content/data";

export default function HomePage() {
  const stories = storiesForCatalog();
  const featured = [...stories].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const latest = [...stories].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, 8);

  return (
    <div className="wrap">
      <HeroCarousel stories={featured} />

      <ContinueReading stories={stories} />

      <section className="section" aria-labelledby="genres-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">BROWSE</p>
            <h2 id="genres-title">เลือกตามอารมณ์</h2>
          </div>
          <Link href="/discover" className="link-more">
            ทั้งหมด <IconChevronRight size={14} />
          </Link>
        </div>
        <div className="mood-row">
          {genres().map((genre) => (
            <Link key={genre} href={`/discover?genre=${encodeURIComponent(genre)}`} className="mood-chip">
              <span aria-hidden="true">
                {genre === "แฟนตาซี" ? <IconSparkle size={16} /> : genre === "โรแมนซ์" ? <IconHeart size={16} /> : genre === "แอ็กชัน" ? <IconFlame size={16} /> : <IconStar size={16} />}
              </span>
              {genre}
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="latest-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">NEW RELEASES</p>
            <h2 id="latest-title">มาใหม่สัปดาห์นี้</h2>
          </div>
          <Link href="/discover" className="link-more">
            ดูทั้งหมด <IconChevronRight size={14} />
          </Link>
        </div>
        <div className="rail rail--posters">
          {latest.map((story, index) => (
            <StoryCard key={story.slug} story={story} priority={index < 2} />
          ))}
        </div>
      </section>

      <RankingList stories={stories} />

      <CatalogBrowser stories={stories} genres={genres()} />

      <section className="cta-band" aria-labelledby="creator-title">
        <div>
          <p className="eyebrow">FOR CREATORS</p>
          <h2 id="creator-title">มีเรื่องในใจอยู่แล้ว?</h2>
          <p>พื้นที่สำหรับนักเขียนและนักวาด พร้อมระบบตรวจเนื้อหาและแบ่งรายได้ กำลังจะเปิดให้ใช้งาน</p>
        </div>
        <button type="button" className="primary" aria-disabled="true">
          เร็ว ๆ นี้
        </button>
      </section>
    </div>
  );
}
