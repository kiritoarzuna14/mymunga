import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReaderGate } from "@/components/readers/reader-gate";
import { findChapter, findStory, storiesForCatalog } from "@/lib/content/data";

interface ReaderPageProps {
  params: Promise<{ slug: string; chapter: string }>;
}

export function generateStaticParams() {
  return storiesForCatalog().flatMap((story) =>
    story.chapters.map((chapter) => ({ slug: story.slug, chapter: String(chapter.number) })),
  );
}

export async function generateMetadata({ params }: ReaderPageProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  const found = findChapter(slug, Number(chapter));
  if (!found) return { title: "ไม่พบตอน" };
  return {
    title: `ตอนที่ ${found.number} · ${found.title}`,
    description: `อ่าน ${found.storyTitle} ตอนที่ ${found.number} บน MyMunga`,
    robots: { index: false, follow: false },
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, chapter } = await params;
  const number = Number(chapter);
  const story = findStory(slug);
  const found = findChapter(slug, number);
  if (!story || !found || !Number.isInteger(number)) notFound();

  return <ReaderGate chapter={found} chapters={story.chapters} />;
}
