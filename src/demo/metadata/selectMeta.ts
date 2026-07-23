import type { ComponentMeta } from '@/demo/playground/types';
import type { SelectProps } from '@/components/Select';

export const selectMeta: ComponentMeta<SelectProps> = {
  name: 'Select',
  description:
    'Select con opciones, búsqueda type-ahead, navegación por teclado, label top/flotante/left, variantes visuales y estados de error/ayuda.',
  sourcePath: 'src/components/Select/Select.tsx',
  fullWidthPreview: false,
  defaults: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
      { value: 'solid', label: 'Solid' },
    ],
    placeholder: 'Seleccionar framework',
    variant: 'primary',
    size: 'md',
    labelPosition: 'top',
    disabled: false,
    error: false,
    fullWidth: false,
    showClearButton: false,
  },
  sections: [
    {
      title: 'Datos',
      props: [
        {
          name: 'options',
          type: 'SelectOption[]',
          defaultValue: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte', disabled: true },
            { value: 'solid', label: 'Solid' },
          ],
          description: 'Lista de opciones { value, label, disabled? }. Requerido.',
          control: 'slot',
        },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Seleccionar framework',
          description: 'Texto que se muestra cuando no hay opción seleccionada.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'SelectVariant',
          defaultValue: 'primary',
          description: 'Variante visual del select.',
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
          type: 'SelectSize',
          defaultValue: 'md',
          description: 'Tamaño del select.',
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
          description: 'Si true, el select ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description: 'Ancho fijo del select. Ej: "320px", 280, "100%". Prevalece sobre fullWidth.',
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
          type: 'SelectLabelPosition',
          defaultValue: 'top',
          description:
            "'top': label arriba. 'floating': dentro del trigger. 'outlined': sobre el borde. 'left': horizontal.",
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
          description: 'Muestra botón X para limpiar la selección cuando hay valor.',
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
          description: 'Deshabilita el select.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra el select en estado de error (borde rojo).',
          control: 'boolean',
        },
        {
          name: 'errorMessage',
          type: 'string',
          defaultValue: undefined,
          description: 'Mensaje de error debajo del select (activa error automáticamente).',
          control: 'text',
          dependsOn: { prop: 'error', value: true },
        },
        {
          name: 'helperText',
          type: 'string',
          defaultValue: undefined,
          description: 'Texto de ayuda debajo del select.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'SelectThemeInput',
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
      signature: '(value: string) => void',
      description: 'Se dispara cuando cambia la opción seleccionada. Recibe el value de la opción.',
      handlerType: 'SelectOnChangeHandler',
      payloadType: 'SelectChangeValue',
    },
  ],
};
