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

function resolvePageSize(props: DataGridPlaygroundDefaults): number {
  if (typeof props.pageSize === 'number' && !Number.isNaN(props.pageSize)) {
    return props.pageSize;
  }
  if (typeof props.defaultPageSize === 'number' && !Number.isNaN(props.defaultPageSize)) {
    return props.defaultPageSize;
  }
  return 25;
}

function resolvePage(props: DataGridPlaygroundDefaults): number {
  if (typeof props.page === 'number' && !Number.isNaN(props.page)) {
    return Math.max(1, props.page);
  }
  return 1;
}

function resolvePageSizeOptions(props: DataGridPlaygroundDefaults): number[] {
  const raw = props.pageSizeOptions;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((n) => Number(n)).filter((n) => !Number.isNaN(n) && n > 0);
  }
  return [10, 25, 50, 100];
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

  const pageFromProps = resolvePage(props);
  const pageSizeFromProps = resolvePageSize(props);
  const pageSizeOptions = resolvePageSizeOptions(props);

  const [currentPage, setCurrentPage] = useState(pageFromProps);
  const [currentPageSize, setCurrentPageSize] = useState(pageSizeFromProps);
  const [prevPageProp, setPrevPageProp] = useState(pageFromProps);
  const [prevPageSizeProp, setPrevPageSizeProp] = useState(pageSizeFromProps);

  // Sincronizar con el actuador sin useEffect (evita renders en cascada).
  if (pageSizeFromProps !== prevPageSizeProp) {
    setPrevPageSizeProp(pageSizeFromProps);
    setCurrentPageSize(pageSizeFromProps);
    setCurrentPage(1);
    setPrevPageProp(pageFromProps);
  } else if (pageFromProps !== prevPageProp) {
    setPrevPageProp(pageFromProps);
    setCurrentPage(pageFromProps);
  }

  const serverData = isServer
    ? demoEmployees.slice(
        (currentPage - 1) * currentPageSize,
        currentPage * currentPageSize,
      )
    : demoEmployees;

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };

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
        pagination={Boolean(props.pagination ?? true)}
        paginationMode={paginationMode}
        page={currentPage}
        pageSize={currentPageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setCurrentPage}
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
          Celda de 2 líneas (nombre + email + avatar) con{' '}
          <code>autoRowHeight</code> (default). Responde al actuador
          (paginación, pageSize, height, etc.).
        </p>
        <FewRowsExampleGrid
          pagination={Boolean(props.pagination ?? true)}
          page={currentPage}
          pageSize={currentPageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
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
          <strong>Paginación:</strong> página {currentPage}, {currentPageSize} filas/página
          {isServer ? ' (server)' : ' (client)'}
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
  pagination: boolean;
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  showSearch: boolean;
  showRowCount: boolean;
  height?: string | number;
  maxHeight?: string | number;
  autoRowHeight: boolean;
  theme?: DataGridPlaygroundDefaults['theme'];
}

function FewRowsExampleGrid({
  pagination,
  page,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  showSearch,
  showRowCount,
  height,
  maxHeight,
  autoRowHeight,
  theme,
}: FewRowsExampleGridProps) {
  return (
    <DataGrid<DemoEmployee>
      data={fewOperators}
      columns={fewOperatorColumns}
      getRowId={(row) => row.id}
      selectionMode="none"
      showSearch={showSearch}
      searchPlaceholder="Buscar operadores..."
      pagination={pagination}
      page={page}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <DataGrid<DemoEmployee>
      data={demoEmployees.slice(0, 120)}
      columns={demoEmployeeCardColumns}
      getRowId={(row) => row.id}
      layout="card"
      selectionMode="single"
      renderCardComponent={DemoEmployeeCard}
      onCardSelect={onCardSelect}
      onRowSelect={onRowSelect}
      showSearch
      searchPlaceholder="Buscar en cards personalizadas..."
      pagination
      page={page}
      pageSize={pageSize}
      pageSizeOptions={[5, 10]}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
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
