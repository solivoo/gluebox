import { SidebarIcon } from './SidebarIcon';
import type { SidebarBrandComponent } from './type/brand.types';
import type { IconResolver } from './type/icon.types';

interface SidebarHeaderProps {
  collapsed: boolean;
  brand?: SidebarBrandComponent;
  showToggle: boolean;
  onToggle: () => void;
  renderIcon?: IconResolver;
}

export function SidebarHeader({
  collapsed,
  brand: Brand,
  showToggle,
  onToggle,
  renderIcon,
}: SidebarHeaderProps) {
  if (!Brand && !showToggle) {
    return null;
  }

  const label = collapsed ? 'Expandir sidebar' : 'Contraer sidebar';

  return (
    <div className="sidebar__header">
      <div className="sidebar__header-inner">
        {Brand && (
          <div className="sidebar__brand">
            <Brand collapsed={collapsed} />
          </div>
        )}

        {showToggle && (
          <button
            type="button"
            className="sidebar__toggle"
            onClick={onToggle}
            aria-label={label}
            title={label}
          >
            <SidebarIcon
              name={collapsed ? 'panel-left-open' : 'panel-left-close'}
              renderIcon={renderIcon}
              className="sidebar__toggle-icon"
            />
          </button>
        )}
      </div>
    </div>
  );
}
