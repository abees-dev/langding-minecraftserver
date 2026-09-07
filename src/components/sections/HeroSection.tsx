'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Copy,
  Check,
  Sparkles,
  Flame,
  Swords,
  ArrowRight,
  Calendar,
  Gamepad2,
  ShieldCheck,
  Zap,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const [copiedType, setCopiedType] = useState<'java' | 'pe' | null>(null);
  const [activeTab, setActiveTab] = useState<'java' | 'pe'>('java');
  const { serverIp, serverIpPe, pePort } = siteConfig;

  const handleCopyIp = (ip: string, type: 'java' | 'pe') => {
    navigator.clipboard.writeText(ip);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden"
      aria-label="AetherMine Minecraft RPG Server Hero Banner"
    >
      {/* Background Banner Image with Priority Preload */}
      <div className="absolute inset-0 scale-105 transition-transform duration-1000 overflow-hidden">
        <Image
          src="/banner.png"
          alt="AetherMine Server Banner"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center opacity-60"
        />
      </div>

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
          <span>
            KHAI MỞ CHÍNH THỨC:{' '}
            <strong className="text-white font-extrabold">
              08:00 - 15/08/2026
            </strong>
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Title H1 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wide text-white uppercase mb-6 leading-tight">
          AETHERMINE PRISON <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 glow-text-cyan">
            SERVER MINECRAFT RPG VIỆT NAM
          </span>
        </h1>

        {/* Value-Driven Subtitle with Incentive */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 mb-8 leading-relaxed font-normal">
          Trải nghiệm máy chủ{' '}
          <strong className="text-cyan-300 font-semibold">
            Minecraft Prison RPG đỉnh cao
          </strong>
          . Đào quặng thăng hạng 9 Cấp Rank Ngục Tù, tinh luyện{' '}
          <strong className="text-pink-400 font-semibold">
            Bộ Trang Bị Long Tộc
          </strong>
          , đục ô khảm 100 loại ngọc, đại chiến{' '}
          <strong className="text-emerald-400 font-semibold">
            Bang Hội Mỏ VIP KOTH
          </strong>
          và đột phá sức mạnh{' '}
          <strong className="text-amber-400 font-semibold">
            Chuyển Sinh RPG
          </strong>
          !
        </p>

        {/* Starter Kit Gift Highlight Banner (Incentive Frame) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold mb-8 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>
            🎁 TÂN THỦ VÀO GAME NHẬN NGAY:{' '}
            <strong className="text-white">Starter Kit</strong>!
          </span>
        </div>

        {/* Server IP Interactive Box with Java & Bedrock Switcher */}
        <div className="max-w-xl mx-auto mb-8">
          {/* Version Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={() => setActiveTab('java')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeTab === 'java'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>JAVA EDITION (PC)</span>
            </button>
            <button
              onClick={() => setActiveTab('pe')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeTab === 'pe'
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,255,157,0.5)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>BEDROCK / PE (MOBILE)</span>
            </button>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#0a0f24]/95 border border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.3)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 px-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  {activeTab === 'java'
                    ? 'IP MINECRAFT JAVA (PC)'
                    : `IP BEDROCK PE (PORT: ${pePort})`}
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 tracking-wider">
                  {activeTab === 'java' ? serverIp : serverIpPe}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyIp(
                  activeTab === 'java' ? serverIp : serverIpPe,
                  activeTab,
                )
              }
              aria-label={`Sao chép IP Server Minecraft ${activeTab === 'java' ? serverIp : serverIpPe}`}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                copiedType === activeTab
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_25px_#00ff9d]'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105'
              }`}
            >
              {copiedType === activeTab ? (
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
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold mb-14">
          <a
            href={siteConfig.social.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tham gia Discord Server Minecraft RPG AetherMine"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white border border-indigo-500/50 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] backdrop-blur-md hover:scale-105"
          >
            <Swords className="w-5 h-5 text-indigo-300" />
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

        {/* 3-Step Play Guide / Friction Reduction Box */}
        <div className="max-w-4xl mx-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 text-center">
            ⚡ 3 BƯỚC THAM GIA SEVER CỰC DỄ DÀNG
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                1
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block uppercase">
                  Mở Minecraft
                </span>
                <span className="text-[11px] text-slate-400">
                  Phiên bản 1.20.4+ (PC) hoặc PE Mobile
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                2
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block uppercase">
                  Nhập IP Server
                </span>
                <span className="text-[11px] text-slate-400">
                  Copy IP:{' '}
                  <code className="text-cyan-300 font-mono">{serverIp}</code>
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                3
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block uppercase">
                  Bắt Đầu Đào Quặng
                </span>
                <span className="text-[11px] text-slate-400">
                  Gõ <code className="text-amber-300 font-mono">/register</code>{' '}
                  & nhận Giftcode!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
