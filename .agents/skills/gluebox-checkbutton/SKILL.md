---
name: gluebox-checkbutton
description: >-
  Use this skill when implementing toggle button actions with checkbox semantics in Gluebox.
---

# Gluebox CheckButton

El componente `CheckButton` representa un botón toggle interactivo con semántica accesible de checkbox (`aria-checked`).

## Importación

```tsx
import { CheckButton, checkButtonThemes } from 'glubox';
import type { CheckButtonProps } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `checked` | `boolean` | `false` | Estado activo/inactivo del botón |
| `defaultChecked` | `boolean` | `false` | Estado inicial no controlado |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback cuando cambia el estado |
| `disabled` | `boolean` | `false` | Deshabilita el control |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `iconLeft` / `iconRight` | `ReactNode` | `undefined` | Íconos decorativos |

## Ejemplo de Uso

```tsx
const [activo, setActivo] = useState(false);

<CheckButton checked={activo} onChange={setActivo}>
  Notificaciones por correo
</CheckButton>
```
