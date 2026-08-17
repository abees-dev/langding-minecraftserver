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
    if (method === 'CARD') return;
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
          disabled
          onClick={() => handleSelect('CARD')}
          className="py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all relative text-slate-500 bg-slate-900/30 opacity-60 cursor-not-allowed border border-slate-800/50"
          title="Cổng nạp thẻ cào tự động tạm đóng. Nạp thẻ Viettel liên hệ Discord Admin (Không nhận thẻ khác)"
        >
          <CreditCard className="w-4 h-4 shrink-0 text-slate-500" />
          <div className="flex flex-col items-start text-left">
            <span className="line-through decoration-slate-600">Nạp Thẻ Cào</span>
            <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-1.5 py-0.5 rounded-full mt-0.5">
              Tạm Đóng
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
