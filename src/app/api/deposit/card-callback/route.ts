import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { calculatePointReceived } from '@/lib/point';
import {
  completeDepositTransaction,
  updateDepositTransactionAmountAndPoint,
  updateDepositTransactionStatus,
  getDepositByOrderCode,
} from '@/services/depositService';

async function handleCardCallback(payload: Record<string, any>) {
  console.log('[Card Partner Webhook Received]:', JSON.stringify(payload));

  const status = Number(payload.status);
  const requestId = String(payload.request_id || payload.requestId || '').trim();
  const code = String(payload.code || '').trim();
  const serial = String(payload.serial || '').trim();
  const callbackSign = String(payload.callback_sign || payload.sign || '').trim();

  if (!requestId) {
    return NextResponse.json({ status: 0, message: 'Missing request_id' }, { status: 400 });
  }

  // Verify Partner Callback Signature
  const partnerKey = process.env.CARD_PARTNER_KEY || '';
  if (partnerKey && callbackSign && code && serial) {
    const expectedSign = crypto
      .createHash('md5')
      .update(`${partnerKey}${code}${serial}`)
      .digest('hex');

    if (callbackSign.toLowerCase() !== expectedSign.toLowerCase()) {
      console.error('[Card Webhook Signature Mismatch]:', { callbackSign, expectedSign });
      return NextResponse.json({ status: 0, message: 'Invalid callback_sign' }, { status: 400 });
    }
  }

  const depositTx = await getDepositByOrderCode(requestId);
  if (!depositTx) {
    console.warn(`[Card Webhook Warning]: Transaction ${requestId} not found in DB.`);
    return NextResponse.json({ status: 0, message: 'Transaction not found' }, { status: 404 });
  }

  if (depositTx.status === 'COMPLETED') {
    return NextResponse.json({ status: 1, message: 'Already completed' });
  }

  // Status 1: Thẻ đúng mệnh giá - Nạp thành công
  if (status === 1) {
    const result = await completeDepositTransaction(requestId);
    console.log(`[Card Webhook Completed Status 1]: ${requestId} -> +${result.pointAdded} Point for ${result.username}`);
    return NextResponse.json({ status: 1, message: 'Success' });
  }

  // Status 2: Thẻ sai mệnh giá - Nạp thành công theo mệnh giá thực
  if (status === 2) {
    const actualCardValue = Number(payload.value || payload.card_value || payload.declared_value || depositTx.amount);
    const actualPoint = calculatePointReceived(actualCardValue, 'CARD');

    await updateDepositTransactionAmountAndPoint(requestId, actualCardValue, actualPoint);
    const result = await completeDepositTransaction(requestId);

    console.log(
      `[Card Webhook Completed Status 2]: ${requestId} (Wrong denomination) actual: ${actualCardValue}đ -> +${actualPoint} Point for ${result.username}`
    );
    return NextResponse.json({ status: 1, message: 'Success with adjusted amount' });
  }

  // Status 3, 4, 100, etc: Thẻ lỗi / Thất bại
  await updateDepositTransactionStatus(requestId, 'FAILED');
  console.log(`[Card Webhook Failed]: ${requestId} marked FAILED (status ${status})`);

  return NextResponse.json({ status: 1, message: 'Status updated to FAILED' });
}

export async function POST(request: NextRequest) {
  try {
    let payload: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      payload = Object.fromEntries(params.entries());
    } else {
      try {
        payload = await request.json();
      } catch {
        const text = await request.text();
        const params = new URLSearchParams(text);
        payload = Object.fromEntries(params.entries());
      }
    }

    return await handleCardCallback(payload);
  } catch (error: any) {
    console.error('[Card Webhook POST Error]:', error);
    return NextResponse.json({ status: 0, message: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const payload = Object.fromEntries(searchParams.entries());
    return await handleCardCallback(payload);
  } catch (error: any) {
    console.error('[Card Webhook GET Error]:', error);
    return NextResponse.json({ status: 0, message: error?.message || 'Server error' }, { status: 500 });
  }
}
