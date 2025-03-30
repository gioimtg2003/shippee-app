'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';
import Logo from '../logo';
import InstallPromptAndroid from './InstallPromptAndroid';
import InstallPromptIOS from './InstallPromptIOS';

function InstallPromptOverlay() {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('opened') === 'true') return;
    if (isIOS) {
      window.location.href = `x-safari-${window.location.origin}?opened=true`;
    } else if (isAndroid) {
      window.location.href = `intent:${window.location.origin}?opened=true#Intent;package=com.android.chrome;end;`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <Logo variant='text' width={120} height={70} />
      <p className='text-md my-1 font-light text-gray-600'>
        {t('installPrompt')}
      </p>
      {isIOS ? <InstallPromptIOS /> : <InstallPromptAndroid />}
    </div>
  );
}

export default memo(InstallPromptOverlay);
