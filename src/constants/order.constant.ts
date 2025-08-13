// TODO improve import

import { ORDER_STATUS_ENUM } from '@/interfaces';
import { CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

export const statusOrderConfig = {
  [ORDER_STATUS_ENUM.COMPLETED]: {
    icon: CheckCircle,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
  [ORDER_STATUS_ENUM.PICKED_UP]: {
    icon: Truck,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  [ORDER_STATUS_ENUM.ARRIVED_AT_PICKUP]: {
    icon: Truck,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  [ORDER_STATUS_ENUM.ARRIVED_AT_RECIPIENT]: {
    icon: Truck,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  [ORDER_STATUS_ENUM.RETURNING]: {
    icon: Truck,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },

  [ORDER_STATUS_ENUM.PENDING_PICKUP]: {
    icon: Clock,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  [ORDER_STATUS_ENUM.PENDING]: {
    icon: Clock,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  [ORDER_STATUS_ENUM.CANCELED]: {
    icon: XCircle,
    color: 'bg-red-50 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
  },
  [ORDER_STATUS_ENUM.RETURNED]: {
    icon: XCircle,
    color: 'bg-red-50 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
  },
};
