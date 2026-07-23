import type { ComponentMeta } from '@/demo/playground/types';
import type { DateBoxProps } from '@/components/DateBox';

export const dateBoxMeta: ComponentMeta<DateBoxProps> = {
  name: 'DateBox',
  description:
    'Selector de fecha con variantes visuales, label top/flotante/left, icono de calendario, botón de limpiar, estados de error/ayuda y temas.',
  sourcePath: 'src/components/DateBox/DateBox.tsx',
  fullWidthPreview: false,
  defaults: {
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    clearable: false,
    showClearButton: false,
    fullWidth: false,
    displayMode: 'input',
  },
  sections: [
    {
      title: 'Apariencia',
      props: [
        {
          name: 'displayMode',
          type: 'DateBoxDisplayMode',
          defaultValue: 'input',
          description: "'input': campo con fecha formateada. 'icon': solo botón con icono de calendario.",
          control: 'select',
          options: [
            { label: 'Input', value: 'input' },
            { label: 'Icon', value: 'icon' },
          ],
        },
        {
          name: 'variant',
          type: 'DateBoxVariant',
          defaultValue: 'primary',
          description: 'Variante visual del selector de fecha.',
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
          type: 'DateBoxSize',
          defaultValue: 'md',
          description: 'Tamaño del selector.',
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
          description: 'Si true, el selector ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo del selector. Ej: "320px", 280, "100%". Prevalece sobre fullWidth.',
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
          type: 'DateBoxLabelPosition',
          defaultValue: 'top',
          description:
            "'top': label arriba. 'floating': dentro, flota al seleccionar. 'outlined': sobre el borde. 'left': horizontal.",
          control: 'select',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Floating', value: 'floating' },
            { label: 'Outlined', value: 'outlined' },
            { label: 'Left', value: 'left' },
          ],
          dependsOn: { prop: 'displayMode', value: 'input' },
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
          description: 'Muestra botón X para limpiar la fecha seleccionada.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Restricciones',
      props: [
        {
          name: 'min',
          type: 'string',
          defaultValue: undefined,
          description: 'Fecha mínima seleccionable (YYYY-MM-DD).',
          control: 'text',
        },
        {
          name: 'max',
          type: 'string',
          defaultValue: undefined,
          description: 'Fecha máxima seleccionable (YYYY-MM-DD).',
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
          description: 'Deshabilita el selector.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra el selector en estado de error (borde rojo).',
          control: 'boolean',
        },
        {
          name: 'errorMessage',
          type: 'string',
          defaultValue: undefined,
          description: 'Mensaje de error debajo del selector (activa error automáticamente).',
          control: 'text',
          dependsOn: { prop: 'error', value: true },
        },
        {
          name: 'helperText',
          type: 'string',
          defaultValue: undefined,
          description: 'Texto de ayuda debajo del selector.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'DateBoxThemeInput',
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
      description: 'Se dispara cuando cambia la fecha seleccionada.',
      handlerType: 'DateBoxOnChangeHandler',
    },
    {
      name: 'onFocus',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el selector recibe el foco.',
    },
    {
      name: 'onBlur',
      signature: '(event: FocusEvent<HTMLInputElement>) => void',
      description: 'Se dispara cuando el selector pierde el foco.',
    },
  ],
};
