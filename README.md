# gluBox

Librería de componentes React para aplicaciones empresariales. Primer componente: **Sidebar** con menú dinámico desde API, RBAC, temas e iconos personalizables.

- **Documentación:** https://solivoo.github.io/gluebox/
- **Storybook:** https://solivoo.github.io/gluebox/storybook/
- **Repositorio:** https://github.com/solivoo/gluebox

## Instalación

```bash
pnpm add glubox
```

```tsx
import { Sidebar, hasPermission, filterVisibleMenu } from 'glubox';
import type { MenuConfig, SidebarProps } from 'glubox';
import 'glubox/style.css';
```

## Sidebar — resumen

| Característica | Descripción |
|----------------|-------------|
| Menú dinámico | JSON desde API/BD (`MenuConfig`) |
| RBAC | Filtrado por permisos (OR) |
| 3 niveles | Módulo → Opción → Acción |
| Routing | Agnóstico — `activePath` + `onNavigate` |
| Temas | `dark`, `light` o tokens custom |
| Colapsado | Modo rail con iconos centrados |

### Ejemplo mínimo

```tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'glubox';
import 'glubox/style.css';

<Sidebar
  menu={menuFromApi}
  userPermissions={user.permissions}
  activePath={pathname}
  onNavigate={navigate}
  renderIcon={renderMenuIcon}
  theme="dark"
  collapseOthersOnSelect
/>
```

## Documentación

| Tema | Enlace |
|------|--------|
| Instalación e iconos | [guide/installation](https://solivoo.github.io/gluebox/guide/installation) |
| Esquema JSON (API/backend) | [guide/menu-api](https://solivoo.github.io/gluebox/guide/menu-api) |
| React Router y guards | [guide/routing](https://solivoo.github.io/gluebox/guide/routing) |
| Referencia Sidebar (props, temas) | [components/sidebar](https://solivoo.github.io/gluebox/components/sidebar) |

## Desarrollo

```bash
pnpm install
pnpm dev              # App demo con routing (src/demo/)
pnpm storybook        # Playground Sidebar
pnpm docs:dev         # VitePress
pnpm build:lib        # Build npm
pnpm docs:build       # Docs + Storybook → GitHub Pages
```

## Estructura del repo

```
src/components/Sidebar/   # Componente publicado en npm
src/demo/                 # Ejemplo routing (no se publica)
docs/                     # Documentación VitePress
```

## Licencia

MIT
