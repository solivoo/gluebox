---
name: gluebox-select
description: >-
  Use this skill when implementing accessible dropdown select components in Gluebox with portal rendering and keyboard navigation.
---

# Gluebox Select

El componente `Select` proporciona un menú desplegable accesible con type-ahead y navegación por teclado. El listbox se renderiza en `document.body` mediante portal (`position: fixed`) para evitar ser recortado por contenedores con `overflow: hidden` o `overflow: auto`.

## Importación

```tsx
import { Select, selectThemes } from 'glubox';
import type { SelectProps, SelectOption, SelectOnChangeHandler } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `options` | `SelectOption[]` | requerido | Lista de opciones `{ value, label, disabled? }` |
| `value` | `string \| number` | `undefined` | Valor seleccionado en modo controlado |
| `defaultValue` | `string \| number` | `undefined` | Valor inicial en modo no controlado |
| `placeholder` | `string` | `'Seleccionar...'` | Texto cuando no hay selección |
| `showClearButton` | `boolean` | `false` | Muestra botón de limpiar |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'left' \| 'floating' \| 'outlined'` | `'top'` | Posición de la etiqueta |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Variante visual |
| `onChange` | `(value: any) => void` | `undefined` | Callback emitido al seleccionar |

## Ejemplo de Uso

```tsx
<Select
  label="Rol de usuario"
  labelPosition="outlined"
  placeholder="Elegir rol..."
  showClearButton
  options={[
    { value: 'admin', label: 'Administrador' },
    { value: 'editor', label: 'Editor de Contenido' },
    { value: 'viewer', label: 'Lector (Solo lectura)' },
  ]}
  onChange={(val) => console.log('Rol:', val)}
/>
```
