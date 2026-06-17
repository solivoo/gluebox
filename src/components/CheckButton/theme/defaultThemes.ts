import type {
  CheckButtonTheme,
  CheckButtonVariantTheme,
} from './CheckButton.theme.types';
import {
  defaultPastel,
  enterprisePastel,
  modernPastel,
} from '@/styles/pastelPalette';
import type { PastelAccent } from '@/styles/pastelPalette';

function accentToLegacy(accent: PastelAccent) {
  return {
    main: accent.surface,
    hover: accent.surfaceHover,
    active: accent.surfaceActive,
    ring: accent.focusRing,
    onFill: accent.onFill,
  };
}

function buildVariant(isDark: boolean, accent: ReturnType<typeof accentToLegacy>): CheckButtonVariantTheme {
  const surface = isDark ? '#1f2937' : '#ffffff';
  const text = isDark ? '#e5e7eb' : '#1f2937';
  const border = isDark ? '#4b5563' : '#d1d5db';
  const disabledBg = isDark ? '#111827' : '#f9fafb';
  const disabledText = isDark ? '#4b5563' : '#d1d5db';

  return {
    unchecked: {
      background: surface,
      text,
      border,
      hoverBackground: isDark ? '#374151' : '#f9fafb',
      hoverBorder: isDark ? '#6b7280' : '#9ca3af',
      activeBackground: isDark ? '#1f2937' : '#f3f4f6',
      activeBorder: border,
      focusRing: accent.ring,
      disabledBackground: disabledBg,
      disabledText,
      disabledBorder: isDark ? '#374151' : '#e5e7eb',
      iconColor: isDark ? '#6b7280' : '#9ca3af',
    },
    checked: {
      background: accent.main,
      text: accent.onFill,
      border: accent.active,
      hoverBackground: accent.hover,
      hoverBorder: accent.active,
      activeBackground: accent.active,
      activeBorder: accent.active,
      focusRing: accent.ring,
      disabledBackground: isDark ? '#374151' : '#e8eaef',
      disabledText: isDark ? '#6b7280' : '#9ca3af',
      disabledBorder: isDark ? '#374151' : '#e8eaef',
      iconColor: accent.onFill,
    },
  };
}

function buildOutlineVariant(isDark: boolean, accent: ReturnType<typeof accentToLegacy>): CheckButtonVariantTheme {
  const base = buildVariant(isDark, accent);
  return {
    unchecked: {
      ...base.unchecked,
      background: 'transparent',
      hoverBackground: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(120, 135, 175, 0.08)',
      hoverBorder: accent.active,
    },
    checked: base.checked,
  };
}

function buildGhostVariant(isDark: boolean, accent: ReturnType<typeof accentToLegacy>): CheckButtonVariantTheme {
  const outline = buildOutlineVariant(isDark, accent);
  return {
    unchecked: {
      ...outline.unchecked,
      border: 'transparent',
      hoverBorder: 'transparent',
    },
    checked: {
      ...outline.checked,
      background: isDark ? 'rgba(255,255,255,0.1)' : accent.main,
    },
  };
}

function buildTheme(isDark: boolean, accent: PastelAccent): CheckButtonTheme {
  const legacy = accentToLegacy(accent);
  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
    variants: {
      primary: buildVariant(isDark, legacy),
      outline: buildOutlineVariant(isDark, legacy),
      ghost: buildGhostVariant(isDark, legacy),
    },
  };
}

export const checkButtonThemes = {
  dark: buildTheme(true, defaultPastel.dark),
  light: buildTheme(false, defaultPastel.light),
  'modern-dark': buildTheme(true, modernPastel.dark),
  'modern-light': buildTheme(false, modernPastel.light),
  'enterprise-dark': buildTheme(true, enterprisePastel.dark),
  'enterprise-light': buildTheme(false, enterprisePastel.light),
} as const;
