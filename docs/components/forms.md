# Formularios

Controles de entrada compartidos: variantes visuales, tamaños, estados de error, helper text y posiciones de label.

## Importación

```tsx
import {
  TextBox,
  NumberBox,
  FileBox,
  ColorPicker,
  TextArea,
  TagBox,
  Switch,
  Select,
  DateBox,
  RangeDateBox,
  textBoxThemes,
  textAreaThemes,
  tagBoxThemes,
  switchThemes,
  selectThemes,
  dateBoxThemes,
  rangeDateBoxThemes,
  DEFAULT_COLOR_PRESETS,
} from 'glubox';

import type {
  TextBoxProps,
  NumberBoxProps,
  FileBoxProps,
  ColorPickerProps,
  TextAreaProps,
  TagBoxProps,
  SwitchProps,
  SelectProps,
  DateBoxProps,
  RangeDateBoxProps,
  TextBoxLabelPosition,
  TextAreaLabelPosition,
  TagBoxLabelPosition,
  SwitchLabelPosition,
  SelectLabelPosition,
} from 'glubox';

import 'glubox/style.css';
import 'glubox/themes/index.css';
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
| `NumberBox` | Valor numérico |
| `FileBox` | Archivos seleccionados |
| `ColorPicker` | Hex `#rrggbb` |
| `TextArea` | Contenido multilínea |
| `TagBox` | Todos los tags |
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

Si usás `type="number"`, gluBox oculta los spinners nativos del navegador (mismo criterio que NumberBox). Para stepping, `min`/`max` y botones de incremento, usá **`NumberBox`**.

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

Campo numérico basado en TextBox. Oculta los spinners nativos y usa botones estilados acordes al tema. Props propias: `step`, `min`, `max`, `showSpinButtons`. Preferilo frente a `<TextBox type="number" />`.

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

### Reordenamiento de imágenes (`reorderable`)

```tsx
<FileBox
  label="Galería"
  reorderable
  accept="image/*"
  maxFiles={6}
  onChange={(files) => setFotos(files)}
/>
```

Con `reorderable` la lista se convierte en una tira horizontal de miniaturas cuadradas (preview de imágenes vía objectURL; los no-imagen muestran su extensión). El campo de resumen ("N archivos seleccionados") y el botón "Elegir archivo" se ocultan: la tira es la interfaz completa.

- El **último tile es un "+"** que abre el selector para agregar archivos: se desplaza al final a medida que agregás y desaparece al alcanzar `maxFiles`.
- Con `maxFiles` se muestra un **contador `N/maxFiles`** debajo de la tira (ej. `2/3`) para hacer visible el límite.
- **Reordenado por arrastre** (click sostenido con mouse o touch): la miniatura se "levanta" con un **fantasma flotante** que sigue al puntero y puede soltarse encima de otra; el hueco de origen se muestra punteado como placeholder. El orden se aplica al soltar y emite un único `onChange` con el array en el nuevo orden. La miniatura de la izquierda es la primera del array.
- **Teclado**: cada tile es focusable; `←` / `→` lo mueven una posición.
- Cada miniatura tiene botón **×** para quitarla.
- Arrastrar archivos desde el SO sobre la tira los agrega (resalta el área).
- `reorderable` implica `multiple`.

## ColorPicker

```tsx
<ColorPicker
  label="Acento"
  defaultValue="#3b82f6"
  showClearButton
  onChange={(hex) => setAccent(hex)}
/>
```

Selector de color con swatch, input hex y panel HSV en portal (`position: fixed`, como Select). **No** usa `<input type="color">` nativo, así que en `data-mode="dark"` no aparece el chrome del SO. `onChange` emite `#rrggbb` (o `''` al limpiar). Presets: `presets={['#22c55e', '#ef4444']}` o `DEFAULT_COLOR_PRESETS`.

Comparte variantes, tamaños, labels y temas con TextBox.

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

## TagBox

```tsx
<TagBox
  label="Etiquetas"
  placeholder="Escribí un tag y presioná Enter"
  defaultValue={['react', 'typescript']}
  maxTags={5}
  showClearButton
  onChange={(tags) => setEtiquetas(tags)}
/>
```

Campo para agregar tags en línea. **Enter** o **coma** confirman cada tag; **Backspace** con el input vacío elimina el último; **Escape** limpia el borrador. Los tags se muestran como chips con botón para quitarlos. `onChange` emite `string[]`. Por defecto previene duplicados (case-insensitive); usá `allowDuplicates` para permitirlos. Admite modo controlado (`value`) y no controlado (`defaultValue`). Comparte variantes, tamaños, labels y temas con TextBox.

## Switch

```tsx
<Switch
  label="Notificaciones"
  labelPosition="right"
  defaultChecked
  helperText="Se sincroniza cada hora"
  onChange={(checked) => setNotificar(checked)}
/>
```

Interruptor on/off con thumb deslizante. `labelPosition`: `'right'` (default), `'left'`, `'top'`, `'bottom'`. Tamaños `sm` | `md`. `loading` deshabilita el control y muestra un spinner en el thumb. Admite modo controlado (`checked` + `onChange`) y no controlado (`defaultChecked`), `helperText`, `error`/`errorMessage`, `fullWidth`, `width` y `theme`. Usa un `<input type="checkbox" role="switch">`, por lo que **Space** alterna el estado con el foco puesto.

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

Soporta navegación por teclado y type-ahead. `options` es requerido. El menú se porta a `document.body` (`position: fixed`) para no recortarse en contenedores con overflow.

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

**Por defecto** (sin prop `theme`) los campos heredan el tema del sistema (`data-theme` / `data-mode` en `<html>`). No redefinas `--textbox-*` ni `--select-*` en el consumidor.

Override puntual:

```tsx
<TextBox theme="commerce-dark" />
<Select theme={selectThemes['commerce-light']} />
```

Presets exportados: `textBoxThemes`, `textAreaThemes`, `tagBoxThemes`, `switchThemes`, `selectThemes`, `dateBoxThemes`, `rangeDateBoxThemes`.

Setup del sistema:

```tsx
import 'glubox/themes/index.css';

document.documentElement.setAttribute('data-theme', 'commerce');
document.documentElement.setAttribute('data-mode', 'dark');
```

Herencia, presets y prioridad: [Guía de temas](/guide/themes).

## Tipos de eventos

| Componente | Tipos exportados |
|------------|------------------|
| `TextBox` | `TextBoxOnChangeHandler`, `TextBoxOnFocusHandler`, `TextBoxOnBlurHandler` |
| `NumberBox` | `NumberBoxOnChangeHandler`, `NumberBoxOnFocusHandler`, `NumberBoxOnBlurHandler` |
| `FileBox` | `FileBoxOnChangeHandler`, `FileBoxOnRejectHandler`, `FileBoxChangeValue`, `FileRejection` |
| `ColorPicker` | `ColorPickerOnChangeHandler`, `ColorPickerChangeValue` |
| `TextArea` | `TextAreaOnChangeHandler`, `TextAreaOnFocusHandler`, `TextAreaOnBlurHandler` |
| `TagBox` | `TagBoxOnChangeHandler` |
| `Switch` | `SwitchOnChangeHandler`, `SwitchChangeValue` |
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
