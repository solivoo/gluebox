import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { remapComponentToken, whiteHexAsDirectValue } from '../../../scripts/remapComponentTokens';

const themesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.');
const stylesDir = path.resolve(themesDir, '..');
const srcDir = path.resolve(stylesDir, '..');

describe('generated theme tokens', () => {
  it.each(['default', 'modern', 'enterprise'] as const)(
    '_generated-%s.css usa var(--glb-*) y no #ffffff directo',
    (family) => {
      const css = readFileSync(path.join(themesDir, `_generated-${family}.css`), 'utf8');
      expect(css).toContain('--btn-primary-bg: var(--glb-accent-surface)');
      expect(css).toContain('--datagrid-row-bg: var(--glb-surface)');
      expect(css).toContain('--select-primary-bg: var(--glb-input-bg)');
      expect(css).toContain('--textbox-primary-text: var(--glb-text)');
      expect(css).toContain('--textbox-outline-focus-bg: var(--glb-input-bg)');
      expect(css).toContain('--textbox-ghost-focus-bg: var(--glb-input-bg)');
      expect(css).toContain('--textarea-secondary-hover-bg: var(--glb-input-bg)');
      expect(css).not.toMatch(/--textbox-outline-focus-bg:\s*var\(--glb-text\)/);
      expect(css).not.toMatch(/--textarea-secondary-hover-bg:\s*var\(--glb-text\)/);
      expect(css).toContain('--datagrid-border: var(--glb-border)');
      expect(css).toContain('--select-primary-placeholder: var(--glb-muted)');
      expect(whiteHexAsDirectValue(css)).toEqual([]);
    },
  );
});

describe('color-scheme', () => {
  it('vive junto a --glb-app-bg / --glb-surface en base.css', () => {
    const css = readFileSync(path.join(stylesDir, 'base.css'), 'utf8');
    expect(css).toMatch(/\[data-mode=["']light["']\][\s\S]*color-scheme:\s*light/);
    expect(css).toMatch(/\[data-mode=["']dark["']\][\s\S]*color-scheme:\s*dark/);
    expect(css).toContain('--glb-app-bg');
    expect(css).toContain('--glb-surface');
  });
});

describe('TextBox type=number', () => {
  it('oculta el spin nativo igual que NumberBox', () => {
    const css = readFileSync(
      path.join(srcDir, 'components/TextBox/css/TextBox.css'),
      'utf8',
    );
    expect(css).toContain(".glb-textbox__input[type='number']::-webkit-inner-spin-button");
    expect(css).toContain(".glb-textbox__input[type='number']::-webkit-outer-spin-button");
    expect(css).toMatch(
      /\.glb-textbox__input\[type='number'\]\s*\{[^}]*appearance:\s*textfield/s,
    );
  });
});

describe('remapComponentToken', () => {
  const bridge = {};

  it('no mapea fondos textbox/textarea a --glb-text', () => {
    expect(remapComponentToken('--textbox-outline-focus-bg', '#f8fafc', bridge)).toBe(
      'var(--glb-input-bg)',
    );
    expect(remapComponentToken('--textbox-ghost-focus-bg', '#f8fafc', bridge)).toBe(
      'var(--glb-input-bg)',
    );
    expect(remapComponentToken('--textarea-secondary-hover-bg', '#f1f5f9', bridge)).toBe(
      'var(--glb-input-bg)',
    );
    expect(remapComponentToken('--textarea-outline-hover-bg', '#f8fafc', bridge)).toBe(
      'var(--glb-surface-hover)',
    );
  });

  it('sigue mapeando --*-text a --glb-text', () => {
    expect(remapComponentToken('--textbox-primary-text', '#0f172a', bridge)).toBe(
      'var(--glb-text)',
    );
    expect(remapComponentToken('--select-primary-text', '#0f172a', bridge)).toBe(
      'var(--glb-text)',
    );
  });
});
