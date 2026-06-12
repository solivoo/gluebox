/** Permiso requerido para ver un ítem (RBAC: rol o acción concreta) */
export type Permission = string;

/** Zona del sidebar donde se renderiza el ítem */
export type MenuItemPosition = 'top' | 'bottom';

/** Nodo de menú anidable (nivel 2 y 3) */
export interface MenuSubItem {
  id: string;
  label: string;
  /** Ruta cuando el ítem es hoja; omitir si solo agrupa hijos */
  path?: string;
  permissions?: Permission[];
  children?: MenuSubItem[];
}

export interface MenuItem {
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
