# Sidebar

Navegación lateral con menú dinámico, submenús colapsables y control de permisos (RBAC).

## Import

```tsx
import { Sidebar } from 'glubox';
import type { SidebarProps, MenuConfig } from 'glubox';
```

## Props principales

| Prop | Tipo | Descripción |
|------|------|-------------|
| `menu` | `MenuConfig` | Estructura del menú (API/BD) |
| `userPermissions` | `string[]` | Permisos del usuario logueado |
| `collapsed` | `boolean` | Sidebar contraído |
| `width` | `number \| string` | Ancho en px o CSS |
| `theme` | `'dark' \| 'light' \| SidebarTheme` | Tema visual |
| `activePath` | `string` | Ruta activa |
| `renderIcon` | `IconResolver` | Renderiza iconos por nombre |
| `brand` | `ComponentType` | Logo / nombre empresa |
| `collapseOthersOnSelect` | `boolean` | Modo acordeón |
| `onNavigate` | `(path) => void` | Callback al navegar |
| `onCollapsedChange` | `(collapsed) => void` | Callback al contraer |

## Menú con posiciones

```json
{
  "id": "ayuda",
  "label": "Ayuda",
  "icon": "help-circle",
  "path": "/ayuda",
  "position": "bottom"
}
```

## Permisos

- Sin `permissions` en el ítem → visible para todos
- Con `permissions` → visible si el usuario tiene **al menos uno** (OR)

## Storybook

Prueba variantes en vivo en el [Storybook](/storybook/).
