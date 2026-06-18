import type { DataGridMessages } from './DataGrid.messages.types';

export const defaultDataGridMessages: DataGridMessages = {
  searchPlaceholder: 'Buscar...',
  emptyMessage: 'No hay registros para mostrar.',
  loading: 'Cargando',
  loadingAriaLabel: 'Cargando',
  paginationAriaLabel: 'Paginación de la tabla',
  paginationZeroRecords: '0 registros',
  paginationRange: (start, end, total) => `${start}–${end} de ${total}`,
  rowsPerPage: 'Filas por página',
  pageStatus: (page, totalPages) => `Página ${page} de ${totalPages}`,
  firstPage: 'Primera página',
  previousPage: 'Página anterior',
  nextPage: 'Página siguiente',
  lastPage: 'Última página',
  rowCount: (count) => `${count} registro${count === 1 ? '' : 's'}`,
  selectedCount: (count) => `${count} seleccionada${count === 1 ? '' : 's'}`,
  virtualHint: (rendered) => `renderizando ${rendered}`,
};

export function resolveDataGridMessages(
  partial?: Partial<DataGridMessages>,
): DataGridMessages {
  if (!partial) return defaultDataGridMessages;
  return { ...defaultDataGridMessages, ...partial };
}
