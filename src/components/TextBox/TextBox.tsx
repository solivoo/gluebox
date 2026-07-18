import { useState, useRef, useId, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { TextBoxProps } from './type/TextBox.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import { inputValueLength } from '@/shared/inputValueLength';
import { EyeIcon, EyeOffIcon } from './PasswordToggleIcons';
import '@/components/TextBox/css/TextBox.css';

export function TextBox(props: Readonly<TextBoxProps>) {
  const {
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    placeholder,
    helperText,
    error = false,
    errorMessage,
    iconLeft,
    iconRight,
    clearable = false,
    showClearButton,
    showPasswordToggle,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    value: controlledValue,
    defaultValue,
    onChange,
    type = 'text',
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const value = isControlled ? (controlledValue ?? '') : internalValue;
  const valueLength = inputValueLength(value);

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;

  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const hasLeftIcon = Boolean(iconLeft);
  const hasRightIcon = Boolean(iconRight);
  const showClear = canClear && valueLength > 0 && !disabled;
  const isPasswordField = type === 'password';
  const showPasswordToggleBtn =
    isPasswordField && showPasswordToggle !== false && !disabled;
  const inputType =
    isPasswordField && passwordVisible ? 'text' : type;

  const isFloating = labelPosition === 'floating';
  const isOutlined = labelPosition === 'outlined';
  const isLeft = labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || valueLength > 0);

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

  const classNames = [
    'glb-textbox',
    `glb-textbox--${variant}`,
    `glb-textbox--${size}`,
    fullWidth && 'glb-textbox--full-width',
    hasLeftIcon && 'glb-textbox--has-left-icon',
    hasRightIcon && 'glb-textbox--has-right-icon',
    canClear && 'glb-textbox--clearable',
    showPasswordToggleBtn && 'glb-textbox--password-toggle',
    hasError && 'glb-textbox--error',
    isFloating && 'glb-textbox--floating',
    isOutlined && 'glb-textbox--outlined',
    isLeft && 'glb-textbox--left',
    isLabelFloated && 'glb-textbox--label-floated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const emitChange = useCallback(
    (newValue: string) => {
      const input = inputRef.current;
      if (!input) return;
      onChange?.({
        target: { ...input, value: newValue },
        currentTarget: { ...input, value: newValue },
      } as ChangeEvent<HTMLInputElement>);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isControlled) setInternalValue('');
    const input = inputRef.current;
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeInputValueSetter?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      emitChange('');
      input.focus();
    }
  };

  const handlePasswordToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordVisible((visible) => !visible);
    inputRef.current?.focus();
  };

  const labelElement = label && (
    <label
      className={[
        'glb-textbox__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={inputId}
    >
      {label}
    </label>
  );

  const inputControl = (
    <>
      {iconLeft && (
        <span className="glb-textbox__icon glb-textbox__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {label && isFloating && labelElement}

      <input
        ref={inputRef}
        id={inputId}
        type={inputType}
        className="glb-textbox__input"
        value={value}
        placeholder={isFloating ? undefined : placeholder}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={displayMessage ? `${inputId}-helper` : undefined}
        onChange={handleChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocusProp?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlurProp?.(e);
        }}
        {...rest}
      />

      {canClear && (
        <button
          type="button"
          className={[
            'glb-textbox__clear',
            !showClear && 'glb-textbox__clear--hidden',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleClear}
          aria-label="Limpiar campo"
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

      {showPasswordToggleBtn && (
        <button
          type="button"
          className="glb-textbox__password-toggle"
          onClick={handlePasswordToggle}
          aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={passwordVisible}
          tabIndex={-1}
        >
          {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}

      {iconRight && (
        <span
          className="glb-textbox__icon glb-textbox__icon--right"
          aria-hidden="true"
        >
          {iconRight}
        </span>
      )}
    </>
  );

  const fieldWrapper = isOutlined && label ? (
    <div className="glb-outlined-field glb-textbox__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body glb-textbox__wrapper">{inputControl}</div>
    </div>
  ) : (
    <div className="glb-textbox__wrapper">{inputControl}</div>
  );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-textbox__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldWrapper}
      </div>

      {displayMessage && (
        <span
          id={`${inputId}-helper`}
          className={`glb-textbox__helper${hasError ? ' glb-textbox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
