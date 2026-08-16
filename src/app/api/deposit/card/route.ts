import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { calculatePointReceived } from '@/lib/point';
import { findUserByUsername } from '@/services/userService';
import {
  createDepositRecord,
  completeDepositTransaction,
  updateDepositTransactionAmountAndPoint,
  updateDepositTransactionStatus,
} from '@/services/depositService';
import { TelcoType } from '@/types/deposit';

const ALLOWED_TELCOS: TelcoType[] = [
  'VIETTEL',
  'MOBIFONE',
  'VINAPHONE',
  'ZING',
  'GARENA',
  'APPOTA',
  'VCOIN',
  'SCOIN',
  'GATE',
];
const ALLOWED_AMOUNTS = [
  5000, 10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000,
  2000000, 5000000,
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, telco, amount, code, serial } = body;

    const trimmedUsername = username?.trim();
    const uppercaseTelco = String(telco || '')
      .trim()
      .toUpperCase() as TelcoType;
    const numAmount = Number(amount);
    const trimmedCode = String(code || '').trim();
    const trimmedSerial = String(serial || '').trim();

    // 1. Validations
    if (!trimmedUsername) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập tên nhân vật Minecraft!' },
        { status: 400 },
      );
    }

    if (!ALLOWED_TELCOS.includes(uppercaseTelco)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nhà mạng không hợp lệ. Vui lòng chọn nhà mạng được hỗ trợ!',
        },
        { status: 400 },
      );
    }

    if (!numAmount || !ALLOWED_AMOUNTS.includes(numAmount)) {
      return NextResponse.json(
        { success: false, message: 'Mệnh giá thẻ không hợp lệ!' },
        { status: 400 },
      );
    }

    if (!trimmedCode) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập Mã thẻ cào!' },
        { status: 400 },
      );
    }

    if (!trimmedSerial) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập số Seri thẻ!' },
        { status: 400 },
      );
    }

    // 2. Check user existence in DB
    let actualUsername = trimmedUsername;
    try {
      const user = await findUserByUsername(trimmedUsername);
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: `Tài khoản "${trimmedUsername}" không tồn tại trong hệ thống! Vui lòng tham gia server game để khởi tạo nhân vật trước khi nạp thẻ.`,
          },
          { status: 400 },
        );
      }
      actualUsername = user.username;
    } catch (dbErr: any) {
      console.error('[DB User Check Error]:', dbErr?.message);
      return NextResponse.json(
        {
          success: false,
          message:
            'Không thể kết nối cơ sở dữ liệu để xác minh nhân vật. Vui lòng thử lại sau!',
        },
        { status: 500 },
      );
    }

    // 3. Calculate points (-20% compared to bank)
    const pointReceived = calculatePointReceived(numAmount, 'CARD');

    // 4. Generate unique request_id / orderCode
    const timeSlice = Date.now().toString(36).toUpperCase();
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const requestId = `CARD${timeSlice}${randomHex}`;

    // 5. Create transaction record in DB
    const description = `Nạp thẻ ${uppercaseTelco} ${numAmount.toLocaleString('vi-VN')}đ (Seri: ${trimmedSerial})`;
    await createDepositRecord(
      requestId,
      actualUsername,
      numAmount,
      pointReceived,
      'CARD',
      description,
    );

    // 6. Config for Nappay.vn Charging v2 API
    const partnerId = process.env.CARD_PARTNER_ID || '';
    const partnerKey = process.env.CARD_PARTNER_KEY || '';
    const partnerUrl =
      process.env.CARD_PARTNER_URL || 'https://nappay.vn/chargingws/v2';

    // Nappay Charging v2 Signature algorithm:
    // md5(partner_key . code . command . partner_id . request_id . serial . telco)
    const sign = crypto
      .createHash('md5')
      .update(
        `${partnerKey}${trimmedCode}charging${partnerId}${requestId}${trimmedSerial}${uppercaseTelco}`,
      )
      .digest('hex');

    const formData = new URLSearchParams();
    formData.append('command', 'charging');
    formData.append('partner_id', partnerId);
    formData.append('request_id', requestId);
    formData.append('telco', uppercaseTelco);
    formData.append('amount', String(numAmount));
    formData.append('serial', trimmedSerial);
    formData.append('code', trimmedCode);
    formData.append('sign', sign);

    console.log(
      `[Nappay Charging Request]: ID=${requestId}, Telco=${uppercaseTelco}, Amount=${numAmount}, URL=${partnerUrl}`,
    );

    // Call Partner API
    let partnerResData: any = null;
    try {
      const apiRes = await fetch(partnerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const rawText = await apiRes.text();
      console.log(`[Nappay Charging Response HTTP ${apiRes.status}]:`, rawText);

      try {
        partnerResData = JSON.parse(rawText);
      } catch {
        console.error('[Nappay Raw Response Non-JSON]:', rawText);
      }
    } catch (apiErr: any) {
      console.error(
        '[Nappay Charging API Request Exception]:',
        apiErr?.message,
      );
    }

    // If API failed or response missing (e.g. pending callback)
    if (!partnerResData) {
      console.warn(
        '[Nappay API Warning]: Response missing or raw format, keeping transaction PENDING for webhook.',
      );
      return NextResponse.json({
        success: true,
        status: 'PENDING',
        orderCode: requestId,
        username: actualUsername,
        amount: numAmount,
        pointReceived,
        telco: uppercaseTelco,
        message: 'Thẻ đã được gửi lên hệ thống và đang chờ đối tác duyệt.',
      });
    }

    const partnerStatus = Number(partnerResData.status);
    const partnerMsg = partnerResData.message || 'Thẻ đã gửi lên hệ thống';

    // Status 1: VALID_CARD (Thẻ đúng, giao dịch thành công)
    if (partnerStatus === 1) {
      await completeDepositTransaction(requestId);
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        orderCode: requestId,
        username: actualUsername,
        amount: numAmount,
        pointReceived,
        telco: uppercaseTelco,
        message:
          'Nạp thẻ thành công! Point đã được cộng vào tài khoản của bạn.',
      });
    }

    // Status 2: CARD_WRONG_VALUE (Thẻ đúng nhưng sai mệnh giá khai báo)
    if (partnerStatus === 2) {
      const actualCardValue = Number(
        partnerResData.value ||
          partnerResData.card_value ||
          partnerResData.declared_value ||
          numAmount,
      );
      const actualPoint = calculatePointReceived(actualCardValue, 'CARD');
      await updateDepositTransactionAmountAndPoint(
        requestId,
        actualCardValue,
        actualPoint,
      );
      await completeDepositTransaction(requestId);
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        orderCode: requestId,
        username: actualUsername,
        amount: actualCardValue,
        pointReceived: actualPoint,
        telco: uppercaseTelco,
        message: `Nạp thẻ thành công! Mệnh giá thực của thẻ là ${actualCardValue.toLocaleString('vi-VN')} VNĐ. Đã cộng +${actualPoint} Point`,
      });
    }

    // Status 99: PENDING (Thẻ đang chờ xử lý)
    if (partnerStatus === 99) {
      return NextResponse.json({
        success: true,
        status: 'PENDING',
        orderCode: requestId,
        username: actualUsername,
        amount: numAmount,
        pointReceived,
        telco: uppercaseTelco,
        message:
          'Thẻ đang chờ hệ thống gạch thẻ xử lý (thường mất từ 30s đến 3 phút).',
      });
    }

    // Status 3, 4, 100, 101, 102, 103, 104: INVALID_CARD / Request error
    await updateDepositTransactionStatus(requestId, 'FAILED');
    return NextResponse.json(
      {
        success: false,
        status: 'FAILED',
        orderCode: requestId,
        message: `Gửi thẻ thất bại (${partnerStatus}): ${partnerMsg}`,
      },
      { status: 400 },
    );
  } catch (error: any) {
    console.error('[Card Deposit API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Có lỗi xảy ra khi nạp thẻ.',
      },
      { status: 500 },
    );
  }
}
