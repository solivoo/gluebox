import type { MenuConfig, MenuItemPosition } from '../type/menu.types';
import rawMenu from './mockMenu.json';

export const mockMenu: MenuConfig = {
  items: rawMenu.items.map((item) => ({
    ...item,
    position: item.position as MenuItemPosition | undefined,
  })),
};
