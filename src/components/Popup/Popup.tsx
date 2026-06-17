import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/Button';
import { dimensionStyle } from '@/components/shared/resolveDimension';
import type { PopupProps } from './type/Popup.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import { useDraggablePanel } from './hooks/useDraggablePanel';
import '@/components/Popup/css/Popup.css';

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
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

export function Popup(props: Readonly<PopupProps>) {
  const {
    open,
    onClose,
    title,
    children,
    width = 480,
    height,
    actions = [],
    footer,
    footerAlign = 'right',
    draggable = true,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    theme,
    className,
    id: idProp,
  } = props;

  const autoId = useId();
  const titleId = `${idProp ?? autoId}-title`;
  const panelRef = useRef<HTMLDivElement>(null);
  const themeStyle = themeToStyle(resolveTheme(theme));
  const { offset, onPointerDown, onPointerMove, onPointerUp } = useDraggablePanel(
    draggable,
    open,
  );

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const panelStyle = {
    ...themeStyle,
    ...dimensionStyle(width, height),
    '--popup-drag-x': `${offset.x}px`,
    '--popup-drag-y': `${offset.y}px`,
  } as CSSProperties;

  const classNames = ['glb-popup', className].filter(Boolean).join(' ');
  const footerClass = [
    'glb-popup__footer',
    `glb-popup__footer--${footerAlign}`,
  ].join(' ');

  const showFooter = Boolean(footer) || actions.length > 0;

  return createPortal(
    <div className={classNames} style={themeStyle}>
      <button
        type="button"
        className="glb-popup__overlay"
        aria-label="Cerrar diálogo"
        onClick={closeOnOverlayClick ? onClose : undefined}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        className={`glb-popup__panel${draggable ? ' glb-popup__panel--draggable' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className="glb-popup__header"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {title && (
            <h2 id={titleId} className="glb-popup__title">
              {title}
            </h2>
          )}
          {showCloseButton && (
            <button
              type="button"
              className="glb-popup__close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>
          )}
        </header>

        <div className="glb-popup__body">{children}</div>

        {showFooter && (
          <footer className={footerClass}>
            {footer ??
              actions.map((action, index) => (
                <Button
                  key={action.id ?? `${action.label}-${index}`}
                  variant={action.variant ?? (index === actions.length - 1 ? 'primary' : 'outline')}
                  size="md"
                  disabled={action.disabled}
                  loading={action.loading}
                  onClick={() => {
                    action.onClick?.();
                  }}
                >
                  {action.label}
                </Button>
              ))}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
