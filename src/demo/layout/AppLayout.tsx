import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { GluBoxBrand } from '@/components/brand/GluBoxBrand';
import { renderMenuIcon } from '@/icons/menuIconRegistry';
import { useSidebarNavigation } from '@/demo/routing/useSidebarNavigation';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePath, onNavigate } = useSidebarNavigation();

  return (
    <div className="app-shell">
      <Sidebar
        menu={mockMenu}
        userPermissions={mockUserPermissions}
        collapsed={collapsed}
        width={collapsed ? 64 : 240}
        theme="dark"
        brand={GluBoxBrand}
        activePath={activePath}
        collapseOthersOnSelect
        renderIcon={renderMenuIcon}
        onCollapsedChange={setCollapsed}
        onNavigate={onNavigate}
      />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
