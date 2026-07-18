import { useState, useRef, useEffect, useCallback, useId } from 'react';
import type { SelectProps, SelectOption } from './type/Select.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import '@/components/Select/css/Select.css';

export function Select(props: Readonly<SelectProps>) {
  const {
    options = [],
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = 'Seleccionar...',
    variant = 'primary',
    size = 'md',
    disabled = false,
    error = false,
    errorMessage,
    helperText,
    label,
    labelPosition = 'top',
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    name,
    showClearButton = false,
    clearable = false,
  } = props;

  const autoId = useId();
  const selectId = idProp ?? autoId;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const themeStyle = themeToStyle(resolveTheme(theme));

  const computedStyle: React.CSSProperties = {
    ...themeStyle,
    ...(width != null
      ? {
          width:
            typeof width === 'number' || /^\d+$/.test(String(width))
              ? `${width}px`
              : width,
        }
      : {}),
  };

  const selectedOption = options.find((o) => o.value === selectedValue);

  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && Boolean(selectedValue) && !disabled;

  const isFloating = labelPosition === 'floating';
  const isOutlined = labelPosition === 'outlined';
  const isLeft = labelPosition === 'left';
  const isLabelFloated = isFloating && (isOpen || Boolean(selectedValue));

  const classNames = [
    'glb-select',
    `glb-select--${variant}`,
    `glb-select--${size}`,
    fullWidth && 'glb-select--full-width',
    isFloating && 'glb-select--floating',
    isOutlined && 'glb-select--outlined',
    isLeft && 'glb-select--left',
    isLabelFloated && 'glb-select--label-floated',
    canClear && 'glb-select--clearable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerClasses = [
    'glb-select__trigger',
    isOpen && 'glb-select__trigger--open',
    error && 'glb-select__trigger--error',
  ]
    .filter(Boolean)
    .join(' ');

  const setValue = useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    const currentIdx = options.findIndex((o) => o.value === selectedValue && !o.disabled);
    setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
  }, [disabled, options, selectedValue]);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;
      setValue(option.value);
      closeDropdown();
    },
    [setValue, closeDropdown],
  );

  const handleClear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setValue('');
      closeDropdown();
    },
    [setValue, closeDropdown],
  );

  /* Clic fuera */
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      closeDropdown();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  /* Scroll opción resaltada al viewport */
  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    const el = optionRefs.current.get(highlightedIndex);
    el?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, highlightedIndex]);

  /* Teclado */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev + 1;
          while (next < options.length && options[next].disabled) next++;
          return next < options.length ? next : 0;
        });
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && options[next].disabled) next--;
          return next >= 0 ? next : options.length - 1;
        });
        break;
      }
      case 'Home': {
        e.preventDefault();
        const first = options.findIndex((o) => !o.disabled);
        setHighlightedIndex(first);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = options.findLastIndex((o) => !o.disabled);
        setHighlightedIndex(last);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectOption(options[highlightedIndex]);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        closeDropdown();
        break;
      }
      case 'Tab': {
        closeDropdown();
        break;
      }
    }
  }

  /* Type-ahead */
  const typeAheadRef = useRef({ query: '', timer: 0 as unknown as ReturnType<typeof setTimeout> });

  function handleTypeAhead(char: string) {
    const ta = typeAheadRef.current;
    clearTimeout(ta.timer);
    ta.query += char.toLowerCase();
    ta.timer = setTimeout(() => {
      ta.query = '';
    }, 500);

    const matchIdx = options.findIndex(
      (o) => !o.disabled && o.label.toLowerCase().startsWith(ta.query),
    );
    if (matchIdx >= 0) setHighlightedIndex(matchIdx);
  }

  const labelElement = label && (
    <label
      className={[
        'glb-select__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={selectId}
    >
      {label}
    </label>
  );

  const triggerBlock = (
    <div className="glb-select__trigger-wrap">
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        className={triggerClasses}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${selectId}-dropdown`}
        aria-label={typeof label === 'string' && !isFloating && !isOutlined ? label : undefined}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
      >
        {label && isFloating && labelElement}

        <span
          className={`glb-select__value${!selectedOption ? ' glb-select__placeholder' : ''}`}
        >
          {selectedOption ? selectedOption.label : (isFloating ? '' : placeholder)}
        </span>
      </button>

      <div className="glb-select__adornments">
        {canClear && (
          <button
            type="button"
            className={[
              'glb-select__clear',
              !showClear && 'glb-select__clear--hidden',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={handleClear}
            aria-label="Limpiar selección"
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
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <span className="glb-select__icon">
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
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {name && <input type="hidden" name={name} value={selectedValue} />}

      {isOpen && (
        <div
          ref={dropdownRef}
          id={`${selectId}-dropdown`}
          className="glb-select__dropdown"
          role="listbox"
          aria-label={typeof label === 'string' ? label : 'Opciones'}
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isHighlighted = index === highlightedIndex;
            const isDisabled = option.disabled;

            const optionClasses = [
              'glb-select__option',
              isSelected && 'glb-select__option--selected',
              isHighlighted && 'glb-select__option--highlighted',
              isDisabled && 'glb-select__option--disabled',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={option.value}
                ref={(el) => {
                  if (el) optionRefs.current.set(index, el);
                  else optionRefs.current.delete(index);
                }}
                className={optionClasses}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const fieldControl = isOutlined && label ? (
    <div className="glb-outlined-field glb-select__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body">{triggerBlock}</div>
    </div>
  ) : (
    triggerBlock
  );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-select__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldControl}
      </div>

      {(errorMessage || helperText) && (
        <span
          className={`glb-select__helper${error ? ' glb-select__helper--error' : ''}`}
        >
          {error ? errorMessage : helperText}
        </span>
      )}
    </div>
  );
}
