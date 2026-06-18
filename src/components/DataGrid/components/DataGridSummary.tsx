interface DataGridSummaryProps {
  rowCount: number;
  selectedCount: number;
  showRowCount: boolean;
  showSelectionCount: boolean;
  showSelection: boolean;
  virtualHint?: string;
  formatRowCount: (count: number) => string;
  formatSelectedCount: (count: number) => string;
}

export function DataGridSummary({
  rowCount,
  selectedCount,
  showRowCount,
  showSelectionCount,
  showSelection,
  virtualHint,
  formatRowCount,
  formatSelectedCount,
}: DataGridSummaryProps) {
  const showAny =
    showRowCount || (showSelectionCount && showSelection);

  if (!showAny) return null;

  return (
    <div className="glb-datagrid__summary" aria-live="polite">
      {showRowCount && (
        <span className="glb-datagrid__summary-item glb-datagrid__row-count">
          {formatRowCount(rowCount)}
          {virtualHint && (
            <span className="glb-datagrid__virtual-hint"> · {virtualHint}</span>
          )}
        </span>
      )}
      {showSelectionCount && showSelection && (
        <span className="glb-datagrid__summary-item glb-datagrid__selection-count">
          {formatSelectedCount(selectedCount)}
        </span>
      )}
    </div>
  );
}
