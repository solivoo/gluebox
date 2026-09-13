---
name: gluebox-button
description: >-
  Use this skill when implementing, styling, or debugging the Gluebox Button component.
---

# Gluebox Button

El componente `Button` proporciona botones accesibles y consistentes para acciones principales, secundarias, peligrosas o contextuales.

## Importación

```tsx
import { Button, buttonThemes } from 'glubox';
import type { ButtonProps, ButtonVariant, ButtonSize } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Estilo visual del botón |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño y espaciado del botón |
| `disabled` | `boolean` | `false` | Deshabilita la interacción y ajusta opacidad |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del ancho del contenedor |
| `iconLeft` | `ReactNode` | `undefined` | Ícono antes del texto |
| `iconRight` | `ReactNode` | `undefined` | Ícono después del texto |
| `theme` | `ButtonThemeInput` | `undefined` | Sobrescribe tokens o preset de tema |
| `onClick` | `(e: MouseEvent<HTMLButtonElement>) => void` | `undefined` | Manejador de clic |

## Ejemplos de Uso

```tsx
// Botón primario estándar con ícono
<Button variant="primary" iconLeft={<SaveIcon />} onClick={handleSave}>
  Guardar Cambios
</Button>

// Botón de peligro
<Button variant="danger" size="sm" onClick={handleDelete}>
  Eliminar
</Button>
```
