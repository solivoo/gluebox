import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { resolveTheme, themeToStyle } from '@/components/TextBox/theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import { ColorPickerPanel } from './ColorPickerPanel';
import { FALLBACK_HSV, DEFAULT_COLOR_PRESETS } from './colorPresets';
import { hexToHsv, hsvToHex, isCompleteHex, normalizeHex, type Hsv } from './colorMath';
import type { ColorPickerProps } from './type/ColorPicker.types';
import '@/components/ColorPicker/css/ColorPicker.css';

function widthStyle(width: string | number | undefined): CSSProperties | undefined {
  if (width == null) return undefined;
  const value =
    typeof width === 'number' || /^\d+$/.test(String(width)) ? `${width}px` : width;
  return { width: value };
}

/**
 * Campo de color con swatch, input hex y panel HSV en portal (sin chrome nativo del SO).
 */
export function ColorPicker(props: Readonly<ColorPickerProps>) {
  const {
    value: controlledValue,
    defaultValue = '',
    onChange,
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    placeholder = '#000000',
    helperText,
    error = false,
    errorMessage,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    name,
    presets,
    showClearButton,
    clearable,
  } = props;

  const autoId = useId();
  const pickerId = idProp ?? autoId;
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const committed = isControlled ? (controlledValue ?? '') : internalValue;
  const validHex = normalizeHex(committed) ?? '';

  const [draft, setDraft] = useState(validHex);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setDraft(validHex);
  }, [validHex]);

  /**
   * El HSV vive en estado porque el hex no puede representarlo entero: en grises
   * (s = 0) y en negro (v = 0) el matiz se pierde. Solo se resincroniza cuando el
   * hex llega desde afuera del panel (input, presets o prop `value`).
   */
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(validHex) ?? FALLBACK_HSV);
  const [syncedHex, setSyncedHex] = useState(validHex);

  if (validHex !== syncedHex) {
    setSyncedHex(validHex);
    if (validHex && validHex !== hsvToHex(hsv)) {
      const next = hexToHsv(validHex);
      if (next) setHsv(next);
    }
  }

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;
  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && Boolean(validHex) && !disabled;
  const presetList = presets ?? DEFAULT_COLOR_PRESETS;

  const isFloating = labelPosition === 'floating';
  const isOutlined = labelPosition === 'outlined';
  const isLeft = labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || isOpen || Boolean(validHex || draft));

  const themeStyle = themeToStyle(resolveTheme(theme));
  const computedStyle: CSSProperties = { ...themeStyle, ...widthStyle(width) };

  const commit = useCallback(
    (next: string) => {
      const normalized = next === '' ? '' : (normalizeHex(next) ?? validHex);
      if (!isControlled) setInternalValue(normalized);
      setDraft(normalized);
      if (normalized !== committed) onChange?.(normalized);
    },
    [committed, isControlled, onChange, validHex],
  );

  const applyHsv = useCallback(
    (next: Hsv) => {
      setHsv(next);
      commit(hsvToHex(next));
    },
    [commit],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const classNames = [
    'glb-colorpicker',
    `glb-colorpicker--${variant}`,
    `glb-colorpicker--${size}`,
    fullWidth && 'glb-colorpicker--full-width',
    hasError && 'glb-colorpicker--error',
    isFloating && 'glb-colorpicker--floating',
    isOutlined && 'glb-colorpicker--outlined',
    isLeft && 'glb-colorpicker--left',
    isLabelFloated && 'glb-colorpicker--label-floated',
    canClear && 'glb-colorpicker--clearable',
    disabled && 'glb-colorpicker--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelElement = label && (
    <label
      className={[
        'glb-colorpicker__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={pickerId}
    >
      {label}
    </label>
  );

  const field = (
    <div ref={wrapRef} className="glb-colorpicker__field">
      <button
        ref={triggerRef}
        type="button"
        className="glb-colorpicker__swatch"
        disabled={disabled}
        aria-label={label ? `${label}: abrir selector` : 'Abrir selector de color'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={`${pickerId}-panel`}
        onClick={() => {
          if (!disabled) setIsOpen((open) => !open);
        }}
      >
        <span
          className="glb-colorpicker__swatch-fill"
          style={{ background: validHex || 'transparent' }}
        />
      </button>

      {label && isFloating && labelElement}

      <input
        ref={inputRef}
        id={pickerId}
        name={name}
        className="glb-colorpicker__input"
        value={draft}
        placeholder={isFloating ? undefined : placeholder}
        disabled={disabled}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        maxLength={7}
        inputMode="text"
        aria-invalid={hasError || undefined}
        aria-describedby={displayMessage ? `${pickerId}-helper` : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          commit(draft);
        }}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          if (!isCompleteHex(next)) return;
          const normalized = normalizeHex(next);
          if (normalized) commit(normalized);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit(draft);
            setIsOpen(false);
          }
        }}
      />

      {canClear && (
        <button
          type="button"
          className={[
            'glb-colorpicker__clear',
            !showClear && 'glb-colorpicker__clear--hidden',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            commit('');
            inputRef.current?.focus();
          }}
          aria-label="Limpiar color"
          aria-hidden={!showClear}
          tabIndex={showClear ? -1 : undefined}
          disabled={!showClear}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );

  const fieldWrapper =
    isOutlined && label ? (
      <div className="glb-outlined-field glb-colorpicker__outlined-field">
        {labelElement}
        <div className="glb-outlined-field__body">{field}</div>
      </div>
    ) : (
      field
    );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-colorpicker__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldWrapper}
      </div>

      {displayMessage && (
        <span
          id={`${pickerId}-helper`}
          className={`glb-colorpicker__helper${hasError ? ' glb-colorpicker__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}

      <ColorPickerPanel
        isOpen={isOpen && !disabled}
        pickerId={pickerId}
        hsv={hsv}
        hex={validHex}
        variant={variant}
        presets={presetList}
        themeStyle={themeStyle}
        triggerRef={triggerRef}
        panelRef={panelRef}
        onHsvChange={applyHsv}
        onPreset={commit}
      />
    </div>
  );
}
