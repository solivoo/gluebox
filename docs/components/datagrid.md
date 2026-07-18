# DataGrid — guía de uso

Tabla / tarjetas empresariales tipadas con `dataSource`, `keyExpr` y `paging`.

## Instalación rápida

```tsx
import { DataGrid } from 'glubox';
import type { ColumnDef } from 'glubox';
import 'glubox/style.css';
```

## Primer grid

```tsx
interface Employee extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  department: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'department', header: 'Departamento', sortable: true },
];

const employees: Employee[] = [
  { id: 1, name: 'Ana García', email: 'ana@corp.com', department: 'Ventas' },
  { id: 2, name: 'Bruno López', email: 'bruno@corp.com', department: 'IT' },
];

export function EmployeesGrid() {
  return (
    <DataGrid
      dataSource={employees}
      keyExpr="id"
      columns={columns}
      paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
      selectionMode="multiple"
      showSearch
      searchPlaceholder="Buscar..."
      onSelectionChange={(rows) => console.log(rows)}
    />
  );
}
```

Sin `height` ni `maxHeight`, el grid **se encoge** a las filas de la página (table y card).

---

## Datos

| Prop | Rol |
|------|-----|
| `dataSource` | Array de filas (**requerido**) |
| `keyExpr` | Nombre del campo clave, ej. `"id"` (**requerido**) |
| `columns` | Definición de columnas |

```tsx
<DataGrid dataSource={rows} keyExpr="id" columns={columns} />
```

---

## Paginación: `paging`

```tsx
paging={{
  enabled: true,   // default true si pasás el objeto paging
  pageIndex: 0,    // 0-based
  pageSize: 20,    // filas por página
}}
```

| Prop | Default | Descripción |
|------|---------|-------------|
| `paging.enabled` | `true` (si hay `paging`) | Muestra el pager |
| `paging.pageIndex` | no controlado | Página **0-based** |
| `paging.pageSize` | `20` (inicial) | Filas visibles por página |
| `pageSizeOptions` | `[10, 25, 50, 100]` | Opciones del selector |
| `paginationMode` | `'client'` | `'client'` slice local · `'server'` vos traés la página |
| `totalRowCount` | — | Total en modo **server** |

### Controlado

`onPageChange` recibe `pageIndex` **0-based**:

```tsx
const [pageIndex, setPageIndex] = useState(0);
const [pageSize, setPageSize] = useState(10);

<DataGrid
  dataSource={rows}
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex, pageSize }}
  onPageChange={setPageIndex}
  onPageSizeChange={(size) => {
    setPageSize(size);
    setPageIndex(0);
  }}
/>
```

### Modo server

```tsx
<DataGrid
  dataSource={pageRows}
  keyExpr="id"
  columns={columns}
  paginationMode="server"
  totalRowCount={totalFromApi}
  paging={{ enabled: true, pageIndex, pageSize }}
  onPageChange={(index) => fetchPage(index, pageSize)}
/>
```

Sin objeto `paging`, la paginación queda **desactivada**.

---

## Altura

| Situación | Comportamiento |
|-----------|----------------|
| Sin `height` / `maxHeight` | Crece con las filas visibles (contenido real de celdas) |
| `height={500}` o `maxHeight={500}` | Techo; scroll interno si hay más filas |
| Virtualización activa | Necesita `height` o `maxHeight`; usa `rowHeight` fijo |

```tsx
<DataGrid dataSource={twoRows} keyExpr="id" columns={cols} paging={{ pageSize: 10 }} />

<DataGrid dataSource={many} keyExpr="id" columns={cols} height={480} paging={{ pageSize: 25 }} />
```

| Prop | Default | Uso |
|------|---------|-----|
| `autoRowHeight` | `true` | Filas según contenido (nombre + email, etc.) |
| `rowHeight` | `44` | Solo virtualización (`number` o `'auto'`) |

---

## Layout: tabla y tarjetas

| `layout` | Comportamiento |
|----------|----------------|
| `auto` (default) | Tabla ancha; cards si el ancho ≤ `cardBreakpoint` (640) |
| `table` | Siempre tabla |
| `card` | Siempre tarjetas |

```tsx
<DataGrid
  dataSource={rows}
  keyExpr="id"
  columns={columns}
  layout="auto"
  paging={{ enabled: true, pageSize: 8 }}
  renderCardComponent={EmployeeCard}
  onCardSelect={(row) => console.log(row)}
/>
```

`paging`, `dataSource` y `keyExpr` aplican igual en **table** y **card**.

---

## Columnas

```tsx
const columns: ColumnDef<Employee>[] = [
  {
    key: 'name',
    header: 'Operador',
    sortable: true,
    minWidth: 220,
    renderCell: (_value, row) => (
      <div>
        <strong>{row.name}</strong>
        <div>{row.email}</div>
      </div>
    ),
  },
  { key: 'department', header: 'Depto', sortable: true },
];
```

| Campo | Descripción |
|-------|-------------|
| `key` | Propiedad de `T` |
| `header` | Título |
| `sortable` | Orden al clic |
| `width` / `minWidth` | Dimensiones |
| `align` | `left` \| `center` \| `right` |
| `renderCell` | UI custom tipada |

`resizableColumns` / `reorderableColumns` / `stickyFirstColumn` en el grid.

---

## Búsqueda y selección

| Prop | Default |
|------|---------|
| `showSearch` | `true` |
| `searchPosition` | `'left'` |
| `debounceMs` | `300` |
| `searchKeys` | todas las columnas |

| `selectionMode` | Eventos |
|-----------------|---------|
| `none` | — |
| `single` | `onRowSelect(row)` |
| `multiple` | checkboxes + `onSelectionChange(rows[])` |

Controlado: `selectedRowIds` + `onSelectionChange`. “Seleccionar todo” afecta solo la **página visible**.

---

## Virtualización

Solo layout **table**, y solo si hay `height` o `maxHeight` y suficientes filas (`virtualThreshold`, default 30).

| Prop | Default |
|------|---------|
| `virtualized` | `true` |
| `virtualThreshold` | `30` |
| `rowHeight` | `44` (estimado fijo) |
| `overscan` | `5` |

Con virtualización, `autoRowHeight` no aplica.

---

## Temas e i18n

```tsx
import { DataGrid, dataGridThemes, defaultDataGridMessages } from 'glubox';

<DataGrid
  theme="enterprise-dark"
  messages={{
    ...defaultDataGridMessages,
    rowsPerPage: 'Filas por página',
    rowCount: (n) => (n === 1 ? '1 registro' : `${n} registros`),
  }}
  dataSource={rows}
  keyExpr="id"
  columns={columns}
/>
```

---

## Arquitectura (avanzado)

| Capa | Rol |
|------|-----|
| `<DataGrid />` | Presentación |
| `normalizeDataGridProps` | `dataSource` / `keyExpr` / `paging` → forma interna |
| `useDataGridController` | Orquestación (layout, filas, estilos) |
| `useDataGrid` | Filtro, orden, selección headless |

```tsx
import { useDataGridController } from 'glubox';

const vm = useDataGridController({
  dataSource: rows,
  keyExpr: 'id',
  columns,
  paging: { enabled: true, pageSize: 10 },
});
```

---

## Tipos de eventos

| Tipo | Signatura |
|------|-----------|
| `DataGridOnRowSelectHandler<T>` | `(row: T) => void` |
| `DataGridOnSelectionChangeHandler<T>` | `(selectedRows: T[]) => void` |
| `DataGridOnCardSelectHandler<T>` | `(row: T) => void` |
| `DataGridOnPageChangeHandler` | `(pageIndex: number) => void` — **0-based** |
| `DataGridOnPageSizeChangeHandler` | `(pageSize: number) => void` |

Ver [Tipos de eventos](/guide/event-types).

## Demo

`pnpm dev` → `/componentes/datagrid`
