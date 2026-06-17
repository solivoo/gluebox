import type { RangeDateBoxThemeInput } from '../theme/RangeDateBox.theme.types';

export type RangeDateBoxVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type RangeDateBoxSize = 'sm' | 'md' | 'lg';

export type RangeDateBoxLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

/** Modo de visualización: dos campos de texto o solo icono de calendario */
export type RangeDateBoxDisplayMode = 'input' | 'icon';

/** Par de fechas que representa un rango */
export interface DateRange {
  /** Fecha de inicio (YYYY-MM-DD) */
  start: string;
  /** Fecha de fin (YYYY-MM-DD) */
  end: string;
}

export interface RangeDateBoxProps {
  /** Variante visual */
  variant?: RangeDateBoxVariant;
  /** Tamaño */
  size?: RangeDateBoxSize;
  /** Texto de la etiqueta superior */
  label?: string;
  /** Posición del label: 'top', 'floating', 'outlined' (sobre el borde), 'left' */
  labelPosition?: RangeDateBoxLabelPosition;
  /** 'input': dos campos con fecha (default). 'icon': solo botón con icono de calendario */
  displayMode?: RangeDateBoxDisplayMode;
  /** Fecha de inicio controlada (YYYY-MM-DD) */
  startValue?: string;
  /** Fecha de fin controlada (YYYY-MM-DD) */
  endValue?: string;
  /** Fecha de inicio inicial no controlada (YYYY-MM-DD) */
  startDefaultValue?: string;
  /** Fecha de fin inicial no controlada (YYYY-MM-DD) */
  endDefaultValue?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del campo (activa error implícitamente) */
  errorMessage?: string;
  /** Texto separador entre los dos campos de fecha */
  separator?: string;
  /** Muestra botón de limpiar (X) cuando hay fechas seleccionadas */
  clearable?: boolean;
  /** Fecha mínima seleccionable (YYYY-MM-DD) */
  min?: string;
  /** Fecha máxima seleccionable (YYYY-MM-DD) */
  max?: string;
  /** Deshabilita ambos campos */
  disabled?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del campo (ej. '480px', 420, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light' | 'modern-dark' | ...) o tema personalizado */
  theme?: RangeDateBoxThemeInput;
  /** Clases CSS adicionales */
  className?: string;
  /** Se dispara cuando cambia la fecha de inicio o fin */
  onChange?: (range: DateRange) => void;
}

/** Payload del evento `onChange`. */
export type RangeDateBoxChangeEvent = DateRange;

/** Handler del evento `onChange`. */
export type RangeDateBoxOnChangeHandler = NonNullable<RangeDateBoxProps['onChange']>;
