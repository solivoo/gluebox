import type { IconResolver } from './type/icon.types';
import type { MenuItem } from './type/menu.types';
import { SidebarIcon } from './SidebarIcon';

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
  activePath?: string;
  isExpanded: boolean;
  onToggleExpand: (itemId: string) => void;
  onNavigate?: (path: string) => void;
  renderIcon?: IconResolver;
}

function isActive(path: string | undefined, activePath?: string): boolean {
  return Boolean(path && activePath && path === activePath);
}

function buildLinkClass(...modifiers: Array<string | false | undefined>): string {
  const base = 'sidebar__link';
  const extras = modifiers.filter(Boolean).join(' ');
  return extras ? `${base} ${extras}` : base;
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
  const itemIsActive = isActive(item.path, activePath);

  const handleParentClick = () => {
    if (hasChildren) {
      onToggleExpand(item.id);
      return;
    }

    if (item.path) {
      onNavigate?.(item.path);
    }
  };

  const parentLinkClass = buildLinkClass(
    hasChildren && 'sidebar__link--parent',
    hasChildren && isExpanded && 'sidebar__link--open',
    !hasChildren && itemIsActive && 'sidebar__link--active',
    hasChildren && itemIsActive && 'sidebar__link--active',
  );

  return (
    <li className="sidebar__item">
      <button
        type="button"
        className={parentLinkClass}
        onClick={handleParentClick}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-current={!hasChildren && itemIsActive ? 'page' : undefined}
      >
        {item.icon && (
          <SidebarIcon name={item.icon} renderIcon={renderIcon} />
        )}
        {!collapsed && <span className="sidebar__label">{item.label}</span>}
        {hasChildren && !collapsed && (
          <SidebarIcon
            name="chevron-down"
            className={`sidebar__chevron${isExpanded ? ' sidebar__chevron--open' : ''}`}
            renderIcon={renderIcon}
          />
        )}
      </button>

      {hasChildren && !collapsed && (
        <ul
          className={`sidebar__sublist${isExpanded ? ' sidebar__sublist--open' : ''}`}
        >
          {(item.children ?? []).map((child) => {
            const subIsActive = isActive(child.path, activePath);

            return (
              <li key={child.id} className="sidebar__subitem">
                <button
                  type="button"
                  className={buildLinkClass(
                    'sidebar__link--child',
                    subIsActive && 'sidebar__link--child-active',
                  )}
                  onClick={() => onNavigate?.(child.path)}
                  aria-current={subIsActive ? 'page' : undefined}
                >
                  <span className="sidebar__label">{child.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
