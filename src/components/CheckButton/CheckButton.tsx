import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { CheckButtonProps } from './type/CheckButton.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/CheckButton/css/CheckButton.css';

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12l5 5L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckButton(props: Readonly<CheckButtonProps>) {
  const {
    children,
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    indeterminate = false,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    type = 'button',
    onClick: onClickProp,
    ...rest
  } = props;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? Boolean(controlledChecked) : internalChecked;

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
    'glb-checkbtn',
    `glb-checkbtn--${variant}`,
    `glb-checkbtn--${size}`,
    isChecked && 'glb-checkbtn--checked',
    indeterminate && 'glb-checkbtn--indeterminate',
    fullWidth && 'glb-checkbtn--full-width',
    disabled && 'glb-checkbtn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, isControlled, onChange]);

  const ariaChecked = indeterminate ? 'mixed' : isChecked;

  return (
    <button
      type={type}
      role="checkbox"
      className={classNames}
      style={computedStyle}
      disabled={disabled}
      aria-checked={ariaChecked}
      aria-disabled={disabled}
      {...rest}
      onClick={(event) => {
        handleClick();
        onClickProp?.(event);
      }}
    >
      <span className="glb-checkbtn__box" aria-hidden="true">
        {indeterminate ? <IndeterminateIcon /> : isChecked ? <CheckIcon /> : null}
      </span>
      <span className="glb-checkbtn__label">{children}</span>
    </button>
  );
}
