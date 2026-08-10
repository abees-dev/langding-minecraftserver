export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'FAILED';

export interface DepositTransaction {
  id?: number;
  order_code: string;
  username: string;
  amount: number;
  point_received: number;
  status: TransactionStatus;
  payment_method?: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface CreateDepositPayload {
  username: string;
  amount: number;
}

export interface PayOSWebhookPayload {
  code: string;
  desc: string;
  data: {
    orderCode: number | string;
    amount: number;
    description: string;
    accountNumber: string;
    reference: string;
    transactionDateTime: string;
    paymentLinkId: string;
    code: string;
  };
  signature: string;
}
