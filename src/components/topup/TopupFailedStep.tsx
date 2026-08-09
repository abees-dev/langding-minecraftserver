'use client';

import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { QrData } from './types';

interface TopupFailedStepProps {
  qrData: QrData | null;
  onReset: () => void;
  onClose: () => void;
}

export default function TopupFailedStep({ qrData, onReset, onClose }: TopupFailedStepProps) {
  return (
    <div className="py-10 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_40px_rgba(255,0,0,0.4)] animate-bounce">
        <AlertOctagon className="w-12 h-12" />
      </div>
      <h4 className="text-3xl font-extrabold text-slate-100 uppercase tracking-tight">
        THANH TOÁN THẤT BẠI HOẶC BỊ HỦY!
      </h4>
      <p className="text-base text-slate-300 max-w-md leading-relaxed">
        Hệ thống chưa nhận được tiền chuyển khoản hoặc đơn nạp{' '}
        <strong className="text-red-400 font-mono">{qrData?.orderCode || 'TX...'}</strong> đã bị Hủy/Hết hạn.
      </p>
      <div className="text-xs text-amber-300 font-mono bg-amber-950/40 px-4 py-3 rounded-2xl border border-amber-500/30 max-w-md text-left leading-relaxed">
        💡 <strong>Lưu ý:</strong> Vui lòng kiểm tra lại Nội dung chuyển khoản hoặc liên hệ Admin nếu tài khoản ngân hàng của bạn đã bị trừ tiền.
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={onReset}
          className="px-8 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
        >
          THỬ LẠI ĐƠN MỚI
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3.5 rounded-2xl bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 font-bold text-sm uppercase tracking-wider transition-all"
        >
          ĐÓNG
        </button>
      </div>
    </div>
  );
}
