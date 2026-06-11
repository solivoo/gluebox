import type { MenuItem } from '../type/menu.types';

/** Devuelve el id del padre cuyo subítem coincide con la ruta activa */
export function findParentItemIdByPath(
  items: MenuItem[],
  path?: string,
): string | null {
  if (!path) return null;

  for (const item of items) {
    if (item.children?.some((child) => child.path === path)) {
      return item.id;
    }
  }

  return null;
}
