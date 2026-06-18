interface DataGridLoadingProps {
  label: string;
  ariaLabel: string;
}

export function DataGridLoading({ label, ariaLabel }: DataGridLoadingProps) {
  return (
    <div
      className="glb-datagrid__loading"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className="glb-datagrid__loading-content">
        <span className="glb-datagrid__loading-spinner" aria-hidden="true" />
        <span className="glb-datagrid__loading-text">
          {label}
          <span className="glb-datagrid__loading-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </span>
      </div>
    </div>
  );
}
