import { memo, PropsWithChildren } from 'react';
import HeaderNavigation from './HeaderNavigation';

function Navigation({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <HeaderNavigation />
      {children}
    </>
  );
}

export default memo(Navigation);
