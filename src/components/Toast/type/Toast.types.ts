import type { ReactNode } from 'react';
import type { ToastThemeInput } from '../theme/Toast.theme.types';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  /** Título visible en la cabecera del toast. */
  title?: ReactNode;
  /** Cuerpo del mensaje. */
  children?: ReactNode;
  /** Variante semántica (color de acento). */
  variant?: ToastVariant;
  /** Muestra botón de cerrar. */
  showCloseButton?: boolean;
  /** Callback al cerrar manualmente o por timeout. */
  onClose?: () => void;
  /** Tema visual del toast. */
  theme?: ToastThemeInput;
  className?: string;
  /** id para accesibilidad. */
  id?: string;
}

export interface ShowToastOptions {
  /** Identificador opcional; si no se provee se genera uno. */
  id?: string;
  title?: ReactNode;
  message?: ReactNode;
  variant?: ToastVariant;
  /** Duración en ms; 0 = persistente hasta cerrar manualmente. */
  duration?: number;
  showCloseButton?: boolean;
  /** Muestra barra de progreso del temporizador (solo si duration > 0). */
  showProgress?: boolean;
  theme?: ToastThemeInput;
  onClose?: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Posición del stack de toasts en el viewport. */
  position?: ToastPosition;
  /** Máximo de toasts visibles simultáneamente. */
  maxToasts?: number;
  /** Duración por defecto en ms. */
  defaultDuration?: number;
  /** Muestra barra de progreso por defecto en toasts con duración. */
  showProgress?: boolean;
  /** Tema por defecto para toasts del provider. */
  theme?: ToastThemeInput;
}

export interface ToastContextValue {
  /** Encola un toast y devuelve su id. */
  show: (options: ShowToastOptions) => string;
  /** Cierra un toast por id. */
  dismiss: (id: string) => void;
  /** Cierra todos los toasts. */
  dismissAll: () => void;
}

export interface ToastItem {
  id: string;
  title?: ReactNode;
  message?: ReactNode;
  variant: ToastVariant;
  duration: number;
  showCloseButton: boolean;
  showProgress: boolean;
  theme?: ToastThemeInput;
  onClose?: () => void;
  /** Marca el toast en animación de salida antes de desmontarlo. */
  exiting?: boolean;
}

/** Handler del evento `onClose` de un toast individual. */
export type ToastOnCloseHandler = NonNullable<ToastProps['onClose']>;

/** Handler de `useToast().show`. */
export type ToastShowHandler = ToastContextValue['show'];

/** Handler de `useToast().dismiss`. */
export type ToastDismissHandler = ToastContextValue['dismiss'];

/** Handler de `useToast().dismissAll`. */
export type ToastDismissAllHandler = ToastContextValue['dismissAll'];
