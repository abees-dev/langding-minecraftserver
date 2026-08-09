'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StepType, QrData, TopupModalProps } from './topup/types';
import TopupHeader from './topup/TopupHeader';
import TopupFormStep from './topup/TopupFormStep';
import TopupQrStep from './topup/TopupQrStep';
import TopupSuccessStep from './topup/TopupSuccessStep';
import TopupFailedStep from './topup/TopupFailedStep';

import { getMinDepositAmount } from '@/lib/point';

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 200000];
const STORAGE_KEY = 'aethermine_pending_deposit';

export default function TopupModal({ isOpen, onClose }: TopupModalProps) {
  const [step, setStep] = useState<StepType>('FORM');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState<number>(50000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('50,000');

  const [userErrorMsg, setUserErrorMsg] = useState('');
  const [creatingQr, setCreatingQr] = useState(false);
  const [qrData, setQrData] = useState<QrData | null>(null);

  const [, setPaymentStatus] = useState<'PENDING' | 'COMPLETED'>('PENDING');

  // Restore pending transaction from localStorage when page reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.orderCode) {
          fetch(`/api/deposit/status/${parsed.orderCode}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                if (data.status === 'COMPLETED') {
                  localStorage.removeItem(STORAGE_KEY);
                  setQrData(parsed);
                  setStep('SUCCESS');
                  setPaymentStatus('COMPLETED');
                } else if (data.status === 'PENDING') {
                  setQrData(parsed);
                  setUsername(parsed.username || '');
                  setStep('QR');
                  setPaymentStatus('PENDING');
                } else {
                  localStorage.removeItem(STORAGE_KEY);
                }
              }
            })
            .catch(() => {
              setQrData(parsed);
              setUsername(parsed.username || '');
              setStep('QR');
            });
        }
      }
    } catch (e) {
      console.warn('Failed to load pending deposit from localStorage:', e);
    }
  }, []);

  // Submit Form -> Kiểm tra DB user & Tạo QR khi bấm nút
  const handleCreateQr = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUser = username.trim();

    if (!trimmedUser) {
      setUserErrorMsg('Vui lòng nhập tên nhân vật Minecraft!');
      return;
    }

    const minDepositAmount = getMinDepositAmount();
    if (amount < minDepositAmount) {
      alert(`Số tiền nạp tối thiểu là ${minDepositAmount.toLocaleString('vi-VN')} VNĐ`);
      return;
    }

    setCreatingQr(true);
    setUserErrorMsg('');

    try {
      const res = await fetch('/api/deposit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUser,
          amount: amount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setQrData(data);
        setStep('QR');
        setPaymentStatus('PENDING');
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('localStorage save failed:', e);
        }
      } else {
        setUserErrorMsg(data.message || 'Không thể tạo đơn nạp tiền.');
      }
    } catch {
      setUserErrorMsg('Không thể kết nối máy chủ để kiểm tra tài khoản.');
    } finally {
      setCreatingQr(false);
    }
  };

  const checkStatus = useCallback(async () => {
    if (!qrData?.orderCode || step !== 'QR') return;
    try {
      const res = await fetch(`/api/deposit/status/${qrData.orderCode}`);
      const data = await res.json();
      if (data.success && data.status === 'COMPLETED') {
        setPaymentStatus('COMPLETED');
        setStep('SUCCESS');
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.warn(e);
        }
      }
    } catch (e) {
      console.warn('Status poll error:', e);
    }
  }, [qrData?.orderCode, step]);

  useEffect(() => {
    if (step !== 'QR' || !qrData?.orderCode) return;
    const interval = setInterval(() => {
      checkStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, [step, qrData?.orderCode, checkStatus]);

  const handleCancelQr = async () => {
    if (qrData?.orderCode) {
      fetch('/api/deposit/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: qrData.orderCode }),
      }).catch((e) => console.warn('Cancel deposit error:', e));
    }
    handleReset();
  };

  const handleReset = () => {
    setStep('FORM');
    setQrData(null);
    setPaymentStatus('PENDING');
    setUserErrorMsg('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <TopupHeader onClose={onClose} />

        {/* Modal Content Body */}
        <div className="p-8 overflow-y-auto space-y-7">
          {step === 'FORM' && (
            <TopupFormStep
              username={username}
              setUsername={setUsername}
              amount={amount}
              setAmount={setAmount}
              customAmountStr={customAmountStr}
              setCustomAmountStr={setCustomAmountStr}
              userErrorMsg={userErrorMsg}
              setUserErrorMsg={setUserErrorMsg}
              creatingQr={creatingQr}
              onSubmit={handleCreateQr}
              presetAmounts={PRESET_AMOUNTS}
            />
          )}

          {step === 'QR' && qrData && (
            <TopupQrStep
              qrData={qrData}
              checkStatus={checkStatus}
              onReset={handleCancelQr}
            />
          )}

          {step === 'SUCCESS' && (
            <TopupSuccessStep
              qrData={qrData}
              onReset={handleReset}
            />
          )}

          {step === 'FAILED' && (
            <TopupFailedStep
              qrData={qrData}
              onReset={handleReset}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
