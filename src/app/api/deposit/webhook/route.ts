import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { payos, isPayOSConfigured } from '@/lib/payos';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'aethermine_secret_key_2026';
const ORDER_PREFIX = process.env.ORDER_PREFIX || 'TX';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[Deposit Webhook Payload Received]:', JSON.stringify(body));

    // Xử lý dữ liệu mẫu Test của PayOS Dashboard (orderCode = 123 hoặc description = VQRIO123)
    const isTestSample =
      body?.data?.orderCode === 123 ||
      body?.data?.description === 'VQRIO123' ||
      body?.orderCode === 123;

    if (isTestSample) {
      console.log('[PayOS Test Sample Webhook Received]: PayOS Dashboard test connection verified.');
      return NextResponse.json({ success: true, message: 'Xác thực Webhook PayOS thành công!' }, { status: 200 });
    }

    let targetOrderCode = '';
    let isVerifiedPayOS = false;

    // 1. Kiểm tra nếu là Webhook từ PayOS (có chữ ký signature)
    if (isPayOSConfigured && body.signature && body.data) {
      try {
        const verifiedData = await payos.webhooks.verify(body);
        if (verifiedData && verifiedData.orderCode) {
          targetOrderCode = String(verifiedData.orderCode);
          isVerifiedPayOS = true;
          console.log(`[PayOS Verified Webhook]: OrderCode=${targetOrderCode}, Amount=${verifiedData.amount}`);
        }
      } catch (payosErr: any) {
        console.error('[PayOS Webhook Verification Failed]:', payosErr?.message);
        return NextResponse.json({ success: false, message: 'Chữ ký Webhook PayOS không hợp lệ' }, { status: 400 });
      }
    }

    // 2. Nếu không phải PayOS Verified, kiểm tra Webhook Secret chuẩn của hệ thống
    if (!isVerifiedPayOS) {
      const authHeader = request.headers.get('x-webhook-secret') || request.headers.get('authorization');
      if (process.env.NODE_ENV === 'production' && authHeader !== WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
        return NextResponse.json({ success: false, message: 'Unauthorized Webhook' }, { status: 401 });
      }

      let orderCode = body?.orderCode || body?.content || body?.description || '';
      if (body?.data && Array.isArray(body.data) && body.data.length > 0) {
        const item = body.data[0];
        orderCode = item.description || item.content || '';
      }

      // Regex hỗ trợ mã thuần số (PayOS 10 chữ số) hoặc dạng TX.../NAP...
      const matchRegex = new RegExp(`(${ORDER_PREFIX}[A-Z0-9]+|TX[A-Z0-9]+|NAP[A-Z0-9]+|\\b\\d{6,12}\\b)`, 'i');
      const match = String(orderCode).match(matchRegex);
      if (!match) {
        return NextResponse.json({
          success: false,
          message: 'Không tìm thấy mã đơn nạp hợp lệ trong nội dung chuyển khoản.',
        });
      }
      targetOrderCode = match[1].toUpperCase();
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const strippedCode = targetOrderCode.replace(new RegExp(`^${ORDER_PREFIX}`, 'i'), '');
      const [txRows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM transactions WHERE order_code = ? OR order_code = ? FOR UPDATE',
        [targetOrderCode, strippedCode]
      );

      if (txRows.length === 0) {
        await connection.rollback();
        connection.release();
        return NextResponse.json({
          success: false,
          message: `Không tìm thấy đơn nạp ${targetOrderCode} trong hệ thống.`,
        });
      }

      const transaction = txRows[0];

      if (transaction.status === 'COMPLETED') {
        await connection.rollback();
        connection.release();
        return NextResponse.json({
          success: true,
          message: `Đơn nạp ${targetOrderCode} đã hoàn tất trước đó.`,
        });
      }

      await connection.execute(
        'UPDATE transactions SET status = "COMPLETED", updated_at = NOW() WHERE order_code = ?',
        [targetOrderCode]
      );

      const pointToAdd = Number(transaction.point_received || transaction.amount || 0);
      await connection.execute(
        'UPDATE users SET point = point + ? WHERE LOWER(username) = LOWER(?)',
        [pointToAdd, transaction.username]
      );

      await connection.commit();
      connection.release();

      console.log(`[Deposit Webhook SUCCESS]: Đã nạp +${pointToAdd} Point cho user "${transaction.username}" (Mã: ${targetOrderCode})`);

      return NextResponse.json({
        success: true,
        message: `Xác nhận chuyển khoản thành công! Đã cộng +${pointToAdd} Point cho tài khoản ${transaction.username}.`,
        username: transaction.username,
        pointAdded: pointToAdd,
      });
    } catch (dbTxErr: any) {
      await connection.rollback();
      connection.release();
      throw dbTxErr;
    }
  } catch (error: any) {
    console.error('[Deposit Webhook Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Có lỗi khi xử lý Webhook.' },
      { status: 200 }
    );
  }
}
