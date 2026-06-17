import { useState, useId, useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { OptionGroupProps } from './type/OptionGroup.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/OptionGroup/css/OptionGroup.css';

export function OptionGroup(props: Readonly<OptionGroupProps>) {
  const {
    options = [],
    value: controlledValue,
    defaultValue,
    onChange,
    name,
    layout = 'vertical',
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    helperText,
    error = false,
    errorMessage,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
  } = props;

  const autoId = useId();
  const groupId = idProp ?? autoId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selected = isControlled ? (controlledValue ?? '') : internalValue;

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;
  const isLeft = labelPosition === 'left';

  const themeStyle = themeToStyle(resolveTheme(theme));

  const computedStyle: CSSProperties = {
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
    'glb-optiongroup',
    `glb-optiongroup--${variant}`,
    `glb-optiongroup--${size}`,
    `glb-optiongroup--${layout}`,
    fullWidth && 'glb-optiongroup--full-width',
    isLeft && 'glb-optiongroup--left',
    hasError && 'glb-optiongroup--error',
    disabled && 'glb-optiongroup--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectOption = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const labelEl = label ? (
    <span className="glb-optiongroup__label" id={`${groupId}-label`}>
      {label}
    </span>
  ) : null;

  const optionsEl = (
    <div
      className="glb-optiongroup__options"
      role="radiogroup"
      aria-labelledby={label ? `${groupId}-label` : undefined}
      aria-invalid={hasError || undefined}
      aria-disabled={disabled || undefined}
    >
      {options.map((option) => {
        const isSelected = selected === option.value;
        const isDisabled = disabled || option.disabled;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={name}
            className={[
              'glb-optiongroup__option',
              isSelected && 'glb-optiongroup__option--selected',
              isDisabled && 'glb-optiongroup__option--disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => !isDisabled && selectOption(option.value)}
          >
            {layout !== 'segmented' && (
              <span className="glb-optiongroup__indicator" aria-hidden="true">
                <span className="glb-optiongroup__indicator-dot" />
              </span>
            )}
            <span className="glb-optiongroup__option-label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={classNames} style={computedStyle} id={groupId}>
      {isLeft ? (
        <div className="glb-optiongroup__row">
          {labelEl}
          <div className="glb-optiongroup__field">
            {optionsEl}
            {displayMessage && (
              <span className="glb-optiongroup__helper" role={hasError ? 'alert' : undefined}>
                {displayMessage}
              </span>
            )}
          </div>
        </div>
      ) : (
        <>
          {labelEl}
          {optionsEl}
          {displayMessage && (
            <span className="glb-optiongroup__helper" role={hasError ? 'alert' : undefined}>
              {displayMessage}
            </span>
          )}
        </>
      )}
    </div>
  );
}
