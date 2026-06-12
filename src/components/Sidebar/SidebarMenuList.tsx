import type { IconResolver } from './type/icon.types';
import type { MenuItem } from './type/menu.types';
import { SidebarItem } from './SidebarItem';

interface SidebarMenuListProps {
  items: MenuItem[];
  className?: string;
  collapsed: boolean;
  activePath?: string;
  isExpanded: (itemId: string) => boolean;
  onToggleExpand: (itemId: string) => void;
  onNavigate?: (path: string) => void;
  renderIcon?: IconResolver;
}

export function SidebarMenuList({
  items,
  className,
  collapsed,
  activePath,
  isExpanded,
  onToggleExpand,
  onNavigate,
  renderIcon,
}: SidebarMenuListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={className}>
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          collapsed={collapsed}
          activePath={activePath}
          isExpanded={isExpanded}
          onToggleExpand={onToggleExpand}
          onNavigate={onNavigate}
          renderIcon={renderIcon}
        />
      ))}
    </ul>
  );
}
