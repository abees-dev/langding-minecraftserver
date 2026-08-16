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

export type TelcoType =
  | 'VIETTEL'
  | 'MOBIFONE'
  | 'VINAPHONE'
  | 'ZING'
  | 'GARENA'
  | 'APPOTA'
  | 'VCOIN'
  | 'SCOIN'
  | 'GATE';

export interface CardDepositPayload {
  username: string;
  telco: TelcoType;
  amount: number;
  code: string;
  serial: string;
}

export interface CardPartnerResponse {
  trans_id?: number | string;
  request_id?: string;
  amount?: number;
  value?: number | null;
  declared_value?: number;
  telco?: string;
  serial?: string;
  code?: string;
  status: number;
  message?: string;
}

export interface CardCallbackPayload {
  status: number;
  message?: string;
  request_id: string;
  declared_value?: number;
  value?: number;
  card_value?: number;
  amount?: number;
  code?: string;
  serial?: string;
  telco?: string;
  trans_id?: number | string;
  callback_sign?: string;
}
