import { useMemo } from 'react';
import type { SidebarProps } from './type/Sidebar.types';
import { filterVisibleMenu } from './type/filterVisibleMenu';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { useExpandedItems } from './hooks/useExpandedItems';
import { splitMenuByPosition } from './utils/splitMenuByPosition';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenuList } from './SidebarMenuList';
import '@/components/Sidebar/css/Sidebar.css';

function resolveWidth(width?: number | string): string {
  if (width === undefined) return '240px';
  return typeof width === 'number' ? `${width}px` : width;
}

export function Sidebar(props: Readonly<SidebarProps>) {
  const {
    menu,
    userPermissions,
    collapsed = false,
    width,
    onCollapsedChange,
    showCollapseButton,
    brand,
    onNavigate,
    renderIcon,
    theme,
    activePath,
    collapseOthersOnSelect = false,
    collapseOnNavigate = false,
  } = props;
  const visibleMenu = useMemo(
    () => filterVisibleMenu(menu, userPermissions),
    [menu, userPermissions],
  );

  const { topItems, bottomItems } = useMemo(
    () => splitMenuByPosition(visibleMenu.items),
    [visibleMenu.items],
  );

  const themeStyle = themeToStyle(resolveTheme(theme));

  const { isExpanded, toggleExpand, syncOnNavigate } = useExpandedItems({
    items: visibleMenu.items,
    activePath,
    collapseOthersOnSelect,
    collapseOnNavigate,
  });

  const shouldShowToggle =
    showCollapseButton ?? Boolean(onCollapsedChange);

  const handleToggleCollapse = () => {
    onCollapsedChange?.(!collapsed);
  };

  const handleNavigate = (path: string) => {
    syncOnNavigate(path);
    onNavigate?.(path);
  };

  const menuListProps = {
    collapsed,
    activePath,
    isExpanded,
    onToggleExpand: toggleExpand,
    onNavigate: handleNavigate,
    renderIcon,
  };

  return (
    <aside
      className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}
      style={{ ...themeStyle, width: resolveWidth(width) }}
    >
      {(brand || (shouldShowToggle && onCollapsedChange)) && (
        <SidebarHeader
          collapsed={collapsed}
          brand={brand}
          showToggle={shouldShowToggle && Boolean(onCollapsedChange)}
          onToggle={handleToggleCollapse}
          renderIcon={renderIcon}
        />
      )}

      <nav className="sidebar__body" aria-label="Menú principal">
        <SidebarMenuList
          {...menuListProps}
          items={topItems}
          className="sidebar__list sidebar__list--top"
        />
        <SidebarMenuList
          {...menuListProps}
          items={bottomItems}
          className="sidebar__list sidebar__list--bottom"
        />
      </nav>
    </aside>
  );
}
