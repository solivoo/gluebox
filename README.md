# gluBox

Librería de componentes React para aplicaciones empresariales. Primer componente: **Sidebar** con menú dinámico, RBAC, temas e iconos personalizables.

- Documentación: https://solivoo.github.io/gluebox/
- Storybook: https://solivoo.github.io/gluebox/storybook/
- Repositorio: https://github.com/solivoo/gluebox

## Instalación

```bash
pnpm add glubox
```

```tsx
import { Sidebar } from 'glubox';
import 'glubox/style.css';
```

## Desarrollo

```bash
pnpm install
pnpm dev              # App demo
pnpm storybook        # Playground (puerto 6006)
pnpm docs:dev         # Sitio VitePress
pnpm build:lib        # Build npm
pnpm docs:build       # Build docs + Storybook para GitHub Pages
```

## Licencia

MIT
