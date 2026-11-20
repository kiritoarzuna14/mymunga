"use client";

import { useEffect, useRef, useState } from "react";

/** ซ่อน chrome ของหน้าอ่านเมื่อเลื่อนลง และแสดงกลับเมื่อเลื่อนขึ้น */
export function useAutoHideChrome(): { visible: boolean; toggle: () => void; setVisible: (value: boolean) => void } {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  // ช่วงแรกหลังเข้าหน้า: การเลื่อนที่เกิดจากการกู้ตำแหน่งอ่านไม่ควรซ่อน chrome
  const settleUntil = useRef(Date.now() + 900);

  useEffect(() => {
    let lastRun = 0;
    function onScroll() {
      const now = Date.now();
      if (now - lastRun < 70) return;
      lastRun = now;

      const y = window.scrollY;
      const delta = y - lastY.current;
      if (now < settleUntil.current) {
        lastY.current = y;
        return;
      }
      if (Math.abs(delta) < 12) return;
      if (delta > 0 && y > 80) setVisible(false);
      else if (delta < 0) setVisible(true);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { visible, toggle: () => setVisible((value) => !value), setVisible };
}

type WakeLockSentinel = { release: () => Promise<void> };

/** ขอ Wake Lock ระหว่างอ่าน — ปล่อยเมื่อออกจากหน้า (ถูก ignore ถ้าเบราว์เซอร์ไม่รองรับ) */
export function useWakeLock(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof navigator === "undefined") return;
    const api = (navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinel> };
    }).wakeLock;
    if (!api) return;

    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    api
      .request("screen")
      .then((lock) => {
        if (cancelled) void lock.release();
        else sentinel = lock;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      void sentinel?.release().catch(() => undefined);
    };
  }, [enabled]);
}
