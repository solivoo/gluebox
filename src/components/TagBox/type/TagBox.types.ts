import type { InputHTMLAttributes } from 'react';
import type { TagBoxThemeInput } from '../theme/TagBox.theme.types';
import type { FieldClearButtonProps } from '@/shared/fieldClear.types';

export type TagBoxVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type TagBoxSize = 'sm' | 'md' | 'lg';

export type TagBoxLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

/** Campo para agregar tags en línea. Enter o coma confirman cada tag; Backspace con el input vacío elimina el último. */
export interface TagBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children' | 'value' | 'defaultValue' | 'onChange'>,
    FieldClearButtonProps {
  /** Variante visual */
  variant?: TagBoxVariant;
  /** Tamaño */
  size?: TagBoxSize;
  /** Texto de la etiqueta superior */
  label?: string;
  /** Posición del label: 'top', 'floating' (dentro), 'outlined' (sobre el borde), 'left' (horizontal) */
  labelPosition?: TagBoxLabelPosition;
  /** Texto placeholder del input */
  placeholder?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Muestra estado de error */
  error?: boolean;
  /** Mensaje de error debajo del campo (activa error implícitamente) */
  errorMessage?: string;
  /** Lista de tags (modo controlado) */
  value?: string[];
  /** Lista de tags inicial (modo no controlado) */
  defaultValue?: string[];
  /** Se dispara al agregar o quitar tags */
  onChange?: (tags: string[]) => void;
  /** Cantidad máxima de tags; si se alcanza, no se agregan más */
  maxTags?: number;
  /** Permite tags duplicados (comparación case-insensitive). Por defecto se previenen */
  allowDuplicates?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo del campo (ej. '320px', 200, '100%'). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset ('dark' | 'light') o tema personalizado */
  theme?: TagBoxThemeInput;
  /** Clases CSS adicionales */
  className?: string;
}

/** Handler del evento `onChange`. */
export type TagBoxOnChangeHandler = NonNullable<TagBoxProps['onChange']>;
