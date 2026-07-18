# PageActionsMenu

Menú **hamburguesa** de acciones de página. Consume nodos del árbol de navegación con `surface: 'actions'`.

## Instalación

```tsx
import {
  PageActionsMenu,
  pageActionsFromNode,
  findNavigationNodeByRoute,
  filterBySurface,
  contentTabsFromNode,
} from 'glubox';
import type { NavigationNode } from 'glubox';
import 'glubox/style.css';
```

## Modelo de datos (handshake)

Filas planas en BD → el API arma un **árbol** → el SPA reparte por `surface`:

| Superficie | Componente lib | Qué muestra |
|------------|----------------|-------------|
| `sidebar` | `<Sidebar />` (vía `filterBySurface`) | groups / views de navegación |
| `content` | futuro `<SectionNav />` | tabs / subvistas |
| `actions` | **`<PageActionsMenu />`** | CTAs de la página activa |

```ts
type NavSurface = 'sidebar' | 'content' | 'actions'
type NavKind = 'group' | 'view' | 'action'

type NavigationNode = {
  id: string
  label: string
  route: string | null
  icon: string | null
  surface: NavSurface
  kind: NavKind
  disabled: boolean
  disabledReason: string | null
  placeholder: boolean
  children: NavigationNode[]
}
```

### Reglas

| `kind` | Comportamiento |
|--------|----------------|
| `group` + sin `route` | Solo expandir (sidebar) |
| `view` + `route` | Navegar |
| `action` | CTA: `onNavigate` si hay `route`, o callback vía `onActionSelect` |

Las acciones **no** van al sidebar.

## Uso con el nodo activo

```tsx
const active = findNavigationNodeByRoute(navigation, location.pathname);
const actions = pageActionsFromNode(active);

<PageActionsMenu
  items={actions}
  align="end"
  renderIcon={renderIcon}
  onNavigate={(route) => navigate('/' + route)}
  onActionSelect={(item) => {
    if (!item.route) refetch();
  }}
/>
```

Helpers:

```tsx
const sidebarTree = filterBySurface(navigation, 'sidebar');
const tabs = contentTabsFromNode(active); // surface: content
const actions = pageActionsFromNode(active); // surface: actions
```

## Props principales

| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `PageActionItem[] \| NavigationNode[]` | Acciones (ideal: `pageActionsFromNode`) |
| `onActionSelect` | `(item) => void` | Cualquier acción elegida |
| `onNavigate` | `(route, item) => void` | Solo si hay `route` |
| `renderIcon` | `(name, className) => ReactElement` | Mismo contrato que Sidebar |
| `align` | `'start' \| 'end'` | Alineación del panel |
| `variant` | `'ghost' \| 'outline' \| 'primary'` | Trigger |
| `size` | `'sm' \| 'md' \| 'lg'` | Trigger (si no hay `height`) |
| `height` | `string \| number` | Altura del trigger; prevalece sobre `size` y mantiene el botón cuadrado |
| `theme` | preset \| objeto | 6 presets gluBox |

## Ejemplo de árbol (Empresas)

```json
{
  "id": "sub-companies",
  "surface": "sidebar",
  "kind": "view",
  "route": "organizacion/empresas",
  "children": [
    { "id": "…-historial", "surface": "content", "kind": "view", "route": "…/historial" },
    { "id": "…-create", "surface": "actions", "kind": "action", "route": "…/nueva" },
    { "id": "…-refresh", "surface": "actions", "kind": "action", "route": null }
  ]
}
```

`pageActionsFromNode` → create + refresh → input del hamburguesa.

## Demo

`pnpm dev` → `/componentes/pageactionsmenu`

Ver también: [Esquema del menú / NavigationNode](/guide/menu-api#navigationnode-árbol-del-handshake).
