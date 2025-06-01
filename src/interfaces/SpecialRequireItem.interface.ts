import { PRICE_TYPE_ENUM } from '@/constants';

export interface ISpecialRequireItem {
  id: number;
  name: string;
  priceType?: PRICE_TYPE_ENUM;
  priceValue?: number;
  children?: ISpecialRequireItem[];
}
