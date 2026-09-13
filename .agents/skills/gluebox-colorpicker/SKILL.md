---
name: gluebox-colorpicker
description: >-
  Use this skill when implementing color selection fields in Gluebox with hex input, HSV swatch panel, and popover portal.
---

# Gluebox ColorPicker

El componente `ColorPicker` ofrece selección de colores mediante muestra (swatch), campo de texto hexadecimal y un panel interactivo HSV desplegado en un portal (`position: fixed`).

## Importación

```tsx
import { ColorPicker, DEFAULT_COLOR_PRESETS } from 'glubox';
import type { ColorPickerProps, ColorPickerOnChangeHandler } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `value` | `string` | `undefined` | Color hexadecimal `#rrggbb` en modo controlado |
| `defaultValue` | `string` | `undefined` | Color inicial en modo no controlado |
| `onChange` | `(color: string) => void` | `undefined` | Emite `#rrggbb` (o `''` al limpiar) |
| `presets` | `readonly string[]` | `DEFAULT_COLOR_PRESETS` | Paleta de colores rápidos |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Ubicación de la etiqueta |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |

## Ejemplo de Uso

```tsx
<ColorPicker
  label="Color de marca"
  defaultValue="#3b82f6"
  showClearButton
  presets={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
  onChange={(color) => console.log('Nuevo color:', color)}
/>
```
