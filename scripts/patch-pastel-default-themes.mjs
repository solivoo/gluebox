/**
 * Parchea variantes primary/danger en defaultThemes.ts de componentes de formulario.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = path.join(root, 'src/components');

const presets = {
  light: {
    primaryBg: '#E4E9F6',
    primaryText: '#4A5270',
    primaryBorder: '#B8C2E3',
    primaryHoverBg: '#D6DDF0',
    primaryHoverBorder: '#9DABCE',
    primaryFocusBorder: '#9DABCE',
    primaryFocusRing: 'rgba(120, 135, 175, 0.35)',
    primaryActiveBg: '#C8D1E9',
    selectedBg: 'rgba(120, 135, 175, 0.14)',
    selectedText: '#5C6580',
    optionHoverBg: '#D6DDF0',
    optionHoverText: '#3D4560',
  },
  dark: {
    primaryBg: '#4E5678',
    primaryText: '#ECEEF7',
    primaryBorder: '#6B7599',
    primaryHoverBg: '#5A6388',
    primaryHoverBorder: '#7D88AD',
    primaryFocusBorder: '#7D88AD',
    primaryFocusRing: 'rgba(140, 152, 190, 0.4)',
    primaryActiveBg: '#454D6C',
    selectedBg: 'rgba(140, 152, 190, 0.2)',
    selectedText: '#B8C0DC',
    optionHoverBg: '#5A6388',
    optionHoverText: '#ECEEF7',
  },
  modernLight: {
    primaryBg: '#D8EDE4',
    primaryText: '#3D5C4F',
    primaryBorder: '#A8D0BE',
    primaryHoverBg: '#C8E5D8',
    primaryHoverBorder: '#8BBAA5',
    primaryFocusBorder: '#8BBAA5',
    primaryFocusRing: 'rgba(100, 150, 125, 0.35)',
    selectedBg: 'rgba(100, 150, 125, 0.14)',
    selectedText: '#4A6B5C',
    optionHoverBg: '#C8E5D8',
    optionHoverText: '#2F4A40',
  },
  modernDark: {
    primaryBg: '#3D5C4F',
    primaryText: '#E4F2EB',
    primaryBorder: '#5F8F78',
    primaryHoverBg: '#476959',
    primaryHoverBorder: '#72A08A',
    primaryFocusBorder: '#72A08A',
    primaryFocusRing: 'rgba(110, 165, 135, 0.4)',
    selectedBg: 'rgba(110, 165, 135, 0.2)',
    selectedText: '#A8D4BE',
    optionHoverBg: '#476959',
    optionHoverText: '#E4F2EB',
  },
  enterpriseLight: {
    primaryBg: '#D6E6F5',
    primaryText: '#3D5568',
    primaryBorder: '#A3C4E3',
    primaryHoverBg: '#C5DBF0',
    primaryHoverBorder: '#88AED4',
    primaryFocusBorder: '#88AED4',
    primaryFocusRing: 'rgba(100, 140, 180, 0.35)',
    selectedBg: 'rgba(100, 140, 180, 0.14)',
    selectedText: '#4A6278',
    optionHoverBg: '#C5DBF0',
    optionHoverText: '#2F4558',
  },
  enterpriseDark: {
    primaryBg: '#3D5568',
    primaryText: '#E4EEF7',
    primaryBorder: '#5F85AD',
    primaryHoverBg: '#476175',
    primaryHoverBorder: '#7296BA',
    primaryFocusBorder: '#7296BA',
    primaryFocusRing: 'rgba(110, 150, 190, 0.4)',
    selectedBg: 'rgba(110, 150, 190, 0.2)',
    selectedText: '#A8C4DC',
    optionHoverBg: '#476175',
    optionHoverText: '#E4EEF7',
  },
};

const dangerLight = {
  bg: '#F0D8D8',
  text: '#7A4545',
  border: '#E4C0C0',
  hover: '#E8CACA',
  active: '#DEB8B8',
  ring: 'rgba(180, 100, 100, 0.35)',
};

const dangerDark = {
  bg: '#6B4545',
  text: '#F5E8E8',
  border: '#7A5555',
  hover: '#7A5555',
  active: '#5C3838',
  ring: 'rgba(200, 130, 130, 0.4)',
};

function patchContent(content) {
  let out = content;

  const buttonPrimaryPatches = [
    ['#4f46e5', presets.light.primaryBg],
    ['#6366f1', presets.light.primaryHoverBg],
    ['#4338ca', presets.light.primaryActiveBg],
    ['#818cf8', presets.modernDark.primaryHoverBg],
    ['#059669', presets.modernLight.primaryBg],
    ['#10b981', presets.modernLight.primaryHoverBg],
    ['#047857', presets.modernLight.primaryActiveBg],
    ['#34d399', presets.modernDark.primaryHoverBg],
    ['#2563eb', presets.enterpriseLight.primaryBg],
    ['#3b82f6', presets.enterpriseLight.primaryHoverBg],
    ['#1d4ed8', presets.enterpriseLight.primaryActiveBg],
    ['#60a5fa', presets.enterpriseDark.primaryHoverBg],
  ];

  // Button primary text on fill (white -> pastel text) — scoped replacements
  out = out.replace(
    /"background": "#059669",\s*"text": "#ffffff"/g,
    `"background": "${presets.modernLight.primaryBg}", "text": "${presets.modernLight.primaryText}"`,
  );
  out = out.replace(
    /"background": "#10b981",\s*"text": "#ffffff"/g,
    `"background": "${presets.modernDark.primaryBg}", "text": "${presets.modernDark.primaryText}"`,
  );
  out = out.replace(
    /"background": "#2563eb",\s*"text": "#ffffff"/g,
    `"background": "${presets.enterpriseLight.primaryBg}", "text": "${presets.enterpriseLight.primaryText}"`,
  );
  out = out.replace(
    /"background": "#3b82f6",\s*"text": "#ffffff"/g,
    `"background": "${presets.enterpriseDark.primaryBg}", "text": "${presets.enterpriseDark.primaryText}"`,
  );
  out = out.replace(
    /background: '#4f46e5',\s*text: '#ffffff'/g,
    `background: '${presets.light.primaryBg}', text: '${presets.light.primaryText}'`,
  );
  out = out.replace(
    /background: '#6366f1',\s*text: '#ffffff'/g,
    `background: '${presets.dark.primaryBg}', text: '${presets.dark.primaryText}'`,
  );

  // Focus rings — indigo/emerald/blue to pastel
  out = out.replace(/rgba\(99,\s*102,\s*241[^)]+\)/g, presets.light.primaryFocusRing);
  out = out.replace(/rgba\(79,\s*70,\s*229[^)]+\)/g, presets.light.primaryFocusRing);
  out = out.replace(/rgba\(16,\s*185,\s*129[^)]+\)/g, presets.modernLight.primaryFocusRing);
  out = out.replace(/rgba\(5,\s*150,\s*105[^)]+\)/g, presets.modernLight.primaryFocusRing);
  out = out.replace(/rgba\(59,\s*130,\s*246[^)]+\)/g, presets.enterpriseLight.primaryFocusRing);
  out = out.replace(/rgba\(37,\s*99,\s*235[^)]+\)/g, presets.enterpriseLight.primaryFocusRing);

  // Select option selected / hover saturated
  out = out.replace(/#6366f1/g, presets.light.optionHoverBg);
  out = out.replace(/#4f46e5/g, presets.light.selectedText);
  out = out.replace(/#a5b4fc/g, presets.dark.selectedText);
  out = out.replace(/rgba\(99,\s*102,\s*241,\s*0\.08\)/g, presets.light.selectedBg);
  out = out.replace(/rgba\(99,\s*102,\s*241,\s*0\.15\)/g, presets.dark.selectedBg);

  // Danger softer
  out = out.replace(/#dc2626/g, dangerLight.bg);
  out = out.replace(/#ef4444/g, dangerLight.hover);
  out = out.replace(/#b91c1c/g, dangerLight.active);
  out = out.replace(/rgba\(220,\s*38,\s*38[^)]+\)/g, dangerLight.ring);
  out = out.replace(/rgba\(239,\s*68,\s*68[^)]+\)/g, dangerLight.ring);

  return out;
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (name === 'defaultThemes.ts' && !full.includes('Button')) {
      const original = readFileSync(full, 'utf8');
      const patched = patchContent(original);
      if (patched !== original) {
        writeFileSync(full, patched);
        console.log('Patched', path.relative(root, full));
      }
    }
  }
}

walk(componentsDir);
