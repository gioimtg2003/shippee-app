import PlaceOrderForm from '@/components/mobile/PlaceOrder';
import { useTranslations } from 'next-intl';

export default function MainPage() {
  const t = useTranslations('common');

  return (
    <main className='pt-6'>
      <section className='px-4'>
        <PlaceOrderForm />
        <div className='mt-4 text-sm font-medium'>
          <p>{t('availableTransport')}</p>
        </div>
      </section>
    </main>
  );
}
