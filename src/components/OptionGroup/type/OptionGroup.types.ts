import type { ReactNode } from 'react';
import type { OptionGroupThemeInput } from '../theme/OptionGroup.theme.types';

export type OptionGroupLayout = 'vertical' | 'horizontal' | 'segmented';

export type OptionGroupVariant = 'primary' | 'outline' | 'ghost';

export type OptionGroupSize = 'sm' | 'md' | 'lg';

export type OptionGroupLabelPosition = 'top' | 'left';

export interface OptionGroupOption {
  /** Valor único de la opción */
  value: string;
  /** Texto visible */
  label: string;
  /** Deshabilita esta opción */
  disabled?: boolean;
}

export interface OptionGroupProps {
  /** Lista de opciones (selección exclusiva) */
  options: OptionGroupOption[];
  /** Valor seleccionado (controlado) */
  value?: string;
  /** Valor inicial (no controlado) */
  defaultValue?: string;
  /** Se dispara al cambiar la selección */
  onChange?: (value: string) => void;
  /** Nombre del grupo para formularios nativos */
  name?: string;
  /** Disposición visual de las opciones */
  layout?: OptionGroupLayout;
  /** Variante visual */
  variant?: OptionGroupVariant;
  /** Tamaño */
  size?: OptionGroupSize;
  /** Etiqueta del grupo */
  label?: string;
  /** Posición de la etiqueta */
  labelPosition?: OptionGroupLabelPosition;
  /** Texto de ayuda bajo el grupo */
  helperText?: string;
  /** Estado de error */
  error?: boolean;
  /** Mensaje de error (prevalece sobre helperText) */
  errorMessage?: string;
  /** Deshabilita todo el grupo */
  disabled?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo (ej. '320px', 280, '100%') */
  width?: string | number;
  /** Preset o tema personalizado */
  theme?: OptionGroupThemeInput;
  /** Clase CSS adicional */
  className?: string;
  /** id del radiogroup */
  id?: string;
  /** Contenido adicional (no usado en render, para extensión) */
  children?: ReactNode;
}
