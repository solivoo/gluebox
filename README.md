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

## Despliegue automático (GitHub Pages)

Cada **push a `main`** ejecuta el workflow `deploy-pages.yml` y publica docs + Storybook.

**Configuración única en GitHub:**

1. Repo → **Settings → Pages**
2. **Build and deployment → Source:** `GitHub Actions`
3. Push a `main` → sitio en https://solivoo.github.io/gluebox/

## Publicación npm

1. Crea secret **`NPM_TOKEN`** en GitHub (Settings → Secrets → Actions)
2. Crea un **Release** con tag `v0.1.0` → publica automáticamente vía `publish-npm.yml`
3. O manual: `pnpm build:lib && npm publish --access public`

## Licencia

MIT
