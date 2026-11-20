import type { Chapter, ChapterSummary, CoverArt, Story, StoryCover, StoryStatus, StoryType } from "./types";

interface StorySeed {
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
  chapterCount: number;
  freeChapters: number;
  priceCredits: number;
  pagesPerChapter: number;
}

const art = (name: CoverArt): StoryCover => ({
  colors: ["#039ed4", "#ffd571"],
  art: name,
  label: "",
});

const seeds: StorySeed[] = [
  {
    slug: "star-diary",
    title: "บันทึกดวงดาวในคืนฝนพรำ",
    author: "Blue Sky",
    type: "การ์ตูน",
    genre: "แฟนตาซี",
    tags: ["ดวงดาว", "โรงเรียน", "มิตรภาพ"],
    synopsis:
      "ในคืนที่ฝนตกหนัก เด็กสาวผู้เห็นดวงดาวร่วงหล่นลงมาในสวนหลังบ้าน ได้พบเด็กชายที่จำความในอดีตไม่ได้เลยสักอย่าง ทั้งคู่เริ่มบันทึกเรื่องราวของกันและกันไว้ในสมุดเล่มหนึ่ง ซึ่งอาจเป็นกุญแจไขความจริงของท้องฟ้าเมืองนี้",
    status: "กำลังตีพิมพ์",
    rating: 4.8,
    readers: 12840,
    updatedAt: "2026-11-12",
    cover: { colors: ["#437cb4", "#9ac9e0"], label: "STAR\nDIARY" },
    chapterCount: 12,
    freeChapters: 3,
    priceCredits: 3,
    pagesPerChapter: 9,
  },
  {
    slug: "sweet-magic",
    title: "ร้านขนมของแม่มดตัวน้อย",
    author: "Sunday Studio",
    type: "การ์ตูน",
    genre: "อบอุ่นหัวใจ",
    tags: ["ขนม", "เวทมนตร์", "ครอบครัว"],
    synopsis:
      "ร้านขนมเล็ก ๆ ริมตรอกเก่าที่เปิดเฉพาะวันอาทิตย์ เจ้าของร้านเป็นแม่มดที่ยังทำคาถาไม่ค่อยเก่ง แต่ขนมทุกชิ้นของเธอกลับทำให้คนที่ได้กินหายเหนื่อยได้เสมอ",
    status: "กำลังตีพิมพ์",
    rating: 4.6,
    readers: 8210,
    updatedAt: "2026-11-10",
    cover: { colors: ["#e6a762", "#f6d995"], label: "SWEET\nMAGIC" },
    chapterCount: 8,
    freeChapters: 2,
    priceCredits: 3,
    pagesPerChapter: 8,
  },
  {
    slug: "summer-letter",
    title: "จดหมายรักจากฤดูร้อน",
    author: "Summer Moon",
    type: "นิยาย",
    genre: "โรแมนซ์",
    tags: ["จดหมาย", "ทะเล", "ความทรงจำ"],
    synopsis:
      "ทุกฤดูร้อน ณ บ้านพักริมทะเลหลังหนึ่ง มีกล่องจดหมายที่ไม่มีใครเคยเห็นเจ้าของ เมื่อหญิงสาวคนหนึ่งตัดสินใจตอบจดหมายฉบับแรก ชีวิตของเธอจึงเริ่มผูกกับคนที่อยู่ห่างออกไปแค่คลื่นลมคั่นกลาง",
    status: "จบแล้ว",
    rating: 4.9,
    readers: 20155,
    updatedAt: "2026-10-28",
    cover: art("summer"),
    chapterCount: 24,
    freeChapters: 5,
    priceCredits: 2,
    pagesPerChapter: 0,
  },
  {
    slug: "guardian",
    title: "การเดินทางของผู้พิทักษ์",
    author: "Cloud Nine",
    type: "การ์ตูน",
    genre: "แอ็กชัน",
    tags: ["การต่อสู้", "การเดินทาง", "ดาบ"],
    synopsis:
      "ผู้พิทักษ์หนุ่มผู้ถือดาบเล่มเดียวกับอาจารย์ของเขา ต้องเดินทางข้ามทวีปเพื่อส่งของสำคัญชิ้นหนึ่ง ระหว่างทางความจริงเกี่ยวกับสงครามเก่าค่อย ๆ เผยออกมาทีละน้อย",
    status: "กำลังตีพิมพ์",
    rating: 4.5,
    readers: 9340,
    updatedAt: "2026-11-11",
    cover: art("guardian"),
    chapterCount: 18,
    freeChapters: 3,
    priceCredits: 4,
    pagesPerChapter: 10,
  },
  {
    slug: "cat-world",
    title: "เมื่อแมวพาฉันไปต่างโลก",
    author: "Mellow Cat",
    type: "การ์ตูน",
    genre: "แฟนตาซี",
    tags: ["แมว", "ต่างโลก", "ตลก"],
    synopsis:
      "แมวจรตัวหนึ่งเดินตามหญิงสาวกลับบ้าน แล้ววันรุ่งขึ้นเธอก็ตื่นขึ้นมาในโลกที่แมวเป็นเจ้าของเมือง ร้านค้า โรงเรียน และทุกอย่างล้วนออกแบบมาเพื่อแมวทั้งสิ้น",
    status: "กำลังตีพิมพ์",
    rating: 4.7,
    readers: 15420,
    updatedAt: "2026-11-13",
    cover: art("cat"),
    chapterCount: 15,
    freeChapters: 3,
    priceCredits: 3,
    pagesPerChapter: 9,
  },
  {
    slug: "hello-again",
    title: "รอยยิ้มที่ปลายทาง",
    author: "Little Yellow",
    type: "นิยาย",
    genre: "โรแมนซ์",
    tags: ["รถไฟ", "เริ่มใหม่", "เพื่อนเก่า"],
    synopsis:
      "ทุกเช้าวันจันทร์ เธอขึ้นรถไฟขบวนเดิมและนั่งที่เดิมเสมอ จนวันหนึ่งมีคนแปลกหน้านั่งลงตรงข้ามแล้วยิ้มให้เหมือนรู้จักกันมานาน ทั้งที่เธอจำเขาไม่ได้เลย",
    status: "จบแล้ว",
    rating: 4.4,
    readers: 7310,
    updatedAt: "2026-10-20",
    cover: art("hello"),
    chapterCount: 10,
    freeChapters: 2,
    priceCredits: 2,
    pagesPerChapter: 0,
  },
  {
    slug: "deep-blue",
    title: "ความลับแห่งห้วงสมุทร",
    author: "Ocean Ink",
    type: "การ์ตูน",
    genre: "แฟนตาซี",
    tags: ["ทะเล", "ปริศนา", "การผจญภัย"],
    synopsis:
      "เมืองชายทะเลที่ทุกคนเชื่อว่ามีสัตว์ประหลาดอาศัยอยู่ใต้ผืนน้ำ นักเรียนมัธยมคนหนึ่งพบว่าความลับของเมืองนี้ผูกกับครอบครัวของเธอเองมากกว่าที่คิด",
    status: "กำลังตีพิมพ์",
    rating: 4.6,
    readers: 11020,
    updatedAt: "2026-11-09",
    cover: art("ocean"),
    chapterCount: 21,
    freeChapters: 3,
    priceCredits: 4,
    pagesPerChapter: 10,
  },
  {
    slug: "our-days",
    title: "วันธรรมดาของเรา",
    author: "Morning",
    type: "นิยาย",
    genre: "อบอุ่นหัวใจ",
    tags: ["ชีวิตประจำวัน", "เพื่อนบ้าน", "ครอบครัว"],
    synopsis:
      "เรื่องราวสั้น ๆ ของบ้านเช่าสี่หลังในซอยเดียวกัน ผู้คนที่แทบไม่รู้จักกัน ค่อย ๆ กลายเป็นครอบครัวอีกแบบหนึ่งผ่านมื้ออาหารวันละครั้ง",
    status: "กำลังตีพิมพ์",
    rating: 4.8,
    readers: 6180,
    updatedAt: "2026-11-08",
    cover: art("days"),
    chapterCount: 7,
    freeChapters: 1,
    priceCredits: 2,
    pagesPerChapter: 0,
  },
];

const chapterSubtitles = [
  "จุดเริ่มต้น",
  "เสียงฝนยามค่ำ",
  "เงาที่สวนหลังบ้าน",
  "ของขวัญชิ้นเล็ก",
  "คืนที่ดาวเต็มฟ้า",
  "ทางที่ยังไม่เคยเดิน",
  "บทสนทนาบนรถไฟ",
  "กลิ่นขนมอบใหม่",
  "ความลับใต้ผืนน้ำ",
  "จดหมายที่ยังไม่ได้ส่ง",
  "รอยยิ้มของคนแปลกหน้า",
  "ตะวันขึ้นช้า ๆ",
  "เสียงเรียกจากอีกฟาก",
  "วันที่ทุกอย่างเปลี่ยน",
  "คำตอบที่มีอยู่เสมอ",
  "บ้านที่ยังเปิดไฟ",
];

function makeChapters(seed: StorySeed): ChapterSummary[] {
  return Array.from({ length: seed.chapterCount }, (_, index) => {
    const number = index + 1;
    const subtitle = chapterSubtitles[index % chapterSubtitles.length] ?? "ตอนใหม่";
    const published = new Date(Date.UTC(2026, 4, 13 + index * 4));
    return {
      id: `${seed.slug}-${number}`,
      number,
      title: subtitle,
      isFree: number <= seed.freeChapters,
      priceCredits: seed.priceCredits,
      pages: seed.pagesPerChapter,
      publishedAt: published.toISOString().slice(0, 10),
    };
  });
}

function toStory(seed: StorySeed): Story {
  const { chapterCount: _chapterCount, freeChapters: _freeChapters, priceCredits: _price, pagesPerChapter: _pages, ...rest } = seed;
  return { ...rest, chapters: makeChapters(seed) };
}

const stories: Story[] = seeds.map(toStory).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

const storyBySlug = new Map(stories.map((story) => [story.slug, story]));

const novelParagraphs = [
  "ลมจากทะเลพัดเข้ามาทางหน้าต่างที่เปิดค้างไว้ตั้งแต่เช้า กลิ่นเค็มบาง ๆ ผสมกับกลิ่นหญ้าเปียกฝน ทำให้ห้องทั้งห้องดูเหมือนถูกชะล้างใหม่ทุกครั้งที่มีลมผ่าน",
  "ฉันวางจดหมายลงบนโต๊ะไม้เก่าตัวนั้นอีกครั้ง กระดาษสีครีมขอบยับเล็กน้อยจากความชื้น ตัวอักษรในจดหมายเขียนด้วยปากกาหมึกซึมที่น้ำหมึกเริ่มจางลงตามเวลา",
  "คนที่เขียนไม่เคยบอกว่าเขาอยู่ที่ไหน ไม่เคยลงวันที่ และไม่เคยทักทายตรง ๆ แต่ทุกบรรทัดกลับทำให้ฉันรู้สึกว่าถูกจับตามองอย่างอ่อนโยนมาตลอดทั้งฤดู",
  "เสียงคลื่นยังคงซัดเข้าฝั่งเป็นจังหวะเดิม ราวกับว่ามันเป็นเครื่องนับเวลาให้กับเมืองเล็ก ๆ ที่แทบไม่มีอะไรเกิดขึ้นเลยในแต่ละวัน",
  "ฉันหยิบปากกาขึ้นมา แล้วเขียนตอบกลับเป็นครั้งแรก ทั้งที่ยังไม่รู้ว่าจะเริ่มจากคำไหนดี สุดท้ายก็ได้แค่ประโยคสั้น ๆ ว่า ขอบคุณที่เขียนมาถึงฉัน",
  "เย็นวันนั้น กล่องจดหมายริมรั้วมีกระดาษแผ่นหนึ่งพับแน่นอยู่ข้างใน ไม่มีแสตมป์ ไม่มีชื่อผู้ส่ง มีเพียงรอยยิ้มของใครบางคนที่ฉันไม่เคยเห็นหน้าที่จริง",
];

function novelBody(seed: StorySeed, number: number): string[] {
  const opening = `ตอนที่ ${number} — ${seed.title}`;
  return [opening, ...novelParagraphs.slice(0, 3 + (number % 3)).map((paragraph) => paragraph)];
}

export function storiesForCatalog(): Story[] {
  return stories;
}

export function findStory(slug: string): Story | undefined {
  return storyBySlug.get(slug);
}

export function findChapter(slug: string, chapterNumber: number): Chapter | undefined {
  const story = storyBySlug.get(slug);
  if (!story) return undefined;
  const summary = story.chapters.find((chapter) => chapter.number === chapterNumber);
  if (!summary) return undefined;
  const seed = seeds.find((item) => item.slug === slug);
  if (!seed) return undefined;
  return {
    ...summary,
    storySlug: story.slug,
    storyTitle: story.title,
    body:
      story.type === "นิยาย"
        ? { kind: "novel", paragraphs: novelBody(seed, chapterNumber) }
        : { kind: "manga", pages: seed.pagesPerChapter },
  };
}

export function featuredStory(): Story {
  const first = stories[0];
  if (!first) throw new Error("catalog is empty");
  return first;
}

export function genres(): string[] {
  return Array.from(new Set(stories.map((story) => story.genre)));
}
