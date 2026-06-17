import type {
  OptionGroupTheme,
  OptionGroupVariantTheme,
} from './OptionGroup.theme.types';

interface Accent {
  main: string;
  hover: string;
  active: string;
  ring: string;
}

function buildVariants(isDark: boolean, accent: Accent): OptionGroupTheme['variants'] {
  const surface = isDark ? '#1f2937' : '#ffffff';
  const text = isDark ? '#e5e7eb' : '#1f2937';
  const muted = isDark ? '#9ca3af' : '#6b7280';
  const border = isDark ? '#4b5563' : '#d1d5db';
  const disabledBg = isDark ? '#111827' : '#f9fafb';
  const disabledText = isDark ? '#4b5563' : '#d1d5db';

  const primary: OptionGroupVariantTheme = {
    optionBackground: surface,
    optionText: text,
    optionBorder: border,
    selectedBackground: accent.main,
    selectedText: '#ffffff',
    selectedBorder: accent.main,
    hoverOptionBackground: isDark ? '#374151' : '#f9fafb',
    hoverOptionBorder: accent.main,
    hoverSelectedBackground: accent.hover,
    hoverSelectedBorder: accent.hover,
    focusRing: accent.ring,
    disabledBackground: disabledBg,
    disabledText,
    disabledBorder: isDark ? '#374151' : '#e5e7eb',
    indicatorBorder: muted,
    indicatorSelected: '#ffffff',
  };

  const outline: OptionGroupVariantTheme = {
    ...primary,
    optionBackground: 'transparent',
    selectedBackground: isDark ? 'rgba(255,255,255,0.08)' : accent.main,
    selectedText: isDark ? accent.main : '#ffffff',
    selectedBorder: accent.main,
    hoverOptionBackground: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.06)',
    hoverSelectedBackground: isDark ? 'rgba(255,255,255,0.12)' : accent.hover,
    indicatorSelected: isDark ? accent.main : '#ffffff',
  };

  const ghost: OptionGroupVariantTheme = {
    ...outline,
    optionBorder: 'transparent',
    hoverOptionBorder: 'transparent',
    selectedBorder: isDark ? accent.main : accent.main,
  };

  return { primary, outline, ghost };
}

function buildTheme(isDark: boolean, accent: Accent): OptionGroupTheme {
  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
    helperTextColor: isDark ? '#9ca3af' : '#6b7280',
    errorTextColor: isDark ? '#fca5a5' : '#dc2626',
    labelColor: isDark ? '#d1d5db' : '#4b5563',
    variants: buildVariants(isDark, accent),
  };
}

const indigo = { main: '#6366f1', hover: '#818cf8', active: '#4f46e5', ring: 'rgba(99,102,241,0.45)' };
const emerald = { main: '#10b981', hover: '#34d399', active: '#059669', ring: 'rgba(16,185,129,0.45)' };
const blue = { main: '#3b82f6', hover: '#60a5fa', active: '#2563eb', ring: 'rgba(59,130,246,0.45)' };

export const optionGroupThemes = {
  dark: buildTheme(true, indigo),
  light: buildTheme(false, indigo),
  'modern-dark': buildTheme(true, emerald),
  'modern-light': buildTheme(false, emerald),
  'enterprise-dark': buildTheme(true, blue),
  'enterprise-light': buildTheme(false, blue),
} as const;
