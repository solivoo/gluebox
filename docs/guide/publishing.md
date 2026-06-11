# Publicación en npm

## Preparación

1. Crea cuenta en [npmjs.com](https://www.npmjs.com/)
2. Inicia sesión localmente: `npm login`
3. Verifica que el nombre `glubox` esté disponible o cámbialo en `package.json`

## Build de la librería

```bash
pnpm build:lib
```

Genera `dist/glubox.js`, `dist/glubox.css` y `dist/index.d.ts`.

## Publicar manualmente

```bash
npm publish --access public
```

Para versiones siguientes:

```bash
npm version patch   # 0.1.0 → 0.1.1
npm publish
```

## Publicar con GitHub Actions

El workflow `.github/workflows/publish-npm.yml` publica automáticamente al crear un **Release** en GitHub.

### Secretos necesarios

| Secret | Descripción |
|--------|-------------|
| `NPM_TOKEN` | Token de npm con permiso **Publish** |

Crear token: npm → Access Tokens → **Granular** → Packages: Read and write.

### Crear release

1. Actualiza `version` en `package.json`
2. GitHub → Releases → **Draft a new release**
3. Tag: `v0.1.0` (debe coincidir con la versión)
4. Publish release → el workflow publica en npm

## Checklist antes de publicar

- [ ] `pnpm build:lib` OK
- [ ] `pnpm lint` OK
- [ ] README actualizado
- [ ] `repository` y `homepage` en `package.json` correctos
- [ ] No hay secretos en el código
