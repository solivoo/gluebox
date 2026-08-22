import type { Hsv } from './colorMath';

export const DEFAULT_COLOR_PRESETS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#1e293b',
  '#64748b',
  '#e2e8f0',
  '#ffffff',
] as const;

export const FALLBACK_HSV: Hsv = { h: 220, s: 0.65, v: 0.9 };
