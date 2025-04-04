'use client';

import { memo, PropsWithChildren } from 'react';
import BottomNavigation from './BottomNavigation';
import HeaderMobile from './HeaderMobile';
import HeaderNavigation from './HeaderNavigation';

function Navigation({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <HeaderNavigation />
      <HeaderMobile />
      {children}
      <BottomNavigation />
    </>
  );
}

export default memo(Navigation);
