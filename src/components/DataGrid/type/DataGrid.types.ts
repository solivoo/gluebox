import type { ComponentType, ReactNode } from 'react';
import type { DataGridMessages } from '../i18n/DataGrid.messages.types';
import type { DataGridThemeInput } from '../theme/DataGrid.theme.types';

/** Modo de selección de filas */
export type DataGridSelectionMode = 'none' | 'single' | 'multiple';

/** Dirección de ordenamiento */
export type DataGridSortDirection = 'asc' | 'desc';

/** Estado de ordenamiento activo */
export interface DataGridSortState<T extends Record<string, unknown>> {
  key: keyof T;
  direction: DataGridSortDirection;
}

/**
 * Definición de columna con inferencia estricta del key y del valor en renderCell.
 */
export type ColumnDef<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    /** Propiedad del objeto de datos */
    key: K;
    /** Título visible en el encabezado */
    header: string;
    /** Habilita ordenamiento al hacer clic en el header */
    sortable?: boolean;
    /** Ancho fijo de la columna */
    width?: string | number;
    /** Ancho mínimo de la columna */
    minWidth?: string | number;
    /** Alineación del contenido */
    align?: 'left' | 'center' | 'right';
    /** Renderizado personalizado de la celda */
    renderCell?: (value: T[K], row: T, rowIndex: number) => ReactNode;
    /** Permite redimensionar (si resizableColumns está activo) */
    resizable?: boolean;
    /** Permite reordenar por drag (si reorderableColumns está activo) */
    reorderable?: boolean;
  };
}[keyof T];

/** Anchos de columna en px por key */
export type DataGridColumnWidths<T extends Record<string, unknown>> = Partial<
  Record<keyof T, number>
>;

/** Modo de paginación */
export type DataGridPaginationMode = 'client' | 'server';

/** Posición del buscador en la toolbar */
export type DataGridSearchPosition = 'left' | 'right';

/** Presentación de los registros */
export type DataGridLayout = 'table' | 'card' | 'auto';

/** Contexto entregado a renderCard en layout card */
export interface DataGridCardRenderContext<T extends Record<string, unknown>> {
  row: T;
  rowIndex: number;
  selected: boolean;
  selectionMode: DataGridSelectionMode;
  columns: ColumnDef<T>[];
}

/** Función de renderizado personalizado de tarjeta */
export type DataGridRenderCard<T extends Record<string, unknown>> = (
  context: DataGridCardRenderContext<T>,
) => ReactNode;

/** Componente React para renderizar cada tarjeta en layout card */
export type DataGridCardComponent<T extends Record<string, unknown>> = ComponentType<
  Readonly<DataGridCardRenderContext<T>>
>;

/** Configuración de paginación del DataGrid. */
export interface DataGridPaging {
  /** Habilita el pager. Default `true` cuando se pasa el objeto `paging`. */
  enabled?: boolean;
  /** Página actual (**0-based**). */
  pageIndex?: number;
  /** Filas por página. Default `20` si no se indica. */
  pageSize?: number;
}

export interface DataGridProps<T extends Record<string, unknown>> {
  /** Fuente de datos: array de filas. */
  dataSource: T[];
  /** Definición de columnas */
  columns: ColumnDef<T>[];
  /** Nombre del campo clave único. Ej: `"id"`. */
  keyExpr: keyof T | string;
  /** Modo de selección: ninguna, única o múltiple */
  selectionMode?: DataGridSelectionMode;
  /** IDs seleccionados (modo controlado) */
  selectedRowIds?: Array<string | number>;
  /** Se dispara al seleccionar una fila en modo single */
  onRowSelect?: (row: T) => void;
  /** Se dispara cuando cambia el conjunto de filas seleccionadas */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Muestra el buscador integrado en la cabecera */
  showSearch?: boolean;
  /** Posición del buscador: izquierda o derecha de la toolbar */
  searchPosition?: DataGridSearchPosition;
  /** Placeholder del buscador */
  searchPlaceholder?: string;
  /** Ancho del campo de búsqueda (ej. "240px", 280, "100%") */
  searchWidth?: string | number;
  /** Claves sobre las que filtrar; por defecto todas las columnas visibles */
  searchKeys?: Array<keyof T>;
  /** Retraso del debounce de búsqueda en ms */
  debounceMs?: number;
  /** Fija la primera columna de datos al hacer scroll horizontal */
  stickyFirstColumn?: boolean;
  /**
   * Sin virtualización (fit-content): techo del grid (`max-height`). El cuerpo
   * crece con la altura real de las filas. Con virtualización: altura fija del viewport.
   * Con paginación/summary, aplica al bloque completo (tabla + pie).
   */
  height?: string | number;
  /**
   * Tope de crecimiento en fit-content. Si también hay `height`, prevalece `height` como techo.
   * Con virtualización, se usa como altura fija si no hay `height`.
   */
  maxHeight?: string | number;
  /**
   * Altura estimada de fila en px (solo modo virtual). Usá `'auto'` o
   * `autoRowHeight` para que en fit-content las filas midan su contenido real.
   */
  rowHeight?: number | 'auto';
  /**
   * En modo no virtualizado, las filas crecen con el contenido de las celdas
   * (nombre + email, etc.). Default `true`. Ignorado con virtualización activa.
   */
  autoRowHeight?: boolean;
  /** Activa virtualización de filas cuando hay muchos registros */
  virtualized?: boolean;
  /** Cantidad mínima de filas para activar virtualización automática */
  virtualThreshold?: number;
  /** Filas extra renderizadas fuera del viewport (buffer) */
  overscan?: number;
  /** Muestra contador total de registros (barra de resumen sobre el pie) */
  showRowCount?: boolean;
  /** Muestra contador de filas seleccionadas en la barra de resumen */
  showSelectionCount?: boolean;
  /** Presentación: table, card o auto (card si el contenedor es estrecho) */
  layout?: DataGridLayout;
  /** Renderizado personalizado de cada tarjeta cuando layout es card (función) */
  renderCard?: DataGridRenderCard<T>;
  /** Componente personalizado de cada tarjeta cuando layout es card */
  renderCardComponent?: DataGridCardComponent<T>;
  /** Se dispara al activar/seleccionar una tarjeta en layout card (entrega la fila) */
  onCardSelect?: (row: T) => void;
  /**
   * Con layout table: cambia a card cuando el ancho del grid ≤ cardBreakpoint.
   * Preferí layout="auto" para el mismo comportamiento.
   */
  cardOnMobile?: boolean;
  /** Ancho máximo del contenedor (px) para activar layout card en auto / cardOnMobile */
  cardBreakpoint?: number;
  /** Cantidad máxima de registros visibles por página o vista (limita pageSize y opciones) */
  maxRecords?: number;
  /** Paginación: `enabled`, `pageIndex` (0-based), `pageSize`. */
  paging?: DataGridPaging;
  /** Modo de paginación: client (slice local) o server (dataSource = página actual) */
  paginationMode?: DataGridPaginationMode;
  /** Opciones del selector de filas por página */
  pageSizeOptions?: number[];
  /** Total de registros en modo server (requerido si paginationMode="server") */
  totalRowCount?: number;
  /** Se dispara al cambiar de página (`pageIndex` **0-based**) */
  onPageChange?: (pageIndex: number) => void;
  /** Se dispara al cambiar el tamaño de página */
  onPageSizeChange?: (pageSize: number) => void;
  /** Habilita redimensionar columnas arrastrando el borde del header */
  resizableColumns?: boolean;
  /** Habilita reordenar columnas por drag & drop en el header */
  reorderableColumns?: boolean;
  /** Anchos de columna controlados (px por key) */
  columnWidths?: DataGridColumnWidths<T>;
  /** Anchos iniciales no controlados */
  defaultColumnWidths?: DataGridColumnWidths<T>;
  /** Callback al redimensionar columnas */
  onColumnWidthsChange?: (widths: DataGridColumnWidths<T>) => void;
  /** Orden de columnas controlado (array de keys) */
  columnOrder?: Array<keyof T>;
  /** Orden inicial no controlado */
  defaultColumnOrder?: Array<keyof T>;
  /** Callback al reordenar columnas */
  onColumnOrderChange?: (order: Array<keyof T>) => void;
  /** Ancho mínimo al redimensionar (px) */
  minColumnWidth?: number;
  /** Mensaje cuando no hay filas visibles */
  emptyMessage?: string;
  /** Estado de carga */
  loading?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del grid */
  width?: string | number;
  /** Preset o tema personalizado */
  theme?: DataGridThemeInput;
  /** Clases CSS adicionales */
  className?: string;
  /**
   * Textos del componente (i18n / white-label).
   * Las props `searchPlaceholder` y `emptyMessage` tienen prioridad si se definen.
   */
  messages?: Partial<DataGridMessages>;
}

/** Handler de onRowSelect */
export type DataGridOnRowSelectHandler<T extends Record<string, unknown>> = (
  row: T,
) => void;

/** Handler de onSelectionChange */
export type DataGridOnSelectionChangeHandler<T extends Record<string, unknown>> = (
  selectedRows: T[],
) => void;

/** Handler de onCardSelect (layout card) */
export type DataGridOnCardSelectHandler<T extends Record<string, unknown>> = (
  row: T,
) => void;

/** Handler de onPageChange (`pageIndex` 0-based) */
export type DataGridOnPageChangeHandler = (pageIndex: number) => void;

/** Handler de onPageSizeChange */
export type DataGridOnPageSizeChangeHandler = (pageSize: number) => void;

/** Opciones del hook usePagination */
export interface UsePaginationOptions {
  totalItems: number;
  enabled: boolean;
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

/** Retorno del hook usePagination */
export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  canPrevious: boolean;
  canNext: boolean;
  pageSizeOptions: number[];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  goToFirst: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToLast: () => void;
  sliceRows: <T>(rows: T[]) => T[];
}

export interface UseColumnLayoutOptions<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  resizableColumns?: boolean;
  reorderableColumns?: boolean;
  columnWidths?: DataGridColumnWidths<T>;
  defaultColumnWidths?: DataGridColumnWidths<T>;
  onColumnWidthsChange?: (widths: DataGridColumnWidths<T>) => void;
  columnOrder?: Array<keyof T>;
  defaultColumnOrder?: Array<keyof T>;
  onColumnOrderChange?: (order: Array<keyof T>) => void;
  minColumnWidth?: number;
}

export interface UseColumnLayoutReturn<T extends Record<string, unknown>> {
  orderedColumns: ColumnDef<T>[];
  getColumnStyle: (column: ColumnDef<T>) => import('react').CSSProperties;
  isColumnResizable: (column: ColumnDef<T>) => boolean;
  isColumnReorderable: (column: ColumnDef<T>) => boolean;
  dragOverKey: string | null;
  onResizeStart: (
    column: ColumnDef<T>,
    event: import('react').MouseEvent<HTMLElement>,
  ) => void;
  onColumnDragStart: (
    column: ColumnDef<T>,
    event: import('react').DragEvent<HTMLElement>,
  ) => void;
  onColumnDragOver: (
    column: ColumnDef<T>,
    event: import('react').DragEvent<HTMLElement>,
  ) => void;
  onColumnDragLeave: () => void;
  onColumnDrop: (
    column: ColumnDef<T>,
    event: import('react').DragEvent<HTMLElement>,
  ) => void;
  onColumnDragEnd: () => void;
}

/** Opciones del hook useDataGrid */
export interface UseDataGridOptions<T extends Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string | number;
  selectionMode?: DataGridSelectionMode;
  selectedRowIds?: Array<string | number>;
  searchKeys?: Array<keyof T>;
  debounceMs?: number;
  initialSort?: DataGridSortState<T> | null;
}

/** Retorno del hook useDataGrid */
export interface UseDataGridReturn<T extends Record<string, unknown>> {
  rawData: T[];
  filteredData: T[];
  sortedData: T[];
  displayRows: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearch: string;
  sort: DataGridSortState<T> | null;
  toggleSort: (key: keyof T) => void;
  selectedIds: Set<string | number>;
  selectedRows: T[];
  isRowSelected: (row: T) => boolean;
  toggleRow: (row: T) => void;
  selectAllVisible: () => void;
  clearSelection: () => void;
  isAllVisibleSelected: boolean;
  isSomeVisibleSelected: boolean;
}

export type { DataGridMessages } from '../i18n/DataGrid.messages.types';
