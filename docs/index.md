---
layout: home

hero:
  name: gluBox
  text: Componentes React empresariales
  tagline: Sidebar con RBAC, temas, iconos personalizables y menú dinámico desde API
  actions:
    - theme: brand
      text: Empezar
      link: /guide/getting-started
    - theme: alt
      text: Ver Storybook
      link: /storybook/

features:
  - title: RBAC integrado
    details: Filtra menús por permisos del usuario con reglas OR configurables.
  - title: Temas
    details: Presets dark/light o tokens CSS personalizados para fondo, texto e iconos.
  - title: Extensible
    details: Inyecta iconos (Lucide, Iconify) y marca con componentes propios.
  - title: Listo para npm
    details: Publica la librería en npm y la documentación en GitHub Pages.
---

## Quick start

```bash
pnpm add glubox
```

```tsx
import { Sidebar } from 'glubox';
import 'glubox/style.css';
```

Consulta la [guía de inicio](./guide/getting-started) o explora el [Storybook](/storybook/).
