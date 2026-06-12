---
layout: home

hero:
  name: gluBox
  text: Componentes React empresariales
  tagline: Sidebar con RBAC, menú dinámico desde API, temas e integración con cualquier router
  actions:
    - theme: brand
      text: Empezar
      link: /guide/getting-started
    - theme: alt
      text: Sidebar — referencia
      link: /components/sidebar
    - theme: alt
      text: Storybook
      link: /storybook/

features:
  - title: Menú desde API
    details: Contrato JSON documentado para backend — módulos, opciones y acciones hasta 3 niveles.
  - title: RBAC integrado
    details: Filtrado por permisos (OR), utilidades hasPermission y filterVisibleMenu exportadas.
  - title: Router-agnostic
    details: Conecta activePath y onNavigate con React Router, Next.js o estado local.
  - title: Temas e iconos
    details: Presets dark/light, tokens custom, renderIcon para Lucide o Iconify.
---

## Quick start

```bash
pnpm add glubox
```

```tsx
import { Sidebar } from 'glubox';
import 'glubox/style.css';
```

## Documentación

- [Instalación](/guide/installation)
- [Esquema del menú (API)](/guide/menu-api) — para equipos backend
- [Integración con routing](/guide/routing)
- [Sidebar — referencia completa](/components/sidebar)
- [Storybook interactivo](/storybook/)
