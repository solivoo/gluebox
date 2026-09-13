---
name: gluebox-numberbox
description: >-
  Use this skill when implementing numeric inputs with step, min/max limits, spin buttons, and custom formatting in Gluebox.
---

# Gluebox NumberBox

El componente `NumberBox` es un campo numérico especializado que oculta los spinners nativos del navegador y proporciona botones de incremento/decremento integrados y consistentes.

## Importación

```tsx
import { NumberBox } from 'glubox';
import type { NumberBoxProps } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `min` | `number` | `undefined` | Valor mínimo permitido |
| `max` | `number` | `undefined` | Valor máximo permitido |
| `step` | `number` | `1` | Incremento/decremento por paso |
| `showSpinButtons` | `boolean` | `true` | Muestra botones de + y - |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Posición de la etiqueta |
| `disabled` | `boolean` | `false` | Deshabilita el control |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | `undefined` | Callback de cambio |

## Ejemplo de Uso

```tsx
<NumberBox
  label="Cantidad en inventario"
  min={0}
  max={999}
  step={5}
  showSpinButtons
  showClearButton
  defaultValue={10}
  onChange={(e) => setCantidad(Number(e.target.value))}
/>
```
