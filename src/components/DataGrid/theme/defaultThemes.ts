import { accentForPreset } from '@/styles/pastelPalette';
import type { DataGridTheme, DataGridThemePreset } from './DataGrid.theme.types';

function buildDataGridTheme(preset: DataGridThemePreset): DataGridTheme {
  const isDark = preset.includes('dark');
  const accent = accentForPreset(preset);

  const rowBg = isDark ? '#1a1d27' : '#ffffff';
  const rowAlt = isDark ? '#1f2430' : '#f9fafb';
  const headerBg = isDark ? '#252a36' : '#f3f4f6';
  const text = isDark ? '#e5e7eb' : '#1f2937';
  const muted = isDark ? '#9ca3af' : '#6b7280';
  const border = isDark ? '#374151' : '#e5e7eb';
  const searchBg = isDark ? '#1f2937' : '#ffffff';

  return {
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    transition: 'all 0.15s ease',
    shadow: isDark ? '0 1px 2px rgba(0,0,0,0.35)' : '0 1px 2px rgba(0,0,0,0.06)',
    headerBackground: headerBg,
    headerText: text,
    headerBorder: border,
    rowBackground: rowBg,
    rowAltBackground: rowAlt,
    rowText: text,
    rowHoverBackground: accent.subtleBg,
    rowSelectedBackground: accent.subtleBg,
    rowSelectedText: accent.subtleText,
    borderColor: border,
    searchBackground: searchBg,
    searchText: text,
    searchBorder: isDark ? '#4b5563' : '#d1d5db',
    searchPlaceholder: muted,
    searchFocusBorder: accent.borderStrong,
    searchFocusRing: accent.focusRing,
    sortIconColor: muted,
    sortIconActiveColor: accent.subtleText,
    emptyTextColor: muted,
    loadingOverlay: isDark ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.72)',
    checkboxBorder: isDark ? '#6b7280' : '#9ca3af',
    checkboxCheckedBackground: accent.surface,
    checkboxCheckedText: accent.onFill,
  };
}

const presets: DataGridThemePreset[] = [
  'dark',
  'light',
  'modern-dark',
  'modern-light',
  'enterprise-dark',
  'enterprise-light',
];

export const dataGridThemes = presets.reduce(
  (acc, preset) => {
    acc[preset] = buildDataGridTheme(preset);
    return acc;
  },
  {} as Record<DataGridThemePreset, DataGridTheme>,
);
