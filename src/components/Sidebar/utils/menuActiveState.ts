import type { MenuItem, MenuSubItem } from '../type/menu.types';

function pathInSubItems(
  children: MenuSubItem[],
  activePath: string,
): boolean {
  for (const child of children) {
    if (child.path === activePath) return true;
    if (child.children?.length && pathInSubItems(child.children, activePath)) {
      return true;
    }
  }
  return false;
}

export function isActionActive(
  path: string | undefined,
  activePath?: string,
): boolean {
  return Boolean(path && activePath && path === activePath);
}

export function hasActiveDescendant(
  item: MenuItem | MenuSubItem,
  activePath?: string,
): boolean {
  if (!activePath || !item.children?.length) return false;
  return pathInSubItems(item.children, activePath);
}
