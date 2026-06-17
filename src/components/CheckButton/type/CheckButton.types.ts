import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { CheckButtonThemeInput } from '../theme/CheckButton.theme.types';

export type CheckButtonVariant = 'primary' | 'outline' | 'ghost';

export type CheckButtonSize = 'sm' | 'md' | 'lg';

export interface CheckButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'onChange' | 'value' | 'defaultValue'
  > {
  /** Contenido del botón */
  children: ReactNode;
  /** Estado marcado (controlado) */
  checked?: boolean;
  /** Estado inicial (no controlado) */
  defaultChecked?: boolean;
  /** Se dispara al alternar el estado */
  onChange?: (checked: boolean) => void;
  /** Estado indeterminado (semántica de checkbox) */
  indeterminate?: boolean;
  /** Variante visual */
  variant?: CheckButtonVariant;
  /** Tamaño */
  size?: CheckButtonSize;
  /** Deshabilita el botón */
  disabled?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo (ej. '200px', 180) */
  width?: string | number;
  /** Preset o tema personalizado */
  theme?: CheckButtonThemeInput;
}
