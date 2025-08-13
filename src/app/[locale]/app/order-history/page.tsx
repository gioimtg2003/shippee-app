'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { statusOrderConfig } from '@/constants/order.constant';
import { Link } from '@/i18n/routing';
import { IOrder, ORDER_STATUS_ENUM } from '@/interfaces';
import { axiosInstant } from '@/lib/axiosClient';
import dayjs from 'dayjs';
import { Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};
export const convertStatusText = (status: ORDER_STATUS_ENUM) => {
  switch (status) {
    case ORDER_STATUS_ENUM.PENDING:
      return 'Đang chờ xử lý';
    case ORDER_STATUS_ENUM.PENDING_PICKUP:
      return 'Đang chờ lấy hàng';
    case ORDER_STATUS_ENUM.PICKED_UP:
      return 'Đã lấy hàng';
    case ORDER_STATUS_ENUM.COMPLETED:
      return 'Đã hoàn thành';
    case ORDER_STATUS_ENUM.RETURN:
      return 'Đang trả hàng';
    case ORDER_STATUS_ENUM.RETURNING:
      return 'Đang trả hàng';
    case ORDER_STATUS_ENUM.RETURNED:
      return 'Đã trả hàng';
    case ORDER_STATUS_ENUM.ARRIVED_AT_PICKUP:
      return 'Đã đến điểm lấy hàng';
    case ORDER_STATUS_ENUM.ARRIVED_AT_RECIPIENT:
      return 'Đã đến tay người nhận';
    case ORDER_STATUS_ENUM.CANCELED:
      return 'Đã hủy';
    case ORDER_STATUS_ENUM.RELEASE:
      return 'Đơn hàng được giải phóng';
  }
};

export const formatDate = (dateString: string) => {
  console.log(dayjs(dateString).format('DD/MM/YYYY HH:mm'));
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    document.title = 'Lịch sử đơn hàng - Shippee';
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstant.get<IOrder[]>('/customer-order/history');
        const normalizedOrders = res.data.map((order) => ({
          ...order,
          totalPrice: formatPrice(order?.totalPrice),
          createdAt: formatDate(order?.createdAt),
          statusText: convertStatusText(order?.currentStatus),
        }));

        console.log(normalizedOrders);
        setOrders(normalizedOrders as unknown as IOrder[]);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    })();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'active') {
      return (
        order.currentStatus === ORDER_STATUS_ENUM.PICKED_UP ||
        order.currentStatus === ORDER_STATUS_ENUM.PENDING_PICKUP ||
        order.currentStatus === ORDER_STATUS_ENUM.PENDING ||
        order.currentStatus === ORDER_STATUS_ENUM.ARRIVED_AT_PICKUP
      );
    } else {
      return (
        order.currentStatus === ORDER_STATUS_ENUM.CANCELED ||
        order.currentStatus === ORDER_STATUS_ENUM.COMPLETED
      );
    }
  });

  return (
    <>
      <div className='mx-auto min-h-screen w-full bg-white shadow-xl'>
        <header className='sticky top-0 z-10 bg-gradient-to-r from-primary to-primary text-white shadow-lg'>
          <div className='flex items-center gap-3 px-4 py-4'>
            <h1 className='text-lg font-semibold'>Đơn hàng của tôi</h1>
          </div>

          <div className='mx-4 mb-4 flex rounded-lg bg-white/10 p-1'>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Đang giao
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Lịch sử
            </button>
          </div>
        </header>

        <div className='space-y-4 px-4'>
          {filteredOrders.map((order) => {
            const StatusIcon =
              statusOrderConfig[
                order?.currentStatus as keyof typeof statusOrderConfig
              ]?.icon;
            const statusColor =
              statusOrderConfig[
                order?.currentStatus as keyof typeof statusOrderConfig
              ]?.color;
            const dotColor =
              statusOrderConfig[
                order?.currentStatus as keyof typeof statusOrderConfig
              ]?.dotColor;

            return (
              <Card
                key={order.id}
                className='overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg'
              >
                <Link href={`/app/track/${order?.id}`}>
                  <div className='p-5'>
                    <div className='mb-4 flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='mb-2 flex items-center gap-2'>
                          <div className='flex items-center gap-2'>
                            <div
                              className={`h-2 w-2 rounded-full ${dotColor}`}
                            ></div>
                            <span className='font-semibold text-gray-900'>
                              #{order.id}
                            </span>
                          </div>
                        </div>
                        <p className='flex items-center gap-1 text-sm text-gray-500'>
                          <Clock className='h-3 w-3' />
                          {order?.createdAt}
                        </p>
                      </div>
                      <Badge className={`${statusColor} px-3 py-1 font-medium`}>
                        <StatusIcon className='mr-1 h-3 w-3' />
                        {order?.statusText}
                      </Badge>
                    </div>

                    <div className='mb-4 space-y-3'>
                      <div className='rounded-lg bg-gray-50 p-3'>
                        <p className='text-sm text-gray-700'>{order?.note}</p>
                      </div>

                      <div className='flex items-start gap-2 text-sm'>
                        <MapPin className='mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400' />
                        <span className='leading-relaxed text-gray-600'>
                          {order.destination?.address}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between border-t border-gray-100 pt-3'>
                      <span className='text-sm font-medium text-gray-700'>
                        Tổng cộng:
                      </span>
                      <span className='text-lg font-bold text-primary'>
                        {order?.totalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className='flex flex-col items-center justify-center px-4 py-20'>
            <div className='mb-4 rounded-full bg-gray-100 p-6'>
              <Clock className='h-12 w-12 text-gray-400' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-gray-900'>
              {activeTab === 'active'
                ? 'Không có đơn hàng đang giao'
                : 'Chưa có lịch sử đơn hàng'}
            </h3>
            <p className='mb-8 text-center leading-relaxed text-gray-500'>
              {activeTab === 'active'
                ? 'Bạn không có đơn hàng nào đang được giao.'
                : 'Bạn chưa có đơn hàng nào hoàn thành.'}
              <br />
              Hãy tạo đơn hàng mới!
            </p>
            <button className='rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg transition-all'>
              Tạo đơn hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
}
