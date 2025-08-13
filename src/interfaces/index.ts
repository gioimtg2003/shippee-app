export * from './reactQuery';
export * from './SpecialRequireItem.interface';
export * from './User.interface';

export type LocationType = {
  coordinates: [number, number];
  address: string;
};

export enum ORDER_STATUS_ENUM {
  PENDING = 'PENDING',
  PENDING_PICKUP = 'PENDING_PICKUP',
  PICKED_UP = 'PICKED_UP',
  COMPLETED = 'COMPLETED',
  RETURN = 'RETURN',
  RETURNING = 'RETURNING',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
  RELEASE = 'RELEASE',
  ARRIVED_AT_PICKUP = 'ARRIVED_AT_PICKUP',
  ARRIVED_AT_RECIPIENT = 'ARRIVED_AT_RECIPIENT',
}
export interface IOrder {
  id: string;
  cusName: string;
  pickup: LocationType;
  cusPhone: string;
  statusText: string;
  recipientName: string;
  destination: LocationType;
  distanceTotal: number;
  recipientPhone: string;
  isDeliveryCharge: boolean;
  priceItems: string[];
  totalPrice: number;
  currentStatus: ORDER_STATUS_ENUM;
  driverId: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  statusOrderHistory: {
    status: ORDER_STATUS_ENUM;
    createAt: string;
  }[];
}
