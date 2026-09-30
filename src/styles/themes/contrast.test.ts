import { describe, expect, it } from 'vitest';
import { commercePastel, commerceDanger } from '../pastelPalette';

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/** Parsea hex (#RGB, #RRGGBB) o rgb/rgba */
export function parseColor(color: string): RGB {
  const trimmed = color.trim();
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0]! + hex[0]!, 16);
      const g = parseInt(hex[1]! + hex[1]!, 16);
      const b = parseInt(hex[2]! + hex[2]!, 16);
      return { r, g, b, a: 1 };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b, a: 1 };
    }
  }

  const rgbaMatch = trimmed.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1] ?? '0');
    const g = parseFloat(rgbaMatch[2] ?? '0');
    const b = parseFloat(rgbaMatch[3] ?? '0');
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return { r, g, b, a };
  }

  throw new Error(`Formato de color no soportado: ${color}`);
}

/** Mezcla de un color semitransparente sobre un fondo opaco */
export function compositeOnBackground(fg: RGB, bg: RGB): RGB {
  const alpha = fg.a ?? 1;
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
    a: 1,
  };
}

/** Calcula luminancia relativa según fórmula WCAG 2.1 */
export function relativeLuminance(rgb: RGB): number {
  const toLinear = (val: number): number => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Calcula ratio de contraste entre dos colores (ej. 4.5:1 -> 4.5) */
export function getContrastRatio(foreground: string, background: string, baseSurface: string = '#ffffff'): number {
  const fg = parseColor(foreground);
  let bg = parseColor(background);
  if (bg.a !== undefined && bg.a < 1) {
    const base = parseColor(baseSurface);
    bg = compositeOnBackground(bg, base);
  }
  const compositedFg = compositeOnBackground(fg, bg);

  const l1 = relativeLuminance(compositedFg);
  const l2 = relativeLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG AA Contrast Ratios for Commerce Theme', () => {
  describe('Light Mode', () => {
    const surface = '#ffffff';
    const appBg = '#fafafa';

    it('Texto estándar (--glb-text) cumple WCAG AA (>= 4.5:1) en superficies y fondo', () => {
      const text = 'rgba(0, 0, 0, 0.87)';
      const ratioSurface = getContrastRatio(text, surface);
      const ratioBg = getContrastRatio(text, appBg);

      expect(ratioSurface).toBeGreaterThanOrEqual(4.5);
      expect(ratioBg).toBeGreaterThanOrEqual(4.5);
    });

    it('Texto secundario (--glb-muted) cumple WCAG AA (>= 4.5:1) en superficies', () => {
      const muted = 'rgba(0, 0, 0, 0.6)';
      const ratio = getContrastRatio(muted, surface);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón primario cumple WCAG AA (>= 4.5:1)', () => {
      const bg = commercePastel.light.surface; // #1976D2
      const text = commercePastel.light.onFill; // #FFFFFF
      const ratio = getContrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón de peligro (danger) cumple WCAG AA (>= 4.5:1)', () => {
      const bg = commerceDanger.light.background; // #D32F2F
      const text = commerceDanger.light.text; // #FFFFFF
      const ratio = getContrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Sidebar texto cumple WCAG AA (>= 4.5:1)', () => {
      const sidebarBg = '#ffffff';
      const sidebarText = 'rgba(0, 0, 0, 0.87)';
      const ratio = getContrastRatio(sidebarText, sidebarBg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Sidebar ítem activo cumple contraste de componente interactivo (>= 3.0:1)', () => {
      const activeText = '#1976d2';
      const activeBg = 'rgba(25, 118, 210, 0.08)'; // composited on #ffffff
      const ratio = getContrastRatio(activeText, activeBg, '#ffffff');
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe('Dark Mode', () => {
    const surface = '#1e1e1e';
    const appBg = '#121212';

    it('Texto estándar (--glb-text) cumple WCAG AA (>= 4.5:1) en superficies y fondo', () => {
      const text = '#ffffff';
      const ratioSurface = getContrastRatio(text, surface);
      const ratioBg = getContrastRatio(text, appBg);

      expect(ratioSurface).toBeGreaterThanOrEqual(4.5);
      expect(ratioBg).toBeGreaterThanOrEqual(4.5);
    });

    it('Texto secundario (--glb-muted) cumple WCAG AA (>= 4.5:1) en superficies', () => {
      const muted = 'rgba(255, 255, 255, 0.7)';
      const ratio = getContrastRatio(muted, surface);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón primario (Material dark pastel) cumple WCAG AA (>= 4.5:1)', () => {
      const bg = commercePastel.dark.surface; // #90CAF9
      const text = commercePastel.dark.onFill; // rgba(0, 0, 0, 0.87)
      const ratio = getContrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón de peligro (danger) cumple contraste para componentes interactivos (>= 3.0:1)', () => {
      const bg = commerceDanger.dark.background; // #F44336
      const text = commerceDanger.dark.text; // #FFFFFF
      const ratio = getContrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });

    it('Sidebar texto cumple WCAG AA (>= 4.5:1)', () => {
      const sidebarBg = '#121212';
      const sidebarText = '#ffffff';
      const ratio = getContrastRatio(sidebarText, sidebarBg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Sidebar ítem activo cumple WCAG AA (>= 4.5:1)', () => {
      const activeText = '#90caf9';
      const activeBg = 'rgba(144, 202, 249, 0.12)';
      const ratio = getContrastRatio(activeText, activeBg, '#121212');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
