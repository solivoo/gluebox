import type { TextAreaVariant } from '../type/TextArea.types';

/** Tokens de color por variante del TextArea */
export interface TextAreaVariantTheme {
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

/** Tema completo del TextArea */
export interface TextAreaTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  clearButtonColor: string;
  clearButtonHoverColor: string;
  variants: Record<TextAreaVariant, TextAreaVariantTheme>;
}

export type TextAreaThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type TextAreaThemeInput = TextAreaTheme | TextAreaThemePreset;
