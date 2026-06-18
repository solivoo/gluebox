import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { ColumnDef } from '../type/DataGrid.types';
import { normalizeId } from '../utils/gridUtils';
import { columnKeyString } from '../utils/columnLayoutUtils';

interface DataGridRowProps<T extends Record<string, unknown>> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  getColumnStyle: (column: ColumnDef<T>) => CSSProperties;
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
  getRowId,
  selectionMode,
  isSelected,
  stickyFirstColumn,
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

        const sticky =
          stickyFirstColumn &&
          columnIndex === 0 &&
          selectionMode !== 'multiple';

        const stickyWithCheckbox =
          stickyFirstColumn && columnIndex === 0 && selectionMode === 'multiple';

        return (
          <td
            key={columnKeyString(column.key)}
            className={[
              'glb-datagrid__cell',
              column.align && `glb-datagrid__cell--${column.align}`,
              sticky && 'glb-datagrid__cell--sticky glb-datagrid__cell--sticky-first',
              stickyWithCheckbox &&
                'glb-datagrid__cell--sticky glb-datagrid__cell--sticky-first-with-checkbox',
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
