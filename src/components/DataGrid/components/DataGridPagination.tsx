import type { DataGridMessages } from '../i18n/DataGrid.messages.types';
import type { UsePaginationReturn } from '../type/DataGrid.types';

export interface DataGridPaginationProps {
  pagination: UsePaginationReturn;
  disabled?: boolean;
  messages: DataGridMessages;
}

export function DataGridPagination({
  pagination,
  disabled = false,
  messages,
}: DataGridPaginationProps) {
  const {
    page,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    canPrevious,
    canNext,
    pageSizeOptions,
    goToFirst,
    goToPrevious,
    goToNext,
    goToLast,
    setPageSize,
  } = pagination;

  const rangeStart = totalItems === 0 ? 0 : startIndex + 1;
  const rangeEnd = endIndex;

  return (
    <footer
      className="glb-datagrid__pagination"
      aria-label={messages.paginationAriaLabel}
    >
      <div className="glb-datagrid__pagination-range">
        {totalItems === 0
          ? messages.paginationZeroRecords
          : messages.paginationRange(rangeStart, rangeEnd, totalItems)}
      </div>

      <div className="glb-datagrid__pagination-size">
        <label
          className="glb-datagrid__pagination-size-label"
          htmlFor="glb-datagrid-page-size"
        >
          {messages.rowsPerPage}
        </label>
        <select
          id="glb-datagrid-page-size"
          className="glb-datagrid__pagination-select"
          value={pageSize}
          disabled={disabled}
          onChange={(event) => setPageSize(Number(event.target.value))}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="glb-datagrid__pagination-nav">
        <span className="glb-datagrid__pagination-status">
          {messages.pageStatus(page, totalPages)}
        </span>
        <div className="glb-datagrid__pagination-buttons">
          <button
            type="button"
            className="glb-datagrid__pagination-btn"
            disabled={disabled || !canPrevious}
            aria-label={messages.firstPage}
            onClick={goToFirst}
          >
            «
          </button>
          <button
            type="button"
            className="glb-datagrid__pagination-btn"
            disabled={disabled || !canPrevious}
            aria-label={messages.previousPage}
            onClick={goToPrevious}
          >
            ‹
          </button>
          <button
            type="button"
            className="glb-datagrid__pagination-btn"
            disabled={disabled || !canNext}
            aria-label={messages.nextPage}
            onClick={goToNext}
          >
            ›
          </button>
          <button
            type="button"
            className="glb-datagrid__pagination-btn"
            disabled={disabled || !canNext}
            aria-label={messages.lastPage}
            onClick={goToLast}
          >
            »
          </button>
        </div>
      </div>
    </footer>
  );
}
