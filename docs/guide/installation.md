# Instalación

## npm / pnpm / yarn

```bash
pnpm add glubox
```

## Peer dependencies

Asegúrate de tener React instalado:

```bash
pnpm add react react-dom
```

## Estilos

Importa el CSS del paquete en tu entry point:

```tsx
import 'glubox/style.css';
```

## Uso básico

```tsx
import { useState } from 'react';
import { Sidebar } from 'glubox';
import type { MenuConfig } from 'glubox';

const menu: MenuConfig = {
  items: [
    {
      id: 'home',
      label: 'Inicio',
      icon: 'layout-dashboard',
      path: '/',
    },
  ],
};

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar
      menu={menu}
      userPermissions={['dashboard:read']}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      renderIcon={(name, className) => <i className={className}>{name}</i>}
    />
  );
}
```

## TypeScript

Los tipos se exportan desde el paquete:

```tsx
import type { SidebarProps, MenuConfig, SidebarTheme } from 'glubox';
```
