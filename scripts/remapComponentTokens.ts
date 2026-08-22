/**
 * Mapea tokens de componente a var(--glb-*).
 * El generador de temas usa este remap para no emitir hex de superficies.
 */

export function parseBridgeTokenMap(css: string): Record<string, string> {
  const map: Record<string, string> = {};
  const re = /(--[a-z0-9-]+)\s*:\s*(var\(--glb-[^;]+);/gi;
  for (const match of css.matchAll(re)) {
    map[match[1]] = match[2].trim();
  }
  return map;
}

function isBareColor(value: string): boolean {
  const v = value.trim();
  return (
    v === 'transparent' ||
    /^#([0-9a-f]{3,8})$/i.test(v) ||
    /^(rgba?|hsla?)\(/i.test(v)
  );
}

/** Segmento de token (`--foo-bar-text` → `text`), no substring de `textbox`/`textarea`. */
function hasTokenPart(key: string, part: string): boolean {
  return key.split('-').includes(part);
}

/**
 * Sustituye colores hardcodeados por tokens del sistema.
 * Sombras, radii y transiciones se dejan igual.
 */
export function remapComponentToken(
  key: string,
  raw: string,
  bridge: Record<string, string>,
): string {
  const value = String(raw).trim();
  if (bridge[key]) return bridge[key];
  if (value.startsWith('var(--glb-')) return value;
  if (!isBareColor(value)) return value;
  if (value === 'transparent') return value;

  const k = key.toLowerCase();

  if (k.startsWith('--btn-primary') || k.startsWith('--pam-primary')) {
    if (k.includes('disabled')) {
      if (k.includes('text')) return 'var(--glb-muted)';
      if (k.includes('border')) return 'var(--glb-border)';
      if (k.includes('bg')) return 'var(--glb-muted-surface)';
    }
    if (k.includes('spinner') || k.includes('text')) return 'var(--glb-accent-on-fill)';
    if (k.includes('focus-ring')) return 'var(--glb-accent-focus-ring)';
    if (k.includes('hover-border') || k.includes('active-border')) {
      return 'var(--glb-accent-border-strong)';
    }
    if (k.includes('border')) return 'var(--glb-accent-border)';
    if (k.includes('hover-bg')) return 'var(--glb-accent-surface-hover)';
    if (k.includes('active-bg')) return 'var(--glb-accent-surface-active)';
    if (k.includes('-bg')) return 'var(--glb-accent-surface)';
  }

  if (k.startsWith('--btn-danger')) {
    if (k.includes('disabled')) {
      if (k.includes('text')) return 'var(--glb-muted)';
      if (k.includes('border')) return 'var(--glb-border)';
      if (k.includes('bg')) return 'var(--glb-muted-surface)';
    }
    if (k.includes('spinner') || k.includes('text')) return 'var(--glb-danger-on-fill)';
    if (k.includes('focus-ring')) return 'var(--glb-danger-focus-ring)';
    if (k.includes('border')) return 'var(--glb-danger-border)';
    if (k.includes('hover-bg')) return 'var(--glb-danger-surface-hover)';
    if (k.includes('active-bg')) return 'var(--glb-danger-surface-active)';
    if (k.includes('-bg')) return 'var(--glb-danger-surface)';
  }

  if (k.includes('error') && k.includes('ring')) {
    return 'var(--glb-danger-focus-ring, rgba(239, 68, 68, 0.25))';
  }
  if (k.includes('error')) {
    return 'var(--glb-danger-border, var(--glb-danger-on-fill))';
  }

  if (k.includes('option-hover-bg')) return 'var(--glb-accent-option-hover-bg)';
  if (k.includes('option-hover-text')) return 'var(--glb-accent-option-hover-text)';
  if (
    k.includes('option-selected-bg') ||
    k.includes('today-bg') ||
    k.includes('row-selected-bg') ||
    k.includes('row-hover-bg')
  ) {
    return 'var(--glb-accent-subtle-bg)';
  }
  if (
    k.includes('option-selected-text') ||
    k.includes('row-selected-text') ||
    k.includes('sort-icon-active')
  ) {
    return 'var(--glb-accent-subtle-text)';
  }
  if (k.includes('checked-bg') || k.includes('primary-selected-bg')) {
    return 'var(--glb-accent-surface)';
  }
  if (k.includes('checked-active-bg') || k.includes('hover-selected-bg')) {
    return 'var(--glb-accent-surface-hover)';
  }
  if (k.includes('unchecked-active-bg') || k.includes('active-bg')) {
    return 'var(--glb-surface-hover)';
  }
  if (k.includes('checked-text') || k.includes('indicator-selected')) {
    return 'var(--glb-accent-on-fill)';
  }
  if (k.includes('focus-ring')) return 'var(--glb-accent-focus-ring)';
  if (k.includes('focus-border') || (k.includes('hover-border') && k.includes('primary'))) {
    return 'var(--glb-accent-border-strong)';
  }

  if (
    k.includes('placeholder') ||
    k.includes('helper-color') ||
    k.includes('label-color') ||
    k.includes('clear-color') ||
    k.includes('empty-text') ||
    k.includes('sort-icon') ||
    k.endsWith('-icon') ||
    k.includes('disabled-text') ||
    k.includes('option-disabled')
  ) {
    return 'var(--glb-muted)';
  }

  if (k.includes('disabled-bg')) return 'var(--glb-muted-surface)';
  if (k.includes('disabled-border')) return 'var(--glb-border)';

  if (k.includes('overlay')) {
    return 'color-mix(in srgb, var(--glb-app-bg) 72%, transparent)';
  }

  if (
    k.includes('dropdown-bg') ||
    k.includes('panel-bg') ||
    k.includes('option-bg') ||
    /--[a-z]+-row-bg$/.test(k)
  ) {
    return 'var(--glb-surface)';
  }

  if (
    k.includes('header-bg') ||
    k.includes('row-alt') ||
    k.includes('secondary-bg') ||
    k.includes('footer-bg')
  ) {
    return 'var(--glb-muted-surface)';
  }

  if (hasTokenPart(k, 'text') || k.includes('clear-hover-color')) return 'var(--glb-text)';
  if (k.includes('border')) return 'var(--glb-border)';

  if (k.includes('hover-bg') && (k.includes('outline') || k.includes('ghost'))) {
    return 'var(--glb-surface-hover)';
  }

  if (
    k.includes('search-bg') ||
    k.includes('primary-bg') ||
    k.includes('hover-bg') ||
    k.includes('focus-bg')
  ) {
    return 'var(--glb-input-bg)';
  }

  if (k.includes('spinner')) return 'var(--glb-text)';

  return value;
}

/** Hex blanco usado como valor directo (no como fallback de var()). */
export function whiteHexAsDirectValue(css: string): string[] {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const hits: string[] = [];
  for (const match of stripped.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    const val = match[2].trim();
    if (/^#(?:fff|ffffff)$/i.test(val)) {
      hits.push(`${match[1]}: ${val}`);
    }
  }
  return hits;
}
