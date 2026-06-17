import type { ButtonProps } from './type/Button.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/Button/css/Button.css';

export function Button(props: Readonly<ButtonProps>) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    loading = false,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    type = 'button',
    ...rest
  } = props;

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
    'glb-btn',
    `glb-btn--${variant}`,
    `glb-btn--${size}`,
    fullWidth && 'glb-btn--full-width',
    (disabled || loading) && 'glb-btn--disabled',
    loading && 'glb-btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      style={computedStyle}
      {...rest}
    >
      {loading && <span className="glb-btn__spinner" aria-hidden="true" />}
      {!loading && iconLeft && (
        <span className="glb-btn__icon glb-btn__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span className="glb-btn__label">{children}</span>
      {!loading && iconRight && (
        <span className="glb-btn__icon glb-btn__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
