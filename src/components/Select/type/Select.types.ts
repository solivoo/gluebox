import type { SelectThemeInput } from '../theme/Select.theme.types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

export interface SelectProps {
  /** Opciones del select */
  options: SelectOption[];
  /** Valor controlado */
  value?: string;
  /** Valor por defecto (no controlado) */
  defaultValue?: string;
  /** Callback al cambiar selección */
  onChange?: (value: string) => void;
  /** Texto placeholder cuando no hay selección */
  placeholder?: string;
  /** Variante visual */
  variant?: SelectVariant;
  /** Tamaño */
  size?: SelectSize;
  /** Deshabilita el select */
  disabled?: boolean;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del select */
  errorMessage?: string;
  /** Mensaje de ayuda debajo del select */
  helperText?: string;
  /** Texto de la etiqueta superior */
  label?: string;
  /** Posición del label: 'top', 'floating', 'outlined' (sobre el borde), 'left' */
  labelPosition?: SelectLabelPosition;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del select (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light') o tema personalizado */
  theme?: SelectThemeInput;
  /** Clases CSS adicionales */
  className?: string;
  /** id del elemento; si no se provee se usa un id auto-generado basado en el label */
  id?: string;
  /** Nombre del campo (para formularios) */
  name?: string;
}

/** Valor emitido por `onChange`. */
export type SelectChangeValue = string;

/** Handler del evento `onChange`. */
export type SelectOnChangeHandler = NonNullable<SelectProps['onChange']>;
