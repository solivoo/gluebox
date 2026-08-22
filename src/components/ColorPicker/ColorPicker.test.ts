import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ColorPicker } from './ColorPicker';
import { DEFAULT_COLOR_PRESETS } from './colorPresets';

describe('ColorPicker', () => {
  it('renderiza swatch + input hex, no input type=color nativo', () => {
    const html = renderToString(
      createElement(ColorPicker, {
        label: 'Acento',
        defaultValue: '#3b82f6',
      }),
    );

    expect(html).toContain('glb-colorpicker');
    expect(html).toContain('glb-colorpicker__swatch');
    expect(html).toContain('Acento');
    expect(html).not.toMatch(/type="color"/);
  });

  it('asocia el label al input hex', () => {
    const html = renderToString(
      createElement(ColorPicker, { label: 'Color', id: 'accent' }),
    );
    expect(html).toContain('for="accent"');
    expect(html).toContain('id="accent"');
  });

  it('acepta los presets exportados (readonly) sin castear', () => {
    const html = renderToString(
      createElement(ColorPicker, { label: 'Color', presets: DEFAULT_COLOR_PRESETS }),
    );
    expect(html).toContain('glb-colorpicker');
  });
});
