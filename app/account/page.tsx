import type { Metadata } from "next";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = {
  title: "บัญชีของฉัน",
  description: "จัดการบัญชี สถิติการอ่าน และตัวเลือกการอ่านของ MyMunga",
};

export default function AccountPage() {
  return (
    <div className="wrap">
      <header className="page-head page-head--tight">
        <p className="eyebrow">ACCOUNT</p>
        <h1>บัญชีของฉัน</h1>
      </header>
      <AccountView />
    </div>
  );
}
