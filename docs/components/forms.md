# Formularios

Controles de entrada compartidos: variantes visuales, tamaños, estados de error, helper text y posiciones de label.

## Importación

```tsx
import {
  TextBox,
  NumberBox,
  FileBox,
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
  NumberBoxProps,
  FileBoxProps,
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

## Botón limpiar (`showClearButton`)

Todos los controles de formulario que admiten valor seleccionado o escrito comparten la prop **`showClearButton`**. El alias legacy `clearable` sigue funcionando.

| Componente | Limpia |
|------------|--------|
| `TextBox` | Texto del input |
| `TextArea` | Contenido multilínea |
| `Select` | Opción seleccionada |
| `DateBox` | Fecha (`YYYY-MM-DD`) |
| `RangeDateBox` | Rango inicio y fin |

```tsx
<TextBox label="Búsqueda" showClearButton />
<Select options={opts} showClearButton onChange={setValue} />
<DateBox label="Vencimiento" showClearButton onChange={handleDate} />
<RangeDateBox label="Período" showClearButton onChange={setRange} />
```

## TextBox

```tsx
<TextBox
  label="Email"
  placeholder="nombre@correo.com"
  showClearButton
  helperText="Usaremos este correo para notificaciones"
/>
```

Props destacadas: `iconLeft`, `iconRight`, `showClearButton`, `showPasswordToggle` con `type="password"`, `error`, `errorMessage`, `fullWidth`, `width`, `theme`.

```tsx
<TextBox label="Contraseña" type="password" placeholder="••••••••" />
<TextBox label="Búsqueda" showClearButton />
```

## NumberBox

```tsx
<NumberBox
  label="Cantidad"
  min={0}
  max={100}
  step={1}
  showSpinButtons
  showClearButton
  onChange={(e) => setCantidad(Number(e.target.value))}
/>
```

Campo numérico basado en TextBox. Oculta los spinners nativos y usa botones estilados. Props propias: `step`, `min`, `max`, `showSpinButtons`.

## FileBox

```tsx
<FileBox
  label="Comprobante"
  accept="image/*,.pdf"
  showClearButton
  onChange={(files) => setAdjunto(files[0] ?? null)}
/>
```

```tsx
<FileBox
  displayMode="dropzone"
  multiple
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
  onChange={setAdjuntos}
  onReject={(rejected) => console.warn(rejected)}
/>
```

`displayMode`: `'field'` (campo compacto, default) o `'dropzone'` (área de arrastre). Con `multiple` (o en dropzone) se lista cada archivo con tamaño y botón para quitarlo. `onChange` emite `File[]`. Validación de `accept`, `maxSize` y `maxFiles` vía `onReject`.

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

Props destacadas: `rows`, `resize` (`none` | `vertical` | `horizontal` | `both`), `showClearButton`, `error`, `errorMessage`, `fullWidth`, `width`, `theme`. Comparte las mismas variantes y posiciones de label que TextBox.

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
  showClearButton
/>
```

Soporta navegación por teclado y type-ahead. `options` es requerido.

## DateBox

```tsx
<DateBox
  label="Vencimiento"
  labelPosition="outlined"
  displayMode="input"
  showClearButton
  onChange={(event) => setDate(event.target.value)}
/>
```

`displayMode`: `'input'` (campo con fecha, default) o `'icon'` (solo botón calendario). Valor en formato `YYYY-MM-DD`.

## RangeDateBox

```tsx
<RangeDateBox
  label="Período"
  labelPosition="top"
  showClearButton
  onChange={(range) => console.log(range)}
/>
```

Valor: `{ start: string; end: string }` (fechas `YYYY-MM-DD`).

## Temas

**Por defecto** (sin prop `theme`) los campos heredan el tema del sistema (`data-theme` / `data-mode` en `<html>`).

Override puntual:

```tsx
<TextBox theme="enterprise-dark" />
<Select theme={selectThemes['modern-dark']} />
```

Presets exportados: `textBoxThemes`, `textAreaThemes`, `selectThemes`, `dateBoxThemes`, `rangeDateBoxThemes`.

Setup del sistema:

```tsx
import 'glubox/themes/index.css';

document.documentElement.setAttribute('data-theme', 'modern');
document.documentElement.setAttribute('data-mode', 'dark');
```

Herencia, presets y prioridad: [Guía de temas](/guide/themes).

## Tipos de eventos

| Componente | Tipos exportados |
|------------|------------------|
| `TextBox` | `TextBoxOnChangeHandler`, `TextBoxOnFocusHandler`, `TextBoxOnBlurHandler` |
| `NumberBox` | `NumberBoxOnChangeHandler`, `NumberBoxOnFocusHandler`, `NumberBoxOnBlurHandler` |
| `FileBox` | `FileBoxOnChangeHandler`, `FileBoxOnRejectHandler`, `FileBoxChangeValue`, `FileRejection` |
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
