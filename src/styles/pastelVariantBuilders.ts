import type { PastelAccent, PastelDanger } from './pastelPalette';

/** Variante primary pastel para Button / CheckButton */
export function buttonPrimaryVariant(accent: PastelAccent, isDark: boolean) {
  return {
    background: accent.surface,
    text: accent.onFill,
    border: accent.border,
    hoverBackground: accent.surfaceHover,
    hoverBorder: accent.borderStrong,
    activeBackground: accent.surfaceActive,
    activeBorder: accent.borderStrong,
    focusRing: accent.focusRing,
    disabledBackground: isDark ? '#374151' : '#e8eaef',
    disabledText: isDark ? '#6b7280' : '#9ca3af',
    disabledBorder: isDark ? '#374151' : '#e8eaef',
    spinnerColor: accent.onFill,
  };
}

export function buttonDangerVariant(danger: PastelDanger, isDark: boolean) {
  return {
    background: danger.background,
    text: danger.text,
    border: danger.border,
    hoverBackground: danger.hoverBackground,
    hoverBorder: danger.hoverBorder,
    activeBackground: danger.activeBackground,
    activeBorder: danger.activeBorder,
    focusRing: danger.focusRing,
    disabledBackground: isDark ? '#374151' : '#f0e8e8',
    disabledText: isDark ? '#6b7280' : '#c4a0a0',
    disabledBorder: isDark ? '#374151' : '#f0e8e8',
    spinnerColor: danger.text,
  };
}

/** Variante primary pastel para inputs (TextBox, Select, DateBox…) */
export function inputPrimaryVariant(accent: PastelAccent, isDark: boolean) {
  const bg = isDark ? '#1f2937' : '#ffffff';
  const text = isDark ? '#e5e7eb' : '#1f2937';
  const border = isDark ? '#4b5563' : '#d1d5db';
  const disabledBg = isDark ? '#111827' : '#f9fafb';
  const disabledText = isDark ? '#4b5563' : '#d1d5db';
  const disabledBorder = isDark ? '#374151' : '#e5e7eb';
  const placeholder = isDark ? '#6b7280' : '#9ca3af';
  const icon = isDark ? '#9ca3af' : '#6b7280';

  return {
    background: bg,
    text,
    border,
    placeholderColor: placeholder,
    iconColor: icon,
    hoverBackground: bg,
    hoverBorder: accent.borderStrong,
    focusBackground: bg,
    focusBorder: accent.borderStrong,
    focusRing: accent.focusRing,
    disabledBackground: disabledBg,
    disabledText,
    disabledBorder,
    errorBorder: isDark ? '#c97070' : '#d08080',
    errorFocusRing: isDark ? 'rgba(200, 130, 130, 0.35)' : 'rgba(180, 100, 100, 0.3)',
    optionBackground: isDark ? '#1f2937' : '#ffffff',
    optionText: isDark ? '#e5e7eb' : '#1f2937',
    optionHoverBackground: accent.optionHoverBg,
    optionHoverText: accent.optionHoverText,
    optionSelectedBackground: accent.subtleBg,
    optionSelectedText: accent.subtleText,
    optionDisabledText: disabledText,
  };
}

/** TextBox primary (sin opciones de dropdown) */
export function textboxPrimaryVariant(accent: PastelAccent, isDark: boolean) {
  const base = inputPrimaryVariant(accent, isDark);
  const { optionBackground: _o, optionText: _t, optionHoverBackground: _h, optionHoverText: _ht, optionSelectedBackground: _s, optionSelectedText: _st, optionDisabledText: _d, ...rest } = base as Record<string, string>;
  return rest;
}
