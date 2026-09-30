import type { ToastTheme, ToastThemePreset } from './Toast.theme.types';
import { buildToastTheme } from '@/components/shared/toastThemeBuilder';
import { commercePastel } from '@/styles/pastelPalette';

function preset(isDark: boolean): ToastTheme {
  const accent = isDark ? commercePastel.dark : commercePastel.light;
  return buildToastTheme(isDark, accent);
}

export const toastThemes: Record<ToastThemePreset, ToastTheme> = {
  'commerce-light': preset(false),
  'commerce-dark': preset(true),
};
