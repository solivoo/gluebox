import { useCallback, useMemo } from 'react';
import type {
  DataGridSelectionMode,
  UseDataGridReturn,
} from '../type/DataGrid.types';
import { normalizeId } from '../utils/gridUtils';

export interface UseDataGridSelectionOptions<T extends Record<string, unknown>> {
  data: T[];
  getRowId: (row: T) => string | number;
  selectionMode: DataGridSelectionMode;
  selectedRowIds?: Array<string | number>;
  rowsToRender: T[];
  grid: UseDataGridReturn<T>;
  onRowSelect?: (row: T) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
  onCardSelect?: (row: T) => void;
}

export interface UseDataGridSelectionReturn<T extends Record<string, unknown>> {
  pageVisibleIds: string[];
  isAllPageSelected: boolean;
  isSomePageSelected: boolean;
  handleToggleRow: (row: T) => void;
  handleRowClick: (row: T) => void;
  handleCardActivate: (row: T) => void;
  handleToggleSelectAll: () => void;
}

function rowsFromIds<T extends Record<string, unknown>>(
  data: T[],
  getRowId: (row: T) => string | number,
  ids: Iterable<string | number>,
): T[] {
  const idSet = new Set(Array.from(ids, normalizeId));
  return data.filter((item) => idSet.has(normalizeId(getRowId(item))));
}

export function useDataGridSelection<T extends Record<string, unknown>>(
  options: UseDataGridSelectionOptions<T>,
): UseDataGridSelectionReturn<T> {
  const {
    data,
    getRowId,
    selectionMode,
    selectedRowIds,
    rowsToRender,
    grid,
    onRowSelect,
    onSelectionChange,
    onCardSelect,
  } = options;

  const isControlled = selectedRowIds !== undefined;

  const pageVisibleIds = useMemo(
    () => rowsToRender.map((row) => normalizeId(getRowId(row))),
    [rowsToRender, getRowId],
  );

  const isAllPageSelected =
    selectionMode === 'multiple' &&
    pageVisibleIds.length > 0 &&
    pageVisibleIds.every((id) => grid.selectedIds.has(id));

  const isSomePageSelected =
    selectionMode === 'multiple' &&
    pageVisibleIds.some((id) => grid.selectedIds.has(id)) &&
    !isAllPageSelected;

  const handleToggleRow = useCallback(
    (row: T) => {
      const id = normalizeId(getRowId(row));

      if (isControlled) {
        if (selectionMode === 'single') {
          onRowSelect?.(row);
          onSelectionChange?.([row]);
          return;
        }

        const next = new Set(selectedRowIds.map(normalizeId));
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        onSelectionChange?.(rowsFromIds(data, getRowId, next));
        return;
      }

      grid.toggleRow(row);
    },
    [
      isControlled,
      selectionMode,
      getRowId,
      selectedRowIds,
      data,
      onRowSelect,
      onSelectionChange,
      grid,
    ],
  );

  const handleRowClick = useCallback(
    (row: T) => {
      if (selectionMode === 'none') return;
      handleToggleRow(row);
    },
    [selectionMode, handleToggleRow],
  );

  const handleCardActivate = useCallback(
    (row: T) => {
      if (selectionMode !== 'none') {
        handleToggleRow(row);
      }
      onCardSelect?.(row);
    },
    [selectionMode, handleToggleRow, onCardSelect],
  );

  const handleToggleSelectAll = useCallback(() => {
    if (isControlled) {
      if (isAllPageSelected) {
        const pageIdSet = new Set(pageVisibleIds);
        const remaining = selectedRowIds
          .map(normalizeId)
          .filter((id) => !pageIdSet.has(id));
        onSelectionChange?.(rowsFromIds(data, getRowId, remaining));
        return;
      }

      const next = new Set(selectedRowIds.map(normalizeId));
      for (const id of pageVisibleIds) {
        next.add(id);
      }
      onSelectionChange?.(rowsFromIds(data, getRowId, next));
      return;
    }

    if (isAllPageSelected) {
      for (const row of rowsToRender) {
        if (grid.isRowSelected(row)) grid.toggleRow(row);
      }
      return;
    }

    for (const row of rowsToRender) {
      if (!grid.isRowSelected(row)) grid.toggleRow(row);
    }
  }, [
    isControlled,
    isAllPageSelected,
    pageVisibleIds,
    selectedRowIds,
    data,
    getRowId,
    onSelectionChange,
    rowsToRender,
    grid,
  ]);

  return {
    pageVisibleIds,
    isAllPageSelected,
    isSomePageSelected,
    handleToggleRow,
    handleRowClick,
    handleCardActivate,
    handleToggleSelectAll,
  };
}
