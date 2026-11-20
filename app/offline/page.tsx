import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ออฟไลน์",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="wrap">
      <section className="offline-card">
        <p className="eyebrow">OFFLINE</p>
        <h1>ตอนนี้ไม่มีการเชื่อมต่อ</h1>
        <p>หน้าที่เคยเปิดไว้จะยังอ่านได้จากแคช เมื่อกลับมาออนไลน์แล้วกดลองใหม่ได้ทันที</p>
        <Link className="primary" href="/">
          กลับหน้าแรก
        </Link>
      </section>
    </div>
  );
}
