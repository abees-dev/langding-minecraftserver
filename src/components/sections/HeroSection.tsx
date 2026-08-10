'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Flame, Swords, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const { serverIp, social } = siteConfig;

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-radial-glow" aria-label="AetherMine Minecraft RPG Server Hero Banner">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>MINECRAFT RPG VIỆT NAM 1.19.4+ • TOP 1 PRISON RPG</span>
          <Flame className="w-4 h-4 text-pink-500" />
        </div>

        {/* Main Title H1 for Minecraft RPG SEO */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-100 uppercase mb-6 leading-tight">
          AETHERMINE PRISON <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 glow-text-cyan">
            SERVER MINECRAFT RPG VIỆT NAM
          </span>
        </h1>

        {/* Subtitle with Keyword Density */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
          Tham gia thế giới <strong className="text-cyan-300 font-semibold">Minecraft RPG thế hệ mới</strong> (IP: <code className="text-cyan-300 font-mono">{serverIp}</code>). Đào quặng Prison, 
          săn Boss Dungeon RPG, tinh luyện <strong className="text-pink-400 font-semibold">Bộ Trang Bị MMOItems Long Tộc</strong>, đại chiến <strong className="text-emerald-400 font-semibold">Bang Hội KOTH Mỏ VIP</strong> 
          và mở khóa hệ thống <strong className="text-amber-400 font-semibold">Chuyển Sinh Thuộc Tính RPG</strong> không giới hạn!
        </p>

        {/* Server IP Interactive Box */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="p-2 sm:p-3 rounded-2xl bg-[#0a0f24]/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 px-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono">IP SERVER MINECRAFT RPG</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 tracking-wider">{serverIp}</span>
              </div>
            </div>

            <button
              onClick={handleCopyIp}
              aria-label={`Sao chép IP Server Minecraft RPG ${serverIp}`}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                copied
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_20px_#00ff9d]'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] hover:scale-105'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>ĐÃ SAO CHÉP IP!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>SAO CHÉP IP</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold">
          <a
            href={social.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tham gia Discord Server Minecraft RPG AetherMine"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-950/50 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Swords className="w-5 h-5 text-cyan-400" />
            <span>DISCORD CỘNG ĐỒNG</span>
          </a>

          <a
            href="#features"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 text-pink-400 border border-pink-500/50 hover:bg-pink-950/50 hover:border-pink-400 transition-all shadow-[0_0_15px_rgba(255,0,127,0.2)]"
          >
            <span>TÌM HIỂU LỐI CHƠI RPG</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
