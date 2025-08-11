'use client';

import { useDisclosure } from '@/hooks';
import { cn } from '@/lib/utils';
import { TOrderFormSchema } from '@/zod/order.zod';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Fragment, memo, useEffect } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

const PickAddressDrawer = dynamic(() => import('../PickAddress'), {
  ssr: false,
});
const DeliveryAddressDrawer = dynamic(() => import('../PickAddress'), {
  ssr: false,
});
interface IPlaceOrderFormProps {
  setValue: UseFormSetValue<TOrderFormSchema>;
  from?: string;
  to?: string;
  triggerValidate: UseFormTrigger<TOrderFormSchema>;
  setOpenMap: (open: boolean) => void;
}
function PlaceOrderForm({
  setValue,
  from,
  to,
  triggerValidate,
  setOpenMap,
}: IPlaceOrderFormProps) {
  const t = useTranslations('common');
  const disclosurePickAddress = useDisclosure();
  const disclosureDeliveryAddress = useDisclosure();

  useEffect(() => {
    setOpenMap(
      disclosureDeliveryAddress.isOpen || disclosurePickAddress.isOpen
    );
  }, [disclosureDeliveryAddress.isOpen, disclosurePickAddress.isOpen]);

  return (
    <Fragment>
      <PickAddressDrawer
        disclosureControl={disclosurePickAddress}
        setValue={setValue}
        triggerValidate={triggerValidate}
        name='pickup'
      />
      <DeliveryAddressDrawer
        disclosureControl={disclosureDeliveryAddress}
        triggerValidate={triggerValidate}
        setValue={setValue}
        name='destination'
      />
      <div className='place-order-form rounded-md p-4'>
        <div className='flex h-full w-full flex-col items-center gap-y-2 px-4 text-xs text-gray-400'>
          <div
            className='flex h-10 w-full flex-col-reverse border-b border-b-gray-200 px-2 pb-1'
            onClick={(e) => {
              e.stopPropagation();
              disclosurePickAddress.open();
            }}
          >
            <p>
              {from ? (
                <span className='text-base font-medium text-gray-700'>
                  {from}
                </span>
              ) : (
                t('from')
              )}
            </p>
          </div>
          <div
            className='flex h-10 w-full flex-col-reverse border-b border-b-gray-200 px-2 pb-1'
            onClick={(e) => {
              e.stopPropagation();
              disclosureDeliveryAddress.open();
            }}
          >
            <p className={cn()}>
              {to ? (
                <span className='text-base font-medium text-gray-700'>
                  {to}
                </span>
              ) : (
                t('to')
              )}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default memo(PlaceOrderForm);
