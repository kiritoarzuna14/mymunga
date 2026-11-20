import type { ReadingProgress } from "./content/types";

export const STORAGE = {
  progress: "mymunga.progress.v1",
  unlocked: "mymunga.unlocked.v1",
  follows: "mymunga.follows.v1",
  readerSettings: "mymunga.reader-settings.v1",
} as const;

const EVENT = "mymunga:library";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* storage เต็มหรือถูกปิด — ไม่ทำให้หน้าอ่านพัง */
  }
}

export function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function readProgress(): Record<string, ReadingProgress> {
  return read<Record<string, ReadingProgress>>(STORAGE.progress, {});
}

export function saveProgress(next: ReadingProgress) {
  const all = readProgress();
  const existing = all[next.storySlug];
  // อย่าให้การเลื่อนอ่านย้อนหลังทับความคืบหน้าที่มากกว่า เว้นแต่เปิดตอนเดิมซ้ำ
  if (
    existing &&
    existing.chapterNumber === next.chapterNumber &&
    existing.ratio > next.ratio + 0.05
  ) {
    return;
  }
  all[next.storySlug] = next;
  write(STORAGE.progress, all);
}

export function readUnlocked(): string[] {
  return read<string[]>(STORAGE.unlocked, []);
}

export function isUnlocked(chapterId: string): boolean {
  return readUnlocked().includes(chapterId);
}

export function unlockChapter(chapterId: string) {
  const all = new Set(readUnlocked());
  all.add(chapterId);
  write(STORAGE.unlocked, [...all]);
}

export function readFollows(): string[] {
  return read<string[]>(STORAGE.follows, []);
}

export function toggleFollow(slug: string) {
  const all = new Set(readFollows());
  if (all.has(slug)) all.delete(slug);
  else all.add(slug);
  write(STORAGE.follows, [...all]);
}

export interface ReaderSettings {
  fontSize: "sm" | "md" | "lg";
  lineHeight: "tight" | "normal" | "loose";
  theme: "light" | "sepia" | "dark";
}

export const defaultReaderSettings: ReaderSettings = {
  fontSize: "md",
  lineHeight: "normal",
  theme: "light",
};

export function readReaderSettings(): ReaderSettings {
  return { ...defaultReaderSettings, ...read<Partial<ReaderSettings>>(STORAGE.readerSettings, {}) };
}

export function saveReaderSettings(settings: ReaderSettings) {
  write(STORAGE.readerSettings, settings);
}
