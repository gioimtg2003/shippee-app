'use client';

import Logo from '@/components/logo';
import { RoutesMap } from '@/constants';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SettingOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

function HeaderNavigation() {
  const t = useTranslations('common');
  const pathName = usePathname();
  console.log('pathName', pathName);
  return (
    <div className='header-navbar sticky top-0 z-[999] flex w-full items-center overflow-hidden bg-transparent px-4 transition-all'>
      <div className='flex cursor-pointer items-center justify-center'>
        <Logo variant='text' />
      </div>
      <div className='h-full w-full px-4'>
        <div className='flex h-full items-center justify-between'>
          <div className='flex h-full items-center justify-center gap-6'>
            {Object.entries(RoutesMap.APP).map(([key, value]) => (
              <div
                className={cn(
                  'flex h-full items-center justify-center',
                  pathName === value
                    ? 'border-b border-primary text-primary'
                    : 'text-gray-700'
                )}
                key={key}
              >
                <Link
                  href={value}
                  className='text-sm font-medium transition-colors duration-200 hover:text-primary'
                >
                  {t(key)}
                </Link>
              </div>
            ))}
          </div>
          <Tooltip title={t('setting')}>
            <Link href={RoutesMap.SETTING.PROFILE}>
              <SettingOutlined className='cursor-pointer text-2xl font-thin text-gray-600' />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderNavigation);
