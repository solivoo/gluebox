import type { Hsv } from './colorMath';

/** Eje del panel: cuadro saturación/brillo o slider de matiz. */
export type ColorPickerAxis = 'sv' | 'hue';

const SV_STEP = 0.01;
const SV_STEP_LARGE = 0.1;
const HUE_STEP = 1;
const HUE_STEP_LARGE = 10;

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function svFromKey(key: string, step: number, hsv: Hsv): Hsv | null {
  switch (key) {
    case 'ArrowLeft':
      return { ...hsv, s: clamp01(hsv.s - step) };
    case 'ArrowRight':
      return { ...hsv, s: clamp01(hsv.s + step) };
    case 'ArrowUp':
      return { ...hsv, v: clamp01(hsv.v + step) };
    case 'ArrowDown':
      return { ...hsv, v: clamp01(hsv.v - step) };
    case 'Home':
      return { ...hsv, s: 0 };
    case 'End':
      return { ...hsv, s: 1 };
    default:
      return null;
  }
}

function hueFromKey(key: string, step: number, hsv: Hsv): Hsv | null {
  const clampHue = (n: number) => Math.min(360, Math.max(0, n));
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return { ...hsv, h: clampHue(hsv.h - step) };
    case 'ArrowRight':
    case 'ArrowUp':
      return { ...hsv, h: clampHue(hsv.h + step) };
    case 'Home':
      return { ...hsv, h: 0 };
    case 'End':
      return { ...hsv, h: 360 };
    default:
      return null;
  }
}

/**
 * Traduce una tecla a un HSV nuevo, o `null` si la tecla no aplica al eje.
 * Con Shift el paso es 10× para recorrer el rango rápido.
 */
export function hsvFromKey(
  key: string,
  shiftKey: boolean,
  hsv: Hsv,
  axis: ColorPickerAxis,
): Hsv | null {
  if (axis === 'sv') {
    return svFromKey(key, shiftKey ? SV_STEP_LARGE : SV_STEP, hsv);
  }
  return hueFromKey(key, shiftKey ? HUE_STEP_LARGE : HUE_STEP, hsv);
}
