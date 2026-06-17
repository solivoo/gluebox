import type { ComponentMeta } from '@/demo/playground/types';
import type { SidebarProps } from '@/components/Sidebar';
import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { GluBoxBrand } from '@/components/brand/GluBoxBrand';
import { renderMenuIcon } from '@/icons/menuIconRegistry';

export const sidebarMeta: ComponentMeta<SidebarProps> = {
  name: 'Sidebar',
  description:
    'Barra lateral de navegación con menú jerárquico multi-nivel, soporte de permisos, colapsado, modo acordeón, navegación programática, y temas.',
  sourcePath: 'src/components/Sidebar/Sidebar.tsx',
  fullWidthPreview: true,
  defaults: {
    menu: mockMenu,
    userPermissions: mockUserPermissions,
    brand: GluBoxBrand,
    collapsed: false,
    width: 240,
    renderIcon: renderMenuIcon,
    collapseOthersOnSelect: true,
  },
  sections: [
    {
      title: 'Datos',
      props: [
        {
          name: 'menu',
          type: 'MenuConfig',
          defaultValue: mockMenu,
          description: 'Configuración del menú (items, paths, permisos, children). Requerido.',
          control: 'slot',
        },
        {
          name: 'userPermissions',
          type: 'Permission[]',
          defaultValue: mockUserPermissions,
          description: 'Permisos del usuario para filtrar ítems visibles. Requerido.',
          control: 'slot',
        },
        {
          name: 'brand',
          type: 'SidebarBrandComponent',
          defaultValue: GluBoxBrand,
          description: 'Componente de marca/logo en el header.',
          control: 'slot',
        },
        {
          name: 'renderIcon',
          type: 'IconResolver',
          defaultValue: renderMenuIcon,
          description: 'Resuelve íconos del menú por nombre.',
          control: 'slot',
        },
      ],
    },
    {
      title: 'Configuración',
      props: [
        {
          name: 'collapsed',
          type: 'boolean',
          defaultValue: false,
          description: 'Si true, el sidebar se muestra contraído (solo íconos).',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'number | string',
          defaultValue: 240,
          description: 'Ancho del sidebar expandido (en píxeles).',
          control: 'number',
          dependsOn: { prop: 'collapsed', value: false },
        },
        {
          name: 'collapseOthersOnSelect',
          type: 'boolean',
          defaultValue: true,
          description:
            'Si true, al expandir un módulo se cierran los demás (modo acordeón).',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'SidebarThemeInput',
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
      name: 'onCollapsedChange',
      signature: '(collapsed: boolean) => void',
      description:
        'Se dispara cuando el usuario presiona el botón de colapsar/expandir en el sidebar.',
      handlerType: 'SidebarOnCollapsedChangeHandler',
    },
    {
      name: 'onNavigate',
      signature: '(path: string) => void',
      description:
        'Se dispara cuando el usuario hace clic en un ítem de menú que tiene path. La app consumidora decide cómo navegar.',
      handlerType: 'SidebarOnNavigateHandler',
    },
  ],
};
