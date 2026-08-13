'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StepType, QrData, TopupModalProps } from '@/types/topup';
import TopupHeader from './TopupHeader';
import TopupFormStep from './TopupFormStep';
import TopupQrStep from './TopupQrStep';
import TopupSuccessStep from './TopupSuccessStep';
import TopupFailedStep from './TopupFailedStep';
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

  const handleReset = useCallback(() => {
    setStep('FORM');
    setQrData(null);
    setPaymentStatus('PENDING');
    setUserErrorMsg('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleCancelQr = useCallback(async () => {
    if (qrData?.orderCode) {
      const codeToCancel = qrData.orderCode;
      fetch('/api/deposit/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: codeToCancel }),
      }).catch((e) => console.warn('Cancel deposit error:', e));
    }
    handleReset();
  }, [qrData?.orderCode, handleReset]);

  const handleCloseModal = useCallback(() => {
    if (step === 'QR' && qrData?.orderCode) {
      handleCancelQr();
    } else if (step === 'SUCCESS' || step === 'FAILED') {
      handleReset();
    }
    onClose();
  }, [step, qrData?.orderCode, handleCancelQr, handleReset, onClose]);

  // Prevent page reload & cancel QR when page is closed/unloaded while payment is open
  useEffect(() => {
    if (step !== 'QR' || !qrData?.orderCode) return;

    const orderCode = qrData.orderCode;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const handleUnloadOrPageHide = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        const payload = JSON.stringify({ orderCode });
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('/api/deposit/cancel', blob);
        } else {
          fetch('/api/deposit/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('Failed to cancel deposit on unload:', err);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleUnloadOrPageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleUnloadOrPageHide);
    };
  }, [step, qrData?.orderCode]);

  // Handle ESC key to close modal safely
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseModal]);

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
      alert(
        `Số tiền nạp tối thiểu là ${minDepositAmount.toLocaleString('vi-VN')} VNĐ`,
      );
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
      if (data.success) {
        if (data.status === 'COMPLETED') {
          setPaymentStatus('COMPLETED');
          setStep('SUCCESS');
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (e) {
            console.warn(e);
          }
        } else if (
          data.status === 'EXPIRED' ||
          data.status === 'CANCELLED' ||
          data.status === 'FAILED'
        ) {
          setStep('FAILED');
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (e) {
            console.warn(e);
          }
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <TopupHeader onClose={handleCloseModal} />

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
            <TopupSuccessStep qrData={qrData} onReset={handleReset} />
          )}

          {step === 'FAILED' && (
            <TopupFailedStep
              qrData={qrData}
              onReset={handleReset}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
