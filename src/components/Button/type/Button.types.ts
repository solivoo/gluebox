import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonThemeInput } from '../theme/Button.theme.types';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Contenido del botón (texto o elementos) */
  children: ReactNode;
  /** Variante visual del botón */
  variant?: ButtonVariant;
  /** Tamaño del botón */
  size?: ButtonSize;
  /** Ícono a la izquierda del texto */
  iconLeft?: ReactNode;
  /** Ícono a la derecha del texto */
  iconRight?: ReactNode;
  /** Muestra un spinner y deshabilita el botón */
  loading?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del botón (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light') o objeto con colores personalizados */
  theme?: ButtonThemeInput;
}

/** Handler del evento `onClick`. */
export type ButtonOnClickHandler = NonNullable<ButtonProps['onClick']>;
