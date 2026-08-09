'use client';

import React from 'react';
import { QrCode, X } from 'lucide-react';

interface TopupHeaderProps {
  onClose: () => void;
}

export default function TopupHeader({ onClose }: TopupHeaderProps) {
  return (
    <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950/50">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-3">
            NẠP POINT SERVER{' '}
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
              VIETQR TỰ ĐỘNG
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cộng Point tự động tỷ lệ 1:1 trực tiếp vào DB tài khoản game
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-2xl transition-all border border-transparent hover:border-slate-700"
        aria-label="Đóng"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
