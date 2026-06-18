import type { ComponentMeta } from '@/demo/playground/types';
import type { TextAreaProps } from '@/components/TextArea';

export const textAreaMeta: ComponentMeta<TextAreaProps> = {
  name: 'TextArea',
  description:
    'Campo de texto multilínea con variantes visuales, label top/flotante/outlined/left, filas configurables, resize, botón de limpiar, estados de error/ayuda y temas.',
  sourcePath: 'src/components/TextArea/TextArea.tsx',
  fullWidthPreview: false,
  defaults: {
    placeholder: 'Escribí tu mensaje...',
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    rows: 4,
    resize: 'vertical',
    disabled: false,
    error: false,
    clearable: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Escribí tu mensaje...',
          description: 'Texto placeholder cuando el campo está vacío.',
          control: 'text',
        },
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: undefined,
          description: 'Valor inicial no controlado.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'TextAreaVariant',
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
          type: 'TextAreaSize',
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
          name: 'rows',
          type: 'number',
          defaultValue: 4,
          description: 'Cantidad de filas visibles del textarea.',
          control: 'number',
        },
        {
          name: 'resize',
          type: 'TextAreaResize',
          defaultValue: 'vertical',
          description: 'Control del redimensionamiento nativo del navegador.',
          control: 'select',
          options: [
            { label: 'Vertical', value: 'vertical' },
            { label: 'None', value: 'none' },
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Both', value: 'both' },
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
          type: 'TextAreaLabelPosition',
          defaultValue: 'top',
          description:
            "'top': label arriba. 'floating': label dentro, flota al enfocar. 'outlined': label sobre el borde. 'left': horizontal.",
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
          name: 'clearable',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra un botón X para limpiar el campo cuando tiene texto.',
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
          type: 'TextAreaThemeInput',
          defaultValue: undefined,
          description: 'Preset ("dark" | "light" | "modern-dark" | ...) o tema personalizado.',
          control: 'select',
          options: [
            { label: 'Default (sin override)', value: '' },
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Modern Dark', value: 'modern-dark' },
            { label: 'Modern Light', value: 'modern-light' },
            { label: 'Enterprise Dark', value: 'enterprise-dark' },
            { label: 'Enterprise Light', value: 'enterprise-light' },
          ],
        },
      ],
    },
  ],
  events: [
    {
      name: 'onChange',
      signature: '(event: ChangeEvent<HTMLTextAreaElement>) => void',
      description: 'Se dispara en cada cambio de valor del textarea. Heredado de TextareaHTMLAttributes.',
      handlerType: 'TextAreaOnChangeHandler',
    },
    {
      name: 'onFocus',
      signature: '(event: FocusEvent<HTMLTextAreaElement>) => void',
      description: 'Se dispara cuando el campo recibe el foco.',
      handlerType: 'TextAreaOnFocusHandler',
    },
    {
      name: 'onBlur',
      signature: '(event: FocusEvent<HTMLTextAreaElement>) => void',
      description: 'Se dispara cuando el campo pierde el foco.',
      handlerType: 'TextAreaOnBlurHandler',
    },
    {
      name: 'onKeyDown',
      signature: '(event: KeyboardEvent<HTMLTextAreaElement>) => void',
      description: 'Se dispara al presionar una tecla mientras el campo tiene el foco.',
    },
  ],
};
