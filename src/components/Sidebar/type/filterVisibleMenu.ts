import type {
  MenuConfig,
  MenuItem,
  MenuSubItem,
  Permission,
} from '@/components/Sidebar/type/menu.types';
import { hasPermission } from '@/components/Sidebar/type/hasPermission';

function filterVisibleSubItems(
  children: MenuSubItem[] | undefined,
  userPermissions: Permission[],
): MenuSubItem[] {
  if (!children) return [];

  return children
    .map((child) => {
      const visibleChildren = filterVisibleSubItems(
        child.children,
        userPermissions,
      );

      if (child.children && child.children.length > 0) {
        if (visibleChildren.length === 0) return null;
        return { ...child, children: visibleChildren };
      }

      if (!hasPermission(userPermissions, child.permissions)) return null;
      return child;
    })
    .filter((child): child is MenuSubItem => child !== null);
}

export function filterVisibleMenu(
  menu: MenuConfig,
  userPermissions: Permission[],
): MenuConfig {
  const visibleItems: MenuItem[] = menu.items
    .map((item) => {
      const visibleChildren = filterVisibleSubItems(
        item.children,
        userPermissions,
      );

      if (item.children && item.children.length > 0) {
        if (visibleChildren.length === 0) return null;
        return { ...item, children: visibleChildren };
      }

      if (!hasPermission(userPermissions, item.permissions)) return null;
      return item;
    })
    .filter((item): item is MenuItem => item !== null);

  return { items: visibleItems };
}
