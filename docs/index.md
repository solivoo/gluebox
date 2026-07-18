---
layout: home

hero:
  name: gluBox
  text: Componentes React empresariales
  tagline: DataGrid, Sidebar RBAC, formularios temáticos y playground interactivo
  actions:
    - theme: brand
      text: Empezar
      link: /guide/getting-started
    - theme: alt
      text: DataGrid
      link: /components/datagrid

features:
  - title: DataGrid
    details: dataSource + keyExpr + paging, table/card, altura auto y selección tipada.
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
import { DataGrid, Sidebar } from 'glubox';
import 'glubox/style.css';
import 'glubox/themes/default.css';
```

```tsx
<DataGrid
  dataSource={rows}
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
/>
```

## Documentación

- [Introducción](/guide/getting-started)
- [Instalación](/guide/installation)
- [DataGrid — guía de uso](/components/datagrid)
- [Temas y apariencia](/guide/themes)
- [Tipos de eventos](/guide/event-types)
- [Componentes (índice)](/components/)
- [Formularios](/components/forms)
- [Botones y selección](/components/buttons)
- [Overlays (Popup / Toast)](/components/overlays)
- [Sidebar — referencia](/components/sidebar)
