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

## Iconos

El sidebar **no incluye Lucide** (u otra librería de iconos). Debes pasar `renderIcon` para los iconos del menú que vienen de tu API/BD.

Los iconos de **UI** (chevron de submenús, botón contraer sidebar) ya vienen integrados.

### Con Lucide (recomendado)

```bash
pnpm add lucide-react
```

```tsx
import {
  Circle,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { IconResolver } from 'glubox';

const iconRegistry: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  settings: Settings,
  users: Users,
};

export const renderMenuIcon: IconResolver = (name, className) => {
  const Icon = iconRegistry[name] ?? Circle;
  return <Icon className={className} size={20} aria-hidden />;
};
```

```tsx
<Sidebar menu={menu} userPermissions={[]} renderIcon={renderMenuIcon} />
```

Los nombres `chevron-down`, `panel-left-open` y `panel-left-close` los resuelve el propio sidebar; no hace falta registrarlos.

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
      renderIcon={renderMenuIcon}
    />
  );
}
```

## TypeScript

Los tipos se exportan desde el paquete:

```tsx
import type { SidebarProps, MenuConfig, SidebarTheme } from 'glubox';
```
