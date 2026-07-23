import type { CSSProperties } from 'react';
import type { TextAreaTheme, TextAreaThemeInput } from './TextArea.theme.types';
import { textAreaThemes } from './defaultThemes';

export function resolveTheme(theme?: TextAreaThemeInput): TextAreaTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return textAreaThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables. Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: TextAreaTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  const v = theme.variants;
  return {
    '--textarea-font-size': theme.fontSize,
    '--textarea-radius': theme.borderRadius,
    '--textarea-transition': theme.transition,
    '--textarea-shadow': theme.shadow,
    '--textarea-helper-color': theme.helperTextColor,
    '--textarea-error-color': theme.errorTextColor,
    '--textarea-label-color': theme.labelColor,
    '--textarea-clear-color': theme.clearButtonColor,
    '--textarea-clear-hover-color': theme.clearButtonHoverColor,
    '--textarea-primary-bg': v.primary.background,
    '--textarea-primary-text': v.primary.text,
    '--textarea-primary-border': v.primary.border,
    '--textarea-primary-placeholder': v.primary.placeholderColor,
    '--textarea-primary-icon': v.primary.iconColor,
    '--textarea-primary-hover-bg': v.primary.hoverBackground,
    '--textarea-primary-hover-border': v.primary.hoverBorder,
    '--textarea-primary-focus-bg': v.primary.focusBackground,
    '--textarea-primary-focus-border': v.primary.focusBorder,
    '--textarea-primary-focus-ring': v.primary.focusRing,
    '--textarea-primary-disabled-bg': v.primary.disabledBackground,
    '--textarea-primary-disabled-text': v.primary.disabledText,
    '--textarea-primary-disabled-border': v.primary.disabledBorder,
    '--textarea-primary-error-border': v.primary.errorBorder,
    '--textarea-primary-error-focus-ring': v.primary.errorFocusRing,
    '--textarea-secondary-bg': v.secondary.background,
    '--textarea-secondary-text': v.secondary.text,
    '--textarea-secondary-border': v.secondary.border,
    '--textarea-secondary-placeholder': v.secondary.placeholderColor,
    '--textarea-secondary-icon': v.secondary.iconColor,
    '--textarea-secondary-hover-bg': v.secondary.hoverBackground,
    '--textarea-secondary-hover-border': v.secondary.hoverBorder,
    '--textarea-secondary-focus-bg': v.secondary.focusBackground,
    '--textarea-secondary-focus-border': v.secondary.focusBorder,
    '--textarea-secondary-focus-ring': v.secondary.focusRing,
    '--textarea-secondary-disabled-bg': v.secondary.disabledBackground,
    '--textarea-secondary-disabled-text': v.secondary.disabledText,
    '--textarea-secondary-disabled-border': v.secondary.disabledBorder,
    '--textarea-secondary-error-border': v.secondary.errorBorder,
    '--textarea-secondary-error-focus-ring': v.secondary.errorFocusRing,
    '--textarea-outline-bg': v.outline.background,
    '--textarea-outline-text': v.outline.text,
    '--textarea-outline-border': v.outline.border,
    '--textarea-outline-placeholder': v.outline.placeholderColor,
    '--textarea-outline-icon': v.outline.iconColor,
    '--textarea-outline-hover-bg': v.outline.hoverBackground,
    '--textarea-outline-hover-border': v.outline.hoverBorder,
    '--textarea-outline-focus-bg': v.outline.focusBackground,
    '--textarea-outline-focus-border': v.outline.focusBorder,
    '--textarea-outline-focus-ring': v.outline.focusRing,
    '--textarea-outline-disabled-bg': v.outline.disabledBackground,
    '--textarea-outline-disabled-text': v.outline.disabledText,
    '--textarea-outline-disabled-border': v.outline.disabledBorder,
    '--textarea-outline-error-border': v.outline.errorBorder,
    '--textarea-outline-error-focus-ring': v.outline.errorFocusRing,
    '--textarea-ghost-bg': v.ghost.background,
    '--textarea-ghost-text': v.ghost.text,
    '--textarea-ghost-border': v.ghost.border,
    '--textarea-ghost-placeholder': v.ghost.placeholderColor,
    '--textarea-ghost-icon': v.ghost.iconColor,
    '--textarea-ghost-hover-bg': v.ghost.hoverBackground,
    '--textarea-ghost-hover-border': v.ghost.hoverBorder,
    '--textarea-ghost-focus-bg': v.ghost.focusBackground,
    '--textarea-ghost-focus-border': v.ghost.focusBorder,
    '--textarea-ghost-focus-ring': v.ghost.focusRing,
    '--textarea-ghost-disabled-bg': v.ghost.disabledBackground,
    '--textarea-ghost-disabled-text': v.ghost.disabledText,
    '--textarea-ghost-disabled-border': v.ghost.disabledBorder,
    '--textarea-ghost-error-border': v.ghost.errorBorder,
    '--textarea-ghost-error-focus-ring': v.ghost.errorFocusRing,
  } as CSSProperties;
}
