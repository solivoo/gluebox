import type { TextareaHTMLAttributes } from 'react';
import type { TextAreaThemeInput } from '../theme/TextArea.theme.types';
import type { FieldClearButtonProps } from '@/shared/fieldClear.types';

export type TextAreaVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type TextAreaSize = 'sm' | 'md' | 'lg';

export type TextAreaLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

/** Control del redimensionamiento nativo del textarea */
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'children'>,
    FieldClearButtonProps {
  /** Variante visual */
  variant?: TextAreaVariant;
  /** Tamaño */
  size?: TextAreaSize;
  /** Texto de la etiqueta */
  label?: string;
  /** Posición del label: 'top', 'floating', 'outlined' o 'left' */
  labelPosition?: TextAreaLabelPosition;
  /** Texto placeholder */
  placeholder?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del campo (activa error implícitamente) */
  errorMessage?: string;
  /** Filas visibles del textarea */
  rows?: number;
  /** Control del resize nativo del navegador */
  resize?: TextAreaResize;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del campo (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light' | ...) o tema personalizado */
  theme?: TextAreaThemeInput;
  /** Clases CSS adicionales */
  className?: string;
}

/** Handler del evento `onChange`. */
export type TextAreaOnChangeHandler = NonNullable<TextAreaProps['onChange']>;

/** Handler del evento `onFocus`. */
export type TextAreaOnFocusHandler = NonNullable<TextAreaProps['onFocus']>;

/** Handler del evento `onBlur`. */
export type TextAreaOnBlurHandler = NonNullable<TextAreaProps['onBlur']>;
