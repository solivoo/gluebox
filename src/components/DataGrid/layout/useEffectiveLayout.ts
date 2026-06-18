import { useMemo } from 'react';
import type { RefObject } from 'react';
import type { DataGridLayout } from '../type/DataGrid.types';
import { useCardOnMobile } from '../hooks/useCardOnMobile';

export interface UseEffectiveLayoutResult {
  effectiveLayout: 'table' | 'card';
  isCardLayout: boolean;
  useResponsiveCard: boolean;
  isNarrowContainer: boolean;
}

export function useEffectiveLayout(
  layout: DataGridLayout,
  cardOnMobile: boolean,
  cardBreakpoint: number,
  rootRef: RefObject<HTMLElement | null>,
): UseEffectiveLayoutResult {
  const useResponsiveCard =
    layout === 'auto' || (layout === 'table' && cardOnMobile);

  const isNarrowContainer = useCardOnMobile(
    useResponsiveCard,
    rootRef,
    cardBreakpoint,
  );

  const effectiveLayout = useMemo((): 'table' | 'card' => {
    if (layout === 'card') return 'card';
    if (useResponsiveCard) return isNarrowContainer ? 'card' : 'table';
    return 'table';
  }, [layout, useResponsiveCard, isNarrowContainer]);

  return {
    effectiveLayout,
    isCardLayout: effectiveLayout === 'card',
    useResponsiveCard,
    isNarrowContainer,
  };
}
