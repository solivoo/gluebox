import type { DateBoxVariant } from '../type/DateBox.types';

/** Tokens de color por variante del DateBox */
export interface DateBoxVariantTheme {
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
export interface DateBoxDropdownTheme {
  background: string;
  border: string;
  text: string;
  muted: string;
  disabled: string;
  hoverBg: string;
  accent: string;
  todayBg: string;
}

/** Tema completo del DateBox */
export interface DateBoxTheme {
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
  dropdown: DateBoxDropdownTheme;
  variants: Record<DateBoxVariant, DateBoxVariantTheme>;
}

export type DateBoxThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type DateBoxThemeInput = DateBoxTheme | DateBoxThemePreset;
