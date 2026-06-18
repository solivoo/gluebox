# Overlays: Popup y Toast

Componentes de capa superior para diálogos modales y notificaciones.

## Importación

```tsx
import {
  Popup,
  ToastProvider,
  useToast,
  popupThemes,
  toastThemes,
} from 'glubox';

import type {
  PopupProps,
  PopupOnCloseHandler,
  PopupActionOnClickHandler,
  ToastShowHandler,
  ToastDismissHandler,
  ShowToastOptions,
} from 'glubox';
```

## Popup

Diálogo modal con portal, arrastre opcional y pie de acciones.

```tsx
const [open, setOpen] = useState(false);

const handleClose: PopupOnCloseHandler = () => setOpen(false);

<Popup
  open={open}
  onClose={handleClose}
  title="Confirmar"
  width={480}
  actions={[
    { label: 'Cancelar', variant: 'outline', onClick: handleClose },
    { label: 'Guardar', variant: 'primary', onClick: () => save() },
  ]}
>
  <p>¿Deseás continuar?</p>
</Popup>
```

### Tipos de eventos

| Tipo | Uso |
|------|-----|
| `PopupOnCloseHandler` | Prop `onClose` |
| `PopupActionOnClickHandler` | `PopupAction.onClick` en el pie |

## Toast

Notificaciones con posicionamiento, temporizador visual y animación de entrada/salida.

```tsx
function App() {
  return (
    <ToastProvider position="top-right" defaultDuration={5000}>
      <Page />
    </ToastProvider>
  );
}

function Page() {
  const { show, dismissAll } = useToast();

  const notify: ToastShowHandler = (options) => show(options);

  return (
    <button onClick={() => notify({ title: 'Listo', message: 'Guardado.', variant: 'success' })}>
      Notificar
    </button>
  );
}
```

### Tipos de eventos

| Tipo | Uso |
|------|-----|
| `ToastShowHandler` | `useToast().show` |
| `ToastDismissHandler` | `useToast().dismiss` |
| `ToastDismissAllHandler` | `useToast().dismissAll` |
| `ToastOnCloseHandler` | Callback `onClose` por toast |

Ver la guía completa: [Tipos de eventos](/guide/event-types).

## Temas

```tsx
<Popup theme="enterprise-dark" open={open} onClose={onClose} title="Confirmar">
  ...
</Popup>

<ToastProvider position="top-right" theme="dark" defaultDuration={5000}>
  {children}
</ToastProvider>
```

Presets: `popupThemes`, `toastThemes` — mismos 6 nombres que el resto de componentes. Sin `theme` explícito, Toast sigue `data-theme` / `data-mode` del documento.

[Guía de temas](/guide/themes)

## Siguiente paso

- [Tipos de eventos](/guide/event-types)
- [Formularios](/components/forms)
