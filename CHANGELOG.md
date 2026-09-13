# Changelog

## [0.1.23] — 2026-09-13

### Corregido

- **`FileBox` / `FileUploader` drag & drop:** Corrección del comportamiento de arrastrar y soltar archivos.
  - Implementado contador de profundidad `dragDepthRef` para evitar que los eventos `dragleave` sobre elementos hijos apaguen el estado activo de arrastre por valores `null` en `relatedTarget` al arrastrar archivos desde el explorador del sistema operativo.
  - Reemplazado el elemento nativo `<button>` del dropzone por un contenedor `<div role="button" tabIndex={0} ...>` accesible con soporte para teclado (`Enter`, `Space`) y `:focus-visible`, eliminando el falso evento sintético de clic que abría el diálogo nativo del explorador tras soltar un archivo.
  - Soporte para extracción de archivos mediante `dataTransfer.files` y `dataTransfer.items`, con sincronización al `<input type="file">` mediante `DataTransfer`.
- **Alias `FileUploader`:** Exportado `FileUploader` y `FileUploaderProps` como alias directos de `FileBox` en `glubox`.

### Añadido

- **Skills de componentes y Contexto Activo:** Incorporadas skills en `.agents/skills/` para los 16 componentes de la librería y archivo `ACTIVE_CONTEXT.md` / `AGENTS.md` para persistencia de contexto entre sesiones de desarrollo.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.23`.
2. Opcional: usar el alias `FileUploader` o `FileBox` de forma intercambiable.

## [0.1.22] — 2026-09-10

### Añadido

- **`DataGrid` columnas sticky completas:** Soporte para fijar múltiples columnas tanto a la izquierda como a la derecha al hacer scroll horizontal mediante la propiedad `sticky?: boolean | 'left' | 'right'` en `ColumnDef<T>`.
- Cálculo acumulativo de offsets en tiempo real para columnas sticky (`left` y `right`), compatible con selección múltiple (checkbox inicial) y redimensionamiento dinámico de columnas (`resizableColumns`).
- Nuevos tipos exportados: `ColumnSticky` y `ColumnStickyMeta`.
- Clases CSS `.glb-datagrid__cell--sticky-edge-left` y `.glb-datagrid__cell--sticky-edge-right` con sombras divisorias en los bordes de grupos sticky.
- Retrocompatibilidad total con `stickyFirstColumn?: boolean`.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.22`.
2. Opcional: configurar `sticky: 'left'` o `sticky: 'right'` directamente en `ColumnDef`.

## [0.1.21] — 2026-08-21

### Corregido

- **`ColumnDef<T>`:** el union ya no incluye la rama `key: string` de `Record<string, unknown>`. `renderCell` infiere `T[K]` (p. ej. `string` en `key: 'name'`) en filas `SomeDto & Record<string, unknown>`. `rowIndex` es opcional: un callback de 2 args sigue siendo asignable.
- **`emptyState`:** se restaura `emptyState?: ReactNode` en `DataGridProps` (alias del vacío; si hay `emptyMessage`, `emptyState` gana). Deprecated hacia 0.2 a favor de `emptyMessage` / `messages.emptyMessage`.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.21`.
2. Los grids 0.1.18 con `ColumnDef<T>[]` + `renderCell: (value: T['name'], row) =>` y `emptyState={...}` vuelven a typechequear. No hace falta reescribir columnas.

## [0.1.20] — 2026-08-21

### Añadido

- **`ColorPicker`** — campo de color con swatch, input hex y panel HSV en portal (`position: fixed`, mismo criterio que Select). No usa `<input type="color">` nativo. Hereda variantes, labels y temas de TextBox (`--textbox-*` / `--glb-*`).
- Props: `value` / `defaultValue` / `onChange(hex)`, `presets`, `showClearButton`, `labelPosition` (top / floating / outlined / left).
- Tipos: `ColorPickerProps`, `ColorPickerOnChangeHandler`, `ColorPickerChangeValue`, `ColorPickerThemeInput` (alias de TextBox). Export `DEFAULT_COLOR_PRESETS`.
- El input hex solo confirma en vivo `#rrggbb` de 6 dígitos; el shorthand `#rgb` espera blur o Enter (evita que `#3b8` se vuelva `#33bb88` al escribir `#3b82f6`).
- Panel operable con teclado: cuadro SV y matiz son `role="slider"` (flechas ±1, Shift+flechas ±10, Home/End a los extremos). Al abrir, el foco entra al panel; Escape cierra y lo devuelve al swatch.
- El matiz se conserva al pasar por blanco o negro: el HSV vive en estado y no se re-deriva del hex, que no puede representarlo cuando la saturación o el brillo llegan a 0.
- `presets` acepta `readonly string[]`, así `presets={DEFAULT_COLOR_PRESETS}` compila sin castear.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.20`.
2. Sin breaking changes; `ColorPicker` es un componente nuevo.

## [0.1.19] — 2026-08-21

### Corregido

- **Temas:** `pnpm themes:generate` emite `var(--glb-*)` (surface, input-bg, text, border, muted, accent-*) en `_generated-*.css` en lugar de hex por componente. `_component-bridge.css` deja de ser el parche sobre valores hardcodeados. El remap no trata `textbox`/`textarea` como token de texto: fondos hover/focus de outline/ghost/secondary usan `--glb-input-bg` / `--glb-surface-hover`, no `--glb-text`.
- **DataGrid pager:** el page-size usa el Select de gluBox (portal/fixed), sin chrome nativo del SO en `data-mode=dark`.
- **color-scheme:** `[data-mode=light|dark]` declara `color-scheme` junto a `--glb-app-bg` / `--glb-surface` para que widgets nativos hereden el modo.
- **TextBox `type="number"`:** oculta los spinners nativos igual que NumberBox. Para stepping usá NumberBox.
- **Docs:** setup de un solo lugar (`glubox/style.css` + `glubox/themes/index.css` + `data-theme`/`data-mode` en `<html>`). El consumidor no redefine `--select-*` / `--datagrid-*` / `--textbox-*`.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.19`.
2. Importar solo `glubox/style.css` + `glubox/themes/index.css` y setear `data-theme` / `data-mode` en `<html>`.
3. Quitá overrides de `--select-*`, `--datagrid-*`, `--textbox-*` y estilos de `.glb-datagrid__pagination-select` si los tenías para “arreglar” dark mode.

## [0.1.18] — 2026-08-21

### Corregido

- **Select:** el dropdown ya no se recorta con ancestros `overflow: auto|hidden|scroll` (p. ej. tablas). Se porta a `document.body` con `position: fixed`, flip y `maxHeight` vía `useFloatingPosition` (mismo patrón que DateBox). El menú hereda tokens/variante del Select y queda sobre modales (`z-index: 10000`). Teclado, type-ahead, Escape y click outside se mantienen.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.18`.
2. Sin breaking changes de API. No hace falta `overflow: visible` en el consumidor.

## [0.1.17] — 2026-08-16

### Añadido

- **DataGrid toolbar slots:** `toolbarLeft`, `toolbarRight` y `renderToolbar`. Layout `[left] [search] [right]`; con `renderToolbar` se sustituye todo el contenido (el consumidor decide si pinta el search).
- Tipo exportado `DataGridToolbarContext<T>`: `dataSource`, `filteredData`, `sortedData`, `displayRows` (página visible), `searchQuery` / `setSearchQuery`, `selectedIds` / `selectedRows`, `isAllVisibleSelected`, `selectAllVisible`, `clearSelection`, `rowCount`, `loading`.
- Demo `/componentes/datagrid`: Select de módulo + OptionGroup segmented (Todos / Solo asignados / Solo no asignados) filtrando `dataSource` desde el padre.

### Cambiado

- **FileBox:** en modo `field` con `multiple`, la lista de archivos (nombre, tamaño, quitar) se muestra igual que en dropzone.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.17`.
2. Sin breaking changes. Los slots de toolbar **no filtran** solos: el padre sigue siendo dueño de `dataSource`; el search interno filtra encima.

## [0.1.16] — 2026-08-10

### Añadido

- **`FileBox`** — selector de archivos con `displayMode` `'field'` (campo compacto + botón Elegir) o `'dropzone'` (arrastre + lista). Soporta `multiple`, `accept`, `maxSize`, `maxFiles`, `showClearButton`, variantes/tamaños/labels y los mismos tokens de tema que TextBox.
- Eventos tipados: `onChange(files: File[])` y `onReject(rejected: FileRejection[])` con reasons `'type' | 'size' | 'max-files'`.
- Tipos exportados: `FileBoxProps`, `FileBoxDisplayMode`, `FileBoxChangeValue`, `FileRejection`, `FileBoxOnChangeHandler`, `FileBoxOnRejectHandler`.
- Demo `/componentes/filebox` + docs (Getting Started, How To, Props, Events, Types, Accessibility) y sección en [Formularios](/components/forms).

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.16`.
2. Sin breaking changes; `FileBox` es un componente nuevo.

## [0.1.15] — 2026-08-10

### Añadido

- **`NumberBox`** — campo numérico basado en TextBox: hereda variantes, labels (top/floating/outlined/left), estados de error/ayuda, clearable y todo el sistema de temas. Reemplaza los spinners nativos del navegador por spin buttons estilados acordes al tema, con `step` configurable y clamp a `min`/`max`.
- Tipos exportados: `NumberBoxProps`, `NumberBoxVariant`, `NumberBoxSize`, `NumberBoxLabelPosition`, `NumberBoxTheme*` y handlers (`NumberBoxOnChangeHandler`, `NumberBoxOnFocusHandler`, `NumberBoxOnBlurHandler`).
- Demo: playground `/componentes/numberbox` + docs (Getting Started, How To, Props, Events, Types, Accessibility).

### Cambiado

- **Demo:** el panel de props del playground usa `NumberBox` para los controles numéricos (antes `<input type="number">` nativo sin estilar).
- **Demo:** `color-scheme` global acorde a `data-mode`, para que los widgets nativos (dropdowns, scrollbars) se dibujen correctamente en modo oscuro.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.15`.
2. Sin breaking changes; `NumberBox` es un componente nuevo.

## [0.1.14] — 2026-07-31

### Añadido

- **Demo online:** el playground interactivo se publica en GitHub Pages en [/gluebox/demo/](https://solivoo.github.io/gluebox/demo/) (nuevo script `demo:build` + paso en el workflow de Pages). Enlace "Demo" en el nav de los docs.
- **Docs de la demo completas:** DateBox, RangeDateBox, OptionGroup, CheckButton, Popup y Toast ahora tienen How-To, Types y Accessibility (antes mostraban "próximamente").

### Cambiado

- La demo usa `HashRouter` en lugar de `BrowserRouter` para que los deep-links funcionen en GitHub Pages sin fallback de SPA.

### Migración (apps consumidoras)

- Sin cambios en la librería publicada; solo demo, docs y CI.

## [0.1.13] — 2026-07-31

### Corregido

- **Tipos TypeScript en consumidores:** los `.d.ts` publicados ya no reexportan con rutas rotas (`../components/*` / `../shared/*`), que degradaban imports (`ToastShowHandler`, `ButtonProps`, `useToast`, etc.) a `any`.
- El barrel público (`src/index.ts`) usa imports relativos (`./components/*`, `./shared/*`).
- Las declaraciones se generan con `tsc -p tsconfig.lib.json` (entry en `dist/index.d.ts`) y un post-proceso (`scripts/fix-dts-paths.mjs`) que elimina imports CSS y reescribe aliases `@/` restantes a rutas relativas válidas.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.13`.
2. No hay cambios de API de runtime; solo tipos.

## [0.1.12] — 2026-07-23

### Añadido

- **Temas globales reales:** sin prop `theme`, todos los componentes heredan `data-theme` + `data-mode` del `<html>` (igual que Sidebar).
- Bridge CSS (`_component-bridge.css`) que mapea tokens de componentes → `--glb-*` para que Button, Select, TextBox, TextArea, DateBox, RangeDateBox, CheckButton, OptionGroup, Popup, Toast, DataGrid y PageActionsMenu respondan al tema del sistema.
- Tokens generados por familia (`_generated-{default,modern,enterprise}.css`) + script `pnpm themes:generate`.
- Familias más diferenciadas (Default periwinkle, Modern sage, Enterprise powder blue) en light y dark.
- Docs actualizadas: [Temas y apariencia](/guide/themes), installation y getting-started.

### Cambiado

- `resolveTheme` / `themeToStyle`: sin prop `theme` ya no fuerzan el preset `light`; devuelven `undefined` y dejan que el CSS global pinte.
- Popup: superficies por familia (ya no genéricas iguales en todos los temas).
- DateBox / RangeDateBox / Toast / OptionGroup: fallbacks CSS alineados a `--glb-*` (sin fondos oscuros “al aire”).
- Sidebar: se quitó el `border-bottom` del header.

### Migración (apps consumidoras)

1. Actualizar a `glubox@0.1.12`.
2. Importar temas: `import 'glubox/themes/index.css'` (además de `glubox/style.css`).
3. Setear en `<html>`: `data-theme="default|modern|enterprise"` y `data-mode="light|dark"`.
4. Quitar `theme="light"` / `theme={{...}}` repetidos en cada componente si querés heredar el global; dejá `theme` solo para overrides puntuales.

## [0.1.11] — 2026-07-18

### Corregido

- **DataGrid paginación:** al ir a la página 2+ ya no vuelve a la 1. El reset a página 1 solo corre cuando cambian búsqueda u orden, no al navegar.
- **Demo DataGrid:** el ejemplo de “pocas filas” ya no comparte `pageIndex` con el grid principal (con 1 sola página el clamp empujaba siempre a la página 0).

## [0.1.10] — 2026-07-18

### Añadido

- **`PageActionsMenu`** — menú hamburguesa de acciones de página (trigger + panel `role="menu"`).
- Prop **`height`**: altura del trigger (prevalece sobre `size`, botón cuadrado).
- Contrato **`NavigationNode`** (`surface`: sidebar \| content \| actions, `kind`: group \| view \| action).
- Helpers: `filterBySurface`, `filterNodesBySurface`, `childrenOf`, `findNavigationNodeById`, `findNavigationNodeByRoute`, `pageActionsFromNode`, `contentTabsFromNode`.
- Demo `/componentes/pageactionsmenu` (3 menús de ejemplo), docs VitePress y sección NavigationNode en [menu-api](/guide/menu-api).

## [0.1.9] — 2026-07-18

### Corregido

- **DataGrid a prueba de datos:** `dataSource` se valida con `Array.isArray`. `[]` monta toolbar / empty / pager sin `TypeError: … is not iterable`.
- Mensajes claros si `dataSource` es `null`/`undefined` o un objeto (p. ej. `{ items }`); hint opcional para envoltorios.
- `columns` y `pageSizeOptions` (si se pasan) deben ser arrays; error explícito en lugar de fallos opacos en `.map` / `for…of`.
- Iteraciones internas (`sortRows`, `filterRowsBySearch`, `useDataGrid`, selección) toleran valores no iterables.

### Documentación

- Sección **Datos — estructura esperada**: forma de fila (`T`), `columns` / `keyExpr`, ejemplos API con envoltorio `{ items }`, tabla de errores runtime.
- Demo Getting Started / How To / API props alineados al contrato `dataSource: T[]`.

## [0.1.8] — 2026-07-18

### Añadido

- **DataGrid:** API `dataSource` + `keyExpr` + `paging: { enabled, pageIndex` (0-based), `pageSize }`
- `normalizeDataGridProps` exportado + tests
- Guía de uso actualizada (docs + README)

### Cambiado

- Sin `height`/`maxHeight`, table **y card** se encogen a las filas visibles (fit-content).
- `onPageChange` entrega `pageIndex` **0-based**.
- Layout card: padding interno en cada tarjeta para que el contenido no quede pegado al borde.

### Eliminado (breaking)

- Props legacy del DataGrid: `data`, `getRowId`, `pagination`, `page`, `defaultPage`, `pageSize`, `defaultPageSize`. Usá `dataSource`, `keyExpr` y `paging`.

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
