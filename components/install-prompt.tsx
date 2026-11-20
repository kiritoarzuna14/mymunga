"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "mymunga.install-dismissed.v1";

export function InstallPrompt() {
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();
  const allowedRoute = pathname === "/" || pathname === "/library";

  useEffect(() => {
    if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    function onPrompt(event: Event) {
      event.preventDefault();
      setEvent(event as InstallEvent);
      setHidden(false);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (hidden || !event || !allowedRoute) return null;

  return (
    <div className="install-banner" role="region" aria-label="ติดตั้งแอป">
      <div>
        <strong>ติดตั้ง MyMunga</strong>
        <p>อ่านต่อได้เร็วขึ้นและเปิดจากหน้าจอโฮมเหมือนแอปมือถือ</p>
      </div>
      <div className="install-banner__actions">
        <button
          type="button"
          className="primary small"
          onClick={async () => {
            await event.prompt();
            const choice = await event.userChoice;
            if (choice.outcome === "dismissed") {
              window.localStorage.setItem(DISMISS_KEY, "1");
            }
            setHidden(true);
          }}
        >
          ติดตั้ง
        </button>
        <button
          type="button"
          className="ghost small"
          onClick={() => {
            window.localStorage.setItem(DISMISS_KEY, "1");
            setHidden(true);
          }}
        >
          ไว้ทีหลัง
        </button>
      </div>
    </div>
  );
}
