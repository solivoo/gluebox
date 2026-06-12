import type { MenuConfig, Permission } from './menu.types';
import type { IconResolver } from './icon.types';
import type { SidebarBrandComponent } from './brand.types';
import type { SidebarThemeInput } from '../theme/Sidebar.theme.types';

export interface SidebarProps {
  menu: MenuConfig;
  userPermissions: Permission[];
  /** Componente personalizable para logo / nombre de empresa */
  brand?: SidebarBrandComponent;
  collapsed?: boolean;
  width?: number | string;
  /** Callback al usar el botón de contraer/expandir dentro del sidebar */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Muestra el botón de contraer/expandir. @default true si existe onCollapsedChange */
  showCollapseButton?: boolean;
  onNavigate?: (path: string) => void;
  /** Resuelve iconos por nombre — lo define la app consumidora (Lucide, Iconify, etc.) */
  renderIcon?: IconResolver;
  /** Preset ('dark' | 'light') o objeto con colores personalizados */
  theme?: SidebarThemeInput;
  /** Ruta activa actual — resalta ítem y subítem seleccionados */
  activePath?: string;
  /**
   * Si true, al expandir un módulo de primer nivel se cierran los demás (modo acordeón).
   * @default false
   */
  collapseOthersOnSelect?: boolean;
  /**
   * Si true, al navegar se sincroniza la expansión con la ruta (puede cerrar módulos abiertos).
   * Si false, la navegación no contrae menús ya abiertos.
   * @default false
   */
  collapseOnNavigate?: boolean;
}

export type { IconResolver, IconName } from './icon.types';
export type { SidebarBrandProps, SidebarBrandComponent } from './brand.types';
export type {  SidebarTheme,
  SidebarThemePreset,
  SidebarThemeInput,
} from '../theme/Sidebar.theme.types';