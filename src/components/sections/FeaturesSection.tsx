import React from 'react';
import { Pickaxe, Shield, Gem, Zap, Gift, Skull, ArrowUpRight } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Pickaxe className="w-8 h-8 text-cyan-400" />,
      title: 'Khai Thác X-Prison & AutoSell',
      badge: 'PRISON CORE',
      description:
        'Hệ thống mỏ quặng phong phú từ Tân Binh đến Vượt Ngục. Tích hợp tính năng Nâng Cấp Cuốc (/pickaxe), Cường Hóa Phép Custom và Tự Động Bán Quặng (/autosell) cực kỳ tiện lợi.',
      color: 'border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]',
    },
    {
      icon: <Gem className="w-8 h-8 text-pink-400" />,
      title: 'Trang Bị Long Tộc Độc Quyền',
      badge: 'CUSTOM ITEMS',
      description:
        'Sở hữu các bộ giáp & vũ khí rực rỡ (Thanh Long, Hỏa Long, Thần Long). Tính năng Lò Rèn Cường Hóa Đá Quý & Đục Lỗ Khảm Ngọc (Lỗ 1 - 7) nâng tầm chỉ số chiến đấu.',
      color: 'border-pink-500/30 text-pink-400 hover:border-pink-400',
      glow: 'shadow-[0_0_20px_rgba(255,0,127,0.15)] hover:shadow-[0_0_30px_rgba(255,0,127,0.35)]',
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      title: 'Hệ Thống Chuyển Sinh RPG',
      badge: 'RPG PROGRESSION',
      description:
        'Hệ thống Level nhân vật song song bảng điểm Thuộc Tính RPG. Đạt mốc Rank 9 Vượt Ngục & Level 100 để Chuyển Sinh (/rebirth) mở khóa cây kỹ năng độc quyền.',
      color: 'border-amber-500/30 text-amber-400 hover:border-amber-400',
      glow: 'shadow-[0_0_20px_rgba(255,183,0,0.15)] hover:shadow-[0_0_30px_rgba(255,183,0,0.35)]',
    },
    {
      icon: <Skull className="w-8 h-8 text-rose-400" />,
      title: 'Boss MythicMobs & ModelEngine 3D',
      badge: 'DUNGEON BOSS',
      description:
        'Chinh phục Tháp Dungeon RPG nhiều tầng. Tích lũy Mảnh Huy Hiệu để rèn Huy Hiệu Ma Vương, tự triệu hồi Boss 3D hoành tráng tại Bàn Thờ Cooldown và săn Đêm Nguyệt Huyết.',
      color: 'border-rose-500/30 text-rose-400 hover:border-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]',
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: 'Bang Hội & Mỏ VIP KOTH',
      badge: 'GANG WARS',
      description:
        'Lập Bang Hội cùng đồng đội nạp kho quặng (/gang vault). Nâng cấp Sell Multiplier (+10%/cấp), đại chiến chiếm giữ KOTH Mỏ VIP thu thuế và kích hoạt Buff Shop 2X.',
      color: 'border-emerald-500/30 text-emerald-400 hover:border-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(0,255,157,0.15)] hover:shadow-[0_0_30px_rgba(0,255,157,0.35)]',
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-400" />,
      title: 'Rương Crate & BattlePass Hằng Ngày',
      badge: 'DAILY REWARDS',
      description:
        'Thực hiện chuỗi Nhiệm Vụ Hằng Ngày, mở Rương Báu Crate cực phẩm và cày điểm BattlePass nhận hàng trăm phần quà hấp dẫn hoàn toàn miễn phí khi online.',
      color: 'border-purple-500/30 text-purple-400 hover:border-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ UNLIMITED GAMEPLAY FEATURES ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          TÍNH NĂNG CỐT LÕI TẠI <span className="glow-text-cyan">AETHERMINE RPG</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Sự kết hợp đỉnh cao giữa cày quặng X-Prison, hệ thống nhập vai RPG, trang bị Long Tộc & đại chiến Bang Hội KOTH.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`glass-card p-8 rounded-2xl border transition-all duration-300 ${item.color} ${item.glow} group hover:-translate-y-2 relative flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-950 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 tracking-wider">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wide mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
              <span>Đã tích hợp trong Game</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Conversion CTA Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
        <div className="text-left">
          <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">
            SẴN SÀNG CHINH PHỤC THẾ GIỚI AETHERMINE RPG?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Đăng nhập ngay hôm nay để nhận Kit Tân Thủ & 3 Ngày VIP hoàn toàn miễn phí.
          </p>
        </div>

        <a
          href="/#community"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 transition-all shrink-0"
        >
          <span>GIA NHẬP CỘNG ĐỒNG</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

