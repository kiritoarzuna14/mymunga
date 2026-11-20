// สร้างไอคอน PWA จากรูปทรงเรขาคณิต (ไม่ต้องใช้ dependency ภายนอก)
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function png(size, pixel) {
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 3 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b] = pixel(x / size, y / size);
      const offset = rowStart + 1 + x * 3;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const BLUE = [3, 158, 212];
const YELLOW = [255, 202, 58];
const WHITE = [245, 250, 255];

// ดาวสี่แฉก: ระยะทางแบบ L1 ปรับความกว้างแฉก
function starDistance(nx, ny) {
  return Math.min(Math.abs(nx) * 1.6 + Math.abs(ny) * 0.55, Math.abs(ny) * 1.6 + Math.abs(nx) * 0.55);
}

function pixelFor({ maskable }) {
  return (u, v) => {
    const x = u - 0.5;
    const y = v - 0.5;
    const radius = 0.5;
    if (maskable) {
      // maskable ต้องมี safe zone: พื้นหลังเต็มกรอบ ไม่ตัดมุม
      if (starDistance(x, y) < 0.26) return YELLOW;
      if (Math.hypot(x, y) < 0.30) return WHITE;
      return BLUE;
    }
    const corner = Math.max(Math.abs(x), Math.abs(y));
    if (corner > radius) return WHITE;
    if (starDistance(x, y) < 0.27) return YELLOW;
    const ring = Math.hypot(x, y);
    if (ring < 0.34) return BLUE;
    if (ring < 0.38) return YELLOW;
    return WHITE;
  };
}

mkdirSync("public/icons", { recursive: true });
writeFileSync("public/icons/icon-512.png", png(512, pixelFor({ maskable: false })));
writeFileSync("public/icons/maskable-512.png", png(512, pixelFor({ maskable: true })));
writeFileSync("public/icons/icon-192.png", png(192, pixelFor({ maskable: false })));
writeFileSync("public/icons/apple-touch-icon.png", png(180, pixelFor({ maskable: false })));

console.log("icons written to public/icons");
