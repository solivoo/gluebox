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

### Temas globales (recomendado)

Sin un tema CSS + `data-theme` / `data-mode`, los componentes usan solo fallbacks locales. Para que **toda** la librería responda al tema del sistema:

```tsx
import 'glubox/themes/index.css'; // o commerce.css

document.documentElement.setAttribute('data-theme', 'commerce'); // commerce (Material Design / MUI)
document.documentElement.setAttribute('data-mode', 'dark');     // light | dark
```

| Archivo | Paleta |
|---------|--------|
| `glubox/themes/commerce.css` | Material Design (MUI) — azul #1976D2 |
| `glubox/themes/index.css` | Tema + bridge (recomendado) |

No hace falta pasar `theme` a cada componente: sin esa prop heredan el sistema. Tampoco redefinas `--select-*`, `--datagrid-*` ni `--textbox-*` — ya resuelven a `var(--glb-*)`. Guía completa: [Temas y apariencia](/guide/themes).

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
 
## Subpath Exports y Tree-shaking

Para optimizar al máximo el peso inicial de tu aplicación o acelerar el tiempo de compilación y tipado de TypeScript, puedes importar componentes individuales a través de subpath exports:

```tsx
// Importa únicamente el componente y dependencias necesarias
import { Button } from 'glubox/components/Button';
import { Switch } from 'glubox/components/Switch';
import { DataGrid } from 'glubox/components/DataGrid';
import { FileBox, FileUploader } from 'glubox/components/FileBox';
```

Al usar subrutas:
- **Tree-shaking real**: Importar `Button` genera un bundle de ~10 KB sin incluir componentes pesados como `DataGrid` (~48 KB) ni `ColorPicker`.
- **Tipado más rápido**: El compilador de TypeScript procesa exclusivamente las declaraciones `.d.ts` del componente utilizado.
- Los estilos siguen requiriendo únicamente el import global de `import 'glubox/style.css'`.

## TypeScript

Tipos y utilidades exportados:

```tsx
import {
  DataGrid,
  Sidebar,
  Button,
  Select,
  TextBox,
  NumberBox,
  FileBox,
  ColorPicker,
  TextArea,
  DateBox,
  RangeDateBox,
  OptionGroup,
  CheckButton,
  Switch,
  Popup,
  ToastProvider,
  useToast,
  dataGridThemes,
  sidebarThemes,
  buttonThemes,
  selectThemes,
  textBoxThemes,
  textAreaThemes,
  dateBoxThemes,
  rangeDateBoxThemes,
  optionGroupThemes,
  checkButtonThemes,
  switchThemes,
  popupThemes,
  toastThemes,
  DEFAULT_COLOR_PRESETS,
  hasPermission,
  filterVisibleMenu,
} from 'glubox';

import type {
  SidebarProps,
  MenuConfig,
  ButtonProps,
  SelectProps,
  TextBoxProps,
  NumberBoxProps,
  FileBoxProps,
  ColorPickerProps,
  ColorPickerThemeInput,
  DateBoxProps,
  RangeDateBoxProps,
  OptionGroupProps,
  CheckButtonProps,
  SwitchProps,
  PopupProps,
  ShowToastOptions,
  Permission,
  IconResolver,
  ColumnDef,
  DataGridProps,
  DataGridPaging,
  // Handlers de eventos (tipado de callbacks)
  SelectOnChangeHandler,
  PopupOnCloseHandler,
  ToastShowHandler,
  DataGridOnPageChangeHandler,
  OptionalEventHandler,
  EventHandlerPayload,
} from 'glubox';
```

- `hasPermission(userPermissions, required?)` — regla OR para guards de ruta.
- `filterVisibleMenu(menu, userPermissions)` — misma lógica que aplica el Sidebar internamente.
- Tipos `*OnChangeHandler`, `*OnCloseHandler`, etc. — ver [Tipos de eventos](/guide/event-types).
- DataGrid: `dataSource`, `keyExpr`, `paging` — ver [guía de uso](/components/datagrid).
- PageActionsMenu + `NavigationNode` / `pageActionsFromNode` — ver [PageActionsMenu](/components/page-actions-menu).

## Siguiente paso

- [DataGrid — guía de uso](/components/datagrid)
- [PageActionsMenu](/components/page-actions-menu)
- [Tipos de eventos](/guide/event-types)
- [Formularios](/components/forms)
- [Overlays (Popup / Toast)](/components/overlays)
- [Esquema del menú para tu API](/guide/menu-api)
- [Referencia completa del Sidebar](/components/sidebar)
