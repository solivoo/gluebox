import { useEffect, useMemo, useState, type RefObject } from 'react';
import {
  computeVirtualRowsRange,
  type VirtualRowsRange,
} from '../utils/virtualRows';

export interface UseVirtualRowsOptions {
  scrollRef: RefObject<HTMLElement | null>;
  rowCount: number;
  rowHeight: number;
  enabled: boolean;
  overscan?: number;
}

export interface UseVirtualRowsReturn extends VirtualRowsRange {
  isVirtualized: boolean;
}

export function useVirtualRows({
  scrollRef,
  rowCount,
  rowHeight,
  enabled,
  overscan = 5,
}: UseVirtualRowsOptions): UseVirtualRowsReturn {
  const [metrics, setMetrics] = useState({ scrollTop: 0, viewportHeight: 0 });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const update = () => {
      setMetrics({
        scrollTop: element.scrollTop,
        viewportHeight: element.clientHeight,
      });
    };

    update();
    element.addEventListener('scroll', update, { passive: true });

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      element.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [scrollRef, rowCount, enabled]);

  return useMemo(() => {
    if (!enabled || rowCount === 0) {
      return {
        startIndex: 0,
        endIndex: rowCount > 0 ? rowCount - 1 : -1,
        paddingTop: 0,
        paddingBottom: 0,
        totalHeight: rowCount * rowHeight,
        isVirtualized: false,
      };
    }

    return {
      ...computeVirtualRowsRange(
        rowCount,
        rowHeight,
        metrics.scrollTop,
        metrics.viewportHeight,
        overscan,
      ),
      isVirtualized: true,
    };
  }, [enabled, rowCount, rowHeight, metrics, overscan]);
}
