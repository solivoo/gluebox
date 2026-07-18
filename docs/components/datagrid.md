# DataGrid

Tabla empresarial con tipado estricto, búsqueda con debounce, ordenamiento, selección, paginación client/server, virtualización de filas y layout responsive (tabla o tarjetas).

## Arquitectura

| Capa | Responsabilidad |
|------|-----------------|
| `<DataGrid />` | Presentación: ensambla toolbar, viewport, resumen y paginación |
| `useDataGridController` | Orquestación: layout, filas visibles, efectos, estilos derivados |
| `useDataGrid` | Pipeline de datos: filtrado, orden y selección (headless) |
| `usePagination` / `useColumnLayout` / `useVirtualRows` | Features reutilizables para UIs custom |

## Importación

```tsx
import {
  DataGrid,
  useDataGrid,
  useDataGridController,
  dataGridThemes,
  defaultDataGridMessages,
} from 'glubox';

import type {
  ColumnDef,
  DataGridProps,
  DataGridMessages,
} from 'glubox';

import 'glubox/style.css';
```

## Uso básico

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

const data: Employee[] = [
  { id: 1, name: 'Ana García', email: 'ana@corp.com', department: 'Ventas' },
];

<DataGrid
  data={data}
  columns={columns}
  getRowId={(row) => row.id}
  selectionMode="multiple"
  onSelectionChange={(rows) => console.log(rows)}
/>
```

## Layout: tabla, tarjetas o automático

| `layout` | Comportamiento |
|----------|----------------|
| `auto` (default) | Tabla en contenedores anchos; tarjetas si el ancho del grid ≤ `cardBreakpoint` (640px) |
| `table` | Siempre tabla |
| `card` | Siempre tarjetas |

```tsx
<DataGrid
  layout="auto"
  cardBreakpoint={640}
  renderCardComponent={EmployeeCard}
  onCardSelect={(row) => console.log('activada', row)}
  ...
/>
```

Con `renderCard` o `renderCardComponent` personalizás cada tarjeta. Los datos están en `context.row`, no en un evento `e.data`.

## Internacionalización

Pasá `messages` para sobreescribir textos (paginación, resumen, loading). Las props `searchPlaceholder` y `emptyMessage` tienen prioridad.

```tsx
<DataGrid
  messages={{
  ...defaultDataGridMessages,
  rowsPerPage: 'Rows per page',
  rowCount: (n) => `${n} record${n === 1 ? '' : 's'}`,
  }}
  searchPlaceholder="Search employees..."
  ...
/>
```

## ColumnDef

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `key` | `keyof T` | Propiedad del objeto de datos |
| `header` | `string` | Título del encabezado |
| `sortable` | `boolean` | Habilita orden asc/desc al clic |
| `width` / `minWidth` | `string \| number` | Dimensiones de columna |
| `align` | `'left' \| 'center' \| 'right'` | Alineación |
| `renderCell` | `(value, row, index) => ReactNode` | UI personalizada con tipado estricto |
| `resizable` / `reorderable` | `boolean` | Por columna, si el grid lo permite |

## Búsqueda

El buscador integrado filtra con **debounce** (`debounceMs`, default 300 ms). Por defecto busca en todas las columnas; limitá con `searchKeys`.

| Prop | Default | Descripción |
|------|---------|-------------|
| `showSearch` | `true` | Muestra el buscador |
| `searchPosition` | `'left'` | `'left'` o `'right'` |
| `searchWidth` | — | Ancho fijo del campo |

## Selección

| `selectionMode` | Comportamiento |
|-----------------|----------------|
| `none` | Sin selección |
| `single` | Clic en fila → `onRowSelect(row)` |
| `multiple` | Checkboxes por página + `onSelectionChange(rows[])` |

Modo controlado: `selectedRowIds` + `onSelectionChange`. El “seleccionar todo” del header afecta **solo la página visible**.

## Hooks headless

### `useDataGrid`

Pipeline de filtrado, orden y selección (sin layout ni paginación):

```tsx
const grid = useDataGrid({
  data,
  columns,
  getRowId: (row) => row.id,
  selectionMode: 'multiple',
});

// grid.displayRows, grid.toggleSort, grid.selectedRows
```

### `useDataGridController`

Equivalente a montar `<DataGrid />` sin JSX — devuelve view-model listo para render custom:

```tsx
const vm = useDataGridController({
  data,
  columns,
  getRowId: (row) => row.id,
  pagination: true,
});

// vm.rowsToRender, vm.selection.handleToggleRow, vm.paginationState, ...
```

## Altura (fit-content)

Por defecto el grid **crece con las filas visibles** y con la **altura real del contenido** de cada celda (no hace falta adivinar `rowHeight`).

| Prop | Default | Descripción |
|------|---------|-------------|
| `height` | — | En fit-content: **techo** (`max-height`). Con virtualización: altura fija del viewport. |
| `maxHeight` | — | Tope alternativo. Si hay `height`, prevalece `height` como techo. |
| `autoRowHeight` | `true` | Filas según contenido real (ignorado si hay virtualización). |
| `rowHeight` | `44` | Estimación en **px solo para virtualización**. También `'auto'`. |

```tsx
// 2 filas con celda custom (nombre + email): crece solo
<DataGrid data={rows} columns={cols} getRowId={...} pagination pageSize={10} />

// Techo opcional (scroll interno si el contenido lo supera)
<DataGrid height={500} ... />
```

Prioridad del techo: `height` > `maxHeight` > sin límite. Con paginación/summary, el techo aplica al bloque completo (tabla + pie). La virtualización solo se activa si hay `height` o `maxHeight`.

## Virtualización

| Prop | Default | Descripción |
|------|---------|-------------|
| `virtualized` | `true` | Habilita virtualización (solo layout tabla, con altura acotada) |
| `virtualThreshold` | `30` | Mínimo de filas para activarla |
| `rowHeight` | `44` | **Solo modo virtual**: altura estimada por fila (px) |
| `overscan` | `5` | Buffer fuera del viewport |
| `showRowCount` | `true` | Contador en barra de resumen |

Con virtualización activa, `autoRowHeight` no aplica: las filas usan `rowHeight` fijo para el cálculo del scroll.

## Paginación

| Prop | Default | Descripción |
|------|---------|-------------|
| `pagination` | `false` | Controles en el pie |
| `paginationMode` | `'client'` | `'client'` o `'server'` |
| `maxRecords` | — | Límite de registros visibles / opciones de pageSize |
| `totalRowCount` | — | Total en modo **server** |

En modo **client**, al buscar u ordenar la página vuelve a **1**. En **server**, `data` es solo la página actual y el padre gestiona el fetch.

## Columnas: resize y reordenamiento

| Prop | Default |
|------|---------|
| `resizableColumns` | `false` |
| `reorderableColumns` | `false` |
| `stickyFirstColumn` | `true` |

Hook exportado: `useColumnLayout`.

## Temas

```tsx
<DataGrid theme="enterprise-dark" ... />
<DataGrid theme={dataGridThemes['modern-light']} ... />
```

## Tipos de eventos

| Tipo | Signatura |
|------|-----------|
| `DataGridOnRowSelectHandler<T>` | `(row: T) => void` |
| `DataGridOnSelectionChangeHandler<T>` | `(selectedRows: T[]) => void` |
| `DataGridOnCardSelectHandler<T>` | `(row: T) => void` |

Ver [Tipos de eventos](/guide/event-types).
