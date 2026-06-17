import type { ComponentMeta } from '@/demo/playground/types';
import type { RangeDateBoxProps } from '@/components/RangeDateBox';

export const rangeDateBoxMeta: ComponentMeta<RangeDateBoxProps> = {
  name: 'RangeDateBox',
  description:
    'Selector de rango de fechas con dos campos (inicio y fin), separador personalizable, variantes visuales, label posicionable, botón de limpiar, validación y temas.',
  sourcePath: 'src/components/RangeDateBox/RangeDateBox.tsx',
  fullWidthPreview: false,
  defaults: {
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    clearable: false,
    fullWidth: false,
    separator: '\u2014',
    displayMode: 'input',
  },
  sections: [
    {
      title: 'Apariencia',
      props: [
        {
          name: 'displayMode',
          type: 'RangeDateBoxDisplayMode',
          defaultValue: 'input',
          description: "'input': dos campos con fecha. 'icon': solo botón con icono de calendario.",
          control: 'select',
          options: [
            { label: 'Input', value: 'input' },
            { label: 'Icon', value: 'icon' },
          ],
        },
        {
          name: 'variant',
          type: 'RangeDateBoxVariant',
          defaultValue: 'primary',
          description: 'Variante visual del selector de rango.',
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
          type: 'RangeDateBoxSize',
          defaultValue: 'md',
          description: 'Tamaño de los campos.',
          control: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'separator',
          type: 'string',
          defaultValue: '\u2014',
          description: 'Texto separador entre los dos campos de fecha.',
          control: 'text',
          dependsOn: { prop: 'displayMode', value: 'input' },
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
          description: 'Ancho fijo del selector. Ej: "480px", 420, "100%". Prevalece sobre fullWidth.',
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
          type: 'RangeDateBoxLabelPosition',
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
          name: 'clearable',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra un botón X para limpiar ambas fechas.',
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
          description: 'Fecha mínima seleccionable (YYYY-MM-DD) para ambos campos.',
          control: 'text',
        },
        {
          name: 'max',
          type: 'string',
          defaultValue: undefined,
          description: 'Fecha máxima seleccionable (YYYY-MM-DD) para ambos campos.',
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
          description: 'Deshabilita ambos campos.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra ambos campos en estado de error (borde rojo).',
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
          type: 'RangeDateBoxThemeInput',
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
      signature: '(range: DateRange) => void',
      description: 'Se dispara cuando cambia la fecha de inicio o fin. Recibe { start: string, end: string }.',
    },
  ],
};
