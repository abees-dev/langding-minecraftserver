'use client';

import React, { useState } from 'react';
import { ShieldCheck, Crown, CheckCircle2, ChevronRight, Sparkles, Key, Zap } from 'lucide-react';

export default function RankShowcase() {
  const [activeTab, setActiveTab] = useState<'prison' | 'vip'>('prison');

  const prisonRanks = [
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

  const vipRanks = [
    { name: 'VIP VIPER', price: 'Ủng hộ Server', color: 'from-blue-500 to-cyan-400', perks: ['8 Kho Cá Nhân /pv', '8 Home Cá Nhân', 'Lệnh /feed, /heal', 'Hệ số may mắn nhẹ'] },
    { name: 'VIP BARON', price: 'Ủng hộ Server', color: 'from-emerald-500 to-teal-400', perks: ['12 Kho Cá Nhân /pv', '12 Home Cá Nhân', 'Bộ Kit VIP Baron', 'Màu chat nổi bật'] },
    { name: 'VIP TITAN', price: 'Ủng hộ Server', color: 'from-purple-500 to-pink-500', perks: ['18 Kho Cá Nhân /pv', '18 Home Cá Nhân', 'Lệnh /anvil, /craft', 'Quyền ưu tiên Slot'] },
    { name: 'VIP LEGEND', price: 'Bá Chủ Đỉnh Cao', color: 'from-amber-400 via-pink-500 to-cyan-400', perks: ['25 Kho Cá Nhân /pv', '25 Home Cá Nhân', 'Quyền Bay Độc Quyền (/fly)', 'Giữ Bay Khi Chuyển World (KeepFly)', 'Hiệu Ứng Neon Tên Đặc Biệt'] },
  ];

  return (
    <section id="ranks" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-pink-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ PROGRESSION & RANKS ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          HỆ THỐNG <span className="glow-text-magenta">RANK & VIP</span> DÀNH CHO NGƯỜI CHƠI
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Tích lũy tiền bán quặng và cày cấp để nâng Rank Prison mở khóa các lệnh hỗ trợ & đặc quyền vượt trội!
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 mt-8 gap-2">
          <button
            onClick={() => setActiveTab('prison')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'prison'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>9 CẤP RANK PRISON</span>
          </button>

          <button
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'vip'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-slate-100 shadow-[0_0_20px_rgba(255,0,127,0.6)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>GÓI VIP DONOR</span>
          </button>
        </div>
      </div>

      {/* Prison Ranks View */}
      {activeTab === 'prison' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prisonRanks.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-xs">
                    RANK {item.rank}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.gate}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider mb-4">
                  {item.name}
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {item.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-cyan-300/70 font-mono">
                ✓ Thừa kế tất cả quyền lệnh rank thấp hơn
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIP Ranks View */}
      {activeTab === 'vip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipRanks.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-pink-500/30 flex flex-col justify-between"
            >
              <div>
                <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${item.color} mb-6`} />
                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-wider mb-2">
                  {item.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-pink-500/30 text-pink-400 font-mono text-xs font-semibold mb-6">
                  {item.price}
                </span>
                <ul className="space-y-3 text-xs text-slate-300">
                  {item.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                      <span className={perk.includes('/fly') ? 'font-bold text-pink-300 glow-text-magenta' : ''}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://discord.gg/mvRcGjDHVm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 rounded-xl bg-slate-900 border border-pink-500/40 text-pink-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-pink-950/60 hover:text-pink-300 transition-colors"
              >
                <span>TƯ VẤN NẠP THẺ</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
