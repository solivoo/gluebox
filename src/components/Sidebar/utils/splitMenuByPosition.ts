import type { MenuItem } from '../type/menu.types';

export interface SplitMenuItems {
  topItems: MenuItem[];
  bottomItems: MenuItem[];
}

/** Separa ítems por posición top / bottom (default: top) */
export function splitMenuByPosition(items: MenuItem[]): SplitMenuItems {
  const topItems: MenuItem[] = [];
  const bottomItems: MenuItem[] = [];

  for (const item of items) {
    if (item.position === 'bottom') {
      bottomItems.push(item);
    } else {
      topItems.push(item);
    }
  }

  return { topItems, bottomItems };
}
