'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle,
  ChevronLeft,
  ChevronUp,
  Clock,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Mock order data (same as order history)
const mockOrders = [
  {
    id: 'DH001234',
    date: '2024-01-15',
    status: 'delivered',
    statusText: 'Đã giao hàng',
    total: 30289000,
    deliveryAddress: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
    description: 'Đơn hàng giao hàng tận nơi',
    customerName: 'Nguyễn Văn A',
    customerPhone: '+84 901 234 567',
    deliveryTime: '14:30, 15/01/2024',
    paymentMethod: 'Thanh toán khi nhận hàng',
    note: 'Giao hàng giờ hành chính',
  },
  {
    id: 'DH001235',
    date: '2024-01-18',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    total: 27990000,
    deliveryAddress: '456 Lê Văn Việt, Q.9, TP.HCM',
    description: 'Đơn hàng express',
    customerName: 'Trần Thị B',
    customerPhone: '+84 902 345 678',
    estimatedTime: '16:00 - 18:00',
    driverName: 'Lê Văn C',
    driverPhone: '+84 903 456 789',
    currentLocation: 'Đang trên đường giao hàng',
  },
  {
    id: 'DH001236',
    date: '2024-01-20',
    status: 'processing',
    statusText: 'Đang xử lý',
    total: 12470000,
    deliveryAddress: '789 Võ Văn Tần, Q.3, TP.HCM',
    description: 'Đơn hàng thường',
    customerName: 'Phạm Văn D',
    customerPhone: '+84 904 567 890',
    estimatedTime: 'Dự kiến giao trong ngày',
    currentLocation: 'Đang chuẩn bị hàng',
  },
  {
    id: 'DH001237',
    date: '2024-01-12',
    status: 'cancelled',
    statusText: 'Đã hủy',
    total: 14990000,
    deliveryAddress: '321 Hai Bà Trưng, Q.1, TP.HCM',
    description: 'Đơn hàng đã hủy',
    customerName: 'Hoàng Thị E',
    customerPhone: '+84 905 678 901',
    cancelReason: 'Khách hàng hủy đơn',
    cancelTime: '10:30, 12/01/2024',
  },
  {
    id: 'DH001238',
    date: '2024-01-22',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    total: 18500000,
    deliveryAddress: '555 Trần Hưng Đạo, Q.5, TP.HCM',
    description: 'Đơn hàng giao nhanh',
    customerName: 'Vũ Văn F',
    customerPhone: '+84 906 789 012',
    estimatedTime: '15:30 - 17:30',
    driverName: 'Nguyễn Văn G',
    driverPhone: '+84 907 890 123',
    currentLocation: 'Cách địa chỉ giao hàng 2km',
  },
  {
    id: 'DH001239',
    date: '2024-01-10',
    status: 'delivered',
    statusText: 'Đã giao hàng',
    total: 22300000,
    deliveryAddress: '888 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
    description: 'Đơn hàng thành công',
    customerName: 'Đặng Thị H',
    customerPhone: '+84 908 901 234',
    deliveryTime: '09:15, 10/01/2024',
    paymentMethod: 'Chuyển khoản',
    receivedBy: 'Chính chủ',
  },
];

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
  shipping: {
    icon: Truck,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  processing: {
    icon: Clock,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  cancelled: {
    icon: XCircle,
    color: 'bg-red-50 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const orderId = params.id as string;

  const order = mockOrders.find((o) => o.id === orderId);

  useEffect(() => {
    if (
      order &&
      (order.status === 'shipping' || order.status === 'processing') &&
      mapRef.current
    ) {
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-lg relative overflow-hidden">
          <!-- Map grid background -->
          <div class="absolute inset-0 opacity-10">
            <div class="w-full h-full" style="background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
          </div>
          
          <!-- Route line -->
          <svg class="absolute inset-0 w-full h-full">
            <path d="M 50 200 Q 150 100 250 150 T 350 120" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="5,5" class="animate-pulse"/>
          </svg>
          
          <!-- Location markers -->
          <div class="absolute top-12 left-12 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div class="absolute bottom-16 right-16 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          <!-- Moving truck icon -->
          <div class="absolute top-20 left-32 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
            </svg>
          </div>
          
          <!-- Pulse animation around truck -->
          <div class="absolute top-16 left-28 w-16 h-16 border-2 border-blue-300 rounded-full animate-ping opacity-30"></div>
        </div>
      `;
    }
  }, [order]);

  if (!order) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
        <div className='mx-auto min-h-screen w-full max-w-md bg-white shadow-xl'>
          <div className='flex h-screen items-center justify-center'>
            <div className='text-center'>
              <h2 className='mb-2 text-xl font-semibold text-gray-900'>
                Không tìm thấy đơn hàng
              </h2>
              <Button onClick={() => router.back()} variant='outline'>
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const StatusIcon =
    statusConfig[order.status as keyof typeof statusConfig].icon;
  const statusColor =
    statusConfig[order.status as keyof typeof statusConfig].color;
  const dotColor =
    statusConfig[order.status as keyof typeof statusConfig].dotColor;

  const isActiveOrder =
    order.status === 'shipping' || order.status === 'processing';

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='relative mx-auto min-h-screen w-full max-w-md bg-white shadow-xl'>
        <header className='sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'>
          <div className='flex items-center gap-3 px-4 py-4'>
            <button
              onClick={() => router.back()}
              className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/20'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <h1 className='text-lg font-semibold'>Chi tiết đơn hàng</h1>
          </div>
        </header>

        {isActiveOrder ? (
          <div className='relative h-screen'>
            {/* Full screen map */}
            <div ref={mapRef} className='absolute inset-0 top-16'></div>

            {/* Bottom popup sheet */}
            <div
              className={`absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ${
                isBottomSheetExpanded
                  ? 'translate-y-0'
                  : 'translate-y-[calc(100%-120px)]'
              }`}
            >
              {/* Handle bar */}
              <div
                className='flex cursor-pointer justify-center py-3'
                onClick={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
              >
                <div className='h-1 w-12 rounded-full bg-gray-300'></div>
              </div>

              {/* Popup content */}
              <div className='px-4 pb-6'>
                {/* Quick status */}
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`h-4 w-4 rounded-full ${dotColor}`}></div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>
                        #{order.id}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {order.statusText}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setIsBottomSheetExpanded(!isBottomSheetExpanded)
                    }
                    className='rounded-full p-2 transition-colors hover:bg-gray-100'
                  >
                    <ChevronUp
                      className={`h-4 w-4 text-gray-500 transition-transform ${isBottomSheetExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Expanded content */}
                {isBottomSheetExpanded && (
                  <div className='space-y-4'>
                    {/* Driver info */}
                    {order.driverName && (
                      <div className='rounded-lg bg-blue-50 p-4'>
                        <div className='mb-2 flex items-center justify-between'>
                          <h4 className='font-medium text-blue-900'>
                            Thông tin tài xế
                          </h4>
                          <Button
                            size='sm'
                            className='bg-blue-600 hover:bg-blue-700'
                          >
                            <Phone className='mr-1 h-3 w-3' />
                            Gọi
                          </Button>
                        </div>
                        <p className='mb-1 text-sm text-blue-700'>
                          Tài xế: {order.driverName}
                        </p>
                        <p className='text-sm text-blue-600'>
                          {order.driverPhone}
                        </p>
                      </div>
                    )}

                    {/* Delivery info */}
                    <div className='space-y-3'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>
                          Thời gian dự kiến:
                        </span>
                        <span className='font-medium'>
                          {order.estimatedTime}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>
                          Trạng thái hiện tại:
                        </span>
                        <span className='font-medium'>
                          {order.currentLocation}
                        </span>
                      </div>
                      <div className='flex items-start justify-between'>
                        <span className='text-gray-600'>Địa chỉ giao:</span>
                        <span className='ml-4 flex-1 text-right font-medium'>
                          {order.deliveryAddress}
                        </span>
                      </div>
                    </div>

                    {/* Customer info */}
                    <div className='border-t pt-4'>
                      <h4 className='mb-3 font-medium text-gray-900'>
                        Thông tin khách hàng
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Tên:</span>
                          <span className='font-medium'>
                            {order.customerName}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>SĐT:</span>
                          <span className='font-medium'>
                            {order.customerPhone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className='border-t pt-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-semibold text-gray-900'>
                          Tổng cộng:
                        </span>
                        <span className='text-xl font-bold text-orange-600'>
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className='flex gap-3 pt-2'>
                      <Button
                        variant='outline'
                        className='flex-1 bg-transparent'
                      >
                        Liên hệ hỗ trợ
                      </Button>
                      <Button className='flex-1 bg-red-600 hover:bg-red-700'>
                        Hủy đơn hàng
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='space-y-6 px-4 py-6'>
            {/* Order Status Card */}
            <Card className='overflow-hidden border-0 shadow-md'>
              <div className='p-5'>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className={`h-3 w-3 rounded-full ${dotColor}`}></div>
                    <span className='text-lg font-bold text-gray-900'>
                      #{order.id}
                    </span>
                  </div>
                  <Badge className={`${statusColor} px-3 py-1 font-medium`}>
                    <StatusIcon className='mr-1 h-3 w-3' />
                    {order.statusText}
                  </Badge>
                </div>
                <p className='mb-3 text-sm text-gray-500'>
                  {formatDate(order.date)}
                </p>
                <div className='rounded-lg bg-gray-50 p-3'>
                  <p className='text-sm text-gray-700'>{order.description}</p>
                </div>
              </div>
            </Card>

            {/* Customer Information */}
            <Card className='overflow-hidden border-0 shadow-md'>
              <div className='p-5'>
                <h3 className='mb-4 flex items-center gap-2 font-semibold text-gray-900'>
                  <User className='h-4 w-4 text-orange-500' />
                  Thông tin khách hàng
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tên khách hàng:</span>
                    <span className='font-medium'>{order.customerName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Số điện thoại:</span>
                    <span className='font-medium'>{order.customerPhone}</span>
                  </div>
                  <div className='flex items-start justify-between'>
                    <span className='text-gray-600'>Địa chỉ giao hàng:</span>
                    <span className='ml-4 flex-1 text-right font-medium'>
                      {order.deliveryAddress}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Details for Completed Orders */}
            <Card className='overflow-hidden border-0 shadow-md'>
              <div className='p-5'>
                <h3 className='mb-4 flex items-center gap-2 font-semibold text-gray-900'>
                  <Package className='h-4 w-4 text-orange-500' />
                  Chi tiết đơn hàng
                </h3>
                <div className='space-y-3'>
                  {order.status === 'delivered' && (
                    <>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Thời gian giao:</span>
                        <span className='font-medium'>
                          {order.deliveryTime}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Người nhận:</span>
                        <span className='font-medium'>{order.receivedBy}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Thanh toán:</span>
                        <span className='font-medium'>
                          {order.paymentMethod}
                        </span>
                      </div>
                    </>
                  )}
                  {order.status === 'cancelled' && (
                    <>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Lý do hủy:</span>
                        <span className='font-medium'>
                          {order.cancelReason}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Thời gian hủy:</span>
                        <span className='font-medium'>{order.cancelTime}</span>
                      </div>
                    </>
                  )}
                  {order.note && (
                    <div className='rounded-lg bg-gray-50 p-3'>
                      <p className='text-sm text-gray-700'>
                        <span className='font-medium'>Ghi chú:</span>{' '}
                        {order.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Total Amount */}
            <Card className='overflow-hidden border-0 shadow-md'>
              <div className='p-5'>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-semibold text-gray-900'>
                    Tổng cộng:
                  </span>
                  <span className='text-2xl font-bold text-primary'>
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
