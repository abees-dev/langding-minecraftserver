export interface PrisonRank {
  rank: string;
  name: string;
  gate: string;
  perks: string[];
}

export interface VipRank {
  name: string;
  price: string;
  color: string;
  perks: string[];
}

export const PRISON_RANKS: PrisonRank[] = [
  { rank: '1', name: 'Tân Binh', gate: 'Level 1', perks: ['1 Kho Cá Nhân (/pv 1)', '2 Vị trí Home cá nhân', 'Lệnh cơ bản /sellgui'] },
  { rank: '2', name: 'Tù Nhân', gate: 'Level 10', perks: ['Bàn Chế Tạo Mọi Nơi (/workbench)', 'Kế thừa toàn bộ quyền Tân Binh'] },
  { rank: '3', name: 'Lao Công', gate: 'Level 20', perks: ['2 Kho Cá Nhân (/pv 2)', '3 Vị trí Home cá nhân', 'Hồi Phục Thức Ăn (/feed)'] },
  { rank: '4', name: 'Thợ Đào', gate: 'Level 30', perks: ['Sửa Đồ Bằng Đe (/anvil)', 'Truy cập Mỏ Thợ Đào & Dungeon 2'] },
  { rank: '5', name: 'Đội Trưởng', gate: 'Level 45', perks: ['3 Kho Cá Nhân (/pv 3)', '4 Vị trí Home cá nhân', 'Rương Ender Anywhere (/enderchest)'] },
  { rank: '6', name: 'Phó Quản Ngục', gate: 'Level 60', perks: ['Hồi Máu Ngay Lập Tức (/heal)', 'Ưu tiên kết nối máy chủ'] },
  { rank: '7', name: 'Quản Ngục', gate: 'Level 75', perks: ['4 Kho Cá Nhân (/pv 4)', '5 Vị trí Home cá nhân', 'Lệnh Chế Tạo & Công Thức (/craft, /recipe)'] },
  { rank: '8', name: 'Bá Chủ Ngục Tù', gate: 'Level 90', perks: ['Thay Đổi Thời Tiết Cá Nhân (/pweather)', 'Danh hiệu Bá Chủ rực rỡ'] },
  { rank: '9', name: 'Vượt Ngục', gate: 'Level 100', perks: ['5 Kho Cá Nhân (/pv 5)', '6 Vị trí Home cá nhân', 'Chỉnh Thời Gian Cá Nhân (/ptime)', 'Bộ Kit Đặc Biệt /kit rank9'] },
];

export const VIP_RANKS: VipRank[] = [
  { name: 'VIP VIPER', price: 'Ủng hộ Server', color: 'from-blue-500 to-cyan-400', perks: ['8 Kho Cá Nhân /pv', '8 Home Cá Nhân', 'Lệnh /feed, /heal', 'Hệ số may mắn nhẹ'] },
  { name: 'VIP BARON', price: 'Ủng hộ Server', color: 'from-emerald-500 to-teal-400', perks: ['12 Kho Cá Nhân /pv', '12 Home Cá Nhân', 'Bộ Kit VIP Baron', 'Màu chat nổi bật'] },
  { name: 'VIP TITAN', price: 'Ủng hộ Server', color: 'from-purple-500 to-pink-500', perks: ['18 Kho Cá Nhân /pv', '18 Home Cá Nhân', 'Lệnh /anvil, /craft', 'Quyền ưu tiên Slot'] },
  { name: 'VIP LEGEND', price: 'Bá Chủ Đỉnh Cao', color: 'from-amber-400 via-pink-500 to-cyan-400', perks: ['25 Kho Cá Nhân /pv', '25 Home Cá Nhân', 'Quyền Bay Độc Quyền (/fly)', 'Giữ Bay Khi Chuyển World (KeepFly)', 'Hiệu Ứng Neon Tên Đặc Biệt'] },
];
