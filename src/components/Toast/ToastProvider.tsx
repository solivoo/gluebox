import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  ShowToastOptions,
  ToastContextValue,
  ToastItem,
  ToastProviderProps,
} from './type/Toast.types';
import { ToastContainer } from './ToastContainer';

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

function createToastId(explicit?: string): string {
  if (explicit) return explicit;
  toastCounter += 1;
  return `glb-toast-${toastCounter}`;
}

export function ToastProvider(props: Readonly<ToastProviderProps>) {
  const {
    children,
    position = 'top-right',
    maxToasts = 5,
    defaultDuration = 5000,
    showProgress = true,
    theme,
  } = props;

  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      target?.onClose?.();
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const requestExit = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && !item.exiting ? { ...item, exiting: true } : item,
      ),
    );
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      requestExit(id);
    },
    [requestExit],
  );

  const dismissAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, exiting: true })));
  }, []);

  const show = useCallback(
    (options: ShowToastOptions): string => {
      const id = createToastId(options.id);
      const duration = options.duration ?? defaultDuration;
      const item: ToastItem = {
        id,
        title: options.title,
        message: options.message,
        variant: options.variant ?? 'default',
        duration,
        showCloseButton: options.showCloseButton ?? true,
        showProgress: options.showProgress ?? (showProgress && duration > 0),
        theme: options.theme ?? theme,
        onClose: options.onClose,
        exiting: false,
      };

      setItems((prev) => {
        const withoutDup = prev.filter((t) => t.id !== id);
        const next = [...withoutDup, item];
        if (next.length <= maxToasts) return next;
        const overflow = next.length - maxToasts;
        next.slice(0, overflow).forEach((t) => t.onClose?.());
        return next.slice(overflow);
      });

      return id;
    },
    [defaultDuration, maxToasts, showProgress, theme],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ show, dismiss, dismissAll }),
    [show, dismiss, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        items={items}
        position={position}
        onRequestExit={requestExit}
        onRemove={remove}
      />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>.');
  }
  return ctx;
}
