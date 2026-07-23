import type { ComponentMeta } from '@/demo/playground/types';
import type { PageActionsMenuProps } from '@/components/PageActionsMenu';

export type PageActionsMenuPlaygroundDefaults = Partial<
  Omit<PageActionsMenuProps, 'items' | 'onActionSelect' | 'onNavigate' | 'renderIcon'>
>;

export const pageActionsMenuMeta: ComponentMeta<PageActionsMenuPlaygroundDefaults> = {
  name: 'PageActionsMenu',
  description:
    'Menú hamburguesa de acciones de página (hijos surface: actions del nodo activo).',
  sourcePath: 'src/components/PageActionsMenu/PageActionsMenu.tsx',
  fullWidthPreview: false,
  defaults: {
    variant: 'ghost',
    size: 'md',
    height: undefined,
    align: 'end',
    disabled: false,
    triggerLabel: 'Acciones de página',
    emptyMessage: 'No hay acciones disponibles',
    theme: undefined,
  },
  sections: [
    {
      title: 'Datos',
      props: [
        {
          name: 'items',
          type: 'PageActionItem[] | NavigationNode[]',
          defaultValue: undefined,
          description:
            'Acciones a listar. Preferí pageActionsFromNode(activeNode) (surface: actions).',
          control: 'slot',
          hideInPlayground: true,
        },
      ],
    },
    {
      title: 'Comportamiento',
      props: [
        {
          name: 'align',
          type: 'PageActionsMenuAlign',
          defaultValue: 'end',
          description: 'Alineación del panel respecto al botón hamburguesa.',
          control: 'select',
          options: [
            { label: 'Inicio (izq.)', value: 'start' },
            { label: 'Fin (der.)', value: 'end' },
          ],
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita el trigger.',
          control: 'boolean',
        },
        {
          name: 'triggerLabel',
          type: 'string',
          defaultValue: 'Acciones de página',
          description: 'aria-label del botón hamburguesa.',
          control: 'text',
        },
        {
          name: 'emptyMessage',
          type: 'string',
          defaultValue: 'No hay acciones disponibles',
          description: 'Texto cuando items está vacío.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: 'PageActionsMenuVariant',
          defaultValue: 'ghost',
          description: 'Variante visual del trigger.',
          control: 'select',
          options: [
            { label: 'Ghost', value: 'ghost' },
            { label: 'Outline', value: 'outline' },
            { label: 'Primary', value: 'primary' },
          ],
        },
        {
          name: 'size',
          type: 'PageActionsMenuSize',
          defaultValue: 'md',
          description: 'Tamaño del trigger (ignorado si hay height).',
          control: 'select',
          options: [
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
          ],
        },
        {
          name: 'height',
          type: 'string | number',
          defaultValue: undefined,
          description:
            'Altura del trigger en px o CSS. Prevalece sobre size y mantiene el botón cuadrado.',
          control: 'number',
        },
        {
          name: 'theme',
          type: 'PageActionsMenuThemePreset | PageActionsMenuTheme',
          defaultValue: undefined,
          description: 'Preset o tema parcial.',
          control: 'select',
          options: [
            { label: 'Global (inherit)', value: '' },
            { label: 'Default light', value: 'light' },
            { label: 'Default dark', value: 'dark' },
            { label: 'Modern light', value: 'modern-light' },
            { label: 'Modern dark', value: 'modern-dark' },
            { label: 'Enterprise light', value: 'enterprise-light' },
            { label: 'Enterprise dark', value: 'enterprise-dark' },
          ],
        },
      ],
    },
  ],
  events: [
    {
      name: 'onActionSelect',
      signature: '(item: PageActionItem) => void',
      description: 'Se dispara al elegir cualquier acción habilitada.',
      handlerType: 'PageActionsMenuOnActionSelectHandler',
      payloadType: 'PageActionItem',
    },
    {
      name: 'onNavigate',
      signature: '(route: string, item: PageActionItem) => void',
      description: 'Solo si el ítem tiene route.',
      handlerType: 'PageActionsMenuOnNavigateHandler',
    },
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Apertura / cierre del menú.',
      handlerType: 'PageActionsMenuOnOpenChangeHandler',
    },
  ],
};
