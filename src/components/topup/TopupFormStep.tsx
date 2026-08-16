import React from 'react';
import { AlertCircle, Sparkles, Flame, Tag } from 'lucide-react';
import { calculatePointBreakdown, getPromoEventDetails } from '@/lib/point';
import { PaymentMethodType } from '@/types/topup';
import { TelcoType } from '@/types/deposit';
import TopupMethodTabs from './TopupMethodTabs';
import TopupBankForm from './TopupBankForm';
import TopupCardForm from './TopupCardForm';

interface TopupFormStepProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  username: string;
  setUsername: (val: string) => void;
  amount: number;
  setAmount: (val: number) => void;
  customAmountStr: string;
  setCustomAmountStr: (val: string) => void;
  telco: TelcoType;
  setTelco: (val: TelcoType) => void;
  cardCode: string;
  setCardCode: (val: string) => void;
  cardSerial: string;
  setCardSerial: (val: string) => void;
  userErrorMsg: string;
  setUserErrorMsg: (val: string) => void;
  submitting: boolean;
  onSubmitBank: (e: React.FormEvent) => void;
  onSubmitCard: (e: React.FormEvent) => void;
  presetAmounts: number[];
}

export default function TopupFormStep({
  paymentMethod,
  setPaymentMethod,
  username,
  setUsername,
  amount,
  setAmount,
  customAmountStr,
  setCustomAmountStr,
  telco,
  setTelco,
  cardCode,
  setCardCode,
  cardSerial,
  setCardSerial,
  userErrorMsg,
  setUserErrorMsg,
  submitting,
  onSubmitBank,
  onSubmitCard,
  presetAmounts,
}: TopupFormStepProps) {
  const promo = getPromoEventDetails();
  const breakdown = calculatePointBreakdown(amount, paymentMethod);

  return (
    <div className="space-y-7">
      {/* 1. Payment Method Selection Tabs */}
      <TopupMethodTabs
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onClearError={() => {
          if (userErrorMsg) setUserErrorMsg('');
        }}
      />

      <form onSubmit={paymentMethod === 'BANK' ? onSubmitBank : onSubmitCard} className="space-y-7">
        {/* 2. Username Input */}
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

          {userErrorMsg && (
            <p className="mt-3 text-xs text-red-400 font-medium flex items-start gap-2.5 bg-red-950/60 p-3.5 rounded-2xl border border-red-500/40 shadow-inner leading-relaxed">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{userErrorMsg}</span>
            </p>
          )}
        </div>

        {/* 3. Subcomponent Form based on payment method */}
        {paymentMethod === 'BANK' ? (
          <TopupBankForm
            amount={amount}
            setAmount={setAmount}
            customAmountStr={customAmountStr}
            setCustomAmountStr={setCustomAmountStr}
            presetAmounts={presetAmounts}
            submitting={submitting}
          />
        ) : (
          <TopupCardForm
            telco={telco}
            setTelco={setTelco}
            amount={amount}
            setAmount={setAmount}
            cardCode={cardCode}
            setCardCode={setCardCode}
            cardSerial={cardSerial}
            setCardSerial={setCardSerial}
            submitting={submitting}
          />
        )}

        {/* 4. Promo Event Banner Box */}
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

        {/* 5. Point Rate Preview Breakdown */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-md">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-slate-200 font-bold text-sm">
                Thực nhận ({breakdown.basePoint.toLocaleString('vi-VN')} Gốc + {breakdown.bonusPoint.toLocaleString('vi-VN')} KM +{breakdown.bonusPercent}%):
              </span>
              {paymentMethod === 'CARD' && (
                <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                  <Tag className="w-3 h-3" /> Chiết khấu thẻ cào: Thấp hơn 20% so với Nạp Bank (x0.8)
                </span>
              )}
            </div>
          </div>
          <span className="text-emerald-400 font-black text-xl glow-text-green tracking-wide self-end sm:self-auto shrink-0">
            +{breakdown.totalPoint.toLocaleString('vi-VN')} POINT
          </span>
        </div>
      </form>
    </div>
  );
}
