import type { CSSProperties } from 'react';
import type { SwitchTheme, SwitchThemeInput } from './Switch.theme.types';
import { switchThemes } from './defaultThemes';

export function resolveTheme(theme?: SwitchThemeInput): SwitchTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return switchThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables. Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: SwitchTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  return {
    '--switch-font-size': theme.fontSize,
    '--switch-transition': theme.transition,
    '--switch-focus-ring': theme.focusRing,
    '--switch-label-color': theme.labelColor,
    '--switch-helper-color': theme.helperTextColor,
    '--switch-error-color': theme.errorTextColor,
    '--switch-loader': theme.loaderColor,
    '--switch-track': theme.track.background,
    '--switch-track-hover': theme.track.hoverBackground,
    '--switch-track-checked': theme.track.checkedBackground,
    '--switch-track-checked-hover': theme.track.checkedHoverBackground,
    '--switch-thumb': theme.thumb.background,
    '--switch-thumb-hover': theme.thumb.hoverBackground,
    '--switch-thumb-checked': theme.thumb.checkedBackground,
    '--switch-thumb-checked-hover': theme.thumb.checkedHoverBackground,
  } as CSSProperties;
}
