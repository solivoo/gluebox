import { useState, useRef, useId, useCallback } from 'react';
import type { TextAreaProps } from './type/TextArea.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import '@/components/TextArea/css/TextArea.css';

export function TextArea(props: Readonly<TextAreaProps>) {
  const {
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    placeholder,
    helperText,
    error = false,
    errorMessage,
    clearable = false,
    showClearButton,
    rows = 4,
    resize = 'vertical',
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    value: controlledValue,
    defaultValue,
    onChange,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    style: styleProp,
    ...rest
  } = props;

  const autoId = useId();
  const textareaId = idProp ?? autoId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue != null ? String(defaultValue) : '',
  );
  const [isFocused, setIsFocused] = useState(false);
  const rawValue = isControlled ? controlledValue : internalValue;
  const value =
    typeof rawValue === 'string'
      ? rawValue
      : Array.isArray(rawValue)
        ? rawValue.join('\n')
        : String(rawValue ?? '');

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;
  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && value.length > 0 && !disabled;

  const isFloating = labelPosition === 'floating';
  const isOutlined = labelPosition === 'outlined';
  const isLeft = labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || value.length > 0);

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
    ...styleProp,
  };

  const classNames = [
    'glb-textarea',
    `glb-textarea--${variant}`,
    `glb-textarea--${size}`,
    fullWidth && 'glb-textarea--full-width',
    canClear && 'glb-textarea--clearable',
    hasError && 'glb-textarea--error',
    isFloating && 'glb-textarea--floating',
    isOutlined && 'glb-textarea--outlined',
    isLeft && 'glb-textarea--left',
    isLabelFloated && 'glb-textarea--label-floated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    const textarea = textareaRef.current;
    if (textarea) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value',
      )?.set;
      nativeSetter?.call(textarea, '');
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
    }
  };

  const labelElement = label && (
    <label
      className={[
        'glb-textarea__label',
        isOutlined && 'glb-outlined-field__legend',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={textareaId}
    >
      {label}
    </label>
  );

  const fieldControl = (
    <>
      {label && isFloating && labelElement}

      <textarea
        ref={textareaRef}
        id={textareaId}
        className="glb-textarea__textarea"
        value={value}
        rows={rows}
        style={{ resize }}
        placeholder={isFloating ? undefined : placeholder}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={displayMessage ? `${textareaId}-helper` : undefined}
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
            'glb-textarea__clear',
            !showClear && 'glb-textarea__clear--hidden',
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
    </>
  );

  const fieldWrapper = isOutlined && label ? (
    <div className="glb-outlined-field glb-textarea__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body glb-textarea__wrapper">{fieldControl}</div>
    </div>
  ) : (
    <div className="glb-textarea__wrapper">{fieldControl}</div>
  );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-textarea__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldWrapper}
      </div>

      {displayMessage && (
        <span
          id={`${textareaId}-helper`}
          className={`glb-textarea__helper${hasError ? ' glb-textarea__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
