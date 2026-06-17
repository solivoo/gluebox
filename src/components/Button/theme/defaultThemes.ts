import type { ButtonTheme, ButtonThemePreset } from './Button.theme.types';
import { accentForPreset, dangerForPreset } from '@/styles/pastelPalette';
import { buttonDangerVariant, buttonPrimaryVariant } from '@/styles/pastelVariantBuilders';

const lightNeutrals: Pick<ButtonTheme['variants'], 'secondary' | 'outline' | 'ghost'> = {
  secondary: {
    background: '#f3f4f6',
    text: '#1f2937',
    border: '#f3f4f6',
    hoverBackground: '#e5e7eb',
    hoverBorder: '#e5e7eb',
    activeBackground: '#d1d5db',
    activeBorder: '#d1d5db',
    focusRing: 'rgba(156, 163, 175, 0.5)',
    disabledBackground: '#f9fafb',
    disabledText: '#d1d5db',
    disabledBorder: '#f9fafb',
    spinnerColor: '#1f2937',
  },
  outline: {
    background: 'transparent',
    text: '#374151',
    border: '#d1d5db',
    hoverBackground: 'rgba(0, 0, 0, 0.02)',
    hoverBorder: '#9ca3af',
    activeBackground: 'rgba(0, 0, 0, 0.04)',
    activeBorder: '#6b7280',
    focusRing: 'rgba(156, 163, 175, 0.5)',
    disabledBackground: 'transparent',
    disabledText: '#d1d5db',
    disabledBorder: '#e5e7eb',
    spinnerColor: '#374151',
  },
  ghost: {
    background: 'transparent',
    text: '#374151',
    border: 'transparent',
    hoverBackground: 'rgba(0, 0, 0, 0.04)',
    hoverBorder: 'transparent',
    activeBackground: 'rgba(0, 0, 0, 0.06)',
    activeBorder: 'transparent',
    focusRing: 'rgba(156, 163, 175, 0.5)',
    disabledBackground: 'transparent',
    disabledText: '#d1d5db',
    disabledBorder: 'transparent',
    spinnerColor: '#374151',
  },
};

const darkNeutrals: Pick<ButtonTheme['variants'], 'secondary' | 'outline' | 'ghost'> = {
  secondary: {
    background: '#374151',
    text: '#e5e7eb',
    border: '#374151',
    hoverBackground: '#4b5563',
    hoverBorder: '#4b5563',
    activeBackground: '#1f2937',
    activeBorder: '#1f2937',
    focusRing: 'rgba(107, 114, 128, 0.5)',
    disabledBackground: '#1f2937',
    disabledText: '#6b7280',
    disabledBorder: '#1f2937',
    spinnerColor: '#e5e7eb',
  },
  outline: {
    background: 'transparent',
    text: '#e5e7eb',
    border: '#4b5563',
    hoverBackground: 'rgba(255, 255, 255, 0.05)',
    hoverBorder: '#6b7280',
    activeBackground: 'rgba(255, 255, 255, 0.08)',
    activeBorder: '#9ca3af',
    focusRing: 'rgba(156, 163, 175, 0.5)',
    disabledBackground: 'transparent',
    disabledText: '#4b5563',
    disabledBorder: '#374151',
    spinnerColor: '#e5e7eb',
  },
  ghost: {
    background: 'transparent',
    text: '#e5e7eb',
    border: 'transparent',
    hoverBackground: 'rgba(255, 255, 255, 0.05)',
    hoverBorder: 'transparent',
    activeBackground: 'rgba(255, 255, 255, 0.08)',
    activeBorder: 'transparent',
    focusRing: 'rgba(156, 163, 175, 0.5)',
    disabledBackground: 'transparent',
    disabledText: '#4b5563',
    disabledBorder: 'transparent',
    spinnerColor: '#e5e7eb',
  },
};

function createButtonTheme(preset: ButtonThemePreset): ButtonTheme {
  const isDark = preset.includes('dark');
  const accent = accentForPreset(preset);
  const danger = dangerForPreset(preset);
  const neutrals = isDark ? darkNeutrals : lightNeutrals;

  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.06)',
    hoverShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
    variants: {
      primary: buttonPrimaryVariant(accent, isDark),
      ...neutrals,
      danger: buttonDangerVariant(danger, isDark),
    },
  };
}

export const buttonThemes: Record<ButtonThemePreset, ButtonTheme> = {
  light: createButtonTheme('light'),
  dark: createButtonTheme('dark'),
  'modern-light': createButtonTheme('modern-light'),
  'modern-dark': createButtonTheme('modern-dark'),
  'enterprise-light': createButtonTheme('enterprise-light'),
  'enterprise-dark': createButtonTheme('enterprise-dark'),
};
