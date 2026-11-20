interface ComicPageProps {
  seed: string;
  page: number;
  total: number;
}

function hash(text: string): number {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

const palettes = [
  { sky: "#d9f0ff", ink: "#1d4b63", accent: "#ffca3a", soft: "#9ed8f2" },
  { sky: "#fff3cf", ink: "#3a3a2c", accent: "#039ed4", soft: "#ffe08a" },
  { sky: "#e6ecff", ink: "#2c3560", accent: "#ffbd24", soft: "#b7c6f5" },
  { sky: "#e3f7f1", ink: "#1f4a44", accent: "#ff9f68", soft: "#a9e0d2" },
];

export function ComicPage({ seed, page, total }: ComicPageProps) {
  const base = hash(`${seed}-${page}`);
  const palette = palettes[base % palettes.length] ?? palettes[0]!;
  const layout = base % 3;
  const tilt = ((base >> 3) % 7) - 3;

  const panels =
    layout === 0
      ? [
          { x: 60, y: 60, w: 780, h: 520 },
          { x: 60, y: 610, w: 380, h: 420 },
          { x: 460, y: 610, w: 380, h: 420 },
          { x: 60, y: 1060, w: 780, h: 200 },
        ]
      : layout === 1
        ? [
            { x: 60, y: 60, w: 380, h: 480 },
            { x: 460, y: 60, w: 380, h: 480 },
            { x: 60, y: 570, w: 780, h: 380 },
            { x: 60, y: 980, w: 780, h: 280 },
          ]
        : [
            { x: 60, y: 60, w: 780, h: 380 },
            { x: 60, y: 470, w: 500, h: 460 },
            { x: 580, y: 470, w: 260, h: 460 },
            { x: 60, y: 960, w: 780, h: 300 },
          ];

  return (
    <svg
      className="comic-page"
      viewBox="0 0 900 1320"
      role="img"
      aria-label={`ภาพตัวอย่างหน้า ${page} จาก ${total}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="900" height="1320" fill="#ffffff" />
      <g transform={`rotate(${tilt} 450 660)`}>
        {panels.map((panel, index) => {
          const local = hash(`${seed}-${page}-${index}`);
          return (
            <g key={index}>
              <rect
                x={panel.x}
                y={panel.y}
                width={panel.w}
                height={panel.h}
                rx="18"
                fill={index % 2 === 0 ? palette.sky : "#f7fbfd"}
                stroke={palette.ink}
                strokeWidth="5"
              />
              <circle
                cx={panel.x + panel.w * (0.25 + ((local % 40) / 100))}
                cy={panel.y + panel.h * 0.3}
                r={Math.min(panel.w, panel.h) * 0.18}
                fill={palette.soft}
                opacity="0.75"
              />
              <path
                d={`M ${panel.x + 20} ${panel.y + panel.h - 30}
                    L ${panel.x + panel.w * 0.35} ${panel.y + panel.h * (0.45 + ((local >> 4) % 20) / 100)}
                    L ${panel.x + panel.w * 0.6} ${panel.y + panel.h - 30} Z`}
                fill={palette.ink}
                opacity="0.18"
              />
              <path
                d={`M ${panel.x + 20} ${panel.y + panel.h - 30}
                    L ${panel.x + panel.w * 0.55} ${panel.y + panel.h * (0.6 + ((local >> 6) % 20) / 100)}
                    L ${panel.x + panel.w - 20} ${panel.y + panel.h - 30} Z`}
                fill={palette.accent}
                opacity="0.35"
              />
              {index % 3 === 1 && (
                <g>
                  <ellipse
                    cx={panel.x + panel.w * 0.68}
                    cy={panel.y + panel.h * 0.24}
                    rx={panel.w * 0.22}
                    ry={panel.h * 0.12}
                    fill="#ffffff"
                    stroke={palette.ink}
                    strokeWidth="4"
                  />
                  <path
                    d={`M ${panel.x + panel.w * 0.62} ${panel.y + panel.h * 0.34}
                        l 12 26 l 14 -22`}
                    fill="none"
                    stroke={palette.ink}
                    strokeWidth="4"
                  />
                </g>
              )}
              <text
                x={panel.x + 24}
                y={panel.y + 44}
                fill={palette.ink}
                fontFamily="Prompt, sans-serif"
                fontSize="24"
                opacity="0.55"
              >
                {String.fromCharCode(65 + index)}
              </text>
            </g>
          );
        })}
      </g>
      <text
        x="450"
        y="1300"
        textAnchor="middle"
        fill="#7b95a4"
        fontFamily="Prompt, sans-serif"
        fontSize="22"
      >
        {page} / {total} · ภาพตัวอย่างสำหรับทดสอบหน้าอ่าน
      </text>
    </svg>
  );
}
