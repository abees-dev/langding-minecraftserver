'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const serverIp = 'mc.aethermines.com';

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoKeywords = [
    'Server Minecraft Viet Nam',
    'IP Server Minecraft',
    'Minecraft RPG',
    'Minecraft Prison RPG',
    'Server Minecraft Dao Quang',
    'Bang Hoi Minecraft',
    'MMOItems Minecraft',
    'Chuyen Sinh Minecraft',
    'Server Minecraft 1.19+',
    'KOTH Minecraft Viet Nam',
    'Top Server Minecraft',
    'mc.aethermines.com',
  ];

  return (
    <footer className="relative z-10 bg-[#04060d] border-t border-cyan-500/20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/50 p-[1px] bg-slate-900 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <img
                  src="/logo.png"
                  alt="AetherMine Logo"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-wider glow-text-cyan uppercase">
                AETHER<span className="text-pink-500 glow-text-magenta">MINE</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-md">
              AetherMine RPG là máy chủ Minecraft Việt Nam thế hệ mới (IP: <code className="text-cyan-300 font-mono">mc.aethermines.com</code>). Đem tới trải nghiệm đào quặng hấp dẫn, tinh luyện giáp MMOItems Long Tộc, đại chiến Bang Hội và Chuyển Sinh bứt phá sức mạnh.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-slate-400 font-mono">IP SERVER MINECRAFT:</span>
              <button
                onClick={handleCopyIp}
                aria-label="Sao chép IP mc.aethermines.com"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center gap-2 hover:bg-cyan-950/60 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{serverIp}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-extrabold text-slate-200 text-sm uppercase tracking-wider mb-4">
              DANH MỤC TRANG
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Tính Năng Cốt Lõi</a></li>
              <li><a href="#ranks" className="hover:text-cyan-400 transition-colors">Hệ Thống Rank & VIP</a></li>
              <li><a href="#gears" className="hover:text-cyan-400 transition-colors">Trang Bị Long Tộc</a></li>
              <li><a href="#economy" className="hover:text-cyan-400 transition-colors">Bán Quặng Bang Hội</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Câu Hỏi Thường Gặp</a></li>
            </ul>
          </div>

          {/* Col 3: Expanded SEO Keywords */}
          <div>
            <h4 className="font-extrabold text-slate-200 text-sm uppercase tracking-wider mb-4">
              TỪ KHÓA TÌM KIẾM HOT
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
              {seoKeywords.map((kw, idx) => (
                <span key={idx} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} AetherMine Minecraft RPG Server (mc.aethermines.com). All rights reserved. Not affiliated with Mojang Studios.</p>
          <p className="flex items-center gap-1">
            Optimized for Search Engines (SEO Top 1)
          </p>
        </div>
      </div>
    </footer>
  );
}
