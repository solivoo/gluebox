import type { MouseEvent } from 'react';
import type { IconResolver } from './type/icon.types';
import type { MenuItem } from './type/menu.types';
import { SidebarIcon } from './SidebarIcon';
import { SidebarSubItem } from './SidebarSubItem';
import { buildLinkClass } from './utils/buildLinkClass';
import {
  hasActiveDescendant,
  isActionActive,
} from './utils/menuActiveState';

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
  activePath?: string;
  isExpanded: (itemId: string) => boolean;
  onToggleExpand: (itemId: string) => void;
  onNavigate?: (path: string) => void;
  renderIcon?: IconResolver;
}

export function SidebarItem({
  item,
  collapsed,
  activePath,
  isExpanded,
  onToggleExpand,
  onNavigate,
  renderIcon,
}: SidebarItemProps) {
  const hasChildren = Boolean(item.children?.length);
  const expanded = isExpanded(item.id);
  const moduleHomeActive = isActionActive(item.path, activePath);
  const ancestorActive =
    hasActiveDescendant(item, activePath) && !moduleHomeActive;
  const hasModuleHome = Boolean(item.path && hasChildren);

  const handleNavigate = () => {
    if (item.path) {
      onNavigate?.(item.path);
    }
    if (hasChildren && !expanded) {
      onToggleExpand(item.id);
    }
  };

  const handleToggle = (event: MouseEvent) => {
    event.stopPropagation();
    onToggleExpand(item.id);
  };

  const handleRowClick = () => {
    if (hasModuleHome) {
      handleNavigate();
      return;
    }

    if (hasChildren) {
      onToggleExpand(item.id);
      return;
    }

    if (item.path) {
      onNavigate?.(item.path);
    }
  };

  const linkClass = buildLinkClass(
    'sidebar__link--module',
    hasModuleHome && 'sidebar__link--module-split',
    ancestorActive && 'sidebar__link--module-ancestor',
    moduleHomeActive && 'sidebar__link--module-leaf-active',
  );

  return (
    <li className="sidebar__item sidebar__item--module">
      <div
        className={`sidebar__module-row${hasModuleHome ? ' sidebar__module-row--split' : ''}`}
      >
        <button
          type="button"
          className={linkClass}
          onClick={handleRowClick}
          aria-expanded={hasChildren ? expanded : undefined}
          aria-current={moduleHomeActive ? 'page' : undefined}
          data-expanded={hasChildren ? expanded : undefined}
        >
          {item.icon && (
            <SidebarIcon name={item.icon} renderIcon={renderIcon} />
          )}
          {!collapsed && (
            <span className="sidebar__label sidebar__label--module">
              {item.label}
            </span>
          )}
          {hasChildren && !collapsed && !hasModuleHome && (
            <SidebarIcon
              name="chevron-down"
              className={`sidebar__chevron sidebar__chevron--module${expanded ? ' sidebar__chevron--open' : ''}`}
              renderIcon={renderIcon}
            />
          )}
        </button>

        {hasModuleHome && !collapsed && (
          <button
            type="button"
            className="sidebar__chevron-toggle"
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-label={expanded ? 'Contraer módulo' : 'Expandir módulo'}
          >
            <SidebarIcon
              name="chevron-down"
              className={`sidebar__chevron sidebar__chevron--module${expanded ? ' sidebar__chevron--open' : ''}`}
              renderIcon={renderIcon}
            />
          </button>
        )}
      </div>

      {hasChildren && !collapsed && (
        <div
          className={`sidebar__collapse${expanded ? ' sidebar__collapse--open' : ''}`}
        >
          <ul className="sidebar__sublist sidebar__sublist--tree">
            {(item.children ?? []).map((child) => (
              <SidebarSubItem
                key={child.id}
                item={child}
                level="option"
                collapsed={collapsed}
                activePath={activePath}
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
                onNavigate={onNavigate}
                renderIcon={renderIcon}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
