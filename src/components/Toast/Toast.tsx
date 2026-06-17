import { useId } from 'react';
import type { ToastPosition, ToastProps, ToastVariant } from './type/Toast.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { useToastItemLifecycle } from './hooks/useToastItemLifecycle';
import '@/components/Toast/css/Toast.css';

function CloseIcon() {
  return (
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
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function roleForVariant(variant: ToastVariant): 'status' | 'alert' {
  return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
}

interface ToastShellProps extends ToastProps {
  exiting?: boolean;
  showProgress?: boolean;
  duration?: number;
  paused?: boolean;
  progressKey?: number;
  progressDurationMs?: number;
  exitFromBottom?: boolean;
  pauseHandlers?: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

export function Toast(props: Readonly<ToastShellProps>) {
  const {
    title,
    children,
    variant = 'default',
    showCloseButton = true,
    showProgress = false,
    duration = 0,
    onClose,
    theme,
    className,
    id: idProp,
    exiting = false,
    paused = false,
    progressKey = 0,
    progressDurationMs = duration,
    exitFromBottom = false,
    pauseHandlers,
  } = props;

  const autoId = useId();
  const titleId = `${idProp ?? autoId}-title`;
  const themeStyle = themeToStyle(resolveTheme(theme));

  const classNames = [
    'glb-toast',
    `glb-toast--${variant}`,
    exiting && 'glb-toast--exit',
    exiting && exitFromBottom && 'glb-toast--exit-bottom',
    paused && 'glb-toast--paused',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role={roleForVariant(variant)}
      aria-live="polite"
      aria-atomic="true"
      aria-labelledby={title ? titleId : undefined}
      style={themeStyle}
      {...pauseHandlers}
    >
      <div className="glb-toast__main">
        <div className="glb-toast__accent" aria-hidden />
        <div className="glb-toast__content">
          {title && (
            <div id={titleId} className="glb-toast__title">
              {title}
            </div>
          )}
          {children && <div className="glb-toast__body">{children}</div>}
        </div>
        {showCloseButton && onClose && (
          <button
            type="button"
            className="glb-toast__close"
            onClick={onClose}
            aria-label="Cerrar notificación"
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {showProgress && duration > 0 && !exiting && (
        <div
          key={progressKey}
          className="glb-toast__progress"
          style={{ animationDuration: `${progressDurationMs}ms` }}
          aria-hidden
        />
      )}
    </div>
  );
}

export interface ToastItemViewProps {
  id: string;
  title?: React.ReactNode;
  message?: React.ReactNode;
  variant: ToastVariant;
  showCloseButton: boolean;
  showProgress: boolean;
  theme?: ToastProps['theme'];
  duration: number;
  exiting: boolean;
  position: ToastPosition;
  onRequestExit: () => void;
  onRemove: () => void;
}

export function ToastItemView(props: Readonly<ToastItemViewProps>) {
  const {
    id,
    title,
    message,
    variant,
    showCloseButton,
    showProgress,
    theme,
    duration,
    exiting,
    position,
    onRequestExit,
    onRemove,
  } = props;

  const { paused, progressKey, progressDurationMs, pauseHandlers } = useToastItemLifecycle({
    duration,
    exiting,
    onRemove,
    onRequestExit,
  });

  const exitFromBottom = position.startsWith('bottom');

  return (
    <Toast
      id={id}
      title={title}
      variant={variant}
      showCloseButton={showCloseButton}
      showProgress={showProgress}
      duration={duration}
      onClose={onRequestExit}
      theme={theme}
      exiting={exiting}
      paused={paused}
      progressKey={progressKey}
      progressDurationMs={progressDurationMs}
      exitFromBottom={exitFromBottom}
      pauseHandlers={pauseHandlers}
    >
      {message}
    </Toast>
  );
}
