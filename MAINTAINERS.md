# Notas para mantenedores

Documentación interna del repo. No forma parte del sitio público en GitHub Pages.

## Documentación pública

Sitio VitePress en `docs/` — se publica en GitHub Pages con `pnpm docs:build`.

| Archivo | Contenido |
|---------|-----------|
| `docs/components/sidebar.md` | Referencia del Sidebar |
| `docs/components/forms.md` | TextBox, Select, DateBox, RangeDateBox |
| `docs/components/buttons.md` | Button, CheckButton, OptionGroup |
| `docs/components/overlays.md` | Popup, Toast |
| `docs/guide/event-types.md` | Tipos de handlers exportados |
| `docs/guide/menu-api.md` | Contrato JSON para backend |
| `docs/guide/routing.md` | Integración con React Router |
| `docs/guide/installation.md` | Instalación, temas, TypeScript |

Local: `pnpm docs:dev`

## Despliegue (GitHub Pages)

Cada **push a `main`** ejecuta `deploy-pages.yml` y publica la documentación.

1. Repo → **Settings → Pages**
2. **Build and deployment → Source:** `GitHub Actions`
3. Sitio: https://solivoo.github.io/gluebox/

## Publicación en npm

### Secretos

| Secret | Descripción |
|--------|-------------|
| `NPM_TOKEN` | Token granular de npm: **Packages Read and write**. Con 2FA, habilitar bypass para automation. |

### Automático (recomendado)

1. Actualiza `version` en `package.json` y haz commit en `main`
2. `git tag v0.1.4 && git push origin v0.1.4` (o Release en GitHub)
3. El workflow `publish-npm.yml` ejecuta `pnpm build:lib` y publica

### Build de librería

```bash
pnpm build:lib   # vite lib + scripts/copy-themes.mjs (vía prepublishOnly)
```

### Manual (local)

```bash
pnpm install
pnpm build:lib
npm login
npm publish --access public
# equivalente: pnpm publish:lib
```

Verifica en https://www.npmjs.com/package/glubox que la versión coincida con `package.json`.

### Checklist release

- [ ] `pnpm lint`
- [ ] `pnpm build:lib`
- [ ] `pnpm docs:build`
- [ ] README y `docs/` actualizados
- [ ] `version` en `package.json` alineada con el tag
- [ ] Push a `main` → Pages
- [ ] Tag `v*` → npm

## Changelog v0.1.4

- Popup, Toast, tipos de eventos exportados, paleta pastel
- Docs: event-types, overlays, README actualizado
- Ver `CHANGELOG.md` en la raíz del repo

## Changelog v0.1.3

- Button, Select, TextBox, DateBox, RangeDateBox, OptionGroup, CheckButton
- Demo interactiva con playground (reemplaza Storybook)
- Label `outlined` con `--glb-field-canvas` para fondo transparente
- Fix Sidebar: colapsar ítem padre activo
- Temas globales en `glubox/themes/*.css`
