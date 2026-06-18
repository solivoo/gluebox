import type { CSSProperties } from 'react';
import type { DataGridTheme, DataGridThemeInput } from './DataGrid.theme.types';
import { dataGridThemes } from './defaultThemes';

export function resolveTheme(theme?: DataGridThemeInput): DataGridTheme {
  if (!theme) return dataGridThemes.light;
  if (typeof theme === 'string') return dataGridThemes[theme];
  return theme;
}

export function themeToStyle(theme: DataGridTheme): CSSProperties {
  return {
    '--datagrid-font-size': theme.fontSize,
    '--datagrid-radius': theme.borderRadius,
    '--datagrid-transition': theme.transition,
    '--datagrid-shadow': theme.shadow,
    '--datagrid-header-bg': theme.headerBackground,
    '--datagrid-header-text': theme.headerText,
    '--datagrid-header-border': theme.headerBorder,
    '--datagrid-row-bg': theme.rowBackground,
    '--datagrid-row-alt-bg': theme.rowAltBackground,
    '--datagrid-row-text': theme.rowText,
    '--datagrid-row-hover-bg': theme.rowHoverBackground,
    '--datagrid-row-selected-bg': theme.rowSelectedBackground,
    '--datagrid-row-selected-text': theme.rowSelectedText,
    '--datagrid-border': theme.borderColor,
    '--datagrid-search-bg': theme.searchBackground,
    '--datagrid-search-text': theme.searchText,
    '--datagrid-search-border': theme.searchBorder,
    '--datagrid-search-placeholder': theme.searchPlaceholder,
    '--datagrid-search-focus-border': theme.searchFocusBorder,
    '--datagrid-search-focus-ring': theme.searchFocusRing,
    '--datagrid-sort-icon': theme.sortIconColor,
    '--datagrid-sort-icon-active': theme.sortIconActiveColor,
    '--datagrid-empty-text': theme.emptyTextColor,
    '--datagrid-loading-overlay': theme.loadingOverlay,
    '--datagrid-checkbox-border': theme.checkboxBorder,
    '--datagrid-checkbox-checked-bg': theme.checkboxCheckedBackground,
    '--datagrid-checkbox-checked-text': theme.checkboxCheckedText,
  } as CSSProperties;
}
