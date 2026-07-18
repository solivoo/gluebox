import { useState, useId, useCallback } from 'react';
import type { DateBoxProps } from './type/DateBox.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { CalendarDropdown } from './CalendarDropdown';
import { CalendarIcon } from './CalendarIcons';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import '@/components/DateBox/css/DateBox.css';

export function DateBox(props: Readonly<DateBoxProps>) {
  const {
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    displayMode = 'input',
    helperText,
    error = false,
    errorMessage,
    clearable = false,
    showClearButton,
    disabled = false,
    fullWidth = false,
    width,
    min,
    max,
    theme,
    className,
    id: idProp,
    value: controlledValue,
    defaultValue,
    onChange,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;
  const isIconMode = displayMode === 'icon';

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const value = isControlled ? (controlledValue ?? '') : internalValue;

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;

  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && value.length > 0 && !disabled && !isIconMode;

  const isFloating = !isIconMode && labelPosition === 'floating';
  const isOutlined = !isIconMode && labelPosition === 'outlined';
  const isLeft = !isIconMode && labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || value.length > 0);

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
    'glb-datebox',
    `glb-datebox--${variant}`,
    `glb-datebox--${size}`,
    isIconMode && 'glb-datebox--icon-mode',
    fullWidth && !isIconMode && 'glb-datebox--full-width',
    canClear && 'glb-datebox--clearable',
    hasError && 'glb-datebox--error',
    isFloating && 'glb-datebox--floating',
    isOutlined && 'glb-datebox--outlined',
    isLeft && 'glb-datebox--left',
    isLabelFloated && 'glb-datebox--label-floated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleDateChange = useCallback(
    (dateStr: string) => {
      if (!isControlled) setInternalValue(dateStr);
      const syntheticEvent = {
        target: { value: dateStr, name: rest.name },
        currentTarget: { value: dateStr },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    },
    [isControlled, onChange, rest.name],
  );

  const handleClear = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (!isControlled) setInternalValue('');
    const syntheticEvent = {
      target: { value: '', name: rest.name },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(true);
      onFocusProp?.(e as unknown as React.FocusEvent<HTMLInputElement>);
    },
    [onFocusProp],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false);
      onBlurProp?.(e as unknown as React.FocusEvent<HTMLInputElement>);
    },
    [onBlurProp],
  );

  const labelElement = label && !isIconMode && (
    <label
      className={[
        'glb-datebox__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={inputId}
    >
      {label}
    </label>
  );

  const fieldInner = (
    <div className="glb-datebox__wrapper">
      {label && isFloating && labelElement}

      <div className="glb-datebox__control">
        <CalendarDropdown
          value={value}
          onChange={handleDateChange}
          min={min}
          max={max}
          disabled={disabled}
          triggerMode={isIconMode ? 'icon' : 'input'}
          dropdownThemeStyle={themeStyle}
          iconAriaLabel={label ?? 'Seleccionar fecha'}
        />

        {!isIconMode && (
          <div className="glb-datebox__adornments">
            {canClear && (
              <button
                type="button"
                className={[
                  'glb-datebox__clear',
                  !showClear && 'glb-datebox__clear--hidden',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={handleClear}
                aria-label="Limpiar fecha"
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

            <span className="glb-datebox__calendar-icon">
              <CalendarIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const fieldControl = isOutlined && label ? (
    <div className="glb-outlined-field glb-datebox__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body">{fieldInner}</div>
    </div>
  ) : (
    fieldInner
  );

  return (
    <div
      className={classNames}
      style={computedStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="group"
    >
      <div className="glb-datebox__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldControl}
      </div>

      {displayMessage && (
        <span
          id={`${inputId}-helper`}
          className={`glb-datebox__helper${hasError ? ' glb-datebox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
