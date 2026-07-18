/** Superficie de UI donde se pinta el nodo de navegación. */
export type NavSurface = 'sidebar' | 'content' | 'actions';

/** Rol semántico del nodo. */
export type NavKind = 'group' | 'view' | 'action';

/**
 * Nodo del árbol de navegación (session / handshake).
 * El API arma este árbol desde filas planas (`menu_items`).
 */
export interface NavigationNode {
  /** Identificador estable */
  id: string;
  /** Texto visible */
  label: string;
  /** Ruta de navegación; `null` en groups o acciones sin navigate */
  route: string | null;
  /** Nombre de icono para `renderIcon` */
  icon: string | null;
  /** Dónde se pinta: sidebar | content | actions */
  surface: NavSurface;
  /** Qué es: group | view | action */
  kind: NavKind;
  /** Si está deshabilitado (plan / permiso / feature flag) */
  disabled: boolean;
  /** Motivo visible (tooltip / title) cuando `disabled` */
  disabledReason: string | null;
  /** Placeholder de menú (módulo no contratado, etc.) */
  placeholder: boolean;
  /** Hijos (cualquier surface) */
  children: NavigationNode[];
}
