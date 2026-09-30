import type { SidebarTheme, SidebarThemePreset } from './Sidebar.theme.types';

export const sidebarThemes: Record<SidebarThemePreset, SidebarTheme> = {
  'commerce-dark': {
    background: '#121212',
    text: '#ffffff',
    icon: 'rgba(255, 255, 255, 0.7)',
    hoverBackground: 'rgba(255, 255, 255, 0.08)',
    activeBackground: 'rgba(144, 202, 249, 0.12)',
    activeText: '#90caf9',
    activeIcon: '#90caf9',
    mutedText: 'rgba(255, 255, 255, 0.7)',
    iconFallbackBackground: 'rgba(255, 255, 255, 0.08)',
    treeLine: 'rgba(255, 255, 255, 0.12)',
    railActive: '#90caf9',
  },
  'commerce-light': {
    background: '#ffffff',
    text: 'rgba(0, 0, 0, 0.87)',
    icon: 'rgba(0, 0, 0, 0.54)',
    hoverBackground: 'rgba(0, 0, 0, 0.04)',
    activeBackground: 'rgba(25, 118, 210, 0.08)',
    activeText: '#1976d2',
    activeIcon: '#1976d2',
    mutedText: 'rgba(0, 0, 0, 0.6)',
    iconFallbackBackground: '#f5f5f5',
    treeLine: 'rgba(0, 0, 0, 0.12)',
    railActive: '#42a5f5',
  },
};
