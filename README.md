# gluBox

Librería de componentes React para aplicaciones empresariales: **Sidebar** con RBAC, **DataGrid**, controles de formulario, botones y 3 temas globales (Indigo / Emerald / Blue) en modo claro y oscuro.

- **Documentación:** https://solivoo.github.io/gluebox/
- **Repositorio:** https://github.com/solivoo/gluebox
- **npm:** https://www.npmjs.com/package/glubox

## Instalación

```bash
pnpm add glubox
```

```tsx
import {
  DataGrid,
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
  hasPermission,
  filterVisibleMenu,
} from 'glubox';
import type { ColumnDef } from 'glubox';
import 'glubox/style.css';
import 'glubox/themes/default.css'; // o modern.css, enterprise.css, index.css
```

Tipado de eventos:

```tsx
import type {
  SelectOnChangeHandler,
  PopupOnCloseHandler,
  ToastShowHandler,
  DataGridOnPageChangeHandler,
} from 'glubox';
```

## Componentes

| Componente | Descripción |
|------------|-------------|
| **DataGrid** | Tabla/cards: `dataSource: T[]` plano + `keyExpr` + `columns` + `paging` |
| **Sidebar** | Navegación lateral, menú desde API, RBAC, 3 niveles |
| **Button** | Botón con variantes y temas |
| **TextBox** | Campo de texto con label top / floating / outlined / left |
| **TextArea** | Multilínea |
| **Select** | Desplegable con teclado y búsqueda type-ahead |
| **DateBox** | Selector de fecha con calendario |
| **RangeDateBox** | Rango de fechas en un solo control |
| **OptionGroup** | Selección exclusiva (vertical, horizontal, segmented) |
| **CheckButton** | Toggle con semántica checkbox |
| **Popup** | Diálogo modal arrastrable con acciones en el pie |
| **Toast** | Notificaciones con posicionamiento, timer y animaciones |

Documentación: https://solivoo.github.io/gluebox/ · tipos de eventos en `docs/guide/event-types.md`.

## Uso rápido

### DataGrid

```tsx
interface Row extends Record<string, unknown> {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
];

<DataGrid
  dataSource={[{ id: 1, name: 'Ana' }]}  // T[] plano — no { items }
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
/>
```

Estructura: cada fila es un objeto; `dataSource` es el array; `keyExpr` nombra el campo clave. Guía: [DataGrid](https://solivoo.github.io/gluebox/components/datagrid#datos--estructura-esperada).

### Sidebar

```tsx
<Sidebar
  menu={menuConfig}
  userPermissions={userPermissions}
  activePath={pathname}
  onNavigate={navigate}
  renderIcon={renderMenuIcon}
  theme="dark"
  collapseOthersOnSelect
/>
```

### Formularios

```tsx
<TextBox label="Email" placeholder="nombre@correo.com" clearable />

<Select
  options={[{ value: '1', label: 'Opción 1' }]}
  label="País"
  labelPosition="outlined"
  placeholder="Seleccionar..."
/>

<DateBox label="Vencimiento" labelPosition="outlined" variant="outline" />

<OptionGroup
  label="Plan"
  layout="segmented"
  options={[
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Pro' },
  ]}
/>
```

### Popup y Toast

```tsx
<Popup open={open} onClose={() => setOpen(false)} title="Confirmar" width={480}>
  Contenido del diálogo
</Popup>

// Envolver la app con ToastProvider
const { show } = useToast();
show({ title: 'Guardado', message: 'Cambios aplicados.', variant: 'success' });
```

### Label outlined y canvas

Con `labelPosition="outlined"` el control es transparente y el label se apoya en el fondo del contenedor. Si el formulario está sobre una card, define el canvas en el padre:

```css
.mi-card {
  --glb-field-canvas: var(--glb-surface);
}
```

### Temas globales

```tsx
import 'glubox/themes/enterprise.css';

document.documentElement.setAttribute('data-theme', 'enterprise');
document.documentElement.setAttribute('data-mode', 'dark');
```

| Tema | Acento |
|------|--------|
| `default` | Periwinkle pastel |
| `modern` | Sage pastel |
| `enterprise` | Powder blue pastel |

Cada componente acepta además su prop `theme` (`light`, `dark`, presets como `modern-dark`, o tokens custom).

Documentación completa del sistema de temas: [docs/guide/themes.md](docs/guide/themes.md) (VitePress) o `pnpm docs:dev` → **Temas y apariencia**.

## Desarrollo

```bash
pnpm install
pnpm dev              # Demo interactiva (playground)
pnpm docs:dev         # Documentación VitePress
pnpm build:lib        # Build para npm
pnpm publish:lib      # prepublish:lib + npm publish (tras npm login)
pnpm docs:build       # Build docs → GitHub Pages
```

### Publicar en npm (manual)

```bash
pnpm install
pnpm build:lib
npm login
npm publish --access public
# o: pnpm publish:lib
```

## Estructura del repo

```
src/components/       # Componentes publicados en npm
src/demo/             # Demo interactiva (no se publica)
src/styles/           # Temas CSS y tokens globales
docs/                 # Documentación VitePress
```

## Licencia

MIT
