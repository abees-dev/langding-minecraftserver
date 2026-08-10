export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_LIST: FaqItem[] = [
  {
    q: 'Làm thế nào để đeo/gắn Trang Sức vào nhân vật?',
    a: 'Bạn gõ lệnh /rpginv trong game để mở Giao Diện Túi Trang Sức Độc Quyền. Tại đây bạn kéo thả các món Trang Sức (Dây chuyền, Nhẫn, Vòng tay, Găng tay...) vào đúng ô trang bị để tăng chỉ số nhân vật.',
  },
  {
    q: 'Cách đục lỗ & khảm Ngọc vào trang bị như thế nào?',
    a: 'Đầu tiên gõ lệnh /duclo để đục lỗ cho trang bị. Khi trang bị đã có lỗ khảm, bạn chỉ cần mở túi đồ kéo thả viên Ngọc trực tiếp vào trang bị đó để kích hoạt chỉ số cộng thêm.',
  },
  {
    q: 'Tại sao tôi chọn Đá Cường Hóa nhưng không nâng cấp được?',
    a: 'Mỗi dòng Vũ khí, Áo giáp và Trang sức có loại Đá Cường Hóa riêng biệt và tỷ lệ thành công riêng. Bạn cần sử dụng đúng loại Đá Cường Hóa tương ứng với cấp bậc của trang bị đó thì mới tiến hành cường hóa được.',
  },
  {
    q: 'Đá Cường Hóa Trang Sức có thể kiếm ở đâu?',
    a: 'Bạn sử dụng lệnh /phanra để phân rã các món Trang Sức dư thừa hoặc không sử dụng. Sau khi phân rã sẽ nhận lại Đá Cường Hóa Trang Sức tương ứng.',
  },
  {
    q: 'Kiếm Đá Cường Hóa Vũ Khí/Giáp & Đá Đục Lỗ ở đâu?',
    a: 'Bạn tham gia đánh Quái & săn Boss tại các khu vực Dungeon RPG để nhặt nguyên liệu, sau đó di chuyển đến Khu Vực Trade (/trade) để đổi lấy Đá Cường Hóa Vũ Khí/Giáp và Đá Đục Lỗ với NPC.',
  },
  {
    q: 'Làm thế nào để kết nối vào máy chủ Minecraft AetherMine?',
    a: 'Mở Minecraft Java Edition phiên bản 1.19.4 trở lên, chọn Chơi Mạng (Multiplayer) -> Thêm Máy Chủ (Add Server), nhập địa chỉ IP chính thức: mc.aethermines.com và kết nối ngay!',
  },
  {
    q: 'Hệ thống Bán Quặng (/sellgui & /gang vault) hoạt động ra sao?',
    a: 'Bán cá nhân /sellgui áp dụng bảng giá Base chuẩn. Khi gia nhập Bang Hội, gửi quặng vào /gang vault và dùng Sell All để hưởng Multiplier Bang (+10%/lv), Buff Shop 2X và thưởng Paragon Sell.',
  },
  {
    q: 'Làm thế nào để thăng cấp Rank Prison trong game?',
    a: 'Mở Menu thăng hạng bằng lệnh /rank. Tích lũy đủ Level nhân vật & Tiền bán quặng (hoặc Point), sau đó Click Trái (mua bằng Money) hoặc Click Phải (mua bằng Point) để nâng từ Tân Binh lên Vượt Ngục.',
  },
];
