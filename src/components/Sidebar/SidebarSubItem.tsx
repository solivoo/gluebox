import type { IconResolver } from './type/icon.types';
import type { MenuSubItem } from './type/menu.types';
import { SidebarIcon } from './SidebarIcon';
import { buildLinkClass } from './utils/buildLinkClass';
import { isActionActive, hasActiveDescendant } from './utils/menuActiveState';

type SubItemLevel = 'option' | 'action';

interface SidebarSubItemProps {
  item: MenuSubItem;
  level: SubItemLevel;
  collapsed: boolean;
  activePath?: string;
  isExpanded: (itemId: string) => boolean;
  onToggleExpand: (itemId: string) => void;
  onNavigate?: (path: string) => void;
  renderIcon?: IconResolver;
}

export function SidebarSubItem({
  item,
  level,
  collapsed,
  activePath,
  isExpanded,
  onToggleExpand,
  onNavigate,
  renderIcon,
}: SidebarSubItemProps) {
  const hasChildren = Boolean(item.children?.length);
  const expanded = isExpanded(item.id);
  const actionActive = level === 'action' && isActionActive(item.path, activePath);
  const optionActive = level === 'option' && isActionActive(item.path, activePath);
  const descendantActive = !actionActive && !optionActive && hasActiveDescendant(item, activePath);

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(item.id);
      return;
    }

    if (item.path) {
      onNavigate?.(item.path);
    }
  };

  const levelClass =
    level === 'option' ? 'sidebar__link--option' : 'sidebar__link--action';

  return (
    <li
      className={`sidebar__subitem sidebar__subitem--${level}${hasChildren ? ' sidebar__subitem--branch' : ''}`}
    >
      <button
        type="button"
        className={buildLinkClass(
          levelClass,
          actionActive && 'sidebar__link--action-active',
          optionActive && 'sidebar__link--option-active',
          descendantActive && level === 'option' && 'sidebar__link--option-ancestor',
          descendantActive && level === 'action' && 'sidebar__link--action-ancestor',
        )}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-current={actionActive || optionActive ? 'page' : descendantActive ? 'true' : undefined}
        data-expanded={hasChildren ? expanded : undefined}
      >
        {!collapsed && (
          <span
            className={`sidebar__label sidebar__label--${level}`}
          >
            {item.label}
          </span>
        )}
        {hasChildren && !collapsed && (
          <SidebarIcon
            name="chevron-down"
            className={`sidebar__chevron sidebar__chevron--option${expanded ? ' sidebar__chevron--open' : ''}`}
            renderIcon={renderIcon}
          />
        )}
      </button>

      {hasChildren && !collapsed && (
        <div
          className={`sidebar__collapse sidebar__collapse--nested${expanded ? ' sidebar__collapse--open' : ''}`}
        >
          <ul className="sidebar__sublist sidebar__sublist--tree sidebar__sublist--nested">
            {(item.children ?? []).map((child) => (
              <SidebarSubItem
                key={child.id}
                item={child}
                level="action"
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
