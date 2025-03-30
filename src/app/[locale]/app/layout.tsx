import Navigation from '@/components/Navigation';
import { PropsWithChildren } from 'react';

export default function LayoutApp({ children }: PropsWithChildren<{}>) {
  return <Navigation>{children}</Navigation>;
}
