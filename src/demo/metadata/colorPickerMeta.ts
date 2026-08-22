import type { ComponentMeta } from '@/demo/playground/types';
import type { ColorPickerProps } from '@/components/ColorPicker';

export const colorPickerMeta: ComponentMeta<ColorPickerProps> = {
  name: 'ColorPicker',
  description:
    'Selector de color con swatch, input hex y panel HSV en portal. Hereda variantes, labels y temas de TextBox; no usa el color picker nativo del SO.',
  sourcePath: 'src/components/ColorPicker/ColorPicker.tsx',
  fullWidthPreview: false,
  defaults: {
    label: 'Color',
    defaultValue: '#3b82f6',
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    showClearButton: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Valor',
      props: [
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: '#3b82f6',
          description: 'Hex inicial no controlado (`#rgb` o `#rrggbb`).',
          control: 'text',
        },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: '#000000',
          description: 'Placeholder del campo hex cuando está vacío.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'ColorPickerVariant',
          defaultValue: 'primary',
          description: 'Variante visual del campo (mismos tokens que TextBox).',
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
          type: 'ColorPickerSize',
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
          description: 'Ocupa todo el ancho disponible.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Label',
      props: [
        {
          name: 'label',
          type: 'string',
          defaultValue: 'Color',
          description: 'Texto de la etiqueta.',
          control: 'text',
        },
        {
          name: 'labelPosition',
          type: 'ColorPickerLabelPosition',
          defaultValue: 'top',
          description: 'Posición del label: top, floating, outlined o left.',
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
      title: 'Estado',
      props: [
        {
          name: 'showClearButton',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra el botón X para vaciar el color.',
          control: 'boolean',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita el campo y el panel.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Estado de error.',
          control: 'boolean',
        },
        {
          name: 'errorMessage',
          type: 'string',
          defaultValue: undefined,
          description: 'Mensaje de error (activa error).',
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
          type: 'TextBoxThemeInput',
          defaultValue: undefined,
          description: 'Override puntual. Sin prop hereda data-theme / data-mode.',
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
      signature: '(value: string) => void',
      description: 'Hex normalizado `#rrggbb`, o string vacío al limpiar.',
      handlerType: 'ColorPickerOnChangeHandler',
    },
  ],
};
