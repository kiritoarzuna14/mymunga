export type StoryType = "การ์ตูน" | "นิยาย";

export type StoryStatus = "กำลังตีพิมพ์" | "จบแล้ว";

export type CoverArt = "summer" | "guardian" | "cat" | "hello" | "ocean" | "days";

export interface StoryCover {
  colors: [string, string];
  art?: CoverArt;
  label: string;
}

export interface ChapterSummary {
  id: string;
  number: number;
  title: string;
  isFree: boolean;
  priceCredits: number;
  pages: number;
  publishedAt: string;
}

export interface Story {
  slug: string;
  title: string;
  author: string;
  type: StoryType;
  genre: string;
  tags: string[];
  synopsis: string;
  status: StoryStatus;
  rating: number;
  readers: number;
  updatedAt: string;
  cover: StoryCover;
  chapters: ChapterSummary[];
}

export type ChapterBody =
  | { kind: "manga"; pages: number }
  | { kind: "novel"; paragraphs: string[] };

export interface Chapter extends ChapterSummary {
  storySlug: string;
  storyTitle: string;
  body: ChapterBody;
}

export interface ReadingProgress {
  storySlug: string;
  chapterNumber: number;
  /** 0–1 ของความคืบหน้าในตอนนั้น */
  ratio: number;
  updatedAt: number;
}
