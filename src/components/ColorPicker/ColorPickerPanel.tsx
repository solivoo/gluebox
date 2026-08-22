import { useCallback, useEffect, useRef } from 'react';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { useFloatingPosition } from '@/shared/useFloatingPosition';
import type { Hsv } from './colorMath';
import { hsvToRgb } from './colorMath';
import { hsvFromKey, type ColorPickerAxis } from './panelKeyboard';
import type { ColorPickerVariant } from './type/ColorPicker.types';

interface ColorPickerPanelProps {
  isOpen: boolean;
  pickerId: string;
  variant: ColorPickerVariant;
  hsv: Hsv;
  hex: string;
  presets: readonly string[];
  themeStyle?: CSSProperties;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onHsvChange: (hsv: Hsv) => void;
  onPreset: (hex: string) => void;
}

function ratioFromPointer(event: ReactPointerEvent<HTMLElement>): { x: number; y: number } {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
  return { x, y };
}

function hueFill(h: number): string {
  const { r, g, b } = hsvToRgb({ h, s: 1, v: 1 });
  return `rgb(${r}, ${g}, ${b})`;
}

export function ColorPickerPanel({
  isOpen,
  pickerId,
  variant,
  hsv,
  hex,
  presets,
  themeStyle,
  triggerRef,
  panelRef,
  onHsvChange,
  onPreset,
}: Readonly<ColorPickerPanelProps>) {
  const coords = useFloatingPosition(isOpen, triggerRef, panelRef);
  const dragging = useRef<ColorPickerAxis | null>(null);
  const svRef = useRef<HTMLDivElement>(null);
  const hasFocused = useRef(false);

  // Se enfoca recién con coords para no provocar un salto de scroll al abrir.
  useEffect(() => {
    if (!isOpen || !coords || hasFocused.current) return;
    hasFocused.current = true;
    svRef.current?.focus({ preventScroll: true });
  }, [isOpen, coords]);

  const onKeyDown = useCallback(
    (axis: ColorPickerAxis) => (event: ReactKeyboardEvent<HTMLElement>) => {
      const next = hsvFromKey(event.key, event.shiftKey, hsv, axis);
      if (!next) return;
      event.preventDefault();
      onHsvChange(next);
    },
    [hsv, onHsvChange],
  );

  const setSv = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const { x, y } = ratioFromPointer(event);
      onHsvChange({ ...hsv, s: x, v: 1 - y });
    },
    [hsv, onHsvChange],
  );

  const setHue = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const { x } = ratioFromPointer(event);
      onHsvChange({ ...hsv, h: x * 360 });
    },
    [hsv, onHsvChange],
  );

  const startDrag = (
    kind: ColorPickerAxis,
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = kind;
    if (kind === 'sv') setSv(event);
    else setHue(event);
  };

  const onMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragging.current === 'sv') setSv(event);
    if (dragging.current === 'hue') setHue(event);
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragging.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragging.current = null;
    }
  };

  if (!isOpen) return null;

  const hueColor = hueFill(hsv.h);

  return createPortal(
    <div
      ref={panelRef}
      id={`${pickerId}-panel`}
      className={[
        `glb-colorpicker--${variant}`,
        'glb-colorpicker__panel',
        'glb-colorpicker__panel--floating',
        coords && 'glb-colorpicker__panel--positioned',
      ]
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-label="Selector de color"
      style={{
        ...(themeStyle ?? {}),
        position: 'fixed',
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        visibility: coords ? 'visible' : 'hidden',
        zIndex: 10000,
      }}
    >
      <div
        ref={svRef}
        className="glb-colorpicker__sv"
        style={{ backgroundColor: hueColor }}
        role="slider"
        tabIndex={0}
        aria-label="Saturación y brillo"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(hsv.s * 100)}
        aria-valuetext={`Saturación ${Math.round(hsv.s * 100)}%, brillo ${Math.round(hsv.v * 100)}%`}
        onKeyDown={onKeyDown('sv')}
        onPointerDown={(e) => startDrag('sv', e)}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span
          className="glb-colorpicker__sv-thumb"
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
        />
      </div>

      <div
        className="glb-colorpicker__hue"
        role="slider"
        tabIndex={0}
        aria-label="Matiz"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hsv.h)}
        aria-valuetext={`${Math.round(hsv.h)} grados`}
        onKeyDown={onKeyDown('hue')}
        onPointerDown={(e) => startDrag('hue', e)}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="glb-colorpicker__hue-thumb" style={{ left: `${(hsv.h / 360) * 100}%` }} />
      </div>

      <div className="glb-colorpicker__meta">
        <span className="glb-colorpicker__swatch-lg" style={{ background: hex || 'transparent' }} />
        <code className="glb-colorpicker__hex">{hex || '—'}</code>
      </div>

      {presets.length > 0 && (
        <ul className="glb-colorpicker__presets">
          {presets.map((preset) => (
            <li key={preset}>
              <button
                type="button"
                className="glb-colorpicker__preset"
                style={{ background: preset }}
                aria-label={preset}
                onClick={() => onPreset(preset)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>,
    document.body,
  );
}
