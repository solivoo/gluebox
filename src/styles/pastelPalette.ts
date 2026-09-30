/**
 * Paleta de tema Material Design (MUI) usada por defaultThemes.ts de cada componente.
 * La librería expone una sola familia: `commerce` (claro/oscuro).
 */

export interface PastelAccent {
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  border: string;
  borderStrong: string;
  onFill: string;
  focusRing: string;
  subtleBg: string;
  subtleText: string;
  sidebar: string;
  sidebarMuted: string;
  optionHoverBg: string;
  optionHoverText: string;
}

export interface PastelDanger {
  background: string;
  text: string;
  border: string;
  hoverBackground: string;
  hoverBorder: string;
  activeBackground: string;
  activeBorder: string;
  focusRing: string;
}

/** Material Design (MUI): azul primario, neutros y error de Material */
export const commercePastel = {
  light: {
    surface: '#1976D2',
    surfaceHover: '#1565C0',
    surfaceActive: '#0D47A1',
    border: '#1976D2',
    borderStrong: '#1565C0',
    onFill: '#FFFFFF',
    focusRing: 'rgba(25, 118, 210, 0.35)',
    subtleBg: 'rgba(25, 118, 210, 0.08)',
    subtleText: '#1565C0',
    sidebar: '#1976D2',
    sidebarMuted: '#42A5F5',
    optionHoverBg: 'rgba(25, 118, 210, 0.08)',
    optionHoverText: '#1565C0',
  } satisfies PastelAccent,
  dark: {
    surface: '#90CAF9',
    surfaceHover: '#A6D4FA',
    surfaceActive: '#79B8F3',
    border: '#90CAF9',
    borderStrong: '#B6E0FC',
    onFill: 'rgba(0, 0, 0, 0.87)',
    focusRing: 'rgba(144, 202, 249, 0.4)',
    subtleBg: 'rgba(144, 202, 249, 0.16)',
    subtleText: '#90CAF9',
    sidebar: '#90CAF9',
    sidebarMuted: '#B6E0FC',
    optionHoverBg: 'rgba(144, 202, 249, 0.16)',
    optionHoverText: '#BBDEFB',
  } satisfies PastelAccent,
} as const;

/** Material Design error */
export const commerceDanger = {
  light: {
    background: '#D32F2F',
    text: '#FFFFFF',
    border: '#D32F2F',
    hoverBackground: '#C62828',
    hoverBorder: '#C62828',
    activeBackground: '#B71C1C',
    activeBorder: '#B71C1C',
    focusRing: 'rgba(211, 47, 47, 0.35)',
  } satisfies PastelDanger,
  dark: {
    background: '#F44336',
    text: '#FFFFFF',
    border: '#F44336',
    hoverBackground: '#F55549',
    hoverBorder: '#F55549',
    activeBackground: '#D32F2F',
    activeBorder: '#D32F2F',
    focusRing: 'rgba(244, 67, 54, 0.4)',
  } satisfies PastelDanger,
} as const;

export function accentForPreset(preset: string): PastelAccent {
  return preset.includes('dark') ? commercePastel.dark : commercePastel.light;
}

export function dangerForPreset(preset: string): PastelDanger {
  return preset.includes('dark') ? commerceDanger.dark : commerceDanger.light;
}
