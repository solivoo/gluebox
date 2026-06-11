import type { SidebarTheme, SidebarThemePreset } from './Sidebar.theme.types';

export const sidebarThemes: Record<SidebarThemePreset, SidebarTheme> = {
  dark: {
    background: '#1e1e2e',
    text: '#cdd6f4',
    icon: '#bac2de',
    hoverBackground: '#313244',
    activeBackground: '#313244',
    activeText: '#89b4fa',
    activeIcon: '#89b4fa',
    mutedText: '#a6adc8',
    iconFallbackBackground: '#313244',
  },
  light: {
    background: '#ffffff',
    text: '#1e1e2e',
    icon: '#45475a',
    hoverBackground: '#f4f4f5',
    activeBackground: '#eef0f4',
    activeText: '#1e66f5',
    activeIcon: '#1e66f5',
    mutedText: '#585b70',
    iconFallbackBackground: '#e6e9ef',
  },
};
