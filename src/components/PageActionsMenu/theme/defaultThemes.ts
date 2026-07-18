import type {
  PageActionsMenuTheme,
  PageActionsMenuThemePreset,
  PageActionsMenuVariantTheme,
} from './PageActionsMenu.theme.types';
import {
  defaultPastel,
  enterprisePastel,
  modernPastel,
} from '@/styles/pastelPalette';

function variants(
  isDark: boolean,
  accentBg: string,
  accentHover: string,
): PageActionsMenuTheme['variants'] {
  const ghost: PageActionsMenuVariantTheme = {
    background: 'transparent',
    text: isDark ? '#e2e8f0' : '#334155',
    border: 'transparent',
    hoverBackground: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    hoverBorder: 'transparent',
    activeBackground: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.1)',
    activeBorder: 'transparent',
    focusRing: accentBg,
    disabledBackground: 'transparent',
    disabledText: isDark ? '#64748b' : '#94a3b8',
    disabledBorder: 'transparent',
  };

  const outline: PageActionsMenuVariantTheme = {
    background: 'transparent',
    text: isDark ? '#e2e8f0' : '#334155',
    border: isDark ? '#3f4553' : '#d1d5db',
    hoverBackground: isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc',
    hoverBorder: accentBg,
    activeBackground: isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
    activeBorder: accentHover,
    focusRing: accentBg,
    disabledBackground: 'transparent',
    disabledText: isDark ? '#64748b' : '#94a3b8',
    disabledBorder: isDark ? '#2d3139' : '#e5e7eb',
  };

  const primary: PageActionsMenuVariantTheme = {
    background: accentBg,
    text: '#ffffff',
    border: accentBg,
    hoverBackground: accentHover,
    hoverBorder: accentHover,
    activeBackground: accentHover,
    activeBorder: accentHover,
    focusRing: accentBg,
    disabledBackground: isDark ? '#374151' : '#e5e7eb',
    disabledText: isDark ? '#9ca3af' : '#9ca3af',
    disabledBorder: isDark ? '#374151' : '#e5e7eb',
  };

  return { ghost, outline, primary };
}

function preset(
  isDark: boolean,
  family: 'default' | 'modern' | 'enterprise',
): PageActionsMenuTheme {
  const accent =
    family === 'modern'
      ? isDark
        ? modernPastel.dark
        : modernPastel.light
      : family === 'enterprise'
        ? isDark
          ? enterprisePastel.dark
          : enterprisePastel.light
        : isDark
          ? defaultPastel.dark
          : defaultPastel.light;

  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: 'none',
    hoverShadow: 'none',
    panelBg: isDark ? '#1a1d27' : '#ffffff',
    panelText: isDark ? '#e2e8f0' : '#1e293b',
    panelBorder: isDark ? '#2d3139' : '#e4e7ee',
    panelShadow: isDark
      ? '0 12px 32px rgba(0, 0, 0, 0.45)'
      : '0 12px 28px rgba(15, 23, 42, 0.12)',
    itemHoverBg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.05)',
    itemDisabledText: isDark ? '#64748b' : '#94a3b8',
    divider: isDark ? '#2d3139' : '#eef2f7',
    variants: variants(isDark, accent.sidebar, accent.surfaceHover),
  };
}

export const pageActionsMenuThemes: Record<
  PageActionsMenuThemePreset,
  PageActionsMenuTheme
> = {
  light: preset(false, 'default'),
  dark: preset(true, 'default'),
  'modern-light': preset(false, 'modern'),
  'modern-dark': preset(true, 'modern'),
  'enterprise-light': preset(false, 'enterprise'),
  'enterprise-dark': preset(true, 'enterprise'),
};
