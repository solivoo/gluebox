import type { CSSProperties } from 'react';
import type { RangeDateBoxTheme, RangeDateBoxThemeInput } from './RangeDateBox.theme.types';
import { rangeDateBoxThemes } from './defaultThemes';

export function resolveTheme(theme?: RangeDateBoxThemeInput): RangeDateBoxTheme {
  if (!theme) return rangeDateBoxThemes.light;
  if (typeof theme === 'string') return rangeDateBoxThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables para el root del RangeDateBox */
export function themeToStyle(theme: RangeDateBoxTheme): CSSProperties {
  const v = theme.variants;
  return {
    '--rangedatebox-font-size': theme.fontSize,
    '--rangedatebox-radius': theme.borderRadius,
    '--rangedatebox-transition': theme.transition,
    '--rangedatebox-shadow': theme.shadow,
    '--rangedatebox-helper-color': theme.helperTextColor,
    '--rangedatebox-error-color': theme.errorTextColor,
    '--rangedatebox-label-color': theme.labelColor,
    '--rangedatebox-clear-color': theme.clearButtonColor,
    '--rangedatebox-clear-hover-color': theme.clearButtonHoverColor,
    '--rangedatebox-calendar-icon-color': theme.calendarIconColor,
    '--rangedatebox-separator-color': theme.separatorColor,
    /* Dropdown */
    '--rangedatebox-dropdown-bg': theme.dropdown.background,
    '--rangedatebox-dropdown-border': theme.dropdown.border,
    '--rangedatebox-dropdown-text': theme.dropdown.text,
    '--rangedatebox-dropdown-muted': theme.dropdown.muted,
    '--rangedatebox-dropdown-disabled': theme.dropdown.disabled,
    '--rangedatebox-dropdown-hover-bg': theme.dropdown.hoverBg,
    '--rangedatebox-dropdown-accent': theme.dropdown.accent,
    '--rangedatebox-dropdown-today-bg': theme.dropdown.todayBg,
    /* Primary */
    '--rangedatebox-primary-bg': v.primary.background,
    '--rangedatebox-primary-text': v.primary.text,
    '--rangedatebox-primary-border': v.primary.border,
    '--rangedatebox-primary-placeholder': v.primary.placeholderColor,
    '--rangedatebox-primary-icon': v.primary.iconColor,
    '--rangedatebox-primary-hover-bg': v.primary.hoverBackground,
    '--rangedatebox-primary-hover-border': v.primary.hoverBorder,
    '--rangedatebox-primary-focus-bg': v.primary.focusBackground,
    '--rangedatebox-primary-focus-border': v.primary.focusBorder,
    '--rangedatebox-primary-focus-ring': v.primary.focusRing,
    '--rangedatebox-primary-disabled-bg': v.primary.disabledBackground,
    '--rangedatebox-primary-disabled-text': v.primary.disabledText,
    '--rangedatebox-primary-disabled-border': v.primary.disabledBorder,
    '--rangedatebox-primary-error-border': v.primary.errorBorder,
    '--rangedatebox-primary-error-focus-ring': v.primary.errorFocusRing,
    /* Secondary */
    '--rangedatebox-secondary-bg': v.secondary.background,
    '--rangedatebox-secondary-text': v.secondary.text,
    '--rangedatebox-secondary-border': v.secondary.border,
    '--rangedatebox-secondary-placeholder': v.secondary.placeholderColor,
    '--rangedatebox-secondary-icon': v.secondary.iconColor,
    '--rangedatebox-secondary-hover-bg': v.secondary.hoverBackground,
    '--rangedatebox-secondary-hover-border': v.secondary.hoverBorder,
    '--rangedatebox-secondary-focus-bg': v.secondary.focusBackground,
    '--rangedatebox-secondary-focus-border': v.secondary.focusBorder,
    '--rangedatebox-secondary-focus-ring': v.secondary.focusRing,
    '--rangedatebox-secondary-disabled-bg': v.secondary.disabledBackground,
    '--rangedatebox-secondary-disabled-text': v.secondary.disabledText,
    '--rangedatebox-secondary-disabled-border': v.secondary.disabledBorder,
    '--rangedatebox-secondary-error-border': v.secondary.errorBorder,
    '--rangedatebox-secondary-error-focus-ring': v.secondary.errorFocusRing,
    /* Outline */
    '--rangedatebox-outline-bg': v.outline.background,
    '--rangedatebox-outline-text': v.outline.text,
    '--rangedatebox-outline-border': v.outline.border,
    '--rangedatebox-outline-placeholder': v.outline.placeholderColor,
    '--rangedatebox-outline-icon': v.outline.iconColor,
    '--rangedatebox-outline-hover-bg': v.outline.hoverBackground,
    '--rangedatebox-outline-hover-border': v.outline.hoverBorder,
    '--rangedatebox-outline-focus-bg': v.outline.focusBackground,
    '--rangedatebox-outline-focus-border': v.outline.focusBorder,
    '--rangedatebox-outline-focus-ring': v.outline.focusRing,
    '--rangedatebox-outline-disabled-bg': v.outline.disabledBackground,
    '--rangedatebox-outline-disabled-text': v.outline.disabledText,
    '--rangedatebox-outline-disabled-border': v.outline.disabledBorder,
    '--rangedatebox-outline-error-border': v.outline.errorBorder,
    '--rangedatebox-outline-error-focus-ring': v.outline.errorFocusRing,
    /* Ghost */
    '--rangedatebox-ghost-bg': v.ghost.background,
    '--rangedatebox-ghost-text': v.ghost.text,
    '--rangedatebox-ghost-border': v.ghost.border,
    '--rangedatebox-ghost-placeholder': v.ghost.placeholderColor,
    '--rangedatebox-ghost-icon': v.ghost.iconColor,
    '--rangedatebox-ghost-hover-bg': v.ghost.hoverBackground,
    '--rangedatebox-ghost-hover-border': v.ghost.hoverBorder,
    '--rangedatebox-ghost-focus-bg': v.ghost.focusBackground,
    '--rangedatebox-ghost-focus-border': v.ghost.focusBorder,
    '--rangedatebox-ghost-focus-ring': v.ghost.focusRing,
    '--rangedatebox-ghost-disabled-bg': v.ghost.disabledBackground,
    '--rangedatebox-ghost-disabled-text': v.ghost.disabledText,
    '--rangedatebox-ghost-disabled-border': v.ghost.disabledBorder,
    '--rangedatebox-ghost-error-border': v.ghost.errorBorder,
    '--rangedatebox-ghost-error-focus-ring': v.ghost.errorFocusRing,
  } as CSSProperties;
}
