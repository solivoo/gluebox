import type { CSSProperties } from 'react';
import type {
  PageActionsMenuTheme,
  PageActionsMenuThemeInput,
} from './PageActionsMenu.theme.types';
import { pageActionsMenuThemes } from './defaultThemes';

export function resolveTheme(
  theme?: PageActionsMenuThemeInput,
): PageActionsMenuTheme | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return pageActionsMenuThemes[theme];
  return theme;
}

/** Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: PageActionsMenuTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
  const v = theme.variants;
  return {
    '--pam-font-size': theme.fontSize,
    '--pam-radius': theme.borderRadius,
    '--pam-transition': theme.transition,
    '--pam-panel-bg': theme.panelBg,
    '--pam-panel-text': theme.panelText,
    '--pam-panel-border': theme.panelBorder,
    '--pam-panel-shadow': theme.panelShadow,
    '--pam-item-hover-bg': theme.itemHoverBg,
    '--pam-item-disabled-text': theme.itemDisabledText,
    '--pam-divider': theme.divider,
    '--pam-ghost-bg': v.ghost.background,
    '--pam-ghost-text': v.ghost.text,
    '--pam-ghost-border': v.ghost.border,
    '--pam-ghost-hover-bg': v.ghost.hoverBackground,
    '--pam-ghost-hover-border': v.ghost.hoverBorder,
    '--pam-ghost-active-bg': v.ghost.activeBackground,
    '--pam-ghost-active-border': v.ghost.activeBorder,
    '--pam-ghost-focus-ring': v.ghost.focusRing,
    '--pam-ghost-disabled-bg': v.ghost.disabledBackground,
    '--pam-ghost-disabled-text': v.ghost.disabledText,
    '--pam-ghost-disabled-border': v.ghost.disabledBorder,
    '--pam-outline-bg': v.outline.background,
    '--pam-outline-text': v.outline.text,
    '--pam-outline-border': v.outline.border,
    '--pam-outline-hover-bg': v.outline.hoverBackground,
    '--pam-outline-hover-border': v.outline.hoverBorder,
    '--pam-outline-active-bg': v.outline.activeBackground,
    '--pam-outline-active-border': v.outline.activeBorder,
    '--pam-outline-focus-ring': v.outline.focusRing,
    '--pam-outline-disabled-bg': v.outline.disabledBackground,
    '--pam-outline-disabled-text': v.outline.disabledText,
    '--pam-outline-disabled-border': v.outline.disabledBorder,
    '--pam-primary-bg': v.primary.background,
    '--pam-primary-text': v.primary.text,
    '--pam-primary-border': v.primary.border,
    '--pam-primary-hover-bg': v.primary.hoverBackground,
    '--pam-primary-hover-border': v.primary.hoverBorder,
    '--pam-primary-active-bg': v.primary.activeBackground,
    '--pam-primary-active-border': v.primary.activeBorder,
    '--pam-primary-focus-ring': v.primary.focusRing,
    '--pam-primary-disabled-bg': v.primary.disabledBackground,
    '--pam-primary-disabled-text': v.primary.disabledText,
    '--pam-primary-disabled-border': v.primary.disabledBorder,
  } as CSSProperties;
}
