import { memo } from 'react';

export interface PlaceOrderLineProps {
  count?: number;
}

function PlaceOrderLine(props: PlaceOrderLineProps) {
  const { count = 2 } = props;
  return (
    <div className='flex h-full w-full flex-col items-center justify-between'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex w-full items-center justify-between'>
          .
        </div>
      ))}
    </div>
  );
}

export default memo(PlaceOrderLine, (oldProps, newProps) => {
  return oldProps.count === newProps.count;
});
