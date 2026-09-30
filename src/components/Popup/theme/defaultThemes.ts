import type { PopupTheme, PopupThemePreset } from './Popup.theme.types';
import { buildOverlaySurfaceTheme } from '@/components/shared/overlayThemeBuilder';
import { commercePastel } from '@/styles/pastelPalette';

function preset(isDark: boolean): PopupTheme {
  const accent = isDark ? commercePastel.dark : commercePastel.light;
  return buildOverlaySurfaceTheme(isDark, accent);
}

export const popupThemes: Record<PopupThemePreset, PopupTheme> = {
  'commerce-light': preset(false),
  'commerce-dark': preset(true),
};
