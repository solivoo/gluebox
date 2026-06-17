import type { CSSProperties } from 'react';
import type { OptionGroupTheme, OptionGroupThemeInput } from './OptionGroup.theme.types';
import { optionGroupThemes } from './defaultThemes';

export function resolveTheme(theme?: OptionGroupThemeInput): OptionGroupTheme {
  if (!theme) return optionGroupThemes.light;
  if (typeof theme === 'string') return optionGroupThemes[theme];
  return theme;
}

function variantVars(prefix: string, v: OptionGroupTheme['variants']['primary']): Record<string, string> {
  return {
    [`--optiongroup-${prefix}-option-bg`]: v.optionBackground,
    [`--optiongroup-${prefix}-option-text`]: v.optionText,
    [`--optiongroup-${prefix}-option-border`]: v.optionBorder,
    [`--optiongroup-${prefix}-selected-bg`]: v.selectedBackground,
    [`--optiongroup-${prefix}-selected-text`]: v.selectedText,
    [`--optiongroup-${prefix}-selected-border`]: v.selectedBorder,
    [`--optiongroup-${prefix}-hover-option-bg`]: v.hoverOptionBackground,
    [`--optiongroup-${prefix}-hover-option-border`]: v.hoverOptionBorder,
    [`--optiongroup-${prefix}-hover-selected-bg`]: v.hoverSelectedBackground,
    [`--optiongroup-${prefix}-hover-selected-border`]: v.hoverSelectedBorder,
    [`--optiongroup-${prefix}-focus-ring`]: v.focusRing,
    [`--optiongroup-${prefix}-disabled-bg`]: v.disabledBackground,
    [`--optiongroup-${prefix}-disabled-text`]: v.disabledText,
    [`--optiongroup-${prefix}-disabled-border`]: v.disabledBorder,
    [`--optiongroup-${prefix}-indicator-border`]: v.indicatorBorder,
    [`--optiongroup-${prefix}-indicator-selected`]: v.indicatorSelected,
  };
}

export function themeToStyle(theme: OptionGroupTheme): CSSProperties {
  const v = theme.variants;
  return {
    '--optiongroup-font-size': theme.fontSize,
    '--optiongroup-radius': theme.borderRadius,
    '--optiongroup-transition': theme.transition,
    '--optiongroup-shadow': theme.shadow,
    '--optiongroup-helper-color': theme.helperTextColor,
    '--optiongroup-error-color': theme.errorTextColor,
    '--optiongroup-label-color': theme.labelColor,
    ...variantVars('primary', v.primary),
    ...variantVars('outline', v.outline),
    ...variantVars('ghost', v.ghost),
  } as CSSProperties;
}
