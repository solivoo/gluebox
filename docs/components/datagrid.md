# DataGrid — guía de uso

Tabla / tarjetas empresariales tipadas con `dataSource`, `keyExpr` y `paging`.

## Instalación rápida

```tsx
import { DataGrid } from 'glubox';
import type { ColumnDef } from 'glubox';
import 'glubox/style.css';
import 'glubox/themes/index.css';
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

## Datos — estructura esperada

El DataGrid espera **tres piezas tipadas**:

| Prop | Tipo | Rol |
|------|------|-----|
| `dataSource` | `T[]` | Array **plano** de filas (objetos). También válido: `[]`. |
| `keyExpr` | `keyof T \| string` | Nombre del campo clave único en cada fila (ej. `"id"`). |
| `columns` | `ColumnDef<T>[]` | Array de definiciones de columna. |

`T` debe extender `Record<string, unknown>` (objeto plano por fila).

### Forma de cada fila

```ts
// ✅ Cada elemento de dataSource es un objeto con campos estables
interface Employee extends Record<string, unknown> {
  id: number;          // ← keyExpr apunta a este campo
  name: string;
  email: string;
  department: string;
  status?: 'Activo' | 'Inactivo';
}

const dataSource: Employee[] = [
  { id: 1, name: 'Ana', email: 'ana@corp.com', department: 'Ventas', status: 'Activo' },
  { id: 2, name: 'Bruno', email: 'bruno@corp.com', department: 'IT' },
];
```

- Cada fila = **un objeto**.
- `keyExpr` debe existir en **todas** las filas y devolver `string` o `number` (si falta → error en runtime).
- Campos extra en la fila están permitidos; solo se muestran los que declares en `columns` (o uses en `renderCard`).

### Forma de `columns`

```ts
import type { ColumnDef } from 'glubox';

const columns: ColumnDef<Employee>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  {
    key: 'department',
    header: 'Depto',
    renderCell: (value) => <strong>{value}</strong>,
  },
];
```

| Campo | Descripción |
|-------|-------------|
| `key` | Propiedad de `T` (tipada) |
| `header` | Título visible |
| `sortable` | Orden al clic |
| `width` / `minWidth` / `align` | Layout |
| `renderCell` | UI custom: `(value, row, rowIndex) => ReactNode` |

### Uso correcto

```tsx
<DataGrid
  dataSource={employees}   // Employee[]
  keyExpr="id"
  columns={columns}        // ColumnDef<Employee>[]
/>
```

### Desde una API (respuesta con envoltorio)

El grid **no** desempaqueta `{ items }`, `{ Items }`, `{ data }`, etc. Pasá el array plano:

```tsx
// Respuesta típica del backend
const response = await fetch('/api/employees').then((r) => r.json());
// response = { items: [...], totalCount: 120 }

// ❌ Incorrecto — dataSource no es un Array
// <DataGrid dataSource={response} keyExpr="id" columns={columns} />

// ✅ Correcto
<DataGrid
  dataSource={response.items}
  keyExpr="id"
  columns={columns}
  paginationMode="server"
  totalRowCount={response.totalCount}
  paging={{ enabled: true, pageIndex, pageSize }}
/>
```

### Contrato runtime (`Array.isArray`)

| Valor | Resultado |
|-------|-----------|
| `[]` | OK — toolbar, empty message y pager |
| `[{ id: 1, … }]` | OK |
| `null` / `undefined` | Error: `` Se requiere `dataSource` (array de filas). `` |
| `{ items: [...] }` u otro objeto | Error: `` `dataSource` debe ser un Array. Recibido: Object. `` |
| `columns` / `pageSizeOptions` no-array | Error claro (mismo criterio) |

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
| `pageSizeOptions` | `[10, 25, 50, 100]` | Opciones del Select de gluBox (no un `<select>` nativo) |

El pager **no usa** un `<select>` nativo: el page-size es el [Select](/components/forms#select) de gluBox (portal / `position: fixed`), así que en `data-mode="dark"` no aparece el chrome blanco del SO. No hace falta estilar `.glb-datagrid__pagination-select` ni redefinir `--datagrid-*` en el consumidor.
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

## Búsqueda, toolbar y selección

| Prop | Default |
|------|---------|
| `showSearch` | `true` |
| `searchPosition` | `'left'` |
| `debounceMs` | `300` |
| `searchKeys` | todas las columnas |
| `toolbarLeft` / `toolbarRight` | — |
| `renderToolbar` | — |

La toolbar se muestra si hay search, slots o `renderToolbar`. Con `renderToolbar` se sustituye todo el contenido (el consumidor decide si pinta el search). `searchPosition` solo aplica sin `renderToolbar`.

Los slots **no filtran** por magia. El padre sigue siendo dueño de `dataSource`:

```tsx
import { DataGrid, Select, OptionGroup } from 'glubox';
import type { ColumnDef } from 'glubox';

const [module, setModule] = useState('all');
const [assignment, setAssignment] = useState('all');
const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

const dataSource = rows.filter((row) => {
  if (module !== 'all' && row.module !== module) return false;
  if (assignment === 'assigned' && !row.assigned) return false;
  if (assignment === 'unassigned' && row.assigned) return false;
  return true;
});

<DataGrid
  dataSource={dataSource}
  keyExpr="id"
  columns={columns}
  showSearch
  selectionMode="multiple"
  selectedRowIds={selectedIds}
  onSelectionChange={(visibleSelected) => {
    const visibleIdSet = new Set(dataSource.map((row) => row.id));
    const keptHidden = selectedIds.filter((id) => !visibleIdSet.has(Number(id)));
    setSelectedIds([...keptHidden, ...visibleSelected.map((row) => row.id)]);
  }}
  paging={{ enabled: true, pageSize: 8 }}
  toolbarRight={
    <>
      <Select
        size="sm"
        width={180}
        value={module}
        options={moduleOptions}
        onChange={setModule}
      />
      <OptionGroup
        size="sm"
        layout="segmented"
        value={assignment}
        options={[
          { value: 'all', label: 'Todos' },
          { value: 'assigned', label: 'Solo asignados' },
          { value: 'unassigned', label: 'Solo no asignados' },
        ]}
        onChange={setAssignment}
      />
    </>
  }
/>
```

1. El padre filtra el array (módulo, asignado/no) y lo pasa como `dataSource`.
2. El search interno filtra **encima** de ese `dataSource` (`searchKeys`).
3. `selectAllVisible` / el checkbox del header operan sobre las filas **visibles de la página**.
4. Con `selectedRowIds` controlado, el padre puede conservar IDs ocultos por su filtro (el grid no los borra solo).

`renderToolbar` recibe `DataGridToolbarContext`: `dataSource`, `filteredData`, `sortedData`, `displayRows` (página), `searchQuery` / `setSearchQuery`, `selectedIds` / `selectedRows`, `isAllVisibleSelected`, `selectAllVisible`, `clearSelection`, `rowCount`, `loading`.

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

Sin `theme`, DataGrid hereda `data-theme` / `data-mode` del `<html>` (filas, header, search y pager). No redefinas `--datagrid-*` en tu app.

La prop `theme` es un override puntual:

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

[Guía de temas](/guide/themes)

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
