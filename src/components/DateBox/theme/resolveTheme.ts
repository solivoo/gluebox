import type { CSSProperties } from 'react';
import type { DateBoxTheme, DateBoxThemeInput } from './DateBox.theme.types';
import { dateBoxThemes } from './defaultThemes';

export function resolveTheme(theme?: DateBoxThemeInput): DateBoxTheme {
  if (!theme) return dateBoxThemes.light;
  if (typeof theme === 'string') return dateBoxThemes[theme];
  return theme;
}

/** Convierte el tema en CSS variables para el root del DateBox */
export function themeToStyle(theme: DateBoxTheme): CSSProperties {
  const v = theme.variants;
  return {
    '--datebox-font-size': theme.fontSize,
    '--datebox-radius': theme.borderRadius,
    '--datebox-transition': theme.transition,
    '--datebox-shadow': theme.shadow,
    '--datebox-helper-color': theme.helperTextColor,
    '--datebox-error-color': theme.errorTextColor,
    '--datebox-label-color': theme.labelColor,
    '--datebox-clear-color': theme.clearButtonColor,
    '--datebox-clear-hover-color': theme.clearButtonHoverColor,
    '--datebox-calendar-icon-color': theme.calendarIconColor,
    /* Dropdown */
    '--datebox-dropdown-bg': theme.dropdown.background,
    '--datebox-dropdown-border': theme.dropdown.border,
    '--datebox-dropdown-text': theme.dropdown.text,
    '--datebox-dropdown-muted': theme.dropdown.muted,
    '--datebox-dropdown-disabled': theme.dropdown.disabled,
    '--datebox-dropdown-hover-bg': theme.dropdown.hoverBg,
    '--datebox-dropdown-accent': theme.dropdown.accent,
    '--datebox-dropdown-today-bg': theme.dropdown.todayBg,
    /* Primary */
    '--datebox-primary-bg': v.primary.background,
    '--datebox-primary-text': v.primary.text,
    '--datebox-primary-border': v.primary.border,
    '--datebox-primary-placeholder': v.primary.placeholderColor,
    '--datebox-primary-icon': v.primary.iconColor,
    '--datebox-primary-hover-bg': v.primary.hoverBackground,
    '--datebox-primary-hover-border': v.primary.hoverBorder,
    '--datebox-primary-focus-bg': v.primary.focusBackground,
    '--datebox-primary-focus-border': v.primary.focusBorder,
    '--datebox-primary-focus-ring': v.primary.focusRing,
    '--datebox-primary-disabled-bg': v.primary.disabledBackground,
    '--datebox-primary-disabled-text': v.primary.disabledText,
    '--datebox-primary-disabled-border': v.primary.disabledBorder,
    '--datebox-primary-error-border': v.primary.errorBorder,
    '--datebox-primary-error-focus-ring': v.primary.errorFocusRing,
    /* Secondary */
    '--datebox-secondary-bg': v.secondary.background,
    '--datebox-secondary-text': v.secondary.text,
    '--datebox-secondary-border': v.secondary.border,
    '--datebox-secondary-placeholder': v.secondary.placeholderColor,
    '--datebox-secondary-icon': v.secondary.iconColor,
    '--datebox-secondary-hover-bg': v.secondary.hoverBackground,
    '--datebox-secondary-hover-border': v.secondary.hoverBorder,
    '--datebox-secondary-focus-bg': v.secondary.focusBackground,
    '--datebox-secondary-focus-border': v.secondary.focusBorder,
    '--datebox-secondary-focus-ring': v.secondary.focusRing,
    '--datebox-secondary-disabled-bg': v.secondary.disabledBackground,
    '--datebox-secondary-disabled-text': v.secondary.disabledText,
    '--datebox-secondary-disabled-border': v.secondary.disabledBorder,
    '--datebox-secondary-error-border': v.secondary.errorBorder,
    '--datebox-secondary-error-focus-ring': v.secondary.errorFocusRing,
    /* Outline */
    '--datebox-outline-bg': v.outline.background,
    '--datebox-outline-text': v.outline.text,
    '--datebox-outline-border': v.outline.border,
    '--datebox-outline-placeholder': v.outline.placeholderColor,
    '--datebox-outline-icon': v.outline.iconColor,
    '--datebox-outline-hover-bg': v.outline.hoverBackground,
    '--datebox-outline-hover-border': v.outline.hoverBorder,
    '--datebox-outline-focus-bg': v.outline.focusBackground,
    '--datebox-outline-focus-border': v.outline.focusBorder,
    '--datebox-outline-focus-ring': v.outline.focusRing,
    '--datebox-outline-disabled-bg': v.outline.disabledBackground,
    '--datebox-outline-disabled-text': v.outline.disabledText,
    '--datebox-outline-disabled-border': v.outline.disabledBorder,
    '--datebox-outline-error-border': v.outline.errorBorder,
    '--datebox-outline-error-focus-ring': v.outline.errorFocusRing,
    /* Ghost */
    '--datebox-ghost-bg': v.ghost.background,
    '--datebox-ghost-text': v.ghost.text,
    '--datebox-ghost-border': v.ghost.border,
    '--datebox-ghost-placeholder': v.ghost.placeholderColor,
    '--datebox-ghost-icon': v.ghost.iconColor,
    '--datebox-ghost-hover-bg': v.ghost.hoverBackground,
    '--datebox-ghost-hover-border': v.ghost.hoverBorder,
    '--datebox-ghost-focus-bg': v.ghost.focusBackground,
    '--datebox-ghost-focus-border': v.ghost.focusBorder,
    '--datebox-ghost-focus-ring': v.ghost.focusRing,
    '--datebox-ghost-disabled-bg': v.ghost.disabledBackground,
    '--datebox-ghost-disabled-text': v.ghost.disabledText,
    '--datebox-ghost-disabled-border': v.ghost.disabledBorder,
    '--datebox-ghost-error-border': v.ghost.errorBorder,
    '--datebox-ghost-error-focus-ring': v.ghost.errorFocusRing,
  } as CSSProperties;
}
