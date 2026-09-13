---
name: gluebox-datebox
description: >-
  Use this skill when implementing single-date selection fields in Gluebox with standard YYYY-MM-DD format.
---

# Gluebox DateBox

El componente `DateBox` permite la entrada y selección de fechas en formato ISO `YYYY-MM-DD`, integrando el diseño visual unificado de campos de texto.

## Importación

```tsx
import { DateBox, dateBoxThemes } from 'glubox';
import type { DateBoxProps } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `value` | `string` | `undefined` | Fecha `YYYY-MM-DD` en modo controlado |
| `defaultValue` | `string` | `undefined` | Fecha inicial no controlada |
| `displayMode` | `'input' \| 'icon'` | `'input'` | Campo completo o solo botón de calendario |
| `showClearButton` | `boolean` | `false` | Botón para limpiar fecha |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Posición de la etiqueta |
| `disabled` | `boolean` | `false` | Deshabilita el control |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | `undefined` | Evento al cambiar fecha |

## Ejemplo de Uso

```tsx
<DateBox
  label="Fecha de nacimiento"
  labelPosition="outlined"
  showClearButton
  onChange={(e) => setFecha(e.target.value)}
/>
```
