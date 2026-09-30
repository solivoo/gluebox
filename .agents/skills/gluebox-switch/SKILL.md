---
name: gluebox-switch
description: Use this skill when implementing on/off switch controls in Gluebox with label positions, sizes, loading state and theming.
---

# Gluebox Switch

El componente `Switch` representa un interruptor on/off (thumb deslizante) construido sobre un `<input type="checkbox" role="switch">`, con semántica accesible nativa.

## Importación

```tsx
import { Switch, switchThemes } from 'glubox';
import type { SwitchProps, SwitchOnChangeHandler } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `checked` | `boolean` | `undefined` | Estado activo (modo controlado) |
| `defaultChecked` | `boolean` | `false` | Estado inicial (modo no controlado) |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback al alternar |
| `label` | `ReactNode` | `undefined` | Etiqueta clickeable asociada |
| `labelPosition` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | Posición de la etiqueta |
| `size` | `'sm' \| 'md'` | `'md'` | Tamaño del control |
| `loading` | `boolean` | `false` | Spinner en el thumb y bloquea la interacción |
| `disabled` | `boolean` | `false` | Deshabilita el control |
| `helperText` | `ReactNode` | `undefined` | Texto de ayuda |
| `error` / `errorMessage` | `boolean` / `ReactNode` | `false` / `undefined` | Estado de error |
| `fullWidth` / `width` | `boolean` / `string \| number` | `false` / `undefined` | Layout |
| `theme` | `SwitchThemeInput` | `undefined` | Preset (`commerce-dark`, …) o tokens custom |

## Ejemplo de Uso

```tsx
const [activo, setActivo] = useState(false);

<Switch
  checked={activo}
  onChange={setActivo}
  label="Notificaciones por correo"
  helperText="Se sincroniza cada hora"
/>
```

## Accesibilidad

- Usa `role="switch"` sobre el checkbox: **Space** alterna con el foco puesto.
- Click en la etiqueta alterna el control (label envuelve al input).
- `aria-invalid` con `error`/`errorMessage`, `aria-describedby` para helper, `aria-busy` en `loading`.
