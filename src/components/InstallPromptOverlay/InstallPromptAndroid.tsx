'use client';

import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
export default function InstallPromptAndroid() {
  const t = useTranslations('common');
  const installPrompt = useRef<any>();

  const handleInstall = async () => {
    if (!installPrompt.current) {
      return;
    }
    await installPrompt.current.prompt();
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt');
      event.preventDefault();
      installPrompt.current = event;
    });
  }, []);
  return (
    <Button
      icon={<DownloadOutlined />}
      type='primary'
      className='mt-3'
      onClick={handleInstall}
    >
      {t('download')}
    </Button>
  );
}
