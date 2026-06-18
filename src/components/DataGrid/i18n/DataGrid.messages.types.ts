/** Textos configurables del DataGrid (i18n / white-label). */
export interface DataGridMessages {
  /** Placeholder del buscador cuando no se pasa searchPlaceholder */
  searchPlaceholder: string;
  /** Mensaje sin filas visibles */
  emptyMessage: string;
  /** Texto visible durante loading */
  loading: string;
  /** aria-label del overlay de carga */
  loadingAriaLabel: string;
  /** aria-label del pie de paginación */
  paginationAriaLabel: string;
  /** Texto cuando totalItems === 0 */
  paginationZeroRecords: string;
  /** Rango visible, ej. "1–25 de 500" */
  paginationRange: (start: number, end: number, total: number) => string;
  /** Etiqueta del selector de filas por página */
  rowsPerPage: string;
  /** Estado de página, ej. "Página 2 de 10" */
  pageStatus: (page: number, totalPages: number) => string;
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
  /** Contador de registros en la barra de resumen */
  rowCount: (count: number) => string;
  /** Contador de seleccionadas */
  selectedCount: (count: number) => string;
  /** Hint de virtualización junto al contador */
  virtualHint: (rendered: number) => string;
}
