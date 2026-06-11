/** Permiso requerido para ver un ítem (RBAC: rol o acción concreta) */
export type Permission = string;

/** Zona del sidebar donde se renderiza el ítem */
export type MenuItemPosition = 'top' | 'bottom';

/** Un item hijo dentro de un submenu */
export interface MenuSubItem {
    id: string;
    label: string;
    path: string;
    /** Permisos requeridos para ver este ítem */
    permissions?: Permission[];
}


export interface MenuItem {
    id: string;
    label: string;
    /** Clave de icono resuelta por renderIcon en la app consumidora */
    icon?: string;
    path?: string;
    permissions?: Permission[];
    children?: MenuSubItem[];
    /** Zona del menú: 'top' (default) o 'bottom' (ej. ajustes, ayuda) */
    position?: MenuItemPosition;
}

/** Menú completo que vendra de la API */
export interface MenuConfig {
    items: MenuItem[];
}
