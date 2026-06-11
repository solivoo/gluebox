import type { MenuConfig, MenuItem, MenuSubItem, Permission } from '@/components/Sidebar/type/menu.types';
import { hasPermission } from '@/components/Sidebar/type/hasPermission';

/** Filtra hijos visibles de un ítem con submenú */
function filterVisibleChildren(
  children: MenuSubItem[] | undefined,
  userPermissions: Permission[],
): MenuSubItem[] {
  if (!children) return [];

  return children.filter((child) =>
    hasPermission(userPermissions, child.permissions),
  );
}

/**
 * Devuelve un menú nuevo solo con ítems visibles.
 * - Oculta hijos sin permiso
 * - Oculta padres con submenú si ningún hijo queda visible
 */
export function filterVisibleMenu(
  menu: MenuConfig,
  userPermissions: Permission[],
): MenuConfig {
  const visibleItems: MenuItem[] = menu.items
    .map((item) => {
      const visibleChildren = filterVisibleChildren(
        item.children,
        userPermissions,
      );

      // Padre con submenú: visible solo si queda al menos un hijo
      if (item.children && item.children.length > 0) {
        if (visibleChildren.length === 0) return null;
        return { ...item, children: visibleChildren };
      }

      // Ítem simple (sin hijos): evaluar permiso del padre
      if (!hasPermission(userPermissions, item.permissions)) return null;

      return item;
    })
    .filter((item): item is MenuItem => item !== null);

  return { items: visibleItems };
}