export { Popup } from './Popup';
export { popupThemes } from './theme/defaultThemes';
export { resolveTheme as resolvePopupTheme, themeToStyle as popupThemeToStyle } from './theme/resolveTheme';

export type {
  PopupProps,
  PopupAction,
  PopupFooterAlign,
  PopupOnCloseHandler,
  PopupActionOnClickHandler,
} from './type/Popup.types';

export type {
  PopupTheme,
  PopupThemePreset,
  PopupThemeInput,
} from './theme/Popup.theme.types';
