import type { SidebarBrandProps } from '@/components/Sidebar/type/brand.types';

export function GluBoxBrand({ collapsed }: SidebarBrandProps) {
  return (
    <div className="app-brand">
      <span className="app-brand__logo" aria-hidden="true">
        G
      </span>
      {!collapsed && <span className="app-brand__name">GluBox</span>}
    </div>
  );
}
