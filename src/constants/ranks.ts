export interface PrisonRank {
  rank: string;
  name: string;
  gate: string;
  costMoney: string;
  costPoint: string;
  mineName: string;
  description: string;
  perks: string[];
}

export interface VipRank {
  name: string;
  pricePoint: string;
  color: string;
  badge: string;
  requirement: string;
  perks: string[];
}

export const PRISON_RANKS: PrisonRank[] = [
  {
    rank: '1',
    name: 'Tân Binh',
    gate: 'Cấp 1',
    costMoney: 'Miễn phí',
    costPoint: 'Miễn phí',
    mineName: 'Khu Mỏ Tân Binh',
    description: 'Cấp bậc khởi đầu cho mọi người chơi mới khi tham gia máy chủ.',
    perks: [
      'Gõ /sellgui để bán quặng lấy tiền mặt',
      'Kho cá nhân: 1 Kho ảo (/pv 1)',
      'Lưu 2 vị trí biến về nhà (/sethome 2)',
      'Mở khóa Kit quà tặng: /kit tanbinh',
      'Mở khóa Khai thác tại Mỏ Tân Binh (Stone, Than)',
    ],
  },
  {
    rank: '2',
    name: 'Tù Nhân',
    gate: 'Cấp 10',
    costMoney: '85.000 Money',
    costPoint: '20 Point',
    mineName: 'Khu Mỏ Tù Nhân',
    description: 'Mở khóa bàn chế tạo di động tiện lợi ở mọi vị trí.',
    perks: [
      'Mở Bàn chế tạo di động mọi nơi (/workbench)',
      'Mở khóa Khu Mỏ Tù Nhân (Sắt, Vàng, Đá Đỏ)',
      'Kho cá nhân: 1 Kho ảo (/pv 1)',
      'Cộng thêm điểm thuộc tính nhân vật',
      'Thừa kế toàn bộ quyền hạn của Tân Binh',
    ],
  },
  {
    rank: '3',
    name: 'Lao Công',
    gate: 'Cấp 20',
    costMoney: '2.900.000 Money',
    costPoint: '40 Point',
    mineName: 'Khu Mỏ Lao Công',
    description: 'Mở rộng sức chứa kho ảo và bổ sung khả năng hồi phục thể lực.',
    perks: [
      'Tăng gấp đôi kho ảo: 2 Kho (/pv 1-2)',
      'Lệnh hồi phục độ no tức thì (/feed)',
      'Mở khóa Khu Mỏ Lao Công giá trị quặng cao hơn',
      'Lưu 3 vị trí biến về nhà (/sethome 3)',
    ],
  },
  {
    rank: '4',
    name: 'Thợ Đào',
    gate: 'Cấp 30',
    costMoney: '10.750.000 Money',
    costPoint: '80 Point',
    mineName: 'Khu Mỏ Thợ Đào',
    description: 'Sở hữu khả năng sửa chữa trang bị bằng đe rèn di động.',
    perks: [
      'Mở đe rèn sửa trang bị ở bất kỳ đâu (/anvil)',
      'Mở khóa Khu Mỏ Thợ Đào (Kim Cương, Lapis)',
      'Truy cập Tháp Dungeon RPG Cấp 2',
      'Cộng thêm điểm thuộc tính nhân vật',
    ],
  },
  {
    rank: '5',
    name: 'Đội Trưởng',
    gate: 'Cấp 45',
    costMoney: '54.000.000 Money',
    costPoint: '150 Point',
    mineName: 'Khu Mỏ Đội Trưởng',
    description: 'Cấp chỉ huy mở khóa Rương Ender Chest lưu trữ đồ quý giá.',
    perks: [
      'Tăng sức chứa: 3 Kho cá nhân ảo (/pv 1-3)',
      'Mở Rương Ender Anywhere (/enderchest)',
      'Lưu tới 4 vị trí biến về nhà (/sethome 4)',
      'Mở khóa Khu Mỏ Đội Trưởng quặng quý',
    ],
  },
  {
    rank: '6',
    name: 'Phó Quản Ngục',
    gate: 'Cấp 60',
    costMoney: '217.000.000 Money',
    costPoint: '250 Point',
    mineName: 'Khu Mỏ Phó Quản Ngục',
    description: 'Trang bị kỹ năng hồi phục sinh lực tức thì trong tình huống nguy cấp.',
    perks: [
      'Lệnh hồi đầy máu ngay lập tức (/heal)',
      'Quyền ưu tiên kết nối máy chủ không lo nghẽn',
      'Mở khóa Khu Mỏ Phó Quản Ngục (Ngọc Lục Bảo)',
      'Cộng thêm điểm thuộc tính nhân vật',
    ],
  },
  {
    rank: '7',
    name: 'Quản Ngục',
    gate: 'Cấp 75',
    costMoney: '550.000.000 Money',
    costPoint: '360 Point',
    mineName: 'Khu Mỏ Quản Ngục',
    description: 'Nắm giữ quyền hạn xem và rèn các công thức chế tạo phức tạp.',
    perks: [
      'Tăng sức chứa: 4 Kho cá nhân ảo (/pv 1-4)',
      'Lệnh biến về vị trí vừa chết (/back)',
      'Lệnh xem & rèn công thức cao cấp (/recipe)',
      'Mở khóa Khu Mỏ Quản Ngục giàu tài nguyên',
    ],
  },
  {
    rank: '8',
    name: 'Bá Chủ Ngục Tù',
    gate: 'Cấp 90',
    costMoney: '1.250.000.000 Money',
    costPoint: '500 Point',
    mineName: 'Khu Mỏ Bá Chủ',
    description: 'Sở hữu danh hiệu rực rỡ và quyền tùy chỉnh thời tiết hiển thị cá nhân.',
    perks: [
      'Thay đổi thời tiết hiển thị cá nhân (/pweather)',
      'Danh hiệu "Bá Chủ Ngục Tù" nổi bật trên Chat & Tab',
      'Mở khóa Khu Mỏ Bá Chủ (Ancient Debris, Netherite)',
      'Lưu tới 5 vị trí biến về nhà (/sethome 5)',
    ],
  },
  {
    rank: '9',
    name: 'Vượt Ngục (MAX)',
    gate: 'Cấp 100',
    costMoney: '3.000.000.000 Money',
    costPoint: '600 Point',
    mineName: 'Khu Mỏ Vượt Ngục',
    description: 'Đỉnh cao hệ Prison! Mở khóa trọn bộ đặc quyền và đủ điều kiện Prestige/Chuyển Sinh/Mua VIP.',
    perks: [
      'Sở hữu tối đa 5 Kho cá nhân ảo (/pv 1-5)',
      'Lưu tới 6 vị trí về nhà (/sethome 6)',
      'Chỉnh thời gian sáng/tối cá nhân (/ptime)',
      'Nhận Bộ Kit Huyền Thoại (/kit rank9: Đá CH Vượt Ngục, Đá Đục Lỗ, Quặng Trade)',
      'Đủ điều kiện Chuyển Sinh (/rebirth) hoặc mở mua 6 Rank VIP!',
    ],
  },
];

export const VIP_RANKS: VipRank[] = [
  {
    name: 'VIP',
    pricePoint: '150 Point',
    color: 'from-emerald-500 to-teal-400',
    badge: 'CẤP 1',
    requirement: 'Cần đạt Rank Prison 9 (Vượt Ngục)',
    perks: [
      'Mở rộng 6 Kho ảo cá nhân (/pv 1-6)',
      'Kit vật phẩm VIP: Đá CH Sơ Cấp, Đá Đục Lỗ #1, Quặng Trade, 100k Money',
      'Lệnh quản lý nhà: /home, /sethome, /delhome',
      'Hạng VIP khởi đầu tiện lợi cho thành viên',
    ],
  },
  {
    name: 'VIP+',
    pricePoint: '250 Point',
    color: 'from-blue-500 to-cyan-400',
    badge: 'CẤP 2',
    requirement: 'Yêu cầu đã sở hữu Rank VIP',
    perks: [
      'Mở rộng 8 Kho ảo cá nhân (/pv 1-8)',
      'Chat chữ có Màu nổi bật trong hội thoại',
      'Kit VIP+: Đá CH Trung Cấp, Đá Đục Lỗ #2, Mảnh Boss, 250k Money',
      'Giữ nguyên toàn bộ quyền hạn của VIP',
    ],
  },
  {
    name: 'MVP',
    pricePoint: '400 Point',
    color: 'from-purple-500 to-indigo-500',
    badge: 'CẤP 3',
    requirement: 'Yêu cầu đã sở hữu Rank VIP+',
    perks: [
      'Mở rộng 10 Kho ảo cá nhân (/pv 1-10)',
      'Lệnh radar kiểm tra xung quanh (/near)',
      'Kit MVP: Đá CH Cao Cấp, Đá Đục Lỗ #3, Huy Hiệu Boss, 500k Money',
      'Gia tăng đặc quyền chiến đấu và lưu trữ',
    ],
  },
  {
    name: 'MVP+',
    pricePoint: '550 Point',
    color: 'from-pink-500 to-rose-500',
    badge: 'CẤP 4',
    requirement: 'Yêu cầu đã sở hữu Rank MVP',
    perks: [
      'Mở rộng 12 Kho ảo cá nhân (/pv 1-12)',
      'Lệnh đổi biệt danh cá nhân (/nick)',
      'Lệnh sửa trang bị & đe di động (/repair, /anvil)',
      'Kit MVP+: Đá CH Siêu Cấp, Đá Đục Lỗ #4, Huy Hiệu Boss x2, 1M Money',
    ],
  },
  {
    name: 'ELITE',
    pricePoint: '750 Point',
    color: 'from-amber-400 to-orange-500',
    badge: 'CẤP 5',
    requirement: 'Yêu cầu đã sở hữu Rank MVP+',
    perks: [
      'Mở rộng 16 Kho ảo cá nhân (/pv 1-16)',
      'Lệnh điều chỉnh tốc độ di chuyển (/speed)',
      'Kit ELITE: Đá CH Thần Cấp, Đá Đục Lỗ #6, Tinh Thể Hủy Diệt, 2.5M Money',
      'Cấp VIP cao cấp sở hữu nhiều đặc quyền di động',
    ],
  },
  {
    name: 'LEGEND',
    pricePoint: '1.000 Point',
    color: 'from-red-500 via-pink-500 to-cyan-400',
    badge: 'ĐỘC QUYỀN MAX',
    requirement: 'Yêu cầu đã sở hữu Rank ELITE',
    perks: [
      'Mở rộng tối đa 20 Kho ảo cá nhân (/pv 1-20)',
      'QUYỀN BAY ĐỘC QUYỀN TẠI KHU VỰC MINING (/fly)',
      'Giữ trạng thái bay khi chuyển khu vực (KeepFly)',
      'Lệnh ngụy trang & thời tiết (/disguise, /ptime, /pweather)',
      'Kit LEGEND: Đá CH Thần Cấp x40, Đá Đục Lỗ Thiên Mệnh, Quặng Đại Tinh Luyện, 5M Money',
    ],
  },
];
