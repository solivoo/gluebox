import { describe, expect, it } from 'vitest';
import { computeFloatingPosition } from './useFloatingPosition';

function stubViewport(width: number, height: number): void {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: { innerWidth: width, innerHeight: height },
  });
}

function rect(x: number, y: number, width: number, height: number): DOMRect {
  return {
    x,
    y,
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    toJSON: () => ({}),
  } as DOMRect;
}

describe('computeFloatingPosition', () => {
  it('coloca el menú debajo del trigger si hay espacio', () => {
    stubViewport(800, 600);
    const trigger = rect(40, 40, 160, 32);
    const dropdown = rect(0, 0, 160, 120);
    const coords = computeFloatingPosition(trigger, dropdown);
    expect(coords.top).toBe(40 + 32 + 6);
    expect(coords.left).toBe(40);
    expect(coords.minWidth).toBe(160);
    expect(coords.maxHeight).toBeUndefined();
  });

  it('voltea arriba cuando no cabe abajo y hay más espacio encima', () => {
    stubViewport(800, 200);
    const trigger = rect(40, 140, 160, 32);
    const dropdown = rect(0, 0, 160, 120);
    const coords = computeFloatingPosition(trigger, dropdown);
    expect(coords.top).toBeLessThan(trigger.top);
  });

  it('ajusta left para no salir del viewport', () => {
    stubViewport(200, 600);
    const trigger = rect(80, 40, 160, 32);
    const dropdown = rect(0, 0, 180, 80);
    const coords = computeFloatingPosition(trigger, dropdown);
    expect(coords.left + 180).toBeLessThanOrEqual(200 - 8);
    expect(coords.left).toBeGreaterThanOrEqual(8);
  });
});
