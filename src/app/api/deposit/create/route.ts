import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import crypto from 'crypto';
import { payos, isPayOSConfigured } from '@/lib/payos';
import { calculatePointReceived, getMinDepositAmount } from '@/lib/point';

const BANK_CONFIG = {
  bankId: process.env.BANK_ID || 'MB',
  accountNo: process.env.BANK_ACCOUNT_NO || '0333333333',
  accountName: process.env.BANK_ACCOUNT_NAME || 'AETHERMINE SERVER',
  template: process.env.VIETQR_TEMPLATE || 'compact2',
  prefix: process.env.ORDER_PREFIX || 'TX',
};

const BANK_NAME_MAP: Record<string, string> = {
  '970422': 'MB Bank (Ngân hàng Quân Đội)',
  '970436': 'Vietcombank',
  '970415': 'VietinBank',
  '970407': 'Techcombank',
  '970418': 'BIDV',
  '970423': 'TPBank',
  '970441': 'VIB',
  '970432': 'VPBank',
  '970405': 'Agribank',
  '970448': 'OCB',
  'MB': 'MB Bank (Ngân hàng Quân Đội)',
};

/**
 * Sinh mã đơn nạp số nguyên duy nhất cho PayOS
 */
function generateNumericOrderCode(): number {
  const timeSlice = Date.now() % 1000000;
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return Number(`${timeSlice}${randomDigits}`);
}

/**
 * Sinh mã đơn nạp chữ + số truyền thống
 */
function generateOrderCode(prefix: string): string {
  const timeCode = Date.now().toString(36).slice(-4).toUpperCase();
  const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}${timeCode}${randomHex}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, amount } = body;

    const trimmedUsername = username?.trim();
    const numAmount = Number(amount);

    if (!trimmedUsername) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập tên nhân vật Minecraft!' },
        { status: 400 }
      );
    }

    const minDepositAmount = getMinDepositAmount();

    if (!numAmount || isNaN(numAmount) || numAmount < minDepositAmount) {
      return NextResponse.json(
        { success: false, message: `Số tiền nạp tối thiểu là ${minDepositAmount.toLocaleString('vi-VN')} VNĐ!` },
        { status: 400 }
      );
    }

    // 1. Kiểm tra username tồn tại trong DB bảng `users`
    let userExists = false;
    let actualUsername = trimmedUsername;

    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, username FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
        [trimmedUsername]
      );

      if (rows.length > 0) {
        userExists = true;
        actualUsername = rows[0].username;
      }
    } catch (dbErr: any) {
      console.error('[DB User Check Error]:', dbErr?.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Không thể kết nối cơ sở dữ liệu để xác minh nhân vật. Vui lòng thử lại sau!',
        },
        { status: 500 }
      );
    }

    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          message: `Tài khoản "${trimmedUsername}" không tồn tại trong hệ thống! Không thể tạo mã QR. Vui lòng tham gia server game để khởi tạo nhân vật.`,
        },
        { status: 400 }
      );
    }

    const pointReceived = calculatePointReceived(numAmount);
    let orderCodeStr = '';
    let numericOrderCode = 0;
    let inserted = false;
    let attempts = 0;

    const usePayOS = isPayOSConfigured;

    // 2. Thử sinh mã và Insert vào DB với vòng lặp Retry tự động nếu bị trùng (ER_DUP_ENTRY)
    while (!inserted && attempts < 5) {
      attempts++;
      if (usePayOS) {
        numericOrderCode = generateNumericOrderCode();
        orderCodeStr = String(numericOrderCode);
      } else {
        orderCodeStr = generateOrderCode(BANK_CONFIG.prefix);
      }

      try {
        await pool.execute<ResultSetHeader>(
          `INSERT INTO transactions (order_code, username, amount, point_received, status, payment_method, description) 
           VALUES (?, ?, ?, ?, 'PENDING', ?, ?)`,
          [
            orderCodeStr,
            actualUsername,
            numAmount,
            pointReceived,
            usePayOS ? 'PAYOS' : 'VIETQR',
            `Nap Point ${orderCodeStr} cho ${actualUsername}`,
          ]
        );
        inserted = true;
      } catch (insertErr: any) {
        if (insertErr?.code === 'ER_DUP_ENTRY' || insertErr?.errno === 1062) {
          console.warn(`[OrderCode Collision Warning]: Trùng mã ${orderCodeStr}, đang thử lại lần ${attempts + 1}...`);
          continue;
        }
        console.warn('[DB Transaction Insert Warning]:', insertErr?.message);
        break;
      }
    }

    if (!inserted && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, message: 'Không thể khởi tạo mã đơn nạp duy nhất. Vui lòng thử lại!' },
        { status: 500 }
      );
    }

    const fullOrderCode = `${BANK_CONFIG.prefix}${orderCodeStr}`;

    let qrCodeUrl = '';
    let checkoutUrl = '';
    let bankInfo = {
      bankId: BANK_CONFIG.bankId,
      accountNo: BANK_CONFIG.accountNo,
      accountName: BANK_CONFIG.accountName,
      transferContent: fullOrderCode,
    };

    // 3. Tạo QR Code qua PayOS SDK (hoặc VietQR fallback)
    if (usePayOS && numericOrderCode > 0) {
      try {
        const origin = request.nextUrl.origin || 'http://localhost:3000';

        const paymentLink = await payos.paymentRequests.create({
          orderCode: numericOrderCode,
          amount: numAmount,
          description: fullOrderCode,
          cancelUrl: `${origin}/topup?status=cancelled`,
          returnUrl: `${origin}/topup?status=success`,
        });

        console.log("paymentLink: ", JSON.stringify(paymentLink))

        checkoutUrl = paymentLink.checkoutUrl;

        // PayOS paymentLink.qrCode trả về chuỗi văn bản EMVCo VietQR (ví dụ: "000201010212385...")
        // Cần tạo URL ảnh QR (api.qrserver.com hoặc img.vietqr.io) để thẻ <img> hiển thị đúng
        if (paymentLink.qrCode) {
          qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentLink.qrCode)}`;
        } else {
          qrCodeUrl = `https://img.vietqr.io/image/${paymentLink.bin}-${paymentLink.accountNumber}-${BANK_CONFIG.template}.png?amount=${numAmount}&addInfo=${encodeURIComponent(fullOrderCode)}&accountName=${encodeURIComponent(paymentLink.accountName)}`;
        }

        const bankNameFormatted = BANK_NAME_MAP[paymentLink.bin] || paymentLink.bin || BANK_CONFIG.bankId;

        bankInfo = {
          bankId: bankNameFormatted,
          accountNo: paymentLink.accountNumber || BANK_CONFIG.accountNo,
          accountName: paymentLink.accountName || BANK_CONFIG.accountName,
          transferContent: fullOrderCode,
        };
      } catch (payosErr: any) {
        console.error('[PayOS Create Payment Error]:', payosErr);
        // Fallback VietQR nếu gọi API PayOS gặp lỗi
        const addInfo = encodeURIComponent(fullOrderCode);
        const accountName = encodeURIComponent(BANK_CONFIG.accountName);
        qrCodeUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${numAmount}&addInfo=${addInfo}&accountName=${accountName}`;
      }
    } else {
      // Mặc định VietQR fallback khi chưa nhập chìa khóa PayOS trong .env
      const addInfo = encodeURIComponent(fullOrderCode);
      const accountName = encodeURIComponent(BANK_CONFIG.accountName);
      qrCodeUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${numAmount}&addInfo=${addInfo}&accountName=${accountName}`;
    }

    return NextResponse.json({
      success: true,
      orderCode: orderCodeStr,
      username: actualUsername,
      amount: numAmount,
      pointReceived,
      qrCodeUrl,
      rawQrCode: usePayOS ? (qrCodeUrl.includes('data=') ? decodeURIComponent(qrCodeUrl.split('data=')[1]) : '') : '',
      checkoutUrl,
      bankInfo,
    });
  } catch (error: any) {
    console.error('[Deposit Create API Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Không thể tạo đơn nạp tiền.' },
      { status: 500 }
    );
  }
}
