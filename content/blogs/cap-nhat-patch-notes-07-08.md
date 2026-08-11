---
title: "Nhật Ký Cập Nhật 07/08: Phù Phép 72 Enchant, Sảnh world_spawn & Phí Cường Hóa"
date: "2026-08-07"
author: "Dev Team AetherMine"
category: "Patch Notes"
tags: ["Update", "Patch Notes", "Phù Phép", "Sảnh Mới", "Cường Hóa", "Kinh Tế"]
excerpt: "Commit 07/08: mở rộng AdvancedEnchantments (72 enchant / 474 cấp), Nung Chảy Huyền thoại, map spawn mới + Velocity, phí tiền Cường Hóa/Đục Lỗ và cân bằng giá bán khoáng."
coverImage: "/images/blogs/patch-notes.png"
featured: false
---

# Nhật Ký Cập Nhật — 07/08/2026

Ngày commit: **Phù phép**, **sảnh/proxy**, và **money sink** trên cường hóa / đục lỗ.

---

## 1. Phù Phép mở rộng

* Pool AdvancedEnchantments: **72 enchant**, **474 cấp độ** (+210 level mới).
* Cấp tối đa theo độ hiếm: Cơ bản/Độc đáo **V** → Tinh anh **VI** → Tối thượng **VII** → Huyền thoại **VIII** → Thần thoại **X**.
* Level cao tăng tỉ lệ kích hoạt, giảm nhẹ hồi chiêu (trần 100%). Enchant bật/tắt giữ cấp I.
* **Nung Chảy** → nhóm **Huyền thoại**, max **V** — tỉ lệ `20% / 40% / 60% / 80% / 100%`. Chỉ tự nung quặng, không nhân sản lượng. Fix: thỏi Nung Chảy vẫn nạp Kho Bang khi bật auto-deposit.
* Lệnh giữ: `/enchanter`, `/tinkerer`, `/alchemist`, `/enchants`, `/enchant <tên>`.

---

## 2. Sảnh chính mới & Velocity

* Sảnh chuyển từ `world` sang **`world_spawn`**.
* Cập nhật spawn mặc định và khu **Rương**, **Chế Tạo**, **Ủng Hộ**, **Giao Dịch**; chuyển NPC sang layout mới.
* Túi đồ sảnh dùng chung world gameplay; tắt PvP, bảo vệ phá/đặt block.
* Hub ↔ gameplay qua **Velocity** — đăng nhập tập trung tại Hub.

---

## 3. Kinh tế & phí nâng trang bị

* Đồng bộ giá bán `/sellgui` ↔ **Bán Tất Cả** Kho Bang; thống nhất ore / thỏi / block nén.
* Nâng thang bán khoáng + tăng chi tiêu Rank, Prestige, nâng cuốc, Bang, Quest Bang, đục lỗ.
* Thu nhập nền cuốc max mine gần cuối ≈ **5 triệu/phút** (chưa có Sell Upgrade).
* Mỗi lần **Cường Hóa** / **Đục Lỗ** có phí tiền; thất bại vẫn mất tiền và đá. Phí tăng theo cấp / số ô.

---

## 4. Core (cùng ngày)

* Money sink module **upgrade** + **sockets**.
* Gang vault auto-deposit tương thích enchant Nung Chảy.
* Thông báo listing **black market** (`/ah`, `/choden`).
