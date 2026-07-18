import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';
import type { DataGridProps } from '../type/DataGrid.types';
import { useDataGrid } from '../hooks/useDataGrid';
import { useVirtualRows } from '../hooks/useVirtualRows';
import { usePagination } from '../hooks/usePagination';
import { useColumnLayout } from '../hooks/useColumnLayout';
import { useEffectiveLayout } from '../layout/useEffectiveLayout';
import { useDerivedPaginationConfig } from './derivePaginationConfig';
import { normalizeDataGridProps } from './normalizeDataGridProps';
import { useDataGridSelection } from './useDataGridSelection';
import { resolveTheme, themeToStyle } from '../theme/resolveTheme';
import {
  isDimensionSet,
  normalizeId,
  resolveDimension,
} from '../utils/gridUtils';
import { resolveDataGridHeight } from '../utils/resolveDataGridHeight';
import {
  resolveDataGridMessages,
} from '../i18n/defaultMessages';
import type { DataGridMessages } from '../i18n/DataGrid.messages.types';
import type { UsePaginationReturn } from '../type/DataGrid.types';
import type { UseColumnLayoutReturn } from '../type/DataGrid.types';
import type { UseDataGridReturn } from '../type/DataGrid.types';
import type { VirtualRowsRange } from '../utils/virtualRows';

export interface DataGridControllerViewModel<T extends Record<string, unknown>> {
  rootRef: RefObject<HTMLDivElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
  grid: UseDataGridReturn<T>;
  columnLayout: UseColumnLayoutReturn<T>;
  orderedColumns: UseColumnLayoutReturn<T>['orderedColumns'];
  paginationState: UsePaginationReturn;
  rowsToRender: T[];
  getRowId: (row: T) => string | number;
  effectiveLayout: 'table' | 'card';
  isCardLayout: boolean;
  useResponsiveCard: boolean;
  shouldVirtualize: boolean;
  virtualRange: VirtualRowsRange;
  selection: ReturnType<typeof useDataGridSelection<T>>;
  messages: DataGridMessages;
  searchPlaceholder: string;
  emptyMessage: string;
  showSearch: boolean;
  searchPosition: DataGridProps<T>['searchPosition'];
  searchWidth: DataGridProps<T>['searchWidth'];
  showSummary: boolean;
  showRowCount: boolean;
  showSelectionCount: boolean;
  selectionMode: DataGridProps<T>['selectionMode'];
  pagination: boolean;
  loading: boolean;
  stickyFirstColumn: boolean;
  virtualHint?: string;
  rowCount: number;
  rootStyle: CSSProperties;
  surfaceStyle: CSSProperties | undefined;
  viewportStyle: CSSProperties;
  cardViewportStyle: CSSProperties;
  searchStyle: CSSProperties | undefined;
  classNames: string;
  surfaceClassNames: string;
  viewportClassNames: string;
  scrollClassNames: string;
  renderCard: DataGridProps<T>['renderCard'];
  renderCardComponent: DataGridProps<T>['renderCardComponent'];
  rowHeight: number;
}

export function useDataGridController<T extends Record<string, unknown>>(
  props: Readonly<DataGridProps<T>>,
): DataGridControllerViewModel<T> {
  const normalized = normalizeDataGridProps(props);
  const {
    data,
    columns,
    pageSizeOptions,
    getRowId,
    pagination,
    page,
    defaultPage,
    pageSize,
    defaultPageSize,
  } = normalized;

  const {
    selectionMode = 'none',
    selectedRowIds,
    onRowSelect,
    onSelectionChange,
    showSearch = true,
    searchPosition = 'left',
    searchPlaceholder,
    searchWidth,
    searchKeys,
    debounceMs = 300,
    stickyFirstColumn = true,
    height,
    maxHeight,
    rowHeight: rowHeightProp = 44,
    autoRowHeight: autoRowHeightProp,
    virtualized = true,
    virtualThreshold = 30,
    overscan = 5,
    showRowCount = true,
    showSelectionCount = true,
    layout = 'auto',
    renderCard,
    renderCardComponent,
    onCardSelect,
    cardOnMobile = false,
    cardBreakpoint = 640,
    maxRecords,
    paginationMode = 'client',
    totalRowCount,
    onPageChange,
    onPageSizeChange,
    resizableColumns = false,
    reorderableColumns = false,
    columnWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    columnOrder,
    defaultColumnOrder,
    onColumnOrderChange,
    minColumnWidth = 72,
    emptyMessage: emptyMessageProp,
    loading = false,
    fullWidth = true,
    width,
    theme,
    className,
    messages: messagesPartial,
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const prevSelectionRef = useRef<string>('');

  const messages = useMemo(
    () => resolveDataGridMessages(messagesPartial),
    [messagesPartial],
  );

  const resolvedSearchPlaceholder = searchPlaceholder ?? messages.searchPlaceholder;
  const resolvedEmptyMessage = emptyMessageProp ?? messages.emptyMessage;

  const grid = useDataGrid({
    data,
    columns,
    getRowId,
    selectionMode,
    selectedRowIds,
    searchKeys,
    debounceMs,
  });

  const columnLayout = useColumnLayout({
    columns,
    resizableColumns,
    reorderableColumns,
    columnWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    columnOrder,
    defaultColumnOrder,
    onColumnOrderChange,
    minColumnWidth,
  });

  const { orderedColumns } = columnLayout;

  const { effectiveLayout, isCardLayout, useResponsiveCard } = useEffectiveLayout(
    layout,
    cardOnMobile,
    cardBreakpoint,
    rootRef,
  );

  const paginationConfig = useDerivedPaginationConfig({
    maxRecords,
    pageSizeOptions,
    defaultPageSize,
    pageSize,
    isCardLayout,
    pagination,
  });

  const filteredTotal =
    paginationMode === 'server'
      ? (totalRowCount ?? data.length)
      : grid.displayRows.length;

  /** API pública: pageIndex 0-based; internamente usePagination es 1-based. */
  const emitPageChange = useMemo(
    () =>
      onPageChange
        ? (page1Based: number) => onPageChange(Math.max(0, page1Based - 1))
        : undefined,
    [onPageChange],
  );

  const paginationState = usePagination({
    totalItems: filteredTotal,
    enabled: pagination,
    page,
    defaultPage,
    pageSize: paginationConfig.effectiveControlledPageSize,
    defaultPageSize: paginationConfig.effectiveDefaultPageSize,
    pageSizeOptions: paginationConfig.effectivePageSizeOptions,
    onPageChange: emitPageChange,
    onPageSizeChange,
  });

  const { setPage: resetPaginationPage } = paginationState;

  const rowsToRender = useMemo(() => {
    let rows: T[];
    if (!pagination) {
      rows = grid.displayRows;
    } else if (paginationMode === 'server') {
      rows = grid.displayRows;
    } else {
      rows = paginationState.sliceRows(grid.displayRows);
    }

    if (!pagination && paginationConfig.resolvedMaxRecords != null) {
      return rows.slice(0, paginationConfig.resolvedMaxRecords);
    }

    return rows;
  }, [
    pagination,
    paginationMode,
    grid.displayRows,
    paginationState,
    paginationConfig.resolvedMaxRecords,
  ]);

  const selection = useDataGridSelection({
    data,
    getRowId,
    selectionMode,
    selectedRowIds,
    rowsToRender,
    grid,
    onRowSelect,
    onSelectionChange,
    onCardSelect,
  });

  const rowCount = grid.displayRows.length;

  const numericRowHeight =
    typeof rowHeightProp === 'number' && !Number.isNaN(rowHeightProp)
      ? rowHeightProp
      : 44;

  const isHeightConstrained =
    isDimensionSet(height) || isDimensionSet(maxHeight);

  // Virtualización solo con altura acotada (necesita viewport medible).
  const shouldVirtualize =
    !isCardLayout &&
    virtualized &&
    rowsToRender.length >= virtualThreshold &&
    isHeightConstrained;

  const autoRowHeight =
    !shouldVirtualize &&
    (rowHeightProp === 'auto' ||
      (autoRowHeightProp !== undefined
        ? autoRowHeightProp
        : true));

  const rowHeight = numericRowHeight;

  const virtualRange = useVirtualRows({
    scrollRef,
    rowCount: rowsToRender.length,
    rowHeight,
    enabled: shouldVirtualize,
    overscan,
  });

  useEffect(() => {
    if (selectedRowIds !== undefined) return;

    const signature = grid.selectedRows
      .map((row) => normalizeId(getRowId(row)))
      .join('|');
    if (signature === prevSelectionRef.current) return;
    prevSelectionRef.current = signature;

    if (selectionMode === 'single' && grid.selectedRows.length === 1) {
      onRowSelect?.(grid.selectedRows[0]);
    }
    if (selectionMode !== 'none') {
      onSelectionChange?.(grid.selectedRows);
    }
  }, [
    grid.selectedRows,
    getRowId,
    onRowSelect,
    onSelectionChange,
    selectionMode,
    selectedRowIds,
  ]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = 0;
  }, [
    grid.debouncedSearch,
    grid.sort,
    paginationState.page,
    paginationState.pageSize,
  ]);

  useEffect(() => {
    if (!pagination || paginationMode !== 'client') return;
    if (page === undefined) {
      resetPaginationPage(1);
    } else {
      emitPageChange?.(1);
    }
  }, [
    grid.debouncedSearch,
    grid.sort,
    pagination,
    paginationMode,
    page,
    resetPaginationPage,
    emitPageChange,
  ]);

  const themeStyle = themeToStyle(resolveTheme(theme));

  const showSummary =
    showRowCount || (showSelectionCount && selectionMode !== 'none');

  /**
   * Fit-content (table y card, no virtual): crece con altura REAL;
   * height/maxHeight = techo. Virtualizado: altura fija.
   */
  const useFitContent = !shouldVirtualize;
  const hasChrome = Boolean(pagination || showSummary);
  const resolvedHeight = resolveDataGridHeight({
    height,
    maxHeight,
    virtualized: shouldVirtualize,
    hasChrome,
  });

  const rootStyle: CSSProperties = {
    ...themeStyle,
    ['--datagrid-row-height' as string]: `${rowHeight}px`,
    ...(fullWidth ? { width: '100%' } : {}),
    ...(width != null ? { width: resolveDimension(width) } : {}),
  };

  const surfaceStyle: CSSProperties | undefined = (() => {
    if (resolvedHeight.applyTo !== 'surface') return undefined;
    if (resolvedHeight.mode === 'fixed') {
      return { height: resolvedHeight.height };
    }
    if (resolvedHeight.mode === 'max') {
      return { height: 'auto', maxHeight: resolvedHeight.maxHeight };
    }
    return undefined;
  })();

  const viewportStyle: CSSProperties = (() => {
    if (resolvedHeight.applyTo === 'surface') {
      if (resolvedHeight.mode === 'auto') {
        return { height: 'auto' };
      }
      return {
        height: 'auto',
        flex: resolvedHeight.mode === 'fixed' ? '1 1 0%' : '1 1 auto',
        minHeight: 0,
      };
    }

    if (resolvedHeight.mode === 'fixed') {
      return { height: resolvedHeight.height };
    }
    if (resolvedHeight.mode === 'max') {
      return { height: 'auto', maxHeight: resolvedHeight.maxHeight };
    }
    return { height: 'auto' };
  })();

  /** Misma lógica de altura para layout card (sin forzar viewport fijo). */
  const cardViewportStyle: CSSProperties = viewportStyle;

  const searchStyle: CSSProperties | undefined =
    searchWidth != null
      ? {
          width: resolveDimension(searchWidth),
          flex: '0 0 auto',
          maxWidth: 'none',
          minWidth: resolveDimension(searchWidth),
        }
      : undefined;

  const classNames = [
    'glb-datagrid',
    fullWidth && 'glb-datagrid--full-width',
    stickyFirstColumn && !isCardLayout && 'glb-datagrid--sticky-first',
    shouldVirtualize && 'glb-datagrid--virtualized',
    autoRowHeight && 'glb-datagrid--auto-row-height',
    useFitContent && 'glb-datagrid--fit-content',
    pagination && 'glb-datagrid--paginated',
    isCardLayout && 'glb-datagrid--card-layout',
    useResponsiveCard && isCardLayout && 'glb-datagrid--responsive-card',
    loading && 'glb-datagrid--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderedCount =
    virtualRange.endIndex >= virtualRange.startIndex
      ? virtualRange.endIndex - virtualRange.startIndex + 1
      : 0;

  const virtualHint =
    showRowCount && shouldVirtualize && rowsToRender.length > 0
      ? messages.virtualHint(renderedCount)
      : undefined;

  const surfaceConstrained =
    hasChrome &&
    (resolvedHeight.mode === 'fixed' || resolvedHeight.mode === 'max');

  const surfaceClassNames = [
    'glb-datagrid__surface',
    pagination && 'glb-datagrid__surface--paginated',
    showSummary && 'glb-datagrid__surface--with-summary',
    showSummary && !pagination && 'glb-datagrid__surface--summary-only',
    surfaceConstrained && 'glb-datagrid__surface--sized',
    surfaceConstrained &&
      resolvedHeight.mode === 'max' &&
      'glb-datagrid__surface--fit-content',
    useFitContent && !surfaceConstrained && 'glb-datagrid__surface--fit-content',
  ]
    .filter(Boolean)
    .join(' ');

  const scrollClassNames = [
    'glb-datagrid__scroll',
    isCardLayout && 'glb-datagrid__scroll--cards',
    useFitContent && 'glb-datagrid__scroll--fit-content',
  ]
    .filter(Boolean)
    .join(' ');

  const viewportClassNames = [
    'glb-datagrid__viewport',
    useFitContent && 'glb-datagrid__viewport--fit-content',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    rootRef,
    scrollRef,
    grid,
    columnLayout,
    orderedColumns,
    paginationState,
    rowsToRender,
    getRowId,
    effectiveLayout,
    isCardLayout,
    useResponsiveCard,
    shouldVirtualize,
    virtualRange,
    selection,
    messages,
    searchPlaceholder: resolvedSearchPlaceholder,
    emptyMessage: resolvedEmptyMessage,
    showSearch,
    searchPosition,
    searchWidth,
    showSummary,
    showRowCount,
    showSelectionCount,
    selectionMode,
    pagination,
    loading,
    stickyFirstColumn,
    virtualHint,
    rowCount,
    rootStyle,
    surfaceStyle,
    viewportStyle,
    cardViewportStyle,
    viewportClassNames,
    searchStyle,
    classNames,
    surfaceClassNames,
    scrollClassNames,
    renderCard,
    renderCardComponent,
    rowHeight,
  };
}
