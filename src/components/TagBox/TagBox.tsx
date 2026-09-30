import { useState, useRef, useId, useCallback, useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import type { TagBoxProps } from './type/TagBox.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import '@/components/TagBox/css/TagBox.css';

export function TagBox(props: Readonly<TagBoxProps>) {
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
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    value: controlledValue,
    defaultValue,
    onChange,
    maxTags,
    allowDuplicates = false,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue ?? []);
  const [draft, setDraft] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const tags = useMemo(
    () => (isControlled ? (controlledValue ?? []) : internalTags),
    [isControlled, controlledValue, internalTags],
  );

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;

  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && tags.length > 0 && !disabled;

  const isFloating = labelPosition === 'floating';
  const isOutlined = labelPosition === 'outlined';
  const isLeft = labelPosition === 'left';
  const isLabelFloated = isFloating && (isFocused || tags.length > 0);

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
    'glb-tagbox',
    `glb-tagbox--${variant}`,
    `glb-tagbox--${size}`,
    fullWidth && 'glb-tagbox--full-width',
    canClear && 'glb-tagbox--clearable',
    hasError && 'glb-tagbox--error',
    isFloating && 'glb-tagbox--floating',
    isOutlined && 'glb-tagbox--outlined',
    isLeft && 'glb-tagbox--left',
    isLabelFloated && 'glb-tagbox--label-floated',
    disabled && 'glb-tagbox--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const emitTags = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const commitTag = useCallback(
    (raw: string) => {
      const tag = raw.trim();
      if (!tag) return;
      if (disabled) return;
      if (maxTags != null && tags.length >= maxTags) return;
      if (!allowDuplicates && tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        return;
      }
      emitTags([...tags, tag]);
    },
    [tags, maxTags, allowDuplicates, disabled, emitTags],
  );

  const removeTag = useCallback(
    (index: number) => {
      if (disabled) return;
      emitTags(tags.filter((_, i) => i !== index));
    },
    [tags, disabled, emitTags],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commitTag(draft);
      setDraft('');
      return;
    }
    if (event.key === 'Backspace' && draft === '' && tags.length > 0 && !disabled) {
      emitTags(tags.slice(0, -1));
      return;
    }
    if (event.key === 'Escape') {
      setDraft('');
      return;
    }
    onKeyDownProp?.(event);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    emitTags([]);
    inputRef.current?.focus();
  };

  const labelElement = label && (
    <label
      className={[
        'glb-tagbox__label',
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
    <div className="glb-tagbox__control">
      {label && isFloating && labelElement}

      {tags.map((tag, index) => (
        <span key={`${tag}-${index}`} className="glb-tagbox__tag">
          <span className="glb-tagbox__tag-text">{tag}</span>
          <button
            type="button"
            className="glb-tagbox__tag-remove"
            onClick={() => removeTag(index)}
            aria-label={`Eliminar tag ${tag}`}
            disabled={disabled}
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}

      <input
        ref={inputRef}
        id={inputId}
        type="text"
        className="glb-tagbox__input"
        value={draft}
        placeholder={isFloating ? undefined : placeholder}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={displayMessage ? `${inputId}-helper` : undefined}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
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
            'glb-tagbox__clear',
            !showClear && 'glb-tagbox__clear--hidden',
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
    </div>
  );

  const fieldWrapper = isOutlined && label ? (
    <div className="glb-outlined-field glb-tagbox__outlined-field">
      {labelElement}
      <div className="glb-outlined-field__body glb-tagbox__wrapper">{inputControl}</div>
    </div>
  ) : (
    <div className="glb-tagbox__wrapper">{inputControl}</div>
  );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-tagbox__row">
        {label && !isFloating && !isOutlined && labelElement}
        {fieldWrapper}
      </div>

      {displayMessage && (
        <span
          id={`${inputId}-helper`}
          className={`glb-tagbox__helper${hasError ? ' glb-tagbox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
