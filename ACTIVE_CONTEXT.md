# Active Context - Gluebox (`glubox`)

Este archivo mantiene el contexto activo del proyecto para que ningún agente o sesión pierda el estado, arquitectura, decisiones y tareas en progreso.

---

## 1. Visión General del Proyecto

- **Nombre del paquete**: `glubox` (repositorio `gluebox`), versión actual **0.1.25**.
- **Propósito**: Librería de componentes React para aplicaciones empresariales — Sidebar RBAC, PageActionsMenu, DataGrid, formularios (TextBox, NumberBox, FileBox / FileUploader, ColorPicker, TextArea, Select, DateBox, RangeDateBox), Overlays (Popup modal, Toast), botones y sistema de temas personalizable.
- **Stack**: React 19, TypeScript (~6.0), Vite 8, Vitest 4 (happy-dom), CSS modular/BEM (sin Tailwind).
- **Publicación / Build**:
  - `pnpm build`: Compila aplicación demo.
  - `pnpm build:lib`: Genera bundle de la librería (`dist/glubox.js`, `dist/glubox.css`, tipos `.d.ts` y temas en `dist/themes/`).
  - `pnpm test`: Ejecuta suite completa de Vitest.

---

## 2. Convenciones Arquitectónicas y de Código

1. **Estilos y Temas**:
   - Convención BEM con prefijo `glb-` (ej. `glb-filebox`, `glb-filebox__control`, `glb-filebox--dragging`).
   - Tokens CSS heredables a través de variables (`--glb-accent`, `--glb-surface`, `--textbox-*`, etc.).
   - No se utiliza Tailwind para estilos de la librería; todo se define en archivos `.css` importados en `src/index.ts` y en cada componente.
2. **Componentes Controlados / No Controlados**:
   - Todos los inputs y selectores admiten tanto modo no controlado (`defaultValue`) como controlado (`value` + `onChange`).
   - Botón de limpieza estándar (`showClearButton`, con alias retrocompatible `clearable`).
3. **Portales para Overlays y Dropdowns**:
   - `Select` y `ColorPicker` usan popovers montados en portal (`document.body`) con `position: fixed` para evitar ser recortados por contenedores con `overflow: hidden` o `overflow: auto`.
   - `Popup` y `Toast` se montan mediante portales.
4. **Nombres y Aliases**:
   - `FileBox` es el componente de carga y selección de archivos; se exporta también como `FileUploader` (y `FileUploaderProps`) para máxima compatibilidad y ergonomía.

---

## 3. Catálogo de Componentes y Estado

| Componente | Carpeta | Estado / Notas Clave |
|------------|---------|-----------------------|
| `Button` | `src/components/Button` | Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`. Tamaños: `sm`, `md`, `lg`. |
| `CheckButton` | `src/components/CheckButton` | Botón toggle tipo checkbox. |
| `ColorPicker` | `src/components/ColorPicker` | Swatch + input hex + panel HSV en portal (`position: fixed`). No usa `type="color"` nativo para evitar chrome del SO. |
| `DataGrid` | `src/components/DataGrid` | Tabla empresarial con paginación, filtros toolbar, columnas sticky, ordenamiento, selección y soporte touch scroll nativo (liberación de scroll vertical en modo natural/sin height fijo). |
| `DateBox` | `src/components/DateBox` | Selector de fecha (`YYYY-MM-DD`), modo `input` o `icon`. |
| `RangeDateBox` | `src/components/RangeDateBox` | Selector de rango de fechas `{ start, end }`. |
| `FileBox` / `FileUploader` | `src/components/FileBox` | **CORREGIDO**: Drag & Drop con contador de profundidad (`dragDepthRef`), `DataTransfer` fallback, dropzone como `<div role="button">` (previene falsos clics de button nativo), alias `FileUploader` exportado. **NUEVO**: prop `reorderable` → tira horizontal de miniaturas con reordenado por arrastre (pointer/touch/teclado) y tile "+". |
| `NumberBox` | `src/components/NumberBox` | Input numérico sin spinners nativos feos, con botones +/- y step/min/max. |
| `OptionGroup` | `src/components/OptionGroup` | Selección exclusiva tipo radio agrupado. |
| `PageActionsMenu`| `src/components/PageActionsMenu` | Barra de acciones y menú responsive para cabeceras de página. |
| `Popup` | `src/components/Popup` | Diálogo modal accesible, arrastrable, con backdrop y acciones. |
| `Select` | `src/components/Select` | Menú desplegable accesible con navegación por teclado y portal flotante. |
| `Sidebar` | `src/components/Sidebar` | Barra lateral de navegación con colapsado, filtrado RBAC por permisos y submenús. |
| `TagBox` | `src/components/TagBox` | Campo para agregar tags en línea: Enter/coma confirman, Backspace borra el último, chips removibles, `maxTags`, prevención de duplicados, clear y temas. |
| `TextArea` | `src/components/TextArea` | Input multilínea con resize, auto-grow opcional y tokens consistentes con TextBox. |
| `TextBox` | `src/components/TextBox` | Input base del sistema de diseño (íconos, password toggle, labels top/floating/outlined/left). |
| `Toast` | `src/components/Toast` | Notificaciones flotantes (`ToastProvider`, `useToast`). |

---

## 4. Trabajo Reciente y Tareas Activas

### Tarea: Reordenamiento de imágenes en FileBox — prop `reorderable` (Completada)
- **Solicitud**: poder ordenar las imágenes seleccionadas arrastrándolas (click sostenido o touch) en una tira horizontal de miniaturas cuadradas, donde el último tile es un "+" para agregar más y la de la izquierda es la primera.
- **Decisiones de API** (confirmadas con el usuario):
  1. Reordenado por arrastre del tile completo (mouse y touch) con indicador visual.
  2. Se notifica con el `onChange` existente (array `File[]` en el nuevo orden) + prop `reorderable`.
  3. Previsualización de imágenes con miniaturas (objectURL).
- **Solución implementada**:
  1. **Tipos**: prop `reorderable?: boolean` en [FileBox.types.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/type/FileBox.types.ts) (implica `multiple`).
  2. **Estado**: `moveAt(from, to)` en [useFileBoxState.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/hooks/useFileBoxState.ts); utilidades `fileKey`, `moveFileItem`, `stableFileKeys` en [reorder.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/utils/reorder.ts).
  3. **Drag pointer/touch**: sesión con listeners a nivel `document` (`pointermove`/`pointerup`/`pointercancel`) en lugar de `setPointerCapture` en [FileBox.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/FileBox.tsx); umbral de activación de 4px y reordenado "live" derivado (`displayFiles`); el commit (`onChange`) se emite una sola vez al soltar. `touch-action: none` en tiles para touch.
     - **Fix asimetría izquierda/derecha**: al reordenar, React mueve el nodo arrastrado (`lastPlacedIndex`) y el navegador libera implícitamente el pointer capture → `lostpointercapture` cancelaba el drag izquierda→derecha. Con listeners de documento la sesión es inmune a los movimientos de DOM. Además `computeTargetIndex` ahora **excluye el tile arrastrado** y cuenta los otros midpoints (sin blanco móvil).
     - **Fantasma flotante**: clon del tile en portal a `document.body` (`position: fixed`, `pointer-events: none`) que sigue al puntero con `translate3d`; el tile origen queda como placeholder punteado (`--source`). Métricas de agarre en estado (`ghostMetrics`) para cumplir `react-hooks/refs`.
     - **UI coherente con `reorderable`**: se ocultan el campo de resumen ("N archivos seleccionados") y el botón "Elegir archivo"; la tira + "+" es toda la interfaz. Los drops del SO sobre la tira agregan archivos (`glb-filebox__thumb-area` con resaltado).
  4. **Teclado**: tiles focusables (`tabIndex=0`, `aria-label` con posición), `←`/`→` mueven una posición.
  5. **Miniaturas**: hook [useObjectUrls.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/hooks/useObjectUrls.ts) (mapa File→objectURL estable, sin parpadeos al reordenar); fallback con extensión para no-imágenes.
  6. **UI**: tile "+" final (oculto al alcanzar `maxFiles` o `disabled`), botón × en cada miniatura, `glb-filebox--reorderable` y clases `glb-filebox__thumb-*` en [FileBox.css](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/css/FileBox.css).
     - **Límite visible**: con `maxFiles` el tile "+" se desplaza al final y desaparece al alcanzar el límite; se agregó el contador `N/maxFiles` (`glb-filebox__thumb-counter`) debajo de la tira. Se descartaron los casilleros vacíos fijos (no aportan acción).
  7. **Tests**: [FileBox.reorder.test.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/FileBox.reorder.test.tsx) (15 tests: strip/"+", fallback, drag pointer en ambas direcciones, fantasma flotante, campo oculto, teclado, Escape, contador, quitar, maxFiles, disabled).
  8. **Docs**: prop en skill [gluebox-filebox](file:///home/solivo/Documentos/ecunexo/gluebox/.agents/skills/gluebox-filebox/SKILL.md), sección "Reordenamiento" en [forms.md](file:///home/solivo/Documentos/ecunexo/gluebox/docs/components/forms.md) y control `reorderable` en [fileBoxMeta.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/demo/metadata/fileBoxMeta.ts).
- **Verificación**: `pnpm test` (122 tests OK), `pnpm build`, `pnpm build:lib` y lint de FileBox sin errores.

### Tarea: Nuevo componente `TagBox` (Completada)
- **Solicitud**: componente para agregar tags en línea, siguiendo las convenciones de la librería (BEM, tokens CSS, controlado/no controlado, accesibilidad, tests).
- **Decisiones de API** (confirmadas con el usuario):
  1. Valor simple `string[]` (`value` / `defaultValue`, `onChange(tags: string[])`).
  2. Enter y coma confirman tags; Backspace con input vacío borra el último; Escape limpia el borrador.
  3. Duplicados prevenidos por defecto (case-insensitive), opt-in con `allowDuplicates`.
- **Implementación**:
  1. **Estructura**: `src/components/TagBox/` con `TagBox.tsx`, `type/TagBox.types.ts`, `theme/` (`TagBox.theme.types.ts`, `defaultThemes.ts` con 6 presets, `resolveTheme.ts` con tokens `--tagbox-*`), `css/TagBox.css`, `index.ts` y `TagBox.test.tsx` (13 tests).
  2. **Componente**: variantes `primary/secondary/outline/ghost`, tamaños `sm/md/lg`, `labelPosition` `top/floating/outlined/left` (patrón `glb-outlined-field` compartido), `maxTags`, `allowDuplicates`, `showClearButton`/`clearable`, `helperText`/`error`/`errorMessage`, `fullWidth`/`width`, `theme`, `disabled`, ARIA (`aria-invalid`, `aria-label` en botones de quitar).
  3. **Export**: registrado en `src/index.ts` (CSS + tipos + `TagBox`, `tagBoxThemes`).
  4. **Temas**: bloque `/* ── TagBox ── */` en [\_component-bridge.css](file:///home/solivo/Documentos/ecunexo/gluebox/src/styles/themes/_component-bridge.css) (mapeo a `--glb-*`) y spec en [generate-missing-theme-css.mts](file:///home/solivo/Documentos/ecunexo/gluebox/scripts/generate-missing-theme-css.mts); regenerados `_generated-*.css` con `pnpm themes:generate`. Selectores `glb-tagbox--outlined` agregados a [outlined-label.css](file:///home/solivo/Documentos/ecunexo/gluebox/src/styles/outlined-label.css).
  5. **Demo**: `TagBoxDemo.tsx`, `tagBoxMeta.ts` (playground), entrada en `docRegistry.ts` / `eventTypesRegistry.ts`, ruta en `AppRouter.tsx`, ítem en `mockMenu.json`.
  6. **Docs**: sección TagBox en [forms.md](file:///home/solivo/Documentos/ecunexo/gluebox/docs/components/forms.md).
- **Verificación**: `pnpm test` (107 tests OK), `pnpm themes:generate`, `pnpm build`, `pnpm build:lib` y `pnpm lint` (sin errores nuevos en TagBox) pasan.

### Tarea: Ítems bloqueados en Sidebar — `disabled`, `locked`, `disabledReason` (Completada, v0.1.25)
- **Problema previo**: los módulos no contratados mostraban el motivo concatenado al label (`"Ítems · Módulo no incluido en tu plan."`), truncándose en el sidebar; no existía forma de renderizar un candado ni un estado deshabilitado real.
- **Solución implementada**:
  1. **Tipos**: `MenuItemLockable` en [menu.types.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/type/menu.types.ts) con `disabled`, `locked` y `disabledReason`; aplicado a `MenuItem` y `MenuSubItem`.
  2. **Render**: [SidebarItem.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/SidebarItem.tsx) y [SidebarSubItem.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/SidebarSubItem.tsx) aplican `aria-disabled`, `title`, clase `sidebar__link--disabled`, bloquean la navegación y muestran el candado (`locked`). Los ítems con hijos siguen expandiéndose.
  3. **Icono**: `lock` agregado a [SidebarBuiltinIcons.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/SidebarBuiltinIcons.tsx) (SVG propio, sin Lucide).
  4. **Estilos**: `sidebar__link--disabled` y `sidebar__lock` en [Sidebar.css](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/css/Sidebar.css).
  5. **Docs**: [menu-api.md](file:///home/solivo/Documentos/ecunexo/gluebox/docs/guide/menu-api.md) y [sidebar.md](file:///home/solivo/Documentos/ecunexo/gluebox/docs/components/sidebar.md).
  6. **Tests**: [Sidebar.test.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/Sidebar/Sidebar.test.tsx).

### Tarea: Corrección de Drag & Drop en FileBox / FileUploader (Completada)
- **Problema previo**:
  1. Al arrastrar un archivo, al pasar sobre elementos hijos o textos, el evento `dragleave` recibía `relatedTarget = null` (comportamiento estándar del navegador al arrastrar desde el explorador del SO), provocando que `(currentTarget as HTMLElement)?.contains(null)` fuera `false` y apagando prematuramente el estado `dragging`.
  2. La dropzone estaba implementada como un `<button type="button">`. Al soltar un archivo en Chromium/Linux, el `mouseup` sobre un elemento `<button>` disparaba un evento sintético de `click`, ejecutando `openPicker()` y abriendo el diálogo de selección nativo inmediatamente después del drop, interfiriendo con la carga.
  3. No se exportaba el alias `FileUploader` solicitado por los desarrolladores que buscan ese nombre intuitivo.
- **Solución implementada**:
  1. **Contador de profundidad**: Implementado `dragDepthRef` en [FileBox.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/FileBox.tsx) para controlar `dragenter` (+1) y `dragleave` (-1), apagando `dragging` únicamente cuando `dragDepthRef <= 0`.
  2. **Dropzone accesible sin botón nativo**: La dropzone ahora es un `<div role="button" tabIndex={0} ...>` con manejo de teclado (`Enter` y `Espacio`) y atributos ARIA (`aria-disabled`), eliminando el falso `click` nativo de `<button>` al soltar archivos.
  3. **Extracción robusta de archivos**: Soporte tanto para `e.dataTransfer.files` como para `e.dataTransfer.items`, con sincronización al `<input type="file">` nativo mediante `new DataTransfer()`.
  4. **Alias `FileUploader`**: Exportado en [FileBox.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/FileBox.tsx), `src/components/FileBox/index.ts` y [src/index.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/index.ts).
  5. **Estilos CSS**: Actualizado [FileBox.css](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/css/FileBox.css) con soporte para `:focus-visible`, `[aria-disabled="true"]` y estados hover/drag consistentes.
  6. **Tests**: Añadidos tests unitarios en [FileBox.test.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/FileBox/FileBox.test.tsx) validando drag & drop en modo dropzone, en modo field y con `disabled=true`.
  7. **Vitest config**: Soporte de archivos `.test.tsx` habilitado en [vitest.config.ts](file:///home/solivo/Documentos/ecunexo/gluebox/vitest.config.ts).

### Tarea: Corrección de Scroll Táctil en DataGrid en Vistas sin Altura Fija (Completada)
- **Problema previo**:
  1. En dispositivos táctiles (smartphones y tabletas iOS WebKit y Android Chromium), al deslizar verticalmente sobre filas o tarjetas en vistas donde `DataGrid` no tiene altura fija (`height` ni `maxHeight`), el gesto táctil quedaba congelado / bloqueado.
  2. Causas: `overscroll-behavior: contain;` en `.glb-datagrid__scroll--cards`, anidamiento de `overflow: auto` dentro de `.glb-datagrid__viewport { overflow: hidden; }` sin altura fija en px, `touch-action: manipulation;` en tarjetas que interfería con el gesto `pan-y`, y en modo tabla `overflow: auto` vertical interceptaba el gesto en lugar de propagarlo al scroll de la página.
- **Solución implementada**:
  1. **Modo Tarjetas (sin altura fija)**:
     - `.glb-datagrid--card-layout:not(.glb-datagrid--surface-sized) .glb-datagrid__viewport`: `overflow: visible; height: auto;`.
     - `.glb-datagrid--card-layout:not(.glb-datagrid--surface-sized) .glb-datagrid__scroll--cards`: `overflow: visible; height: auto; max-height: none; overscroll-behavior: auto; touch-action: pan-y; -webkit-overflow-scrolling: touch;`.
     - `.glb-datagrid--card-layout .glb-datagrid__cards` y `.glb-datagrid--card-layout .glb-datagrid__card`: `touch-action: pan-y;`.
  2. **Modo Tabla (sin altura fija / no virtualizado)**:
     - `.glb-datagrid:not(.glb-datagrid--virtualized):not(.glb-datagrid--surface-sized):not(.glb-datagrid--card-layout) .glb-datagrid__viewport`: `height: auto; overflow: visible;`.
     - `.glb-datagrid:not(.glb-datagrid--virtualized):not(.glb-datagrid--surface-sized):not(.glb-datagrid--card-layout) .glb-datagrid__scroll`: `overflow-x: auto; overflow-y: visible; height: auto; max-height: none; overscroll-behavior-x: contain; overscroll-behavior-y: auto; touch-action: pan-x pan-y; -webkit-overflow-scrolling: touch;`.
  3. **Discriminación por altura configurada**:
     - Agregada la clase `isHeightConstrained && 'glb-datagrid--surface-sized'` al elemento raíz `.glb-datagrid` en [useDataGridController.ts](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/DataGrid/controller/useDataGridController.ts). Cuando se proporciona `height` o `maxHeight`, se preserva íntegramente el comportamiento original con scroll interno contenido.
  4. **Tests de verificación**:
     - Añadido [DataGrid.touchScroll.test.tsx](file:///home/solivo/Documentos/ecunexo/gluebox/src/components/DataGrid/DataGrid.touchScroll.test.tsx) validando la presencia/ausencia de `glb-datagrid--surface-sized` según las props y verificando la consistencia de las reglas CSS.

---

## 5. Protocolo para Mantener el Contexto

1. **Antes de realizar cambios**: Consultar este archivo [ACTIVE_CONTEXT.md](file:///home/solivo/Documentos/ecunexo/gluebox/ACTIVE_CONTEXT.md) y las skills de componentes en `.agents/skills/`.
2. **Durante la implementación**: Respetar las reglas de BEM, variables CSS y retrocompatibilidad de props.
3. **Después de realizar cambios**:
   - Ejecutar `pnpm test` y verificar que los tests pasen.
   - Ejecutar `pnpm build:lib` para confirmar que el bundle y las declaraciones `.d.ts` se generen sin errores.
   - Actualizar este archivo con la nueva información para futuras sesiones.
