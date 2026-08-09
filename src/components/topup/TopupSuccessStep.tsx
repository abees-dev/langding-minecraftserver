'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { QrData } from './types';

interface TopupSuccessStepProps {
  qrData: QrData | null;
  onReset: () => void;
}

export default function TopupSuccessStep({ qrData, onReset }: TopupSuccessStepProps) {
  return (
    <div className="py-10 flex flex-col items-center text-center space-y-5">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(0,255,157,0.5)] animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h4 className="text-3xl font-extrabold text-slate-100 uppercase tracking-tight">
        THANH TOÁN THÀNH CÔNG!
      </h4>
      <p className="text-base text-slate-300 max-w-md leading-relaxed">
        Đã cộng trực tiếp{' '}
        <strong className="text-emerald-400 text-lg">
          +{qrData?.pointReceived.toLocaleString()} POINT
        </strong>{' '}
        vào tài khoản nhân vật{' '}
        <strong className="text-cyan-400 text-lg">{qrData?.username}</strong>.
      </p>
      <p className="text-xs text-slate-400 font-mono bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
        Bây giờ bạn có thể dùng lệnh <code>/doixu</code> hoặc <code>/doipoint</code> trong game Lobby Server để đổi quà!
      </p>

      <button
        onClick={onReset}
        className="mt-4 px-10 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-base uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,157,0.5)] hover:scale-105 transition-all"
      >
        HOÀN TẤT & ĐÓNG
      </button>
    </div>
  );
}
