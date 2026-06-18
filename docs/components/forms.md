# Formularios

Controles de entrada compartidos: variantes visuales, tamaños, estados de error, helper text y posiciones de label.

## Importación

```tsx
import {
  TextBox,
  TextArea,
  Select,
  DateBox,
  RangeDateBox,
  textBoxThemes,
  textAreaThemes,
  selectThemes,
  dateBoxThemes,
  rangeDateBoxThemes,
} from 'glubox';

import type {
  TextBoxProps,
  TextAreaProps,
  SelectProps,
  DateBoxProps,
  RangeDateBoxProps,
  TextBoxLabelPosition,
  TextAreaLabelPosition,
  SelectLabelPosition,
} from 'glubox';

import 'glubox/style.css';
```

## Variantes visuales

Todos los controles de formulario comparten el mismo concepto de variante:

| Variante | Uso |
|----------|-----|
| `primary` | Campo con fondo sólido (default) |
| `secondary` | Fondo alternativo |
| `outline` | Borde visible, fondo transparente |
| `ghost` | Mínimo contraste, sin borde hasta hover/focus |

```tsx
<TextBox variant="outline" label="Nombre" placeholder="..." />
<Select variant="primary" options={options} />
```

## Posición del label

| `labelPosition` | Comportamiento |
|-----------------|----------------|
| `top` | Label encima del campo (default) |
| `floating` | Label dentro del campo; sube al escribir o enfocar |
| `outlined` | Label sobre el borde (patrón notch / fieldset) |
| `left` | Label a la izquierda en layout horizontal |

```tsx
<TextBox label="Email" labelPosition="floating" />
<Select label="País" labelPosition="outlined" options={countries} />
```

### Label outlined y fondo del contenedor

Con `labelPosition="outlined"`:

- El **control** es transparente: se ve el fondo de la página o card.
- El **notch del label** usa `--glb-field-canvas` (por defecto `--glb-app-bg`).

Si el formulario está dentro de una card con otro color:

```css
.form-card {
  --glb-field-canvas: var(--glb-surface);
}
```

## TextBox

```tsx
<TextBox
  label="Email"
  placeholder="nombre@correo.com"
  clearable
  helperText="Usaremos este correo para notificaciones"
/>
```

Props destacadas: `iconLeft`, `iconRight`, `clearable`, `error`, `errorMessage`, `fullWidth`, `width`, `theme`.

## TextArea

```tsx
<TextArea
  label="Comentarios"
  placeholder="Escribí tu mensaje..."
  rows={5}
  resize="vertical"
  helperText="Máximo 500 caracteres"
/>
```

Props destacadas: `rows`, `resize` (`none` | `vertical` | `horizontal` | `both`), `clearable`, `error`, `errorMessage`, `fullWidth`, `width`, `theme`. Comparte las mismas variantes y posiciones de label que TextBox.

## Select

```tsx
<Select
  label="Framework"
  labelPosition="outlined"
  variant="outline"
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue', disabled: true },
  ]}
  placeholder="Seleccionar..."
  onChange={(value) => console.log(value)}
/>
```

Soporta navegación por teclado y type-ahead. `options` es requerido.

## DateBox

```tsx
<DateBox
  label="Vencimiento"
  labelPosition="outlined"
  displayMode="input"
  onChange={(event) => setDate(event.target.value)}
/>
```

`displayMode`: `'input'` (campo con fecha, default) o `'icon'` (solo botón calendario). Valor en formato `YYYY-MM-DD`.

## RangeDateBox

```tsx
<RangeDateBox
  label="Período"
  labelPosition="top"
  onChange={(range) => console.log(range)}
/>
```

Valor: `{ start: string; end: string }` (fechas `YYYY-MM-DD`).

## Temas por componente

Cada control acepta `theme` como preset (`'light'`, `'dark'`, `'modern-dark'`, …) o objeto de tokens:

```tsx
<TextBox theme="enterprise-dark" />
<Select theme={selectThemes['modern-dark']} />
```

Los presets están exportados: `textBoxThemes`, `textAreaThemes`, `selectThemes`, `dateBoxThemes`, `rangeDateBoxThemes`.

## Temas globales de la app

Además del tema del componente, importa un tema CSS global y activa modo claro/oscuro:

```tsx
import 'glubox/themes/modern.css';

document.documentElement.setAttribute('data-theme', 'modern');
document.documentElement.setAttribute('data-mode', 'dark');
```

Detalle de presets, `popupThemes`, `toastThemes` y prioridad global vs prop: [Guía de temas](/guide/themes).

## Tipos de eventos

| Componente | Tipos exportados |
|------------|------------------|
| `TextBox` | `TextBoxOnChangeHandler`, `TextBoxOnFocusHandler`, `TextBoxOnBlurHandler` |
| `TextArea` | `TextAreaOnChangeHandler`, `TextAreaOnFocusHandler`, `TextAreaOnBlurHandler` |
| `Select` | `SelectOnChangeHandler`, `SelectChangeValue` |
| `DateBox` | `DateBoxOnChangeHandler` |
| `RangeDateBox` | `RangeDateBoxOnChangeHandler`, `RangeDateBoxChangeEvent` |

```tsx
import type { SelectOnChangeHandler } from 'glubox';

const handleFramework: SelectOnChangeHandler = (value) => {
  setFramework(value);
};
```

Referencia completa: [Tipos de eventos](/guide/event-types).

## Siguiente paso

- [Botones y selección](/components/buttons)
- [Instalación y TypeScript](/guide/installation)
