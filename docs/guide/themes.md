# Temas y apariencia

Cómo tematizar gluBox en tu aplicación: el **tema del sistema** (toda la UI) y, si hace falta, un **override por componente**.

## Idea central

```
Sin prop theme  →  el componente hereda data-theme + data-mode del <html>
Con prop theme  →  ese componente ignora el global y usa el preset/objeto
```

Para cambiar el look de **toda** la librería en runtime solo necesitás:

1. Importar el CSS de temas.
2. Setear `data-theme` y `data-mode` en `<html>`.

No hace falta pasar `theme` a cada Button, Select, DataGrid, etc.

## Setup mínimo

```tsx
// main.tsx / App.tsx
import 'glubox/style.css';
import 'glubox/themes/index.css'; // default + modern + enterprise

document.documentElement.setAttribute('data-theme', 'default');
document.documentElement.setAttribute('data-mode', 'light');
```

O en `index.html` si el modo es fijo:

```html
<html data-theme="default" data-mode="dark">
```

| Import | Cuándo usarlo |
|--------|----------------|
| `glubox/themes/default.css` | Solo familia Default |
| `glubox/themes/modern.css` | Solo familia Modern |
| `glubox/themes/enterprise.css` | Solo familia Enterprise |
| `glubox/themes/index.css` | Las tres (recomendado si el usuario puede cambiar de tema) |

Siempre importa también `glubox/style.css` (layout y estilos base de los componentes).

## Familias y modos

| `data-theme` | Look | Archivo |
|--------------|------|---------|
| `default` | Periwinkle (violeta / indigo) | `glubox/themes/default.css` |
| `modern` | Sage (verde) | `glubox/themes/modern.css` |
| `enterprise` | Powder blue (azul) | `glubox/themes/enterprise.css` |

| `data-mode` | Efecto |
|-------------|--------|
| `light` | Fondos claros, texto oscuro |
| `dark` | Fondos oscuros, texto claro |

Cada familia tiene superficies, sidebar, inputs y acentos propios. Cambiar `data-theme` o `data-mode` actualiza **todos** los componentes que no tengan prop `theme`.

## Cambiar el tema del sistema (recomendado)

Ejemplo con React (toggle de tema y modo):

```tsx
import { useEffect, useState } from 'react';

type ThemeName = 'default' | 'modern' | 'enterprise';
type ModeName = 'light' | 'dark';

export function useGluBoxTheme(
  initialTheme: ThemeName = 'default',
  initialMode: ModeName = 'light',
) {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);
  const [mode, setMode] = useState<ModeName>(initialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
  }, [theme, mode]);

  return { theme, mode, setTheme, setMode };
}
```

```tsx
function ThemeToolbar() {
  const { theme, mode, setTheme, setMode } = useGluBoxTheme('modern', 'dark');

  return (
    <>
      <select value={theme} onChange={(e) => setTheme(e.target.value as typeof theme)}>
        <option value="default">Default</option>
        <option value="modern">Modern</option>
        <option value="enterprise">Enterprise</option>
      </select>
      <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </>
  );
}
```

El cambio es **instantáneo vía CSS**: no hace falta re-renderizar ni propagar props a los hijos.

### Persistencia (opcional)

```tsx
useEffect(() => {
  localStorage.setItem('glubox-theme', theme);
  localStorage.setItem('glubox-mode', mode);
}, [theme, mode]);

// al iniciar:
const theme = (localStorage.getItem('glubox-theme') as ThemeName) || 'default';
const mode = (localStorage.getItem('glubox-mode') as ModeName) || 'light';
```

## Qué componentes heredan el tema global

Sin prop `theme`, heredan `data-theme` / `data-mode`:

| Área | Componentes |
|------|-------------|
| Navegación | Sidebar, PageActionsMenu |
| Formularios | TextBox, TextArea, Select, DateBox, RangeDateBox |
| Acciones | Button, CheckButton, OptionGroup |
| Datos | DataGrid |
| Overlays | Popup, Toast / ToastProvider |

## Override por componente (`theme` prop)

Usalo solo cuando un control deba **ignorar** el tema del sistema (p. ej. un botón siempre en un preset fijo, o un demo aislado).

```tsx
import { Button, Select, selectThemes } from 'glubox';

// Preset string
<Button theme="modern-dark">Guardar</Button>

// Objeto de tokens exportado
<Select theme={selectThemes['enterprise-light']} options={options} />
```

### Presets

| Preset | Equivale a |
|--------|------------|
| `light` | default + light |
| `dark` | default + dark |
| `modern-light` | modern + light |
| `modern-dark` | modern + dark |
| `enterprise-light` | enterprise + light |
| `enterprise-dark` | enterprise + dark |

### Exports de presets

| Componente | Export |
|------------|--------|
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
| DataGrid | `dataGridThemes` |
| PageActionsMenu | `pageActionsMenuThemes` |

### ToastProvider

```tsx
<ToastProvider position="top-right" defaultDuration={5000}>
  {children}
</ToastProvider>
```

Sin `theme`, los toasts siguen el tema global. Con `theme="enterprise-dark"` quedan fijos a ese preset.

## Prioridad visual

```
prop theme (inline)  >  data-theme + data-mode (CSS)  >  fallbacks del componente
```

| Caso | Resultado |
|------|-----------|
| No pasás `theme` | Sigue el sistema (`<html>`) |
| `theme="dark"` | Siempre dark (familia default), aunque el HTML esté en light |
| `theme={objeto}` | Tokens custom solo en ese nodo |

## Integrar con el layout de tu app

Las variables `--glb-*` también sirven para el chrome de tu aplicación (fondo, tipografía, bordes):

```css
.app-shell {
  background: var(--glb-app-bg);
  color: var(--glb-app-text);
  font-family: var(--glb-font-family, 'Poppins', sans-serif);
}

.card {
  background: var(--glb-surface);
  border: 1px solid var(--glb-border);
  color: var(--glb-text);
}
```

Tokens útiles:

| Variable | Uso |
|----------|-----|
| `--glb-app-bg` / `--glb-app-text` | Fondo y texto de página |
| `--glb-surface` / `--glb-surface-hover` | Cards, paneles |
| `--glb-border` | Bordes |
| `--glb-input-bg` | Campos |
| `--glb-muted` | Texto secundario |
| `--glb-accent-*` | Acento de la familia activa |
| `--glb-danger-*` | Estados de error / danger |

## Label outlined y canvas

Con `labelPosition="outlined"`, el notch del label usa `--glb-field-canvas` (por defecto `--glb-app-bg`). En un panel con otro fondo:

```css
.mi-formulario {
  --glb-field-canvas: var(--glb-surface);
}
```

Ver [Formularios](/components/forms#label-outlined-y-fondo-del-contenedor).

## Errores frecuentes

| Problema | Causa | Solución |
|----------|--------|----------|
| Cambiar Theme/Mode no afecta un control | Tiene prop `theme` (preset fijo) | Quitá la prop o usá `undefined` |
| Solo Button cambia y el resto no | CSS de tema desactualizado / cache | Recargá con hard refresh; asegurate de importar `glubox/themes/index.css` |
| Todo se ve sin estilo / roto | Falta `glubox/style.css` | Importalo en el entry |
| Querés cambiar de familia en runtime | Solo importaste `default.css` | Usá `glubox/themes/index.css` |
| Light y dark “iguales” en tu layout | Tu CSS hardcodea colores | Usá `--glb-app-bg`, `--glb-surface`, etc. |

## Demo local

La app demo (`pnpm dev`) tiene selectores **Theme** y **Mode** en la barra superior. Persisten en `localStorage` y aplican `data-theme` / `data-mode` al documento — el mismo patrón que debés usar en producción.

## Relacionado

| Área | Página |
|------|--------|
| Instalación | [installation](/guide/installation) |
| Formularios | [forms](/components/forms) |
| Botones | [buttons](/components/buttons) |
| Overlays | [overlays](/components/overlays) |
| Sidebar | [sidebar](/components/sidebar) |
| DataGrid | [datagrid](/components/datagrid) |
