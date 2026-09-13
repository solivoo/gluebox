---
name: gluebox-sidebar
description: >-
  Use this skill when implementing application navigation sidebars with RBAC role-based permissions, collapsible states, and branding in Gluebox.
---

# Gluebox Sidebar

El componente `Sidebar` implementa una barra de navegación lateral profesional para aplicaciones empresariales, con soporte de control de acceso basado en roles y permisos (RBAC), estado colapsable/expandible, submenús y branding personalizable.

## Importación

```tsx
import { Sidebar, sidebarThemes, filterVisibleMenu, hasPermission } from 'glubox';
import type { SidebarProps, MenuConfig, MenuItem, Permission } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `menu` | `MenuConfig` | requerido | Configuración de ítems de navegación |
| `permissions` | `Permission[]` | `[]` | Permisos del usuario actual para RBAC |
| `collapsed` | `boolean` | `false` | Estado colapsado |
| `onCollapsedChange`| `(collapsed: boolean) => void` | `undefined` | Callback al alternar colapsado |
| `onNavigate` | `(path: string) => void` | `undefined` | Callback de navegación (react-router, etc.) |
| `currentPath` | `string` | `undefined` | Ruta actual para resaltar ítem activo |
| `brand` | `SidebarBrandProps` | `undefined` | Logo y nombre de la aplicación |

## Ejemplo de Configuración con RBAC

```tsx
const menu: MenuConfig = {
  items: [
    { id: 'home', label: 'Inicio', path: '/dashboard', icon: 'home' },
    {
      id: 'ventas',
      label: 'Ventas',
      path: '/ventas',
      icon: 'dollar-sign',
      requiredPermissions: ['ventas.read'],
      children: [
        { id: 'facturas', label: 'Facturas', path: '/ventas/facturas' },
        { id: 'reportes', label: 'Reportes', path: '/ventas/reportes', requiredPermissions: ['ventas.reports'] },
      ],
    },
  ],
};

<Sidebar
  menu={menu}
  currentPath={location.pathname}
  permissions={user.permissions}
  onNavigate={(path) => navigate(path)}
/>
```
