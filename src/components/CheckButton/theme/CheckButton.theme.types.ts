import type { CheckButtonVariant } from '../type/CheckButton.types';

export interface CheckButtonStateTheme {
  background: string;
  text: string;
  border: string;
  hoverBackground: string;
  hoverBorder: string;
  activeBackground: string;
  activeBorder: string;
  focusRing: string;
  disabledBackground: string;
  disabledText: string;
  disabledBorder: string;
  iconColor: string;
}

export interface CheckButtonVariantTheme {
  unchecked: CheckButtonStateTheme;
  checked: CheckButtonStateTheme;
}

export interface CheckButtonTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  variants: Record<CheckButtonVariant, CheckButtonVariantTheme>;
}

export type CheckButtonThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type CheckButtonThemeInput = CheckButtonTheme | CheckButtonThemePreset;
