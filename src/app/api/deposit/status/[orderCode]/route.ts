import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderCode: string }> }
) {
  try {
    const resolvedParams = await params;
    const orderCode = resolvedParams?.orderCode;

    if (!orderCode) {
      return NextResponse.json({ success: false, message: 'Thiếu mã đơn hàng!' }, { status: 400 });
    }

    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT order_code, username, amount, point_received, status, created_at FROM transactions WHERE order_code = ? LIMIT 1',
        [orderCode]
      );

      if (rows.length > 0) {
        const tx = rows[0];
        return NextResponse.json({
          success: true,
          orderCode: tx.order_code,
          username: tx.username,
          amount: tx.amount,
          pointReceived: tx.point_received,
          status: tx.status,
          createdAt: tx.created_at,
        });
      }
    } catch (dbErr: any) {
      console.warn('[DB Transaction Status Query Warning]:', dbErr?.message);
    }

    return NextResponse.json({
      success: true,
      orderCode,
      status: 'PENDING',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
