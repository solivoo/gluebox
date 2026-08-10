import type { TextBoxProps } from '@/components/TextBox/type/TextBox.types';
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

/*
 * NumberBox comparte apariencia y sistema de temas con TextBox:
 * los alias mantienen la nomenclatura por componente del resto de la librería.
 */

export type NumberBoxVariant = TextBoxVariant;

export type NumberBoxSize = TextBoxSize;

export type NumberBoxLabelPosition = TextBoxLabelPosition;

export type NumberBoxTheme = TextBoxTheme;

export type NumberBoxVariantTheme = TextBoxVariantTheme;

export type NumberBoxThemePreset = TextBoxThemePreset;

export type NumberBoxThemeInput = TextBoxThemeInput;

export interface NumberBoxProps
  extends Omit<TextBoxProps, 'type' | 'showPasswordToggle' | 'iconRight'> {
  /** Incremento aplicado por los botones spin y las flechas ↑/↓ del teclado */
  step?: number;
  /** Valor mínimo permitido */
  min?: number;
  /** Valor máximo permitido */
  max?: number;
  /** Muestra los botones de incrementar/decrementar a la derecha del campo */
  showSpinButtons?: boolean;
}

/** Handler del evento `onChange`. */
export type NumberBoxOnChangeHandler = NonNullable<NumberBoxProps['onChange']>;

/** Handler del evento `onFocus`. */
export type NumberBoxOnFocusHandler = NonNullable<NumberBoxProps['onFocus']>;

/** Handler del evento `onBlur`. */
export type NumberBoxOnBlurHandler = NonNullable<NumberBoxProps['onBlur']>;
