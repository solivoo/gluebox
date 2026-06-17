import type { ComponentMeta } from '@/demo/playground/types';
import type { OptionGroupProps } from '@/components/OptionGroup';

const demoOptions = [
  { value: 'diario', label: 'Diario' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensual', label: 'Mensual' },
  { value: 'anual', label: 'Anual', disabled: true },
];

export const optionGroupMeta: ComponentMeta<OptionGroupProps> = {
  name: 'OptionGroup',
  description:
    'Grupo de opciones de selección exclusiva (radio) con layouts vertical, horizontal y segmentado. Label, estados de error y temas gluBox.',
  sourcePath: 'src/components/OptionGroup/OptionGroup.tsx',
  fullWidthPreview: false,
  defaults: {
    options: demoOptions,
    defaultValue: 'semanal',
    layout: 'vertical',
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Datos',
      props: [
        {
          name: 'options',
          type: 'OptionGroupOption[]',
          defaultValue: demoOptions,
          description: 'Lista de opciones { value, label, disabled? }. Requerido.',
          control: 'slot',
        },
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: 'semanal',
          description: 'Valor inicial seleccionado (modo no controlado).',
          control: 'select',
          options: demoOptions.map((o) => ({ label: o.label, value: o.value })),
        },
        {
          name: 'label',
          type: 'string',
          defaultValue: undefined,
          description: 'Etiqueta del grupo de opciones.',
          control: 'text',
        },
        {
          name: 'helperText',
          type: 'string',
          defaultValue: undefined,
          description: 'Texto de ayuda bajo el grupo.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'layout',
          type: 'OptionGroupLayout',
          defaultValue: 'vertical',
          description: 'Disposición: vertical (radio), horizontal o segmentado (pills).',
          control: 'select',
          options: [
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Segmented', value: 'segmented' },
          ],
        },
        {
          name: 'variant',
          type: 'OptionGroupVariant',
          defaultValue: 'primary',
          description: 'Variante visual del grupo.',
          control: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        {
          name: 'size',
          type: 'OptionGroupSize',
          defaultValue: 'md',
          description: 'Tamaño de las opciones.',
          control: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'labelPosition',
          type: 'OptionGroupLabelPosition',
          defaultValue: 'top',
          description: 'Posición de la etiqueta: arriba o a la izquierda.',
          control: 'select',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Left', value: 'left' },
          ],
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          defaultValue: false,
          description: 'Si true, el grupo ocupa todo el ancho.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo. Ej: "320px", 280.',
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
          description: 'Deshabilita todas las opciones.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Marca el grupo en estado de error.',
          control: 'boolean',
        },
        {
          name: 'errorMessage',
          type: 'string',
          defaultValue: undefined,
          description: 'Mensaje de error (prevalece sobre helperText).',
          control: 'text',
          dependsOn: { prop: 'error', value: true },
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'OptionGroupThemeInput',
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
      signature: '(value: string) => void',
      description: 'Se dispara al seleccionar una opción distinta.',
    },
  ],
};
