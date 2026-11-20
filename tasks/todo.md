# MyMunga — Backlog และเกณฑ์ตรวจรับ

จัดทำวันที่ 15 พฤศจิกายน 2026 · ใช้คู่กับ `tasks/plan.md`

ทุกงานยังไม่ได้เริ่มในแผน production นี้ แม้บางส่วนมีต้นแบบอยู่แล้ว รายการนี้เป็น task targets สำหรับรอบพัฒนา ไม่ใช่ผลทดสอบที่ผ่านแล้ว

ชื่อไฟล์ต่อไปนี้เป็นตำแหน่งที่เสนอสำหรับ target architecture ยังไม่ได้สร้าง scripts/routes/tests เหล่านั้น แต่ละงานกำหนดขอบเขตประมาณ S–M; หากพบว่าต้องแตะเกิน 5 ไฟล์หลักหรือใช้หลาย session ให้แตกเป็น subtask ก่อนทำ ไม่ยึดเวลา/ขนาดที่คาดเป็นข้อเท็จจริง

กติกาปิดงาน: acceptance ผ่าน + verification มีหลักฐาน + build/typecheck ที่จะตั้งใน Phase 1 ผ่าน + ไม่ถดถอย flow เดิม งานเอกสารใช้ review ที่ระบุแทนการอ้างคำสั่ง test ที่ยังไม่มี

## Phase 0 — ขอบเขตและการตัดสินใจ

### [ ] D01: สรุป PRD และบทบาทของผู้ใช้

**ผลที่ต้องได้:** มี journeys สำหรับผู้อ่าน ผู้สร้าง moderator และ finance

**Acceptance criteria**

- [ ] มี journeys สำหรับผู้อ่าน ผู้สร้าง moderator และ finance
- [ ] ระบุ launch scope กับ deferred scope และ Definition of Done
- [ ] เจ้าของตัดสินใจขอบเขตเนื้อหา/ภาษา/อุปกรณ์และมีผู้รับผิดชอบ

**Verification:** ทบทวนตัวอย่างเส้นทางใช้งานกับเจ้าของและ QA

**Dependencies:** ไม่มี · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/product/prd.md`, `docs/product/roles.md`

### [ ] D02: เลือก production topology และแผน migration

**ผลที่ต้องได้:** มี ADR เปรียบเทียบโฮสต์และสรุปตัวเลือกภายใต้งบ

**Acceptance criteria**

- [ ] มี ADR เปรียบเทียบโฮสต์และสรุปตัวเลือกภายใต้งบ
- [ ] ระบุ PoC server session, transaction driver, paid-image gateway และ webhook
- [ ] มีแผนย้ายโดเมน/rollback ที่คง stable user IDs และกั้น preview

**Verification:** ทบทวน diagram, data flow และ compatibility checklist ก่อนจัดซื้อบริการ

**Dependencies:** D01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/architecture/hosting.md`, `docs/architecture/migration.md`

#### Checkpoint Phase 0.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] D03: กำหนดกติกาขายเนื้อหาและเงื่อนไขเปิดตัว

**ผลที่ต้องได้:** สรุปราคาเครดิต/โบนัส/คืนเงิน/ส่วนแบ่ง/ถอนรายได้และตัวอย่างคำนวณ

**Acceptance criteria**

- [ ] สรุปราคาเครดิต/โบนัส/คืนเงิน/ส่วนแบ่ง/ถอนรายได้และตัวอย่างคำนวณ
- [ ] มีรายการตรวจสิทธิ์เผยแพร่และเอกสารธุรกิจกับผู้เชี่ยวชาญ
- [ ] กำหนดงบ เพดานโหลด และเจ้าของงาน provider onboarding

**Verification:** ตรวจ scenario ซื้อ/คืน/หักส่วนแบ่งและ checklist ผู้ให้บริการ; ไม่ตีความกฎหมายแทนผู้เชี่ยวชาญ

**Dependencies:** D01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/product/commerce-rules.md`, `docs/operations/launch-decisions.md`

#### Checkpoint Phase 0.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 1 — Server และ identity

### [ ] F01: ย้ายหน้าแรกเป็น typed app shell

**ผลที่ต้องได้:** หน้าแรก/หมวดหมู่คงธีมและใช้ routes/components

**Acceptance criteria**

- [ ] หน้าแรก/หมวดหมู่คงธีมและใช้ routes/components
- [ ] source แยกจาก build output และ build ซ้ำได้
- [ ] ตัวอย่างและ assets เดิมแสดงบนมือถือโดยไม่เกิด layout overflow

**Verification:** production build + Playwright หน้าแรกที่ desktop/mobile

**Dependencies:** D02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/page.tsx`, `components/site-shell.tsx`, `app/globals.css`, `package.json`

### [ ] F02: แยก environments และ deploy preview

**ผลที่ต้องได้:** dev/staging/production แยก secrets, DB/Auth endpoint และ object namespace

**Acceptance criteria**

- [ ] dev/staging/production แยก secrets, DB/Auth endpoint และ object namespace
- [ ] preview ใช้ข้อมูลสังเคราะห์และไม่มี production token ใน client/log
- [ ] มี CI build และ health/readiness check สำหรับ rollback

**Verification:** ตรวจ config matrix, secret scan และ deploy staging พร้อมทดสอบ rollback

**Dependencies:** F01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/operations/environments.md`, `.github/workflows/ci.yml`, `app/api/health/route.ts`

#### Checkpoint Phase 1.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] F03: ทำบัญชีและ server session ให้ครบ

**ผลที่ต้องได้:** สมัคร/verify/login/logout/reset/expired link ผ่านอีเมลจริง

**Acceptance criteria**

- [ ] สมัคร/verify/login/logout/reset/expired link ผ่านอีเมลจริง
- [ ] server ปฏิเสธ session ที่หาย/หมดอายุและรักษา mapping user ID
- [ ] session คืนหลัง reload และจัดการ browser/cross-domain errors ชัดเจน

**Verification:** auth integration + Playwright ทุก flow บน staging และอีเมลทดสอบที่ได้รับอนุญาต

**Dependencies:** F02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/auth/server.ts`, `app/api/auth/[...path]/route.ts`, `components/auth/form.tsx`, `tests/auth.spec.ts`

### [ ] F04: บังคับ role และ staff MFA

**ผลที่ต้องได้:** ทุก resource ตรวจ owner/role ฝั่ง server

**Acceptance criteria**

- [ ] ทุก resource ตรวจ owner/role ฝั่ง server
- [ ] การแก้ client metadata หรือเดา resource ID เพิ่มสิทธิ์ไม่ได้
- [ ] staff MFA ใช้ตัวรองรับจริงและ direct-origin bypass ถูกปิด

**Verification:** negative API tests ระหว่างสองบัญชี/สองบทบาท และตรวจ staff origin โดยตรง

**Dependencies:** F03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/auth/permissions.ts`, `app/api/staff/route.ts`, `tests/authorization.test.ts`, `docs/security/staff-access.md`

#### Checkpoint Phase 1.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] F05: สร้าง migration และฐานการตรวจสอบระบบ

**ผลที่ต้องได้:** schema ของแอปแยกจาก managed auth schema และ migration มี version

**Acceptance criteria**

- [ ] schema ของแอปแยกจาก managed auth schema และ migration มี version
- [ ] พิสูจน์ transaction rollback/row lock บน driver ที่เลือก
- [ ] มี request ID, audit skeleton และ CI ป้องกัน secret รั่ว

**Verification:** migration ขึ้น/อ่านสภาพเดิมบน DB ทดสอบ + transaction concurrency PoC + secret scan

**Dependencies:** F02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/schema.ts`, `drizzle.config.ts`, `lib/observability.ts`, `tests/db-transaction.test.ts`

#### Checkpoint Phase 1.3

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 2 — ผู้สร้างและเนื้อหา

### [ ] C01: สมัครเป็นผู้สร้างพร้อมข้อมูลสิทธิ์ผลงาน

**ผลที่ต้องได้:** creator มีสถานะสมัคร/อนุมัติและประวัติผู้อนุมัติ

**Acceptance criteria**

- [ ] creator มีสถานะสมัคร/อนุมัติและประวัติผู้อนุมัติ
- [ ] บันทึกหลักฐานและขอบเขตสิทธิ์ผลงานโดยไม่เปิดเอกสารส่วนตัวสาธารณะ
- [ ] creator ที่ยังไม่อนุมัติเผยแพร่ผลงานไม่ได้

**Verification:** integration onboarding และ negative permission tests

**Dependencies:** D03, F04, F05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/creators.ts`, `app/api/creators/route.ts`, `components/creator-onboarding.tsx`, `tests/creator.test.ts`

### [ ] C02: สร้างและแก้ข้อมูลเรื่องแบบ draft

**ผลที่ต้องได้:** กรอกชื่อ เรื่องย่อ ประเภท tags และ aliases ได้พร้อม validation

**Acceptance criteria**

- [ ] กรอกชื่อ เรื่องย่อ ประเภท tags และ aliases ได้พร้อม validation
- [ ] เฉพาะเจ้าของ/ผู้มีสิทธิ์แก้ได้และ draft ไม่อยู่ public catalog
- [ ] slug/metadata รองรับภาษาไทยและกันข้อมูลซ้ำตามกติกา

**Verification:** story CRUD integration + owner/non-owner + input validation

**Dependencies:** C01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/stories.ts`, `app/api/stories/route.ts`, `components/story-form.tsx`, `tests/stories.test.ts`

#### Checkpoint Phase 2.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] C03: อัปโหลดภาพเข้าพื้นที่กักไฟล์

**ผลที่ต้องได้:** server ออก upload grant เฉพาะเจ้าของและ object key ที่อนุญาต

**Acceptance criteria**

- [ ] server ออก upload grant เฉพาะเจ้าของและ object key ที่อนุญาต
- [ ] จำกัดชนิด ขนาด จำนวนภาพ และ quota; finalize ตรวจไฟล์จริง
- [ ] ไฟล์ยังไม่ผ่าน processing ไม่มี public read และ retry ไม่เกิด object record ซ้ำ

**Verification:** ทดสอบไฟล์ชนิดผิด/ใหญ่เกิน/หมดอายุและการ finalize ซ้ำ

**Dependencies:** C02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/media/uploads.ts`, `app/api/uploads/route.ts`, `components/upload-input.tsx`, `tests/uploads.test.ts`

### [ ] C04: ประมวลผลภาพและสร้าง derivatives

**ผลที่ต้องได้:** ตรวจขนาดพิกเซล/รูปเสีย ลบ EXIF และสร้าง variants ตาม config

**Acceptance criteria**

- [ ] ตรวจขนาดพิกเซล/รูปเสีย ลบ EXIF และสร้าง variants ตาม config
- [ ] job retry ปลอดภัยและแสดง processing/failed/ready
- [ ] outbox ยืนยันการส่งงานและมีขั้นตอนจัดการ orphan objects

**Verification:** integration รูปปกติ/เสีย/ขนาดผิด + job retry และ reconciliation

**Dependencies:** C03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `jobs/process-image.ts`, `lib/media/variants.ts`, `db/media.ts`, `tests/media-job.test.ts`

#### Checkpoint Phase 2.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] C05: สร้างตอนและส่งตรวจ revision

**ผลที่ต้องได้:** เพิ่มตอนภาพพร้อมจัดลำดับหรือเนื้อหานิยายที่ sanitize ได้

**Acceptance criteria**

- [ ] เพิ่มตอนภาพพร้อมจัดลำดับหรือเนื้อหานิยายที่ sanitize ได้
- [ ] autosave/version conflict ไม่ทับงานอีก session
- [ ] ส่ง review ได้เมื่อไฟล์ครบและเก็บ revision ที่ preview ตรงกับส่งตรวจ

**Verification:** chapter editor E2E + conflict และ processing-incomplete tests

**Dependencies:** C02, C04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/api/chapters/route.ts`, `components/chapter-editor.tsx`, `db/chapters.ts`, `tests/chapter-editor.spec.ts`

#### Checkpoint Phase 2.3

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 3 — อ่านเรื่องจริง

### [ ] R01: เผยแพร่ตอนที่อนุมัติและแสดง catalog จริง

**ผลที่ต้องได้:** approve/publish บันทึกผู้ดำเนินการและ published revision

**Acceptance criteria**

- [ ] approve/publish บันทึกผู้ดำเนินการและ published revision
- [ ] catalog/detail/chapter list อ่านจาก DB พร้อม pagination
- [ ] draft/rejected/scheduled ไม่รั่วจาก API หรือ search

**Verification:** publish-to-catalog E2E และ direct unpublished API tests

**Dependencies:** C05, F04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/stories/[slug]/page.tsx`, `app/api/publish/route.ts`, `lib/catalog.ts`, `tests/publish.spec.ts`

### [ ] R02: สร้าง manga reader บนมือถือ

**ผลที่ต้องได้:** เลื่อนอ่านและเปลี่ยนตอนตามลำดับถูกต้อง

**Acceptance criteria**

- [ ] เลื่อนอ่านและเปลี่ยนตอนตามลำดับถูกต้อง
- [ ] lazy loading/prefetch ไม่โหลดทั้งชุดล่วงหน้าและมีขนาดภาพคงที่
- [ ] จัดการภาพเสีย/การเชื่อมต่อหลุดพร้อม retry และปุ่มใช้งานด้วย keyboard

**Verification:** Playwright มือถือ + visual/keyboard check และ network-throttle check

**Dependencies:** R01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/read/[chapter]/page.tsx`, `components/manga-reader.tsx`, `lib/reader/manifest.ts`, `tests/manga-reader.spec.ts`

#### Checkpoint Phase 3.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] R03: สร้าง novel reader พร้อมการตั้งค่า

**ผลที่ต้องได้:** อ่านนิยายจาก revision ที่เผยแพร่และ HTML ถูก sanitize

**Acceptance criteria**

- [ ] อ่านนิยายจาก revision ที่เผยแพร่และ HTML ถูก sanitize
- [ ] ปรับ font/line height/theme พร้อมจดจำ preference
- [ ] reader controls ใช้งานกับ keyboard และ screen reader ได้

**Verification:** XSS payload tests + novel reader E2E + manual accessibility review

**Dependencies:** R01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `components/novel-reader.tsx`, `lib/content/sanitize.ts`, `app/api/preferences/route.ts`, `tests/novel-reader.spec.ts`

### [ ] R04: บันทึกชั้นหนังสือและอ่านต่อข้ามอุปกรณ์

**ผลที่ต้องได้:** follow/bookmark/progress ผูก user และ chapter revision

**Acceptance criteria**

- [ ] follow/bookmark/progress ผูก user และ chapter revision
- [ ] sync สองอุปกรณ์ใช้กติกา conflict ที่กำหนด
- [ ] ผู้ใช้อื่นอ่านหรือแก้ shelf/progress ไม่ได้

**Verification:** API ownership + multi-session progress E2E

**Dependencies:** R02, R03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/reading.ts`, `app/api/reading/route.ts`, `components/library.tsx`, `tests/reading-progress.spec.ts`

#### Checkpoint Phase 3.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] R05: ตรวจสิทธิ์ก่อนส่ง private chapter assets

**ผลที่ต้องได้:** private bucket เปิด URL ตรงไม่ได้และ grant มี chapter/revision/expiry

**Acceptance criteria**

- [ ] private bucket เปิด URL ตรงไม่ได้และ grant มี chapter/revision/expiry
- [ ] edge ตรวจสิทธิ์ก่อน cache hit และแยกสิทธิ์ข้ามบัญชี
- [ ] เมื่อซ่อนตอน/หมดสิทธิ์มี revoke/expiry และพฤติกรรม offline ที่ระบุ

**Verification:** authorized/unauthorized/expired-token/CDN-cache integration tests

**Dependencies:** R02, F04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/reader/grants.ts`, `worker/media.ts`, `app/api/read-grants/route.ts`, `tests/private-media.test.ts`

#### Checkpoint Phase 3.3

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

**Milestone A:** รุ่นอ่านฟรีพร้อมผู้ทดสอบวงจำกัด; ไม่รับเงินจริง

## Phase 4 — หลังบ้านและการดูแล

### [ ] O01: จัดคิวรายงานเนื้อหาและคำอุทธรณ์

**ผลที่ต้องได้:** report/case มีสถานะและผู้รับผิดชอบ

**Acceptance criteria**

- [ ] report/case มีสถานะและผู้รับผิดชอบ
- [ ] hide/restore ส่งผลกับ catalog/search/read grants ตาม SLA
- [ ] ทุก staff action มีเหตุผลและ audit ที่แก้ย้อนหลังไม่ได้ผ่านหน้าจอ

**Verification:** moderation E2E + non-moderator denial + cache/revoke test

**Dependencies:** R01, F04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/admin/cases/page.tsx`, `app/api/moderation/route.ts`, `db/moderation.ts`, `tests/moderation.spec.ts`

### [ ] O02: ตั้งเวลาเผยแพร่และย้อน revision

**ผลที่ต้องได้:** จัดเก็บเวลา UTC และแสดง timezone ที่ถูกต้อง

**Acceptance criteria**

- [ ] จัดเก็บเวลา UTC และแสดง timezone ที่ถูกต้อง
- [ ] scheduler ทำซ้ำไม่ publish/notify ซ้ำ
- [ ] rollback เลือก revision ที่ตรวจแล้วและมี audit

**Verification:** fake-clock integration + duplicate schedule event + revision rollback test

**Dependencies:** R01, C04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `jobs/publish-scheduled.ts`, `lib/content/revisions.ts`, `components/publish-schedule.tsx`, `tests/scheduling.test.ts`

#### Checkpoint Phase 4.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] O03: จัดการ profile และคำขอข้อมูลบัญชี

**ผลที่ต้องได้:** แก้ profile ผ่าน validation และไม่มี role field ที่เพิ่มสิทธิ์ได้

**Acceptance criteria**

- [ ] แก้ profile ผ่าน validation และไม่มี role field ที่เพิ่มสิทธิ์ได้
- [ ] export/delete request มีสถานะและตรวจเจ้าของ
- [ ] retention ลบข้อมูลส่วนบุคคลตามนโยบายโดยไม่ทำลายรายการที่จำเป็นต้องรักษา

**Verification:** profile/ownership tests และ dry-run data lifecycle บนข้อมูลสังเคราะห์

**Dependencies:** F03, R04, D03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/account/page.tsx`, `app/api/account/route.ts`, `jobs/account-data.ts`, `tests/account-data.test.ts`

### [ ] O04: รับแจ้งปัญหาตอนอ่านและติดตาม support

**ผลที่ต้องได้:** ticket อ้างเรื่อง/ตอน/อุปกรณ์ได้โดยไม่เก็บ secret URL

**Acceptance criteria**

- [ ] ticket อ้างเรื่อง/ตอน/อุปกรณ์ได้โดยไม่เก็บ secret URL
- [ ] ผู้ใช้เห็นเฉพาะ ticket ตนและ staff เห็นตามสิทธิ์
- [ ] สถานะแก้ไขและข้อความแจ้งผู้ใช้ตรวจสอบย้อนหลังได้

**Verification:** support API negative tests + ticket E2E

**Dependencies:** O01, R02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/support/page.tsx`, `app/api/support/route.ts`, `db/support.ts`, `tests/support.spec.ts`

#### Checkpoint Phase 4.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 5 — Ledger และการซื้อสิทธิ์

### [ ] W01: สร้าง ledger พร้อมข้อบังคับความถูกต้อง

**ผลที่ต้องได้:** journal append-only และ entries สมดุลแยกหน่วยเครดิต/สตางค์

**Acceptance criteria**

- [ ] journal append-only และ entries สมดุลแยกหน่วยเครดิต/สตางค์
- [ ] idempotency/reference มี unique constraints และ reversal อ้างต้นฉบับ
- [ ] reconciliation ตรวจยอด cache กับ journal แล้วรายงานส่วนต่างได้

**Verification:** SQL invariants/property tests + duplicate write และ rollback integration

**Dependencies:** D03, F05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/ledger.ts`, `lib/commerce/ledger.ts`, `tests/ledger.test.ts`, `jobs/reconcile-ledger.ts`

### [ ] W02: สร้างราคาและ order snapshot

**ผลที่ต้องได้:** server อ่านราคาปัจจุบันและเก็บ price/package/share version

**Acceptance criteria**

- [ ] server อ่านราคาปัจจุบันและเก็บ price/package/share version
- [ ] ค่า client ที่แก้ amount/coins ไม่เปลี่ยนยอดจริง
- [ ] ราคาที่เปลี่ยนระหว่างซื้อมีการยืนยันหรือกติกาที่ระบุไว้

**Verification:** order validation + tampered-price integration tests

**Dependencies:** W01, R01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `db/orders.ts`, `lib/commerce/pricing.ts`, `app/api/orders/route.ts`, `tests/orders.test.ts`

#### Checkpoint Phase 5.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] W03: ตัดเครดิตและปลดล็อกตอนแบบ atomic

**ผลที่ต้องได้:** debit กับ entitlement สำเร็จหรือ rollback พร้อมกัน

**Acceptance criteria**

- [ ] debit กับ entitlement สำเร็จหรือ rollback พร้อมกัน
- [ ] ซื้อซ้ำ/หลายแท็บไม่หักซ้ำและยอดไม่ติดลบภายใต้ concurrency
- [ ] ยังเข้าได้ตามสิทธิ์ที่ซื้อแม้หน้าอ่านเปิดใหม่หรือราคาเปลี่ยนตามนโยบาย

**Verification:** concurrent purchase integration + unlock E2E + insufficient-balance test

**Dependencies:** W02, R05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/commerce/unlock.ts`, `app/api/unlock/route.ts`, `components/unlock-dialog.tsx`, `tests/unlock-concurrency.test.ts`

### [ ] W04: ปรับยอดและจัดการโบนัสด้วยรายการชดเชย

**ผลที่ต้องได้:** เครดิตซื้อ/โบนัสและวันหมดอายุมี allocation ที่ตรวจย้อนหลังได้

**Acceptance criteria**

- [ ] เครดิตซื้อ/โบนัสและวันหมดอายุมี allocation ที่ตรวจย้อนหลังได้
- [ ] การคืน/ปรับไม่แก้ journal เดิมและขอเหตุผล/สิทธิ์อนุมัติ
- [ ] กติกาคืนเงินหลังใช้เครดิตและการระงับความเสี่ยงมีผลทดสอบชัดเจน

**Verification:** bonus allocation/expiry tests + reversal invariants + approval negative tests

**Dependencies:** W01, F04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/commerce/adjustments.ts`, `db/credit-lots.ts`, `app/api/adjustments/route.ts`, `tests/adjustments.test.ts`

#### Checkpoint Phase 5.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 6 — Payments และรายได้ผู้สร้าง

### [ ] P01: สร้าง payment adapter และ checkout sandbox

**ผลที่ต้องได้:** provider ผ่านการตรวจขอบเขตธุรกิจและมี sandbox credentials

**Acceptance criteria**

- [ ] provider ผ่านการตรวจขอบเขตธุรกิจและมี sandbox credentials
- [ ] checkout มี pending/expired/failed/paid และผูก order ID
- [ ] หน้า success ไม่เพิ่มเครดิตและ merchant secret ไม่อยู่ client

**Verification:** sandbox checkout integration + client-bundle secret scan

**Dependencies:** W02, D03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/payments/provider.ts`, `app/api/checkout/route.ts`, `components/top-up.tsx`, `tests/checkout.spec.ts`

### [ ] P02: รับ webhook และเพิ่มเครดิตอย่างปลอดภัย

**ผลที่ต้องได้:** ตรวจ signature และ order/amount/currency/provider state ก่อนลง journal

**Acceptance criteria**

- [ ] ตรวจ signature และ order/amount/currency/provider state ก่อนลง journal
- [ ] webhook inbox เก็บ dedupe key และรับ event ซ้ำ/สลับลำดับได้
- [ ] DB credit กับ outbox เปลี่ยนพร้อมกันและ retry ไม่เพิ่มเครดิตซ้ำ

**Verification:** signed/forged/duplicate/out-of-order webhook integration tests

**Dependencies:** P01, W01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/api/webhooks/payments/route.ts`, `lib/payments/settle.ts`, `db/webhook-inbox.ts`, `tests/payment-webhooks.test.ts`

#### Checkpoint Phase 6.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] P03: ตรวจยอดกับ provider และจัดการคืนเงินจริง

**ผลที่ต้องได้:** scheduled reconciliation ตรวจ paid orders กับ provider/ledger

**Acceptance criteria**

- [ ] scheduled reconciliation ตรวจ paid orders กับ provider/ledger
- [ ] refund/dispute มี pending/final states และรายการชดเชยตรงผลจริง
- [ ] support/finance มีขั้นตอนจัดการ unmatched transaction ที่มี audit

**Verification:** sandbox partial/full/pending refund + missed-event reconciliation test

**Dependencies:** P02, W04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `jobs/reconcile-payments.ts`, `lib/payments/refunds.ts`, `app/finance/reconciliation/page.tsx`, `tests/refunds.test.ts`

### [ ] P04: แสดงรายได้และเตรียม payout batch

**ผลที่ต้องได้:** รายได้ผู้สร้างเก็บ share/price snapshot และแยก pending/available/paid

**Acceptance criteria**

- [ ] รายได้ผู้สร้างเก็บ share/price snapshot และแยก pending/available/paid
- [ ] batch payout ตรวจ eligibility/hold/เอกสารตาม provider และอนุมัติแยกคน
- [ ] ส่งซ้ำหรือ payout failed ไม่จ่ายซ้ำและ reconcile กลับบัญชีได้

**Verification:** earnings calculation + sandbox payout retry/approval tests; กรณี provider ไม่รองรับให้ทดสอบ workflow ส่งต่อทีมการเงิน

**Dependencies:** P03, C01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/finance/earnings.ts`, `lib/finance/payouts.ts`, `app/creator/earnings/page.tsx`, `tests/payouts.test.ts`

#### Checkpoint Phase 6.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] P05: ซ้อมหยุดรับเงินและ replay เหตุการณ์ผิดพลาด

**ผลที่ต้องได้:** feature flag หยุด checkout ใหม่โดยยังให้ผู้ซื้อเดิมอ่านได้

**Acceptance criteria**

- [ ] feature flag หยุด checkout ใหม่โดยยังให้ผู้ซื้อเดิมอ่านได้
- [ ] timeout/provider outage/webhook หายไม่ทำให้ยอดเงินหรือสิทธิ์สูญหาย
- [ ] มีหลักฐาน sandbox order → credits → unlock → earnings → refund

**Verification:** fault injection + replay/runbook walkthrough และ business acceptance

**Dependencies:** P02, P03, P04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/features/payments.ts`, `tests/commerce-flow.spec.ts`, `docs/runbooks/payments.md`

#### Checkpoint Phase 6.3

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

**Milestone B:** Commerce sandbox ครบวงจร; ยังต้องผ่าน Phase 8–9 ก่อนรับเงินจริง

## Phase 7 — Discovery และ engagement

### [ ] G01: แจ้งเตือนตอนใหม่ตามความต้องการสมาชิก

**ผลที่ต้องได้:** เฉพาะ published event ส่งถึงผู้ติดตามที่เลือกไว้

**Acceptance criteria**

- [ ] เฉพาะ published event ส่งถึงผู้ติดตามที่เลือกไว้
- [ ] retry ไม่แจ้งซ้ำและ unsubscribe มีผล
- [ ] เก็บ notification ในระบบก่อนส่ง channel ภายนอกและไม่มี private URL ในข้อความ

**Verification:** outbox retry/fanout integration + unsubscribe E2E

**Dependencies:** O02, R04 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `jobs/chapter-notifications.ts`, `db/notifications.ts`, `app/notifications/page.tsx`, `tests/notifications.test.ts`

### [ ] G02: วัดการอ่านและรายงานตัวเลขธุรกิจ

**ผลที่ต้องได้:** มี event definitions สำหรับอ่านจริง/ไม่ซ้ำ/order/settled/refund

**Acceptance criteria**

- [ ] มี event definitions สำหรับอ่านจริง/ไม่ซ้ำ/order/settled/refund
- [ ] ลด bot/reload ปั่น ranking และไม่เก็บ PII เกินจำเป็น
- [ ] dashboard แสดงความสดของข้อมูลและแยกยอดขายจากเงินรับจริง

**Verification:** event fixture/dedup tests + เปรียบเทียบ dashboard กับ source-of-truth queries

**Dependencies:** R04, P03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/analytics/events.ts`, `jobs/aggregate-metrics.ts`, `app/creator/analytics/page.tsx`, `tests/metrics.test.ts`

#### Checkpoint Phase 7.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] G03: ปรับค้นหาไทยและ metadata สำหรับ SEO

**ผลที่ต้องได้:** มีชุดคำค้นไทย aliases typo และ expected relevance

**Acceptance criteria**

- [ ] มีชุดคำค้นไทย aliases typo และ expected relevance
- [ ] pagination/filter/latency ผ่านเกณฑ์ที่ตกลงและไม่ index draft
- [ ] sitemap/canonical/social cards ไม่รวมหน้าบัญชีหรือ signed asset URLs

**Verification:** search relevance corpus + API performance check + sitemap crawl test

**Dependencies:** R01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/search/catalog.ts`, `app/api/search/route.ts`, `app/sitemap.ts`, `tests/search.test.ts`

### [ ] G04: จัดคอลเลกชันและโปรโมตเรื่อง

**ผลที่ต้องได้:** ทีม editorial จัด collection ที่มีเฉพาะเรื่องอนุมัติ

**Acceptance criteria**

- [ ] ทีม editorial จัด collection ที่มีเฉพาะเรื่องอนุมัติ
- [ ] กำหนดช่วงเวลาและลำดับโดยมี audit
- [ ] หน้าแรก empty/error/loading แสดงถูกและไม่เสียเมื่อเรื่องถูกซ่อน

**Verification:** editorial E2E + hidden-story regression

**Dependencies:** G02, R01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `app/admin/collections/page.tsx`, `app/api/collections/route.ts`, `components/collection-shelf.tsx`, `tests/collections.spec.ts`

#### Checkpoint Phase 7.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 8 — Beta และ production readiness

### [ ] Q01: ตรวจ authorization และ abuse cases ทั้งระบบ

**ผลที่ต้องได้:** ไม่มี Critical/High ที่ยังไม่จัดการตาม threat model

**Acceptance criteria**

- [ ] ไม่มี Critical/High ที่ยังไม่จัดการตาม threat model
- [ ] negative tests ครอบคลุม role/ownership/XSS/uploads/rate limits/secret leakage
- [ ] private image cache และ read grants ผ่านการทดสอบข้ามบัญชี

**Verification:** focused security review + API/asset attack fixtures บน staging

**Dependencies:** O03, P05, G01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `tests/security.spec.ts`, `tests/asset-access.test.ts`, `docs/security/review.md`

### [ ] Q02: วัดโหลดและต้นทุนตาม workload เปิดตัว

**ผลที่ต้องได้:** ทดสอบ representative data และ concurrency ที่กำหนด Phase 0

**Acceptance criteria**

- [ ] ทดสอบ representative data และ concurrency ที่กำหนด Phase 0
- [ ] บันทึก latency/cold start/locks/cache hit/error และ Web Vitals
- [ ] ระบุ capacity ceiling กับต้นทุนต่อ reads/uploads/orders พร้อม alert

**Verification:** load test แบบมี image traffic จริงและ cost model ที่ reproduce ได้

**Dependencies:** G02, P05, R05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `tests/load/reader.js`, `tests/load/unlock.js`, `docs/performance/baseline.md`

#### Checkpoint Phase 8.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] Q03: ซ้อม restore และ rollback ที่ข้อมูลสอดคล้อง

**ผลที่ต้องได้:** restore DB/assets ตาม RPO/RTO ที่ซื้อได้จริงและบันทึกเวลาที่ทำได้

**Acceptance criteria**

- [ ] restore DB/assets ตาม RPO/RTO ที่ซื้อได้จริงและบันทึกเวลาที่ทำได้
- [ ] หลัง restore journal/entitlements/media/outbox reconcile และ replay ได้
- [ ] migration/app rollback ซ้อมโดยไม่ replay เครดิตหรือ payout ซ้ำ

**Verification:** recovery exercise บน environment แยกและตรวจ post-restore invariants

**Dependencies:** F05, P03, R05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/runbooks/recovery.md`, `tests/recovery-invariants.test.ts`, `docs/runbooks/rollback.md`

### [ ] Q04: ทำ UAT กับนักเขียนและผู้อ่านกลุ่มทดสอบ

**ผลที่ต้องได้:** UAT ครบสร้าง → ตรวจ → อ่าน → เติม sandbox → ซื้อ → แจ้งปัญหา

**Acceptance criteria**

- [ ] UAT ครบสร้าง → ตรวจ → อ่าน → เติม sandbox → ซื้อ → แจ้งปัญหา
- [ ] ตรวจมือถือจริง keyboard/screen reader และ browser ที่ตกลง
- [ ] บั๊กมี severity/owner และไม่มี blocker เปิดตัวค้าง

**Verification:** recorded UAT matrix + regression suite และ sign-off จากผู้รับผิดชอบ

**Dependencies:** Q01, Q02, O04, G03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/qa/uat-matrix.md`, `tests/core-journeys.spec.ts`, `docs/qa/defects.md`

#### Checkpoint Phase 8.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] Q05: เตรียมงานปฏิบัติการและ launch checklist

**ผลที่ต้องได้:** support/moderation/finance/incident มี owner และ runbook

**Acceptance criteria**

- [ ] support/moderation/finance/incident มี owner และ runbook
- [ ] เอกสารสิทธิ์/privacy/refund/creator terms ผ่านผู้รับผิดชอบ
- [ ] SMTP/domain/merchant limits/budget alerts และ retention ตรวจครบ

**Verification:** tabletop incident + checklist evidence; ต้องมีผู้รับผิดชอบธุรกิจอนุมัติรายการเกี่ยวข้อง

**Dependencies:** Q03, Q04, D03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/operations/launch.md`, `docs/runbooks/incidents.md`, `docs/operations/support-finance.md`

#### Checkpoint Phase 8.3

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

## Phase 9 — เปิด production

### [ ] L01: ซ้อม cutover และจัด production configuration

**ผลที่ต้องได้:** production DNS/TLS/Auth callbacks/SMTP ถูกต้องและปิด dev origin

**Acceptance criteria**

- [ ] production DNS/TLS/Auth callbacks/SMTP ถูกต้องและปิด dev origin
- [ ] production ไม่มี sandbox secrets/seed/test users; backup พร้อม
- [ ] rollback owner และวิธีย้อน domain/release ถูกทดสอบ

**Verification:** production config audit + smoke test ก่อนเปิด audience

**Dependencies:** Q05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/operations/cutover.md`, `tests/smoke.spec.ts`, `docs/operations/production-config.md`

### [ ] L02: เปิดวงจำกัดแล้วตรวจเงินจริงที่ได้รับอนุมัติ

**ผลที่ต้องได้:** เจ้าของอนุมัติ audience และวงเงินของ live validation ก่อนทำรายการ

**Acceptance criteria**

- [ ] เจ้าของอนุมัติ audience และวงเงินของ live validation ก่อนทำรายการ
- [ ] เปิด free rollout ก่อน paid pilot พร้อม kill switch
- [ ] ธุรกรรมจริงมูลค่าต่ำที่อนุมัติผ่านเติม/ซื้อ/คืน/reconcile ตาม provider

**Verification:** owner-authorized live validation evidence + synthetic monitoring; ไม่มีการทำธุรกรรมจริงจากแผนนี้

**Dependencies:** L01 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/operations/rollout.md`, `docs/finance/live-validation.md`, `docs/operations/launch-metrics.md`

#### Checkpoint Phase 9.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] L03: ติดตามหลังเปิดและส่งมอบการดูแล

**ผลที่ต้องได้:** ติดตาม error/payment success/reconciliation/cost รายวันช่วงเปิดตัว

**Acceptance criteria**

- [ ] ติดตาม error/payment success/reconciliation/cost รายวันช่วงเปิดตัว
- [ ] มี incident owner และ rollback/stop-payment criteria
- [ ] ไม่มีความคลาดเคลื่อนเงินที่อธิบายไม่ได้และทุก blocker ปิดก่อนขยายกลุ่ม

**Verification:** hypercare review + daily operations handoff

**Dependencies:** L02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/operations/hypercare.md`, `docs/operations/handoff.md`

#### Checkpoint Phase 9.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

**Milestone C:** Production และการดูแลพร้อม; งาน Phase 10 เป็นการลงทุนต่อเมื่อมีข้อมูลจริง

## Phase 10 — ความสามารถขั้นสูงตามข้อมูลจริง

### [ ] A01: ทดลอง semantic discovery และคำแนะนำเฉพาะบุคคล

**ผลที่ต้องได้:** มี baseline และ metric ก่อนทดลอง A/B

**Acceptance criteria**

- [ ] มี baseline และ metric ก่อนทดลอง A/B
- [ ] ใช้ข้อมูลที่ได้รับอนุญาตและมี opt-out/retention
- [ ] ผลลัพธ์มีทาง fallback และผ่าน relevance/safety/cost review

**Verification:** offline relevance evaluation + controlled A/B + privacy review

**Dependencies:** L03, G02, G03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/discovery/recommendations.ts`, `jobs/discovery-index.ts`, `docs/experiments/recommendations.md`

### [ ] A02: เพิ่ม social login หรือบัญชีขั้นสูงที่มีความต้องการจริง

**ผลที่ต้องได้:** provider รองรับ production และมี credentials ของเรา

**Acceptance criteria**

- [ ] provider รองรับ production และมี credentials ของเรา
- [ ] account linking ทดสอบชนอีเมล/ยึดบัญชีและรักษา identity ที่ถูกต้อง
- [ ] มี rollback โดยไม่ทำให้บัญชีเดิมเข้าไม่ได้

**Verification:** provider sandbox E2E + account-linking security review

**Dependencies:** L03, F03 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `lib/auth/providers.ts`, `components/auth/providers.tsx`, `tests/account-linking.spec.ts`

#### Checkpoint Phase 10.1

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

### [ ] A03: ทดลอง PWA และ offline ที่สิทธิ์อนุญาต

**ผลที่ต้องได้:** cache เฉพาะเนื้อหาที่อนุญาตและมี storage quota

**Acceptance criteria**

- [ ] cache เฉพาะเนื้อหาที่อนุญาตและมี storage quota
- [ ] logout/หมดสิทธิ์/เปลี่ยนบัญชีจัดการ cache ตามนโยบาย
- [ ] update service worker ไม่ทำให้ reader หรือตอนที่ซื้อผิดเวอร์ชัน

**Verification:** offline/two-account/service-worker-update E2E

**Dependencies:** L03, R05 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `public/sw.js`, `lib/reader/offline.ts`, `tests/offline-reader.spec.ts`

### [ ] A04: ออกแบบรายได้และขยายระบบรุ่นถัดไป

**ผลที่ต้องได้:** subscription/bundles หรือ multi-publisher มี business case และ provider support

**Acceptance criteria**

- [ ] subscription/bundles หรือ multi-publisher มี business case และ provider support
- [ ] capacity/cost data ระบุว่าจะเพิ่ม search/replica/แยก service ตรงไหน
- [ ] แยกแผน implementation ใหม่ต่อความสามารถพร้อม migration/rollback

**Verification:** ทบทวน business metrics และเขียน ADR/plan ใหม่ก่อนเริ่มพัฒนา

**Dependencies:** L03, P04, G02 · **ขอบเขตตั้งต้น:** S–M (ยืนยันอีกครั้งก่อนเริ่ม)

**ตำแหน่งไฟล์ที่คาดว่าจะเกี่ยวข้อง:** `docs/roadmap/growth.md`, `docs/architecture/scaling.md`

#### Checkpoint Phase 10.2

- [ ] งานก่อนหน้าที่เกี่ยวข้องผ่าน acceptance พร้อมหลักฐานและ dependency ไม่ค้าง
- [ ] build/typecheck/tests ที่เกี่ยวข้องผ่าน หรือเอกสารถูกทบทวนสำหรับ Phase 0
- [ ] สาธิต flow จริงและบันทึกข้อสังเกต; เรื่องนโยบาย/งบ/สิทธิ์/ธุรกรรมจริงให้เจ้าของตัดสินใจ

รวม 47 งานหลัก ครอบคลุม Phase 0–10; ในจำนวนนี้ 43 งานอยู่ในเส้นทางถึง production
