import type { CSSProperties } from 'react';

/** Convierte width/height numérico o string a valor CSS. */
export function resolveDimension(value?: string | number): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (/^\d+$/.test(String(value))) return `${value}px`;
  return String(value);
}

export function dimensionStyle(
  width?: string | number,
  height?: string | number,
): CSSProperties {
  return {
    ...(width != null ? { width: resolveDimension(width) } : {}),
    ...(height != null ? { height: resolveDimension(height) } : {}),
  };
}
