'use client';

import React, { useState } from 'react';
import { RefreshCw, Building2, Copy, CheckCircle2, CreditCard, Loader2, Clock, Check } from 'lucide-react';
import { QrData } from './types';

interface TopupQrStepProps {
  qrData: QrData;
  checkStatus: () => void;
  onReset: () => void;
}

export default function TopupQrStep({
  qrData,
  checkStatus,
  onReset,
}: TopupQrStepProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isCard = qrData.paymentMethod === 'CARD';

  if (isCard) {
    return (
      <div className="space-y-7">
        {/* Card Pending Banner */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-3 text-amber-300 text-sm">
            <span className="w-3 h-3 rounded-full bg-amber-400/80 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span>
              Trạng thái:{' '}
              <strong className="text-amber-300 font-bold">
                Đang chờ hệ thống gạch thẻ...
              </strong>
            </span>
          </div>
          <button
            onClick={checkStatus}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400/80" /> Kiểm tra ngay
          </button>
        </div>

        {/* Card Details Card */}
        <div className="p-7 rounded-3xl bg-slate-950/90 border border-amber-500/25 flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-md">
              <CreditCard className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-900 border border-amber-400/60 text-amber-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-wide">
              Thẻ cào đã được gửi thành công!
            </h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Hệ thống đổi thẻ đang kiểm tra mã thẻ và gạch thẻ tự động. Quá trình xử lý thường mất từ <strong className="text-amber-300">30 giây đến 3 phút</strong>.
            </p>
          </div>

          {/* Details Table */}
          <div className="w-full max-w-md p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-3">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <span className="text-slate-500">Mã Đơn Nạp:</span>
              <span className="font-extrabold text-amber-400">{qrData.orderCode}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <span className="text-slate-500">Nhân Vật Game:</span>
              <span className="font-bold text-slate-200">{qrData.username}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <span className="text-slate-500">Nhà Mạng / Mệnh Giá:</span>
              <span className="font-bold text-slate-200">{qrData.telco || 'Thẻ cào'} - {qrData.amount.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">Dự Kiến Nhận:</span>
              <span className="font-extrabold text-emerald-400 text-sm">+{qrData.pointReceived.toLocaleString('vi-VN')} POINT</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Point sẽ tự động cộng vào nhân vật Minecraft khi thẻ xử lý xong!</span>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-2xl bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono uppercase tracking-wider transition-all hover:bg-slate-900"
        >
          ← Quay lại nạp thẻ khác
        </button>
      </div>
    );
  }

  // Bank VietQR Step Display
  return (
    <div className="space-y-7">
      {/* Payment Alert Banner */}
      <div className="p-4 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-between text-xs font-mono shadow-md">
        <div className="flex items-center gap-3 text-cyan-300 text-sm">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#00ff9d]" />
          <span>
            Trạng thái:{' '}
            <strong className="text-emerald-400">
              Đang chờ chuyển khoản...
            </strong>
          </span>
        </div>
        <button
          onClick={checkStatus}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs hover:border-cyan-400 transition-all"
        >
          <RefreshCw className="w-4 h-4 animate-spin" /> Kiểm tra ngay
        </button>
      </div>

      {/* QR Code and Transfer Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* QR Code Display (Spans 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-white rounded-3xl border border-slate-700 shadow-2xl">
          {qrData.qrCodeUrl && (
            <img
              src={qrData.qrCodeUrl}
              alt="VietQR Top Up"
              className="w-full max-w-[260px] h-auto object-contain rounded-xl"
            />
          )}
          <span className="mt-3 text-xs text-slate-800 font-mono font-extrabold uppercase tracking-wider text-center">
            Quét bằng App Ngân Hàng / MoMo
          </span>
        </div>

        {/* Transfer Details (Spans 7 cols) */}
        {qrData.bankInfo && (
          <div className="md:col-span-7 space-y-3.5 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[11px] uppercase block">
                Ngân hàng
              </span>
              <strong className="text-slate-100 font-bold text-base flex items-center gap-2 mt-0.5">
                <Building2 className="w-5 h-5 text-cyan-400" />{' '}
                {qrData.bankInfo.bankId}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[11px] uppercase block">
                  Số tài khoản
                </span>
                <strong className="text-cyan-400 font-extrabold text-lg">
                  {qrData.bankInfo.accountNo}
                </strong>
              </div>
              <button
                onClick={() => copyToClipboard(qrData.bankInfo?.accountNo || '', 'acc')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-all"
              >
                {copiedField === 'acc' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedField === 'acc' ? 'Đã Copy' : 'Copy STK'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[11px] uppercase block">
                Chủ tài khoản
              </span>
              <strong className="text-slate-100 uppercase font-semibold text-sm">
                {qrData.bankInfo.accountName}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/50 via-slate-950 to-slate-950 border border-amber-500/50 flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <div>
                <span className="text-amber-400 text-[11px] uppercase font-bold block mb-0.5">
                  Nội dung chuyển (BẮT BUỘC MATCH)
                </span>
                <strong className="text-amber-300 text-xl font-extrabold tracking-widest">
                  {qrData.bankInfo.transferContent || qrData.orderCode}
                </strong>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    qrData.bankInfo?.transferContent || qrData.orderCode,
                    'code',
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/60 flex items-center gap-2 font-bold text-xs shadow-md transition-all scale-105"
              >
                {copiedField === 'code' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedField === 'code' ? 'ĐÃ COPY' : 'COPY MÃ'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={onReset}
        className="w-full py-3.5 rounded-2xl bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono uppercase tracking-wider transition-all hover:bg-slate-900"
      >
        ← Quay lại nhập tên khác
      </button>
    </div>
  );
}
