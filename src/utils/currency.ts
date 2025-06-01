import { PRICE_TYPE_ENUM } from '@/constants';

export const handleRenderPriceValue = (
  value: number,
  priceType?: PRICE_TYPE_ENUM
) => {
  if (priceType === PRICE_TYPE_ENUM.FIXED) {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
  if (priceType === PRICE_TYPE_ENUM.PERCENT) {
    return `+${value}%`;
  }
  return value;
};
