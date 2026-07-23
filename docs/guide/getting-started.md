# Introducción

gluBox es una librería de componentes React para dashboards y aplicaciones internas (ERP, facturación, inventario, etc.).

## Qué incluye hoy

| Componente | Documentación |
|------------|---------------|
| Sidebar | [sidebar](/components/sidebar) |
| DataGrid | [DataGrid — guía de uso](/components/datagrid) |
| TextBox, TextArea, Select, DateBox, RangeDateBox | [formularios](/components/forms) |
| Button, CheckButton, OptionGroup | [botones](/components/buttons) |
| Popup, Toast | [overlays](/components/overlays) |

Listado completo: [Componentes](/components/).

### Datos

- **[DataGrid](/components/datagrid)** — Tabla / tarjetas: `dataSource: T[]` (objetos fila), `keyExpr`, `columns` y `paging`.

### Navegación

- **[Sidebar](/components/sidebar)** — Menú dinámico desde API, RBAC, 3 niveles, temas, modo colapsado e iconos personalizables.
- **[PageActionsMenu](/components/page-actions-menu)** — Hamburguesa de acciones de página (`NavigationNode`, `surface: actions`).

### Formularios

- **[TextBox, TextArea, Select, DateBox, RangeDateBox](/components/forms)** — Campos con variantes, clear button, label outlined y temas.

### Botones y selección

- **[Button, CheckButton, OptionGroup](/components/buttons)** — Acciones, toggles y grupos de opción exclusiva.

### Overlays

- **[Popup, Toast](/components/overlays)** — Diálogos modales y notificaciones con tipos de eventos exportados.

## Documentación

| Guía | Contenido |
|------|-----------|
| [Instalación](/guide/installation) | npm, CSS, temas, TypeScript |
| [Temas y apariencia](/guide/themes) | Tema del sistema (`data-theme` / `data-mode`), herencia y prop `theme` |
| [Tipos de eventos](/guide/event-types) | Handlers exportados (`*OnChangeHandler`, etc.) |
| [DataGrid](/components/datagrid) | Guía de uso: dataSource, paging, altura, cards |
| [Esquema del menú (API)](/guide/menu-api) | Contrato JSON para backend |
| [Integración con routing](/guide/routing) | React Router, guards, registro de rutas |
| [Formularios](/components/forms) | TextBox, Select, fechas, label outlined |
| [Botones](/components/buttons) | Button, CheckButton, OptionGroup |
| [Overlays](/components/overlays) | Popup, Toast |
| [Sidebar (referencia)](/components/sidebar) | Props, temas, RBAC |

## Requisitos

- React 18+
- TypeScript recomendado

## Demo local

```bash
git clone https://github.com/solivoo/gluebox.git
cd gluebox
pnpm install
pnpm dev          # Playground interactivo en /componentes/*
pnpm docs:dev     # Esta documentación
```

## Flujo típico de integración

1. Instalar `glubox` e importar `glubox/style.css` + `glubox/themes/index.css` (o un tema suelto).
2. Configurar `data-theme` y `data-mode` en `<html>` — los componentes heredan el tema sin props.
3. Consumir `MenuConfig` desde tu API ([esquema](/guide/menu-api)).
4. Conectar Sidebar con `activePath` / `onNavigate` ([routing](/guide/routing)).
5. Listar datos con [DataGrid](/components/datagrid) (`dataSource` + `keyExpr` + `paging`).
6. Usar formularios y botones; solo pasá `theme` si necesitás un override puntual ([temas](/guide/themes)).
7. Validar permisos en rutas (403) y en el backend.

## DataGrid en 30 segundos

```tsx
import { DataGrid } from 'glubox';
import type { ColumnDef } from 'glubox';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
];

<DataGrid
  dataSource={[{ id: 1, name: 'Ana' }]}
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
/>
```

`dataSource` es un **array plano** de objetos (no `{ items }`). Guía: [estructura de datos](/components/datagrid#datos--estructura-esperada).
