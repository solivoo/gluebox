import type { CSSProperties } from 'react';
import type { ColumnDef } from '../type/DataGrid.types';
import { resolveDimension } from './gridUtils';

export function columnKeyString<T extends Record<string, unknown>>(
  key: keyof T,
): string {
  return String(key);
}

export function normalizeColumnOrder<T extends Record<string, unknown>>(
  columns: ColumnDef<T>[],
  order?: Array<keyof T>,
): Array<keyof T> {
  const keys = columns.map((column) => column.key);
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

export function resolveColumnStyle<T extends Record<string, unknown>>(
  column: ColumnDef<T>,
  widthPx: number | undefined,
  minColumnWidth: number,
): CSSProperties {
  const minFromDef = resolveDimension(column.minWidth);
  const widthFromDef = resolveDimension(column.width);

  if (widthPx != null) {
    return {
      width: `${widthPx}px`,
      minWidth: minFromDef ?? `${Math.max(minColumnWidth, widthPx)}px`,
      maxWidth: `${widthPx}px`,
    };
  }

  return {
    width: widthFromDef,
    minWidth: minFromDef ?? `${minColumnWidth}px`,
  };
}
