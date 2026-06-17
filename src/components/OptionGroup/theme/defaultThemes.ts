import type {
  OptionGroupTheme,
  OptionGroupVariantTheme,
} from './OptionGroup.theme.types';
import {
  defaultPastel,
  enterprisePastel,
  modernPastel,
} from '@/styles/pastelPalette';
import type { PastelAccent } from '@/styles/pastelPalette';

function buildVariants(isDark: boolean, accent: PastelAccent): OptionGroupTheme['variants'] {
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
    selectedBackground: accent.surface,
    selectedText: accent.onFill,
    selectedBorder: accent.border,
    hoverOptionBackground: isDark ? '#374151' : '#f9fafb',
    hoverOptionBorder: accent.borderStrong,
    hoverSelectedBackground: accent.surfaceHover,
    hoverSelectedBorder: accent.borderStrong,
    focusRing: accent.focusRing,
    disabledBackground: disabledBg,
    disabledText,
    disabledBorder: isDark ? '#374151' : '#e5e7eb',
    indicatorBorder: muted,
    indicatorSelected: accent.onFill,
  };

  const outline: OptionGroupVariantTheme = {
    ...primary,
    optionBackground: 'transparent',
    selectedBackground: isDark ? accent.subtleBg : accent.surface,
    selectedText: accent.onFill,
    selectedBorder: accent.borderStrong,
    hoverOptionBackground: isDark ? 'rgba(255,255,255,0.04)' : accent.subtleBg,
    hoverSelectedBackground: accent.surfaceHover,
    indicatorSelected: accent.onFill,
  };

  const ghost: OptionGroupVariantTheme = {
    ...outline,
    optionBorder: 'transparent',
    hoverOptionBorder: 'transparent',
    selectedBorder: accent.borderStrong,
  };

  return { primary, outline, ghost };
}

function buildTheme(isDark: boolean, accent: PastelAccent): OptionGroupTheme {
  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
    helperTextColor: isDark ? '#9ca3af' : '#6b7280',
    errorTextColor: isDark ? '#e8b4b4' : '#9b5555',
    labelColor: isDark ? '#d1d5db' : '#4b5563',
    variants: buildVariants(isDark, accent),
  };
}

export const optionGroupThemes = {
  dark: buildTheme(true, defaultPastel.dark),
  light: buildTheme(false, defaultPastel.light),
  'modern-dark': buildTheme(true, modernPastel.dark),
  'modern-light': buildTheme(false, modernPastel.light),
  'enterprise-dark': buildTheme(true, enterprisePastel.dark),
  'enterprise-light': buildTheme(false, enterprisePastel.light),
} as const;
