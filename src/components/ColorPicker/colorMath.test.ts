import { describe, expect, it } from 'vitest';
import {
  hsvToHex,
  hexToHsv,
  isCompleteHex,
  normalizeHex,
  parseHex,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
} from './colorMath';

describe('colorMath', () => {
  it('parsea #rgb y #rrggbb', () => {
    expect(parseHex('#0af')).toEqual({ r: 0, g: 170, b: 255 });
    expect(parseHex('3b82f6')).toEqual({ r: 59, g: 130, b: 246 });
    expect(parseHex('nope')).toBeNull();
  });

  it('no trata #rgb como hex completo (evita commit al tipear #rrggbb)', () => {
    expect(isCompleteHex('#3b8')).toBe(false);
    expect(isCompleteHex('#3b82f6')).toBe(true);
    expect(isCompleteHex('3b82f6')).toBe(true);
    expect(isCompleteHex('#ABC')).toBe(false);
  });

  it('normaliza a #rrggbb minúsculas', () => {
    expect(normalizeHex('#ABC')).toBe('#aabbcc');
    expect(normalizeHex('EF4444')).toBe('#ef4444');
  });

  it('redondea RGB → hex', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 128 })).toBe('#ff0080');
  });

  it('hsv ↔ rgb es reversible en primarios', () => {
    const red = { r: 255, g: 0, b: 0 };
    expect(hsvToRgb(rgbToHsv(red))).toEqual(red);
    expect(hsvToHex({ h: 120, s: 1, v: 1 })).toBe('#00ff00');
    expect(hexToHsv('#0000ff')?.h).toBeCloseTo(240, 5);
  });
});
