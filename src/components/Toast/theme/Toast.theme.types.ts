import type { ToastVariant } from '../type/Toast.types';

export interface ToastVariantTheme {
  background: string;
  text: string;
  titleText: string;
  border: string;
  accent: string;
  closeColor: string;
  closeHoverBg: string;
}

export interface ToastTheme {
  fontSize: string;
  borderRadius: string;
  shadow: string;
  gap: string;
  variants: Record<ToastVariant, ToastVariantTheme>;
}

export type ToastThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type ToastThemeInput = ToastTheme | ToastThemePreset;
