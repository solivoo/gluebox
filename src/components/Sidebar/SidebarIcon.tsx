import type { IconResolver } from './type/icon.types';

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
