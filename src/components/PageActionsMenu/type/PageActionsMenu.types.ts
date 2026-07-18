import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import type { NavigationNode } from '@/components/navigation';
import type { PageActionsMenuThemeInput } from '../theme/PageActionsMenu.theme.types';

export type PageActionsMenuSize = 'sm' | 'md' | 'lg';
export type PageActionsMenuVariant = 'ghost' | 'outline' | 'primary';
export type PageActionsMenuAlign = 'start' | 'end';

/**
 * Ítem de acción de página. Compatible con `NavigationNode` (`surface: 'actions'`).
 */
export interface PageActionItem {
  id: string;
  label: string;
  icon?: string | null;
  route?: string | null;
  disabled?: boolean;
  disabledReason?: string | null;
  /** Metadatos opcionales del árbol de navegación */
  kind?: NavigationNode['kind'];
  surface?: NavigationNode['surface'];
}

export interface PageActionsMenuProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'size' | 'onSelect'
  > {
  /**
   * Acciones a mostrar. Ideal: `pageActionsFromNode(activeNode)`.
   * También acepta `NavigationNode[]` con `surface: 'actions'`.
   */
  items: ReadonlyArray<PageActionItem | NavigationNode>;
  /** Controla si el menú está abierto */
  open?: boolean;
  /** Estado inicial no controlado */
  defaultOpen?: boolean;
  /** Cambio de apertura del menú */
  onOpenChange?: (open: boolean) => void;
  /**
   * Se dispara al elegir una acción (siempre).
   * Si hay `route`, también se llama `onNavigate` (si está definido).
   */
  onActionSelect?: (item: PageActionItem) => void;
  /** Navegación cuando el ítem tiene `route` */
  onNavigate?: (route: string, item: PageActionItem) => void;
  /** Render de iconos por nombre (mismo contrato que Sidebar) */
  renderIcon?: (name: string, className: string) => ReactElement | null;
  /** Contenido opcional del botón trigger (default: icono hamburguesa) */
  trigger?: ReactNode;
  /** `aria-label` del botón (default: "Acciones de página") */
  triggerLabel?: string;
  /** Alineación del panel respecto al trigger */
  align?: PageActionsMenuAlign;
  /** Variante visual del trigger */
  variant?: PageActionsMenuVariant;
  /** Tamaño del trigger (`sm` / `md` / `lg`) */
  size?: PageActionsMenuSize;
  /**
   * Altura del botón trigger (ej. `32`, `"2rem"`, `"40px"`).
   * Si se define, prevalece sobre `size` y mantiene el botón cuadrado (mismo ancho).
   */
  height?: string | number;
  /** Deshabilita el trigger */
  disabled?: boolean;
  /** Tema gluBox */
  theme?: PageActionsMenuThemeInput;
  /** Mensaje cuando `items` está vacío */
  emptyMessage?: string;
  /** Clase CSS adicional en el root */
  className?: string;
}

/** Handler tipado de onActionSelect */
export type PageActionsMenuOnActionSelectHandler = (item: PageActionItem) => void;

/** Handler tipado de onNavigate */
export type PageActionsMenuOnNavigateHandler = (
  route: string,
  item: PageActionItem,
) => void;

/** Handler tipado de onOpenChange */
export type PageActionsMenuOnOpenChangeHandler = (open: boolean) => void;
