/**
 * Genera tokens CSS por familia a partir de presets TS + themeToStyle.
 * Los colores de componente se emiten como var(--glb-*), no como hex.
 * Uso: pnpm themes:generate
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import type { CSSProperties } from 'react';

import { textAreaThemes } from '@/components/TextArea/theme/defaultThemes';
import { themeToStyle as textAreaToStyle } from '@/components/TextArea/theme/resolveTheme';
import { dateBoxThemes } from '@/components/DateBox/theme/defaultThemes';
import { themeToStyle as dateBoxToStyle } from '@/components/DateBox/theme/resolveTheme';
import { rangeDateBoxThemes } from '@/components/RangeDateBox/theme/defaultThemes';
import { themeToStyle as rangeDateBoxToStyle } from '@/components/RangeDateBox/theme/resolveTheme';
import { checkButtonThemes } from '@/components/CheckButton/theme/defaultThemes';
import { themeToStyle as checkButtonToStyle } from '@/components/CheckButton/theme/resolveTheme';
import { optionGroupThemes } from '@/components/OptionGroup/theme/defaultThemes';
import { themeToStyle as optionGroupToStyle } from '@/components/OptionGroup/theme/resolveTheme';
import { popupThemes } from '@/components/Popup/theme/defaultThemes';
import { themeToStyle as popupToStyle } from '@/components/Popup/theme/resolveTheme';
import { toastThemes } from '@/components/Toast/theme/defaultThemes';
import { themeToStyle as toastToStyle } from '@/components/Toast/theme/resolveTheme';
import { dataGridThemes } from '@/components/DataGrid/theme/defaultThemes';
import { themeToStyle as dataGridToStyle } from '@/components/DataGrid/theme/resolveTheme';
import { pageActionsMenuThemes } from '@/components/PageActionsMenu/theme/defaultThemes';
import { themeToStyle as pamToStyle } from '@/components/PageActionsMenu/theme/resolveTheme';
import { buttonThemes } from '@/components/Button/theme/defaultThemes';
import { themeToStyle as buttonToStyle } from '@/components/Button/theme/resolveTheme';
import { selectThemes } from '@/components/Select/theme/defaultThemes';
import { themeToStyle as selectToStyle } from '@/components/Select/theme/resolveTheme';
import { textBoxThemes } from '@/components/TextBox/theme/defaultThemes';
import { themeToStyle as textBoxToStyle } from '@/components/TextBox/theme/resolveTheme';
import {
  parseBridgeTokenMap,
  remapComponentToken,
  whiteHexAsDirectValue,
} from './remapComponentTokens';

const themesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/styles/themes');

type Family = 'default' | 'modern' | 'enterprise';

interface ComponentSpec {
  label: string;
  toStyle: (theme: never) => CSSProperties;
  themes: Record<string, unknown>;
  lightKey: (family: Family) => string;
  darkKey: (family: Family) => string;
}

const bridgeCss = readFileSync(path.join(themesDir, '_component-bridge.css'), 'utf8');
const bridgeMap = parseBridgeTokenMap(bridgeCss);

function styleToDecls(style: CSSProperties | undefined): string {
  if (!style) return '';
  return Object.entries(style)
    .filter(([, value]) => value != null && value !== '')
    .map(([key, value]) => `  ${key}: ${remapComponentToken(key, String(value), bridgeMap)};`)
    .join('\n');
}

function block(selector: string, label: string, decls: string): string {
  return `/* ── ${label} ── */\n${selector} {\n${decls}\n}\n`;
}

const presetKey = (family: Family, mode: 'light' | 'dark'): string =>
  family === 'default' ? mode : `${family}-${mode}`;

const components: ComponentSpec[] = [
  { label: 'Button', toStyle: buttonToStyle as ComponentSpec['toStyle'], themes: buttonThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'Select', toStyle: selectToStyle as ComponentSpec['toStyle'], themes: selectThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'TextBox', toStyle: textBoxToStyle as ComponentSpec['toStyle'], themes: textBoxThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'TextArea', toStyle: textAreaToStyle as ComponentSpec['toStyle'], themes: textAreaThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'DateBox', toStyle: dateBoxToStyle as ComponentSpec['toStyle'], themes: dateBoxThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'RangeDateBox', toStyle: rangeDateBoxToStyle as ComponentSpec['toStyle'], themes: rangeDateBoxThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'CheckButton', toStyle: checkButtonToStyle as ComponentSpec['toStyle'], themes: checkButtonThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'OptionGroup', toStyle: optionGroupToStyle as ComponentSpec['toStyle'], themes: optionGroupThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'Popup', toStyle: popupToStyle as ComponentSpec['toStyle'], themes: popupThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'Toast', toStyle: toastToStyle as ComponentSpec['toStyle'], themes: toastThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'DataGrid', toStyle: dataGridToStyle as ComponentSpec['toStyle'], themes: dataGridThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
  { label: 'PageActionsMenu', toStyle: pamToStyle as ComponentSpec['toStyle'], themes: pageActionsMenuThemes, lightKey: (f) => presetKey(f, 'light'), darkKey: (f) => presetKey(f, 'dark') },
];

function generateForFamily(family: Family): string {
  const parts: string[] = [
    `/* ══════════════════════════════════════════════════`,
    `   Generated component tokens — ${family}`,
    `   Colores de componente: var(--glb-*). No editar a mano.`,
    `   Regenerate: pnpm themes:generate`,
    `   ══════════════════════════════════════════════════ */`,
    '',
  ];

  for (const spec of components) {
    const lightDecls = styleToDecls(spec.toStyle(spec.themes[spec.lightKey(family)] as never));
    const darkDecls = styleToDecls(spec.toStyle(spec.themes[spec.darkKey(family)] as never));
    parts.push(block(`[data-theme="${family}"]`, `${spec.label} (light)`, lightDecls));
    parts.push(block(`[data-theme="${family}"][data-mode="dark"]`, `${spec.label} (dark)`, darkDecls));
  }

  return parts.join('\n');
}

describe('generate missing theme css', () => {
  it('writes one generated file per theme family using var(--glb-*)', () => {
    for (const family of ['default', 'modern', 'enterprise'] as const) {
      const css = generateForFamily(family);
      const outFile = path.join(themesDir, `_generated-${family}.css`);
      writeFileSync(outFile, css, 'utf8');
      expect(css.length).toBeGreaterThan(500);
      expect(css).toContain('--btn-primary-bg: var(--glb-accent-surface)');
      expect(css).toContain('--btn-primary-disabled-bg: var(--glb-muted-surface)');
      expect(css).toContain('--datagrid-row-bg: var(--glb-surface)');
      expect(css).toContain('--select-primary-bg: var(--glb-input-bg)');
      expect(css).toContain('--textbox-primary-text: var(--glb-text)');
      expect(whiteHexAsDirectValue(css)).toEqual([]);
    }
  });
});
