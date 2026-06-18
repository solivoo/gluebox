/**
 * Parchea acentos saturados en defaultThemes.ts (formularios, sidebar, etc.)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const families = {
  indigo: {
    border: '#9DABCE',
    borderDark: '#7D88AD',
    selectedText: '#5C6580',
    selectedTextDark: '#B8C0DC',
    optionHoverBg: '#D6DDF0',
    optionHoverBgDark: '#5A6388',
    optionHoverText: '#3D4560',
    optionHoverTextDark: '#ECEEF7',
    selectedBg: 'rgba(120, 135, 175, 0.14)',
    selectedBgDark: 'rgba(140, 152, 190, 0.2)',
    focusRing: 'rgba(120, 135, 175, 0.35)',
    focusRingDark: 'rgba(140, 152, 190, 0.4)',
    saturated: '#6366f1',
    saturated2: '#4f46e5',
    saturated3: '#a5b4fc',
    saturated4: '#818cf8',
  },
  emerald: {
    border: '#8BBAA5',
    borderDark: '#72A08A',
    selectedText: '#4A6B5C',
    selectedTextDark: '#A8D4BE',
    optionHoverBg: '#C8E5D8',
    optionHoverBgDark: '#476959',
    optionHoverText: '#2F4A40',
    optionHoverTextDark: '#E4F2EB',
    selectedBg: 'rgba(100, 150, 125, 0.14)',
    selectedBgDark: 'rgba(110, 165, 135, 0.2)',
    focusRing: 'rgba(100, 150, 125, 0.35)',
    focusRingDark: 'rgba(110, 165, 135, 0.4)',
    saturated: '#10b981',
    saturated2: '#059669',
    saturated3: '#34d399',
    saturated4: '#047857',
  },
  blue: {
    border: '#88AED4',
    borderDark: '#7296BA',
    selectedText: '#4A6278',
    selectedTextDark: '#A8C4DC',
    optionHoverBg: '#C5DBF0',
    optionHoverBgDark: '#476175',
    optionHoverText: '#2F4558',
    optionHoverTextDark: '#E4EEF7',
    selectedBg: 'rgba(100, 140, 180, 0.14)',
    selectedBgDark: 'rgba(110, 150, 190, 0.2)',
    focusRing: 'rgba(100, 140, 180, 0.35)',
    focusRingDark: 'rgba(110, 150, 190, 0.4)',
    saturated: '#3b82f6',
    saturated2: '#2563eb',
    saturated3: '#60a5fa',
    saturated4: '#1d4ed8',
  },
};

function patchLine(line, family, isDark) {
  const f = families[family];
  let out = line;

  const border = isDark ? f.borderDark : f.border;
  const optHover = isDark ? f.optionHoverBgDark : f.optionHoverBg;
  const optHoverText = isDark ? f.optionHoverTextDark : f.optionHoverText;
  const selText = isDark ? f.selectedTextDark : f.selectedText;
  const selBg = isDark ? f.selectedBgDark : f.selectedBg;
  const ring = isDark ? f.focusRingDark : f.focusRing;

  if (/optionHoverBackground|optionSelectedBackground/.test(line)) {
    if (/optionHoverBackground/.test(line)) {
      out = out.replace(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/, optHover);
    }
    if (/optionSelectedBackground/.test(line)) {
      out = out.replace(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/, selBg);
    }
  } else if (/optionHoverText|optionSelectedText/.test(line)) {
    if (/optionHoverText/.test(line)) {
      out = out.replace(/#[0-9a-fA-F]{3,8}/, optHoverText);
    }
    if (/optionSelectedText/.test(line)) {
      out = out.replace(/#[0-9a-fA-F]{3,8}/, selText);
    }
  } else if (/hoverBorder|focusBorder/.test(line)) {
    out = out.replace(/#[0-9a-fA-F]{3,8}/, border);
  } else if (/focusRing/.test(line)) {
    out = out.replace(/rgba?\([^)]+\)/, ring);
  } else if (/main:|hover:|active:/.test(line)) {
    // CheckButton accent object
    if (/main:/.test(line)) out = out.replace(/#[0-9a-fA-F]{3,8}/, isDark ? families[family].optionHoverBgDark : families[family].optionHoverBg);
    if (/hover:/.test(line)) out = out.replace(/#[0-9a-fA-F]{3,8}/, border);
    if (/active:/.test(line)) out = out.replace(/#[0-9a-fA-F]{3,8}/, selText);
  }

  // Saturated hex fallbacks
  for (const hex of [f.saturated, f.saturated2, f.saturated3, f.saturated4]) {
    if (out.includes(hex)) {
      if (/optionHover/.test(line)) out = out.replace(hex, optHover);
      else if (/SelectedText/.test(line)) out = out.replace(hex, selText);
      else if (/hoverBorder|focusBorder/.test(line)) out = out.replace(hex, border);
      else out = out.replace(hex, border);
    }
  }

  // Danger pastel
  out = out.replace(/#dc2626/g, isDark ? '#6B4545' : '#F0D8D8');
  out = out.replace(/#ef4444/g, isDark ? '#7A5555' : '#E8CACA');
  out = out.replace(/#b91c1c/g, isDark ? '#5C3838' : '#DEB8B8');
  out = out.replace(/#fca5a5/g, '#C4A0A0');
  out = out.replace(/#fecaca/g, '#F0E8E8');

  return out;
}

function detectFamily(content, index) {
  const before = content.slice(Math.max(0, index - 400), index);
  if (/modern-dark|modern-light|'modern/.test(before)) return 'emerald';
  if (/enterprise-dark|enterprise-light|'enterprise/.test(before)) return 'blue';
  return 'indigo';
}

function isDarkBlock(content, index) {
  const before = content.slice(Math.max(0, index - 500), index);
  return /dark|"dark"|data-mode="dark"|\bdark\b/.test(before) && !/modern-light|enterprise-light|"light"/.test(before.slice(-120));
}

function patchFile(filePath) {
  if (filePath.includes('Button\\theme') || filePath.includes('Button/theme')) return;

  const original = readFileSync(filePath, 'utf8');
  const lines = original.split('\n');
  const out = lines.map((line, i) => {
    const offset = lines.slice(0, i).join('\n').length;
    const family = detectFamily(original, offset);
    const dark = isDarkBlock(original, offset) || /"dark"|'dark'/.test(line) || (original.includes('"dark"') && i < 120);
    const needsPatch = /#6366f1|#4f46e5|#10b981|#059669|#3b82f6|#2563eb|#dc2626|#ef4444|main:|hoverBorder|focusBorder|optionHover|optionSelected|rgba\(99,\s*102,\s*241|rgba\(16,\s*185,\s*129|rgba\(59,\s*130,\s*246/.test(line);
    if (!needsPatch) return line;
    const blockDark = /dark/.test(lines.slice(Math.max(0, i - 30), i).join('\n')) && !/light/.test(lines.slice(Math.max(0, i - 8), i).join('\n'));
    return patchLine(line, family, blockDark || dark);
  });

  const result = out.join('\n');
  if (result !== original) {
    writeFileSync(filePath, result);
    console.log('Patched', path.relative(root, filePath));
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'defaultThemes.ts') patchFile(full);
  }
}

walk(path.join(root, 'src/components'));
