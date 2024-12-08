import { useEffect, useRef } from 'react';

export const useAutoScroll = <T extends HTMLElement>(
  itemsLength: number,
  scrollThreshold: number = 6
) => {
  const containerRef = useRef<T>(null);
  const previousLength = useRef(itemsLength);

  useEffect(() => {
    if (itemsLength > scrollThreshold && itemsLength > previousLength.current) {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
    previousLength.current = itemsLength;
  }, [itemsLength, scrollThreshold]);

  return containerRef;
};