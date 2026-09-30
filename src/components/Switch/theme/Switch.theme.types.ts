/** Tokens del track (riel) del Switch */
export interface SwitchTrackTheme {
  background: string;
  hoverBackground: string;
  checkedBackground: string;
  checkedHoverBackground: string;
}

/** Tokens del thumb (perilla) del Switch */
export interface SwitchThumbTheme {
  background: string;
  hoverBackground: string;
  checkedBackground: string;
  checkedHoverBackground: string;
}

/** Tema completo del Switch */
export interface SwitchTheme {
  fontSize: string;
  transition: string;
  focusRing: string;
  labelColor: string;
  helperTextColor: string;
  errorTextColor: string;
  /** Color del spinner de `loading` */
  loaderColor: string;
  track: SwitchTrackTheme;
  thumb: SwitchThumbTheme;
}

export type SwitchThemePreset =
  'commerce-dark' | 'commerce-light';

export type SwitchThemeInput = SwitchTheme | SwitchThemePreset;
