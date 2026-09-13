---
name: gluebox-rangedatebox
description: >-
  Use this skill when implementing date range selections (start and end date) in Gluebox.
---

# Gluebox RangeDateBox

El componente `RangeDateBox` permite la selección de un período o rango de fechas (`start` y `end`) con validación y formato ISO `YYYY-MM-DD`.

## Importación

```tsx
import { RangeDateBox, rangeDateBoxThemes } from 'glubox';
import type { RangeDateBoxProps, DateRangeValue } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `value` | `DateRangeValue` | `undefined` | Objeto `{ start: string, end: string }` en modo controlado |
| `defaultValue` | `DateRangeValue` | `undefined` | Rango inicial en modo no controlado |
| `onChange` | `(range: DateRangeValue) => void` | `undefined` | Callback emitido al cambiar el rango |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `disabled` | `boolean` | `false` | Deshabilita el control |

## Ejemplo de Uso

```tsx
<RangeDateBox
  label="Período de auditoría"
  showClearButton
  defaultValue={{ start: '2026-01-01', end: '2026-01-31' }}
  onChange={(rango) => console.log('Rango seleccionado:', rango)}
/>
```
