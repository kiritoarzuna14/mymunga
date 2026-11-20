"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "./auth-provider";
import { IconSearch, IconSparkle, IconUser } from "./icons";

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/discover", label: "ค้นพบ" },
  { href: "/library", label: "ชั้นหนังสือ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, openAuth, ready } = useAuth();
  const [query, setQuery] = useState("");

  if (pathname.startsWith("/read/")) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (pathname === "/" && !value) {
      window.dispatchEvent(new CustomEvent("mymunga:query", { detail: "" }));
      return;
    }
    router.push(value ? `/discover?q=${encodeURIComponent(value)}` : "/discover");
  }

  const initial = (user?.name || user?.email || "").trim().charAt(0).toUpperCase();

  return (
    <header className="site-header">
      <div className="bar">
        <Link href="/" className="logo" aria-label="MyMunga หน้าแรก">
          <IconSparkle size={15} className="logo-mark" />
          My<span>Munga</span>
        </Link>
        <nav className="site-nav" aria-label="เมนูหลัก">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : undefined}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form className="search" role="search" onSubmit={submit}>
          <IconSearch size={18} className="search__icon" />
          <label>
            <span className="sr-only">ค้นหาเรื่อง</span>
            <input
              type="search"
              placeholder="ค้นหาเรื่อง ผู้เขียน หรือหมวด"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </form>
        <div className="header-actions">
          <Link href="/discover" className="icon-btn header-search" aria-label="ไปหน้าค้นหา">
            <IconSearch size={21} />
          </Link>
          <button
            type="button"
            className={initial ? "avatar has-user" : "avatar"}
            onClick={openAuth}
            aria-label={user ? `บัญชีของ ${user.name || user.email}` : "เข้าสู่ระบบ"}
          >
            {!ready ? <span className="avatar__skeleton" aria-hidden="true" /> : initial ? initial : <IconUser size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
