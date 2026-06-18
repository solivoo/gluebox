import type { ColumnDef, DataGridSortState } from '../type/DataGrid.types';
import type { UseColumnLayoutReturn } from '../type/DataGrid.types';
import { columnKeyString } from '../utils/columnLayoutUtils';

function SortIcon({ active, direction }: { active: boolean; direction?: 'asc' | 'desc' }) {
  return (
    <span
      className={[
        'glb-datagrid__sort-icon',
        active && 'glb-datagrid__sort-icon--active',
        active && direction === 'desc' && 'glb-datagrid__sort-icon--desc',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 2l3.5 4H2.5L6 2z" />
        <path d="M6 10L2.5 6h7L6 10z" opacity={active && direction === 'desc' ? 1 : 0.35} />
      </svg>
    </span>
  );
}

interface DataGridHeaderProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  columnLayout: UseColumnLayoutReturn<T>;
  selectionMode: 'none' | 'single' | 'multiple';
  stickyFirstColumn: boolean;
  sort: DataGridSortState<T> | null;
  isAllVisibleSelected: boolean;
  isSomeVisibleSelected: boolean;
  onToggleSort: (key: keyof T) => void;
  onToggleSelectAll: () => void;
}

export function DataGridHeader<T extends Record<string, unknown>>({
  columns,
  columnLayout,
  selectionMode,
  stickyFirstColumn,
  sort,
  isAllVisibleSelected,
  isSomeVisibleSelected,
  onToggleSort,
  onToggleSelectAll,
}: DataGridHeaderProps<T>) {
  const {
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
  } = columnLayout;

  return (
    <thead className="glb-datagrid__head">
      <tr>
        {selectionMode === 'multiple' && (
          <th
            scope="col"
            className="glb-datagrid__header-cell glb-datagrid__header-cell--checkbox glb-datagrid__cell--sticky glb-datagrid__cell--sticky-checkbox"
          >
            <input
              type="checkbox"
              className="glb-datagrid__checkbox"
              checked={isAllVisibleSelected}
              ref={(input) => {
                if (input) input.indeterminate = isSomeVisibleSelected;
              }}
              aria-label="Seleccionar todas las filas visibles"
              onChange={onToggleSelectAll}
            />
          </th>
        )}

        {columns.map((column, columnIndex) => {
          const key = columnKeyString(column.key);
          const isSorted = sort?.key === column.key;
          const sticky =
            stickyFirstColumn &&
            columnIndex === 0 &&
            selectionMode !== 'multiple';
          const stickyWithCheckbox =
            stickyFirstColumn && columnIndex === 0 && selectionMode === 'multiple';
          const canResize = isColumnResizable(column);
          const canReorder = isColumnReorderable(column);

          return (
            <th
              key={key}
              scope="col"
              draggable={canReorder}
              className={[
                'glb-datagrid__header-cell',
                column.align && `glb-datagrid__cell--${column.align}`,
                column.sortable && 'glb-datagrid__header-cell--sortable',
                canResize && 'glb-datagrid__header-cell--resizable',
                canReorder && 'glb-datagrid__header-cell--reorderable',
                dragOverKey === key && 'glb-datagrid__header-cell--drag-over',
                sticky && 'glb-datagrid__cell--sticky glb-datagrid__cell--sticky-first',
                stickyWithCheckbox &&
                  'glb-datagrid__cell--sticky glb-datagrid__cell--sticky-first-with-checkbox',
              ]
                .filter(Boolean)
                .join(' ')}
              style={getColumnStyle(column)}
              aria-sort={
                isSorted
                  ? sort?.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : column.sortable
                    ? 'none'
                    : undefined
              }
              onDragStart={(event) => onColumnDragStart(column, event)}
              onDragOver={(event) => onColumnDragOver(column, event)}
              onDragLeave={onColumnDragLeave}
              onDrop={(event) => onColumnDrop(column, event)}
              onDragEnd={onColumnDragEnd}
            >
              <div className="glb-datagrid__header-inner">
                {column.sortable ? (
                  <button
                    type="button"
                    className="glb-datagrid__header-button"
                    onClick={() => onToggleSort(column.key)}
                  >
                    <span>{column.header}</span>
                    <SortIcon active={isSorted} direction={sort?.direction} />
                  </button>
                ) : (
                  <span className="glb-datagrid__header-label">{column.header}</span>
                )}
              </div>

              {canResize && (
                <span
                  className="glb-datagrid__resize-handle"
                  role="separator"
                  aria-orientation="vertical"
                  aria-label={`Redimensionar columna ${column.header}`}
                  onMouseDown={(event) => onResizeStart(column, event)}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
