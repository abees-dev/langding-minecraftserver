'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
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

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 relative z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ FREQUENTLY ASKED QUESTIONS ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          CÂU HỎI THƯỜNG GẶP <span className="glow-text-cyan">(FAQ)</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Giải đáp các thắc mắc về kinh tế, lối chơi Bang Hội, Prestige & Chuyển Sinh cho người chơi mới.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl border border-cyan-500/20 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-100 hover:text-cyan-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-base sm:text-lg">{faq.q}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                  openIdx === idx ? 'rotate-180 text-pink-400' : ''
                }`}
              />
            </button>

            {openIdx === idx && (
              <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 bg-slate-950/40">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
