/**
 * Paleta pastel inspirada en tonos Pantone, armonizada con blancos y grises neutros.
 * Usada por defaultThemes.ts de cada componente.
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

/** Periwinkle — Default / Indigo suave */
export const defaultPastel = {
  light: {
    surface: '#E4E9F6',
    surfaceHover: '#D6DDF0',
    surfaceActive: '#C8D1E9',
    border: '#B8C2E3',
    borderStrong: '#9DABCE',
    onFill: '#4A5270',
    focusRing: 'rgba(120, 135, 175, 0.35)',
    subtleBg: 'rgba(120, 135, 175, 0.14)',
    subtleText: '#5C6580',
    sidebar: '#6E7BA3',
    sidebarMuted: '#8B96B8',
    optionHoverBg: '#D6DDF0',
    optionHoverText: '#3D4560',
  } satisfies PastelAccent,
  dark: {
    surface: '#4E5678',
    surfaceHover: '#5A6388',
    surfaceActive: '#454D6C',
    border: '#6B7599',
    borderStrong: '#7D88AD',
    onFill: '#ECEEF7',
    focusRing: 'rgba(140, 152, 190, 0.4)',
    subtleBg: 'rgba(140, 152, 190, 0.2)',
    subtleText: '#B8C0DC',
    sidebar: '#9AA6CC',
    sidebarMuted: '#B4BEE0',
    optionHoverBg: '#5A6388',
    optionHoverText: '#ECEEF7',
  } satisfies PastelAccent,
} as const;

/** Sage — Modern / Emerald suave */
export const modernPastel = {
  light: {
    surface: '#D8EDE4',
    surfaceHover: '#C8E5D8',
    surfaceActive: '#B8DBCC',
    border: '#A8D0BE',
    borderStrong: '#8BBAA5',
    onFill: '#3D5C4F',
    focusRing: 'rgba(100, 150, 125, 0.35)',
    subtleBg: 'rgba(100, 150, 125, 0.14)',
    subtleText: '#4A6B5C',
    sidebar: '#5F8F78',
    sidebarMuted: '#7FA896',
    optionHoverBg: '#C8E5D8',
    optionHoverText: '#2F4A40',
  } satisfies PastelAccent,
  dark: {
    surface: '#3D5C4F',
    surfaceHover: '#476959',
    surfaceActive: '#354F44',
    border: '#5F8F78',
    borderStrong: '#72A08A',
    onFill: '#E4F2EB',
    focusRing: 'rgba(110, 165, 135, 0.4)',
    subtleBg: 'rgba(110, 165, 135, 0.2)',
    subtleText: '#A8D4BE',
    sidebar: '#8FC4A8',
    sidebarMuted: '#A8D4BE',
    optionHoverBg: '#476959',
    optionHoverText: '#E4F2EB',
  } satisfies PastelAccent,
} as const;

/** Powder blue — Enterprise */
export const enterprisePastel = {
  light: {
    surface: '#D6E6F5',
    surfaceHover: '#C5DBF0',
    surfaceActive: '#B4D0EA',
    border: '#A3C4E3',
    borderStrong: '#88AED4',
    onFill: '#3D5568',
    focusRing: 'rgba(100, 140, 180, 0.35)',
    subtleBg: 'rgba(100, 140, 180, 0.14)',
    subtleText: '#4A6278',
    sidebar: '#5F85AD',
    sidebarMuted: '#7A9DBF',
    optionHoverBg: '#C5DBF0',
    optionHoverText: '#2F4558',
  } satisfies PastelAccent,
  dark: {
    surface: '#3D5568',
    surfaceHover: '#476175',
    surfaceActive: '#354A5C',
    border: '#5F85AD',
    borderStrong: '#7296BA',
    onFill: '#E4EEF7',
    focusRing: 'rgba(110, 150, 190, 0.4)',
    subtleBg: 'rgba(110, 150, 190, 0.2)',
    subtleText: '#A8C4DC',
    sidebar: '#8FB4D4',
    sidebarMuted: '#A8C4DC',
    optionHoverBg: '#476175',
    optionHoverText: '#E4EEF7',
  } satisfies PastelAccent,
} as const;

export const dangerPastel = {
  light: {
    background: '#F0D8D8',
    text: '#7A4545',
    border: '#E4C0C0',
    hoverBackground: '#E8CACA',
    hoverBorder: '#D8B0B0',
    activeBackground: '#DEB8B8',
    activeBorder: '#C8A0A0',
    focusRing: 'rgba(180, 100, 100, 0.35)',
  } satisfies PastelDanger,
  dark: {
    background: '#6B4545',
    text: '#F5E8E8',
    border: '#7A5555',
    hoverBackground: '#7A5555',
    hoverBorder: '#8A6565',
    activeBackground: '#5C3838',
    activeBorder: '#6B4545',
    focusRing: 'rgba(200, 130, 130, 0.4)',
  } satisfies PastelDanger,
} as const;

export function accentForPreset(preset: string): PastelAccent {
  if (preset.startsWith('modern')) {
    return preset.includes('dark') ? modernPastel.dark : modernPastel.light;
  }
  if (preset.startsWith('enterprise')) {
    return preset.includes('dark') ? enterprisePastel.dark : enterprisePastel.light;
  }
  if (preset === 'dark') return defaultPastel.dark;
  return defaultPastel.light;
}

export function dangerForPreset(preset: string): PastelDanger {
  return preset.includes('dark') ? dangerPastel.dark : dangerPastel.light;
}
