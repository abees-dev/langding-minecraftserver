import { siteConfig } from '@/config/site';

/**
 * Hàm tự động format ngày từ ISO String (vd: 2026-08-25T23:59:59+07:00)
 * sang chuỗi hiển thị theo Múi giờ Việt Nam (Asia/Ho_Chi_Minh - GMT+7).
 */
export function formatPromoDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const formatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(d);
    const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

    const hh = getPart('hour');
    const mm = getPart('minute');
    const ss = getPart('second');
    const dd = getPart('day');
    const MM = getPart('month');
    const yyyy = getPart('year');

    return `${hh}:${mm}:${ss} - ${dd}/${MM}/${yyyy} (Giờ Việt Nam)`;
  } catch {
    return isoString;
  }
}

/**
 * Cấu hình Sự kiện Khuyến Mãi Nạp Point
 * Time Zone: Việt Nam Asia/Ho_Chi_Minh (UTC+7)
 */
export const PROMO_CONFIG = {
  eventName:
    process.env.PROMO_EVENT_NAME ||
    process.env.NEXT_PUBLIC_PROMO_EVENT_NAME ||
    'SỰ KIỆN KHUYẾN MÃI +100% POINT MỪNG OPEN SERVER',

  // Phần trăm khuyến mãi TRONG SỰ KIỆN (Mặc định 100%)
  promoBonusPercent: Number(
    process.env.PROMO_POINT_BONUS_PERCENT ||
    process.env.NEXT_PUBLIC_PROMO_POINT_BONUS_PERCENT ||
    '100'
  ),

  // Thời gian bắt đầu: 08:00 ngày 15/08/2026 GMT+7
  startDateIso:
    process.env.PROMO_START_DATE ||
    process.env.NEXT_PUBLIC_PROMO_START_DATE ||
    '2026-08-15T08:00:00+07:00',

  // Thời gian kết thúc: 23:59:59 ngày 25/08/2026 GMT+7
  endDateIso:
    process.env.PROMO_END_DATE ||
    process.env.NEXT_PUBLIC_PROMO_END_DATE ||
    '2026-08-25T23:59:59+07:00',

  timeZone:
    process.env.PROMO_TIMEZONE ||
    process.env.NEXT_PUBLIC_PROMO_TIMEZONE ||
    'Asia/Ho_Chi_Minh',
};

export type PromoStatus = 'UPCOMING' | 'ACTIVE' | 'ENDED';

/**
 * Trạng thái sự kiện theo thời gian thực (Giờ Việt Nam GMT+7):
 * - 'UPCOMING': Chưa tới thời gian bắt đầu
 * - 'ACTIVE': Đang diễn ra sự kiện
 * - 'ENDED': Đã kết thúc sự kiện
 */
export const getPromoStatus = (): PromoStatus => {
  const now = Date.now();
  const startTimestamp = Date.parse(PROMO_CONFIG.startDateIso);
  const endTimestamp = Date.parse(PROMO_CONFIG.endDateIso);

  let status: PromoStatus = 'ACTIVE';

  if (!isNaN(startTimestamp) && now < startTimestamp) {
    status = 'UPCOMING';
  } else if (!isNaN(endTimestamp) && now > endTimestamp) {
    status = 'ENDED';
  }

  // Debug log để kiểm tra trên môi trường Vercel / Dev Server
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.PROMO_DEBUG === 'true' ||
    process.env.NEXT_PUBLIC_PROMO_DEBUG === 'true'
  ) {
    console.log(
      `[PROMO DEBUG] now: ${new Date(now).toISOString()} (${now}) | start: ${PROMO_CONFIG.startDateIso} (${startTimestamp}) | end: ${PROMO_CONFIG.endDateIso} (${endTimestamp}) | status: ${status}`
    );
  }

  return status;
};

/**
 * Kiểm tra xem sự kiện khuyến mãi nạp có đang diễn ra hay không (Chuẩn GMT+7)
 */
export const isPromoActive = (): boolean => {
  return getPromoStatus() === 'ACTIVE';
};

/**
 * Lấy phần trăm thưởng mặc định khi KHÔNG có sự kiện (từ env POINT_BONUS_PERCENT, mặc định 20%)
 */
export const getDefaultBonusPercent = (): number => {
  const envStr =
    process.env.POINT_BONUS_PERCENT ||
    process.env.NEXT_PUBLIC_POINT_BONUS_PERCENT ||
    '20';
  const percent = Number(envStr);
  return isNaN(percent) || percent < 0 ? 20 : percent;
};

/**
 * Lấy phần trăm khuyến mãi / thưởng thêm nạp tiền hiện tại:
 * - Trong thời gian sự kiện (từ startDateIso đến endDateIso): Tự động trả về % Thưởng Sự Kiện (100%)
 * - Trước ngày hoặc sau khi HẾT sự kiện: Tự động lùi về % Thưởng Mặc Định (20%)!
 */
export const getPointBonusPercent = (): number => {
  if (isPromoActive()) {
    return PROMO_CONFIG.promoBonusPercent;
  }
  return getDefaultBonusPercent();
};

/**
 * Lấy tỷ lệ quy đổi gốc từ VNĐ sang Point từ biến môi trường (Mặc định 0.001: 10,000 VNĐ = 10 Point)
 */
export const getPointConversionRate = (): number => {
  const rateStr =
    process.env.POINT_CONVERSION_RATE ||
    process.env.NEXT_PUBLIC_POINT_CONVERSION_RATE ||
    '0.001';
  const rate = Number(rateStr);
  return isNaN(rate) || rate <= 0 ? 0.001 : rate;
};

/**
 * Lấy số tiền nạp tối thiểu từ biến môi trường (Mặc định 10,000 VNĐ)
 */
export const getMinDepositAmount = (): number => {
  const minStr =
    process.env.MIN_DEPOSIT_AMOUNT ||
    process.env.NEXT_PUBLIC_MIN_DEPOSIT_AMOUNT ||
    '10000';
  const minVal = Number(minStr);
  return isNaN(minVal) || minVal <= 0 ? 10000 : minVal;
};

/**
 * Tỷ lệ quy đổi điểm cho nạp thẻ cào (thấp hơn 20% so với nạp Bank)
 */
export const CARD_CONVERSION_FACTOR = 0.8;

/**
 * Hàm chung tính toán tổng số Point thực nhận từ số tiền VNĐ nạp vào (đã tính % Khuyến mãi và phương thức nạp)
 * @param amountVnd Số tiền VNĐ người dùng nạp
 * @param paymentMethod Phương thức nạp ('BANK' | 'CARD')
 * @returns Số Point thực nhận (làm tròn số nguyên)
 */
export function calculatePointReceived(
  amountVnd: number,
  paymentMethod: 'BANK' | 'CARD' = 'BANK'
): number {
  const validAmount = Number(amountVnd) || 0;
  if (validAmount <= 0) return 0;
  const rate = getPointConversionRate();
  const basePoint = validAmount * rate;
  const bonusPercent = getPointBonusPercent();
  const totalBankPoint = basePoint * (1 + bonusPercent / 100);

  if (paymentMethod === 'CARD') {
    return Math.floor(totalBankPoint * CARD_CONVERSION_FACTOR);
  }

  return Math.floor(totalBankPoint);
}

/**
 * Hàm chi tiết trả về Point gốc, Point thưởng khuyến mãi và Tổng Point theo phương thức nạp
 */
export function calculatePointBreakdown(
  amountVnd: number,
  paymentMethod: 'BANK' | 'CARD' = 'BANK'
) {
  const validAmount = Number(amountVnd) || 0;
  if (validAmount <= 0) {
    return {
      basePoint: 0,
      bonusPoint: 0,
      totalPoint: 0,
      bonusPercent: 0,
      cardDiscountPercent: paymentMethod === 'CARD' ? 20 : 0,
      bankPoint: 0,
    };
  }
  const rate = getPointConversionRate();
  const basePoint = Math.floor(validAmount * rate);
  const bonusPercent = getPointBonusPercent();
  const bonusPoint = Math.floor(basePoint * (bonusPercent / 100));
  const bankPoint = basePoint + bonusPoint;

  const totalPoint =
    paymentMethod === 'CARD'
      ? Math.floor(bankPoint * CARD_CONVERSION_FACTOR)
      : bankPoint;

  return {
    basePoint,
    bonusPoint,
    bankPoint,
    totalPoint,
    bonusPercent,
    cardDiscountPercent: paymentMethod === 'CARD' ? 20 : 0,
  };
}

/**
 * Trả về thông tin chi tiết sự kiện khuyến mãi cho UI hiển thị (Tự động format ngày từ ISO String)
 */
export function getPromoEventDetails() {
  const active = isPromoActive();
  const bonusPercent = getPointBonusPercent();
  const status = getPromoStatus();

  return {
    active,
    status,
    bonusPercent,
    title: PROMO_CONFIG.eventName,
    startDateFormatted: formatPromoDate(PROMO_CONFIG.startDateIso),
    endDateFormatted: formatPromoDate(PROMO_CONFIG.endDateIso),
    timeZone: PROMO_CONFIG.timeZone,
  };
}
