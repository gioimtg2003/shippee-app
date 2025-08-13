'use client';
import { Spinner } from '@/components/common/Spinner';
import { useGetTransportType } from '@/services/transport/get';
import { getHeaderSha256 } from '@/utils';
import { TOrderFormSchema } from '@/zod/order.zod';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import TransportTypeCard from './TransportTypeCard';

export default function ListTransportType({
  setValue,
}: {
  setValue: UseFormSetValue<TOrderFormSchema>;
}) {
  const { data: listTransport, isLoading } = useGetTransportType({
    params: { ...getHeaderSha256() },
  });
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedItem((prev) => (prev === id ? null : id));
    setValue('idTransportType', id);
  };

  return (
    <div className='mt-2 flex flex-col gap-4'>
      {isLoading && <Spinner />}
      {(listTransport?.data ?? [])
        ?.sort((a, b) => a?.loadWeight - b?.loadWeight)
        .map((transport) => (
          <TransportTypeCard
            key={transport?.id}
            {...transport}
            handleSelect={handleSelect}
            isSelected={selectedItem === transport?.id}
          />
        ))}
    </div>
  );
}
