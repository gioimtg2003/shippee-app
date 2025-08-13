'use client';

import { Input } from '@/components/input';
import PlaceOrderForm from '@/components/mobile/PlaceOrder';
import ListTransportType from '@/components/mobile/TransportType';
import { Button } from '@/components/ui/button';
import { DrawerContent, Drawer as DrawerShadcn } from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDisclosure } from '@/hooks';
import { axiosInstant } from '@/lib/axiosClient';
import { cn } from '@/lib/utils';
import { OrderSchema, TOrderFormSchema } from '@/zod/order.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Drawer } from 'antd';
import {
  CalendarClock,
  ChevronDown,
  ChevronRight,
  FileText,
  MessageSquare,
  ShieldCheck,
  Ticket,
  Wallet,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatPrice } from './order-history/page';

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className='space-y-3'>
      <div className='flex items-center gap-2'>
        {icon}
        <h2 className='text-[15px] font-semibold'>{title}</h2>
      </div>
      <div className='space-y-3'>{children}</div>
    </section>
  );
}
function FieldShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='rounded-2xl border bg-white px-3 py-3'>{children}</div>
  );
}

export default function MainPage() {
  const t = useTranslations('common');
  const methods = useForm<TOrderFormSchema>({
    resolver: zodResolver(OrderSchema(t)),
    mode: 'onSubmit',
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const checkoutClosure = useDisclosure();

  const from = methods.watch('pickup');
  const to = methods.watch('destination');
  const isCheckout =
    !!from &&
    !!to &&
    !!methods.watch('idTransportType') &&
    !!methods.watch('cusName') &&
    !!methods.watch('recipientName') &&
    !isOpenMap;
  const setOpenMap = (open: boolean) => {
    setIsOpenMap(open);
  };

  const submit = async (data: TOrderFormSchema) => {
    const pickCoordinates = data.pickup.coordinates;
    const destCoordinates = data.destination.coordinates;
    const handleData = {
      ...data,
      pickup: {
        ...data.pickup,
        lng: pickCoordinates[0],
        lat: pickCoordinates[1],
      },
      destination: {
        ...data.destination,
        lng: destCoordinates[0],
        lat: destCoordinates[1],
      },
    };
    setLoadingCreate(true);
    try {
      await axiosInstant.post('/customer-order', handleData);
      methods.reset();
      checkoutClosure.close();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCreate(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (isCheckout) {
        try {
          const pickCoordinates = methods.getValues().pickup.coordinates;
          const destCoordinates = methods.getValues().destination.coordinates;
          const handleData = {
            ...methods.getValues(),
            pickup: {
              ...methods.getValues().pickup,
              lng: pickCoordinates[0],
              lat: pickCoordinates[1],
            },
            destination: {
              ...methods.getValues().destination,
              lng: destCoordinates[0],
              lat: destCoordinates[1],
            },
          };
          const calculate = await axiosInstant.post('/customer-order/pricing', {
            ...handleData,
          });
          setTotalPrice(Math.floor(calculate.data.totalPrice));
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [isCheckout]);
  return (
    <>
      <DrawerShadcn open={isCheckout && !checkoutClosure.isOpen}>
        <DrawerContent className='z-[9999]'>
          <div className='flex items-center justify-between px-4 py-3 pt-3'>
            <div className='flex flex-col'>
              <span className='text-sm text-gray-600'>Tổng cộng</span>
              <div className='flex items-center gap-1'>
                <span className='text-[20px] font-semibold text-gray-800'>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Button
                className='h-11 rounded-xl bg-primary px-6 text-white hover:bg-primary'
                onClick={checkoutClosure.open}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </DrawerContent>
      </DrawerShadcn>
      <Drawer
        open={checkoutClosure.isOpen}
        destroyOnClose
        width={'100%'}
        mask={false}
        placement='right'
        styles={{
          body: { padding: 16 },
          header: { display: 'none' },
        }}
      >
        <div className='space-y-5'>
          <Section
            title='Ngày giao hàng & Thông tin liên lạc'
            icon={<CalendarClock className='h-5 w-5 text-primary' />}
          >
            <FieldShell>
              <div className='flex items-center gap-3'>
                <CalendarClock className='h-4 w-4 text-gray-500' />
                <div className='w-full'>
                  <span className='sr-only' id='time'>
                    Thời gian
                  </span>
                  <Select defaultValue='now'>
                    <SelectTrigger
                      id='time'
                      className='h-10 w-full justify-between border-0 px-0 focus:ring-0'
                    >
                      <SelectValue placeholder='Bây giờ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='now'>Bây giờ</SelectItem>
                      <SelectItem value='30m'>Trong 30 phút</SelectItem>
                      <SelectItem value='1h'>Trong 1 giờ</SelectItem>
                      <SelectItem value='later'>Chọn thời gian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FieldShell>
          </Section>
          <Section
            title='Ngày giao hàng & Thông tin liên lạc'
            icon={<FileText className='h-5 w-5 text-primary' />}
          >
            <button
              type='button'
              className='flex w-full items-center justify-between rounded-2xl border bg-white px-3 py-3 text-left'
            >
              <div>
                <p className='text-[15px] text-gray-700'>
                  Thêm chi tiết hàng hóa để kết nối với tài xế phù hợp
                </p>
                <p className='text-xs text-gray-500'>
                  Chọn Loại hàng vận chuyển, số lượng gói hàng, v.v.
                </p>
              </div>
              <div className='flex items-center gap-1 text-primary'>
                <span className='text-sm font-medium'>Thêm</span>
                <ChevronRight className='h-4 w-4' />
              </div>
            </button>
          </Section>

          <Section
            title='Ghi chú cho tài xế'
            icon={<MessageSquare className='h-5 w-5 text-primary' />}
          >
            <Textarea
              placeholder='Ghi chú cho tài xế'
              onChange={(e) => {
                methods.setValue('note', e.target.value);
              }}
            />
          </Section>

          <Section
            title='Phương thức thanh toán'
            icon={<Wallet className='h-5 w-5 text-primary' />}
          >
            <div className='rounded-2xl border'>
              <button
                type='button'
                className='flex w-full items-center justify-between rounded-2xl px-3 py-3'
                onClick={() => {}}
                aria-label='Chọn phương thức thanh toán'
              >
                <div className='flex items-center gap-2'>
                  <ShieldCheck className='h-4 w-4 text-gray-500' />
                  <div className='text-left'>
                    <p className='text-[15px] text-gray-800'>
                      Thanh toán trực tuyến
                    </p>
                    <p className='text-xs text-gray-500'>Tiền mặt</p>
                  </div>
                </div>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </button>
            </div>
          </Section>

          <div className='space-y-2'>
            <p className='text-xs font-medium text-gray-600'>COUPON</p>
            <div className='flex items-stretch gap-2'>
              <div className='flex flex-1 items-center gap-2 rounded-2xl border bg-white px-3'>
                <Ticket className='h-4 w-4 text-gray-500' />
                <Input
                  placeholder='Thêm coupon'
                  className='h-10 border-0 p-0 focus-visible:ring-0'
                />
              </div>
              <Button className='h-10 rounded-xl bg-primary text-white hover:bg-primary'>
                Áp dụng
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'fixed inset-x-0 bottom-0 z-50 mx-auto w-full border-t bg-white',
              'pb-[calc(env(safe-area-inset-bottom)+12px)]'
            )}
          >
            <div className='flex items-center justify-between px-4 pt-3'>
              <div className='flex flex-col'>
                <span className='text-sm text-gray-600'>Tổng cộng</span>
                <div className='flex items-center gap-1'>
                  <span className='text-[20px] font-semibold text-gray-800'>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Button
                  onClick={checkoutClosure.close}
                  variant='outline'
                  className='h-11 rounded-xl border-gray-300 bg-white px-5 text-gray-800 hover:bg-gray-50'
                >
                  Quay lại
                </Button>
                <Button
                  className='h-11 rounded-xl bg-primary px-6 text-white hover:bg-primary'
                  onClick={methods.handleSubmit(submit)}
                  loading={loadingCreate}
                >
                  Tạo đơn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <section className='px-4'>
        <form>
          <PlaceOrderForm
            setOpenMap={setOpenMap}
            setValue={methods.setValue}
            from={from?.address}
            to={to?.address}
            triggerValidate={methods?.trigger}
          />
          <div className='mt-4 text-sm font-medium'>
            <p>{t('availableTransport')}</p>
          </div>
          <ListTransportType setValue={methods.setValue} />
        </form>
      </section>
    </>
  );
}
