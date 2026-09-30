import type { CSSProperties } from 'react';
import type { TagBoxTheme, TagBoxThemeInput } from './TagBox.theme.types';
import { tagBoxThemes } from './defaultThemes';

export function resolveTheme(theme?: TagBoxThemeInput): TagBoxTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return tagBoxThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables. Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: TagBoxTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  const v = theme.variants;
  return {
    '--tagbox-font-size': theme.fontSize,
    '--tagbox-radius': theme.borderRadius,
    '--tagbox-transition': theme.transition,
    '--tagbox-shadow': theme.shadow,
    '--tagbox-helper-color': theme.helperTextColor,
    '--tagbox-error-color': theme.errorTextColor,
    '--tagbox-label-color': theme.labelColor,
    '--tagbox-clear-color': theme.clearButtonColor,
    '--tagbox-clear-hover-color': theme.clearButtonHoverColor,
    /* Tags */
    '--tagbox-tag-bg': theme.tags.background,
    '--tagbox-tag-text': theme.tags.text,
    '--tagbox-tag-border': theme.tags.border,
    '--tagbox-tag-radius': theme.tags.borderRadius,
    '--tagbox-tag-remove-color': theme.tags.removeColor,
    '--tagbox-tag-remove-hover-color': theme.tags.removeHoverColor,
    '--tagbox-tag-remove-hover-bg': theme.tags.removeHoverBackground,
    /* Primary */
    '--tagbox-primary-bg': v.primary.background,
    '--tagbox-primary-text': v.primary.text,
    '--tagbox-primary-border': v.primary.border,
    '--tagbox-primary-placeholder': v.primary.placeholderColor,
    '--tagbox-primary-icon': v.primary.iconColor,
    '--tagbox-primary-hover-bg': v.primary.hoverBackground,
    '--tagbox-primary-hover-border': v.primary.hoverBorder,
    '--tagbox-primary-focus-bg': v.primary.focusBackground,
    '--tagbox-primary-focus-border': v.primary.focusBorder,
    '--tagbox-primary-focus-ring': v.primary.focusRing,
    '--tagbox-primary-disabled-bg': v.primary.disabledBackground,
    '--tagbox-primary-disabled-text': v.primary.disabledText,
    '--tagbox-primary-disabled-border': v.primary.disabledBorder,
    '--tagbox-primary-error-border': v.primary.errorBorder,
    '--tagbox-primary-error-focus-ring': v.primary.errorFocusRing,
    /* Secondary */
    '--tagbox-secondary-bg': v.secondary.background,
    '--tagbox-secondary-text': v.secondary.text,
    '--tagbox-secondary-border': v.secondary.border,
    '--tagbox-secondary-placeholder': v.secondary.placeholderColor,
    '--tagbox-secondary-icon': v.secondary.iconColor,
    '--tagbox-secondary-hover-bg': v.secondary.hoverBackground,
    '--tagbox-secondary-hover-border': v.secondary.hoverBorder,
    '--tagbox-secondary-focus-bg': v.secondary.focusBackground,
    '--tagbox-secondary-focus-border': v.secondary.focusBorder,
    '--tagbox-secondary-focus-ring': v.secondary.focusRing,
    '--tagbox-secondary-disabled-bg': v.secondary.disabledBackground,
    '--tagbox-secondary-disabled-text': v.secondary.disabledText,
    '--tagbox-secondary-disabled-border': v.secondary.disabledBorder,
    '--tagbox-secondary-error-border': v.secondary.errorBorder,
    '--tagbox-secondary-error-focus-ring': v.secondary.errorFocusRing,
    /* Outline */
    '--tagbox-outline-bg': v.outline.background,
    '--tagbox-outline-text': v.outline.text,
    '--tagbox-outline-border': v.outline.border,
    '--tagbox-outline-placeholder': v.outline.placeholderColor,
    '--tagbox-outline-icon': v.outline.iconColor,
    '--tagbox-outline-hover-bg': v.outline.hoverBackground,
    '--tagbox-outline-hover-border': v.outline.hoverBorder,
    '--tagbox-outline-focus-bg': v.outline.focusBackground,
    '--tagbox-outline-focus-border': v.outline.focusBorder,
    '--tagbox-outline-focus-ring': v.outline.focusRing,
    '--tagbox-outline-disabled-bg': v.outline.disabledBackground,
    '--tagbox-outline-disabled-text': v.outline.disabledText,
    '--tagbox-outline-disabled-border': v.outline.disabledBorder,
    '--tagbox-outline-error-border': v.outline.errorBorder,
    '--tagbox-outline-error-focus-ring': v.outline.errorFocusRing,
    /* Ghost */
    '--tagbox-ghost-bg': v.ghost.background,
    '--tagbox-ghost-text': v.ghost.text,
    '--tagbox-ghost-border': v.ghost.border,
    '--tagbox-ghost-placeholder': v.ghost.placeholderColor,
    '--tagbox-ghost-icon': v.ghost.iconColor,
    '--tagbox-ghost-hover-bg': v.ghost.hoverBackground,
    '--tagbox-ghost-hover-border': v.ghost.hoverBorder,
    '--tagbox-ghost-focus-bg': v.ghost.focusBackground,
    '--tagbox-ghost-focus-border': v.ghost.focusBorder,
    '--tagbox-ghost-focus-ring': v.ghost.focusRing,
    '--tagbox-ghost-disabled-bg': v.ghost.disabledBackground,
    '--tagbox-ghost-disabled-text': v.ghost.disabledText,
    '--tagbox-ghost-disabled-border': v.ghost.disabledBorder,
    '--tagbox-ghost-error-border': v.ghost.errorBorder,
    '--tagbox-ghost-error-focus-ring': v.ghost.errorFocusRing,
  } as CSSProperties;
}
