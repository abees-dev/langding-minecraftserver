'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Send, AlertTriangle, ChevronDown, MessageSquare } from 'lucide-react';
import { TelcoType } from '@/types/deposit';
import { TelcoInfo } from '@/app/api/deposit/card-types/route';
import { siteConfig } from '@/config/site';

interface TopupCardFormProps {
  telco: TelcoType;
  setTelco: (val: TelcoType) => void;
  amount: number;
  setAmount: (val: number) => void;
  cardCode: string;
  setCardCode: (val: string) => void;
  cardSerial: string;
  setCardSerial: (val: string) => void;
  submitting: boolean;
}

const DEFAULT_CARD_AMOUNTS = [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000];

export default function TopupCardForm({
  telco,
  setTelco,
  amount,
  setAmount,
  cardCode,
  setCardCode,
  cardSerial,
  setCardSerial,
  submitting,
}: TopupCardFormProps) {
  const [telcoList, setTelcoList] = useState<TelcoInfo[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Fetch supported cards & fee structure dynamically from API endpoint
  useEffect(() => {
    let isMounted = true;
    fetch('/api/deposit/card-types')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.telcos) && data.telcos.length > 0) {
          setTelcoList(data.telcos);
        }
      })
      .catch((err) => console.warn('Failed to fetch card types from API:', err))
      .finally(() => {
        if (isMounted) setLoadingTypes(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Determine current active available amounts for selected telco
  const currentTelcoInfo = telcoList.find((t) => t.id === telco);
  const availableAmounts = currentTelcoInfo?.availableAmounts || DEFAULT_CARD_AMOUNTS;

  return (
    <div className="space-y-6">
      {/* Maintenance Closed Alert Box */}
      <div className="p-5 rounded-2xl bg-red-950/80 border border-red-500/50 flex flex-col gap-3 text-xs text-red-100 leading-relaxed shadow-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 text-red-400 mt-0.5" />
          <div className="space-y-1.5">
            <span className="font-extrabold text-red-400 block uppercase tracking-wider text-sm">
              🚫 Cổng nạp thẻ cào tự động đang tạm đóng!
            </span>
            <p className="text-slate-200">
              • <strong className="text-amber-300 font-bold">Nạp thẻ Viettel:</strong> Vui lòng liên hệ trực tiếp <strong className="text-indigo-300 font-bold">Discord Admin</strong> để được hỗ trợ nạp thẻ thủ công.
            </p>
            <p className="text-red-300/90 font-medium">
              • <strong className="text-red-400 font-bold uppercase underline">KHÔNG nhận nạp thẻ khác:</strong> Hệ thống hiện không hỗ trợ bất kỳ loại thẻ nào khác (Mobifone, Vinaphone, Zing, Garena, Vcoin...).
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-red-500/30 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400">Ưu tiên khuyên dùng Nạp Qua Ngân Hàng (VietQR)</span>
          <a
            href={siteConfig.social.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-indigo-500/30 transition-all shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Liên Hệ Discord Admin</span>
          </a>
        </div>
      </div>

      {/* Telco Select Dropdown */}
      <div>
        <label
          htmlFor="as-telco-select"
          className="block text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between"
        >
          <span>2. Chọn Nhà Mạng Thẻ Cào <span className="text-red-400/90">*</span></span>
          {loadingTypes && (
            <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin text-amber-400/70" /> Đang cập nhật...
            </span>
          )}
        </label>

        <div className="relative">
          <select
            id="as-telco-select"
            disabled
            value={telco}
            onChange={(e) => {
              const newTelco = e.target.value as TelcoType;
              setTelco(newTelco);
              const tInfo = telcoList.find((t) => t.id === newTelco);
              if (tInfo?.availableAmounts && tInfo.availableAmounts.length > 0) {
                if (!tInfo.availableAmounts.includes(amount)) {
                  setAmount(tInfo.availableAmounts[0]);
                }
              }
            }}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-500 font-mono text-sm font-semibold cursor-not-allowed appearance-none pr-10"
          >
            {(telcoList.length > 0
              ? telcoList
              : [
                  { id: 'VIETTEL', name: 'Viettel' },
                  { id: 'MOBIFONE', name: 'Mobifone' },
                  { id: 'VINAPHONE', name: 'Vinaphone' },
                  { id: 'ZING', name: 'Zing' },
                  { id: 'GARENA', name: 'Garena' },
                  { id: 'VCOIN', name: 'Vcoin' },
                  { id: 'APPOTA', name: 'Appota' },
                  { id: 'SCOIN', name: 'Scoin' },
                  { id: 'GATE', name: 'Gate' },
                ]
            ).map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-slate-100">
                {t.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Card Denomination Select Dropdown */}
      <div>
        <label
          htmlFor="as-amount-select"
          className="block text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2"
        >
          3. Chọn Mệnh Giá Khai Báo (VNĐ) <span className="text-red-400/90">*</span>
        </label>
        <div className="relative">
          <select
            id="as-amount-select"
            disabled
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-500 font-mono text-sm font-semibold cursor-not-allowed appearance-none pr-10"
          >
            {availableAmounts.map((amt) => (
              <option key={amt} value={amt} className="bg-slate-900 text-slate-100">
                {amt.toLocaleString('vi-VN')} VNĐ
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Serial & Pin Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="as-card-serial-input"
            className="block text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-1.5"
          >
            4. Số Seri Thẻ <span className="text-red-400/90">*</span>
          </label>
          <input
            id="as-card-serial-input"
            name="as_card_serial"
            type="text"
            disabled
            value={cardSerial}
            onChange={(e) => setCardSerial(e.target.value.trim())}
            placeholder="Nhập số seri in trên thẻ..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-500 font-mono text-sm font-semibold cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="as-card-code-input"
            className="block text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-1.5"
          >
            5. Mã Thẻ Cào (Mã PIN) <span className="text-red-400/90">*</span>
          </label>
          <input
            id="as-card-code-input"
            name="as_card_code"
            type="text"
            disabled
            value={cardCode}
            onChange={(e) => setCardCode(e.target.value.trim())}
            placeholder="Nhập mã thẻ sau lớp tráng bạc..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-500 font-mono text-sm font-semibold cursor-not-allowed"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled
        className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed border border-slate-700/50 shadow-none"
      >
        <Send className="w-5 h-5 text-slate-500" />
        <span>CỔNG NẠP THẺ ĐANG TẠM ĐÓNG</span>
      </button>
    </div>
  );
}
