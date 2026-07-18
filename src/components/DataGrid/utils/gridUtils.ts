import type { DataGridSortState } from '../type/DataGrid.types';

export function normalizeId(id: string | number): string {
  return String(id);
}

export function toComparableString(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value instanceof Date) return value.toISOString();
  return JSON.stringify(value);
}

export function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  return toComparableString(a).localeCompare(toComparableString(b), undefined, {
    sensitivity: 'base',
    numeric: true,
  });
}

function asRowArray<T>(rows: T[] | unknown): T[] {
  return Array.isArray(rows) ? (rows as T[]) : [];
}

export function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  sort: DataGridSortState<T> | null,
): T[] {
  const safeRows = asRowArray<T>(rows);
  if (!sort) return safeRows;

  const sorted = [...safeRows];
  sorted.sort((rowA, rowB) => {
    const cmp = compareValues(rowA[sort.key], rowB[sort.key]);
    return sort.direction === 'asc' ? cmp : -cmp;
  });
  return sorted;
}

export function filterRowsBySearch<T extends Record<string, unknown>>(
  rows: T[],
  query: string,
  keys: Array<keyof T>,
): T[] {
  const safeRows = asRowArray<T>(rows);
  const safeKeys = Array.isArray(keys) ? keys : [];
  const normalized = query.trim().toLowerCase();
  if (!normalized) return safeRows;

  return safeRows.filter((row) =>
    safeKeys.some((key) =>
      toComparableString(row[key]).toLowerCase().includes(normalized),
    ),
  );
}

export function resolveDimension(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    return `${value}px`;
  }
  return String(value);
}

/** True si el valor define una dimensión usable (no vacío). */
export function isDimensionSet(value: string | number | undefined): boolean {
  if (value == null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}
