# Changelog

## [0.1.7] — 2026-07-18

### Añadido

- **DataGrid `autoRowHeight`** (default `true` en modo no virtual): las filas miden su contenido real (p. ej. nombre + email + avatar).
- **`rowHeight: 'auto' | number`**: `'auto'` equivale a filas por contenido; el número solo aplica a virtualización (o como piso si `autoRowHeight={false}`).
- Util exportado `resolveDataGridHeight` + tests unitarios del cálculo fit-content / techo.

### Corregido

- Fit-content con celdas de 2+ líneas: no se recorta la última fila; el body crece con el DOM, no con `rowHeight × n`.
- Con paginación, el techo de altura aplica al bloque completo (tabla + pie).

### Cambiado

- En fit-content, `height` actúa como **techo** (`max-height`), no como altura fija (compat. 0.1.6). Con virtualización sigue siendo altura fija.
- Docs: modelo de altura, `rowHeight` solo para modo virtual, demo con celda de 2 líneas.

## [0.1.6] — 2026-07-18

### Añadido

- **`showClearButton`** en TextBox, TextArea, Select, DateBox y RangeDateBox (espacio reservado fijo; botón oculto con `visibility` para no desplazar el layout).
- TextBox: toggle de contraseña (`showPasswordToggle`) usable con clic.
- Helpers compartidos de clear button (`resolveShowClearButton`, tipos de campo).
- **DataGrid `maxHeight`**: tope de crecimiento; el grid crece con las filas visibles hasta ese valor.

### Corregido

- **DataGrid**: paginación controlada (`page` / `pageSize`); los botones ya no resetean a página 1 en cada render.
- **DataGrid**: con pocas filas no se recortan celdas; el pie de paginación no tapa la última fila.
- Select/DateBox: botón clear sin solaparse con el icono de flecha/calendario.

### Cambiado

- **DataGrid altura**: sin default `420`. Por defecto crece con filas visibles; `height` (fija) y `maxHeight` (tope) son opcionales y tienen prioridad. Virtualización solo con altura acotada.
- Demo DataGrid: paginación controlada, caso de 2 operadores y controles `page` / `pageSize` / `maxHeight` en el playground.

## [0.1.5] — 2026-06-15

### Añadido

- **DataGrid** — tabla empresarial con búsqueda (debounce), ordenamiento, selección single/multiple, paginación client/server, virtualización, columnas redimensionables/reordenables, layout tabla/tarjetas/auto responsive, i18n vía `messages` y hook `useDataGridController`.
- **TextArea** — control multilínea con temas, variantes y demo playground.
- Documentación: [DataGrid](/components/datagrid), [Temas](/guide/themes), índice de componentes.
- Demo interactiva: DataGrid y TextArea con playground.

### Cambiado

- `ComponentPlayground` con soporte genérico de props para demos tipadas.
- Exports públicos del DataGrid: `useDataGridController`, `defaultDataGridMessages`, `resolveDataGridMessages`.

## [0.1.4] — 2026-06-15

### Añadido

- **Popup** — diálogo modal con ancho/alto, pie de acciones, cierre flexible y arrastre desde la cabecera.
- **Toast** — notificaciones con `ToastProvider` + `useToast()`, posicionamiento, barra de temporizador, animación de entrada/salida y variantes semánticas.
- **Tipos de eventos exportados** — `*OnChangeHandler`, `*OnCloseHandler`, `ToastShowHandler`, utilidades `OptionalEventHandler` / `EventHandlerPayload`.
- Paleta **pastel** en temas Default, Modern y Enterprise.
- Documentación VitePress: [Tipos de eventos](/guide/event-types), [Overlays](/components/overlays).
- Demo: playgrounds para Popup y Toast; API Events/Types con tipos exportados.

### Cambiado

- `ComponentPlayground` admite `renderPreview` y `wrapper` para overlays.
- Toast en dark mode usa fondos opacos (sin transparencia).
- `resolveTheme` de Toast respeta `data-theme` / `data-mode` del documento.

## [0.1.3]

- Button, Select, TextBox, DateBox, RangeDateBox, OptionGroup, CheckButton.
- Demo interactiva con playground (reemplaza Storybook).
- Label `outlined` con `--glb-field-canvas`.
- Temas globales en `glubox/themes/*.css`.

[0.1.5]: https://github.com/solivoo/gluebox/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/solivoo/gluebox/compare/v0.1.3...v0.1.4
