/** Rango de filas visibles calculado para virtualización */
export interface VirtualRowsRange {
  startIndex: number;
  endIndex: number;
  paddingTop: number;
  paddingBottom: number;
  totalHeight: number;
}

/** Calcula índices visibles y paddings para el patrón spacer del tbody */
export function computeVirtualRowsRange(
  rowCount: number,
  rowHeight: number,
  scrollTop: number,
  viewportHeight: number,
  overscan: number,
): VirtualRowsRange {
  if (rowCount <= 0 || rowHeight <= 0) {
    return {
      startIndex: 0,
      endIndex: -1,
      paddingTop: 0,
      paddingBottom: 0,
      totalHeight: 0,
    };
  }

  const totalHeight = rowCount * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.max(1, Math.ceil(viewportHeight / rowHeight));
  const endIndex = Math.min(
    rowCount - 1,
    startIndex + visibleCount + overscan * 2,
  );

  return {
    startIndex,
    endIndex,
    paddingTop: startIndex * rowHeight,
    paddingBottom: Math.max(0, totalHeight - (endIndex + 1) * rowHeight),
    totalHeight,
  };
}
