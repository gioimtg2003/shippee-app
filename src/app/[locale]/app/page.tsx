'use client';

import PlaceOrderForm from '@/components/mobile/PlaceOrder';
import ListTransportType from '@/components/mobile/TransportType';
import { useTranslations } from 'next-intl';

export default function MainPage() {
  const t = useTranslations('common');

  return (
    <main className='pb-[70px] pt-6 md:pb-0'>
      <section className='px-4'>
        <form>
          <PlaceOrderForm />
          <div className='mt-4 text-sm font-medium'>
            <p>{t('availableTransport')}</p>
          </div>
          <ListTransportType />
        </form>
      </section>
    </main>
  );
}
