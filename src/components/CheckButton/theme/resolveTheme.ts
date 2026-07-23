import type { CSSProperties } from 'react';
import type { CheckButtonTheme, CheckButtonThemeInput } from './CheckButton.theme.types';
import { checkButtonThemes } from './defaultThemes';

export function resolveTheme(theme?: CheckButtonThemeInput): CheckButtonTheme | undefined {
  if (!theme) return undefined;
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

/** Sin tema, el CSS global (data-theme/data-mode) controla el aspecto. */
export function themeToStyle(theme: CheckButtonTheme | undefined): CSSProperties | undefined {
  if (!theme) return undefined;
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
