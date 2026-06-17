import type { ComponentMeta } from '@/demo/playground/types';

export const popupMeta: ComponentMeta = {
  name: 'Popup',
  description:
    'Diálogo modal con dimensiones configurables, pie de acciones alineable, cierre por overlay/Escape y arrastre opcional desde la cabecera.',
  sourcePath: 'src/components/Popup/Popup.tsx',
  fullWidthPreview: false,
  defaults: {
    title: 'Confirmar acción',
    children:
      'Diálogo modal con overlay, arrastre desde la cabecera, botón de cerrar y acciones alineadas en el pie.',
    width: 480,
    height: '',
    draggable: true,
    showCloseButton: true,
    footerAlign: 'right',
    closeOnOverlayClick: true,
    closeOnEscape: true,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'title',
          type: 'ReactNode',
          defaultValue: 'Confirmar acción',
          description: 'Título en la cabecera arrastrable.',
          control: 'text',
        },
        {
          name: 'children',
          type: 'ReactNode',
          defaultValue:
            'Diálogo modal con overlay, arrastre desde la cabecera, botón de cerrar y acciones alineadas en el pie.',
          description: 'Contenido principal del diálogo.',
          control: 'text',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: 480,
          description: 'Ancho del panel (px, rem, vw, etc.).',
          control: 'number',
        },
        {
          name: 'height',
          type: 'string | number',
          defaultValue: '',
          description: 'Alto del panel; vacío = altura automática.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Comportamiento',
      props: [
        {
          name: 'draggable',
          type: 'boolean',
          defaultValue: true,
          description: 'Permite arrastrar el panel desde la cabecera.',
          control: 'boolean',
        },
        {
          name: 'showCloseButton',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra el botón de cerrar en la cabecera.',
          control: 'boolean',
        },
        {
          name: 'footerAlign',
          type: 'PopupFooterAlign',
          defaultValue: 'right',
          description: 'Alineación de los botones del pie.',
          control: 'select',
          options: [
            { label: 'Izquierda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Derecha', value: 'right' },
          ],
        },
        {
          name: 'closeOnOverlayClick',
          type: 'boolean',
          defaultValue: true,
          description: 'Cierra al hacer clic en el overlay.',
          control: 'boolean',
        },
        {
          name: 'closeOnEscape',
          type: 'boolean',
          defaultValue: true,
          description: 'Cierra con la tecla Escape.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'PopupThemeInput',
          defaultValue: undefined,
          description: 'Preset o tema personalizado del popup.',
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
      name: 'onClose',
      signature: '() => void',
      description: 'Se dispara al cerrar por overlay, Escape o botón cerrar.',
      handlerType: 'PopupOnCloseHandler',
    },
    {
      name: 'onClick (action)',
      signature: '() => void',
      description: 'Se dispara al pulsar un botón definido en PopupAction.',
      handlerType: 'PopupActionOnClickHandler',
    },
  ],
};
