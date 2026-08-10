'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Flame, Swords, ArrowRight, Calendar, Gamepad2 } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden" aria-label="AetherMine Minecraft RPG Server Hero Banner">
      {/* Background Banner Image with Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/banner.png')`,
        }}
      />
      
      {/* Dark Vignette Overlay for Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/90 via-[#070913]/85 to-[#070913]" />
      <div className="absolute inset-0 bg-radial-glow opacity-90" />

      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Open Date Countdown / Announcement Banner Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md">
          <Calendar className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>KHAI MỞ CHÍNH THỨC: <strong className="text-white font-extrabold">19:00 - 15/08/2026</strong></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Title H1 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wide text-white uppercase mb-6 leading-tight">
          AETHERMINE PRISON <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 glow-text-cyan">
            SERVER MINECRAFT RPG VIỆT NAM
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 mb-8 leading-relaxed font-normal">
          Trải nghiệm máy chủ <strong className="text-cyan-300 font-semibold">Minecraft Prison RPG đỉnh cao</strong> (IP: <code className="text-cyan-300 font-mono font-bold">{serverIp}</code>). Đào quặng thăng hạng 9 Cấp Rank Ngục Tù, 
          tinh luyện <strong className="text-pink-400 font-semibold">Bộ Trang Bị Long Tộc</strong>, đục ô khảm 100 loại ngọc, đại chiến <strong className="text-emerald-400 font-semibold">Bang Hội Mỏ VIP KOTH</strong> 
          và đột phá sức mạnh <strong className="text-amber-400 font-semibold">Chuyển Sinh RPG</strong>!
        </p>

        {/* Server IP Interactive Box */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0a0f24]/95 border border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.3)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
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
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_25px_#00ff9d]'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105'
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
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-950/60 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-md"
          >
            <Swords className="w-5 h-5 text-cyan-400" />
            <span>DISCORD CỘNG ĐỒNG</span>
          </a>

          <a
            href="#features"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 text-pink-400 border border-pink-500/50 hover:bg-pink-950/60 hover:border-pink-400 transition-all shadow-[0_0_20px_rgba(255,0,127,0.25)] backdrop-blur-md"
          >
            <span>TÌM HIỂU LỐI CHƠI RPG</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
