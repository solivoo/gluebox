import type {
  ColumnDef,
  DataGridPaging,
  DataGridProps,
} from '../type/DataGrid.types';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export interface NormalizedDataGridProps<T extends Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSizeOptions: number[];
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

function describeReceived(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'Array';
  if (typeof value === 'object') return 'Object';
  return typeof value;
}

function looksLikeItemsWrapper(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    ('items' in value || 'Items' in value)
  );
}

/**
 * Valida `dataSource`: debe ser un Array (incluido `[]`).
 * No hace unwrap de `{ items }` / `{ Items }`.
 */
export function assertDataSource<T extends Record<string, unknown>>(
  dataSource: unknown,
): T[] {
  if (dataSource == null) {
    throw new Error('[DataGrid] Se requiere `dataSource` (array de filas).');
  }

  if (!Array.isArray(dataSource)) {
    const hint = looksLikeItemsWrapper(dataSource)
      ? ' ¿envoltorio `{ items }`? Pasá el array plano.'
      : '';
    throw new Error(
      `[DataGrid] \`dataSource\` debe ser un Array. Recibido: ${describeReceived(dataSource)}.${hint}`,
    );
  }

  return dataSource as T[];
}

export function assertColumns<T extends Record<string, unknown>>(
  columns: unknown,
): ColumnDef<T>[] {
  if (columns == null) {
    throw new Error('[DataGrid] Se requiere `columns` (array de columnas).');
  }

  if (!Array.isArray(columns)) {
    throw new Error(
      `[DataGrid] \`columns\` debe ser un Array. Recibido: ${describeReceived(columns)}.`,
    );
  }

  return columns as ColumnDef<T>[];
}

export function assertPageSizeOptions(
  pageSizeOptions: unknown,
): number[] | undefined {
  if (pageSizeOptions == null) return undefined;

  if (!Array.isArray(pageSizeOptions)) {
    throw new Error(
      `[DataGrid] \`pageSizeOptions\` debe ser un Array. Recibido: ${describeReceived(pageSizeOptions)}.`,
    );
  }

  return pageSizeOptions as number[];
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
 * Normaliza `dataSource`, `keyExpr`, `columns`, `paging` y `pageSizeOptions`
 * a la forma interna del controller.
 */
export function normalizeDataGridProps<T extends Record<string, unknown>>(
  props: Readonly<
    Pick<
      DataGridProps<T>,
      'dataSource' | 'keyExpr' | 'paging' | 'columns' | 'pageSizeOptions'
    >
  >,
): NormalizedDataGridProps<T> {
  const data = assertDataSource<T>(props.dataSource);
  const columns = assertColumns<T>(props.columns);
  const pageSizeOptions =
    assertPageSizeOptions(props.pageSizeOptions) ?? DEFAULT_PAGE_SIZE_OPTIONS;

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
    columns,
    pageSizeOptions,
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

/** Evita `for…of` / spread sobre valores no iterables. */
export function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
