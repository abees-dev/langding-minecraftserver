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
 * Lấy phần trăm khuyến mãi / thưởng thêm nạp tiền (Mặc định 20%)
 */
export const getPointBonusPercent = (): number => {
  const percentStr =
    process.env.POINT_BONUS_PERCENT ||
    process.env.NEXT_PUBLIC_POINT_BONUS_PERCENT ||
    '20';
  const percent = Number(percentStr);
  return isNaN(percent) || percent < 0 ? 0 : percent;
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
 * Hàm chung tính toán tổng số Point thực nhận từ số tiền VNĐ nạp vào (đã tính % Khuyến mãi)
 * @param amountVnd Số tiền VNĐ người dùng nạp
 * @returns Số Point thực nhận (làm tròn số nguyên)
 */
export function calculatePointReceived(amountVnd: number): number {
  const validAmount = Number(amountVnd) || 0;
  if (validAmount <= 0) return 0;
  const rate = getPointConversionRate();
  const basePoint = validAmount * rate;
  const bonusPercent = getPointBonusPercent();
  const totalPoint = basePoint * (1 + bonusPercent / 100);
  return Math.floor(totalPoint);
}

/**
 * Hàm chi tiết trả về Point gốc, Point thưởng khuyến mãi và Tổng Point
 */
export function calculatePointBreakdown(amountVnd: number) {
  const validAmount = Number(amountVnd) || 0;
  if (validAmount <= 0) {
    return { basePoint: 0, bonusPoint: 0, totalPoint: 0, bonusPercent: 0 };
  }
  const rate = getPointConversionRate();
  const basePoint = Math.floor(validAmount * rate);
  const bonusPercent = getPointBonusPercent();
  const bonusPoint = Math.floor(basePoint * (bonusPercent / 100));
  const totalPoint = basePoint + bonusPoint;

  return {
    basePoint,
    bonusPoint,
    totalPoint,
    bonusPercent,
  };
}
