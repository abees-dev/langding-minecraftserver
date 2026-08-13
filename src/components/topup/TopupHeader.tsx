'use client';

import React from 'react';
import { QrCode, X, Flame } from 'lucide-react';
import { getPromoEventDetails } from '@/lib/point';

interface TopupHeaderProps {
  onClose: () => void;
}

export default function TopupHeader({ onClose }: TopupHeaderProps) {
  const promo = getPromoEventDetails();

  return (
    <div className="px-6 sm:px-8 py-5 border-b border-slate-800 flex items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950/50">
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0 mt-0.5 sm:mt-0">
          <QrCode className="w-6 h-6" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wider">
              NẠP POINT SERVER
            </h3>
            {promo.active ? (
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 font-black uppercase tracking-wide shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse">
                <Flame className="w-3 h-3 text-slate-950" />
                <span>KM +{promo.bonusPercent}% POINT (X2)</span>
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                VIETQR TỰ ĐỘNG
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            <span>Cộng Point tự động VietQR 3s trực tiếp vào nhân vật.</span>
            {promo.active && (
              <span className="block sm:inline-block sm:ml-2 text-amber-400 font-semibold font-mono text-[11px] mt-0.5 sm:mt-0">
                [Hạn KM: {promo.endDateFormatted}]
              </span>
            )}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-2xl transition-all border border-transparent hover:border-slate-700 shrink-0"
        aria-label="Đóng"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
