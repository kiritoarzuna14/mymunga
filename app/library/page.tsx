import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";
import { storiesForCatalog } from "@/lib/content/data";

export const metadata: Metadata = {
  title: "ชั้นหนังสือ",
  description: "อ่านต่อ จัดการเรื่องที่ติดตาม และตอนที่ปลดล็อกไว้บนเครื่องนี้",
};

export default function LibraryPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <p className="eyebrow">MY LIBRARY</p>
        <h1>ชั้นหนังสือของฉัน</h1>
        <p>ความคืบหน้าและรายการที่ติดตามถูกเก็บไว้ในเครื่องนี้ ระบบบัญชีจะซิงก์ข้ามอุปกรณ์ใน Phase 3 (R04)</p>
      </header>
      <LibraryView stories={storiesForCatalog()} />
    </div>
  );
}
