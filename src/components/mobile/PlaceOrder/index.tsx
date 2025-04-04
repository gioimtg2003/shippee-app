import { useTranslations } from 'next-intl';
import { memo } from 'react';

function PlaceOrderForm() {
  const t = useTranslations('common');
  return (
    <div className='place-order-form rounded-md p-4'>
      <div className='flex h-full w-full flex-col items-center gap-y-2 px-4 text-xs text-gray-400'>
        <div className='flex h-10 w-full flex-col-reverse border-b border-b-gray-200 px-2 pb-1'>
          <p className='ml-4'>{t('from')}</p>
        </div>
        <div className='flex h-10 w-full flex-col-reverse border-b border-b-gray-200 px-2 pb-1'>
          <p className='ml-4'>{t('to')}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(PlaceOrderForm);
