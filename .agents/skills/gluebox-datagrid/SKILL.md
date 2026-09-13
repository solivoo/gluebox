---
name: gluebox-datagrid
description: >-
  Use this skill when implementing tables, data grids, pagination, sorting, sticky columns, or toolbar filters with Gluebox DataGrid.
---

# Gluebox DataGrid

El componente `DataGrid` proporciona una tabla de datos completa diseñada para aplicaciones empresariales, con soporte de filtrado en toolbar, ordenamiento, selección de filas, columnas fijas (`sticky`), paginación y personalización de celdas.

## Importación

```tsx
import { DataGrid } from 'glubox';
import type { DataGridProps, ColumnDef, SortState } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `dataSource` | `T[]` | `[]` | Lista de registros a mostrar |
| `columns` | `ColumnDef<T>[]` | `[]` | Definición de columnas |
| `keyExpr` | `keyof T \| ((row: T) => string \| number)` | requerido | Identificador único de fila |
| `pagination` | `boolean \| PaginationConfig` | `false` | Activa paginador interno |
| `sorting` | `boolean \| SortState` | `false` | Configuración de ordenamiento |
| `selection` | `'single' \| 'multiple' \| 'none'` | `'none'` | Modo de selección |
| `toolbarRight` / `toolbarLeft` | `ReactNode` | `undefined` | Elementos de la barra superior |
| `loading` | `boolean` | `false` | Muestra estado de carga |

## Ejemplo de Columnas Sticky y Custom Render

```tsx
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  estado: 'activo' | 'inactivo';
}

const columns: ColumnDef<Usuario>[] = [
  { field: 'id', caption: 'ID', width: 60, sticky: 'left' },
  { field: 'nombre', caption: 'Nombre', sortable: true },
  { field: 'email', caption: 'Correo Electrónico' },
  {
    field: 'estado',
    caption: 'Estado',
    cellRender: ({ value }) => (
      <span className={`badge badge--${value}`}>{value}</span>
    ),
  },
];
```
