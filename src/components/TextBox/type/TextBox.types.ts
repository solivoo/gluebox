import type { InputHTMLAttributes, ReactNode } from 'react';
import type { TextBoxThemeInput } from '../theme/TextBox.theme.types';
import type { FieldClearButtonProps } from '@/shared/fieldClear.types';

export type TextBoxVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type TextBoxSize = 'sm' | 'md' | 'lg';

export type TextBoxLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

export interface TextBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'>,
    FieldClearButtonProps {
  /** Variante visual */
  variant?: TextBoxVariant;
  /** Tamaño */
  size?: TextBoxSize;
  /** Texto de la etiqueta superior */
  label?: string;
  /** Posición del label: 'top', 'floating' (dentro), 'outlined' (sobre el borde), 'left' (horizontal) */
  labelPosition?: TextBoxLabelPosition;
  /** Texto placeholder */
  placeholder?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del campo (activa error implícitamente) */
  errorMessage?: string;
  /** Ícono a la izquierda del input */
  iconLeft?: ReactNode;
  /** Ícono a la derecha del input (decorativo; no recibe clics) */
  iconRight?: ReactNode;
  /**
   * Con `type="password"`, muestra el botón ojo para alternar visibilidad.
   * Por defecto `true` en campos password; pasá `false` para desactivarlo.
   */
  showPasswordToggle?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del campo (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light') o tema personalizado */
  theme?: TextBoxThemeInput;
  /** Clases CSS adicionales */
  className?: string;
}

/** Handler del evento `onChange`. */
export type TextBoxOnChangeHandler = NonNullable<TextBoxProps['onChange']>;

/** Handler del evento `onFocus`. */
export type TextBoxOnFocusHandler = NonNullable<TextBoxProps['onFocus']>;

/** Handler del evento `onBlur`. */
export type TextBoxOnBlurHandler = NonNullable<TextBoxProps['onBlur']>;
