'use client';
import { useGetTransportType } from '@/services/transport/get';
import { getHeaderSha256 } from '@/utils';
import { useState } from 'react';
import TransportTypeCard from './TransportTypeCard';

export default function ListTransportType() {
  const { data: listTransport } = useGetTransportType({
    params: { ...getHeaderSha256() },
  });
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className='mt-2 flex flex-col gap-4'>
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
