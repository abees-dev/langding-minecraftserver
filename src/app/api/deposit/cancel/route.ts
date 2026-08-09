import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { payos, isPayOSConfigured } from '@/lib/payos';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderCode } = body;

    if (!orderCode) {
      return NextResponse.json({ success: false, message: 'Thiếu mã đơn nạp!' }, { status: 400 });
    }

    const orderCodeStr = String(orderCode);
    const numericCode = Number(orderCodeStr.replace(/\D/g, ''));

    // 1. Cập nhật DB transactions -> status = 'EXPIRED' (hoặc CANCELLED)
    try {
      await pool.execute<ResultSetHeader>(
        "UPDATE transactions SET status = 'EXPIRED', updated_at = NOW() WHERE (order_code = ? OR order_code = ?) AND status = 'PENDING'",
        [orderCodeStr, String(numericCode)]
      );
    } catch (dbErr: any) {
      console.warn('[DB Deposit Cancel Warning]:', dbErr?.message);
    }

    // 2. Nếu sử dụng PayOS -> Gọi PayOS SDK Hủy Payment Link
    if (isPayOSConfigured && numericCode > 0) {
      try {
        await payos.paymentRequests.cancel(numericCode, 'Khach hang huy don nap tren Web');
        console.log(`[PayOS Payment Cancelled]: OrderCode=${numericCode}`);
      } catch (payosCancelErr: any) {
        console.warn('[PayOS Cancel Link Warning]:', payosCancelErr?.message || payosCancelErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã hủy đơn nạp ${orderCodeStr} thành công.`,
    });
  } catch (error: any) {
    console.error('[Deposit Cancel Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Không thể hủy đơn nạp.' },
      { status: 500 }
    );
  }
}
