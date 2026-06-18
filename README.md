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
import 'glubox/style.css';
import 'glubox/themes/default.css'; // o modern.css, enterprise.css, index.css
```

Tipado de eventos:

```tsx
import type {
  SelectOnChangeHandler,
  PopupOnCloseHandler,
  ToastShowHandler,
} from 'glubox';
```

## Componentes

| Componente | Descripción |
|------------|-------------|
| **Sidebar** | Navegación lateral, menú desde API, RBAC, 3 niveles |
| **Button** | Botón con variantes y temas |
| **TextBox** | Campo de texto con label top / floating / outlined / left |
| **Select** | Desplegable con teclado y búsqueda type-ahead |
| **DateBox** | Selector de fecha con calendario |
| **RangeDateBox** | Rango de fechas en un solo control |
| **OptionGroup** | Selección exclusiva (vertical, horizontal, segmented) |
| **CheckButton** | Toggle con semántica checkbox |
| **Popup** | Diálogo modal arrastrable con acciones en el pie |
| **Toast** | Notificaciones con posicionamiento, timer y animaciones |

Documentación de tipos de eventos: ver `docs/guide/event-types.md` o la demo → API → Events.

## Uso rápido

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
