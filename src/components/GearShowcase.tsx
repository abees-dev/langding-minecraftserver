import React from 'react';
import { Flame, Shield, Zap, Sparkles, Gem, ArrowUpRight } from 'lucide-react';

export default function GearShowcase() {
  const gearSets = [
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

  const upgradeMaterials = [
    'Đá Cường Hóa Vũ Khí / Giáp (Sơ - Trung - Cao - Siêu Cap - Huyền Thoại)',
    'Đá Đục Lỗ Khảm Ngọc (Lỗ 1 đến Lỗ 7)',
    'Đá Chuyển Sinh & Mảnh Huy Hiệu Triệu Hồi Boss',
  ];

  return (
    <section id="gears" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-amber-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ MMOITEMS & REFINEMENT ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          HỆ THỐNG <span className="glow-text-gold">TRANG BỊ LONG TỘC</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Chế tạo vũ khí, áo giáp MMOItems cực ngầu, đục lỗ ép đá ngọc để sẵn sàng cho các trận chiến PK & KOTH nảy lửa.
        </p>
      </div>

      {/* Gear Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gearSets.map((set, idx) => (
          <div
            key={idx}
            className={`glass-card p-6 rounded-2xl border ${set.border} ${set.glow} flex flex-col justify-between hover:scale-105 transition-transform duration-300`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  {set.type}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-amber-400">
                  {set.badge}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-100 uppercase tracking-wider mb-4">
                {set.name}
              </h3>

              <div className={`h-1 w-16 rounded bg-gradient-to-r ${set.color} mb-4`} />

              <ul className="space-y-2 text-xs text-slate-300">
                {set.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Xem Công Thức</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className="mt-12 glass-card p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900/80 to-slate-950/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(255,183,0,0.15)]">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 shrink-0">
            <Gem className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">
              TÍNH NĂNG CƯỜNG HÓA & ĐỤC LỖ NÂNG CẤP
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Sử dụng các loại Đá Cường Hóa từ Sơ Cấp đến Huyền Thoại và Đá Đục Lỗ (Lỗ 1 - 7) để kích hoạt toàn bộ tiềm năng trang bị.
            </p>
          </div>
        </div>

        <a
          href="https://discord.gg/mvRcGjDHVm"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shrink-0 hover:bg-amber-400 shadow-[0_0_15px_rgba(255,183,0,0.5)] transition-all"
        >
          XEM WIKI TRANG BỊ
        </a>
      </div>
    </section>
  );
}
