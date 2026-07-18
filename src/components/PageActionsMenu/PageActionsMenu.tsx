import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
} from 'react';
import type {
  PageActionItem,
  PageActionsMenuProps,
} from './type/PageActionsMenu.types';
import type { NavigationNode } from '@/components/navigation';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/PageActionsMenu/css/PageActionsMenu.css';

function resolveDimension(value: string | number): string {
  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    return `${value}px`;
  }
  return String(value);
}

function toActionItem(item: PageActionItem | NavigationNode): PageActionItem {
  return {
    id: item.id,
    label: item.label,
    icon: item.icon ?? null,
    route: item.route ?? null,
    disabled: Boolean(
      'disabled' in item ? item.disabled : false,
    ),
    disabledReason:
      'disabledReason' in item ? (item.disabledReason ?? null) : null,
    kind: 'kind' in item ? item.kind : 'action',
    surface: 'surface' in item ? item.surface : 'actions',
  };
}

function HamburgerIcon() {
  return (
    <span className="glb-pam__burger" aria-hidden="true">
      <span className="glb-pam__burger-line" />
      <span className="glb-pam__burger-line" />
      <span className="glb-pam__burger-line" />
    </span>
  );
}

/**
 * Menú hamburguesa de acciones de página.
 * Consumí `pageActionsFromNode(activeNode)` (hijos `surface: 'actions'`).
 */
export function PageActionsMenu(props: Readonly<PageActionsMenuProps>) {
  const {
    items,
    open: openControlled,
    defaultOpen = false,
    onOpenChange,
    onActionSelect,
    onNavigate,
    renderIcon,
    trigger,
    triggerLabel = 'Acciones de página',
    align = 'end',
    variant = 'ghost',
    size = 'md',
    height,
    disabled = false,
    theme,
    emptyMessage = 'No hay acciones disponibles',
    className,
    onClick: onClickProp,
    type = 'button',
    ...rest
  } = props;

  const isControlled = openControlled !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openControlled) : internalOpen;

  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const themeStyle = themeToStyle(resolveTheme(theme));
  const actionItems = (Array.isArray(items) ? items : []).map(toActionItem);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setOpen(!open);
  }, [disabled, open, setOpen]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  const handleSelect = useCallback(
    (item: PageActionItem) => {
      if (item.disabled) return;
      onActionSelect?.(item);
      if (item.route) {
        onNavigate?.(item.route, item);
      }
      setOpen(false);
    },
    [onActionSelect, onNavigate, setOpen],
  );

  const rootClass = ['glb-pam', className].filter(Boolean).join(' ');
  const triggerClass = [
    'glb-pam__trigger',
    `glb-pam__trigger--${variant}`,
    `glb-pam__trigger--${size}`,
    height != null && 'glb-pam__trigger--custom-height',
  ]
    .filter(Boolean)
    .join(' ');

  const triggerStyle: CSSProperties | undefined =
    height != null
      ? {
          height: resolveDimension(height),
          width: resolveDimension(height),
        }
      : undefined;

  return (
    <div ref={rootRef} className={rootClass} style={themeStyle}>
      <button
        type={type}
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerLabel}
        disabled={disabled}
        {...rest}
        style={{ ...rest.style, ...triggerStyle }}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          toggle();
          onClickProp?.(event);
        }}
        onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {trigger ?? <HamburgerIcon />}
      </button>

      {open && (
        <ul
          id={panelId}
          className={`glb-pam__panel glb-pam__panel--${align}`}
          role="menu"
          aria-label={triggerLabel}
        >
          {actionItems.length === 0 ? (
            <li role="none">
              <p className="glb-pam__empty">{emptyMessage}</p>
            </li>
          ) : (
            actionItems.map((item) => {
              const icon =
                item.icon && renderIcon
                  ? renderIcon(item.icon, 'glb-pam__item-icon-svg')
                  : null;

              return (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="glb-pam__item"
                    disabled={item.disabled}
                    title={item.disabledReason ?? undefined}
                    onClick={() => handleSelect(item)}
                  >
                    {icon != null && (
                      <span className="glb-pam__item-icon">{icon}</span>
                    )}
                    <span className="glb-pam__item-label">{item.label}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
