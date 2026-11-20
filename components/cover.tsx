import type { StoryCover } from "@/lib/content/types";

interface CoverProps {
  cover: StoryCover;
  title: string;
  size?: "card" | "detail" | "row" | "thumb";
  priority?: boolean;
}

export function Cover({ cover, title, size = "card", priority = false }: CoverProps) {
  const className = `cover cover--${size}`;
  const style = {
    background: `linear-gradient(145deg, ${cover.colors[0]}, ${cover.colors[1]})`,
  } as const;

  if (cover.art) {
    return (
      <div className={className} style={style}>
        {/* ภาพปกต้นแบบยังเป็นไฟล์ PNG ขนาดใหญ่จาก dist/assets — ต้องผ่าน pipeline ใน Phase 2 (C04) */}
        <img
          src={`/covers/${cover.art}.png`}
          alt={`หน้าปก ${title}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={className} style={style} aria-hidden="true">
      <strong>
        {cover.label.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </strong>
    </div>
  );
}
