'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Send, AlertTriangle, ChevronDown } from 'lucide-react';
import { TelcoType } from '@/types/deposit';
import { TelcoInfo } from '@/app/api/deposit/card-types/route';

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
      {/* Soft Warning Alert Box */}
      <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/35 flex items-start gap-3 text-xs text-red-200/90 leading-relaxed shadow-sm">
        <AlertTriangle className="w-4 h-4 shrink-0 text-red-400/90 mt-0.5" />
        <div>
          <span className="font-bold text-red-400/90 block uppercase tracking-wider mb-0.5">
            ⚠️ Lưu ý quan trọng về mệnh giá thẻ:
          </span>
          <span>
            Chọn <strong className="text-amber-300/90 underline font-semibold">chính xác</strong> mệnh giá thẻ. Nhập <strong className="text-red-300 font-bold uppercase underline">sai mệnh giá sẽ bị mất thẻ</strong> (nhà mạng thu hồi) và Admin <strong className="text-red-300 font-bold uppercase">không chịu trách nhiệm</strong> xử lý đền bù!
          </span>
        </div>
      </div>

      {/* Telco Select Dropdown */}
      <div>
        <label
          htmlFor="as-telco-select"
          className="block text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between"
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
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm font-semibold focus:outline-none focus:border-amber-500/60 shadow-inner appearance-none cursor-pointer pr-10"
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
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Card Denomination Select Dropdown */}
      <div>
        <label
          htmlFor="as-amount-select"
          className="block text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider mb-2"
        >
          3. Chọn Mệnh Giá Khai Báo (VNĐ) <span className="text-red-400/90">*</span>
        </label>
        <div className="relative">
          <select
            id="as-amount-select"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm font-semibold focus:outline-none focus:border-amber-500/60 shadow-inner appearance-none cursor-pointer pr-10"
          >
            {availableAmounts.map((val) => (
              <option key={val} value={val} className="bg-slate-900 text-slate-100">
                {val.toLocaleString('vi-VN')} VNĐ {val >= 1000000 ? `(${val / 1000000} Triệu)` : `(${val / 1000}K)`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <p className="mt-2 text-[11px] text-red-400/80 font-mono italic">
          * Khai báo sai mệnh giá = Mất thẻ (Admin không hỗ trợ giải quyết).
        </p>
      </div>

      {/* Serial & Code Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="as-card-serial-input"
            className="block text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider mb-1.5"
          >
            4. Số Seri Thẻ <span className="text-red-400/90">*</span>
          </label>
          <input
            id="as-card-serial-input"
            name="as_card_serial"
            type="text"
            value={cardSerial}
            onChange={(e) => setCardSerial(e.target.value.trim())}
            placeholder="Nhập số Seri in trên thẻ..."
            autoComplete="on"
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 shadow-inner"
            required
          />
        </div>

        <div>
          <label
            htmlFor="as-card-code-input"
            className="block text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider mb-1.5"
          >
            5. Mã Thẻ Cào (Mã PIN) <span className="text-red-400/90">*</span>
          </label>
          <input
            id="as-card-code-input"
            name="as_card_code"
            type="text"
            value={cardCode}
            onChange={(e) => setCardCode(e.target.value.trim())}
            placeholder="Nhập mã thẻ sau lớp tráng bạc..."
            autoComplete="on"
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 shadow-inner"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md shadow-amber-950/30 transition-all disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>ĐANG GỬI THẺ LÊN HỆ THỐNG...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 text-slate-950" />
            <span>GỬI THẺ CÀO NẠP POINT</span>
          </>
        )}
      </button>
    </div>
  );
}
