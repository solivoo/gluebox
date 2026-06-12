# Notas para mantenedores

Documentación interna del repo. No forma parte del sitio público en GitHub Pages.

## Documentación pública

Sitio VitePress en `docs/` — se publica en GitHub Pages con `pnpm docs:build`.

| Archivo | Contenido |
|---------|-----------|
| `docs/components/sidebar.md` | Referencia completa del componente |
| `docs/guide/menu-api.md` | Contrato JSON para backend |
| `docs/guide/routing.md` | Integración con React Router |
| `docs/guide/installation.md` | Instalación, iconos, TypeScript |

Local: `pnpm docs:dev`

## Despliegue (GitHub Pages)

Cada **push a `main`** ejecuta `deploy-pages.yml` y publica docs + Storybook.

Configuración única en GitHub:

1. Repo → **Settings → Pages**
2. **Build and deployment → Source:** `GitHub Actions`
3. Sitio: https://solivoo.github.io/gluebox/

## Publicación en npm

### Secretos

| Secret | Descripción |
|--------|-------------|
| `NPM_TOKEN` | Token granular de npm: **Packages Read and write**, scope **All packages**. Con 2FA activo, habilitar **Bypass two-factor authentication for automation**. |

### Automático (recomendado)

1. Actualiza `version` en `package.json` y haz push a `main`
2. Crea tag y publícalo: `git tag v0.1.0 && git push origin v0.1.0`
   - O crea un **Release** en GitHub con ese tag
3. El workflow `publish-npm.yml` publica en npm (usa siempre el código de `main`)

Reintento manual: **Actions → Publish npm → Run workflow**.

### Manual (local)

```bash
pnpm build:lib
npm publish --access public
```

### Checklist

- [ ] `pnpm build:lib` OK
- [ ] `pnpm lint` OK
- [ ] `pnpm-workspace.yaml` con `allowBuilds.esbuild: true` (pnpm 11)
- [ ] No hay secretos en el código
