import type { TextBoxVariant } from '../type/TextBox.types';

/** Tokens de color por variante del TextBox */
export interface TextBoxVariantTheme {
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
}

/** Tema completo del TextBox */
export interface TextBoxTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  clearButtonColor: string;
  clearButtonHoverColor: string;
  variants: Record<TextBoxVariant, TextBoxVariantTheme>;
}

export type TextBoxThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type TextBoxThemeInput = TextBoxTheme | TextBoxThemePreset;
