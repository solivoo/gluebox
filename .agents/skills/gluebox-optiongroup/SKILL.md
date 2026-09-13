---
name: gluebox-optiongroup
description: >-
  Use this skill when implementing mutually exclusive radio-like selection option groups in Gluebox.
---

# Gluebox OptionGroup

El componente `OptionGroup` agrupa opciones de selección mutuamente excluyentes con estilo moderno de botones segmentados o radios temáticos.

## Importación

```tsx
import { OptionGroup, optionGroupThemes } from 'glubox';
import type { OptionGroupProps, OptionGroupItem } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `items` | `OptionGroupItem[]` | `[]` | Opciones disponibles `{ value, label, disabled? }` |
| `value` | `string \| number` | `undefined` | Valor seleccionado en modo controlado |
| `defaultValue` | `string \| number` | `undefined` | Valor inicial |
| `onChange` | `(value: string \| number) => void` | `undefined` | Callback al cambiar selección |
| `label` | `string` | `undefined` | Etiqueta superior |
| `disabled` | `boolean` | `false` | Deshabilita el grupo |

## Ejemplo de Uso

```tsx
<OptionGroup
  label="Frecuencia de facturación"
  defaultValue="mensual"
  items={[
    { value: 'mensual', label: 'Mensual' },
    { value: 'anual', label: 'Anual (20% OFF)' },
  ]}
  onChange={(val) => console.log('Plan:', val)}
/>
```
