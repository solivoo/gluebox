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
  const BuiltinIcon = sidebarBuiltinIcons[name];
  if (BuiltinIcon) {
    return <BuiltinIcon className={className} width={20} height={20} />;
  }

  if (renderIcon) {
    return <>{renderIcon(name, className)}</>;
  }

  return (
    <span
      className={`sidebar__icon-fallback ${className ?? ''}`.trim()}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
