/** Color RGB 0–255. */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** HSV: h 0–360, s y v 0–1. */
export interface Hsv {
  h: number;
  s: number;
  v: number;
}

const HEX6 = /^#?([0-9a-f]{6})$/i;
const HEX3 = /^#?([0-9a-f]{3})$/i;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Parsea `#rgb` / `#rrggbb` (con o sin #). */
export function parseHex(input: string): Rgb | null {
  const trimmed = input.trim();
  const six = HEX6.exec(trimmed);
  if (six) {
    const n = Number.parseInt(six[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const three = HEX3.exec(trimmed);
  if (three) {
    const [r, g, b] = three[1].split('').map((ch) => Number.parseInt(ch + ch, 16));
    return { r, g, b };
  }
  return null;
}

/** True solo para `#rrggbb` (6 dígitos). El shorthand `#rgb` espera blur/Enter. */
export function isCompleteHex(input: string): boolean {
  return HEX6.test(input.trim());
}

/** `#rrggbb` en minúsculas. */
export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** Normaliza a `#rrggbb` o `null` si no es hex válido. */
export function normalizeHex(input: string): string | null {
  const rgb = parseHex(input);
  return rgb ? rgbToHex(rgb) : null;
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rr) h = ((gg - bb) / delta) % 6;
    else if (max === gg) h = (bb - rr) / delta + 2;
    else h = (rr - gg) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: max === 0 ? 0 : delta / max, v: max };
}

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const hh = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = v - c;

  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hh < 60) {
    rp = c;
    gp = x;
  } else if (hh < 120) {
    rp = x;
    gp = c;
  } else if (hh < 180) {
    gp = c;
    bp = x;
  } else if (hh < 240) {
    gp = x;
    bp = c;
  } else if (hh < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function hsvToHex(hsv: Hsv): string {
  return rgbToHex(hsvToRgb(hsv));
}

export function hexToHsv(hex: string): Hsv | null {
  const rgb = parseHex(hex);
  return rgb ? rgbToHsv(rgb) : null;
}
