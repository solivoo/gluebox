import type { ComponentMeta } from '@/demo/playground/types';

export const toastMeta: ComponentMeta = {
  name: 'Toast',
  description:
    'Notificaciones no bloqueantes con posicionamiento, título, botón cerrar y variantes semánticas. Usar con ToastProvider y useToast.',
  sourcePath: 'src/components/Toast/ToastProvider.tsx',
  fullWidthPreview: false,
  defaults: {
    title: 'Operación completada',
    children: 'Los cambios se guardaron correctamente.',
    variant: 'default',
    showCloseButton: true,
    position: 'top-right',
    duration: 5000,
    showProgress: true,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'title',
          type: 'ReactNode',
          defaultValue: 'Operación completada',
          description: 'Título visible en la cabecera del toast.',
          control: 'text',
        },
        {
          name: 'children',
          type: 'ReactNode',
          defaultValue: 'Los cambios se guardaron correctamente.',
          description: 'Cuerpo del mensaje.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'ToastVariant',
          defaultValue: 'default',
          description: 'Variante semántica (color de acento).',
          control: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Info', value: 'info' },
          ],
        },
        {
          name: 'showCloseButton',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra el botón de cerrar.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Provider',
      props: [
        {
          name: 'position',
          type: 'ToastPosition',
          defaultValue: 'top-right',
          description: 'Posición del stack de toasts en el viewport.',
          control: 'select',
          options: [
            { label: 'Arriba izquierda', value: 'top-left' },
            { label: 'Arriba centro', value: 'top-center' },
            { label: 'Arriba derecha', value: 'top-right' },
            { label: 'Abajo izquierda', value: 'bottom-left' },
            { label: 'Abajo centro', value: 'bottom-center' },
            { label: 'Abajo derecha', value: 'bottom-right' },
          ],
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: 5000,
          description: 'Duración por defecto en ms (0 = persistente).',
          control: 'number',
        },
        {
          name: 'showProgress',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra barra de progreso del temporizador.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'ToastThemeInput',
          defaultValue: undefined,
          description: 'Preset o tema personalizado.',
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
      name: 'show',
      signature: '(options: ShowToastOptions) => string',
      description: 'Encola un toast vía useToast() y devuelve su id.',
      handlerType: 'ToastShowHandler',
    },
    {
      name: 'dismiss',
      signature: '(id: string) => void',
      description: 'Cierra un toast por id vía useToast().',
      handlerType: 'ToastDismissHandler',
    },
    {
      name: 'dismissAll',
      signature: '() => void',
      description: 'Cierra todos los toasts activos.',
      handlerType: 'ToastDismissAllHandler',
    },
    {
      name: 'onClose',
      signature: '() => void',
      description: 'Se dispara al cerrar manualmente o por timeout.',
      handlerType: 'ToastOnCloseHandler',
    },
  ],
};
