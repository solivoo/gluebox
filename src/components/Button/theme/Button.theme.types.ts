import type { ButtonVariant } from '../type/Button.types';

/** Tokens de color por variante del Button */
export interface ButtonVariantTheme {
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
  /** Color del spinner en estado loading */
  spinnerColor: string;
}

/** Tema completo del Button con todas las variantes + tokens base */
export interface ButtonTheme {
  /** Tamaño de fuente base */
  fontSize: string;
  /** Radio de borde */
  borderRadius: string;
  /** Transición base para todos los estados */
  transition: string;
  /** Sombras */
  shadow: string;
  hoverShadow: string;
  variants: Record<ButtonVariant, ButtonVariantTheme>;
}

export type ButtonThemePreset = 'dark' | 'light' | 'modern-dark' | 'modern-light' | 'enterprise-dark' | 'enterprise-light';

export type ButtonThemeInput = ButtonTheme | ButtonThemePreset;
