export interface PageActionsMenuVariantTheme {
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
}

export interface PageActionsMenuTheme {
  fontSize: string;
  borderRadius: string;
  transition: string;
  shadow: string;
  hoverShadow: string;
  panelBg: string;
  panelText: string;
  panelBorder: string;
  panelShadow: string;
  itemHoverBg: string;
  itemDisabledText: string;
  divider: string;
  variants: Record<'ghost' | 'outline' | 'primary', PageActionsMenuVariantTheme>;
}

export type PageActionsMenuThemePreset =
  | 'dark'
  | 'light'
  | 'modern-dark'
  | 'modern-light'
  | 'enterprise-dark'
  | 'enterprise-light';

export type PageActionsMenuThemeInput =
  | PageActionsMenuTheme
  | PageActionsMenuThemePreset;
