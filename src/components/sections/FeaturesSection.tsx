import React from 'react';
import { Pickaxe, Shield, Gem, Zap, Crown, Skull } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Pickaxe className="w-8 h-8 text-cyan-400" />,
      title: 'Hệ Thống Prison-RPG Hấp Dẫn',
      description:
        'Vòng lặp khai thác tài nguyên quặng phong phú (Stone, Coal, Iron, Gold, Diamond, Ancient Debris), kết hợp cuốc MMOItems riêng biệt.',
      color: 'border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]',
    },
    {
      icon: <Gem className="w-8 h-8 text-pink-400" />,
      title: 'Trang Bị MMO & Long Tộc',
      description:
        'Sở hữu các bộ giáp & vũ khí huyền thoại: Thanh Long, Hỏa Long, Thần Long. Nâng cấp tại NPC Lò Rèn với Đá Cường Hóa và Đá Đục Lỗ (Lỗ 1 - 7).',
      color: 'border-pink-500/30 text-pink-400 hover:border-pink-400',
      glow: 'shadow-[0_0_20px_rgba(255,0,127,0.15)] hover:shadow-[0_0_30px_rgba(255,0,127,0.35)]',
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: 'Bang Hội, Sell Multiplier & KOTH Mỏ VIP',
      description:
        'Tạo/Gia nhập Bang Hội để nạp kho quặng (/gang vault). Nhận Multiplier bán quặng (+10%/lv), KOTH Mỏ VIP chiếm giữ căn cứ và thu thuế.',
      color: 'border-emerald-500/30 text-emerald-400 hover:border-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(0,255,157,0.15)] hover:shadow-[0_0_30px_rgba(0,255,157,0.35)]',
    },
    {
      icon: <Skull className="w-8 h-8 text-rose-400" />,
      title: 'Tự Triệu Hồi Ma Vương & Sự Kiện Nguyệt Huyết',
      description:
        'Săn Mảnh Huy Hiệu từ Dungeon để rèn Huy Hiệu Ma Vương tự triệu hồi Boss tại Bàn Thờ. Tham gia Đêm Nguyệt Huyết săn Bá Tước tối Thứ 7.',
      color: 'border-rose-500/30 text-rose-400 hover:border-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]',
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      title: 'Chuyển Sinh & Prestige Song Song',
      description:
        'Prestige reset rank để tiếp tục vòng cày quặng dài hạn. Chuyển Sinh yêu cầu Level 100 + $100M để nhận điểm thuộc tính RPG độc quyền.',
      color: 'border-amber-500/30 text-amber-400 hover:border-amber-400',
      glow: 'shadow-[0_0_20px_rgba(255,183,0,0.15)] hover:shadow-[0_0_30px_rgba(255,183,0,0.35)]',
    },
    {
      icon: <Crown className="w-8 h-8 text-purple-400" />,
      title: '9 Cấp Rank Prison & Thăng Tiến',
      description:
        'Tiến trình 9 mốc Rank (Tân Binh ➔ Vượt Ngục) mở khóa thêm Kho Cá Nhân (/pv 1-5), /workbench, /feed, /fly và các đặc quyền.',
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
          LỐI CHƠI ĐỘC ĐÁO CHỈ CÓ TẠI <span className="glow-text-cyan">AETHERMINE</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Sự kết hợp hoàn hảo giữa đào quặng Prison, lớp nhân vật RPG, đại chiến Bang Hội KOTH và Boss Ma Vương tự triệu hồi.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`glass-card p-8 rounded-2xl border transition-all duration-300 ${item.color} ${item.glow} group hover:-translate-y-2`}
          >
            <div className="mb-6 inline-block p-4 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wide mb-3">
              {item.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
