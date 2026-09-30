---
name: gluebox-tagbox
description: >-
  Use this skill when implementing inline tag/chip inputs with Enter/comma creation, backspace removal, duplicate prevention and max limits in Gluebox.
---

# Gluebox TagBox

El componente `TagBox` permite agregar tags en línea: se escribe en el input interno y **Enter** o **coma** confirman cada tag. Los tags se muestran como chips con botón de quitar. Comparte variantes, tamaños, posiciones de label y temas con `TextBox`.

## Importación

```tsx
import { TagBox, tagBoxThemes } from 'glubox';
import type { TagBoxProps, TagBoxThemeInput } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `value` / `defaultValue` | `string[]` | `undefined` | Tags en modo controlado / no controlado |
| `onChange` | `(tags: string[]) => void` | `undefined` | Emite la lista completa al agregar o quitar |
| `maxTags` | `number` | `undefined` | Cantidad máxima de tags |
| `allowDuplicates` | `boolean` | `false` | Permite duplicados (por defecto se previenen, case-insensitive) |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `labelPosition` | `'top' \| 'floating' \| 'outlined' \| 'left'` | `'top'` | Posición de la etiqueta |
| `placeholder` | `string` | `undefined` | Placeholder del input interno |
| `helperText` | `string` | `undefined` | Texto de ayuda |
| `error` / `errorMessage` | `boolean` / `string` | `false` / `undefined` | Estado y mensaje de error |
| `showClearButton` | `boolean` | `false` | Botón para limpiar todos los tags (alias legacy `clearable`) |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `disabled` | `boolean` | `false` | Deshabilita el campo |
| `theme` | `TagBoxThemeInput` | `undefined` | Preset o tema personalizado |

## Teclado

| Tecla | Acción |
|-------|--------|
| `Enter` | Confirma el tag escrito |
| `,` (coma) | Confirma el tag escrito |
| `Backspace` (input vacío) | Elimina el último tag |
| `Escape` | Limpia el borrador del input |

## Ejemplo de Uso

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

Modo controlado:

```tsx
const [tags, setTags] = useState<string[]>([]);

<TagBox value={tags} onChange={setTags} allowDuplicates errorMessage="Máximo 5 tags" maxTags={5} />
```

## Notas de implementación

- Los tags se renderizan como chips `glb-tagbox__tag` con botón `glb-tagbox__tag-remove` (`aria-label` por tag).
- El input interno expone `aria-invalid` y `aria-describedby`; el control usa `:focus-within` para el anillo de foco.
- Tokens propios `--tagbox-*` (6 presets en `tagBoxThemes`), integrados al pipeline de temas (`pnpm themes:generate`).
