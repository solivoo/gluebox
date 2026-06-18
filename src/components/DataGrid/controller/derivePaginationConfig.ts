import { useMemo } from 'react';

export interface DerivePaginationConfigInput {
  maxRecords?: number;
  pageSizeOptions: number[];
  defaultPageSize: number;
  pageSize?: number;
  isCardLayout: boolean;
  pagination: boolean;
}

export interface DerivedPaginationConfig {
  resolvedMaxRecords: number | undefined;
  effectivePageSizeOptions: number[];
  effectiveDefaultPageSize: number;
  effectiveControlledPageSize: number | undefined;
}

export function useDerivedPaginationConfig(
  input: DerivePaginationConfigInput,
): DerivedPaginationConfig {
  const {
    maxRecords,
    pageSizeOptions,
    defaultPageSize,
    pageSize,
    isCardLayout,
    pagination,
  } = input;

  const resolvedMaxRecords =
    maxRecords != null ? Math.max(1, maxRecords) : undefined;

  const effectivePageSizeOptions = useMemo(() => {
    if (resolvedMaxRecords == null) return pageSizeOptions;
    const filtered = pageSizeOptions.filter(
      (size) => size <= resolvedMaxRecords,
    );
    if (filtered.length > 0) return filtered;
    return [resolvedMaxRecords];
  }, [pageSizeOptions, resolvedMaxRecords]);

  const effectiveDefaultPageSize = useMemo(() => {
    const base =
      isCardLayout && pagination && resolvedMaxRecords == null
        ? 10
        : defaultPageSize;
    if (resolvedMaxRecords == null) return base;
    return Math.min(base, resolvedMaxRecords);
  }, [defaultPageSize, isCardLayout, pagination, resolvedMaxRecords]);

  const effectiveControlledPageSize =
    pageSize != null && resolvedMaxRecords != null
      ? Math.min(pageSize, resolvedMaxRecords)
      : pageSize;

  return {
    resolvedMaxRecords,
    effectivePageSizeOptions,
    effectiveDefaultPageSize,
    effectiveControlledPageSize,
  };
}
