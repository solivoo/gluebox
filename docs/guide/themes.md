# Temas y apariencia

gluBox usa **dos capas** de tematización que pueden combinarse:

1. **Temas globales CSS** — variables `--glb-*` vía `data-theme` y `data-mode` en `<html>`.
2. **Tema por componente** — prop `theme` con preset string u objeto de tokens (inline styles).

## Importación de estilos

```tsx
// Obligatorio: fuente Poppins + tokens base
import 'glubox/style.css';

// Un tema global (recomendado en producción)
import 'glubox/themes/default.css';

// O los tres temas para cambiar en runtime
// import 'glubox/themes/index.css';
```

## Temas globales (`data-theme` + `data-mode`)

Activá el tema en el documento:

```tsx
document.documentElement.setAttribute('data-theme', 'default');
document.documentElement.setAttribute('data-mode', 'dark');
```

| `data-theme` | Paleta de acento (pastel) | Archivo npm |
|--------------|---------------------------|-------------|
| `default` | Periwinkle (indigo suave) | `glubox/themes/default.css` |
| `modern` | Sage (verde suave) | `glubox/themes/modern.css` |
| `enterprise` | Powder blue (azul suave) | `glubox/themes/enterprise.css` |

| `data-mode` | Efecto |
|-------------|--------|
| `light` | Fondos claros, texto oscuro |
| `dark` | Fondos oscuros, texto claro |

Los tres archivos comparten la misma estructura de tokens (`--glb-app-bg`, `--glb-surface`, `--glb-border`, `--glb-accent-*`, variables por componente como `--btn-primary-bg`, etc.).

### Cambiar tema en runtime

```tsx
function setTheme(name: 'default' | 'modern' | 'enterprise') {
  document.documentElement.setAttribute('data-theme', name);
}

function setMode(mode: 'light' | 'dark') {
  document.documentElement.setAttribute('data-mode', mode);
}
```

No hace falta JavaScript si el modo es fijo: podés dejar los atributos en `index.html`.

## Tema por componente (`theme` prop)

Cada componente exporta presets TypeScript y acepta la prop `theme`:

| Componente | Export de presets |
|------------|-------------------|
| Sidebar | `sidebarThemes` |
| Button | `buttonThemes` |
| TextBox | `textBoxThemes` |
| TextArea | `textAreaThemes` |
| Select | `selectThemes` |
| DateBox | `dateBoxThemes` |
| RangeDateBox | `rangeDateBoxThemes` |
| OptionGroup | `optionGroupThemes` |
| CheckButton | `checkButtonThemes` |
| Popup | `popupThemes` |
| Toast | `toastThemes` |

### Presets disponibles (todos los componentes)

| Preset | Descripción |
|--------|-------------|
| `light` | Default family, modo claro |
| `dark` | Default family, modo oscuro |
| `modern-light` | Modern family, claro |
| `modern-dark` | Modern family, oscuro |
| `enterprise-light` | Enterprise family, claro |
| `enterprise-dark` | Enterprise family, oscuro |

```tsx
import { Button, buttonThemes } from 'glubox';

<Button theme="modern-dark">Guardar</Button>
<Select theme={selectThemes['enterprise-light']} options={options} />
<Popup theme="dark" open={open} onClose={onClose} title="Confirmar" />
```

La prop `theme` inyecta variables CSS en el elemento y **prevalece** sobre el tema global del documento para ese componente.

### ToastProvider

```tsx
<ToastProvider
  position="top-right"
  theme="enterprise-dark"
  defaultDuration={5000}
  showProgress
>
  {children}
</ToastProvider>
```

Si no pasás `theme`, Toast resuelve automáticamente según `data-theme` y `data-mode` del `<html>`.

## Prioridad visual

```
prop theme (inline)  >  data-theme + data-mode (CSS global)  >  valores por defecto del componente
```

## Label outlined y canvas

Con `labelPosition="outlined"` en formularios, el notch del label usa `--glb-field-canvas` (default: `--glb-app-bg`). En cards o paneles con otro fondo:

```css
.mi-formulario {
  --glb-field-canvas: var(--glb-surface);
}
```

Ver [Formularios](/components/forms#label-outlined-y-fondo-del-contenedor).

## Demo local

La app demo (`pnpm dev`) incluye selectores **Theme** y **Mode** en la barra superior; persisten en `localStorage` y aplican `data-theme` / `data-mode` al documento.

## Componentes y documentación relacionada

| Área | Página |
|------|--------|
| Formularios | [forms.md](/components/forms) |
| Botones | [buttons.md](/components/buttons) |
| Overlays | [overlays.md](/components/overlays) |
| Sidebar | [sidebar.md](/components/sidebar) |
| Tipos de eventos | [event-types.md](/guide/event-types) |

## Siguiente paso

- [Instalación](/guide/installation)
- [Introducción](/guide/getting-started)
