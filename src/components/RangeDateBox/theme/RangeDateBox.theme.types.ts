import type { RangeDateBoxVariant } from '../type/RangeDateBox.types';

/** Tokens de color por variante del RangeDateBox */
export interface RangeDateBoxVariantTheme {
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

/** Tokens del dropdown del calendario */
export interface RangeDateBoxDropdownTheme {
  background: string;
  border: string;
  text: string;
  muted: string;
  disabled: string;
  hoverBg: string;
  accent: string;
  todayBg: string;
}

/** Tema completo del RangeDateBox */
export interface RangeDateBoxTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  helperTextColor: string;
  errorTextColor: string;
  labelColor: string;
  clearButtonColor: string;
  clearButtonHoverColor: string;
  calendarIconColor: string;
  separatorColor: string;
  dropdown: RangeDateBoxDropdownTheme;
  variants: Record<RangeDateBoxVariant, RangeDateBoxVariantTheme>;
}

export type RangeDateBoxThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type RangeDateBoxThemeInput = RangeDateBoxTheme | RangeDateBoxThemePreset;
