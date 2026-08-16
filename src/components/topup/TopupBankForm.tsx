import React from 'react';
import { Loader2, QrCode } from 'lucide-react';

interface TopupBankFormProps {
  amount: number;
  setAmount: (val: number) => void;
  customAmountStr: string;
  setCustomAmountStr: (val: string) => void;
  presetAmounts: number[];
  submitting: boolean;
}

export default function TopupBankForm({
  amount,
  setAmount,
  customAmountStr,
  setCustomAmountStr,
  presetAmounts,
  submitting,
}: TopupBankFormProps) {
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

  return (
    <div className="space-y-7">
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4.5 rounded-2xl font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] hover:scale-[1.01] transition-all disabled:opacity-50"
      >
        {submitting ? (
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
    </div>
  );
}
