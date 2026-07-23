import type { CSSProperties } from 'react';
import type { ButtonTheme, ButtonThemeInput } from './Button.theme.types';
import { buttonThemes } from './defaultThemes';

export function resolveTheme(theme?: ButtonThemeInput): ButtonTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return buttonThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables. Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: ButtonTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  const v = theme.variants;
  return {
    '--btn-font-size': theme.fontSize,
    '--btn-radius': theme.borderRadius,
    '--btn-transition': theme.transition,
    '--btn-shadow': theme.shadow,
    '--btn-hover-shadow': theme.hoverShadow,
    '--btn-primary-bg': v.primary.background,
    '--btn-primary-text': v.primary.text,
    '--btn-primary-border': v.primary.border,
    '--btn-primary-hover-bg': v.primary.hoverBackground,
    '--btn-primary-hover-border': v.primary.hoverBorder,
    '--btn-primary-active-bg': v.primary.activeBackground,
    '--btn-primary-active-border': v.primary.activeBorder,
    '--btn-primary-focus-ring': v.primary.focusRing,
    '--btn-primary-disabled-bg': v.primary.disabledBackground,
    '--btn-primary-disabled-text': v.primary.disabledText,
    '--btn-primary-disabled-border': v.primary.disabledBorder,
    '--btn-primary-spinner': v.primary.spinnerColor,
    '--btn-secondary-bg': v.secondary.background,
    '--btn-secondary-text': v.secondary.text,
    '--btn-secondary-border': v.secondary.border,
    '--btn-secondary-hover-bg': v.secondary.hoverBackground,
    '--btn-secondary-hover-border': v.secondary.hoverBorder,
    '--btn-secondary-active-bg': v.secondary.activeBackground,
    '--btn-secondary-active-border': v.secondary.activeBorder,
    '--btn-secondary-focus-ring': v.secondary.focusRing,
    '--btn-secondary-disabled-bg': v.secondary.disabledBackground,
    '--btn-secondary-disabled-text': v.secondary.disabledText,
    '--btn-secondary-disabled-border': v.secondary.disabledBorder,
    '--btn-secondary-spinner': v.secondary.spinnerColor,
    '--btn-outline-bg': v.outline.background,
    '--btn-outline-text': v.outline.text,
    '--btn-outline-border': v.outline.border,
    '--btn-outline-hover-bg': v.outline.hoverBackground,
    '--btn-outline-hover-border': v.outline.hoverBorder,
    '--btn-outline-active-bg': v.outline.activeBackground,
    '--btn-outline-active-border': v.outline.activeBorder,
    '--btn-outline-focus-ring': v.outline.focusRing,
    '--btn-outline-disabled-bg': v.outline.disabledBackground,
    '--btn-outline-disabled-text': v.outline.disabledText,
    '--btn-outline-disabled-border': v.outline.disabledBorder,
    '--btn-outline-spinner': v.outline.spinnerColor,
    '--btn-ghost-bg': v.ghost.background,
    '--btn-ghost-text': v.ghost.text,
    '--btn-ghost-border': v.ghost.border,
    '--btn-ghost-hover-bg': v.ghost.hoverBackground,
    '--btn-ghost-hover-border': v.ghost.hoverBorder,
    '--btn-ghost-active-bg': v.ghost.activeBackground,
    '--btn-ghost-active-border': v.ghost.activeBorder,
    '--btn-ghost-focus-ring': v.ghost.focusRing,
    '--btn-ghost-disabled-bg': v.ghost.disabledBackground,
    '--btn-ghost-disabled-text': v.ghost.disabledText,
    '--btn-ghost-disabled-border': v.ghost.disabledBorder,
    '--btn-ghost-spinner': v.ghost.spinnerColor,
    '--btn-danger-bg': v.danger.background,
    '--btn-danger-text': v.danger.text,
    '--btn-danger-border': v.danger.border,
    '--btn-danger-hover-bg': v.danger.hoverBackground,
    '--btn-danger-hover-border': v.danger.hoverBorder,
    '--btn-danger-active-bg': v.danger.activeBackground,
    '--btn-danger-active-border': v.danger.activeBorder,
    '--btn-danger-focus-ring': v.danger.focusRing,
    '--btn-danger-disabled-bg': v.danger.disabledBackground,
    '--btn-danger-disabled-text': v.danger.disabledText,
    '--btn-danger-disabled-border': v.danger.disabledBorder,
    '--btn-danger-spinner': v.danger.spinnerColor,
  } as CSSProperties;
}
