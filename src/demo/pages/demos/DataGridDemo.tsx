import { useState } from 'react';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { DataGrid } from '@/components/DataGrid';
import type {
  ColumnDef,
  DataGridLayout,
  DataGridSearchPosition,
  DataGridSelectionMode,
} from '@/components/DataGrid';
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

function resolvePageIndex(props: DataGridPlaygroundDefaults): number {
  if (typeof props.pageIndex === 'number' && !Number.isNaN(props.pageIndex)) {
    return Math.max(0, props.pageIndex);
  }
  return 0;
}

function resolvePageSize(props: DataGridPlaygroundDefaults): number {
  if (typeof props.pageSize === 'number' && !Number.isNaN(props.pageSize) && props.pageSize > 0) {
    return props.pageSize;
  }
  return 20;
}

function resolvePageSizeOptions(props: DataGridPlaygroundDefaults): number[] {
  const raw = props.pageSizeOptions;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((n) => Number(n)).filter((n) => !Number.isNaN(n) && n > 0);
  }
  return [10, 20, 50, 100];
}

interface DataGridPlaygroundPreviewProps {
  props: DataGridPlaygroundDefaults;
  selectedRows: DemoEmployee[];
  setSelectedRows: (rows: DemoEmployee[]) => void;
  setLastSingle: (row: DemoEmployee | null) => void;
  setLastCard: (row: DemoEmployee | null) => void;
  lastSingle: DemoEmployee | null;
  lastCard: DemoEmployee | null;
}

function DataGridPlaygroundPreview({
  props,
  selectedRows,
  setSelectedRows,
  setLastSingle,
  setLastCard,
  lastSingle,
  lastCard,
}: DataGridPlaygroundPreviewProps) {
  const selectionMode = (props.selectionMode as DataGridSelectionMode) ?? 'multiple';
  const showControlled = selectionMode === 'multiple';
  const paginationMode = (props.paginationMode as 'client' | 'server') ?? 'client';
  const isServer = paginationMode === 'server';
  const layout = (props.layout as DataGridLayout) ?? 'auto';
  const showCardExample = layout === 'card' || layout === 'auto';
  const isCardLayoutProp = layout === 'card';
  const pagingEnabled = Boolean(props.pagingEnabled ?? true);

  const pageIndexFromProps = resolvePageIndex(props);
  const pageSizeFromProps = resolvePageSize(props);
  const pageSizeOptions = resolvePageSizeOptions(props);

  const [pageIndex, setPageIndex] = useState(pageIndexFromProps);
  const [pageSize, setPageSize] = useState(pageSizeFromProps);
  const [prevPageIndexProp, setPrevPageIndexProp] = useState(pageIndexFromProps);
  const [prevPageSizeProp, setPrevPageSizeProp] = useState(pageSizeFromProps);

  if (pageSizeFromProps !== prevPageSizeProp) {
    setPrevPageSizeProp(pageSizeFromProps);
    setPageSize(pageSizeFromProps);
    setPageIndex(0);
    setPrevPageIndexProp(pageIndexFromProps);
  } else if (pageIndexFromProps !== prevPageIndexProp) {
    setPrevPageIndexProp(pageIndexFromProps);
    setPageIndex(pageIndexFromProps);
  }

  const serverData = isServer
    ? demoEmployees.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
    : demoEmployees;

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageIndex(0);
  };

  return (
    <div className="dg-demo">
      <DataGrid<DemoEmployee>
        dataSource={isServer ? serverData : demoEmployees}
        keyExpr="id"
        columns={demoEmployeeColumns}
        selectionMode={selectionMode}
        showSearch={Boolean(props.showSearch ?? true)}
        searchPosition={(props.searchPosition as DataGridSearchPosition) ?? 'left'}
        stickyFirstColumn={Boolean(props.stickyFirstColumn ?? true)}
        loading={Boolean(props.loading)}
        height={
          props.height != null && String(props.height).trim() !== ''
            ? (props.height as string | number)
            : undefined
        }
        maxHeight={
          props.maxHeight != null && String(props.maxHeight).trim() !== ''
            ? (props.maxHeight as string | number)
            : undefined
        }
        fullWidth={Boolean(props.fullWidth ?? true)}
        width={
          props.width != null && String(props.width).trim() !== ''
            ? (props.width as string | number)
            : undefined
        }
        searchPlaceholder={(props.searchPlaceholder as string) ?? 'Buscar empleados...'}
        searchWidth={
          props.searchWidth != null && String(props.searchWidth).trim() !== ''
            ? (props.searchWidth as string | number)
            : undefined
        }
        selectedRowIds={showControlled ? selectedRows.map((row) => row.id) : undefined}
        onRowSelect={(row) => setLastSingle(row)}
        onSelectionChange={setSelectedRows}
        debounceMs={(props.debounceMs as number) ?? 300}
        rowHeight={
          props.rowHeight === 'auto'
            ? 'auto'
            : typeof props.rowHeight === 'number'
              ? props.rowHeight
              : 44
        }
        autoRowHeight={
          props.autoRowHeight === undefined
            ? true
            : Boolean(props.autoRowHeight)
        }
        virtualized={Boolean(props.virtualized ?? true)}
        virtualThreshold={(props.virtualThreshold as number) ?? 30}
        overscan={(props.overscan as number) ?? 5}
        showRowCount={Boolean(props.showRowCount ?? true)}
        showSelectionCount={Boolean(props.showSelectionCount ?? true)}
        paging={{
          enabled: pagingEnabled,
          pageIndex,
          pageSize,
        }}
        paginationMode={paginationMode}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        totalRowCount={isServer ? demoEmployees.length : undefined}
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

      <section className="dg-demo__card-example">
        <h3 className="dg-demo__card-example-title">
          Caso pocas filas (2 registros)
        </h3>
        <p className="dg-demo__card-example-desc">
          <code>dataSource</code> + <code>keyExpr</code> + <code>paging</code>.
          Sin <code>height</code> se encoge a las filas. Responde al actuador.
        </p>
        <FewRowsExampleGrid
          pagingEnabled={pagingEnabled}
          pageSizeOptions={pageSizeOptions}
          showSearch={Boolean(props.showSearch ?? true)}
          showRowCount={Boolean(props.showRowCount ?? true)}
          height={
            props.height != null && String(props.height).trim() !== ''
              ? (props.height as string | number)
              : undefined
          }
          maxHeight={
            props.maxHeight != null && String(props.maxHeight).trim() !== ''
              ? (props.maxHeight as string | number)
              : undefined
          }
          autoRowHeight={
            props.autoRowHeight === undefined
              ? true
              : Boolean(props.autoRowHeight)
          }
          theme={props.theme as never}
        />
      </section>

      {showCardExample && (
        <section className="dg-demo__card-example">
          <h3 className="dg-demo__card-example-title">Ejemplo con renderCard</h3>
          <p className="dg-demo__card-example-desc">
            Grid independiente con tarjeta personalizada vía{' '}
            <code>renderCardComponent</code> y evento <code>onCardSelect</code>.
          </p>
          <CardExampleGrid onCardSelect={setLastCard} onRowSelect={setLastCard} />
        </section>
      )}

      <aside className="dg-demo__panel" aria-live="polite">
        <h3 className="dg-demo__panel-title">Eventos</h3>
        <p>
          <strong>Paginación:</strong> pageIndex {pageIndex}, {pageSize} filas/página
          {isServer ? ' (server)' : ' (client)'}
          {pagingEnabled ? '' : ' — off'}
        </p>
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
}

const fewOperators: DemoEmployee[] = [
  {
    id: 1,
    name: 'Admin Licencias',
    email: 'admin.licencias@ecunexo.local',
    department: 'Super administrador',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Test Op',
    email: 'test-op@ecunexo.local',
    department: 'Emisor',
    status: 'Activo',
  },
];

const fewOperatorColumns: ColumnDef<DemoEmployee>[] = [
  {
    key: 'name',
    header: 'Operador',
    sortable: true,
    minWidth: 220,
    renderCell: (_value, row) => {
      const initials = row.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');

      return (
        <div className="dg-demo-operator">
          <span className="dg-demo-operator__avatar" aria-hidden>
            {initials}
          </span>
          <span className="dg-demo-operator__meta">
            <span className="dg-demo-operator__name">{row.name}</span>
            <span className="dg-demo-operator__email">{row.email}</span>
          </span>
        </div>
      );
    },
  },
  {
    key: 'department',
    header: 'Rol',
    sortable: true,
    minWidth: 160,
    renderCell: (value) => (
      <span className="dg-demo-role">{String(value)}</span>
    ),
  },
];

interface FewRowsExampleGridProps {
  pagingEnabled: boolean;
  pageSizeOptions: number[];
  showSearch: boolean;
  showRowCount: boolean;
  height?: string | number;
  maxHeight?: string | number;
  autoRowHeight: boolean;
  theme?: DataGridPlaygroundDefaults['theme'];
}

function FewRowsExampleGrid({
  pagingEnabled,
  pageSizeOptions,
  showSearch,
  showRowCount,
  height,
  maxHeight,
  autoRowHeight,
  theme,
}: FewRowsExampleGridProps) {
  // Paginación propia: no compartir pageIndex con el grid principal
  // (con 2 filas, totalPages=1 y el clamp forzaba volver a página 0).
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid<DemoEmployee>
      dataSource={fewOperators}
      keyExpr="id"
      columns={fewOperatorColumns}
      selectionMode="none"
      showSearch={showSearch}
      searchPlaceholder="Buscar operadores..."
      paging={{
        enabled: pagingEnabled,
        pageIndex,
        pageSize,
      }}
      pageSizeOptions={pageSizeOptions}
      onPageChange={setPageIndex}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPageIndex(0);
      }}
      height={height}
      maxHeight={maxHeight}
      autoRowHeight={autoRowHeight}
      virtualized={false}
      showRowCount={showRowCount}
      showSelectionCount={false}
      theme={theme as never}
      messages={{
        rowCount: (count) =>
          count === 1 ? '1 operador' : `${count} operadores`,
      }}
    />
  );
}

function CardExampleGrid({
  onCardSelect,
  onRowSelect,
}: {
  onCardSelect: (row: DemoEmployee) => void;
  onRowSelect: (row: DemoEmployee) => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  return (
    <DataGrid<DemoEmployee>
      dataSource={demoEmployees.slice(0, 120)}
      keyExpr="id"
      columns={demoEmployeeCardColumns}
      layout="card"
      selectionMode="single"
      renderCardComponent={DemoEmployeeCard}
      onCardSelect={onCardSelect}
      onRowSelect={onRowSelect}
      showSearch
      searchPlaceholder="Buscar en cards personalizadas..."
      paging={{
        enabled: true,
        pageIndex,
        pageSize,
      }}
      pageSizeOptions={[5, 10]}
      onPageChange={setPageIndex}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPageIndex(0);
      }}
      maxRecords={10}
      virtualized={false}
      showRowCount
      showSelectionCount={false}
    />
  );
}

export function DataGridDemo() {
  const [selectedRows, setSelectedRows] = useState<DemoEmployee[]>([]);
  const [lastSingle, setLastSingle] = useState<DemoEmployee | null>(null);
  const [lastCard, setLastCard] = useState<DemoEmployee | null>(null);

  return (
    <ComponentPlayground<DataGridPlaygroundDefaults>
      meta={dataGridMeta}
      renderPreview={(props) => (
        <DataGridPlaygroundPreview
          props={props}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setLastSingle={setLastSingle}
          setLastCard={setLastCard}
          lastSingle={lastSingle}
          lastCard={lastCard}
        />
      )}
    />
  );
}
