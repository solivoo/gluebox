import type { SwitchTheme, SwitchThemePreset } from './Switch.theme.types';
import { accentForPreset } from '@/styles/pastelPalette';

function buildSwitchTheme(preset: SwitchThemePreset): SwitchTheme {
  const isDark = preset.includes('dark');
  const accent = accentForPreset(preset);

  return {
    fontSize: '0.875rem',
    transition:
      'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    focusRing: accent.focusRing,
    labelColor: isDark ? '#e5e7eb' : '#1f2937',
    helperTextColor: isDark ? '#9ca3af' : '#6b7280',
    errorTextColor: isDark ? '#fca5a5' : '#b85555',
    loaderColor: isDark ? '#212121' : '#616161',
    track: {
      background: isDark ? '#4d4d4d' : '#9e9e9e',
      hoverBackground: isDark ? '#5c5c5c' : '#8a8a8a',
      checkedBackground: accent.surface,
      checkedHoverBackground: accent.surfaceHover,
    },
    thumb: {
      background: isDark ? '#bdbdbd' : '#fafafa',
      hoverBackground: isDark ? '#c7c7c7' : '#f0f0f0',
      checkedBackground: accent.onFill,
      checkedHoverBackground: accent.onFill,
    },
  };
}

const presets: SwitchThemePreset[] = ['commerce-dark', 'commerce-light'];

export const switchThemes = presets.reduce(
  (acc, preset) => {
    acc[preset] = buildSwitchTheme(preset);
    return acc;
  },
  {} as Record<SwitchThemePreset, SwitchTheme>,
);
