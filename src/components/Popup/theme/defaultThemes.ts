import type { PopupTheme, PopupThemePreset } from './Popup.theme.types';
import { buildOverlaySurfaceTheme } from '@/components/shared/overlayThemeBuilder';
import {
  defaultPastel,
  enterprisePastel,
  modernPastel,
} from '@/styles/pastelPalette';

function preset(isDark: boolean, family: 'default' | 'modern' | 'enterprise'): PopupTheme {
  const accent =
    family === 'modern'
      ? isDark
        ? modernPastel.dark
        : modernPastel.light
      : family === 'enterprise'
        ? isDark
          ? enterprisePastel.dark
          : enterprisePastel.light
        : isDark
          ? defaultPastel.dark
          : defaultPastel.light;
  return buildOverlaySurfaceTheme(isDark, accent);
}

export const popupThemes: Record<PopupThemePreset, PopupTheme> = {
  light: preset(false, 'default'),
  dark: preset(true, 'default'),
  'modern-light': preset(false, 'modern'),
  'modern-dark': preset(true, 'modern'),
  'enterprise-light': preset(false, 'enterprise'),
  'enterprise-dark': preset(true, 'enterprise'),
};
