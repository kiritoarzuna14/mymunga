# MyMunga

ต้นแบบเว็บไซต์ภาษาไทยสำหรับอ่านการ์ตูนและนิยาย กำลังพัฒนาด้วย Next.js, React และ TypeScript ออกแบบให้ใช้งานได้ทั้งมือถือและคอมพิวเตอร์

## ความสามารถปัจจุบัน

- หน้าแนะนำเรื่อง ค้นหา กรอง จัดเรียง และอันดับเรื่อง
- หน้าเรื่อง รายการตอน และหน้าอ่านการ์ตูนกับนิยาย
- ปรับธีมและรูปแบบข้อความในหน้าอ่าน
- เก็บความคืบหน้าการอ่าน เรื่องที่ติดตาม และการตั้งค่าใน LocalStorage ของเบราว์เซอร์
- PWA manifest, service worker, หน้า offline และคำแนะนำติดตั้ง
- ส่วนเชื่อมต่อสมัครสมาชิก เข้าสู่ระบบ ออกจากระบบ และตั้งรหัสผ่านใหม่ผ่าน Neon Auth

เนื้อหาในโครงการเป็นข้อมูลตัวอย่าง ระบบชำระเงินและปลดล็อกตอนเป็นต้นแบบ ส่วนระบบผู้สร้าง การดูแลเนื้อหา รายได้ และการซิงก์ข้อมูลขึ้นคลาวด์ยังอยู่ระหว่างพัฒนา การเก็บข้อมูลการอ่านปัจจุบันยังอยู่ในเบราว์เซอร์แต่ละเครื่อง

## เทคโนโลยี

- **Next.js / React / TypeScript:** routes, components และหน้าอ่าน
- **CSS:** responsive layout และธีมการอ่าน
- **Neon Auth:** บริการยืนยันตัวตน ผ่าน proxy route `/api/auth/*`
- **LocalStorage:** ข้อมูลการอ่านและการตั้งค่าภายในเบราว์เซอร์
- **PWA / Service Worker:** การติดตั้งเว็บไซต์และหน้าสำรองเมื่อออฟไลน์
- **Node.js / pnpm:** ติดตั้ง dependencies และรันคำสั่งพัฒนา

## เริ่มพัฒนาในเครื่อง

ใช้ Node.js รุ่นที่ Next.js ใน `package.json` รองรับ และ pnpm ที่รองรับ `allowBuilds` ใน `pnpm-workspace.yaml`

1. ติดตั้ง dependencies:

   ```sh
   pnpm install --frozen-lockfile
   ```

2. คัดลอก `.env.example` เป็น `.env.local` แล้วตั้ง `NEON_AUTH_BASE_URL` เป็น endpoint ของโปรเจกต์ Neon Auth ของคุณ ตัวอย่างในไฟล์เป็น placeholder และใช้เชื่อมต่อจริงไม่ได้ ตั้งค่า trusted origins และ URL สำหรับ redirect/reset password ให้ตรงกับ origin ของเว็บด้วย

3. เปิด development server:

   ```sh
   pnpm dev
   ```

4. เปิด `http://localhost:3000`

เส้นทางยืนยันตัวตนต้องมี `NEON_AUTH_BASE_URL` ที่ถูกต้อง การทดสอบอีเมล ยืนยันอีเมล และรีเซ็ตรหัสผ่านต้องใช้การตั้งค่าของบริการ Neon Auth ของคุณ

## คำสั่ง

| คำสั่ง | หน้าที่ |
| --- | --- |
| `pnpm dev` | เปิด development server |
| `pnpm typecheck` | ตรวจชนิดข้อมูลด้วย TypeScript |
| `pnpm build` | สร้าง production build |
| `pnpm start` | เปิด production server หลัง build |
| `node scripts/generate-icons.mjs` | สร้างไอคอน PWA |

## โครงสร้าง

```text
app/          Next.js routes และ auth proxy
components/  UI, catalog, library และ readers
lib/         ข้อมูลตัวอย่างและการจัดการ reading state
public/      ภาพปก ไอคอน manifest และ service worker
scripts/     เครื่องมือสร้างไอคอน
tasks/       แผนพัฒนาและ backlog สำหรับระบบ production
neon.ts      การตั้งค่า Neon สำหรับงานพัฒนาต่อ
```

เอกสารใน `tasks/` เป็นแผนงาน จึงอาจอธิบายความสามารถที่ยังไม่ได้ทำเสร็จ

## ข้อมูลที่ไม่รวมใน repository

ใช้ `.env.local` เก็บค่าจริงในเครื่อง และตั้ง environment variables แยกในระบบที่นำไปติดตั้ง ไฟล์ environment จริง ข้อมูลการเชื่อมต่อฐานข้อมูล metadata ของ hosting, dependencies, logs และ build output ถูกกันด้วย `.gitignore` สำเนา source นี้ไม่รวมประวัติ static-site เดิมและไฟล์เฉพาะเครื่อง
