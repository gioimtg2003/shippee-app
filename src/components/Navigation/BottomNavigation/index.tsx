import { ICON_SIZE_BOTTOM_NAVIGATION, RoutesMap } from '@/constants';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { memo } from 'react';
import { FiUsers } from 'react-icons/fi';
import { GoPackage } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdHistory } from 'react-icons/md';

const BottomNavigationRoute = [
  {
    icon: <GoPackage size={ICON_SIZE_BOTTOM_NAVIGATION} />,
    route: RoutesMap.APP.PLACE_ORDER,
  },
  {
    icon: <MdHistory size={ICON_SIZE_BOTTOM_NAVIGATION} />,
    route: RoutesMap.APP.ORDER_HISTORY,
  },
  {
    icon: <MdHistory />,
    route: 'none',
  },
  {
    icon: <FiUsers size={ICON_SIZE_BOTTOM_NAVIGATION} />,
    route: RoutesMap.APP.DRIVERS,
  },
  {
    icon: <IoSettingsOutline size={ICON_SIZE_BOTTOM_NAVIGATION} />,
    route: RoutesMap.SETTING.PROFILE,
  },
];

function BottomNavigation() {
  const pathName = usePathname();

  return (
    <div className='border-t-primary/15 fixed bottom-0 z-[999] flex h-16 w-full items-center overflow-hidden border-t-[0.5px] bg-white px-4 transition-all md:hidden'>
      {BottomNavigationRoute.map(({ icon, route }, index) => (
        <div
          key={index}
          className={cn(
            'flex h-full w-full items-center justify-center',
            pathName === route
              ? 'border-t border-t-primary text-primary'
              : 'text-gray-700'
          )}
        >
          {route === 'none' ? (
            <div className='relative h-11 w-11'>
              <div className='absolute flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-primary'></div>
            </div>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <Link href={route}>{icon}</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(BottomNavigation);
