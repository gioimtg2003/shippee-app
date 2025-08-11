import ExpandPanel from '@/components/common/ExpandPanel';
import { cn } from '@/lib/utils';
import { ITransportTypeResponse } from '@/services/transport/get';
import { getKeyComponent } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
import { GoPackage } from 'react-icons/go';
import SpecialRequireItem from './SpecialRequireItem';

export default function TransportTypeCard(
  props: ITransportTypeResponse & {
    isSelected?: boolean;
    handleSelect: (id: number) => void;
  }
) {
  const {
    handleSelect,
    description,
    id,
    imageUrl,
    name,
    textSize,
    textWeight,
    isSelected,
    specialRequireItems,
  } = props;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelectSpecial = (id: number) => {
    setSelectedItem((prev) => (prev === id ? null : id));
  };
  const handleClick = () => {
    handleSelect(id);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={cn(
          'flex cursor-pointer items-center justify-start gap-1 rounded-md border-[0.5px] border-primary px-4 py-2',
          isSelected ? 'border-2 border-[#9fa0f3]' : ''
        )}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className='h-20 w-20 object-contain'
        />
        <div className='flex flex-col justify-center'>
          <h5 className='font-semibold'>{name}</h5>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-gray-700'>{description}</p>
            <span className='flex items-center gap-1'>
              <GoPackage />

              <p className='text-sm font-medium text-gray-500'>
                {textWeight} {textSize}
              </p>
            </span>
          </div>
        </div>
      </div>
      <ExpandPanel isVisible={isSelected}>
        <div className='mt-2 flex w-full flex-col items-center justify-center gap-3'>
          {(specialRequireItems ?? [])
            ?.flatMap((item) => [item, ...(item?.children || [])])
            ?.map((item) => (
              <SpecialRequireItem
                isSelected={selectedItem === item.id}
                handleSelectSpecial={handleSelectSpecial}
                key={getKeyComponent('special', item.id)}
                {...item}
              />
            ))}
        </div>
      </ExpandPanel>
    </>
  );
}
