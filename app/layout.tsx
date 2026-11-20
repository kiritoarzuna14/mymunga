import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./globals-v2.css";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { BottomNav } from "@/components/bottom-nav";
import { PwaRegister } from "@/components/pwa-register";
import { InstallPrompt } from "@/components/install-prompt";

export const metadata: Metadata = {
  title: {
    default: "MyMunga — โลกเรื่องราวของคุณ",
    template: "%s · MyMunga",
  },
  description:
    "MyMunga แพลตฟอร์มอ่านและเผยแพร่การ์ตูนกับนิยายภาษาไทย อ่านบนมือถือได้ลื่นไหล และติดตั้งเป็นแอปได้",
  applicationName: "MyMunga",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "MyMunga",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5faff" },
    { media: "(prefers-color-scheme: dark)", color: "#039ed4" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <a className="skip-link" href="#main">
            ข้ามไปเนื้อหาหลัก
          </a>
          <SiteHeader />
          <main id="main" className="app-main">
            {children}
          </main>
          <InstallPrompt />
          <BottomNav />
          <PwaRegister />
        </AuthProvider>
      </body>
    </html>
  );
}
