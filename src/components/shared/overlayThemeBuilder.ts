import type { PastelAccent } from '@/styles/pastelPalette';

export interface OverlaySurfaceTheme {
  fontSize: string;
  borderRadius: string;
  shadow: string;
  overlayBg: string;
  panelBg: string;
  panelText: string;
  panelBorder: string;
  headerText: string;
  footerBg: string;
  closeColor: string;
  closeHoverBg: string;
  accentBorder: string;
}

/** Superficies por familia — alineadas a --glb-surface / --glb-app-bg del CSS global */
const familySurfaces = {
  default: {
    light: {
      panelBg: '#ffffff',
      panelText: '#1e1b2e',
      panelBorder: '#d8d4e6',
      headerText: '#1e1b2e',
      footerBg: '#eeecf5',
      closeColor: '#7a7390',
      closeHoverBg: '#f3f0fa',
      overlayBg: 'rgba(30, 27, 46, 0.4)',
    },
    dark: {
      panelBg: '#1a1826',
      panelText: '#e8e6f0',
      panelBorder: 'rgba(140, 130, 200, 0.22)',
      headerText: '#e8e6f0',
      footerBg: '#242230',
      closeColor: '#8a8498',
      closeHoverBg: 'rgba(255, 255, 255, 0.08)',
      overlayBg: 'rgba(0, 0, 0, 0.6)',
    },
  },
  modern: {
    light: {
      panelBg: '#f7fcf9',
      panelText: '#143028',
      panelBorder: '#c5ddd0',
      headerText: '#143028',
      footerBg: '#e2f0e8',
      closeColor: '#4f7260',
      closeHoverBg: '#eaf6ef',
      overlayBg: 'rgba(20, 48, 40, 0.4)',
    },
    dark: {
      panelBg: '#15241c',
      panelText: '#dff0e6',
      panelBorder: 'rgba(80, 180, 130, 0.22)',
      headerText: '#dff0e6',
      footerBg: '#1c2e24',
      closeColor: '#7a9a88',
      closeHoverBg: 'rgba(255, 255, 255, 0.08)',
      overlayBg: 'rgba(0, 0, 0, 0.6)',
    },
  },
  enterprise: {
    light: {
      panelBg: '#f7f9fc',
      panelText: '#142033',
      panelBorder: '#c5d0e0',
      headerText: '#142033',
      footerBg: '#e2eaf4',
      closeColor: '#4f6278',
      closeHoverBg: '#eaf0f8',
      overlayBg: 'rgba(20, 32, 51, 0.4)',
    },
    dark: {
      panelBg: '#151c26',
      panelText: '#dfe6f0',
      panelBorder: 'rgba(80, 140, 220, 0.22)',
      headerText: '#dfe6f0',
      footerBg: '#1c2430',
      closeColor: '#7a8ea4',
      closeHoverBg: 'rgba(255, 255, 255, 0.08)',
      overlayBg: 'rgba(0, 0, 0, 0.6)',
    },
  },
} as const;

export type OverlayFamily = keyof typeof familySurfaces;

export function buildOverlaySurfaceTheme(
  isDark: boolean,
  accent: PastelAccent,
  family: OverlayFamily = 'default',
): OverlaySurfaceTheme {
  const surface = familySurfaces[family][isDark ? 'dark' : 'light'];
  return {
    fontSize: '0.875rem',
    borderRadius: '0.75rem',
    shadow: isDark
      ? '0 24px 48px rgba(0, 0, 0, 0.45)'
      : '0 20px 40px rgba(15, 23, 42, 0.12)',
    overlayBg: surface.overlayBg,
    panelBg: surface.panelBg,
    panelText: surface.panelText,
    panelBorder: surface.panelBorder,
    headerText: surface.headerText,
    footerBg: surface.footerBg,
    closeColor: surface.closeColor,
    closeHoverBg: surface.closeHoverBg,
    accentBorder: accent.borderStrong,
  };
}
