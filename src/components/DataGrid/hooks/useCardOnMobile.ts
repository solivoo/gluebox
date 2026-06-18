import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

const DEFAULT_BREAKPOINT = 640;

/**
 * Detecta si el contenedor del grid es más estrecho que el breakpoint.
 * Usa el ancho real del componente (no el viewport), útil en playgrounds y paneles laterales.
 */
export function useCardOnMobile(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
  breakpoint = DEFAULT_BREAKPOINT,
): boolean {
  const [isNarrow, setIsNarrow] = useState(false);

  useLayoutEffect(() => {
    if (!enabled) {
      setIsNarrow(false);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const evaluate = () => {
      setIsNarrow(element.getBoundingClientRect().width <= breakpoint);
    };

    evaluate();

    const observer = new ResizeObserver(() => evaluate());
    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, breakpoint, containerRef]);

  return enabled && isNarrow;
}
