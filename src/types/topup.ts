export type StepType = 'FORM' | 'QR' | 'SUCCESS' | 'FAILED';

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
  qrCodeUrl: string;
  checkoutUrl?: string;
  bankInfo: BankInfo;
}

export interface TopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}
