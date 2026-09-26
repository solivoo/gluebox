/** Permiso requerido para ver un ítem (RBAC: rol o acción concreta) */
export type Permission = string;

/** Zona del sidebar donde se renderiza el ítem */
export type MenuItemPosition = 'top' | 'bottom';

/** Estados de bloqueo que puede exponer el menú (candado visible, sin navegación). */
export interface MenuItemLockable {
  /** Ítem no navegable: se atenúa y expone `aria-disabled`. */
  disabled?: boolean;
  /** Muestra un candado a la derecha del label (módulo no contratado, próximamente). */
  locked?: boolean;
  /** Motivo del bloqueo; se expone como tooltip nativo (`title`). */
  disabledReason?: string;
}

/** Nodo de menú anidable (nivel 2 y 3) */
export interface MenuSubItem extends MenuItemLockable {
  id: string;
  label: string;
  /** Ruta cuando el ítem es hoja; omitir si solo agrupa hijos */
  path?: string;
  permissions?: Permission[];
  children?: MenuSubItem[];
}

export interface MenuItem extends MenuItemLockable {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  permissions?: Permission[];
  children?: MenuSubItem[];
  position?: MenuItemPosition;
}

/** Menú completo que vendrá de la API */
export interface MenuConfig {
  items: MenuItem[];
}
