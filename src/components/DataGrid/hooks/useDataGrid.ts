import { useCallback, useMemo, useState } from 'react';
import type {
  DataGridSortState,
  UseDataGridOptions,
  UseDataGridReturn,
} from '../type/DataGrid.types';
import { useDebouncedValue } from './useDebouncedValue';
import {
  filterRowsBySearch,
  normalizeId,
  sortRows,
} from '../utils/gridUtils';

export function useDataGrid<T extends Record<string, unknown>>(
  options: UseDataGridOptions<T>,
): UseDataGridReturn<T> {
  const {
    data,
    columns,
    getRowId,
    selectionMode = 'none',
    selectedRowIds,
    searchKeys,
    debounceMs = 300,
    initialSort = null,
  } = options;

  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<DataGridSortState<T> | null>(initialSort);
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(() => new Set());

  const debouncedSearch = useDebouncedValue(searchQuery, debounceMs);

  const effectiveSearchKeys = useMemo(
    () => searchKeys ?? columns.map((column) => column.key),
    [searchKeys, columns],
  );

  const filteredData = useMemo(
    () => filterRowsBySearch(data, debouncedSearch, effectiveSearchKeys),
    [data, debouncedSearch, effectiveSearchKeys],
  );

  const sortedData = useMemo(
    () => sortRows(filteredData, sort),
    [filteredData, sort],
  );

  const displayRows = sortedData;

  const selectedIds = useMemo(() => {
    if (selectedRowIds) {
      return new Set(selectedRowIds.map(normalizeId));
    }
    return internalSelectedIds;
  }, [selectedRowIds, internalSelectedIds]);

  const rowById = useMemo(() => {
    const map = new Map<string, T>();
    for (const row of data) {
      map.set(normalizeId(getRowId(row)), row);
    }
    return map;
  }, [data, getRowId]);

  const selectedRows = useMemo(() => {
    const rows: T[] = [];
    for (const id of selectedIds) {
      const row = rowById.get(id);
      if (row) rows.push(row);
    }
    return rows;
  }, [selectedIds, rowById]);

  const toggleSort = useCallback((key: keyof T) => {
    setSort((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  }, []);

  const isRowSelected = useCallback(
    (row: T) => selectedIds.has(normalizeId(getRowId(row))),
    [selectedIds, getRowId],
  );

  const updateSelection = useCallback(
    (next: Set<string>) => {
      if (selectedRowIds === undefined) {
        setInternalSelectedIds(next);
      }
    },
    [selectedRowIds],
  );

  const toggleRow = useCallback(
    (row: T) => {
      if (selectionMode === 'none') return;

      const id = normalizeId(getRowId(row));

      if (selectionMode === 'single') {
        const next = new Set<string>([id]);
        updateSelection(next);
        return;
      }

      const next = new Set(selectedIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      updateSelection(next);
    },
    [selectionMode, getRowId, selectedIds, updateSelection],
  );

  const selectAllVisible = useCallback(() => {
    if (selectionMode !== 'multiple') return;
    const next = new Set(selectedIds);
    for (const row of displayRows) {
      next.add(normalizeId(getRowId(row)));
    }
    updateSelection(next);
  }, [selectionMode, selectedIds, displayRows, getRowId, updateSelection]);

  const clearSelection = useCallback(() => {
    updateSelection(new Set());
  }, [updateSelection]);

  const visibleIds = useMemo(
    () => displayRows.map((row) => normalizeId(getRowId(row))),
    [displayRows, getRowId],
  );

  const isAllVisibleSelected =
    selectionMode === 'multiple' &&
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.has(id));

  const isSomeVisibleSelected =
    selectionMode === 'multiple' &&
    visibleIds.some((id) => selectedIds.has(id)) &&
    !isAllVisibleSelected;

  return {
    rawData: data,
    filteredData,
    sortedData,
    displayRows,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    sort,
    toggleSort,
    selectedIds,
    selectedRows,
    isRowSelected,
    toggleRow,
    selectAllVisible,
    clearSelection,
    isAllVisibleSelected,
    isSomeVisibleSelected,
  };
}
