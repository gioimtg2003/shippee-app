import Logo from '@/components/logo';
import { memo } from 'react';

function HeaderMobile() {
  return (
    <div className='sticky top-0 z-[999] flex h-10 w-full items-center justify-center overflow-hidden bg-transparent bg-white px-4 md:hidden'>
      <Logo variant='text' />
    </div>
  );
}

export default memo(HeaderMobile);
