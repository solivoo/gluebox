import type { CSSProperties } from 'react';
import type { SidebarTheme, SidebarThemeInput } from './Sidebar.theme.types';
import { sidebarThemes } from './defaultThemes';

export function resolveTheme(theme?: SidebarThemeInput): SidebarTheme {
  if (!theme) return sidebarThemes.dark;
  if (typeof theme === 'string') return sidebarThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables para el root del Sidebar */
export function themeToStyle(theme: SidebarTheme): CSSProperties {
  return {
    '--sidebar-bg': theme.background,
    '--sidebar-text': theme.text,
    '--sidebar-icon': theme.icon,
    '--sidebar-hover-bg': theme.hoverBackground,
    '--sidebar-active-bg': theme.activeBackground,
    '--sidebar-active-text': theme.activeText,
    '--sidebar-active-icon': theme.activeIcon ?? theme.activeText,
    '--sidebar-muted-text': theme.mutedText ?? theme.text,
    '--sidebar-icon-fallback-bg':
      theme.iconFallbackBackground ?? theme.hoverBackground,
    '--sidebar-tree-line': theme.treeLine ?? theme.hoverBackground,
    '--sidebar-rail-active': theme.railActive ?? theme.activeText,
  } as CSSProperties;
}
