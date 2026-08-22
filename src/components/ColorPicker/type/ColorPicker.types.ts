import type { FieldClearButtonProps } from '@/shared/fieldClear.types';
import type {
  TextBoxTheme,
  TextBoxThemeInput,
  TextBoxThemePreset,
  TextBoxVariantTheme,
} from '@/components/TextBox/theme/TextBox.theme.types';

export type ColorPickerVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type ColorPickerSize = 'sm' | 'md' | 'lg';

export type ColorPickerLabelPosition = 'top' | 'floating' | 'outlined' | 'left';

/** Comparte el sistema de temas con TextBox. */
export type ColorPickerTheme = TextBoxTheme;

export type ColorPickerVariantTheme = TextBoxVariantTheme;

export type ColorPickerThemePreset = TextBoxThemePreset;

export type ColorPickerThemeInput = TextBoxThemeInput;

export interface ColorPickerProps extends FieldClearButtonProps {
  /** Valor controlado en hex (`#rrggbb`) */
  value?: string;
  /** Valor inicial no controlado */
  defaultValue?: string;
  /** Hex normalizado `#rrggbb`, o `''` al limpiar */
  onChange?: (value: string) => void;
  /** Variante visual (mismos tokens que TextBox) */
  variant?: ColorPickerVariant;
  /** Tamaño del campo */
  size?: ColorPickerSize;
  /** Texto de la etiqueta */
  label?: string;
  /** Posición del label: top, floating, outlined o left */
  labelPosition?: ColorPickerLabelPosition;
  /** Placeholder del input hex cuando no hay valor */
  placeholder?: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Estado de error */
  error?: boolean;
  /** Mensaje de error (activa error) */
  errorMessage?: string;
  /** Deshabilita campo y panel */
  disabled?: boolean;
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Ancho fijo (prevalece sobre fullWidth) */
  width?: string | number;
  /** Preset o tema custom; sin prop hereda data-theme / data-mode */
  theme?: ColorPickerThemeInput;
  className?: string;
  id?: string;
  /** Nombre del input hex (formularios nativos) */
  name?: string;
  /** Muestras del panel. Si se omite, se usan `DEFAULT_COLOR_PRESETS`. */
  presets?: readonly string[];
}

/** Valor emitido por `onChange`. */
export type ColorPickerChangeValue = string;

/** Handler del evento `onChange`. */
export type ColorPickerOnChangeHandler = NonNullable<ColorPickerProps['onChange']>;
