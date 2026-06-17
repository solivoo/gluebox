import { useState, useLayoutEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { GluBoxBrand } from '@/components/brand/GluBoxBrand';
import { renderMenuIcon } from '@/icons/menuIconRegistry';
import { useSidebarNavigation } from '@/demo/routing/useSidebarNavigation';
import '@/styles/themes/index.css';

type ThemeName = 'default' | 'modern' | 'enterprise';
type ModeName = 'light' | 'dark';

const THEME_KEY = 'glubox-demo-theme';
const MODE_KEY = 'glubox-demo-mode';

function getStoredTheme(): ThemeName {
  return (localStorage.getItem(THEME_KEY) as ThemeName) || 'default';
}
function getStoredMode(): ModeName {
  return (localStorage.getItem(MODE_KEY) as ModeName) || 'dark';
}

const THEME_OPTIONS: { value: ThemeName; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'modern', label: 'Modern' },
  { value: 'enterprise', label: 'Enterprise' },
];

const MODE_OPTIONS: { value: ModeName; label: string }[] = [
  { value: 'light', label: '☀️ Light' },
  { value: 'dark', label: '🌙 Dark' },
];

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePath, onNavigate } = useSidebarNavigation();
  const [theme, setTheme] = useState<ThemeName>(getStoredTheme);
  const [mode, setMode] = useState<ModeName>(getStoredMode);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(MODE_KEY, mode);
  }, [theme, mode]);

  const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as ThemeName);
  }, []);

  const handleModeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as ModeName);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar
        menu={mockMenu}
        userPermissions={mockUserPermissions}
        collapsed={collapsed}
        width={collapsed ? 64 : 240}
        brand={GluBoxBrand}
        activePath={activePath}
        collapseOthersOnSelect
        renderIcon={renderMenuIcon}
        onCollapsedChange={setCollapsed}
        onNavigate={onNavigate}
      />

      <main className="app-main">
        {/* Theme toolbar */}
        <div className="app-toolbar">
          <div className="app-toolbar__left">
            <span className="app-toolbar__label">gluBox Demo</span>
          </div>
          <div className="app-toolbar__right">
            <label className="app-toolbar__field">
              <span className="app-toolbar__field-label">Theme</span>
              <select
                className="app-toolbar__select"
                value={theme}
                onChange={handleThemeChange}
              >
                {THEME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="app-toolbar__field">
              <span className="app-toolbar__field-label">Mode</span>
              <select
                className="app-toolbar__select"
                value={mode}
                onChange={handleModeChange}
              >
                {MODE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
