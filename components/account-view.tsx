"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./auth-provider";
import { IconChevronRight, IconLibrary, IconSliders, IconSparkle, IconType, IconUser } from "./icons";
import { readFollows, readProgress, readReaderSettings, readUnlocked, subscribe, type ReaderSettings } from "@/lib/library";

export function AccountView() {
  const { user, ready, openAuth, signOut } = useAuth();
  const [stats, setStats] = useState({ reading: 0, follows: 0, unlocked: 0 });
  const [settings, setSettings] = useState<ReaderSettings | null>(null);

  useEffect(() => {
    function sync() {
      setStats({
        reading: Object.keys(readProgress()).length,
        follows: readFollows().length,
        unlocked: readUnlocked().length,
      });
      setSettings(readReaderSettings());
    }
    sync();
    return subscribe(sync);
  }, []);

  const initial = (user?.name || user?.email || "").trim().charAt(0).toUpperCase();
  const themeLabel = settings ? { light: "สว่าง", sepia: "กระดาษ", dark: "มืด" }[settings.theme] : "—";
  const sizeLabel = settings ? { sm: "เล็ก", md: "ปกติ", lg: "ใหญ่" }[settings.fontSize] : "—";

  return (
    <div className="account">
      <section className="profile-card">
        <div className="profile-card__avatar" aria-hidden="true">
          {initial || <IconUser size={26} />}
        </div>
        <div className="profile-card__body">
          {ready && user ? (
            <>
              <strong>{user.name || "สมาชิก MyMunga"}</strong>
              <small>{user.email}</small>
            </>
          ) : (
            <>
              <strong>ยังไม่ได้เข้าสู่ระบบ</strong>
              <small>เข้าสู่ระบบเพื่อบันทึกชั้นหนังสือข้ามอุปกรณ์ (กำลังพัฒนา)</small>
            </>
          )}
        </div>
        {user ? (
          <button type="button" className="ghost small" onClick={() => void signOut()}>
            ออกจากระบบ
          </button>
        ) : (
          <button type="button" className="primary small" onClick={openAuth}>
            เข้าสู่ระบบ
          </button>
        )}
      </section>

      <section className="stat-row" aria-label="สถิติการอ่าน">
        <div>
          <strong>{stats.reading}</strong>
          <small>เรื่องที่อ่านค้าง</small>
        </div>
        <div>
          <strong>{stats.follows}</strong>
          <small>เรื่องที่ติดตาม</small>
        </div>
        <div>
          <strong>{stats.unlocked}</strong>
          <small>ตอนที่ปลดล็อก</small>
        </div>
      </section>

      <nav className="menu-list" aria-label="เมนูบัญชี">
        <Link href="/library" className="menu-row">
          <span className="menu-row__icon">
            <IconLibrary size={19} />
          </span>
          <span className="menu-row__body">
            <strong>ชั้นหนังสือของฉัน</strong>
            <small>อ่านต่อ ติดตาม และตอนที่ปลดล็อก</small>
          </span>
          <IconChevronRight size={18} />
        </Link>
        <Link href="/discover" className="menu-row">
          <span className="menu-row__icon">
            <IconSparkle size={19} />
          </span>
          <span className="menu-row__body">
            <strong>ค้นพบเรื่องใหม่</strong>
            <small>หมวดหมู่ อันดับ และเรื่องมาใหม่</small>
          </span>
          <IconChevronRight size={18} />
        </Link>
        <div className="menu-row menu-row--static">
          <span className="menu-row__icon">
            <IconType size={19} />
          </span>
          <span className="menu-row__body">
            <strong>ตัวเลือกการอ่าน</strong>
            <small>
              ธีม {themeLabel} · ขนาดตัวอักษร {sizeLabel}
            </small>
          </span>
          <IconSliders size={18} />
        </div>
      </nav>

      <p className="account-note">
        MyMunga เวอร์ชันต้นแบบ · บัญชีและข้อมูลการอ่านบางส่วนเก็บในเครื่องนี้ ระบบซิงก์บัญชีจะเปิดใน Phase 3
      </p>
    </div>
  );
}
