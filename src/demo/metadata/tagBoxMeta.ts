import type { ComponentMeta } from '@/demo/playground/types';
import type { TagBoxProps } from '@/components/TagBox';

export const tagBoxMeta: ComponentMeta<TagBoxProps> = {
  name: 'TagBox',
  description:
    'Campo para agregar tags en línea: Enter o coma confirman cada tag, Backspace con el input vacío elimina el último, chips con botón de quitar, prevención de duplicados y límite de tags.',
  sourcePath: 'src/components/TagBox/TagBox.tsx',
  fullWidthPreview: false,
  defaults: {
    placeholder: 'Escribí un tag y presioná Enter...',
    defaultValue: ['react', 'typescript'],
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    clearable: false,
    showClearButton: false,
    allowDuplicates: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Escribí un tag y presioná Enter...',
          description: 'Texto placeholder del input interno.',
          control: 'text',
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          defaultValue: ['react', 'typescript'],
          description: 'Lista inicial de tags en modo no controlado.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Tags',
      props: [
        {
          name: 'maxTags',
          type: 'number',
          defaultValue: undefined,
          description: 'Cantidad máxima de tags. Al alcanzarla no se agregan más.',
          control: 'number',
        },
        {
          name: 'allowDuplicates',
          type: 'boolean',
          defaultValue: false,
          description: 'Permite tags duplicados (comparación case-insensitive).',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'TagBoxVariant',
          defaultValue: 'primary',
          description: 'Variante visual del campo.',
          control: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        {
          name: 'size',
          type: 'TagBoxSize',
          defaultValue: 'md',
          description: 'Tamaño del campo.',
          control: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          defaultValue: false,
          description: 'Si true, el campo ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo del campo. Ej: "320px", 280, "100%". Prevalece sobre fullWidth.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Label',
      props: [
        {
          name: 'label',
          type: 'string',
          defaultValue: undefined,
          description: 'Texto de la etiqueta. Si no se define, no se renderiza label.',
          control: 'text',
        },
        {
          name: 'labelPosition',
          type: 'TagBoxLabelPosition',
          defaultValue: 'top',
          description:
            "'top': label arriba. 'floating': label dentro, flota al enfocar o al haber tags. 'outlined': label sobre el borde. 'left': horizontal.",
          control: 'select',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Floating', value: 'floating' },
            { label: 'Outlined', value: 'outlined' },
            { label: 'Left', value: 'left' },
          ],
        },
      ],
    },
    {
      title: 'Adornos',
      props: [
        {
          name: 'showClearButton',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra botón X para eliminar todos los tags.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Estado',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita el campo.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra el campo en estado de error (borde rojo).',
          control: 'boolean',
        },
        {
          name: 'errorMessage',
          type: 'string',
          defaultValue: undefined,
          description: 'Mensaje de error debajo del campo (activa error automáticamente).',
          control: 'text',
          dependsOn: { prop: 'error', value: true },
        },
        {
          name: 'helperText',
          type: 'string',
          defaultValue: undefined,
          description: 'Texto de ayuda debajo del campo.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'TagBoxThemeInput',
          defaultValue: undefined,
          description: 'Preset ("commerce-dark" | "commerce-light") o tema personalizado.',
          control: 'select',
          options: [
            { label: 'Global (inherit)', value: '' },
            { label: 'Commerce Dark', value: 'commerce-dark' },
            { label: 'Commerce Light', value: 'commerce-light' },
          ],
        },
      ],
    },
  ],
  events: [
    {
      name: 'onChange',
      signature: '(tags: string[]) => void',
      description: 'Se dispara al agregar o quitar tags con la lista completa actualizada.',
      handlerType: 'TagBoxOnChangeHandler',
    },
    {
      name: 'onFocus',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el input interno recibe el foco.',
    },
    {
      name: 'onBlur',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el input interno pierde el foco.',
    },
    {
      name: 'onKeyDown',
      signature: '(event: KeyboardEvent<HTMLInputElement>) => void',
      description: 'Se dispara al presionar una tecla. Enter, coma, Backspace y Escape tienen comportamiento propio.',
    },
  ],
};
