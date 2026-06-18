import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UsePaginationOptions, UsePaginationReturn } from '../type/DataGrid.types';

function clampPage(page: number, totalPages: number): number {
  if (totalPages <= 0) return 1;
  return Math.min(Math.max(1, page), totalPages);
}

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const {
    totalItems,
    enabled,
    page: controlledPage,
    defaultPage = 1,
    pageSize: controlledPageSize,
    defaultPageSize = 25,
    pageSizeOptions = [10, 25, 50, 100],
    onPageChange,
    onPageSizeChange,
  } = options;

  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  const page = controlledPage ?? internalPage;
  const pageSize = controlledPageSize ?? internalPageSize;

  const totalPages = useMemo(() => {
    if (!enabled || totalItems <= 0) return 1;
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [enabled, totalItems, pageSize]);

  const safePage = clampPage(page, totalPages);

  useEffect(() => {
    if (!enabled) return;
    if (safePage !== page) {
      if (controlledPage === undefined) {
        setInternalPage(safePage);
      } else {
        onPageChange?.(safePage);
      }
    }
  }, [enabled, safePage, page, controlledPage, onPageChange]);

  const updatePage = useCallback(
    (nextPage: number) => {
      const clamped = clampPage(nextPage, totalPages);
      if (controlledPage === undefined) {
        setInternalPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [controlledPage, onPageChange, totalPages],
  );

  const updatePageSize = useCallback(
    (nextSize: number) => {
      const size = Math.max(1, nextSize);
      if (controlledPageSize === undefined) {
        setInternalPageSize(size);
        setInternalPage(1);
      }
      onPageSizeChange?.(size);
      onPageChange?.(1);
    },
    [controlledPageSize, onPageChange, onPageSizeChange],
  );

  const startIndex = enabled ? (safePage - 1) * pageSize : 0;
  const endIndex = enabled
    ? Math.min(totalItems, startIndex + pageSize)
    : totalItems;

  const sliceRows = useCallback(
    <T,>(rows: T[]): T[] => {
      if (!enabled) return rows;
      return rows.slice(startIndex, endIndex);
    },
    [enabled, startIndex, endIndex],
  );

  return {
    page: safePage,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    canPrevious: enabled && safePage > 1,
    canNext: enabled && safePage < totalPages,
    pageSizeOptions,
    setPage: updatePage,
    setPageSize: updatePageSize,
    goToFirst: () => updatePage(1),
    goToPrevious: () => updatePage(safePage - 1),
    goToNext: () => updatePage(safePage + 1),
    goToLast: () => updatePage(totalPages),
    sliceRows,
  };
}
