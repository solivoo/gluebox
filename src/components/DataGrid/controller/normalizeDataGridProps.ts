import type { DataGridPaging, DataGridProps } from '../type/DataGrid.types';

const DEFAULT_PAGE_SIZE = 20;

export interface NormalizedDataGridProps<T extends Record<string, unknown>> {
  data: T[];
  getRowId: (row: T) => string | number;
  /** Pager visible */
  pagination: boolean;
  /** Página interna 1-based (solo si pageIndex está controlado) */
  page: number | undefined;
  defaultPage: number;
  pageSize: number | undefined;
  defaultPageSize: number;
  pageControlled: boolean;
  pageSizeControlled: boolean;
}

function readKeyValue<T extends Record<string, unknown>>(
  row: T,
  keyExpr: keyof T | string,
): string | number {
  const value = row[keyExpr as keyof T];
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  if (value == null) {
    throw new Error(
      `[DataGrid] keyExpr "${String(keyExpr)}" devolvió un valor vacío en una fila.`,
    );
  }
  return String(value);
}

/**
 * Normaliza `dataSource`, `keyExpr` y `paging` a la forma interna del controller.
 */
export function normalizeDataGridProps<T extends Record<string, unknown>>(
  props: Readonly<
    Pick<DataGridProps<T>, 'dataSource' | 'keyExpr' | 'paging'>
  >,
): NormalizedDataGridProps<T> {
  const data = props.dataSource;
  if (!data) {
    throw new Error('[DataGrid] Se requiere `dataSource` con un array de filas.');
  }

  if (props.keyExpr == null || String(props.keyExpr).trim() === '') {
    throw new Error('[DataGrid] Se requiere `keyExpr` para identificar filas.');
  }

  const key = props.keyExpr;
  const getRowId = (row: T) => readKeyValue(row, key);

  const paging: DataGridPaging | undefined = props.paging;
  const usedPaging = paging != null;
  const pagination = usedPaging ? paging.enabled !== false : false;

  let page: number | undefined;
  let pageControlled = false;

  if (
    usedPaging &&
    typeof paging.pageIndex === 'number' &&
    !Number.isNaN(paging.pageIndex)
  ) {
    page = Math.max(0, paging.pageIndex) + 1;
    pageControlled = true;
  }

  let pageSize: number | undefined;
  let pageSizeControlled = false;

  if (
    usedPaging &&
    typeof paging.pageSize === 'number' &&
    !Number.isNaN(paging.pageSize) &&
    paging.pageSize > 0
  ) {
    pageSize = paging.pageSize;
    pageSizeControlled = true;
  }

  return {
    data,
    getRowId,
    pagination,
    page,
    defaultPage: 1,
    pageSize,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    pageControlled,
    pageSizeControlled,
  };
}
