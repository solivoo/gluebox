import type { OverlaySurfaceTheme } from '@/components/shared/overlayThemeBuilder';

export type PopupTheme = OverlaySurfaceTheme;

export type PopupThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type PopupThemeInput = PopupTheme | PopupThemePreset;
