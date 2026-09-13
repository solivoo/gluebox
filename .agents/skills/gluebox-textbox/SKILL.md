---
name: gluebox-textbox
description: >-
  Use this skill when implementing text inputs, password fields with toggle, icons, clear button, and label positions in Gluebox.
---

# Gluebox TextBox

El componente `TextBox` es el bloque fundamental de entrada de texto del sistema Gluebox, soportando variantes (`primary`, `secondary`, `outline`, `ghost`), posiciones de label (`top`, `floating`, `outlined`, `left`), íconos a izquierda/derecha, botón para mostrar/ocultar contraseña y botón de limpieza.

## Importación

```tsx
import { TextBox, textBoxThemes } from 'glubox';
import type { TextBoxProps, TextBoxLabelPosition, TextBoxVariant } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `type` | `string` | `'text'` | Tipo nativo HTML (`'text'`, `'password'`, `'email'`, etc.) |
| `showPasswordToggle` | `boolean` | `false` | Muestra botón para revelar contraseña (con `type="password"`) |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `iconLeft` / `iconRight` | `ReactNode` | `undefined` | Íconos interactivos o decorativos |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Posición de la etiqueta |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del campo |
| `error` | `boolean` | `false` | Activa estilo de error |
| `errorMessage` | `string` | `undefined` | Texto de error visible |
| `helperText` | `string` | `undefined` | Texto de ayuda debajo del campo |

## Ejemplos de Uso

```tsx
// Input de contraseña con toggle y label flotante
<TextBox
  label="Contraseña"
  type="password"
  labelPosition="floating"
  showPasswordToggle
  showClearButton
/>

// Input de búsqueda con ícono
<TextBox
  placeholder="Buscar usuarios..."
  variant="outline"
  iconLeft={<SearchIcon />}
  showClearButton
/>
```
