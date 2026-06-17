import type { SelectVariant } from '../type/Select.types';

/** Tokens de color por variante del Select */
export interface SelectVariantTheme {
  background: string;
  text: string;
  border: string;
  placeholderColor: string;
  iconColor: string;
  hoverBackground: string;
  hoverBorder: string;
  focusBackground: string;
  focusBorder: string;
  focusRing: string;
  disabledBackground: string;
  disabledText: string;
  disabledBorder: string;
  errorBorder: string;
  errorFocusRing: string;
  optionBackground: string;
  optionText: string;
  optionHoverBackground: string;
  optionHoverText: string;
  optionSelectedBackground: string;
  optionSelectedText: string;
  optionDisabledText: string;
}

/** Tema completo del Select */
export interface SelectTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  dropdownShadow: string;
  dropdownBorder: string;
  dropdownBg: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  variants: Record<SelectVariant, SelectVariantTheme>;
}

export type SelectThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type SelectThemeInput = SelectTheme | SelectThemePreset;
