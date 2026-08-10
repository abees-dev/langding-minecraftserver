export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_LIST: FaqItem[] = [
  {
    q: 'Làm thế nào để tham gia máy chủ Minecraft AetherMine?',
    a: 'Bạn chỉ cần mở Minecraft Java Edition từ phiên bản 1.19.4 trở lên, chọn mục Chơi Mạng (Multiplayer) -> Thêm Máy Chủ (Add Server), nhập địa chỉ IP: mc.aethermines.com và kết nối ngay!',
  },
  {
    q: 'Hệ thống Bán Quặng (Base vs Multiplier Bang) hoạt động thế nào?',
    a: 'Bán cá nhân /sellgui áp dụng bảng giá Base cập nhật chuẩn (Stone 10$-20$, Than 80$, Sắt 100$-200$, Vàng 200$-400$, Kim cương 1,000$, Emerald 1,500$, Ancient Debris 2,000$). Khi tham gia Bang Hội, gửi quặng vào /gang vault và Sell All để hưởng Multiplier (+10%/lv), Buff Shop 2X và Paragon Sell.',
  },
  {
    q: 'Điểm khác biệt giữa Prestige và Chuyển Sinh (/chuyensinh)?',
    a: 'Prestige dành cho hệ đào quặng X-Prison: khi đạt rank 9 Vượt Ngục, bạn prestige để reset rank về Tân Binh tiếp tục grind. Chuyển Sinh dành cho hệ RPG: yêu cầu Rank 9 + Level 100 + $100M để mở cây kỹ năng thuộc tính độc quyền.',
  },
  {
    q: 'Hệ thống KOTH Mỏ VIP & Tự Triệu Hồi Ma Vương là gì?',
    a: 'KOTH Mỏ VIP cho phép Bang Hội chiếm giữ khu vực đào đặc biệt để nhận hệ số nhân đào & thu thuế. Boss Ma Vương cho phép người chơi tích lũy Mảnh Huy Hiệu từ Dungeon để tự kích hoạt Ma Vương tại Bàn Thờ Cooldown.',
  },
  {
    q: 'Điều kiện nâng Rank Prison bao gồm những gì?',
    a: 'Để nâng từ Rank 1 Tân Binh đến Rank 9 Vượt Ngục, người chơi vừa cần tích lũy đủ tiền bán quặng vừa cần đạt mốc Level tương ứng (Tân Binh Lv1, Tù Nhân Lv10, Lao Công Lv20 ... Vượt Ngục Lv100).',
  },
];
