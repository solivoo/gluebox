import { useState } from 'react';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { DataGrid } from '@/components/DataGrid';
import type { DataGridLayout, DataGridSearchPosition, DataGridSelectionMode } from '@/components/DataGrid';
import { dataGridMeta, type DataGridPlaygroundDefaults } from '@/demo/metadata/dataGridMeta';
import {
  demoEmployeeColumns,
  demoEmployees,
  type DemoEmployee,
} from '@/demo/data/dataGridDemoData';
import {
  DemoEmployeeCard,
  demoEmployeeCardColumns,
} from '@/demo/data/DemoEmployeeCard';
import './DataGridDemo.css';

export function DataGridDemo() {
  const [selectedRows, setSelectedRows] = useState<DemoEmployee[]>([]);
  const [lastSingle, setLastSingle] = useState<DemoEmployee | null>(null);
  const [lastCard, setLastCard] = useState<DemoEmployee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <ComponentPlayground<DataGridPlaygroundDefaults>
      meta={dataGridMeta}
      renderPreview={(props) => {
        const selectionMode = (props.selectionMode as DataGridSelectionMode) ?? 'multiple';
        const showControlled = selectionMode === 'multiple';
        const paginationMode = (props.paginationMode as 'client' | 'server') ?? 'client';
        const isServer = paginationMode === 'server';
        const pageSize = (props.defaultPageSize as number) ?? 25;
        const layout = (props.layout as DataGridLayout) ?? 'auto';
        const showCardExample = layout === 'card' || layout === 'auto';
        const isCardLayoutProp = layout === 'card';
        const serverData = isServer
          ? demoEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          : demoEmployees;

        return (
          <div className="dg-demo">
            <DataGrid<DemoEmployee>
              data={isServer ? serverData : demoEmployees}
              columns={demoEmployeeColumns}
              getRowId={(row) => row.id}
              selectionMode={selectionMode}
              showSearch={Boolean(props.showSearch ?? true)}
              searchPosition={(props.searchPosition as DataGridSearchPosition) ?? 'left'}
              stickyFirstColumn={Boolean(props.stickyFirstColumn ?? true)}
              loading={Boolean(props.loading)}
              height={props.height as string | number | undefined}
              fullWidth={Boolean(props.fullWidth ?? true)}
              width={
                props.width != null && String(props.width).trim() !== ''
                  ? (props.width as string | number)
                  : undefined
              }
              searchPlaceholder={
                (props.searchPlaceholder as string) ?? 'Buscar empleados...'
              }
              searchWidth={
                props.searchWidth != null && String(props.searchWidth).trim() !== ''
                  ? (props.searchWidth as string | number)
                  : undefined
              }
              selectedRowIds={
                showControlled ? selectedRows.map((row) => row.id) : undefined
              }
              onRowSelect={(row) => setLastSingle(row)}
              onSelectionChange={setSelectedRows}
              debounceMs={(props.debounceMs as number) ?? 300}
              rowHeight={(props.rowHeight as number) ?? 44}
              virtualized={Boolean(props.virtualized ?? true)}
              virtualThreshold={(props.virtualThreshold as number) ?? 30}
              overscan={(props.overscan as number) ?? 5}
              showRowCount={Boolean(props.showRowCount ?? true)}
              showSelectionCount={Boolean(props.showSelectionCount ?? true)}
              pagination={Boolean(props.pagination ?? true)}
              paginationMode={paginationMode}
              page={isServer ? currentPage : undefined}
              defaultPageSize={pageSize}
              totalRowCount={isServer ? demoEmployees.length : undefined}
              onPageChange={isServer ? setCurrentPage : undefined}
              resizableColumns={Boolean(props.resizableColumns ?? true)}
              reorderableColumns={Boolean(props.reorderableColumns ?? true)}
              layout={layout}
              cardOnMobile={Boolean(props.cardOnMobile ?? true)}
              cardBreakpoint={(props.cardBreakpoint as number) ?? 640}
              onCardSelect={isCardLayoutProp ? setLastCard : undefined}
              maxRecords={
                typeof props.maxRecords === 'number' && !Number.isNaN(props.maxRecords)
                  ? props.maxRecords
                  : undefined
              }
              theme={props.theme as never}
            />

            {showCardExample && (
              <section className="dg-demo__card-example">
                <h3 className="dg-demo__card-example-title">Ejemplo con renderCard</h3>
                <p className="dg-demo__card-example-desc">
                  Grid independiente con tarjeta personalizada vía{' '}
                  <code>renderCardComponent</code> y evento <code>onCardSelect</code>.
                </p>
                <DataGrid<DemoEmployee>
                  data={demoEmployees.slice(0, 120)}
                  columns={demoEmployeeCardColumns}
                  getRowId={(row) => row.id}
                  layout="card"
                  selectionMode="single"
                  renderCardComponent={DemoEmployeeCard}
                  onCardSelect={setLastCard}
                  onRowSelect={setLastCard}
                  showSearch
                  searchPlaceholder="Buscar en cards personalizadas..."
                  pagination
                  defaultPageSize={5}
                  maxRecords={10}
                  pageSizeOptions={[5, 10]}
                  virtualized={false}
                  showRowCount
                  showSelectionCount={false}
                />
              </section>
            )}

            <aside className="dg-demo__panel" aria-live="polite">
              <h3 className="dg-demo__panel-title">Eventos</h3>
              {isCardLayoutProp && lastCard && (
                <p>
                  <strong>onCardSelect:</strong> {lastCard.name} ({lastCard.department})
                </p>
              )}
              {selectionMode === 'single' && lastSingle && (
                <p>
                  <strong>onRowSelect:</strong> {lastSingle.name}
                </p>
              )}
              {selectionMode !== 'none' && (
                <p>
                  <strong>Seleccionadas ({selectedRows.length}):</strong>{' '}
                  {selectedRows.length > 0
                    ? selectedRows.map((row) => row.name).join(', ')
                    : '—'}
                </p>
              )}
            </aside>
          </div>
        );
      }}
    />
  );
}
