import { textBoxThemes } from '@/components/TextBox/theme/defaultThemes';
import type { TextAreaTheme, TextAreaThemePreset } from './TextArea.theme.types';

/** Reutiliza los mismos tokens pastel que TextBox */
export const textAreaThemes: Record<TextAreaThemePreset, TextAreaTheme> =
  textBoxThemes as unknown as Record<TextAreaThemePreset, TextAreaTheme>;
