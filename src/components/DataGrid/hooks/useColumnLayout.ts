import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import type {
  ColumnDef,
  DataGridColumnWidths,
  UseColumnLayoutOptions,
  UseColumnLayoutReturn,
} from '../type/DataGrid.types';
import {
  columnKeyString,
  moveColumnInOrder,
  normalizeColumnOrder,
  orderColumns,
  resolveColumnStyle,
} from '../utils/columnLayoutUtils';

export type { UseColumnLayoutOptions, UseColumnLayoutReturn };

export function useColumnLayout<T extends Record<string, unknown>>(
  options: UseColumnLayoutOptions<T>,
): UseColumnLayoutReturn<T> {
  const {
    columns,
    resizableColumns = false,
    reorderableColumns = false,
    columnWidths: controlledWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    columnOrder: controlledOrder,
    defaultColumnOrder,
    onColumnOrderChange,
    minColumnWidth = 72,
  } = options;

  const [internalOrder, setInternalOrder] = useState<Array<keyof T>>(() =>
    normalizeColumnOrder(columns, defaultColumnOrder),
  );
  const [internalWidths, setInternalWidths] = useState<DataGridColumnWidths<T>>(
    () => defaultColumnWidths ?? {},
  );
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const columnOrder = controlledOrder ?? internalOrder;
  const columnWidths = controlledWidths ?? internalWidths;

  useEffect(() => {
    const normalized = normalizeColumnOrder(columns, columnOrder);
    const changed =
      normalized.length !== columnOrder.length ||
      normalized.some((key, index) => key !== columnOrder[index]);

    if (changed) {
      if (controlledOrder === undefined) {
        setInternalOrder(normalized);
      } else {
        onColumnOrderChange?.(normalized);
      }
    }
  }, [columns, columnOrder, controlledOrder, onColumnOrderChange]);

  const orderedColumns = useMemo(
    () => orderColumns(columns, normalizeColumnOrder(columns, columnOrder)),
    [columns, columnOrder],
  );

  const updateOrder = useCallback(
    (next: Array<keyof T>) => {
      if (controlledOrder === undefined) {
        setInternalOrder(next);
      }
      onColumnOrderChange?.(next);
    },
    [controlledOrder, onColumnOrderChange],
  );

  const getColumnStyle = useCallback(
    (column: ColumnDef<T>): CSSProperties => {
      const widthPx = columnWidths[column.key];
      return resolveColumnStyle(column, widthPx, minColumnWidth);
    },
    [columnWidths, minColumnWidth],
  );

  const isColumnResizable = useCallback(
    (column: ColumnDef<T>) => resizableColumns && column.resizable !== false,
    [resizableColumns],
  );

  const isColumnReorderable = useCallback(
    (column: ColumnDef<T>) => reorderableColumns && column.reorderable !== false,
    [reorderableColumns],
  );

  const onResizeStart = useCallback(
    (column: ColumnDef<T>, event: MouseEvent<HTMLElement>) => {
      if (!isColumnResizable(column)) return;

      event.preventDefault();
      event.stopPropagation();

      const headerCell = event.currentTarget.closest('th') as HTMLElement | null;
      const startWidth = headerCell?.offsetWidth ?? minColumnWidth;
      const startX = event.clientX;
      const key = column.key;

      const handleMove = (moveEvent: MouseEvent) => {
        const nextWidth = Math.max(
          minColumnWidth,
          startWidth + (moveEvent.clientX - startX),
        );
        if (controlledWidths === undefined) {
          setInternalWidths((prev) => {
            const next = { ...prev, [key]: nextWidth };
            onColumnWidthsChange?.(next);
            return next;
          });
        } else {
          onColumnWidthsChange?.({ ...controlledWidths, [key]: nextWidth });
        }
      };

      const handleUp = () => {
        document.removeEventListener('mousemove', handleMove as unknown as EventListener);
        document.removeEventListener('mouseup', handleUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.addEventListener('mousemove', handleMove as unknown as EventListener);
      document.addEventListener('mouseup', handleUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [controlledWidths, isColumnResizable, minColumnWidth, onColumnWidthsChange],
  );

  const onColumnDragStart = useCallback(
    (column: ColumnDef<T>, event: React.DragEvent<HTMLElement>) => {
      if (!isColumnReorderable(column)) return;

      event.dataTransfer.setData('text/plain', columnKeyString(column.key));
      event.dataTransfer.effectAllowed = 'move';
    },
    [isColumnReorderable],
  );

  const onColumnDragOver = useCallback(
    (column: ColumnDef<T>, event: React.DragEvent<HTMLElement>) => {
      if (!reorderableColumns) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragOverKey(columnKeyString(column.key));
    },
    [reorderableColumns],
  );

  const onColumnDragLeave = useCallback(() => {
    setDragOverKey(null);
  }, []);

  const onColumnDrop = useCallback(
    (column: ColumnDef<T>, event: React.DragEvent<HTMLElement>) => {
      if (!reorderableColumns) return;
      event.preventDefault();

      const fromKey = event.dataTransfer.getData('text/plain') as keyof T;
      if (!fromKey) return;

      const current = normalizeColumnOrder(columns, columnOrder);
      const next = moveColumnInOrder(current, fromKey, column.key);
      updateOrder(next);
      setDragOverKey(null);
    },
    [columns, columnOrder, reorderableColumns, updateOrder],
  );

  const onColumnDragEnd = useCallback(() => {
    setDragOverKey(null);
  }, []);

  return {
    orderedColumns,
    getColumnStyle,
    isColumnResizable,
    isColumnReorderable,
    dragOverKey,
    onResizeStart,
    onColumnDragStart,
    onColumnDragOver,
    onColumnDragLeave,
    onColumnDrop,
    onColumnDragEnd,
  };
}
