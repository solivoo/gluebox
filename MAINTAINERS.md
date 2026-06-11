# Notas para mantenedores

Documentación interna del repo. No forma parte del sitio público en GitHub Pages.

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
| `NPM_TOKEN` | Token de npm con permiso **Publish** (Granular → Packages: Read and write) |

### Automático (recomendado)

1. Actualiza `version` en `package.json`
2. GitHub → Releases → tag `v0.1.0` (debe coincidir con la versión)
3. Publish release → workflow `publish-npm.yml`

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
