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

/** Superficies Material — alineadas a --glb-surface / --glb-app-bg del CSS global */
const surfaces = {
  light: {
    panelBg: '#ffffff',
    panelText: 'rgba(0, 0, 0, 0.87)',
    panelBorder: 'rgba(0, 0, 0, 0.12)',
    headerText: 'rgba(0, 0, 0, 0.87)',
    footerBg: '#f5f5f5',
    closeColor: 'rgba(0, 0, 0, 0.6)',
    closeHoverBg: '#f5f5f5',
    overlayBg: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    panelBg: '#1e1e1e',
    panelText: '#ffffff',
    panelBorder: 'rgba(144, 202, 249, 0.22)',
    headerText: '#ffffff',
    footerBg: '#272727',
    closeColor: 'rgba(255, 255, 255, 0.7)',
    closeHoverBg: 'rgba(255, 255, 255, 0.08)',
    overlayBg: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

export function buildOverlaySurfaceTheme(
  isDark: boolean,
  accent: PastelAccent,
): OverlaySurfaceTheme {
  const surface = isDark ? surfaces.dark : surfaces.light;
  return {
    fontSize: '0.875rem',
    borderRadius: '4px',
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
