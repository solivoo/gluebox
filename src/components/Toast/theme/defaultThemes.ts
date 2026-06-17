import type { ToastTheme, ToastThemePreset } from './Toast.theme.types';
import { buildToastTheme } from '@/components/shared/toastThemeBuilder';
import {
  defaultPastel,
  enterprisePastel,
  modernPastel,
} from '@/styles/pastelPalette';

function preset(isDark: boolean, family: 'default' | 'modern' | 'enterprise'): ToastTheme {
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
  return buildToastTheme(isDark, accent);
}

export const toastThemes: Record<ToastThemePreset, ToastTheme> = {
  light: preset(false, 'default'),
  dark: preset(true, 'default'),
  'modern-light': preset(false, 'modern'),
  'modern-dark': preset(true, 'modern'),
  'enterprise-light': preset(false, 'enterprise'),
  'enterprise-dark': preset(true, 'enterprise'),
};
