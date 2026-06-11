import { useState } from 'react';
import './App.css';
import { Sidebar } from '@/components/Sidebar';
import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { renderMenuIcon } from '@/icons/menuIconRegistry';
import { GluBoxBrand } from '@/components/brand/GluBoxBrand';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('/dashboard');

  return (
    <div style={{ display: 'flex' }}>
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
        onNavigate={setActivePath}
      />
    </div>
  );
}

export default App;
