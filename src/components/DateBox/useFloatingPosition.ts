import { useLayoutEffect, useState, type RefObject } from 'react';

const VIEWPORT_MARGIN = 8;
const GAP = 6;

export interface FloatingCoords {
  top: number;
  left: number;
  maxHeight?: number;
}

export function computeFloatingPosition(
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
): FloatingCoords {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const dropdownWidth = dropdownRect.width;
  const dropdownHeight = dropdownRect.height;

  const spaceBelow = vh - triggerRect.bottom - VIEWPORT_MARGIN;
  const spaceAbove = triggerRect.top - VIEWPORT_MARGIN;

  let top: number;
  let maxHeight: number | undefined;

  if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
    top = triggerRect.bottom + GAP;
    if (top + dropdownHeight > vh - VIEWPORT_MARGIN) {
      maxHeight = Math.max(120, vh - top - VIEWPORT_MARGIN);
    }
  } else {
    top = triggerRect.top - GAP - dropdownHeight;
    if (top < VIEWPORT_MARGIN) {
      top = VIEWPORT_MARGIN;
      maxHeight = Math.max(120, triggerRect.top - GAP - VIEWPORT_MARGIN);
    }
  }

  let left = triggerRect.left;

  if (left + dropdownWidth > vw - VIEWPORT_MARGIN) {
    left = triggerRect.right - dropdownWidth;
  }
  if (left + dropdownWidth > vw - VIEWPORT_MARGIN) {
    left = vw - VIEWPORT_MARGIN - dropdownWidth;
  }
  if (left < VIEWPORT_MARGIN) {
    left = VIEWPORT_MARGIN;
  }

  return { top, left, maxHeight };
}

export function useFloatingPosition(
  isOpen: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
): FloatingCoords | null {
  const [coords, setCoords] = useState<FloatingCoords | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setCoords(null);
      return;
    }

    const update = () => {
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;
      if (!trigger || !dropdown) return;

      setCoords(computeFloatingPosition(
        trigger.getBoundingClientRect(),
        dropdown.getBoundingClientRect(),
      ));
    };

    update();

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen, triggerRef, dropdownRef]);

  return coords;
}
