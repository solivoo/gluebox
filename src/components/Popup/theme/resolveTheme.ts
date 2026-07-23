import type { CSSProperties } from 'react';
import type { PopupTheme, PopupThemeInput } from './Popup.theme.types';
import { popupThemes } from './defaultThemes';

export function resolveTheme(theme?: PopupThemeInput): PopupTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return popupThemes[theme];
  return theme;
}

/** Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: PopupTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
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
