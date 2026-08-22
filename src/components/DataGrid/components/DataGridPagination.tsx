import { useId, useMemo } from 'react';
import { Select } from '@/components/Select/Select';
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
  const pageSizeSelectId = useId();

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

  const pageSizeSelectOptions = useMemo(
    () =>
      pageSizeOptions.map((option) => ({
        value: String(option),
        label: String(option),
      })),
    [pageSizeOptions],
  );

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
          htmlFor={pageSizeSelectId}
        >
          {messages.rowsPerPage}
        </label>
        <Select
          id={pageSizeSelectId}
          className="glb-datagrid__pagination-select"
          size="sm"
          width="5.5rem"
          value={String(pageSize)}
          options={pageSizeSelectOptions}
          disabled={disabled}
          onChange={(value) => setPageSize(Number(value))}
        />
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
