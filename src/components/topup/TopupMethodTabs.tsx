import React from 'react';
import { Building2, CreditCard } from 'lucide-react';
import { PaymentMethodType } from '@/types/topup';

interface TopupMethodTabsProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  onClearError?: () => void;
}

export default function TopupMethodTabs({
  paymentMethod,
  setPaymentMethod,
  onClearError,
}: TopupMethodTabsProps) {
  const handleSelect = (method: PaymentMethodType) => {
    setPaymentMethod(method);
    if (onClearError) onClearError();
  };

  return (
    <div>
      <label className="block text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2.5">
        Chọn Phương Thức Nạp
      </label>
      <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => handleSelect('BANK')}
          className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
            paymentMethod === 'BANK'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Building2 className="w-4 h-4 shrink-0" />
          <span>Nạp Qua Ngân Hàng (VietQR)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelect('CARD')}
          className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all relative ${
            paymentMethod === 'CARD'
              ? 'bg-gradient-to-r from-red-950/90 to-slate-900 text-red-200 border border-red-500/50 shadow-md scale-[1.01]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <CreditCard className="w-4 h-4 shrink-0 text-red-400" />
          <div className="flex flex-col items-start text-left">
            <span>Nạp Thẻ Cào</span>
            <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/80 border border-red-500/40 px-1.5 py-0.5 rounded-full mt-0.5">
              Tạm Đóng
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
