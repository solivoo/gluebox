---
layout: home

hero:
  name: gluBox
  text: Componentes React empresariales
  tagline: Sidebar con RBAC, formularios temáticos, calendarios y demo interactiva con playground
  actions:
    - theme: brand
      text: Empezar
      link: /guide/getting-started
    - theme: alt
      text: Formularios
      link: /components/forms

features:
  - title: Menú desde API
    details: Contrato JSON documentado — módulos, opciones y acciones hasta 3 niveles con RBAC.
  - title: Controles de formulario
    details: TextBox, Select, DateBox, RangeDateBox con label top, floating, outlined y left.
  - title: Temas globales
    details: Default, Modern y Enterprise en dark/light más temas por componente.
  - title: Demo interactiva
    details: Playground en el repo para probar props y variantes sin Storybook.
  - title: Overlays
    details: Popup modal arrastrable y Toast con posicionamiento, timer y tipos de eventos exportados.
---

## Quick start

```bash
pnpm add glubox
```

```tsx
import { Sidebar, TextBox } from 'glubox';
import 'glubox/style.css';
import 'glubox/themes/default.css';
```

## Documentación

- [Introducción](/guide/getting-started)
- [Instalación](/guide/installation)
- [Tipos de eventos](/guide/event-types)
- [Formularios](/components/forms)
- [Botones y selección](/components/buttons)
- [Overlays (Popup / Toast)](/components/overlays)
- [Sidebar — referencia](/components/sidebar)
