import { useState, useId, useCallback } from 'react';
import type { RangeDateBoxProps } from './type/RangeDateBox.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { CalendarDropdown } from '../DateBox/CalendarDropdown';
import { CalendarIcon } from '../DateBox/CalendarIcons';
import { RangeCalendarDropdown } from './RangeCalendarDropdown';
import '@/components/RangeDateBox/css/RangeDateBox.css';

export function RangeDateBox(props: Readonly<RangeDateBoxProps>) {
  const {
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    displayMode = 'input',
    startValue,
    endValue,
    startDefaultValue,
    endDefaultValue,
    helperText,
    error = false,
    errorMessage,
    separator = '\u2014',
    clearable = false,
    min,
    max,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    onChange,
  } = props;

  const autoId = useId();
  const fieldId = `${autoId}-rangedatebox`;
  const isIconMode = displayMode === 'icon';

  const isStartControlled = startValue !== undefined;
  const isEndControlled = endValue !== undefined;

  const [internalStart, setInternalStart] = useState(startDefaultValue ?? '');
  const [internalEnd, setInternalEnd] = useState(endDefaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);

  const currentStart = isStartControlled ? (startValue ?? '') : internalStart;
  const currentEnd = isEndControlled ? (endValue ?? '') : internalEnd;

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;

  const hasValue = currentStart.length > 0 || currentEnd.length > 0;
  const showClear = clearable && hasValue && !disabled && !isIconMode;

  const isFloating = !isIconMode && labelPosition === 'floating';
  const isOutlined = !isIconMode && labelPosition === 'outlined';
  const isLeft = !isIconMode && labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || hasValue);

  const themeStyle = themeToStyle(resolveTheme(theme));

  const computedStyle: React.CSSProperties = {
    ...themeStyle,
    ...(width != null && !isIconMode
      ? {
          width:
            typeof width === 'number' || /^\d+$/.test(String(width))
              ? `${width}px`
              : width,
        }
      : {}),
  };

  const classNames = [
    'glb-rangedatebox',
    `glb-rangedatebox--${variant}`,
    `glb-rangedatebox--${size}`,
    isIconMode && 'glb-rangedatebox--icon-mode',
    fullWidth && !isIconMode && 'glb-rangedatebox--full-width',
    clearable && 'glb-rangedatebox--clearable',
    hasError && 'glb-rangedatebox--error',
    isFloating && 'glb-rangedatebox--floating',
    isOutlined && 'glb-rangedatebox--outlined',
    isLeft && 'glb-rangedatebox--left',
    isLabelFloated && 'glb-rangedatebox--label-floated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const emitChange = useCallback(
    (start: string, end: string) => {
      onChange?.({ start, end });
    },
    [onChange],
  );

  const handleStartChange = useCallback(
    (dateStr: string) => {
      if (!isStartControlled) setInternalStart(dateStr);
      emitChange(dateStr, isEndControlled ? (endValue ?? '') : internalEnd);
    },
    [isStartControlled, isEndControlled, endValue, internalEnd, emitChange],
  );

  const handleEndChange = useCallback(
    (dateStr: string) => {
      if (!isEndControlled) setInternalEnd(dateStr);
      emitChange(isStartControlled ? (startValue ?? '') : internalStart, dateStr);
    },
    [isStartControlled, isEndControlled, startValue, internalStart, emitChange],
  );

  const handleClear = () => {
    if (!isStartControlled) setInternalStart('');
    if (!isEndControlled) setInternalEnd('');
    emitChange('', '');
  };

  const labelElement = label && !isIconMode && (
    <label
      className={[
        'glb-rangedatebox__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={`${fieldId}-start`}
    >
      {label}
    </label>
  );

  const fieldsInner = (
    <div className="glb-rangedatebox__fields">
      {label && isFloating && labelElement}

      {isIconMode ? (
        <RangeCalendarDropdown
          startValue={currentStart}
          endValue={currentEnd}
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
          min={min}
          max={max}
          disabled={disabled}
          dropdownThemeStyle={themeStyle}
          iconAriaLabel={label ?? 'Seleccionar rango de fechas'}
        />
      ) : (
        <>
          <div className="glb-rangedatebox__field">
            <CalendarDropdown
              classPrefix="glb-rangedatebox"
              value={currentStart}
              onChange={handleStartChange}
              min={min}
              max={currentEnd || max}
              disabled={disabled}
              dropdownThemeStyle={themeStyle}
              rangeStart={currentStart}
              rangeEnd={currentEnd}
            />
            <span className="glb-rangedatebox__calendar-icon" aria-hidden="true">
              <CalendarIcon />
            </span>
          </div>

          <span className="glb-rangedatebox__separator" aria-hidden="true">
            {separator}
          </span>

          <div className="glb-rangedatebox__field">
            <CalendarDropdown
              classPrefix="glb-rangedatebox"
              value={currentEnd}
              onChange={handleEndChange}
              min={currentStart || min}
              max={max}
              disabled={disabled}
              dropdownThemeStyle={themeStyle}
              rangeStart={currentStart}
              rangeEnd={currentEnd}
            />
            <span className="glb-rangedatebox__calendar-icon" aria-hidden="true">
              <CalendarIcon />
            </span>
          </div>
        </>
      )}

      {showClear && (
        <button
          type="button"
          className="glb-rangedatebox__clear"
          onClick={handleClear}
          aria-label="Limpiar rango de fechas"
          tabIndex={-1}
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
    </div>
  );

  const fieldControl = isOutlined && label ? (
    <div className="glb-outlined-field glb-rangedatebox__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body">{fieldsInner}</div>
    </div>
  ) : (
    fieldsInner
  );

  return (
    <div
      className={classNames}
      style={computedStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="group"
    >
      <div className="glb-rangedatebox__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldControl}
      </div>

      {displayMessage && (
        <span
          id={`${fieldId}-helper`}
          className={`glb-rangedatebox__helper${hasError ? ' glb-rangedatebox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
