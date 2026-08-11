---
title: "Nhật Ký Cập Nhật 08/08: Cân Bằng Combat, Ngọc Khảm, /stats & Bang Hội"
date: "2026-08-08"
author: "Dev Team AetherMine"
category: "Patch Notes"
tags: ["Update", "Patch Notes", "Combat", "Ngọc Khảm", "Bang Hội", "Cân Bằng"]
excerpt: "Commit 08/08: +5% combat cơ bản, trần Hút Máu 15%, cân bằng 100 ngọc, menu /stats, 5 nâng cấp Bang mới và danh vọng chỉ từ quest."
coverImage: "/images/blogs/patch-notes.png"
featured: false
---

# Nhật Ký Cập Nhật — 08/08/2026

Ngày commit: **cân bằng combat / ngọc** và **đại tu Bang Hội** (upgrade + danh vọng + shop buff).

---

## 1. Trang bị & cường hóa

* Tăng **5% chỉ số combat cơ bản** toàn bộ trang bị.
* Cường hóa vũ khí mỗi cấp: `+1 Sát Thương Cơ Bản`, `+0.4 Sát Thương Vật Lý`.
* Cường hóa giáp mỗi cấp: `+5 Máu`, `+1.75 Phòng Thủ`, `+0.35 Kháng Xuyên Giáp` (không cộng Armor; trần Armor **30**).
* Đồng bộ máu/sát thương Normal / Elite / Boss theo trang bị Tier III + mức nâng khuyến nghị theo rank.

### Set bonus & trần

* Set bonus cộng theo **phần tăng thêm từng mốc** (không cộng chồng toàn bộ mốc trước).
* Tách vai trò set: ST cơ bản / phép / vật lý / chí mạng / cơ động / chống chịu.
* Trần **Hút Máu & Hút Máu Phép**: **15%**.
* Trần Giảm ST (chung/PvE/PvP): **50%**; Chí mạng cộng thêm: **80%**.

### Ngọc khảm

* Cân bằng **100 viên** (10 loại × 10 cấp); roll **±10%** cố định khi tạo.
* Hoàng Ngọc → **Phòng Thủ**; giảm Hồi Máu & Tốc Độ Di Chuyển từ gem.
* Đổi tên hiển thị → **Kháng Xuyên Giáp**.

### `/stats` / `/chiso` & fix Chuyển Sinh

* Menu chỉ số chung / PvE / PvP + bonus Chuyển Sinh.
* Crit Power nền `100` → `0` (hiển thị đúng sát thương chí mạng cộng thêm).
* **Bất Hoại**: `+50 Máu` mỗi cấp; node **Sinh Lực Tối Đa** sửa `+5 Máu`; **Sức Mạnh** = `+2 HP` mỗi điểm.
* Hoàn thiện perk: Thần Phong, Học Giả, May Mắn Thần Thánh.

---

## 2. Bang Hội

### Shop buff

| Buff | Sau |
| :--- | :--- |
| Sell | **x1,5 / 30 phút** — 100 triệu Bank |
| Haste | **Haste I / 30 phút** — 50 triệu |
| EXP | **x1,15 / 30 phút** — 75 triệu |
| Sell (Weekly) | **x1,25 / 30 phút** |

GUI Shop hiện buff đang chạy, nguồn, thời gian còn lại, multiplier Sell hiệu lực.

### 5 nâng cấp mới (GUI 2 trang)

| Nâng cấp | Hiệu ứng |
| :--- | :--- |
| **Vitality** | + máu tối đa thành viên |
| **PvE Power** | + sát thương vs quái |
| **PvE Resilience** | − sát thương từ quái |
| **Buff Mastery** | + thời hạn buff Shop |
| **Boss Hunter** | + sát thương vs boss chỉ định |

Cần **Bang Level + danh vọng + Bank**. PvE không ảnh hưởng PvP.

### Danh vọng chỉ từ nhiệm vụ

* Không còn cộng từ đào / nạp vault / KOTH / war / giết quái ngoài quest.
* Chỉ từ **Quest Bang chung, cá nhân, Weekly**. Đóng góp đào vẫn ghi nhận riêng.
