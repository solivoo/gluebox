# Tipos de eventos

gluBox exporta **tipos dedicados** para los callbacks de cada componente. Podés usarlos para tipar handlers, pasarlos como props a funciones auxiliares o documentar contratos en tu app sin repetir firmas.

## Importación

```tsx
import type {
  SelectOnChangeHandler,
  SelectChangeValue,
  PopupOnCloseHandler,
  ToastShowHandler,
} from 'glubox';
```

## Utilidades genéricas

Si un evento no tiene alias propio (por ejemplo `onKeyDown` en `Button`), derivá el tipo desde las props:

```tsx
import type {
  ButtonProps,
  OptionalEventHandler,
  EventHandlerPayload,
  RequiredEventHandler,
} from 'glubox';

type OnKeyDown = OptionalEventHandler<ButtonProps, 'onKeyDown'>;
type ClosePopup = RequiredEventHandler<PopupProps, 'onClose'>;
type SelectValue = EventHandlerPayload<SelectProps, 'onChange'>; // string
```

| Utilidad | Uso |
|----------|-----|
| `RequiredEventHandler<Props, 'onClose'>` | Callback obligatorio en props |
| `OptionalEventHandler<Props, 'onChange'>` | Callback opcional |
| `EventHandlerPayload<Props, 'onChange'>` | Primer argumento del handler |

## Por componente

### Button

| Tipo | Signatura |
|------|-----------|
| `ButtonOnClickHandler` | `(event: MouseEvent<HTMLButtonElement>) => void` |

```tsx
const handleClick: ButtonOnClickHandler = (event) => {
  event.preventDefault();
};
```

### Select

| Tipo | Signatura |
|------|-----------|
| `SelectOnChangeHandler` | `(value: string) => void` |
| `SelectChangeValue` | `string` |

### TextBox

| Tipo | Signatura |
|------|-----------|
| `TextBoxOnChangeHandler` | `(event: ChangeEvent<HTMLInputElement>) => void` |
| `TextBoxOnFocusHandler` | `(event: FocusEvent<HTMLInputElement>) => void` |
| `TextBoxOnBlurHandler` | `(event: FocusEvent<HTMLInputElement>) => void` |

### DateBox

| Tipo | Signatura |
|------|-----------|
| `DateBoxOnChangeHandler` | `(event: ChangeEvent<HTMLInputElement>) => void` |

### RangeDateBox

| Tipo | Signatura |
|------|-----------|
| `RangeDateBoxOnChangeHandler` | `(range: DateRange) => void` |
| `RangeDateBoxChangeEvent` | `{ start: string; end: string }` |

### OptionGroup

| Tipo | Signatura |
|------|-----------|
| `OptionGroupOnChangeHandler` | `(value: string) => void` |
| `OptionGroupChangeValue` | `string` |

### CheckButton

| Tipo | Signatura |
|------|-----------|
| `CheckButtonOnChangeHandler` | `(checked: boolean) => void` |
| `CheckButtonChangeValue` | `boolean` |

### Sidebar

| Tipo | Signatura |
|------|-----------|
| `SidebarOnCollapsedChangeHandler` | `(collapsed: boolean) => void` |
| `SidebarOnNavigateHandler` | `(path: string) => void` |

### Popup

| Tipo | Signatura |
|------|-----------|
| `PopupOnCloseHandler` | `() => void` |
| `PopupActionOnClickHandler` | `() => void` |

```tsx
const handleClose: PopupOnCloseHandler = () => setOpen(false);
```

### Toast

| Tipo | Signatura |
|------|-----------|
| `ToastShowHandler` | `(options: ShowToastOptions) => string` |
| `ToastDismissHandler` | `(id: string) => void` |
| `ToastDismissAllHandler` | `() => void` |
| `ToastOnCloseHandler` | `() => void` |

```tsx
const { show } = useToast();

const notify: ToastShowHandler = (options) => show(options);
```

## Demo interactivo

En la app demo, cada componente documenta sus tipos de eventos en:

- **API → Events** — tabla con columna «Tipo exportado» + ejemplo de importación
- **API → Types** — referencia completa de handlers exportados

## Siguiente paso

- [Formularios](/components/forms)
- [Botones y selección](/components/buttons)
- [Overlays (Popup / Toast)](/components/overlays)
- [Instalación y TypeScript](/guide/installation)
