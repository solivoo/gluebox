import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { ColumnDef, ColumnStickyMeta } from '../type/DataGrid.types';
import { normalizeId } from '../utils/gridUtils';
import { columnKeyString } from '../utils/columnLayoutUtils';

interface DataGridRowProps<T extends Record<string, unknown>> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  getColumnStyle: (column: ColumnDef<T>) => CSSProperties;
  getColumnStickyMeta?: (column: ColumnDef<T>) => ColumnStickyMeta | undefined;
  getRowId: (row: T) => string | number;
  selectionMode: 'none' | 'single' | 'multiple';
  isSelected: boolean;
  stickyFirstColumn: boolean;
  onRowClick: (row: T) => void;
  onCheckboxChange: (row: T) => void;
}

function DataGridRowInner<T extends Record<string, unknown>>({
  row,
  rowIndex,
  columns,
  getColumnStyle,
  getColumnStickyMeta,
  getRowId,
  selectionMode,
  isSelected,
  stickyFirstColumn: _stickyFirstColumn,
  onRowClick,
  onCheckboxChange,
}: DataGridRowProps<T>) {
  const rowId = normalizeId(getRowId(row));
  const isInteractive = selectionMode !== 'none';
  const isAlt = rowIndex % 2 === 1;

  return (
    <tr
      className={[
        'glb-datagrid__row',
        isAlt && 'glb-datagrid__row--alt',
        isSelected && 'glb-datagrid__row--selected',
        isInteractive && 'glb-datagrid__row--interactive',
      ]
        .filter(Boolean)
        .join(' ')}
      data-row-id={rowId}
      aria-selected={isSelected || undefined}
      onClick={() => onRowClick(row)}
    >
      {selectionMode === 'multiple' && (
        <td className="glb-datagrid__cell glb-datagrid__cell--checkbox glb-datagrid__cell--sticky glb-datagrid__cell--sticky-checkbox">
          <input
            type="checkbox"
            className="glb-datagrid__checkbox"
            checked={isSelected}
            aria-label={`Seleccionar fila ${rowId}`}
            onClick={(event) => event.stopPropagation()}
            onChange={() => onCheckboxChange(row)}
          />
        </td>
      )}

      {columns.map((column, columnIndex) => {
        const value = row[column.key];
        const content = column.renderCell
          ? column.renderCell(value, row, rowIndex)
          : String(value ?? '');

        const stickyMeta = getColumnStickyMeta?.(column);

        return (
          <td
            key={columnKeyString(column.key)}
            className={[
              'glb-datagrid__cell',
              column.align && `glb-datagrid__cell--${column.align}`,
              stickyMeta?.isSticky && 'glb-datagrid__cell--sticky',
              stickyMeta?.position === 'left' && 'glb-datagrid__cell--sticky-left',
              stickyMeta?.position === 'right' && 'glb-datagrid__cell--sticky-right',
              stickyMeta?.isEdge &&
                stickyMeta.position === 'left' &&
                'glb-datagrid__cell--sticky-edge-left',
              stickyMeta?.isEdge &&
                stickyMeta.position === 'right' &&
                'glb-datagrid__cell--sticky-edge-right',
              stickyMeta?.position === 'left' &&
                columnIndex === 0 &&
                (selectionMode === 'multiple'
                  ? 'glb-datagrid__cell--sticky-first-with-checkbox'
                  : 'glb-datagrid__cell--sticky-first'),
            ]
              .filter(Boolean)
              .join(' ')}
            style={getColumnStyle(column)}
          >
            {content}
          </td>
        );
      })}
    </tr>
  );
}

export const DataGridRow = memo(DataGridRowInner) as typeof DataGridRowInner;
