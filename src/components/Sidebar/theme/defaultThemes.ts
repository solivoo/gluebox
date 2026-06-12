import type { SidebarTheme, SidebarThemePreset } from './Sidebar.theme.types';

export const sidebarThemes: Record<SidebarThemePreset, SidebarTheme> = {
  dark: {
    background: '#1a1a24',
    text: '#e2e8f0',
    icon: '#94a3b8',
    hoverBackground: 'rgba(255, 255, 255, 0.05)',
    activeBackground: 'rgba(255, 255, 255, 0.05)',
    activeText: '#7dd3fc',
    activeIcon: '#7dd3fc',
    mutedText: '#94a3b8',
    iconFallbackBackground: 'rgba(255, 255, 255, 0.08)',
    treeLine: 'rgba(255, 255, 255, 0.08)',
    railActive: '#38bdf8',
  },
  light: {
    background: '#fafafa',
    text: '#1e293b',
    icon: '#64748b',
    hoverBackground: 'rgba(15, 23, 42, 0.04)',
    activeBackground: 'rgba(15, 23, 42, 0.04)',
    activeText: '#0369a1',
    activeIcon: '#0369a1',
    mutedText: '#64748b',
    iconFallbackBackground: '#f1f5f9',
    treeLine: 'rgba(15, 23, 42, 0.08)',
    railActive: '#0284c7',
  },
};
