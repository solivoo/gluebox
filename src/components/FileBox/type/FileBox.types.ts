import type { ReactNode } from 'react';
import type {
  TextBoxVariant,
  TextBoxSize,
  TextBoxLabelPosition,
} from '@/components/TextBox/type/TextBox.types';
import type {
  TextBoxTheme,
  TextBoxVariantTheme,
  TextBoxThemePreset,
  TextBoxThemeInput,
} from '@/components/TextBox/theme/TextBox.theme.types';
import type { FieldClearButtonProps } from '@/shared/fieldClear.types';

export type FileBoxVariant = TextBoxVariant;

export type FileBoxSize = TextBoxSize;

export type FileBoxLabelPosition = TextBoxLabelPosition;

export type FileBoxDisplayMode = 'field' | 'dropzone';

export type FileBoxTheme = TextBoxTheme;

export type FileBoxVariantTheme = TextBoxVariantTheme;

export type FileBoxThemePreset = TextBoxThemePreset;

export type FileBoxThemeInput = TextBoxThemeInput;

/** Payload emitido por `onChange`. */
export type FileBoxChangeValue = File[];

export interface FileBoxProps extends FieldClearButtonProps {
  /** Variante visual (comparte tokens con TextBox) */
  variant?: FileBoxVariant;
  /** Tamaño */
  size?: FileBoxSize;
  /** Texto de la etiqueta */
  label?: string;
  /** Posición del label */
  labelPosition?: FileBoxLabelPosition;
  /**
   * `field`: campo compacto con botón "Elegir" (default).
   * `dropzone`: área de arrastre con lista de archivos.
   */
  displayMode?: FileBoxDisplayMode;
  /** Placeholder cuando no hay archivos */
  placeholder?: string;
  /** Texto del botón de selección */
  buttonLabel?: string;
  /** Valor controlado */
  value?: File[];
  /** Valor inicial no controlado */
  defaultValue?: File[];
  /** Acepta múltiples archivos */
  multiple?: boolean;
  /** Filtro nativo `accept` (ej. "image/*,.pdf") */
  accept?: string;
  /** Tamaño máximo por archivo en bytes */
  maxSize?: number;
  /** Cantidad máxima de archivos (solo con `multiple`) */
  maxFiles?: number;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Estado de error */
  error?: boolean;
  /** Mensaje de error (activa error implícitamente) */
  errorMessage?: string;
  /** Deshabilita el control */
  disabled?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo (ej. '320px', 280). Prevalece sobre fullWidth. */
  width?: string | number;
  /** Preset o tema personalizado */
  theme?: FileBoxThemeInput;
  /** Clases CSS adicionales */
  className?: string;
  /** id del input file */
  id?: string;
  /** name para formularios nativos */
  name?: string;
  /** Contenido decorativo a la izquierda (solo mode field) */
  iconLeft?: ReactNode;
  /** Se dispara al cambiar la selección */
  onChange?: (files: File[]) => void;
  /** Se dispara al rechazar archivos (tipo/tamaño/cantidad) */
  onReject?: (rejected: FileRejection[]) => void;
}

export interface FileRejection {
  file: File;
  reason: 'type' | 'size' | 'max-files';
}

/** Handler del evento `onChange`. */
export type FileBoxOnChangeHandler = NonNullable<FileBoxProps['onChange']>;

/** Handler del evento `onReject`. */
export type FileBoxOnRejectHandler = NonNullable<FileBoxProps['onReject']>;
