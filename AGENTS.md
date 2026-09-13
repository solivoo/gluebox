# Gluebox Agent Guidelines & Context

## Contexto Activo Obligatorio
Antes de iniciar cualquier tarea o responder al usuario, consulta siempre el archivo `ACTIVE_CONTEXT.md` en la raíz del proyecto para conocer el estado actual, convenciones arquitectónicas, decisiones de diseño y tareas en progreso. Al finalizar tareas relevantes, actualiza `ACTIVE_CONTEXT.md` para evitar pérdidas de contexto entre sesiones.

## Reglas de Desarrollo en Gluebox
1. **Arquitectura de Estilos**:
   - No usar Tailwind en los componentes de la librería.
   - Usar metodología BEM (`glb-[componente]__[elemento]--[modificador]`).
   - Usar tokens y variables CSS (`--glb-*`, `--textbox-*`).
2. **Componentes y Props**:
   - Soporte para componentes controlados (`value` + `onChange`) y no controlados (`defaultValue`).
   - Botón de limpieza unificado: prop `showClearButton` (mantener soporte a `clearable` por retrocompatibilidad).
   - Accesibilidad: siempre usar roles semánticos, atributos `aria-*` y soporte completo de teclado (`Enter`, `Space`, `Escape`, flechas según corresponda).
   - Dropdowns y popups deben usar portales (`document.body`) con `position: fixed` para no recortarse en contenedores con overflow.
3. **Verificación y Calidad**:
   - Todo cambio debe verificarse ejecutando `pnpm test` y `pnpm build:lib`.
   - Nuevas funcionalidades o correcciones de bugs deben acompañarse de tests en Vitest.
