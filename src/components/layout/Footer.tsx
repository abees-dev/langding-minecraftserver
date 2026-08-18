'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(siteConfig.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredGuides = [
    { title: 'Thông Tin Server AetherMine', href: '/blog/thong-tin-server-aethermine' },
    { title: 'Hướng Dẫn Chơi Tân Thủ', href: '/blog/huong-dan-choi-aethermine' },
    { title: 'Hướng Dẫn Bang Hội & KOTH', href: '/blog/huong-dan-bang-hoi-koth-aethermine' },
    { title: 'Hệ Thống Đất Plot (World Plot)', href: '/blog/he-thong-dat-ca-nhan-world-plot' },
    { title: 'Cập Nhật Patch Notes Mới Nhất', href: '/blog' },
  ];

  const seoKeywords = [
    'Server Minecraft Viet Nam',
    'IP Server Minecraft',
    'Minecraft RPG',
    'Minecraft Prison RPG',
    'Server Minecraft Dao Quang',
    'Bang Hoi Minecraft',
    'Trang Bi Long Toc',
    'Chuyen Sinh Minecraft',
    'Server Minecraft 1.20.4+',
    'KOTH Minecraft Viet Nam',
    'Top Server Minecraft',
    siteConfig.serverIp,
  ];

  return (
    <footer className="relative z-10 bg-[#04060d] border-t border-cyan-500/20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/50 p-[1px] bg-slate-900 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <Image
                  src={siteConfig.logoUrl}
                  alt={`${siteConfig.name} Logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-wider glow-text-cyan uppercase">
                AETHER<span className="text-pink-500 glow-text-magenta">MINE</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              AetherMine RPG là máy chủ Minecraft Việt Nam thế hệ mới (IP: <code className="text-cyan-300 font-mono">{siteConfig.serverIp}</code>). Đem tới trải nghiệm đào quặng hấp dẫn, tinh luyện giáp Long Tộc, đại chiến Bang Hội và Chuyển Sinh bứt phá sức mạnh.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-slate-400 font-mono">IP SERVER:</span>
              <button
                onClick={handleCopyIp}
                aria-label={`Sao chép IP ${siteConfig.serverIp}`}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center gap-2 hover:bg-cyan-950/60 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{siteConfig.serverIp}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-extrabold text-slate-200 text-sm uppercase tracking-wider mb-4">
              DANH MỤC TRANG
            </h4>
            <ul className="space-y-2.5 font-medium">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Internal Links for High Value Guides & Blog Posts */}
          <div>
            <h4 className="font-extrabold text-slate-200 text-sm uppercase tracking-wider mb-4">
              THÔNG TIN & HƯỚNG DẪN
            </h4>
            <ul className="space-y-2.5 font-medium">
              {featuredGuides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-cyan-500">›</span>
                    <span>{guide.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Expanded SEO Keywords */}
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
          <p>© {new Date().getFullYear()} {siteConfig.fullName} ({siteConfig.serverIp}). All rights reserved. Not affiliated with Mojang Studios.</p>
        </div>
      </div>
    </footer>
  );
}
