import { describe, expect, it } from 'vitest';
import {
  estimateViewportHeightPx,
  resolveDataGridHeight,
} from './resolveDataGridHeight';

describe('resolveDataGridHeight', () => {
  it('fit-content sin límites → mode auto', () => {
    const resolved = resolveDataGridHeight({
      virtualized: false,
      hasChrome: true,
    });
    expect(resolved).toEqual({ mode: 'auto', applyTo: 'surface' });
  });

  it('fit-content: height numérico actúa como maxHeight (techo)', () => {
    const resolved = resolveDataGridHeight({
      height: 500,
      virtualized: false,
      hasChrome: true,
    });
    expect(resolved.mode).toBe('max');
    expect(resolved.maxHeight).toBe('500px');
    expect(resolved.height).toBeUndefined();
    expect(resolved.applyTo).toBe('surface');
  });

  it('fit-content: maxHeight acota sin height', () => {
    const resolved = resolveDataGridHeight({
      maxHeight: '60vh',
      virtualized: false,
      hasChrome: false,
    });
    expect(resolved).toEqual({
      mode: 'max',
      maxHeight: '60vh',
      applyTo: 'viewport',
    });
  });

  it('fit-content: height tiene prioridad sobre maxHeight como techo', () => {
    const resolved = resolveDataGridHeight({
      height: 400,
      maxHeight: 800,
      virtualized: false,
      hasChrome: false,
    });
    expect(resolved.maxHeight).toBe('400px');
  });

  it('virtualizado: usa height fijo', () => {
    const resolved = resolveDataGridHeight({
      height: 500,
      virtualized: true,
      hasChrome: true,
    });
    expect(resolved).toEqual({
      mode: 'fixed',
      height: '500px',
      applyTo: 'surface',
    });
  });

  it('virtualizado sin height: usa maxHeight o fallback 420', () => {
    expect(
      resolveDataGridHeight({
        maxHeight: 360,
        virtualized: true,
        hasChrome: false,
      }).height,
    ).toBe('360px');

    expect(
      resolveDataGridHeight({
        virtualized: true,
        hasChrome: false,
      }).height,
    ).toBe('420px');
  });

  it('ignora strings vacíos', () => {
    const resolved = resolveDataGridHeight({
      height: '  ',
      maxHeight: '',
      virtualized: false,
      hasChrome: false,
    });
    expect(resolved.mode).toBe('auto');
  });
});

describe('estimateViewportHeightPx', () => {
  it('suma header + filas (solo estimación; fit-content usa DOM real)', () => {
    expect(
      estimateViewportHeightPx({ rowCount: 2, rowHeight: 44 }),
    ).toBe(44 + 2 * 44);
  });

  it('usa emptyBodyHeight si no hay filas', () => {
    expect(
      estimateViewportHeightPx({
        rowCount: 0,
        rowHeight: 44,
        emptyBodyHeight: 80,
      }),
    ).toBe(44 + 80);
  });
});
