'use client';

import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Drawer as DrawerShadcn,
  DrawerTitle,
} from '@/components/ui/drawer';
import { IDisclosureControls, useDisclosure } from '@/hooks';
import { URL_API_RETRIEVE_MAPBOX } from '@/services/mapbox/search';
import { getPosition } from '@/utils/location';
import { TOrderFormSchema } from '@/zod/order.zod';
import { LeftOutlined } from '@ant-design/icons';
import { Drawer, Select } from 'antd';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Map, MapRef, Marker } from 'react-map-gl/mapbox';
import { v4 as uuid } from 'uuid';
import { useSearchAddress } from './hooks';

export default function PickAddressDrawer(props: {
  disclosureControl: IDisclosureControls;
  setValue: UseFormSetValue<TOrderFormSchema>;
  name: keyof TOrderFormSchema;
  triggerValidate: UseFormTrigger<TOrderFormSchema>;
}) {
  const {
    disclosureControl,
    setValue: setValueForm,
    name,
    triggerValidate,
  } = props;
  const mapRef = useRef<MapRef>(null);

  const { onSearch, searchValue, loading, data } = useSearchAddress();
  const [value, setValue] = useState<string>();
  const infoAddressClosure = useDisclosure();
  const [markerPosition, setMarkerPosition] = useState<[number, number]>();

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
      <DrawerShadcn
        open={infoAddressClosure.isOpen}
        onClose={infoAddressClosure.close}
      >
        <DrawerContent className='z-[9999]'>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Thông tin địa chỉ</DrawerTitle>
            </DrawerHeader>
            <div className='p-4 pb-0'>
              <div className='flex flex-col gap-y-2'>
                <Input
                  placeholder={'Tên liên lạc'}
                  onChange={(e) => {
                    const typeAddress: keyof TOrderFormSchema =
                      name === 'pickup' ? 'cusName' : 'recipientName';
                    setValueForm(typeAddress, e.target.value);
                  }}
                />
                <Input
                  placeholder='Số điện thoại'
                  onChange={(e) => {
                    const typeAddress: keyof TOrderFormSchema =
                      name === 'pickup' ? 'cusPhone' : 'recipientPhone';
                    setValueForm(typeAddress, e.target.value);
                  }}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={async () => {
                  const validate = await triggerValidate(
                    name === 'pickup'
                      ? ['cusName', 'cusPhone']
                      : ['recipientName', 'recipientPhone']
                  );
                  if (validate) {
                    disclosureControl.close();
                  }
                }}
                className='text-white'
              >
                Submit
              </Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerShadcn>
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
          onChange={async (value) => {
            try {
              const namePlace = options.find((item) => item?.id === value);
              setValue(namePlace?.name ?? '');

              const res = await axios.get(
                `${URL_API_RETRIEVE_MAPBOX}/${value}?session_token=${uuid()}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
              );
              const coordinates =
                res?.data?.features?.[0]?.geometry?.coordinates;
              mapRef?.current?.flyTo({
                center: coordinates,
                zoom: 14,
              });
              setMarkerPosition(coordinates);
              infoAddressClosure?.open();
              setValueForm(name, {
                address: namePlace?.name ?? '',
                coordinates,
              });
            } catch (error) {
              console.error('Error retrieving address:', error);
            }
          }}
          loading={loading}
          style={{
            width: '100%',
            height: '40px',
          }}
        />
      </div>

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 106.7787403,
          latitude: 10.8260282,
          zoom: 14,
        }}
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        mapStyle={'mapbox://styles/gioimtg2003/cly3bplv3007k01qp87hradf3'}
      >
        {markerPosition && (
          <Marker longitude={markerPosition[0]} latitude={markerPosition[1]} />
        )}
      </Map>
    </Drawer>
  );
}
