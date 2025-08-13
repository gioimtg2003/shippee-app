'use client';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDisclosure } from '@/hooks';
import { IOrder } from '@/interfaces';
import { axiosInstant } from '@/lib/axiosClient';
import { Timeline } from 'antd';
import { ArrowUpToLine } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Map, MapRef, Marker } from 'react-map-gl/mapbox';
import { convertStatusText, formatDate } from '../../order-history/page';

export default function Page() {
  const params = useParams();
  const mapRef = useRef<MapRef>(null);
  const detailsClosure = useDisclosure();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    document.title = `Theo dõi đơn hàng ${params?.id}`;
  }, [params]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstant.get<IOrder>(
          `customer-order/detail/${params?.id}`
        );

        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      try {
        const { data } = await axiosInstant.get<{
          location: { lng: number; lat: number };
        }>(`customer-order/tracking?orderId=${params?.id}`);
        mapRef.current?.flyTo({
          center: [data.location.lng, data.location.lat],
          essential: true,
        });
        setCoordinates([data.location.lng, data.location.lat]);
      } catch (error) {
        console.log(error);
      }
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [params?.id]);

  return (
    <div className='relative h-screen w-full'>
      <Drawer open={true} onClose={detailsClosure.close}>
        <DrawerContent className='h-1/2 w-full'>
          <div
            className='scrollbar-none mx-auto w-full overflow-y-scroll scroll-smooth px-10 pb-16'
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none',
            }}
          >
            <DrawerHeader>
              <DrawerTitle>Thông tin đơn hàng</DrawerTitle>
            </DrawerHeader>
            <Timeline
              pending='Recording...'
              items={[
                ...(order?.statusOrderHistory || [])?.map((item) => ({
                  children: `${convertStatusText(item.status)} - ${formatDate(item.createAt)}`,
                })),
              ]}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <ArrowUpToLine
        className='absolute bottom-4 left-1/2 right-1/2 z-10'
        onClick={detailsClosure.open}
      />
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 106.7787403,
          latitude: 10.8260282,
          zoom: 14,
        }}
        onDragStart={() => {
          if (mapRef.current) {
            mapRef.current.touchZoomRotate?.enable();
          }
        }}
        onDragEnd={() => {
          if (mapRef.current) {
            mapRef.current.touchZoomRotate?.disable();
          }
        }}
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        mapStyle={'mapbox://styles/gioimtg2003/cly3bplv3007k01qp87hradf3'}
      >
        {coordinates && (
          <Marker longitude={coordinates[0]} latitude={coordinates[1]} />
        )}
      </Map>
    </div>
  );
}
