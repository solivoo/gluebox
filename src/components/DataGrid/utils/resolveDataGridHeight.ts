import { isDimensionSet, resolveDimension } from './gridUtils';

export type DataGridHeightMode = 'auto' | 'max' | 'fixed';

export interface ResolveDataGridHeightOptions {
  /** Prop height del grid */
  height?: string | number;
  /** Prop maxHeight del grid */
  maxHeight?: string | number;
  /** Virtualización activa (requiere viewport medible) */
  virtualized: boolean;
  /** Hay summary y/o paginación bajo el viewport */
  hasChrome: boolean;
}

export interface ResolvedDataGridHeight {
  mode: DataGridHeightMode;
  /** CSS height (modo fixed) */
  height?: string;
  /** CSS max-height (modo max / techo en fit-content) */
  maxHeight?: string;
  /** Dónde aplicar el tamaño */
  applyTo: 'surface' | 'viewport';
}

/**
 * Resuelve altura del DataGrid.
 *
 * - Sin virtualización (fit-content): crece con el contenido real.
 *   `height` y `maxHeight` actúan como techo (maxHeight CSS).
 *   Prioridad del techo: `height` > `maxHeight`.
 * - Con virtualización: altura fija (`height` ?? `maxHeight` ?? 420px).
 */
export function resolveDataGridHeight(
  options: ResolveDataGridHeightOptions,
): ResolvedDataGridHeight {
  const { height, maxHeight, virtualized, hasChrome } = options;
  const applyTo = hasChrome ? 'surface' : 'viewport';
  const heightSet = isDimensionSet(height);
  const maxSet = isDimensionSet(maxHeight);

  if (virtualized) {
    const fixed =
      (heightSet ? resolveDimension(height) : undefined) ??
      (maxSet ? resolveDimension(maxHeight) : undefined) ??
      '420px';
    return { mode: 'fixed', height: fixed, applyTo };
  }

  // Fit-content: height es techo (compat 0.1.6), no altura fija.
  if (heightSet || maxSet) {
    const ceiling = heightSet
      ? resolveDimension(height)
      : resolveDimension(maxHeight);
    return { mode: 'max', maxHeight: ceiling, applyTo };
  }

  return { mode: 'auto', applyTo };
}

/**
 * Estima un alto de viewport solo para tests / hints.
 * En runtime fit-content usa altura real del DOM (CSS), no esta fórmula.
 */
export function estimateViewportHeightPx(options: {
  rowCount: number;
  rowHeight: number;
  headerHeight?: number;
  emptyBodyHeight?: number;
}): number {
  const {
    rowCount,
    rowHeight,
    headerHeight = rowHeight,
    emptyBodyHeight = 80,
  } = options;
  const body =
    rowCount <= 0 ? emptyBodyHeight : rowCount * rowHeight;
  return headerHeight + body;
}
