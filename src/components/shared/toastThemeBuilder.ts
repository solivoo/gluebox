import type { ToastTheme, ToastVariantTheme } from '@/components/Toast/theme/Toast.theme.types';
import { buildOverlaySurfaceTheme } from './overlayThemeBuilder';
import type { PastelAccent } from '@/styles/pastelPalette';

function variant(
  isDark: boolean,
  accent: PastelAccent,
  semantic?: { bg: string; accent: string; text: string },
): ToastVariantTheme {
  const base = buildOverlaySurfaceTheme(isDark, accent);
  if (!semantic) {
    return {
      background: isDark ? '#1c1a26' : base.panelBg,
      text: base.panelText,
      titleText: base.headerText,
      border: base.panelBorder,
      accent: base.accentBorder,
      closeColor: base.closeColor,
      closeHoverBg: isDark ? '#2a2836' : base.closeHoverBg,
    };
  }
  return {
    background: semantic.bg,
    text: semantic.text,
    titleText: semantic.text,
    border: base.panelBorder,
    accent: semantic.accent,
    closeColor: base.closeColor,
    closeHoverBg: isDark ? '#2a2836' : base.closeHoverBg,
  };
}

export function buildToastTheme(isDark: boolean, accent: PastelAccent): ToastTheme {
  const semantic = isDark
    ? {
        success: { bg: '#1a2e24', accent: '#4ade80', text: '#bbf7d0' },
        warning: { bg: '#2d2618', accent: '#fbbf24', text: '#fde68a' },
        error: { bg: '#2d1a1a', accent: '#f87171', text: '#fecaca' },
        info: { bg: '#1a2433', accent: '#60a5fa', text: '#bfdbfe' },
      }
    : {
        success: { bg: '#ecfdf5', accent: '#34d399', text: '#065f46' },
        warning: { bg: '#fffbeb', accent: '#fbbf24', text: '#92400e' },
        error: { bg: '#fef2f2', accent: '#f87171', text: '#991b1b' },
        info: { bg: '#eff6ff', accent: '#60a5fa', text: '#1e40af' },
      };

  return {
    fontSize: '0.875rem',
    borderRadius: '0.625rem',
    shadow: isDark
      ? '0 12px 32px rgba(0, 0, 0, 0.4)'
      : '0 10px 28px rgba(15, 23, 42, 0.1)',
    gap: '0.625rem',
    variants: {
      default: variant(isDark, accent),
      success: variant(isDark, accent, semantic.success),
      warning: variant(isDark, accent, semantic.warning),
      error: variant(isDark, accent, semantic.error),
      info: variant(isDark, accent, semantic.info),
    },
  };
}
