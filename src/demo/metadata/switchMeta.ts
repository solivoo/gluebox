import type { ComponentMeta } from '@/demo/playground/types';
import type { SwitchProps } from '@/components/Switch';

export const switchMeta: ComponentMeta<SwitchProps> = {
  name: 'Switch',
  description:
    'Interruptor on/off con thumb deslizante, label posicionable, tamaños, estado loading, helper/error y temas por familia.',
  sourcePath: 'src/components/Switch/Switch.tsx',
  fullWidthPreview: false,
  defaults: {
    label: 'Notificaciones',
    labelPosition: 'right',
    size: 'md',
    defaultChecked: true,
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'label',
          type: 'ReactNode',
          defaultValue: 'Notificaciones',
          description: 'Etiqueta asociada al control (clickeable).',
          control: 'text',
        },
        {
          name: 'helperText',
          type: 'ReactNode',
          defaultValue: undefined,
          description: 'Texto de ayuda debajo del control.',
          control: 'text',
        },
        {
          name: 'errorMessage',
          type: 'ReactNode',
          defaultValue: undefined,
          description: 'Mensaje de error (implica estado de error).',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'labelPosition',
          type: 'SwitchLabelPosition',
          defaultValue: 'right',
          description: 'Posición de la etiqueta respecto al track.',
          control: 'select',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        {
          name: 'size',
          type: 'SwitchSize',
          defaultValue: 'md',
          description: 'Tamaño del switch.',
          control: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
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
          defaultValue: true,
          description: 'Estado inicial activado (modo no controlado).',
          control: 'boolean',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra spinner en el thumb y bloquea la interacción.',
          control: 'boolean',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita el control.',
          control: 'boolean',
        },
        {
          name: 'error',
          type: 'boolean',
          defaultValue: false,
          description: 'Marca el estado de error (helper en rojo).',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'SwitchThemeInput',
          defaultValue: undefined,
          description: 'Preset o tema personalizado.',
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
      signature: '(checked: boolean) => void',
      description: 'Se dispara al alternar el estado on/off.',
      handlerType: 'SwitchOnChangeHandler',
      payloadType: 'SwitchChangeValue',
    },
  ],
};
