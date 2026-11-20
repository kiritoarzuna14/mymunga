"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCompass,
  IconCompassFilled,
  IconHome,
  IconHomeFilled,
  IconLibrary,
  IconLibraryFilled,
  IconUser,
  IconUserFilled,
} from "./icons";

const tabs = [
  { href: "/", label: "หน้าแรก", Icon: IconHome, ActiveIcon: IconHomeFilled },
  { href: "/discover", label: "ค้นพบ", Icon: IconCompass, ActiveIcon: IconCompassFilled },
  { href: "/library", label: "ชั้นหนังสือ", Icon: IconLibrary, ActiveIcon: IconLibraryFilled },
  { href: "/account", label: "บัญชี", Icon: IconUser, ActiveIcon: IconUserFilled },
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/read/")) return null;

  return (
    <nav className="bottom-nav" aria-label="เมนูหลักของแอป">
      {tabs.map(({ href, label, Icon, ActiveIcon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={active ? "nav-item active" : "nav-item"} aria-current={active ? "page" : undefined}>
            <span className="nav-item__icon">{active ? <ActiveIcon size={24} /> : <Icon size={24} />}</span>
            <small>{label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
