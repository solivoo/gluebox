/** Unifica `showClearButton` y el alias legacy `clearable`. */
export function resolveShowClearButton(options: {
  showClearButton?: boolean;
  clearable?: boolean;
}): boolean {
  return options.showClearButton ?? options.clearable ?? false;
}
