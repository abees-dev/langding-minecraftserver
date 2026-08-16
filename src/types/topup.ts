export type StepType = 'FORM' | 'QR' | 'SUCCESS' | 'FAILED';

export type PaymentMethodType = 'BANK' | 'CARD';

export interface BankInfo {
  bankId: string;
  accountNo: string;
  accountName: string;
  transferContent: string;
}

export interface QrData {
  orderCode: string;
  username: string;
  amount: number;
  pointReceived: number;
  qrCodeUrl?: string;
  checkoutUrl?: string;
  bankInfo?: BankInfo;
  paymentMethod?: PaymentMethodType;
  telco?: string;
  message?: string;
}

export interface TopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}
