import type { DataGridProps } from './type/DataGrid.types';
import { useDataGridController } from './controller/useDataGridController';
import { DataGridToolbar } from './components/DataGridToolbar';
import { DataGridHeader } from './components/DataGridHeader';
import { DataGridBody } from './components/DataGridBody';
import { DataGridCardList } from './components/DataGridCardList';
import { DataGridPagination } from './components/DataGridPagination';
import { DataGridSummary } from './components/DataGridSummary';
import { DataGridLoading } from './components/DataGridLoading';
import '@/components/DataGrid/css/DataGrid.css';

/**
 * Tabla empresarial con búsqueda, ordenamiento, selección, paginación,
 * virtualización y layout responsive (tabla / tarjetas).
 *
 * La lógica de estado vive en {@link useDataGridController}; este componente
 * es la capa de presentación lista para integrar en aplicaciones.
 */
export function DataGrid<T extends Record<string, unknown>>(
  props: Readonly<DataGridProps<T>>,
) {
  const vm = useDataGridController(props);
  const { selection } = vm;

  return (
    <div
      ref={vm.rootRef}
      className={vm.classNames}
      style={vm.rootStyle}
      data-layout={vm.effectiveLayout}
    >
      <DataGridToolbar
        show={vm.showSearch}
        position={vm.searchPosition ?? 'left'}
        value={vm.grid.searchQuery}
        placeholder={vm.searchPlaceholder}
        searchWidth={vm.searchWidth}
        searchStyle={vm.searchStyle}
        onChange={vm.grid.setSearchQuery}
      />

      <div className={vm.surfaceClassNames}>
        <div
          className={vm.viewportClassNames}
          style={vm.isCardLayout ? vm.cardViewportStyle : vm.viewportStyle}
          data-virtual-row-height={vm.rowHeight}
          data-virtualized={vm.shouldVirtualize || undefined}
        >
          <div ref={vm.scrollRef} className={vm.scrollClassNames}>
            {vm.isCardLayout ? (
              <DataGridCardList
                rows={vm.rowsToRender}
                columns={vm.orderedColumns}
                getRowId={props.getRowId}
                selectionMode={vm.selectionMode ?? 'none'}
                emptyMessage={vm.emptyMessage}
                isRowSelected={vm.grid.isRowSelected}
                onCardActivate={selection.handleCardActivate}
                onCheckboxChange={selection.handleToggleRow}
                renderCard={vm.renderCard}
                renderCardComponent={vm.renderCardComponent}
              />
            ) : (
              <table className="glb-datagrid__table" role="grid">
                <DataGridHeader
                  columns={vm.orderedColumns}
                  columnLayout={vm.columnLayout}
                  selectionMode={vm.selectionMode ?? 'none'}
                  stickyFirstColumn={vm.stickyFirstColumn}
                  sort={vm.grid.sort}
                  isAllVisibleSelected={selection.isAllPageSelected}
                  isSomeVisibleSelected={selection.isSomePageSelected}
                  onToggleSort={vm.grid.toggleSort}
                  onToggleSelectAll={selection.handleToggleSelectAll}
                />

                <DataGridBody
                  rows={vm.rowsToRender}
                  columns={vm.orderedColumns}
                  getColumnStyle={vm.columnLayout.getColumnStyle}
                  getRowId={props.getRowId}
                  selectionMode={vm.selectionMode ?? 'none'}
                  stickyFirstColumn={vm.stickyFirstColumn}
                  emptyMessage={vm.emptyMessage}
                  virtualRange={vm.virtualRange}
                  isVirtualized={vm.shouldVirtualize}
                  isRowSelected={vm.grid.isRowSelected}
                  onRowClick={selection.handleRowClick}
                  onCheckboxChange={selection.handleToggleRow}
                />
              </table>
            )}
          </div>

          {vm.loading && (
            <DataGridLoading
              label={vm.messages.loading}
              ariaLabel={vm.messages.loadingAriaLabel}
            />
          )}
        </div>

        {vm.showSummary && (
          <DataGridSummary
            rowCount={vm.rowCount}
            selectedCount={vm.grid.selectedRows.length}
            showRowCount={vm.showRowCount}
            showSelectionCount={vm.showSelectionCount}
            showSelection={(vm.selectionMode ?? 'none') !== 'none'}
            virtualHint={vm.virtualHint}
            formatRowCount={vm.messages.rowCount}
            formatSelectedCount={vm.messages.selectedCount}
          />
        )}

        {vm.pagination && (
          <DataGridPagination
            pagination={vm.paginationState}
            disabled={vm.loading}
            messages={vm.messages}
          />
        )}
      </div>
    </div>
  );
}
