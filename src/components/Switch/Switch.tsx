import { useId, useState } from 'react';
import type { CSSProperties, ChangeEvent } from 'react';
import type { SwitchProps } from './type/Switch.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/Switch/css/Switch.css';

export function Switch(props: Readonly<SwitchProps>) {
  const {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    label,
    labelPosition = 'right',
    size = 'md',
    loading = false,
    disabled = false,
    helperText,
    error = false,
    errorMessage,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;
  const isDisabled = disabled || loading;

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
    'glb-switch',
    `glb-switch--${size}`,
    `glb-switch--label-${labelPosition}`,
    checked && 'glb-switch--checked',
    isDisabled && 'glb-switch--disabled',
    loading && 'glb-switch--loading',
    hasError && 'glb-switch--error',
    fullWidth && 'glb-switch--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(event.target.checked);
    onChange?.(event.target.checked);
  };

  return (
    <div className={classNames} style={computedStyle}>
      <label className="glb-switch__row" htmlFor={inputId}>
        <span className="glb-switch__control">
          <input
            id={inputId}
            type="checkbox"
            role="switch"
            className="glb-switch__input"
            checked={checked}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={
              displayMessage ? `${inputId}-helper` : ariaDescribedBy
            }
            onChange={handleChange}
            {...rest}
          />
          <span className="glb-switch__track" aria-hidden="true">
            <span className="glb-switch__thumb">
              {loading && <span className="glb-switch__loader" />}
            </span>
          </span>
        </span>

        {label != null && <span className="glb-switch__label">{label}</span>}
      </label>

      {displayMessage != null && (
        <span
          id={`${inputId}-helper`}
          className={[
            'glb-switch__helper',
            hasError && 'glb-switch__helper--error',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}
