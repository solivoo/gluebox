import type { OptionGroupVariant } from '../type/OptionGroup.types';

export interface OptionGroupVariantTheme {
  optionBackground: string;
  optionText: string;
  optionBorder: string;
  selectedBackground: string;
  selectedText: string;
  selectedBorder: string;
  hoverOptionBackground: string;
  hoverOptionBorder: string;
  hoverSelectedBackground: string;
  hoverSelectedBorder: string;
  focusRing: string;
  disabledBackground: string;
  disabledText: string;
  disabledBorder: string;
  indicatorBorder: string;
  indicatorSelected: string;
}

export interface OptionGroupTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  variants: Record<OptionGroupVariant, OptionGroupVariantTheme>;
}

export type OptionGroupThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type OptionGroupThemeInput = OptionGroupTheme | OptionGroupThemePreset;
