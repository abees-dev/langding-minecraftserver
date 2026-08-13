import React from 'react';
import { AlertCircle, QrCode, Loader2, Sparkles, Flame } from 'lucide-react';
import { calculatePointReceived, calculatePointBreakdown, getPromoEventDetails } from '@/lib/point';

interface TopupFormStepProps {
  username: string;
  setUsername: (val: string) => void;
  amount: number;
  setAmount: (val: number) => void;
  customAmountStr: string;
  setCustomAmountStr: (val: string) => void;
  userErrorMsg: string;
  setUserErrorMsg: (val: string) => void;
  creatingQr: boolean;
  onSubmit: (e: React.FormEvent) => void;
  presetAmounts: number[];
}

export default function TopupFormStep({
  username,
  setUsername,
  amount,
  setAmount,
  customAmountStr,
  setCustomAmountStr,
  userErrorMsg,
  setUserErrorMsg,
  creatingQr,
  onSubmit,
  presetAmounts,
}: TopupFormStepProps) {
  const promo = getPromoEventDetails();
  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmountStr(val.toLocaleString('vi-VN'));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const num = Number(rawVal);
    setAmount(num);
    setCustomAmountStr(num > 0 ? num.toLocaleString('vi-VN') : '');
  };

  const breakdown = calculatePointBreakdown(amount);

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {/* Username Input với Autocomplete lịch sử nhập mặc định của Trình duyệt */}
      <div>
        <label
          htmlFor="as-username-input"
          className="block text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2.5"
        >
          1. Nhập Tên Nhân Vật Minecraft <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            id="as-username-input"
            name="as_username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (userErrorMsg) setUserErrorMsg('');
            }}
            placeholder="Nhập chính xác tên nhân vật (Ví dụ: abeess...)"
            autoComplete="on"

            className={`w-full px-5 py-4 rounded-2xl bg-slate-950 border text-slate-100 text-base font-semibold placeholder:text-slate-600 focus:outline-none transition-all ${
              userErrorMsg
                ? 'border-red-500/80 focus:border-red-400 shadow-[0_0_20px_rgba(255,0,0,0.25)]'
                : 'border-slate-800 focus:border-cyan-500 shadow-inner focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
            }`}
            required
          />
        </div>

        {/* Show Error message on submit if user does not exist in DB */}
        {userErrorMsg && (
          <p className="mt-3 text-xs text-red-400 font-medium flex items-start gap-2.5 bg-red-950/60 p-3.5 rounded-2xl border border-red-500/40 shadow-inner leading-relaxed">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{userErrorMsg}</span>
          </p>
        )}
      </div>

      {/* Amount Selection */}
      <div>
        <label className="block text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2.5">
          2. Chọn Mệnh Giá Hoặc Nhập Số Tiền Nạp (VNĐ)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3.5">
          {presetAmounts.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleSelectAmount(val)}
              className={`py-3 px-2 rounded-2xl text-sm font-bold font-mono transition-all border ${
                amount === val
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
              }`}
            >
              {(val / 1000).toLocaleString()}K VNĐ
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={customAmountStr}
            onChange={handleCustomAmountChange}
            placeholder="Nhập số tiền tùy chỉnh khác..."
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-base font-mono font-bold focus:outline-none focus:border-cyan-500 shadow-inner"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono font-bold">
            VNĐ
          </span>
        </div>
      </div>

      {/* Promo Event Banner Box */}
      {promo.active && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block uppercase tracking-wider">
                🔥 {promo.title}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Nhận x2 Point (Thưởng +100%) áp dụng đến <strong className="text-amber-400">{promo.endDateFormatted}</strong>
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 shadow-md">
            +100% POINT
          </span>
        </div>
      )}

      {/* Simple Clean Rate Preview */}
      <div className="p-4.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-md">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-slate-200 font-bold text-sm">
            Thực nhận ({breakdown.basePoint.toLocaleString('vi-VN')} Gốc + {breakdown.bonusPoint.toLocaleString('vi-VN')} KM +{breakdown.bonusPercent}%):
          </span>
        </div>
        <span className="text-emerald-400 font-black text-xl glow-text-green tracking-wide self-end sm:self-auto">
          +{breakdown.totalPoint.toLocaleString('vi-VN')} POINT
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={creatingQr}
        className="w-full py-4.5 rounded-2xl font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] hover:scale-[1.01] transition-all disabled:opacity-50"
      >
        {creatingQr ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
            <span>ĐANG KIỂM TRA TÀI KHOẢN & TẠO QR...</span>
          </>
        ) : (
          <>
            <QrCode className="w-6 h-6 text-slate-950" />
            <span>TẠO MÃ QR NẠP TIỀN</span>
          </>
        )}
      </button>
    </form>
  );
}
