/** Props compartidas para el botón de limpiar en controles de formulario. */
export interface FieldClearButtonProps {
  /** Muestra botón X para limpiar el valor cuando hay contenido seleccionado */
  showClearButton?: boolean;
  /**
   * Alias legacy de `showClearButton`.
   * @deprecated Usá `showClearButton`.
   */
  clearable?: boolean;
}
