import type { MenuItem, MenuSubItem } from '../type/menu.types';

function findInSubItems(
  children: MenuSubItem[],
  path: string,
  ancestors: string[],
): string[] | null {
  for (const child of children) {
    if (child.path === path) {
      return ancestors;
    }

    if (child.children?.length) {
      const found = findInSubItems(child.children, path, [
        ...ancestors,
        child.id,
      ]);
      if (found) return found;
    }
  }

  return null;
}

/** Ids de nodos que deben estar abiertos para mostrar la ruta activa */
export function findAncestorIdsByPath(
  items: MenuItem[],
  path?: string,
): string[] {
  if (!path) return [];

  for (const item of items) {
    if (item.path === path) {
      return [];
    }

    if (!item.children?.length) continue;

    for (const child of item.children) {
      if (child.path === path) {
        return [item.id];
      }

      if (child.children?.length) {
        const found = findInSubItems(child.children, path, [
          item.id,
          child.id,
        ]);
        if (found) return found;
      }
    }
  }

  return [];
}

/** @deprecated Usar findAncestorIdsByPath */
export function findParentItemIdByPath(
  items: MenuItem[],
  path?: string,
): string | null {
  const ancestors = findAncestorIdsByPath(items, path);
  return ancestors.at(-1) ?? null;
}
