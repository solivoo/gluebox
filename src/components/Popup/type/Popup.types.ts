import type { ReactNode } from 'react';
import type { ButtonVariant } from '@/components/Button/type/Button.types';
import type { PopupThemeInput } from '../theme/Popup.theme.types';

export type PopupFooterAlign = 'left' | 'center' | 'right';

export interface PopupAction {
  /** Identificador estable para la lista de acciones. */
  id?: string;
  /** Texto del botón. */
  label: string;
  /** Variante visual (reutiliza Button). */
  variant?: ButtonVariant;
  /** Callback al pulsar. */
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface PopupProps {
  /** Controla visibilidad del popup. */
  open: boolean;
  /** Callback al cerrar (overlay, Escape, botón cerrar). */
  onClose: () => void;
  /** Título en la cabecera arrastrable. */
  title?: ReactNode;
  /** Contenido principal del diálogo. */
  children?: ReactNode;
  /** Ancho del panel (ej. 480, '32rem', '90vw'). */
  width?: string | number;
  /** Alto del panel (ej. 320, 'auto', '70vh'). */
  height?: string | number;
  /** Botones del pie; por defecto alineados a la derecha. */
  actions?: PopupAction[];
  /** Pie personalizado; si se define, reemplaza `actions`. */
  footer?: ReactNode;
  /** Alineación del pie cuando se usan `actions`. */
  footerAlign?: PopupFooterAlign;
  /** Permite arrastrar el panel desde la cabecera. */
  draggable?: boolean;
  /** Muestra el botón de cerrar en la cabecera. */
  showCloseButton?: boolean;
  /** Cierra al hacer clic en el overlay. */
  closeOnOverlayClick?: boolean;
  /** Cierra con la tecla Escape. */
  closeOnEscape?: boolean;
  /** Tema visual del popup. */
  theme?: PopupThemeInput;
  className?: string;
  /** id del diálogo para aria-labelledby. */
  id?: string;
}

/** Handler del evento `onClose`. */
export type PopupOnCloseHandler = PopupProps['onClose'];

/** Handler del click en una acción del pie (`PopupAction.onClick`). */
export type PopupActionOnClickHandler = NonNullable<PopupAction['onClick']>;
