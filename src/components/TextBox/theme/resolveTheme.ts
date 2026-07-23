import type { CSSProperties } from 'react';
import type { TextBoxTheme, TextBoxThemeInput } from './TextBox.theme.types';
import { textBoxThemes } from './defaultThemes';

export function resolveTheme(theme?: TextBoxThemeInput): TextBoxTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return textBoxThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables. Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: TextBoxTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  const v = theme.variants;
  return {
    '--textbox-font-size': theme.fontSize,
    '--textbox-radius': theme.borderRadius,
    '--textbox-transition': theme.transition,
    '--textbox-shadow': theme.shadow,
    '--textbox-helper-color': theme.helperTextColor,
    '--textbox-error-color': theme.errorTextColor,
    '--textbox-label-color': theme.labelColor,
    '--textbox-clear-color': theme.clearButtonColor,
    '--textbox-clear-hover-color': theme.clearButtonHoverColor,
    /* Primary */
    '--textbox-primary-bg': v.primary.background,
    '--textbox-primary-text': v.primary.text,
    '--textbox-primary-border': v.primary.border,
    '--textbox-primary-placeholder': v.primary.placeholderColor,
    '--textbox-primary-icon': v.primary.iconColor,
    '--textbox-primary-hover-bg': v.primary.hoverBackground,
    '--textbox-primary-hover-border': v.primary.hoverBorder,
    '--textbox-primary-focus-bg': v.primary.focusBackground,
    '--textbox-primary-focus-border': v.primary.focusBorder,
    '--textbox-primary-focus-ring': v.primary.focusRing,
    '--textbox-primary-disabled-bg': v.primary.disabledBackground,
    '--textbox-primary-disabled-text': v.primary.disabledText,
    '--textbox-primary-disabled-border': v.primary.disabledBorder,
    '--textbox-primary-error-border': v.primary.errorBorder,
    '--textbox-primary-error-focus-ring': v.primary.errorFocusRing,
    /* Secondary */
    '--textbox-secondary-bg': v.secondary.background,
    '--textbox-secondary-text': v.secondary.text,
    '--textbox-secondary-border': v.secondary.border,
    '--textbox-secondary-placeholder': v.secondary.placeholderColor,
    '--textbox-secondary-icon': v.secondary.iconColor,
    '--textbox-secondary-hover-bg': v.secondary.hoverBackground,
    '--textbox-secondary-hover-border': v.secondary.hoverBorder,
    '--textbox-secondary-focus-bg': v.secondary.focusBackground,
    '--textbox-secondary-focus-border': v.secondary.focusBorder,
    '--textbox-secondary-focus-ring': v.secondary.focusRing,
    '--textbox-secondary-disabled-bg': v.secondary.disabledBackground,
    '--textbox-secondary-disabled-text': v.secondary.disabledText,
    '--textbox-secondary-disabled-border': v.secondary.disabledBorder,
    '--textbox-secondary-error-border': v.secondary.errorBorder,
    '--textbox-secondary-error-focus-ring': v.secondary.errorFocusRing,
    /* Outline */
    '--textbox-outline-bg': v.outline.background,
    '--textbox-outline-text': v.outline.text,
    '--textbox-outline-border': v.outline.border,
    '--textbox-outline-placeholder': v.outline.placeholderColor,
    '--textbox-outline-icon': v.outline.iconColor,
    '--textbox-outline-hover-bg': v.outline.hoverBackground,
    '--textbox-outline-hover-border': v.outline.hoverBorder,
    '--textbox-outline-focus-bg': v.outline.focusBackground,
    '--textbox-outline-focus-border': v.outline.focusBorder,
    '--textbox-outline-focus-ring': v.outline.focusRing,
    '--textbox-outline-disabled-bg': v.outline.disabledBackground,
    '--textbox-outline-disabled-text': v.outline.disabledText,
    '--textbox-outline-disabled-border': v.outline.disabledBorder,
    '--textbox-outline-error-border': v.outline.errorBorder,
    '--textbox-outline-error-focus-ring': v.outline.errorFocusRing,
    /* Ghost */
    '--textbox-ghost-bg': v.ghost.background,
    '--textbox-ghost-text': v.ghost.text,
    '--textbox-ghost-border': v.ghost.border,
    '--textbox-ghost-placeholder': v.ghost.placeholderColor,
    '--textbox-ghost-icon': v.ghost.iconColor,
    '--textbox-ghost-hover-bg': v.ghost.hoverBackground,
    '--textbox-ghost-hover-border': v.ghost.hoverBorder,
    '--textbox-ghost-focus-bg': v.ghost.focusBackground,
    '--textbox-ghost-focus-border': v.ghost.focusBorder,
    '--textbox-ghost-focus-ring': v.ghost.focusRing,
    '--textbox-ghost-disabled-bg': v.ghost.disabledBackground,
    '--textbox-ghost-disabled-text': v.ghost.disabledText,
    '--textbox-ghost-disabled-border': v.ghost.disabledBorder,
    '--textbox-ghost-error-border': v.ghost.errorBorder,
    '--textbox-ghost-error-focus-ring': v.ghost.errorFocusRing,
  } as CSSProperties;
}
