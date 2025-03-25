import { useEffect } from 'react';

/**
 * Hook to trigger a callback when a click happens outside a specified element.
 *
 * @param ref - React ref of the target element.
 * @param callback - Function to be called on outside click.
 */
function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref?.current?.contains?.(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useOnClickOutside;
