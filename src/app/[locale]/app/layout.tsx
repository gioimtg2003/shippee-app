import Navigation from '@/components/Navigation';
import { PropsWithChildren } from 'react';

export default function LayoutApp({ children }: PropsWithChildren<{}>) {
  return (
    <Navigation>
      <main className='pb-[70px] pt-6 md:pb-0'>{children}</main>
    </Navigation>
  );
}
