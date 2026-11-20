import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <section className="offline-card">
        <p className="eyebrow">404</p>
        <h1>ไม่พบหน้าที่คุณตามหา</h1>
        <p>เรื่องหรือตอนนี้อาจถูกซ่อน ย้าย หรือยังไม่เผยแพร่ ลองกลับไปเลือกเรื่องจากหน้าแรก</p>
        <Link className="primary" href="/">
          ไปหน้าแรก
        </Link>
      </section>
    </div>
  );
}
