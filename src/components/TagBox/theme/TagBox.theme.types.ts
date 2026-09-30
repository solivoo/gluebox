import type { TagBoxVariant } from '../type/TagBox.types';

/** Tokens de color por variante del TagBox */
export interface TagBoxVariantTheme {
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

/** Tokens de las chips de tags */
export interface TagBoxTagTheme {
  background: string;
  text: string;
  border: string;
  borderRadius: string;
  removeColor: string;
  removeHoverColor: string;
  removeHoverBackground: string;
}

/** Tema completo del TagBox */
export interface TagBoxTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  clearButtonColor: string;
  clearButtonHoverColor: string;
  tags: TagBoxTagTheme;
  variants: Record<TagBoxVariant, TagBoxVariantTheme>;
}

export type TagBoxThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type TagBoxThemeInput = TagBoxTheme | TagBoxThemePreset;
