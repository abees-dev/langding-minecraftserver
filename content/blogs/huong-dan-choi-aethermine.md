---
title: "Cẩm Nang Chơi AetherMine: Class, Đào Rank, Linh Hồn, Thành Tựu & Chuyển Sinh"
date: "2026-08-11"
author: "AetherMine Guide Team"
category: "Hướng Dẫn"
tags: ["Hướng Dẫn", "Tân Thủ", "Class", "Linh Hồn", "Thành Tựu", "Chuyển Sinh", "Bang Hội"]
excerpt: "Cẩm nang đầy đủ sau cập nhật 11/08: chọn class, vòng đào–rankup, trang bị/ngọc, Mảnh Linh Hồn, /thanhtuu & /danhhieu, Dungeon Biến Dị, Bang Hội và lộ trình Chuyển Sinh."
coverImage: "/images/blogs/beginner-guide.png"
featured: false
---

# Cẩm Nang Chơi AetherMine Prison RPG

Hướng dẫn theo hệ thống đang live sau cập nhật **11/08**. Mục tiêu: đào khoáng, tăng cấp, nâng trang bị, vượt **9 rank** nhà tù — chơi solo hoặc cùng Bang Hội.

Vòng lặp cốt lõi:

```text
Đào khoáng → Bán khoáng → Nâng cuốc → Tăng level → Rankup
                    └→ Dungeon → Trang bị → Ngọc / Cường hóa
                    └→ Linh Hồn / Thành tựu → Chuyển Sinh
```

---

## 1. Bắt đầu trong 10 phút

Kết nối: IP Java `mc.aethermines.com` · IP PE `mc.aethermines.com:24932` · Version `1.20.4+` (Khuyến nghị dùng `1.20.4 – 1.20.6` để tải resource pack/RSP đầy đủ).

1. Chọn class: **Chiến Binh**, **Pháp Sư**, **Cung Thủ** hoặc **Tu Sĩ**.
2. Nhận và trang bị **Cúp Tân Binh I**.
3. Từ sảnh **`world_spawn`**, mở `/warp` → khu Prison → **Mỏ Tân Binh**.
4. Đào khoáng đúng cấp mỏ.
5. `/sellgui` bán khoáng nhận tiền cá nhân.
6. `/dailyquest` + `/checkin` nhận nhiệm vụ ngày và điểm danh (mốc 3 / 7 / 14 / 30).
7. `/rank` xem điều kiện rank tiếp theo.
8. Gặp NPC **Tinh Luyện** và **Lò Rèn Cúp** tại sảnh để nâng cuốc.

Đăng nhập một lần tại Hub (Velocity) — vào server gameplay không cần đăng nhập lại.

---

## 2. Ba hướng phát triển

| Hướng | Việc cần làm | Kết quả |
| :--- | :--- | :--- |
| **Sức đào** | Đào, tinh luyện, nâng cuốc, rankup | Mỏ giàu hơn, thu nhập cao hơn |
| **Sức chiến** | Level MMOCore, dungeon, vũ khí/giáp, ngọc, cường hóa | Đánh Elite, Boss, event |
| **Bang Hội** | Nạp vault, quest bang, nâng cấp, chiếm KOTH | Buff nhóm, danh vọng, kinh tế chung |

Ba hướng bổ trợ nhau — không cần chọn một mình một hướng.

---

## 3. Đào, bán & 9 rank

### Bán cá nhân vs Bang

* `/sellgui` = giá cơ bản, tiền vào túi cá nhân — **không** nhân hệ số Bang.
* Hệ số Sell chỉ khi Leader/Co **Bán Tất Cả** trong `/gang vault` (tiền vào Bank Bang).

### Bảng rank

| # | Rank | Khoáng đại diện | Level MMOCore để lên rank kế |
| ---: | :--- | :--- | ---: |
| 1 | Tân Binh | Đá cuội | 10 |
| 2 | Tù Nhân | Than | 20 |
| 3 | Lao Công | Đồng | 30 |
| 4 | Thợ Đào | Sắt | 45 |
| 5 | Đội Trưởng | Vàng | 60 |
| 6 | Phó Quản Ngục | Redstone | 75 |
| 7 | Quản Ngục | Lapis | 90 |
| 8 | Bá Chủ Ngục Tù | Kim cương | 100 |
| 9 | Vượt Ngục | Ngọc lục bảo | Endgame |

Đủ tiền + level → `/rankup` / `/xrankup` (Money) hoặc `/xrankuppoint` (Point). Kiểm tra kỹ loại tiền trước khi xác nhận.

---

## 4. Nâng cuốc & tinh luyện

Mỗi rank có Cúp **I → V**. Quy trình:

1. Đào và giữ khoáng đúng rank.
2. NPC **Tinh Luyện** → nguyên liệu nén → **Đá Nâng Cấp**.
3. NPC **Lò Rèn Cúp** → nâng I → II → III → IV → V.

Ưu tiên nâng cuốc khi tốc độ đào chậm. Enchant **Nung Chảy** (Huyền thoại, cấp I–V) tự nung quặng theo tỉ lệ `20% → 100%`; khi bật nạp Kho Bang, thỏi vẫn vào vault bang.

---

## 5. Class, kỹ năng & dungeon

### Class cơ bản → chuyển sinh

| Class gốc | Class sau Chuyển Sinh |
| :--- | :--- |
| Chiến Binh | Chiến Binh Rồng |
| Cung Thủ | Kỹ Sư Ma Pháp |
| Pháp Sư | Tử Linh Pháp Sư |
| Tu Sĩ | Đại Tế Thức Tỉnh |

* Class chuyển sinh chỉ mở qua `/chuyensinh` — không hiện trong menu chọn class đầu.
* Giữ cấp kỹ năng cũ + thêm 4 skill độc quyền; chỉ số nền = class gốc cấp 100 + nền class mới.
* Toàn bộ skill dùng **Mana** (không còn Thể Lực / Tử Khí / …).
* Gắn skill: 4 ô chủ động (**[F] + số**), 2 ô passive riêng — không gắn nhầm loại.
* Xem chỉ số combat: `/stats` hoặc `/chiso` (chung / PvE / PvP + bonus Chuyển Sinh).

### Vũ khí theo class

* **Kiếm** — cận chiến ổn định · **Rìu** — đòn nặng · **Trượng** — phép · **Cung** — tầm xa (~85% sát thương kiếm cùng tier).

### Dungeon

Chọn khu quái đúng rank; mang đủ đồ và hồi phục; Elite/Boss nên đi nhóm. `/warp` để xem điểm đến.

---

## 6. Trang bị, đục lỗ, ngọc & cường hóa

1. Rèn / kiếm đồ đúng rank.
2. `/duclo` tạo ô khảm (có phí tiền mỗi lần; thất bại vẫn mất tiền + đá).
3. Gắn Ngọc phù hợp build (chỉ số roll ±10% khi tạo, giữ nguyên khi tháo).
4. `/cuonghoa` nâng cấp (mỗi lần thử có phí; thất bại vẫn mất tiền + đá).
5. `/phanra` phân rã trang sức dư → **Đá Cường Hóa Trang Sức**.

Thứ tự ưu tiên: đủ bộ đúng rank → nâng món chính → đục lỗ/ngọc → tối ưu endgame.

**Trần hữu ích khi build:** Hút Máu / Hút Máu Phép **15%**; Giảm Sát Thương **50%**; Chí mạng cộng thêm **80%**.

### Ghép Mũi Khoan

NPC **Thợ Rèn Đục Lỗ**: **8 Mũi Khoan cấp dưới → 1 cấp trên** (ô 1→7). Mũi Khoan Thiên Mệnh không ghép được.

---

## 7. Linh Hồn, Thành tựu & Dungeon Biến Dị

| Hệ | Lệnh | Việc làm |
| :--- | :--- | :--- |
| **Mảnh Linh Hồn** | `/linhhon` | Boss Prison rơi mảnh theo rank (Sơ → Huyền Thoại). Đổi tại Trạm Đổi / NPC Sứ Giả Linh Hồn: nguyên liệu, Mũi Khoan, Vé Biến Dị, Ấn Tín Long Tộc… |
| **Collection / Thành tựu** | `/collection`, `/thanhtuu` | Theo dõi quặng / quái / boss theo rank; mốc thưởng một lần; một số mốc mở khóa danh hiệu. |
| **Danh hiệu** | `/danhhieu` | Đeo name tag RGB trước tên trong chat. |
| **Dungeon Biến Dị** | `/dungeonbiendi` | Dùng **Vé** cho lần hạ boss kế → thêm Mảnh Linh Hồn. Affix tuần: Kiên Cố / Cuồng Nộ / Độc Tố / Bất Ổn. |

---

## 8. Nhiệm vụ ngày & tuần

* `/dailyquest` — nhiệm vụ cá nhân (đào trong `world_prison`, giết quái trong dungeon hợp lệ).
* Clear-all **ngày**: thêm **1 Điểm Kỹ Năng** + **1 Điểm Cây Kỹ Năng chung**.
* Clear-all **tuần**: thêm **3 Điểm Kỹ Năng** (+ **2 Điểm Thuộc Tính** và thưởng cũ).
* `/checkin` mỗi ngày — streak 3 / 7 / 14 / 30.

`/dailyquest` ≠ `/gang quest` — hai hệ độc lập.

---

## 9. Bang Hội (tóm tắt vận hành)

Mở `/gang` (`/bang`, `/banghoi`).

| Hệ | Chứa gì | Dùng để |
| :--- | :--- | :--- |
| **Vault** | Khoáng hợp lệ | Leader/Co **Bán Tất Cả** → tiền vào Bank |
| **Bank** | Tiền chung | Bang Level, upgrade, buff Shop |

* Nạp tiền mặt vào Bank chịu **thuế 30%** → ưu tiên nạp khoáng rồi Sell All.
* **Danh vọng** chỉ từ Quest Bang chung / cá nhân / Weekly — **không** còn từ đào hay nạp vault.
* Shop buff gợi ý: Sell **x1,5 / 30 phút** (100M), Haste I (50M), EXP x1,15 (75M).
* Nâng cấp đề xuất: **Sell → Magnet → Quest →** các upgrade PvE mới (Vitality, PvE Power/Resilience, Buff Mastery, Boss Hunter) → Warlord/Protection khi PvP.
* KOTH: `/gang koth` · Bang Chiến: **20:00** (`/gang war join`).

Chi tiết sâu hơn xem bài [Hướng Dẫn Bang Hội & KOTH](/blog/huong-dan-bang-hoi-koth-aethermine).

---

## 10. Plot, hòm & tiện ích hàng ngày

* **Plot:** `/plot` / `/p` tại `world_plot` — xây căn cứ, `/fly` miễn phí trong plot.
* **Hòm:** chìa Trang Sức Free (clear-all daily), Long Tộc (weekly), Ngọc (hub), Thiên Giới (`/shopdonate`).
* **Vote:** `/vote` — vote Minecraft-MP mỗi ngày, streak 3/7/14/30.
* **Online time:** `/onlinetime` (`/thoigian`) — claim thưởng theo tổng giờ chơi.
* **Mốc nạp:** `/mocnap`, `/streak-nap` sau khi đổi Point.
* **Chợ:** `/ah` / `/choden` — đăng bán / mua đồ người chơi.

---

## 11. Endgame: Prestige & Chuyển Sinh

| Hệ | Điều kiện (tóm tắt) | Vai trò |
| :--- | :--- | :--- |
| **Prestige** | Rank 9 + đủ tiền | Reset vòng đào/rank — grind mining dài hạn |
| **Chuyển Sinh** `/chuyensinh` | Rank 9 + Level 100 + 100M Money + Đá Chuyển Sinh | Meta RPG: perk, thuộc tính, class chuyển sinh, +5% EXP vĩnh viễn; level về 1 |

Mỗi Chuyển Sinh: **3 điểm perk**, **2 điểm thuộc tính**, +5% EXP. Điểm **Sức Mạnh** = `+2 HP` mỗi điểm; perk **Bất Hoại** = `+50 Máu` mỗi cấp.

---

## 12. Lộ trình đề xuất

### Solo

1. Daily + check-in + (tuỳ chọn) `/vote`.
2. Đào mỏ đúng rank → bán đủ mục tiêu gần.
3. Nâng cuốc khi chậm → dungeon lấy đồ & level.
4. Rankup khi đủ tiền/Point + level.
5. Collection / Linh Hồn khi bắt đầu farm boss.
6. Ngọc & cường hóa khi đã có đồ đáng giữ.

### Cùng bang

1. `/gang personal` → nạp vault đều → Leader Sell All.
2. Quest bang + weekly → kiếm danh vọng đúng nguồn.
3. Nâng Sell/Magnet trước → mở PvE upgrades khi đủ người online.
4. Tổ chức KOTH / Bang Chiến / boss theo lịch.

---

## 13. Lệnh thường dùng

| Lệnh | Công dụng |
| :--- | :--- |
| `/warp` | Danh sách khu vực |
| `/rank` / `/rankup` / `/xrankuppoint` | Rank |
| `/sellgui` | Bán khoáng cá nhân |
| `/dailyquest` / `/checkin` | Nhiệm vụ & điểm danh |
| `/stats` / `/chiso` | Chỉ số combat |
| `/duclo` / `/cuonghoa` / `/phanra` | Đục lỗ / cường hóa / phân rã |
| `/linhhon` | Đổi Mảnh Linh Hồn |
| `/thanhtuu` / `/collection` | Thành tựu |
| `/danhhieu` | Kho danh hiệu |
| `/dungeonbiendi` | Dungeon Biến Dị |
| `/gang` … | Bang Hội |
| `/plot` | Đất cá nhân |
| `/vote` / `/onlinetime` | Vote & thời gian online |
| `/chuyensinh` | Chuyển Sinh |
| `/enchanter` / `/tinkerer` / `/alchemist` | Phù phép |

---

## 14. FAQ nhanh

**`/sellgui` không nhân tiền?** Đúng — multiplier chỉ qua Sell All của Bang.  
**Đủ tiền chưa rankup?** Còn thiếu level MMOCore — xem `/rank`.  
**Nạp bank bị mất tiền?** Thuế 30% — ưu tiên nạp khoáng.  
**Nạp vault không tăng danh vọng?** Đúng theo bản 11/08 — danh vọng chỉ từ quest bang.  
**Prestige ≠ Chuyển Sinh:** Prestige = vòng đào; Chuyển Sinh = RPG + class tiến hóa.

---

Chúc bạn leo rank suôn sẻ tại **AetherMine** — Open **08:00 ngày 15/08**. IP Java `mc.aethermines.com` · IP PE `mc.aethermines.com:24932`.
