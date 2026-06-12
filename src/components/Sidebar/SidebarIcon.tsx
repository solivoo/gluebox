import type { IconResolver } from './type/icon.types';
import { sidebarBuiltinIcons } from './SidebarBuiltinIcons';

interface SidebarIconProps {
  name: string;
  className?: string;
  renderIcon?: IconResolver;
}

export function SidebarIcon({
  name,
  className,
  renderIcon,
}: SidebarIconProps) {
  const iconClass = ['sidebar__icon', className].filter(Boolean).join(' ');
  const BuiltinIcon = sidebarBuiltinIcons[name];
  if (BuiltinIcon) {
    return <BuiltinIcon className={iconClass} aria-hidden="true" />;
  }

  if (renderIcon) {
    return <>{renderIcon(name, iconClass)}</>;
  }

  return (
    <span className={`sidebar__icon-fallback ${iconClass}`.trim()} aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
