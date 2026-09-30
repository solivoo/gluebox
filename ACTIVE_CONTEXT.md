# Active Context - Gluebox (`glubox`)

Este archivo mantiene el contexto activo del proyecto para que ningún agente o sesión pierda el estado, arquitectura, decisiones y tareas en progreso.

---

## 1. Visión General del Proyecto

- **Nombre del paquete**: `glubox` (repositorio `gluebox`), versión actual **0.2.0**.
- **Propósito**: Librería de componentes React para aplicaciones empresariales — Sidebar RBAC, PageActionsMenu, DataGrid, formularios (TextBox, NumberBox, FileBox / FileUploader, ColorPicker, TextArea, Select, DateBox, RangeDateBox, Switch), Overlays (Popup modal, Toast), botones y sistema de temas personalizable.
- **Stack**: React 19, TypeScript (~6.0), Vite 8, Vitest 4 (happy-dom), Playwright, CSS modular/BEM (sin Tailwind).
- **Publicación / Build**:
  - `pnpm build`: Compila aplicación demo.
  - `pnpm build:lib`: Genera bundle de la librería (`dist/glubox.js`, `dist/glubox.css`, tipos `.d.ts` y temas en `dist/themes/`).
  - `pnpm test`: Ejecuta suite completa de Vitest (177 tests en 24 archivos).
  - `pnpm test:a11y`: Ejecuta auditoría automatizada axe + contraste WCAG AA (30 tests).
  - `pnpm test:visual`: Ejecuta suite de regresión visual Playwright (47 snapshots).
  - `pnpm new:component`: Generador CLI automatizado para nuevos componentes con TypeScript estricto, BEM CSS, temas, tests, doc y playground.

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
| `Switch` | `src/components/Switch` | Control deslizante de encendido/apagado (toggle switch) estilo MUI con soporte controlado/no controlado, posiciones de label, tamaños, loading y temas. |
| `TagBox` | `src/components/TagBox` | Campo para agregar tags en línea: Enter/coma confirman, Backspace borra el último, chips removibles, `maxTags`, prevención de duplicados, clear y temas. |
| `TextArea` | `src/components/TextArea` | Input multilínea con resize, auto-grow opcional y tokens consistentes con TextBox. |
| `TextBox` | `src/components/TextBox` | Input base del sistema de diseño (íconos, password toggle, labels top/floating/outlined/left). |
| `Toast` | `src/components/Toast` | Notificaciones flotantes (`ToastProvider`, `useToast`). |

---

## 4. Trabajo Reciente y Tareas Activas

### Tarea: Subpath Exports por Componente y Tree-shaking (Completada)
- **Solicitud**: habilitar importación granular directa (`glubox/components/Button`, etc.) mediante `exports` en `package.json`, bundlear chunks limpios y verificar tree-shaking real.
- **Configuración de Multi-Entry en Vite** ([vite.config.lib.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/vite.config.lib.ts)):
  - Detección dinámica de todas las carpetas con `index.ts` en `src/components/` para generar puntos de entrada independientes (`dist/components/[Component]/index.js`) además del barrel raíz (`dist/glubox.js`).
  - Chunks compartidos extraídos en `dist/chunks/[name]-[hash].js` para optimización de caché y deduplicación.
  - Estilos CSS unificados y preservados en `dist/glubox.css` (171.8 kB).
- **Subpath Exports en `package.json`**:
  - Declaradas entradas explícitas para los 18 componentes + `navigation` + `FileUploader` (alias de `FileBox`), además de wildcard fallback `"./components/*"`.
  - Agregado `"dist/chunks"` a la propiedad `files` para garantizar su distribución en npm.
- **Verificación Automatizada de Tree-shaking** ([src/test/subpath-exports.test.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/test/subpath-exports.test.ts)):
  - Validación de existencia en disco de todos los `.js` y `.d.ts` declarados en `exports`.
  - Bundling real programmatic con Vite: importar `glubox/components/Button` empaqueta solo ~10 KB (reducción del 95.7% frente a los ~240 KB de la librería completa) sin incluir código ni tokens de `DataGrid`, `FileBox` o `ColorPicker`.
  - Importar `glubox/components/Switch` genera un bundle ultra ligero de ~4.8 KB.
- **Documentación Actualizada**:
  - Actualizado [docs/guide/installation.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/guide/installation.md) y [AppearancePage.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/pages/docs/AppearancePage.tsx) para reflejar la disponibilidad oficial de `glubox/components/*`.
- **Verificación**: `pnpm test` (164 pasados en 23 suites), `pnpm test:a11y` (30 pasados), `tsc -b` (0 errores), `pnpm lint` (0 errores), `pnpm build`, `pnpm build:lib`, `pnpm docs:build`.
- **Pendientes sugeridos**: scaffold `pnpm new:component`, matriz SSR / React 19.

### Tarea: Accesibilidad automatizada — `vitest-axe` + Contraste WCAG AA (Completada)
- **Solicitud**: implementar auditoría automatizada de accesibilidad (a11y) con `vitest-axe` para todos los componentes y verificar ratios de contraste WCAG AA en temas.
- **Suite de Contraste WCAG AA** ([contrast.test.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/contrast.test.ts)):
  - Implementación matemática de luminancia relativa y fórmula de contraste WCAG 2.1 con soporte para composición alfa ($C_{comp} = C_{fg} \cdot \alpha + C_{bg} \cdot (1 - \alpha)$).
  - 12 pruebas automatizadas validando ratio $\ge 4.5:1$ en texto normal y muted sobre superficies base (`#FFFFFF` claro, `#121212` oscuro), y ratio $\ge 3.0:1$ para componentes interactivos/gráficos en ambos modos.
- **Auditoría de Componentes con `vitest-axe`** ([a11y.test.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/test/a11y.test.tsx)):
  - Cobertura completa de los 18 componentes UI (`Button`, `Switch`, `CheckButton`, `TextBox`, `NumberBox`, `TextArea`, `TagBox`, `DateBox`, `RangeDateBox`, `Select`, `OptionGroup`, `FileBox`, `ColorPicker`, `Popup`, `Toast`, `Sidebar`, `PageActionsMenu`, `DataGrid`).
  - Cada componente probado contra reglas WCAG (etiquetas accesibles, roles semánticos, `aria-*`, sin violaciones detectadas por axe-core en happy-dom).
- **Mejoras y Fixes de Accesibilidad Aplicados**:
  - `NumberBox`: agregados `aria-label="Incrementar"` y `aria-label="Decrementar"` en los botones de spin.
  - `TagBox`: corregido `aria-label={`Eliminar tag ${tag}`}` (se eliminaron comillas dobles literales anidadas que producían selectores CSS inválidos en `querySelector` y bucle de evaluación en `axe`).
  - `DataGridToolbar`: añadidas claves estables a los elementos del toolbar renderizados en array para evitar warnings de React.
  - `useToastItemLifecycle`: unificado `setTimeout` / `clearTimeout` isomórfico tipado contra `ReturnType<typeof setTimeout>`.
- **Scripts y CI**:
  - Añadido script `"test:a11y": "vitest run src/test/a11y.test.tsx src/styles/themes/contrast.test.ts"` a [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json).
  - Integrado de forma natural en `pnpm test` (ahora 159 tests en 22 archivos).
- **Verificación**: `pnpm test` (159 pasados), `pnpm test:a11y` (30 pasados), `tsc -b` (0 errores), `pnpm lint` (0 errores), `pnpm build`, `pnpm build:lib`, `pnpm docs:build`.
- **Pendientes sugeridos**: subpath exports `glubox/components/*` + tree-shaking, scaffold `pnpm new:component`, matriz SSR / React 19.

### Tarea: Versionado y Release 0.2.0 con Changesets (Completada)
- **Solicitud**: configurar Changesets (`@changesets/cli`), documentar el breaking change de eliminación de familias legacy en favor de `commerce`, preparar bump a `0.2.0` y guía de migración.
- **Changesets**: instalado `@changesets/cli`, configurado `.changeset/config.json` con acceso público y rama base `main`. Agregados scripts `changeset` y `version:packages` a [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json).
- **Bump a 0.2.0**: versión incrementada a `0.2.0` en [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json) reflejando los breaking changes semánticos (purga de temas `default/modern/enterprise` y unificación en `commerce`).
- **Changelog**: unificado y consolidado [CHANGELOG.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/CHANGELOG.md) bajo `[0.2.0] — 2026-09-30` con secciones completas de Breaking Changes, Nuevo componente `Switch`, Regresión visual, Calidad/Tooling y corrección de `TagBox`.
- **Documentación de Migración**: creada [docs/guide/migration-0.2.0.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/guide/migration-0.2.0.md) y enlazada en la barra de navegación de VitePress ([config.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/.vitepress/config.ts)).
- **Verificación**: `pnpm docs:build` y `pnpm build:lib` exitosos.

### Tarea: Regresión visual con Playwright en CI (Completada)
- **Solicitud**: implementar suite de regresión visual automatizada con Playwright en CI para detectar roturas visuales de componentes y temas.
- **Configuración** ([playwright.config.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/playwright.config.ts), [tsconfig.visual.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/tsconfig.visual.json)): suite configurada con servidor de producción `pnpm preview` en puerto 4173 (`baseURL`), viewport desktop estándar (1280x800), `reducedMotion: 'reduce'` para estabilidad de estilos y evitar flakiness por animaciones, template de snapshots limpio en `tests-visual/__snapshots__/{arg}{ext}`. Scripts `test:visual` y `test:visual:update` en [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json).
- **Cobertura** ([components.spec.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/tests-visual/components.spec.ts) y [states.spec.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/tests-visual/states.spec.ts)):
  - **18 componentes base** en `commerce-light` y `commerce-dark` (36 snapshots): Button, Switch, CheckButton, TextBox, NumberBox, FileBox, ColorPicker, TextArea, TagBox, Sidebar, DateBox, RangeDateBox, OptionGroup, Popup, Toast, PageActionsMenu, DataGrid, Select, aislando el contenedor `.cpg__preview-stage`.
  - **Estados clave e interactivos** (11 snapshots): Switch (unchecked con label superior, loading, error sm), Popup modal abierto (light/dark), Toast flotante activo `.glb-toast` (light/dark), App Shell completo y Layout (light/dark), Página de Apariencia (light/dark). Total: 47 pruebas visuales.
- **CI** ([.github/workflows/ci.yml](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/.github/workflows/ci.yml)): instalación automática de Playwright Chromium (`pnpm exec playwright install --with-deps chromium`), ejecución de `pnpm test:visual` y subida del reporte HTML como artefacto (`playwright-visual-report`) en caso de fallo.
- **Verificación**: `pnpm test:visual` (47 pasados en ~1.3 min), `pnpm exec tsc -b` (0 errores), `pnpm lint` (0 errores), `pnpm test` (129 pasados).

### Tarea: Eliminar familias default/modern/enterprise (Completada)
- **Solicitud**: dejar solo la familia `commerce` (MUI). Breaking change aplicado a todo el repo.
- **Paleta/builders**: [pastelPalette.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/pastelPalette.ts) conserva `commercePastel`/`commerceDanger`; `accentForPreset`/`dangerForPreset` resuelven solo commerce. Builders simplificados (sin ramas de familia): Button, CheckButton, OptionGroup, DataGrid, PageActionsMenu, Switch, `overlayThemeBuilder` y `toastThemeBuilder` (radius 4px, superficies Material fijas).
- **Presets**: `XThemePreset = 'commerce-dark' | 'commerce-light'` en los 16 componentes; registros y bloques hardcodeados (DateBox, RangeDateBox, Select, TextBox, TagBox, Sidebar) reducidos a commerce mediante scripts de brace-matching. `sidebarThemes` y `switchThemes` idem.
- **CSS**: borrados `default.css`, `modern.css`, `enterprise.css`, `_generated-default/modern/enterprise.css`; [index.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/index.css) importa solo `pastel-accents.css`, `commerce.css` y el bridge; [_component-bridge.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/_component-bridge.css) con selectores solo `commerce`; [pastel-accents.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/pastel-accents.css) solo commerce. `copy-themes.mjs` y exports de [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json) reducidos a `commerce.css` + `index.css`.
- **Generador/tests**: `Family = 'commerce'` en [generate-missing-theme-css.mts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/scripts/generate-missing-theme-css.mts) y `generated-tokens.test.ts` solo commerce (129 tests totales).
- **Demo/docs**: `AppLayout` solo **Commerce (MUI)** y `getStoredTheme` fijo; `AppearancePage` (tema único), metadatos de playground con presets commerce, `ComponentDocPage`, README, `docs/guide/{themes,installation,getting-started,event-types}.md`, `docs/components/*` y `docs/index.md` actualizados.
- **Verificación**: `tsc -b`, `pnpm test` (129), `pnpm build`, `pnpm build:lib`, `pnpm demo:build`, lint sin issues nuevos, detector `[]` (solo advertencia "Roboto overused" intencional) y capturas Playwright claro/oscuro.

### Tarea: Componente `Switch` (toggle on/off) (Completada)
- **Solicitud**: nuevo toggle. Decisiones confirmadas con el usuario: **Switch deslizante estilo MUI** (no botón toggle: ya existe CheckButton), nombre `Switch`, con controlado/no controlado, label posicionable, tamaños + loading y temas integrados.
- **API** ([Switch.types.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Switch/type/Switch.types.ts)): `checked`/`defaultChecked`/`onChange(checked)`, `label`, `labelPosition` (`right`|`left`|`top`|`bottom`), `size` (`sm`|`md`), `loading`, `disabled`, `helperText`, `error`/`errorMessage`, `fullWidth`, `width`, `theme`; extiende `InputHTMLAttributes` (name, required, aria-*, focus/blur).
- **Implementación** ([Switch.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Switch/Switch.tsx) + [Switch.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Switch/css/Switch.css)): `<label>` envuelve un `<input type="checkbox" role="switch">` oculto (Space nativo, click en label), track + thumb con transición, focus ring, spinner de loading, `prefers-reduced-motion`, sin portal (no lo necesita).
- **Temas**: [Switch.theme.types](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Switch/theme/Switch.theme.types.ts) con `track`/`thumb` + presets `commerce-light`/`commerce-dark` en [defaultThemes](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Switch/theme/defaultThemes.ts) vía `accentForPreset` (tras la eliminación de las otras familias). Checked = acento del tema vía bridge (`--glb-accent-surface`, `--glb-accent-on-fill`); neutros Material (`#9e9e9e`/`#4d4d4d` track, thumb `#fafafa`/`#bdbdbd`). El test del generador prohíbe `#fff` literal: por eso el thumb claro es `#fafafa` (el valor real de MUI).
- **Integración**: export en [src/index.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/index.ts) (CSS + tipos + `switchThemes`), bridge en [_component-bridge.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/_component-bridge.css), spec en [generate-missing-theme-css.mts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/scripts/generate-missing-theme-css.mts) y `_generated-*.css` regenerados.
- **Demo/docs**: [switchMeta.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/metadata/switchMeta.ts), [SwitchDemo.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/pages/demos/SwitchDemo.tsx), ruta `/componentes/switch`, listado de componentes, entrada en `mockMenu.json` (clonada de TagBox), `docRegistry`, `eventTypesRegistry`, [forms.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/components/forms.md), `docs/guide/*`, README y skill [.agents/skills/gluebox-switch](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/.agents/skills/gluebox-switch/SKILL.md).
- **Verificación**: `tsc -b`, `pnpm test` (132 tests, 9 nuevos de Switch), `pnpm build`, `pnpm build:lib`, `pnpm demo:build`, lint sin issues nuevos, detector impeccable `[]` y capturas Playwright del playground (claro/oscuro, apagado, loading, sm+error, label top).

### Tarea: Tema `commerce` — Material Design (MUI) para SaaS de e-commerce (Completada)
- **Solicitud**: crear una familia de tema para una SaaS de e-commerce. Decisiones confirmadas con el usuario: nombre `commerce`, alcance de familia completa (todos los componentes + claro/oscuro + exports + demo) y **renovación final con identidad MUI** (se descartó la primera propuesta ámbar).
- **Paleta** ([pastelPalette.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/pastelPalette.ts)): `commercePastel` claro `surface #1976D2` / hover `#1565C0` / active `#0D47A1` / `onFill #FFFFFF` y oscuro `surface #90CAF9` / `onFill rgba(0,0,0,0.87)`; `commerceDanger` con error Material `#D32F2F` (dark `#F44336`); `accentForPreset` y `dangerForPreset` resuelven `commerce-*`.
- **Presets**: `commerce-light` / `commerce-dark` en los 15 componentes con temas (Button, CheckButton, DataGrid, DateBox, RangeDateBox, Select, Sidebar, TagBox, TextArea, TextBox, OptionGroup, PageActionsMenu, Popup, Toast) y en `sidebarThemes`.
  - Builders por paleta (Button, CheckButton, OptionGroup, DataGrid, Popup, Toast, PageActionsMenu) con rama `commerce`; los bloques hardcodeados (DateBox, RangeDateBox, Select, TextBox, TagBox, Sidebar) se clonaron de `enterprise` y se recolorearon a MUI (scripts temporales, ya eliminados).
  - **Apariencia MUI**: shape `4px` en todos los presets; botones contained con elevación Material 2/4; `textTransform: 'uppercase'` + `letterSpacing: '0.02857em'` nuevos tokens opcionales de `ButtonTheme` ([types](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Button/theme/Button.theme.types.ts), [resolveTheme](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Button/theme/resolveTheme.ts) y [Button.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/Button/css/Button.css)); `overlayThemeBuilder`/`toastThemeBuilder` reciben `family` y aplican radio 4px; PageActionsMenu pasa `accentText` a `variants()`.
  - `overlayThemeBuilder.familySurfaces` ganó la entrada `commerce` (superficies Material para Popup/Toast).
- **CSS global**: [commerce.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/commerce.css): Roboto (`--glb-font-family`), superficies MUI (`#FAFAFA`/`#FFFFFF` y `#121212`/`#1E1E1E`), sidebar Material, overlays con elevación 24, outlined/text de Button en color primario y **elevación contained** solo para esta familia (`.glb-btn--primary/danger` con `--btn-shadow`/`--btn-hover-shadow`); bloque commerce en [pastel-accents.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/pastel-accents.css); selectores en [_component-bridge.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/_component-bridge.css).
  - **Ojo**: no agregar overrides de tokens en `_component-bridge.css` que apliquen solo a una familia; `parseBridgeTokenMap` mapea por nombre sin leer selectores y contamina el CSS generado de las demás. Por eso los overrides MUI viven en `commerce.css` con selector `html[data-theme="commerce"]` (mayor especificidad que el bridge).
- **Generación/registro**: `Family` del generador [generate-missing-theme-css.mts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/scripts/generate-missing-theme-css.mts) generaba `commerce` → `_generated-commerce.css`; [index.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/styles/themes/index.css) lo importa; [copy-themes.mjs](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/scripts/copy-themes.mjs) y export `glubox/themes/commerce.css` en [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json). (Los `_generated-default/modern/enterprise.css` se eliminaron después, ver tarea siguiente.)
- **Demo/docs**: selector **Commerce** en [AppLayout.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/layout/AppLayout.tsx), tabla de 4 temas en [AppearancePage.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/pages/docs/AppearancePage.tsx) (“Material Design (MUI) / Azul #1976D2”), opciones commerce en 17 `*Meta.ts`, y docs [themes.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/guide/themes.md), [installation.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/guide/installation.md), [sidebar.md](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/docs/components/sidebar.md) y README.
- **Chrome de la demo tokenizado**: tabs activas y firmas de eventos (`--glb-accent-sidebar`), badges DEFAULT (`--glb-accent-subtle-bg/text`), focus de select/text (`--glb-accent-border-strong` / `--glb-accent-focus-ring`), toggle (`--glb-accent-surface` + knob `--glb-accent-on-fill` en checked) y selección de tarjeta DataGrid, en [ComponentPlayground.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/playground/ComponentPlayground.css), [PropControl.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/playground/PropControl.css) y [DataGridDemo.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/demo/pages/demos/DataGridDemo.css).
- **Verificación**: `pnpm exec tsc -b`, `pnpm test` (123 tests), `pnpm build`, `pnpm build:lib`, `pnpm demo:build`, detector impeccable (`[]`) y capturas Playwright claro/oscuro. Probe DOM confirma Roboto, `#1976D2`, radio 4px, uppercase y elevación Material en el botón.
- **Bugfix detectado en la revisión visual (TagBox):** `TagBox.css` usaba `--tagbox-bg/border/text/hover-*/focus-*/disabled-*/error-*` sin mapearlos desde `--tagbox-primary/secondary/outline/ghost-*` (TextBox sí lo hace). Al no existir la variable, `border-color` caía a `currentColor` (borde negro en claro, blanco en oscuro). Se agregaron los 4 bloques de variante en [TagBox.css](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/components/TagBox/css/TagBox.css); verificado con probe DOM en commerce light/dark y default light (rest/focus).
- **Nota**: los 2 errores de lint de entonces (`useDataGridController.ts` y `ColorPicker` set-state-in-effect) se resolvieron en la tarea de calidad posterior.

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

### Tarea: Scaffold de Componentes (`pnpm new:component`) (Completada)
- **Objetivo**: Proveer una herramienta CLI interactiva y automatizada para crear nuevos componentes en Gluebox sin boilerplate manual, garantizando el cumplimiento estricto de las reglas arquitectónicas (BEM, CSS sin Tailwind, ForwardRef, soporte controlado/no controlado, WCAG AA, temas commerce-light/dark y subpath exports).
- **Implementación**:
  - Script CLI en [scripts/scaffold-component.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/scripts/scaffold-component.ts) ejecutable con `pnpm new:component` o `node scripts/scaffold-component.ts`.
  - Soporte para preguntas interactivas (`readline/promises`) y parámetros directos (`pnpm new:component <Nombre> [Descripción] [Categoría]`).
  - Soporte para flag `--dry-run` para previsualizar los cambios sin tocar el disco.
  - Validación de nombres en `PascalCase` y detección proactiva de colisiones para no sobreescribir componentes existentes.
  - **Generación de 12 archivos**:
    1. `src/components/[Name]/[Name].tsx` (ForwardRef, clases BEM `glb-[name]`, themeToStyle, ARIA).
    2. `src/components/[Name]/type/[Name].types.ts` (Props con sizes, variants, theme input).
    3. `src/components/[Name]/theme/[Name].theme.types.ts` (Tokens y tipos de tema).
    4. `src/components/[Name]/theme/defaultThemes.ts` (Presets `commerce-light` y `commerce-dark`).
    5. `src/components/[Name]/theme/resolveTheme.ts` (Funciones `resolveTheme` y `themeToStyle`).
    6. `src/components/[Name]/css/[Name].css` (Variables `--glb-[name]-*` y clases BEM completas).
    7. `src/components/[Name]/[Name].test.tsx` (Tests Vitest nativos con `createRoot` + `act`).
    8. `src/components/[Name]/index.ts` (Barrel export del componente y sus tipos).
    9. `src/demo/metadata/[name]Meta.ts` (Definición interactiva para el playground).
    10. `src/demo/pages/demos/[Name]Demo.tsx` (Página de demo con `ComponentPlayground`).
    11. `docs/components/[slug].md` (Documentación VitePress con ejemplos, subpath export y tabla de props).
    12. `.agents/skills/gluebox-[slug]/SKILL.md` (Skill para agentes con convenciones BEM y tokens).
  - **Actualizaciones automáticas del sistema**:
    - [src/index.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/index.ts): Import del CSS y re-export tipado del componente.
    - [package.json](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/package.json): Subpath export `./components/[Name]` para tree-shaking.
    - [src/test/a11y.test.tsx](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/test/a11y.test.tsx): Inclusión del nuevo componente en la auditoría automatizada con `axe`.
  - **Suite de pruebas**:
    - [src/test/scaffold-component.test.ts](file:///home/solivo/Documentos/ecunexo/Monorepo/Gluebox/src/test/scaffold-component.test.ts): 13 tests unitarios validando generación de archivos, casing, prevención de colisiones y modo dry-run.

---

## 5. Protocolo para Mantener el Contexto

1. **Antes de realizar cambios**: Consultar este archivo [ACTIVE_CONTEXT.md](file:///home/solivo/Documentos/ecunexo/gluebox/ACTIVE_CONTEXT.md) y las skills de componentes en `.agents/skills/`.
2. **Durante la implementación**: Respetar las reglas de BEM, variables CSS y retrocompatibilidad de props.
3. **Después de realizar cambios**:
   - Ejecutar `pnpm test` y verificar que los tests pasen.
   - Ejecutar `pnpm build:lib` para confirmar que el bundle y las declaraciones `.d.ts` se generen sin errores.
   - Actualizar este archivo con la nueva información para futuras sesiones.
