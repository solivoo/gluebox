---
name: gluebox-textarea
description: >-
  Use this skill when implementing multi-line text input fields with resize controls, character counting, and consistent theme tokens in Gluebox.
---

# Gluebox TextArea

El componente `TextArea` ofrece un campo de texto multilínea enriquecido que comparte los tokens de diseño visual, variantes, temas y posiciones de label de `TextBox`.

## Importación

```tsx
import { TextArea, textAreaThemes } from 'glubox';
import type { TextAreaProps } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `rows` | `number` | `3` | Número visible de filas iniciales |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Modo de redimensión del usuario |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Posición de la etiqueta |
| `helperText` | `string` | `undefined` | Texto de ayuda o feedback |
| `error` | `boolean` | `false` | Estado de error visual |
| `errorMessage` | `string` | `undefined` | Mensaje de error |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del ancho disponible |

## Ejemplo de Uso

```tsx
<TextArea
  label="Descripción del problema"
  labelPosition="outlined"
  placeholder="Explica detalladamente la situación..."
  rows={4}
  resize="vertical"
  helperText="Máximo 1000 caracteres"
  showClearButton
/>
```
