import type {
  ColumnDef,
  DataGridCardComponent,
  DataGridCardRenderContext,
  DataGridRenderCard,
  DataGridSelectionMode,
} from '../type/DataGrid.types';
import { columnKeyString } from '../utils/columnLayoutUtils';
import { normalizeId } from '../utils/gridUtils';

interface DataGridCardListProps<T extends Record<string, unknown>> {
  rows: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string | number;
  selectionMode: DataGridSelectionMode;
  emptyMessage: string;
  isRowSelected: (row: T) => boolean;
  onCardActivate: (row: T) => void;
  onCheckboxChange: (row: T) => void;
  renderCard?: DataGridRenderCard<T>;
  renderCardComponent?: DataGridCardComponent<T>;
}

function DefaultCardContent<T extends Record<string, unknown>>({
  row,
  rowIndex,
  columns,
}: {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
}) {
  const [titleColumn, ...detailColumns] = columns;
  const titleValue = titleColumn
    ? titleColumn.renderCell
      ? titleColumn.renderCell(row[titleColumn.key], row, rowIndex)
      : String(row[titleColumn.key] ?? '')
    : null;

  return (
    <>
      {titleColumn && <div className="glb-datagrid__card-title">{titleValue}</div>}
      {detailColumns.length > 0 && (
        <dl className="glb-datagrid__card-fields">
          {detailColumns.map((column) => {
            const value = row[column.key];
            const content = column.renderCell
              ? column.renderCell(value, row, rowIndex)
              : String(value ?? '');

            return (
              <div key={columnKeyString(column.key)} className="glb-datagrid__card-field">
                <dt className="glb-datagrid__card-label">{column.header}</dt>
                <dd className="glb-datagrid__card-value">{content}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </>
  );
}

export function DataGridCardList<T extends Record<string, unknown>>({
  rows,
  columns,
  getRowId,
  selectionMode,
  emptyMessage,
  isRowSelected,
  onCardActivate,
  onCheckboxChange,
  renderCard,
  renderCardComponent,
}: DataGridCardListProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="glb-datagrid__cards-empty" role="status">
        {emptyMessage}
      </div>
    );
  }

  const isInteractive = selectionMode !== 'none';
  const usesCustomCard = renderCard != null || renderCardComponent != null;
  const CardComponent = renderCardComponent;

  return (
    <ul className="glb-datagrid__cards" role="list">
      {rows.map((row, rowIndex) => {
        const rowId = normalizeId(getRowId(row));
        const selected = isRowSelected(row);
        const context: DataGridCardRenderContext<T> = {
          row,
          rowIndex,
          selected,
          selectionMode,
          columns,
        };

        return (
          <li key={rowId}>
            <article
              className={[
                'glb-datagrid__card',
                selected && 'glb-datagrid__card--selected',
                isInteractive && 'glb-datagrid__card--interactive',
                usesCustomCard && 'glb-datagrid__card--custom',
              ]
                .filter(Boolean)
                .join(' ')}
              data-row-id={rowId}
              aria-selected={selected || undefined}
              onClick={() => onCardActivate(row)}
            >
              {selectionMode === 'multiple' && (
                <div className="glb-datagrid__card-actions">
                  <input
                    type="checkbox"
                    className="glb-datagrid__checkbox glb-datagrid__card-checkbox"
                    checked={selected}
                    aria-label={`Seleccionar registro ${rowId}`}
                    onClick={(event) => event.stopPropagation()}
                    onChange={() => onCheckboxChange(row)}
                  />
                </div>
              )}

              <div className="glb-datagrid__card-content">
                {renderCard ? (
                  renderCard(context)
                ) : CardComponent ? (
                  <CardComponent {...context} />
                ) : (
                  <DefaultCardContent row={row} rowIndex={rowIndex} columns={columns} />
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
