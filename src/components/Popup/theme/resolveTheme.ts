import type { CSSProperties } from 'react';
import type { PopupTheme, PopupThemeInput } from './Popup.theme.types';
import { popupThemes } from './defaultThemes';

export function resolveTheme(theme?: PopupThemeInput): PopupTheme {
  if (!theme) return popupThemes.light;
  if (typeof theme === 'string') return popupThemes[theme];
  return theme;
}

export function themeToStyle(theme: PopupTheme): CSSProperties {
  return {
    '--popup-font-size': theme.fontSize,
    '--popup-radius': theme.borderRadius,
    '--popup-shadow': theme.shadow,
    '--popup-overlay-bg': theme.overlayBg,
    '--popup-panel-bg': theme.panelBg,
    '--popup-panel-text': theme.panelText,
    '--popup-panel-border': theme.panelBorder,
    '--popup-header-text': theme.headerText,
    '--popup-footer-bg': theme.footerBg,
    '--popup-close-color': theme.closeColor,
    '--popup-close-hover-bg': theme.closeHoverBg,
    '--popup-accent-border': theme.accentBorder,
  } as CSSProperties;
}
