import { useRef, useCallback } from 'react';
import { TextBox } from '@/components/TextBox/TextBox';
import type { NumberBoxProps } from './type/NumberBox.types';
import '@/components/NumberBox/css/NumberBox.css';

function decimalsOf(n: number): number {
  const s = String(n);
  const dot = s.indexOf('.');
  return dot === -1 ? 0 : s.length - dot - 1;
}

function SpinChevron({ direction }: Readonly<{ direction: 1 | -1 }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === 1 ? (
        <polyline points="6 15 12 9 18 15" />
      ) : (
        <polyline points="6 9 12 15 18 9" />
      )}
    </svg>
  );
}

/**
 * Campo numérico basado en TextBox: hereda variantes, labels, temas y estados,
 * reemplaza los spinners nativos del navegador por botones estilados y
 * clampea el valor a `min`/`max` al usar los botones.
 */
export function NumberBox(props: Readonly<NumberBoxProps>) {
  const {
    step = 1,
    min,
    max,
    showSpinButtons = true,
    disabled = false,
    className,
    ...rest
  } = props;

  const hostRef = useRef<HTMLDivElement>(null);

  const stepBy = useCallback(
    (direction: 1 | -1) => {
      const input = hostRef.current?.querySelector<HTMLInputElement>(
        'input.glb-textbox__input',
      );
      if (!input || input.disabled || input.readOnly) return;

      const current = input.value === '' ? NaN : Number(input.value);
      const base = Number.isFinite(current) ? current : 0;
      const precision = Math.max(
        decimalsOf(step),
        Number.isFinite(current) ? decimalsOf(current) : 0,
      );

      let next = Number((base + direction * step).toFixed(precision));
      if (min !== undefined) next = Math.max(next, min);
      if (max !== undefined) next = Math.min(next, max);

      // Setter nativo + evento input: React ve el cambio y dispara onChange
      // (el mismo truco que usa TextBox en su botón de limpiar).
      const setValue = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setValue?.call(input, String(next));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    },
    [step, min, max],
  );

  const spinButtons = showSpinButtons ? (
    <span className="glb-numberbox__spin">
      <button
        type="button"
        className="glb-numberbox__spin-btn"
        tabIndex={-1}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => stepBy(1)}
      >
        <SpinChevron direction={1} />
      </button>
      <button
        type="button"
        className="glb-numberbox__spin-btn"
        tabIndex={-1}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => stepBy(-1)}
      >
        <SpinChevron direction={-1} />
      </button>
    </span>
  ) : undefined;

  return (
    <div ref={hostRef} className="glb-numberbox-host">
      <TextBox
        {...rest}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={['glb-numberbox', className].filter(Boolean).join(' ')}
        iconRight={spinButtons}
      />
    </div>
  );
}
