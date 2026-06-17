import type { ComponentMeta } from '@/demo/playground/types';
import type { CheckButtonProps } from '@/components/CheckButton';

export const checkButtonMeta: ComponentMeta<CheckButtonProps> = {
  name: 'CheckButton',
  description:
    'Botón con semántica de checkbox: alterna entre marcado y desmarcado con apariencia de botón, ícono de check y soporte indeterminado.',
  sourcePath: 'src/components/CheckButton/CheckButton.tsx',
  fullWidthPreview: false,
  defaults: {
    children: 'Aceptar términos',
    defaultChecked: false,
    indeterminate: false,
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          defaultValue: 'Aceptar términos',
          description: 'Texto o contenido del botón.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'CheckButtonVariant',
          defaultValue: 'primary',
          description: 'Variante visual del botón.',
          control: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        {
          name: 'size',
          type: 'CheckButtonSize',
          defaultValue: 'md',
          description: 'Tamaño del botón.',
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
          description: 'Si true, ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo. Ej: "240px", 200.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Estado',
      props: [
        {
          name: 'defaultChecked',
          type: 'boolean',
          defaultValue: false,
          description: 'Estado inicial marcado (modo no controlado).',
          control: 'boolean',
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          defaultValue: false,
          description: 'Estado indeterminado (aria-checked="mixed").',
          control: 'boolean',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita el botón.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'CheckButtonThemeInput',
          defaultValue: undefined,
          description: 'Preset o tema personalizado.',
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
      signature: '(checked: boolean) => void',
      description: 'Se dispara al alternar el estado marcado/desmarcado.',
    },
  ],
};
