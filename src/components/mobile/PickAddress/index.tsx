'use client';

import { IDisclosureControls } from '@/hooks';
import { getPosition } from '@/utils/location';
import { LeftOutlined } from '@ant-design/icons';
import { Drawer, Select } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useState } from 'react';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { useSearchAddress } from './hooks';

export default function PickAddressDrawer(props: {
  disclosureControl: IDisclosureControls;
}) {
  const { disclosureControl } = props;
  const { onSearch, searchValue, loading, data } = useSearchAddress();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    (async () => {
      if (navigator.geolocation) {
        const location = await getPosition();
        console.log(location);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    })();
  }, []);

  const options = useMemo(
    () =>
      data?.suggestions?.map((item) => ({
        id: item?.mapbox_id,
        value: item?.mapbox_id,
        place: item?.place_formatted,
        name: item?.name,
      })) || [],
    [loading]
  );

  return (
    <Drawer
      open={disclosureControl.isOpen}
      onClose={disclosureControl.close}
      destroyOnClose
      width={'100%'}
      mask={false}
      placement='right'
      styles={{
        body: { padding: 0 },
        header: { display: 'none' },
      }}
    >
      <div className='relative mt-2 px-2'>
        <div className='absolute left-5 top-2 z-10 text-gray-500'>
          <LeftOutlined
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              disclosureControl.close();
            }}
          />
        </div>
        <Select
          showSearch
          // notFoundContent='Không tìm thấy địa chỉ'
          filterOption={false}
          options={options}
          onSearch={onSearch}
          searchValue={searchValue}
          allowClear
          popupMatchSelectWidth
          prefix={<LeftOutlined className='invisible' />}
          optionRender={(option) => (
            <div className='flex items-center justify-start gap-4'>
              <FaLocationCrosshairs />
              <div className='flex flex-col gap-[2px]'>
                <span className='font-medium text-gray-700'>
                  {option.data?.name}
                </span>
                <span className='text-xs text-gray-500'>
                  {option.data?.place}
                </span>
              </div>
            </div>
          )}
          value={value}
          onChange={(value) => {
            const namePlace = options.find((item) => item?.id === value);
            setValue(namePlace?.name ?? '');
          }}
          loading={loading}
          style={{
            width: '100%',
            height: '40px',
          }}
        />
      </div>

      {/* <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 106.7787403,
          latitude: 10.8260282,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={'mapbox://styles/gioimtg2003/cly3bl0vz007j01pf8pso160d'}
      /> */}
    </Drawer>
  );
}
