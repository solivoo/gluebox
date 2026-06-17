import type { CSSProperties } from 'react';
import type { ToastTheme, ToastThemeInput } from './Toast.theme.types';
import type { ToastVariant } from '../type/Toast.types';
import { toastThemes } from './defaultThemes';

function resolveDefaultPreset(): keyof typeof toastThemes {
  if (typeof document === 'undefined') return 'light';

  const mode = document.documentElement.getAttribute('data-mode');
  const family = document.documentElement.getAttribute('data-theme') ?? 'default';
  const isDark = mode === 'dark';

  if (family === 'modern') return isDark ? 'modern-dark' : 'modern-light';
  if (family === 'enterprise') return isDark ? 'enterprise-dark' : 'enterprise-light';
  return isDark ? 'dark' : 'light';
}

export function resolveTheme(theme?: ToastThemeInput): ToastTheme {
  if (!theme) return toastThemes[resolveDefaultPreset()];
  if (typeof theme === 'string') return toastThemes[theme];
  return theme;
}

function variantVars(prefix: string, v: ToastTheme['variants'][ToastVariant]): Record<string, string> {
  return {
    [`--toast-${prefix}-bg`]: v.background,
    [`--toast-${prefix}-text`]: v.text,
    [`--toast-${prefix}-title`]: v.titleText,
    [`--toast-${prefix}-border`]: v.border,
    [`--toast-${prefix}-accent`]: v.accent,
    [`--toast-${prefix}-close`]: v.closeColor,
    [`--toast-${prefix}-close-hover-bg`]: v.closeHoverBg,
  };
}

export function themeToStyle(theme: ToastTheme): CSSProperties {
  const v = theme.variants;
  return {
    '--toast-font-size': theme.fontSize,
    '--toast-radius': theme.borderRadius,
    '--toast-shadow': theme.shadow,
    '--toast-gap': theme.gap,
    ...variantVars('default', v.default),
    ...variantVars('success', v.success),
    ...variantVars('warning', v.warning),
    ...variantVars('error', v.error),
    ...variantVars('info', v.info),
  } as CSSProperties;
}
