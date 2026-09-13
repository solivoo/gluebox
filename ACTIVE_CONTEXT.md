# Active Context - Gluebox (`glubox`)

Este archivo mantiene el contexto activo del proyecto para que ningún agente o sesión pierda el estado, arquitectura, decisiones y tareas en progreso.

---

## 1. Visión General del Proyecto

- **Nombre del paquete**: `glubox` (repositorio `gluebox`), versión actual **0.1.23**.
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
| `DataGrid` | `src/components/DataGrid` | Tabla empresarial con paginación, filtros toolbar, columnas sticky, ordenamiento y selección. |
| `DateBox` | `src/components/DateBox` | Selector de fecha (`YYYY-MM-DD`), modo `input` o `icon`. |
| `RangeDateBox` | `src/components/RangeDateBox` | Selector de rango de fechas `{ start, end }`. |
| `FileBox` / `FileUploader` | `src/components/FileBox` | **CORREGIDO**: Drag & Drop con contador de profundidad (`dragDepthRef`), `DataTransfer` fallback, dropzone como `<div role="button">` (previene falsos clics de button nativo), alias `FileUploader` exportado. |
| `NumberBox` | `src/components/NumberBox` | Input numérico sin spinners nativos feos, con botones +/- y step/min/max. |
| `OptionGroup` | `src/components/OptionGroup` | Selección exclusiva tipo radio agrupado. |
| `PageActionsMenu`| `src/components/PageActionsMenu` | Barra de acciones y menú responsive para cabeceras de página. |
| `Popup` | `src/components/Popup` | Diálogo modal accesible, arrastrable, con backdrop y acciones. |
| `Select` | `src/components/Select` | Menú desplegable accesible con navegación por teclado y portal flotante. |
| `Sidebar` | `src/components/Sidebar` | Barra lateral de navegación con colapsado, filtrado RBAC por permisos y submenús. |
| `TextArea` | `src/components/TextArea` | Input multilínea con resize, auto-grow opcional y tokens consistentes con TextBox. |
| `TextBox` | `src/components/TextBox` | Input base del sistema de diseño (íconos, password toggle, labels top/floating/outlined/left). |
| `Toast` | `src/components/Toast` | Notificaciones flotantes (`ToastProvider`, `useToast`). |

---

## 4. Trabajo Reciente y Tareas Activas

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

---

## 5. Protocolo para Mantener el Contexto

1. **Antes de realizar cambios**: Consultar este archivo [ACTIVE_CONTEXT.md](file:///home/solivo/Documentos/ecunexo/gluebox/ACTIVE_CONTEXT.md) y las skills de componentes en `.agents/skills/`.
2. **Durante la implementación**: Respetar las reglas de BEM, variables CSS y retrocompatibilidad de props.
3. **Después de realizar cambios**:
   - Ejecutar `pnpm test` y verificar que los tests pasen.
   - Ejecutar `pnpm build:lib` para confirmar que el bundle y las declaraciones `.d.ts` se generen sin errores.
   - Actualizar este archivo con la nueva información para futuras sesiones.
