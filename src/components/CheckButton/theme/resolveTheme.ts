import type { CSSProperties } from 'react';
import type { CheckButtonTheme, CheckButtonThemeInput } from './CheckButton.theme.types';
import { checkButtonThemes } from './defaultThemes';

export function resolveTheme(theme?: CheckButtonThemeInput): CheckButtonTheme {
  if (!theme) return checkButtonThemes.light;
  if (typeof theme === 'string') return checkButtonThemes[theme];
  return theme;
}

function stateVars(
  variant: string,
  state: 'unchecked' | 'checked',
  tokens: CheckButtonTheme['variants']['primary']['unchecked'],
): Record<string, string> {
  return {
    [`--checkbtn-${variant}-${state}-bg`]: tokens.background,
    [`--checkbtn-${variant}-${state}-text`]: tokens.text,
    [`--checkbtn-${variant}-${state}-border`]: tokens.border,
    [`--checkbtn-${variant}-${state}-hover-bg`]: tokens.hoverBackground,
    [`--checkbtn-${variant}-${state}-hover-border`]: tokens.hoverBorder,
    [`--checkbtn-${variant}-${state}-active-bg`]: tokens.activeBackground,
    [`--checkbtn-${variant}-${state}-active-border`]: tokens.activeBorder,
    [`--checkbtn-${variant}-${state}-focus-ring`]: tokens.focusRing,
    [`--checkbtn-${variant}-${state}-disabled-bg`]: tokens.disabledBackground,
    [`--checkbtn-${variant}-${state}-disabled-text`]: tokens.disabledText,
    [`--checkbtn-${variant}-${state}-disabled-border`]: tokens.disabledBorder,
    [`--checkbtn-${variant}-${state}-icon`]: tokens.iconColor,
  };
}

export function themeToStyle(theme: CheckButtonTheme): CSSProperties {
  const vars: Record<string, string> = {
    '--checkbtn-font-size': theme.fontSize,
    '--checkbtn-radius': theme.borderRadius,
    '--checkbtn-transition': theme.transition,
    '--checkbtn-shadow': theme.shadow,
  };

  for (const name of ['primary', 'outline', 'ghost'] as const) {
    const v = theme.variants[name];
    Object.assign(vars, stateVars(name, 'unchecked', v.unchecked));
    Object.assign(vars, stateVars(name, 'checked', v.checked));
  }

  return vars as CSSProperties;
}
