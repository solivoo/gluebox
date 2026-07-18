# Changelog

## [0.1.6] — 2026-07-18

### Añadido

- **`showClearButton`** en TextBox, TextArea, Select, DateBox y RangeDateBox (espacio reservado fijo; botón oculto con `visibility` para no desplazar el layout).
- TextBox: toggle de contraseña (`showPasswordToggle`) usable con clic.
- Helpers compartidos de clear button (`resolveShowClearButton`, tipos de campo).

### Corregido

- **DataGrid**: paginación controlada (`page` / `pageSize`); los botones ya no resetean a página 1 en cada render.
- **DataGrid**: viewport con pocas filas — `height: auto` + `maxHeight` para no recortar celdas más altas que `rowHeight`.
- Select/DateBox: botón clear sin solaparse con el icono de flecha/calendario.

### Cambiado

- Demo DataGrid: paginación controlada, caso de 2 operadores y controles `page` / `pageSize` en el playground.

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
