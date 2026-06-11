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
