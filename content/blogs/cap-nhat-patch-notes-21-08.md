---
title: 'Patch Notes AetherMine 21/08: Đại Tu Dungeon Party, Boss Phụ Bản & Tẩy Chỉ Số'
date: '2026-08-21'
author: 'Dev Team AetherMine'
category: 'Patch Notes'
tags:
  [
    'AetherMine',
    'Patch Notes',
    'Minecraft RPG',
    'Dungeon',
    'Boss Phụ Bản',
    'Tẩy Đồ',
    'Bloodmoon',
    'mc.aethermines.com',
  ]
excerpt: 'Bản cập nhật 21/08 tập trung đại tu Hệ Thống Dungeon Party & Boss Phụ Bản: cơ chế hồi sinh an toàn, chống canh dính đòn, giới hạn Boss hằng ngày, tính năng Tẩy Đồ /taydo và cân bằng kinh tế.'
coverImage: '/images/blogs/patch-notes.png'
featured: false
---

# Nhật Ký Cập Nhật — 21/08/2026

Tâm điểm của bản cập nhật lần này là **Đại Tu Hệ Thống Dungeon Party & Boss Phụ Bản**, giúp tổ đội chinh phục các Dungeon thử thách mượt mà và công bằng hơn, cùng tính năng **Tẩy Chỉ Số Trang Bị (`/taydo`)** và các tinh chỉnh trải nghiệm người chơi.

---

## 1. 🏰 Tiêu Điểm: Đại Tu Hệ Thống Dungeon Party & Boss Phụ Bản (`/dungeon`)

Hệ thống Phụ Bản Tổ Đội (Dungeon Party) nhận được nâng cấp toàn diện nhằm mang lại trải nghiệm chiến đấu Boss gay cấn, hạn chế tối đa trải nghiệm ức chế khi hy sinh và đảm bảo tính cân bằng giữa các đội chơi.

### 🛡️ Cơ Chế Hồi Sinh An Toàn & Chống Canh Đòn (Anti-Spawn-Camp)
- **Hồi sinh tức thì:** Người chơi hy sinh trong phụ bản sẽ hồi sinh ngay lập tức tại vị trí an toàn thay vì bị kẹt màn hình báo tử.
- **Khiên Bất Tử 5 Giây:** Nhận ngay khiên bảo vệ bất tử 5 giây sau khi hồi sinh, giúp bạn có thời gian định hình lại trận đấu và tái hòa nhập giao tranh.
- **Thời gian an toàn 3 giây:** Khoảng thời gian bảo vệ đặc biệt chống lại tình trạng bị Boss hoặc quái vây quẹt chết ngay khi vừa bước ra khỏi điểm hồi sinh.
- **Không còn ngã phụ bản sớm:** Sửa lỗi phụ bản bị hủy vô lý khi có thành viên hy sinh. Nếu người chơi vẫn còn lượt sống, nhân vật sẽ tiếp tục chiến đấu cùng đồng đội thay vì làm thất bại cả Dungeon.

### 🚪 Phí Mở Phụ Bản & Giới Hạn Khiêu Chiến Boss
- **Phí mở cửa Dungeon:** Đội trưởng (Party Leader) có thể sử dụng Money để mở các phụ bản cấp cao (ví dụ: Dungeon *Hạc Ngục Hư Không* yêu cầu 100M Money mở cửa). Nếu tạo phòng thất bại, hệ thống sẽ **tự động hoàn tiền 100%**.
- **Lượt Boss hằng ngày:** Mỗi thành viên chỉ có **1 lượt khiêu chiến Boss hằng ngày** cho mỗi loại Dungeon, giúp tránh tình trạng spam phụ bản quá mức và giữ giá trị cho các vật phẩm rơi ra từ Boss.
- **Tọa độ Boss & Quái Tay Sai (Minions):** Boss phụ bản sẽ xuất hiện tại vị trí chiến đấu cố định trong bản đồ riêng biệt, triệu hồi thêm các đợt quái tay sai quấy rối để thử thách khả năng phối hợp đồng đội.

---

## 2. ✨ Tính Năng Mới: Tẩy Chỉ Số Trang Bị (`/taydo`)

| Nội dung | Chi tiết |
| :--- | :--- |
| **Lệnh thực thi** | `/taydo` (hoặc `/cleanse`, `/taychiso`) |
| **Tính năng** | Cho phép tẩy và roll lại các dòng chỉ số phụ của trang bị cao cấp trong khoảng tỉ lệ tối thiểu – tối đa theo phẩm chất món đồ (Tier). |
| **Bảo toàn trang bị** | **Giữ nguyên 100% cấp Cường Hóa** và toàn bộ **ô Ngọc đã khảm** trên trang bị. |
| **Đá Tẩy (Catalyst)** | Yêu cầu Đá Tẩy tương ứng với phẩm chất trang bị để tiến hành tẩy. |

---

## 3. 💰 Cân Bằng Kinh Tế & Tiền Phí Trang Bị

- **Phí Cường Hóa (`/cuonghoa`):** Áp dụng phí Money cho mỗi lần thử nâng cấp trang bị tùy theo mốc cấp độ (từ +0 đến +99). Phí được trừ trước khi nâng; thất bại vẫn tiêu tốn tiền phí.
- **Phí Đục Lỗ (`/duclo`):** Áp dụng phí Money cố định khi đục thêm ô khảm ngọc theo cấp độ đá đục (từ 1M đến 40M Money).
- **EXP Đào Quặng Kho Bang (`/gang vault`):** Khi bật tự động chuyển quặng vào Kho Bang, người chơi vẫn nhận đủ điểm kinh nghiệm đào quặng như bình thường.
- **Thông Báo Chợ Đen (`/ah`):** Tự động phát thông báo trên màn hình toàn máy chủ mỗi khi có vật phẩm mới được treo bán tại Chợ Đen (`/ah`, `/choden`, `/bm`).

---

## 4. 🏆 Thành Tựu, Bộ Thu Thập & Event Top Dmg (`/event`)

- **Thành Tựu & Bộ Thu Thập (`/thanhtuu`, `/collection`):** Sửa lỗi tính điểm diệt quái phụ bản cho Bộ Thu Thập. Thưởng thành tựu chuyển sang chế độ **nhận thủ công tại menu `/thanhtuu`** (click vào dòng *READY*) để tránh trôi quà.
- **Event Bloodmoon Top Dmg:** Sự kiện Bloodmoon diễn ra định kỳ vào **19:00 - 21:00 các ngày Thứ 3, Thứ 5, Thứ 7**. Boss Ma Vương và Boss Bloodmoon tự động phát thưởng trực tiếp cho **Top 1, Top 2, Top 3 Damage** khi sự kiện kết thúc hoặc khi Boss bị tiêu diệt.
- **Bảo Vệ Đất Cá Nhân (`/plotlimit`):** Giới hạn số lượng Hopper và tối ưu hóa hệ thống máy móc trên thế giới Đất Cá Nhân (`/plot`) để giữ cho máy chủ hoạt động mượt mà nhất.
- **Đồng Bộ Discord & Tiến Hóa Class:** Đồng bộ khung chat 2 chiều giữa game và Discord (`!playerlist`, `/discord link`). Mở khóa nhánh **Tiến Hóa Class** khi Chuyển Sinh (`/chuyensinh`, ví dụ: Chiến Binh ➔ Rồng Chiến).

---

Tham gia ngay tại **AetherMine Prison RPG**:
- **IP Java:** `mc.aethermines.com`
- **IP PE:** `mc.aethermines.com:24932`
- **Discord:** [discord.gg/mvRcGjDHVm](https://discord.gg/mvRcGjDHVm)

Xem thêm các bài viết trước: [06/08](/blog/cap-nhat-patch-notes-06-08) · [07/08](/blog/cap-nhat-patch-notes-07-08) · [08/08](/blog/cap-nhat-patch-notes-08-08) · [09/08](/blog/cap-nhat-patch-notes-09-08) · [10/08](/blog/cap-nhat-patch-notes-10-08) · [11/08](/blog/cap-nhat-patch-notes-11-08).
