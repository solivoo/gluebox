import type { CSSProperties } from 'react';
import type {
  ColumnDef,
  ColumnStickyMeta,
  DataGridColumnWidths,
  DataGridSelectionMode,
} from '../type/DataGrid.types';
import { resolveDimension } from './gridUtils';

export const CHECKBOX_COLUMN_WIDTH = 44;

export function columnKeyString<T extends Record<string, unknown>>(
  key: keyof T,
): string {
  return String(key);
}

export function normalizeColumnOrder<T extends Record<string, unknown>>(
  columns: ColumnDef<T>[],
  order?: Array<keyof T>,
): Array<keyof T> {
  const keys = columns.map((column) => column.key) as Array<keyof T>;
  if (!order?.length) return keys;

  const valid = order.filter((key) => keys.includes(key));
  const missing = keys.filter((key) => !valid.includes(key));
  return [...valid, ...missing];
}

export function orderColumns<T extends Record<string, unknown>>(
  columns: ColumnDef<T>[],
  order: Array<keyof T>,
): ColumnDef<T>[] {
  const map = new Map(columns.map((column) => [columnKeyString(column.key), column]));
  return order
    .map((key) => map.get(columnKeyString(key)))
    .filter((column): column is ColumnDef<T> => column != null);
}

export function moveColumnInOrder<T extends Record<string, unknown>>(
  order: Array<keyof T>,
  fromKey: keyof T,
  toKey: keyof T,
): Array<keyof T> {
  if (fromKey === toKey) return order;

  const next = order.filter((key) => key !== fromKey);
  const targetIndex = next.indexOf(toKey);
  if (targetIndex === -1) return order;

  next.splice(targetIndex, 0, fromKey);
  return next;
}

export function resolveColumnWidthPx<T extends Record<string, unknown>>(
  column: ColumnDef<T>,
  widthPx: number | undefined,
  minColumnWidth: number = 72,
): number {
  if (typeof widthPx === 'number' && !Number.isNaN(widthPx)) {
    return Math.max(minColumnWidth, widthPx);
  }
  if (typeof column.width === 'number' && !Number.isNaN(column.width)) {
    return Math.max(minColumnWidth, column.width);
  }
  if (typeof column.width === 'string') {
    const trimmed = column.width.trim();
    if (/^\d+(\.\d+)?px$/.test(trimmed)) {
      return Math.max(minColumnWidth, parseFloat(trimmed));
    }
    if (/^\d+(\.\d+)?rem$/.test(trimmed)) {
      return Math.max(minColumnWidth, parseFloat(trimmed) * 16);
    }
  }
  if (typeof column.minWidth === 'number' && !Number.isNaN(column.minWidth)) {
    return Math.max(minColumnWidth, column.minWidth);
  }
  if (typeof column.minWidth === 'string') {
    const trimmed = column.minWidth.trim();
    if (/^\d+(\.\d+)?px$/.test(trimmed)) {
      return Math.max(minColumnWidth, parseFloat(trimmed));
    }
  }
  return Math.max(minColumnWidth, 120);
}

export interface ComputeColumnStickyMetaOptions<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  columnWidths?: DataGridColumnWidths<T>;
  selectionMode?: DataGridSelectionMode;
  stickyFirstColumn?: boolean;
  minColumnWidth?: number;
}

export function computeColumnStickyMeta<T extends Record<string, unknown>>({
  columns,
  columnWidths = {},
  selectionMode = 'none',
  stickyFirstColumn = true,
  minColumnWidth = 72,
}: ComputeColumnStickyMetaOptions<T>): Map<string, ColumnStickyMeta> {
  const result = new Map<string, ColumnStickyMeta>();
  if (columns.length === 0) return result;

  const hasExplicitSticky = columns.some(
    (col) => col.sticky != null && col.sticky !== false,
  );

  const resolvePosition = (
    col: ColumnDef<T>,
    index: number,
  ): 'left' | 'right' | undefined => {
    if (col.sticky === 'left' || col.sticky === true) return 'left';
    if (col.sticky === 'right') return 'right';
    if (!hasExplicitSticky && stickyFirstColumn !== false && index === 0) {
      return 'left';
    }
    return undefined;
  };

  const positions: Array<'left' | 'right' | undefined> = columns.map((col, i) =>
    resolvePosition(col, i),
  );

  // Left sticky columns
  let currentLeft = selectionMode === 'multiple' ? CHECKBOX_COLUMN_WIDTH : 0;
  let lastLeftIndex = -1;
  for (let i = 0; i < columns.length; i++) {
    if (positions[i] === 'left') {
      lastLeftIndex = i;
    }
  }

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const key = columnKeyString(col.key);
    if (positions[i] === 'left') {
      const width = resolveColumnWidthPx(col, columnWidths[col.key], minColumnWidth);
      result.set(key, {
        isSticky: true,
        position: 'left',
        offset: currentLeft,
        isEdge: i === lastLeftIndex,
      });
      currentLeft += width;
    }
  }

  // Right sticky columns
  let currentRight = 0;
  let firstRightIndex = -1;
  for (let i = 0; i < columns.length; i++) {
    if (positions[i] === 'right' && firstRightIndex === -1) {
      firstRightIndex = i;
    }
  }

  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i];
    const key = columnKeyString(col.key);
    if (positions[i] === 'right') {
      const width = resolveColumnWidthPx(col, columnWidths[col.key], minColumnWidth);
      result.set(key, {
        isSticky: true,
        position: 'right',
        offset: currentRight,
        isEdge: i === firstRightIndex,
      });
      currentRight += width;
    }
  }

  // Set non-sticky columns
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const key = columnKeyString(col.key);
    if (!result.has(key)) {
      result.set(key, {
        isSticky: false,
        position: undefined,
        offset: 0,
        isEdge: false,
      });
    }
  }

  return result;
}

export function resolveColumnStyle<T extends Record<string, unknown>>(
  column: ColumnDef<T>,
  widthPx: number | undefined,
  minColumnWidth: number,
  stickyMeta?: ColumnStickyMeta,
): CSSProperties {
  const minFromDef = resolveDimension(column.minWidth);
  const widthFromDef = resolveDimension(column.width);

  const base: CSSProperties =
    widthPx != null
      ? {
          width: `${widthPx}px`,
          minWidth: minFromDef ?? `${Math.max(minColumnWidth, widthPx)}px`,
          maxWidth: `${widthPx}px`,
        }
      : {
          width: widthFromDef,
          minWidth: minFromDef ?? `${minColumnWidth}px`,
        };

  if (!stickyMeta?.isSticky || !stickyMeta.position) {
    return base;
  }

  return {
    ...base,
    position: 'sticky',
    ...(stickyMeta.position === 'left' ? { left: `${stickyMeta.offset}px` } : {}),
    ...(stickyMeta.position === 'right' ? { right: `${stickyMeta.offset}px` } : {}),
  };
}
