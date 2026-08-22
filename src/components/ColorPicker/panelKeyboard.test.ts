import { describe, expect, it } from 'vitest';
import type { Hsv } from './colorMath';
import { hsvFromKey } from './panelKeyboard';

const base: Hsv = { h: 220, s: 0.5, v: 0.5 };

describe('hsvFromKey', () => {
  it('mueve saturación y brillo en el cuadro SV', () => {
    expect(hsvFromKey('ArrowRight', false, base, 'sv')?.s).toBeCloseTo(0.51, 5);
    expect(hsvFromKey('ArrowLeft', false, base, 'sv')?.s).toBeCloseTo(0.49, 5);
    expect(hsvFromKey('ArrowUp', false, base, 'sv')?.v).toBeCloseTo(0.51, 5);
    expect(hsvFromKey('ArrowDown', false, base, 'sv')?.v).toBeCloseTo(0.49, 5);
  });

  it('conserva el matiz al mover el cuadro SV', () => {
    expect(hsvFromKey('Home', false, base, 'sv')).toEqual({ h: 220, s: 0, v: 0.5 });
    expect(hsvFromKey('End', false, base, 'sv')).toEqual({ h: 220, s: 1, v: 0.5 });
  });

  it('usa paso 10× con Shift', () => {
    expect(hsvFromKey('ArrowRight', true, base, 'sv')?.s).toBeCloseTo(0.6, 5);
    expect(hsvFromKey('ArrowRight', true, base, 'hue')?.h).toBeCloseTo(230, 5);
  });

  it('acota el rango en ambos ejes', () => {
    expect(hsvFromKey('ArrowLeft', true, { h: 5, s: 0.02, v: 1 }, 'sv')?.s).toBe(0);
    expect(hsvFromKey('ArrowLeft', true, { h: 5, s: 0.5, v: 1 }, 'hue')?.h).toBe(0);
    expect(hsvFromKey('ArrowRight', true, { h: 355, s: 0.5, v: 1 }, 'hue')?.h).toBe(360);
  });

  it('mueve el matiz con flechas verticales y Home/End', () => {
    expect(hsvFromKey('ArrowUp', false, base, 'hue')?.h).toBeCloseTo(221, 5);
    expect(hsvFromKey('ArrowDown', false, base, 'hue')?.h).toBeCloseTo(219, 5);
    expect(hsvFromKey('Home', false, base, 'hue')?.h).toBe(0);
    expect(hsvFromKey('End', false, base, 'hue')?.h).toBe(360);
  });

  it('ignora teclas no manejadas', () => {
    expect(hsvFromKey('Enter', false, base, 'sv')).toBeNull();
    expect(hsvFromKey('Tab', false, base, 'hue')).toBeNull();
    expect(hsvFromKey('ArrowUp', false, base, 'hue')).not.toBeNull();
  });
});
