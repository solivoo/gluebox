---
name: gluebox-popup
description: >-
  Use this skill when implementing accessible modal dialogs, draggable confirmation popups, and overlay windows in Gluebox.
---

# Gluebox Popup

El componente `Popup` es un diálogo modal accesible montado en portal con soporte de arrastre por cabecera, backdrop con blur, foco atrapado y barra de acciones inferior.

## Importación

```tsx
import { Popup, popupThemes } from 'glubox';
import type { PopupProps, PopupOnCloseHandler, PopupAction } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `open` | `boolean` | `false` | Visibilidad del modal |
| `onClose` | `PopupOnCloseHandler` | requerido | Callback de cierre (botón X, backdrop, Escape) |
| `title` | `ReactNode` | `undefined` | Título en cabecera |
| `width` | `string \| number` | `500` | Ancho del diálogo |
| `draggable` | `boolean` | `false` | Permite arrastrar el modal por la barra de título |
| `actions` | `PopupAction[]` | `[]` | Botones de acción en el pie del modal |
| `closeOnBackdrop` | `boolean` | `true` | Cierra al hacer clic en el backdrop |

## Ejemplo de Uso

```tsx
const [abierto, setAbierto] = useState(false);

<Popup
  open={abierto}
  onClose={() => setAbierto(false)}
  title="Confirmación Requerida"
  width={460}
  actions={[
    { label: 'Cancelar', variant: 'outline', onClick: () => setAbierto(false) },
    { label: 'Confirmar', variant: 'danger', onClick: handleConfirm },
  ]}
>
  <p>¿Estás seguro de que deseas eliminar permanentemente este registro?</p>
</Popup>
```
