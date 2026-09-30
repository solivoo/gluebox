import type { OverlaySurfaceTheme } from '@/components/shared/overlayThemeBuilder';

export type PopupTheme = OverlaySurfaceTheme;

export type PopupThemePreset =
  'commerce-dark' | 'commerce-light';

export type PopupThemeInput = PopupTheme | PopupThemePreset;
