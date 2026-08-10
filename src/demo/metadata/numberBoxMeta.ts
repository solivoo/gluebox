import type { ComponentMeta } from '@/demo/playground/types';
import type { NumberBoxProps } from '@/components/NumberBox';

export const numberBoxMeta: ComponentMeta<NumberBoxProps> = {
  name: 'NumberBox',
  description:
    'Campo numérico basado en TextBox: spin buttons estilados, step configurable, límites min/max, variantes visuales, labels y temas.',
  sourcePath: 'src/components/NumberBox/NumberBox.tsx',
  fullWidthPreview: false,
  defaults: {
    placeholder: '0',
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    step: 1,
    showSpinButtons: true,
    disabled: false,
    error: false,
    showClearButton: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: '0',
          description: 'Texto placeholder cuando el campo está vacío.',
          control: 'text',
        },
        {
          name: 'defaultValue',
          type: 'number',
          defaultValue: undefined,
          description: 'Valor inicial no controlado.',
          control: 'number',
        },
        {
          name: 'min',
          type: 'number',
          defaultValue: undefined,
          description: 'Valor mínimo permitido. Los spin buttons clampean a este límite.',
          control: 'number',
        },
        {
          name: 'max',
          type: 'number',
          defaultValue: undefined,
          description: 'Valor máximo permitido. Los spin buttons clampean a este límite.',
          control: 'number',
        },
        {
          name: 'step',
          type: 'number',
          defaultValue: 1,
          description: 'Incremento de los spin buttons y las flechas ↑/↓ del teclado.',
          control: 'number',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'NumberBoxVariant',
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
          type: 'NumberBoxSize',
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
          description: 'Ancho fijo del campo. Ej: "240px", 200, "100%". Prevalece sobre fullWidth.',
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
          type: 'NumberBoxLabelPosition',
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
          name: 'showSpinButtons',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra los botones de incrementar/decrementar a la derecha.',
          control: 'boolean',
        },
        {
          name: 'showClearButton',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra botón X para limpiar el campo cuando tiene valor.',
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
          description: 'Deshabilita el campo y los spin buttons.',
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
          type: 'NumberBoxThemeInput',
          defaultValue: undefined,
          description: 'Preset ("dark" | "light" | "modern-dark" | ...) o tema personalizado.',
          control: 'select',
          options: [
            { label: 'Global (inherit)', value: '' },
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
      signature: '(event: ChangeEvent<HTMLInputElement>) => void',
      description:
        'Se dispara en cada cambio de valor (tipeo o spin buttons). event.target.value es string; convertí con Number().',
      handlerType: 'NumberBoxOnChangeHandler',
    },
    {
      name: 'onFocus',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el campo recibe el foco.',
      handlerType: 'NumberBoxOnFocusHandler',
    },
    {
      name: 'onBlur',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el campo pierde el foco.',
      handlerType: 'NumberBoxOnBlurHandler',
    },
    {
      name: 'onKeyDown',
      signature: '(event: KeyboardEvent<HTMLInputElement>) => void',
      description: 'Se dispara al presionar una tecla. Las flechas ↑/↓ incrementan/decrementan.',
    },
  ],
};
