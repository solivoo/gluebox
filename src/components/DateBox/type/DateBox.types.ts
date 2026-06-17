import type { InputHTMLAttributes } from 'react';
import type { DateBoxThemeInput } from '../theme/DateBox.theme.types';

export type DateBoxVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type DateBoxSize = 'sm' | 'md' | 'lg';

export type DateBoxLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

/** Modo de visualización: campo de texto o solo icono de calendario */
export type DateBoxDisplayMode = 'input' | 'icon';

export interface DateBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children' | 'type'> {
  /** Variante visual */
  variant?: DateBoxVariant;
  /** Tamaño */
  size?: DateBoxSize;
  /** Texto de la etiqueta superior */
  label?: string;
  /** Posición del label: 'top', 'floating', 'outlined' (sobre el borde), 'left' */
  labelPosition?: DateBoxLabelPosition;
  /** 'input': campo con fecha formateada (default). 'icon': solo botón con icono de calendario */
  displayMode?: DateBoxDisplayMode;
  /** Valor de la fecha (YYYY-MM-DD). Para uso controlado. */
  value?: string;
  /** Valor inicial no controlado (YYYY-MM-DD) */
  defaultValue?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del campo (activa error implícitamente) */
  errorMessage?: string;
  /** Muestra botón de limpiar (X) cuando hay fecha seleccionada */
  clearable?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del campo (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Fecha mínima seleccionable (YYYY-MM-DD) */
  min?: string;
  /** Fecha máxima seleccionable (YYYY-MM-DD) */
  max?: string;
  /** Preset ('dark' | 'light' | 'modern-dark' | ...) o tema personalizado */
  theme?: DateBoxThemeInput;
  /** Clases CSS adicionales */
  className?: string;
}

/** Handler del evento `onChange`. */
export type DateBoxOnChangeHandler = NonNullable<DateBoxProps['onChange']>;
