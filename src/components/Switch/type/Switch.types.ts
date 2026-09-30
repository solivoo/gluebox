import type { InputHTMLAttributes, ReactNode } from 'react';
import type { SwitchThemeInput } from '../theme/Switch.theme.types';

export type SwitchSize = 'sm' | 'md';

export type SwitchLabelPosition = 'right' | 'left' | 'top' | 'bottom';

export interface SwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'onChange' | 'value' | 'defaultValue' | 'checked' | 'defaultChecked' | 'children'
  > {
  /** Estado activo (modo controlado) */
  checked?: boolean;
  /** Estado inicial (modo no controlado) */
  defaultChecked?: boolean;
  /** Se dispara al alternar el estado */
  onChange?: (checked: boolean) => void;
  /** Etiqueta asociada al control */
  label?: ReactNode;
  /** Posición de la etiqueta respecto al track */
  labelPosition?: SwitchLabelPosition;
  /** Tamaño del switch */
  size?: SwitchSize;
  /** Muestra un spinner en el thumb y bloquea la interacción */
  loading?: boolean;
  /** Deshabilita el control */
  disabled?: boolean;
  /** Texto de ayuda debajo del control */
  helperText?: ReactNode;
  /** Marca el estado de error */
  error?: boolean;
  /** Mensaje de error (implica `error`) */
  errorMessage?: ReactNode;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo (ej. '200px', 180) */
  width?: string | number;
  /** Preset o tema personalizado */
  theme?: SwitchThemeInput;
}

/** Valor emitido por `onChange`. */
export type SwitchChangeValue = boolean;

/** Handler del evento `onChange`. */
export type SwitchOnChangeHandler = NonNullable<SwitchProps['onChange']>;
