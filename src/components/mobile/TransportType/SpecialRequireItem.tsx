import { ISpecialRequireItem } from '@/interfaces';
import { cn } from '@/lib/utils';
import { handleRenderPriceValue } from '@/utils/currency';
import { memo } from 'react';

function SpecialRequireItem(
  props: ISpecialRequireItem & {
    isSelected?: boolean;
  }
) {
  const { isSelected, name, children, priceValue, priceType } = props;
  if ((children ?? [])?.length > 0) {
    return null;
  }
  return (
    <div className='w-full px-6'>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[450px] items-start justify-between gap-4 rounded-md border-[0.5px] border-primary px-4 py-6',
          isSelected ? 'border-2 border-[#9fa0f3]' : ''
        )}
      >
        <span>{name}</span>
        <span className='text-gray-600'>
          {handleRenderPriceValue(priceValue ?? 0, priceType)}
        </span>
      </div>
    </div>
  );
}

export default memo(SpecialRequireItem);
