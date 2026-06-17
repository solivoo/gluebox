import type {
  CheckButtonTheme,
  CheckButtonVariantTheme,
} from './CheckButton.theme.types';

interface Accent {
  main: string;
  hover: string;
  active: string;
  ring: string;
}

function buildVariant(isDark: boolean, accent: Accent): CheckButtonVariantTheme {
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
      text: '#ffffff',
      border: accent.main,
      hoverBackground: accent.hover,
      hoverBorder: accent.hover,
      activeBackground: accent.active,
      activeBorder: accent.active,
      focusRing: accent.ring,
      disabledBackground: isDark ? '#374151' : '#e5e7eb',
      disabledText: isDark ? '#6b7280' : '#9ca3af',
      disabledBorder: isDark ? '#374151' : '#e5e7eb',
      iconColor: '#ffffff',
    },
  };
}

function buildOutlineVariant(isDark: boolean, accent: Accent): CheckButtonVariantTheme {
  const base = buildVariant(isDark, accent);
  return {
    unchecked: {
      ...base.unchecked,
      background: 'transparent',
      hoverBackground: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.05)',
      hoverBorder: accent.main,
    },
    checked: base.checked,
  };
}

function buildGhostVariant(isDark: boolean, accent: Accent): CheckButtonVariantTheme {
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

function buildTheme(isDark: boolean, accent: Accent): CheckButtonTheme {
  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
    variants: {
      primary: buildVariant(isDark, accent),
      outline: buildOutlineVariant(isDark, accent),
      ghost: buildGhostVariant(isDark, accent),
    },
  };
}

const indigo = { main: '#6366f1', hover: '#818cf8', active: '#4f46e5', ring: 'rgba(99,102,241,0.45)' };
const emerald = { main: '#10b981', hover: '#34d399', active: '#059669', ring: 'rgba(16,185,129,0.45)' };
const blue = { main: '#3b82f6', hover: '#60a5fa', active: '#2563eb', ring: 'rgba(59,130,246,0.45)' };

export const checkButtonThemes = {
  dark: buildTheme(true, indigo),
  light: buildTheme(false, indigo),
  'modern-dark': buildTheme(true, emerald),
  'modern-light': buildTheme(false, emerald),
  'enterprise-dark': buildTheme(true, blue),
  'enterprise-light': buildTheme(false, blue),
} as const;
