---
title: "Nhật Ký Cập Nhật 06/08: Class Chuyển Sinh, Linh Hồn, Thành Tựu & Dungeon Biến Dị"
date: "2026-08-06"
author: "Dev Team AetherMine"
category: "Patch Notes"
tags: ["Update", "Patch Notes", "Class", "Linh Hồn", "Thành Tựu", "Dungeon Biến Dị"]
excerpt: "Commit 06/08: làm mới class & cây kỹ năng (chỉ Mana), Mảnh Linh Hồn + Trạm Đổi, /thanhtuu, Vé Dungeon Biến Dị và thưởng điểm kỹ năng daily/weekly."
coverImage: "/images/blogs/patch-notes.png"
featured: false
---

# Nhật Ký Cập Nhật — 06/08/2026

Ngày commit tập trung vào **RPG depth**: class/skill, Linh Hồn, Thành tựu và Dungeon Biến Dị.

---

## 1. Class, kỹ năng & Mana

Người chơi mới chọn: **Chiến Binh**, **Pháp Sư**, **Cung Thủ**, **Tu Sĩ**. Class chuyển sinh chỉ nhận qua Chuyển Sinh:

| Class cơ bản | Class chuyển sinh |
| :--- | :--- |
| Chiến Binh | Chiến Binh Rồng |
| Cung Thủ | Kỹ Sư Ma Pháp |
| Pháp Sư | Tử Linh Pháp Sư |
| Tu Sĩ | Đại Tế Thức Tỉnh |

* Giữ cấp kỹ năng class cũ + thêm bốn kỹ năng độc quyền.
* Chỉ số nền = **toàn bộ chỉ số class gốc cấp 100** + nền class chuyển sinh; sau đó vẫn scale theo level.
* Cung Thủ thêm: **Tiễn Nổ Xuyên Phá**, **Vũ Tiễn Vạn Tiễn**.
* Toàn bộ class/skill chỉ dùng **Mana** (bỏ Thể Lực, Tử Khí, Linh Lực, Cuồng Nộ…). Skill chủ động Mana cố định; nâng cấp không tăng chi phí.

### Ô kỹ năng & cây kỹ năng

* Sáu ô gắn kỹ năng (mép phải): 4 ô chủ động (**[F] + số**), 2 ô passive riêng.
* Mỗi class có cây kỹ năng đúng vai trò + cây **Nền Tảng Chung**; Việt hóa giao diện, giữ tiến độ cây cũ.

### Nhiệm vụ ngày / tuần

* Clear-all **ngày**: **1 Điểm Kỹ Năng** + **1 Điểm Cây Kỹ Năng chung**.
* Clear-all **tuần**: **3 Điểm Kỹ Năng** (vẫn giữ **2 Điểm Thuộc Tính** và thưởng cũ).
* Nút **Bonus Clear-All** → **Thưởng Hoàn Thành Tất Cả**.

---

## 2. Mảnh Linh Hồn & Trạm Đổi

* Boss Prison trao **Mảnh Linh Hồn** theo nhóm rank: Sơ Cấp → Trung Cấp → Cao Cấp → Siêu Cấp → Huyền Thoại.
* `/linhhon` đổi mảnh lấy nguyên liệu, Mũi Khoan, Vé Dungeon Biến Dị và vật phẩm giá trị; gộp **Mảnh Long Tộc → Ấn Tín Long Tộc**.
* NPC **Sứ Giả Linh Hồn** mở trạm đổi trực tiếp.

### Ghép Đá Đục Lỗ

* **Bàn Ghép** + NPC **Thợ Rèn Đục Lỗ**: **8 Mũi Khoan cấp dưới → 1 cấp trên** (ô 1→7). Thiên Mệnh không ghép được.

---

## 3. Collection, Thành tựu & Dungeon Biến Dị

* `/collection` / `/thanhtuu`: theo dõi quặng / quái / boss theo rank; mốc thưởng một lần.
* **Rương Chọn Nguyên Liệu** — tự chọn phần thưởng thay vì quay ngẫu nhiên.
* **Vé Dungeon Biến Dị**: dùng cho lần hạ boss kế → thêm Mảnh Linh Hồn.
* Affix tuần: **Kiên Cố**, **Cuồng Nộ**, **Độc Tố**, **Bất Ổn**.
* **Huy Chương Mùa Bang** — cosmetic cho Bang dẫn đầu mùa.

---

## 4. Core (cùng ngày)

* Module **Engagement** (collection / mutation / soul-exchange).
* **Rebirth** — class evolution lần chuyển sinh đầu.
* **Black market** — action-bar khi đăng bán + alias `/ah`.
* Bang Chiến: thưởng xếp hạng top1–top3.
