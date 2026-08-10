'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '@/constants/faq';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
        {FAQ_LIST.map((faq, idx) => (
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
