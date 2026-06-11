import type { ComponentType } from 'react';

/** Props que recibe el componente de marca personalizado */
export interface SidebarBrandProps {
  collapsed: boolean;
}

export type SidebarBrandComponent = ComponentType<SidebarBrandProps>;
