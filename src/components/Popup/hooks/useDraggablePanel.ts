import { useCallback, useEffect, useRef, useState } from 'react';

interface DragOffset {
  x: number;
  y: number;
}

export function useDraggablePanel(enabled: boolean, resetKey: boolean) {
  const [offset, setOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const origin = useRef<DragOffset>({ x: 0, y: 0 });
  const startPointer = useRef<DragOffset>({ x: 0, y: 0 });

  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [resetKey]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled || event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select')) return;

      dragging.current = true;
      startPointer.current = { x: event.clientX, y: event.clientY };
      origin.current = { ...offset };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [enabled, offset],
  );

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    const dx = event.clientX - startPointer.current.x;
    const dy = event.clientY - startPointer.current.y;
    setOffset({ x: origin.current.x + dx, y: origin.current.y + dy });
  }, []);

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return { offset, onPointerDown, onPointerMove, onPointerUp };
}
