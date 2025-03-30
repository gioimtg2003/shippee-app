'use client';

import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
export default function InstallPromptIOS() {
  const t = useTranslations('common');

  return (
    <Button icon={<DownloadOutlined />} type='primary' className='mt-3'>
      {t('download')}
    </Button>
  );
}
