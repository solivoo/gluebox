export { DataGrid } from './DataGrid';

/** Headless: pipeline de datos (búsqueda, orden, selección interna). */
export { useDataGrid } from './hooks/useDataGrid';

/**
 * Orquestación completa del grid (layout, paginación, selección por página,
 * virtualización, estilos). Usar para UIs custom equivalentes a `<DataGrid />`.
 */
export { useDataGridController } from './controller/useDataGridController';
export type { DataGridControllerViewModel } from './controller/useDataGridController';

export { useVirtualRows } from './hooks/useVirtualRows';
export { usePagination } from './hooks/usePagination';
export { useColumnLayout } from './hooks/useColumnLayout';
export { computeVirtualRowsRange } from './utils/virtualRows';
export {
  resolveDataGridHeight,
  estimateViewportHeightPx,
} from './utils/resolveDataGridHeight';
export type {
  DataGridHeightMode,
  ResolveDataGridHeightOptions,
  ResolvedDataGridHeight,
} from './utils/resolveDataGridHeight';

export { normalizeDataGridProps } from './controller/normalizeDataGridProps';
export type { NormalizedDataGridProps } from './controller/normalizeDataGridProps';

export { defaultDataGridMessages, resolveDataGridMessages } from './i18n/defaultMessages';

export type { VirtualRowsRange } from './utils/virtualRows';
export type { UseVirtualRowsOptions, UseVirtualRowsReturn } from './hooks/useVirtualRows';

export type {
  DataGridProps,
  ColumnDef,
  DataGridSelectionMode,
  DataGridSortDirection,
  DataGridSortState,
  DataGridOnRowSelectHandler,
  DataGridOnSelectionChangeHandler,
  DataGridOnPageChangeHandler,
  DataGridOnPageSizeChangeHandler,
  DataGridPaginationMode,
  DataGridPaging,
  DataGridColumnWidths,
  DataGridSearchPosition,
  DataGridLayout,
  DataGridCardRenderContext,
  DataGridRenderCard,
  DataGridCardComponent,
  DataGridOnCardSelectHandler,
  DataGridMessages,
  UsePaginationOptions,
  UsePaginationReturn,
  UseColumnLayoutOptions,
  UseColumnLayoutReturn,
  UseDataGridOptions,
  UseDataGridReturn,
} from './type/DataGrid.types';

export type {
  DataGridTheme,
  DataGridThemePreset,
  DataGridThemeInput,
} from './theme/DataGrid.theme.types';

export { dataGridThemes } from './theme/defaultThemes';
