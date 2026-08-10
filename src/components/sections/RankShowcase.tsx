'use client';

import React, { useState } from 'react';
import { ShieldCheck, Crown, CheckCircle2, ChevronRight, Sparkles, Zap, ArrowRight, Coins, BookOpen, Lock } from 'lucide-react';
import { PRISON_RANKS, VIP_RANKS } from '@/constants/ranks';
import { siteConfig } from '@/config/site';

export default function RankShowcase() {
  const [activeTab, setActiveTab] = useState<'prison' | 'vip'>('prison');

  return (
    <section id="ranks" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-pink-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ PROGRESSION & RANKS ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          HỆ THỐNG <span className="glow-text-magenta">RANK & VIP</span> DÀNH CHO NGƯỜI CHƠI
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Tiến trình thăng hạng minh bạch, đồng bộ 100% với giao diện <code className="text-cyan-300 font-mono font-bold">/rank</code> trong game.
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
            <span>9 CẤP RANK PRISON (/RANK)</span>
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
            <span>6 CẤP RANK VIP DONOR</span>
          </button>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-cyan-300 font-bold text-sm block">HƯỚNG DẪN THĂNG RANK TRONG GAME (/RANK):</span>
            <span className="text-slate-400">
              Mở Menu gõ <strong className="text-cyan-300">/rank</strong> ➔ Click trái mua bằng <strong className="text-emerald-400">Money</strong> hoặc Click phải mua bằng <strong className="text-cyan-400">Point</strong> (Cần đủ Level)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold shrink-0">
          <Coins className="w-4 h-4" />
          <span>Lệnh mở Menu: /rank</span>
        </div>
      </div>

      {/* Prison Ranks View */}
      {activeTab === 'prison' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRISON_RANKS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-xs">
                    CẤP {item.rank}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.gate}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider mb-1">
                  {item.name}
                </h3>
                <span className="text-[11px] font-mono text-cyan-300/80 block mb-3">
                  📍 {item.mineName}
                </span>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed italic border-b border-slate-800/80 pb-3">
                  {item.description}
                </p>

                {/* Costs Display */}
                <div className="mb-4 p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>💵 Giá Money (Click Trái):</span>
                    <span className="text-emerald-400 font-bold">{item.costMoney}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>💎 Giá Point (Click Phải):</span>
                    <span className="text-cyan-400 font-bold">{item.costPoint}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {item.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-cyan-300/70 font-mono flex items-center justify-between">
                <span>✓ Thừa kế tất cả quyền rank trước</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIP Ranks View */}
      {activeTab === 'vip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIP_RANKS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-pink-500/30 flex flex-col justify-between"
            >
              <div>
                <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${item.color} mb-4`} />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
                    {item.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded bg-pink-950/80 border border-pink-500/40 text-pink-300 font-mono text-[10px] font-bold">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-pink-400 font-mono text-xs font-bold">
                    {item.pricePoint}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" />
                    {item.requirement}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  {item.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <span className={perk.includes('BAY') || perk.includes('/fly') ? 'font-bold text-pink-300 glow-text-magenta' : ''}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={siteConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 rounded-xl bg-slate-900 border border-pink-500/40 text-pink-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-pink-950/60 hover:text-pink-300 transition-colors"
              >
                <span>TƯ VẤN NẠP VIP</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
