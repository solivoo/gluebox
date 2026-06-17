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

export function buildOverlaySurfaceTheme(
  isDark: boolean,
  accent: PastelAccent,
): OverlaySurfaceTheme {
  return {
    fontSize: '0.875rem',
    borderRadius: '0.75rem',
    shadow: isDark
      ? '0 24px 48px rgba(0, 0, 0, 0.45)'
      : '0 20px 40px rgba(15, 23, 42, 0.12)',
    overlayBg: isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(15, 23, 42, 0.35)',
    panelBg: isDark ? '#1a1d27' : '#ffffff',
    panelText: isDark ? '#e2e8f0' : '#1e293b',
    panelBorder: isDark ? '#2d3139' : '#e4e7ee',
    headerText: isDark ? '#f1f5f9' : '#0f172a',
    footerBg: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
    closeColor: isDark ? '#94a3b8' : '#64748b',
    closeHoverBg: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)',
    accentBorder: accent.borderStrong,
  };
}
