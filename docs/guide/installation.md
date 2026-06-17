# Instalación

## npm / pnpm / yarn

```bash
pnpm add glubox
```

## Peer dependencies

```bash
pnpm add react react-dom
```

React **18+** es requerido.

## Estilos

Importa el CSS en el entry point de tu aplicación:

```tsx
import 'glubox/style.css';
```

Sin este import los componentes no tendrán layout ni tokens visuales.

### Temas globales (opcional)

```tsx
import 'glubox/themes/default.css';   // uno solo
// import 'glubox/themes/index.css'; // los tres temas

document.documentElement.setAttribute('data-theme', 'default');
document.documentElement.setAttribute('data-mode', 'dark');
```

| Archivo | Acento |
|---------|--------|
| `glubox/themes/default.css` | Indigo |
| `glubox/themes/modern.css` | Emerald |
| `glubox/themes/enterprise.css` | Blue |

### Label outlined en cards

Si usas `labelPosition="outlined"` sobre un panel con fondo distinto al de la página:

```css
.mi-panel {
  --glb-field-canvas: var(--glb-surface);
}
```

## Iconos del menú

gluBox **no incluye** Lucide, Iconify ni otras librerías de iconos. Los nombres vienen de tu API (`"receipt"`, `"settings"`, …) y los resuelves con la prop `renderIcon`.

Los iconos de **UI del sidebar** (chevron, contraer/expandir) ya vienen integrados.

### Con Lucide (recomendado)

```bash
pnpm add lucide-react
```

```tsx
import { Circle, Receipt, Settings, type LucideIcon } from 'lucide-react';
import type { IconResolver } from 'glubox';

const iconRegistry: Record<string, LucideIcon> = {
  receipt: Receipt,
  settings: Settings,
};

export const renderMenuIcon: IconResolver = (name, className) => {
  const Icon = iconRegistry[name] ?? Circle;
  return <Icon className={className} aria-hidden />;
};
```

```tsx
<Sidebar menu={menu} userPermissions={permissions} renderIcon={renderMenuIcon} />
```

::: tip Tamaño de iconos
El Sidebar aplica la clase `sidebar__icon`. No es necesario pasar `size` en Lucide; el CSS controla el tamaño en modo expandido y colapsado.
:::

Nombres resueltos internamente (no registrar en tu `renderIcon`):

- `chevron-down`
- `panel-left-close`
- `panel-left-open`

## Uso básico

```tsx
import { useState } from 'react';
import { Sidebar } from 'glubox';
import type { MenuConfig } from 'glubox';
import 'glubox/style.css';

const menu: MenuConfig = {
  items: [
    {
      id: 'home',
      label: 'Inicio',
      icon: 'layout-dashboard',
      path: '/',
      permissions: ['dashboard:read'],
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
      theme="dark"
    />
  );
}
```

## Con router (React Router)

```tsx
import { useLocation, useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const { pathname } = useLocation();

<Sidebar
  menu={menu}
  userPermissions={permissions}
  activePath={pathname}
  onNavigate={navigate}
  renderIcon={renderMenuIcon}
/>
```

Guía completa: [Integración con routing](/guide/routing).

## TypeScript

Tipos y utilidades exportados:

```tsx
import {
  Sidebar,
  Button,
  Select,
  TextBox,
  DateBox,
  RangeDateBox,
  OptionGroup,
  CheckButton,
  Popup,
  ToastProvider,
  useToast,
  sidebarThemes,
  buttonThemes,
  selectThemes,
  textBoxThemes,
  dateBoxThemes,
  rangeDateBoxThemes,
  optionGroupThemes,
  checkButtonThemes,
  popupThemes,
  toastThemes,
  hasPermission,
  filterVisibleMenu,
} from 'glubox';

import type {
  SidebarProps,
  MenuConfig,
  ButtonProps,
  SelectProps,
  TextBoxProps,
  DateBoxProps,
  RangeDateBoxProps,
  OptionGroupProps,
  CheckButtonProps,
  PopupProps,
  ShowToastOptions,
  Permission,
  IconResolver,
  // Handlers de eventos (tipado de callbacks)
  SelectOnChangeHandler,
  PopupOnCloseHandler,
  ToastShowHandler,
  OptionalEventHandler,
  EventHandlerPayload,
} from 'glubox';
```

- `hasPermission(userPermissions, required?)` — regla OR para guards de ruta.
- `filterVisibleMenu(menu, userPermissions)` — misma lógica que aplica el Sidebar internamente.
- Tipos `*OnChangeHandler`, `*OnCloseHandler`, etc. — ver [Tipos de eventos](/guide/event-types).

## Siguiente paso

- [Tipos de eventos](/guide/event-types)
- [Formularios](/components/forms)
- [Overlays (Popup / Toast)](/components/overlays)
- [Esquema del menú para tu API](/guide/menu-api)
- [Referencia completa del Sidebar](/components/sidebar)
