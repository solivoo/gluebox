---
name: gluebox-pageactionsmenu
description: >-
  Use this skill when implementing responsive page header action bars, dropdown overflow menus, and toolbar actions with PageActionsMenu.
---

# Gluebox PageActionsMenu

El componente `PageActionsMenu` provee una barra de herramientas responsive para acciones de página, colapsando automáticamente botones en un menú desplegable de desbordamiento (overflow) según el espacio disponible.

## Importación

```tsx
import { PageActionsMenu } from 'glubox';
import type { PageActionsMenuProps, PageActionItem } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `actions` | `PageActionItem[]` | `[]` | Lista de acciones `{ id, label, icon, onClick, variant, disabled? }` |
| `maxVisibleActions` | `number` | `undefined` | Límite de acciones visibles antes de colapsar a menú |
| `overflowLabel` | `string` | `'Más acciones'` | Texto o aria-label del menú overflow |

## Ejemplo de Uso

```tsx
<PageActionsMenu
  actions={[
    { id: 'nuevo', label: 'Nuevo', variant: 'primary', onClick: handleCreate },
    { id: 'exportar', label: 'Exportar a CSV', onClick: handleExport },
    { id: 'imprimir', label: 'Imprimir', onClick: handlePrint },
    { id: 'eliminar', label: 'Eliminar Selección', variant: 'danger', onClick: handleDelete },
  ]}
/>
```
