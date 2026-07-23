import type { ComponentMeta } from '@/demo/playground/types';
import type { ButtonProps } from '@/components/Button';

export const buttonMeta: ComponentMeta<ButtonProps> = {
  name: 'Button',
  description:
    'Botón multi-variante con soporte para íconos, estado de carga, tema claro/oscuro y todos los estados interactivos.',
  sourcePath: 'src/components/Button/Button.tsx',
  fullWidthPreview: false,
  defaults: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          defaultValue: 'Button',
          description: 'Contenido del botón (texto o elementos React).',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'ButtonVariant',
          defaultValue: 'primary',
          description: 'Variante visual del botón.',
          control: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Danger', value: 'danger' },
          ],
        },
        {
          name: 'size',
          type: 'ButtonSize',
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
          description: 'Si true, el botón ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo del botón. Ej: "320px", 200, "100%". Prevalece sobre fullWidth.',
          control: 'text',
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
          description: 'Deshabilita el botón (no recibe clics).',
          control: 'boolean',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra un spinner y deshabilita el botón.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'ButtonThemeInput',
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
      name: 'onClick',
      signature: '(event: MouseEvent<HTMLButtonElement>) => void',
      description: 'Se dispara al hacer clic en el botón. Heredado de ButtonHTMLAttributes.',
      handlerType: 'ButtonOnClickHandler',
    },
    {
      name: 'onFocus',
      signature: '(event: FocusEvent<HTMLButtonElement>) => void',
      description: 'Se dispara cuando el botón recibe el foco.',
    },
    {
      name: 'onBlur',
      signature: '(event: FocusEvent<HTMLButtonElement>) => void',
      description: 'Se dispara cuando el botón pierde el foco.',
    },
    {
      name: 'onKeyDown',
      signature: '(event: KeyboardEvent<HTMLButtonElement>) => void',
      description: 'Se dispara al presionar una tecla mientras el botón tiene el foco.',
    },
  ],
};
