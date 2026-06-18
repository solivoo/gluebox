import type { CSSProperties } from 'react';
import type { ColumnDef, DataGridSelectionMode } from '../type/DataGrid.types';
import type { VirtualRowsRange } from '../utils/virtualRows';
import { normalizeId } from '../utils/gridUtils';
import { DataGridRow } from './DataGridRow';

interface DataGridBodyProps<T extends Record<string, unknown>> {
  rows: T[];
  columns: ColumnDef<T>[];
  getColumnStyle: (column: ColumnDef<T>) => CSSProperties;
  getRowId: (row: T) => string | number;
  selectionMode: DataGridSelectionMode;
  stickyFirstColumn: boolean;
  emptyMessage: string;
  virtualRange: VirtualRowsRange;
  isVirtualized: boolean;
  isRowSelected: (row: T) => boolean;
  onRowClick: (row: T) => void;
  onCheckboxChange: (row: T) => void;
}

export function DataGridBody<T extends Record<string, unknown>>({
  rows,
  columns,
  getColumnStyle,
  getRowId,
  selectionMode,
  stickyFirstColumn,
  emptyMessage,
  virtualRange,
  isVirtualized,
  isRowSelected,
  onRowClick,
  onCheckboxChange,
}: DataGridBodyProps<T>) {
  const colSpan = columns.length + (selectionMode === 'multiple' ? 1 : 0);

  if (rows.length === 0) {
    return (
      <tbody className="glb-datagrid__body">
        <tr>
          <td className="glb-datagrid__empty" colSpan={colSpan}>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  const startIndex = isVirtualized ? virtualRange.startIndex : 0;
  const endIndex = isVirtualized ? virtualRange.endIndex : rows.length - 1;
  const visibleRows = rows.slice(startIndex, endIndex + 1);

  return (
    <tbody className="glb-datagrid__body">
      {isVirtualized && virtualRange.paddingTop > 0 && (
        <tr className="glb-datagrid__spacer" aria-hidden="true">
          <td
            className="glb-datagrid__spacer-cell"
            colSpan={colSpan}
            style={{ height: virtualRange.paddingTop }}
          />
        </tr>
      )}

      {visibleRows.map((row, index) => {
        const rowIndex = startIndex + index;
        return (
          <DataGridRow
            key={normalizeId(getRowId(row))}
            row={row}
            rowIndex={rowIndex}
            columns={columns}
            getColumnStyle={getColumnStyle}
            getRowId={getRowId}
            selectionMode={selectionMode}
            isSelected={isRowSelected(row)}
            stickyFirstColumn={stickyFirstColumn}
            onRowClick={onRowClick}
            onCheckboxChange={onCheckboxChange}
          />
        );
      })}

      {isVirtualized && virtualRange.paddingBottom > 0 && (
        <tr className="glb-datagrid__spacer" aria-hidden="true">
          <td
            className="glb-datagrid__spacer-cell"
            colSpan={colSpan}
            style={{ height: virtualRange.paddingBottom }}
          />
        </tr>
      )}
    </tbody>
  );
}
