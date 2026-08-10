export interface GearSet {
  name: string;
  type: string;
  badge: string;
  color: string;
  border: string;
  glow: string;
  items: string[];
}

export const GEAR_SETS: GearSet[] = [
  {
    name: 'BỘ BĂNG LONG',
    type: 'Bộ Trang Bị Tinh Luyện',
    badge: 'TRADE / CRAFT',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_20px_rgba(0,240,255,0.2)]',
    items: ['Nón Băng Long', 'Giáp Ngực Băng Long', 'Quần Băng Long', 'Giày Băng Long', 'Kiếm Băng Long'],
  },
  {
    name: 'BỘ HỎA LONG',
    type: 'Bộ Trang Bị Hỏa Hệ',
    badge: 'HIGH DPS',
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/40',
    glow: 'shadow-[0_0_20px_rgba(255,0,127,0.2)]',
    items: ['Nón Hỏa Long', 'Giáp Ngực Hỏa Long', 'Quần Hỏa Long', 'Giày Hỏa Long', 'Kiếm Hỏa Long'],
  },
  {
    name: 'BỘ LONG CHIẾN',
    type: 'Bộ Đồ Donate / Boss Drop',
    badge: 'LEGENDARY',
    color: 'from-amber-400 to-orange-600',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_20px_rgba(255,183,0,0.2)]',
    items: ['Nón Long Chiến', 'Giáp Ngực Long Chiến', 'Quần Long Chiến', 'Giày Long Chiến', 'Kiếm Long Chiến'],
  },
  {
    name: 'PHỤ KIỆN LONG TỘC',
    type: 'Trang Sức 5 Món',
    badge: 'STATS BOOST',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    items: ['Dây Chuyền Long Tộc (Amulet)', 'Nhẫn Long Tộc (Ring 1 & 2)', 'Vòng Tay (Bracelet)', 'Găng Tay (Gloves)'],
  },
];
