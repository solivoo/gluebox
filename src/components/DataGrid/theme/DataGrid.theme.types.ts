/** Tokens del tema DataGrid */
export interface DataGridTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  headerBackground: string;
  headerText: string;
  headerBorder: string;
  rowBackground: string;
  rowAltBackground: string;
  rowText: string;
  rowHoverBackground: string;
  rowSelectedBackground: string;
  rowSelectedText: string;
  borderColor: string;
  searchBackground: string;
  searchText: string;
  searchBorder: string;
  searchPlaceholder: string;
  searchFocusBorder: string;
  searchFocusRing: string;
  sortIconColor: string;
  sortIconActiveColor: string;
  emptyTextColor: string;
  loadingOverlay: string;
  checkboxBorder: string;
  checkboxCheckedBackground: string;
  checkboxCheckedText: string;
}

export type DataGridThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type DataGridThemeInput = DataGridTheme | DataGridThemePreset;
