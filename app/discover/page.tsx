import type { Metadata } from "next";
import { DiscoverView } from "@/components/discover-view";
import { genres, storiesForCatalog } from "@/lib/content/data";

export const metadata: Metadata = {
  title: "ค้นพบเรื่องใหม่",
  description: "ค้นหาและเลือกอ่านการ์ตูนกับนิยายไทยตามหมวดหมู่ ผู้เขียน หรือแท็ก",
};

export default function DiscoverPage() {
  return (
    <div className="wrap">
      <header className="page-head page-head--tight">
        <p className="eyebrow">DISCOVER</p>
        <h1>ค้นพบเรื่องใหม่</h1>
      </header>
      <DiscoverView stories={storiesForCatalog()} genres={genres()} />
    </div>
  );
}
