import type { CSSProperties, ReactNode } from 'react';
import type {
  DataGridRenderToolbar,
  DataGridSearchPosition,
  DataGridToolbarContext,
} from '../type/DataGrid.types';

export interface DataGridToolbarProps<T extends Record<string, unknown>> {
  show: boolean;
  showSearch: boolean;
  position: DataGridSearchPosition;
  value: string;
  placeholder: string;
  searchWidth?: string | number;
  searchStyle?: CSSProperties;
  onChange: (query: string) => void;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
  renderToolbar?: DataGridRenderToolbar<T>;
  toolbarContext: DataGridToolbarContext<T>;
}

function SearchInput({
  value,
  placeholder,
  searchWidth,
  searchStyle,
  onChange,
}: Readonly<{
  value: string;
  placeholder: string;
  searchWidth?: string | number;
  searchStyle?: CSSProperties;
  onChange: (query: string) => void;
}>) {
  return (
    <input
      type="search"
      className={[
        'glb-datagrid__search',
        searchWidth != null && 'glb-datagrid__search--sized',
      ]
        .filter(Boolean)
        .join(' ')}
      style={searchStyle}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function DataGridToolbar<T extends Record<string, unknown>>({
  show,
  showSearch,
  position,
  value,
  placeholder,
  searchWidth,
  searchStyle,
  onChange,
  toolbarLeft,
  toolbarRight,
  renderToolbar,
  toolbarContext,
}: DataGridToolbarProps<T>) {
  if (!show) return null;

  if (renderToolbar) {
    return (
      <div className="glb-datagrid__toolbar">{renderToolbar(toolbarContext)}</div>
    );
  }

  const search = showSearch ? (
    <SearchInput
      value={value}
      placeholder={placeholder}
      searchWidth={searchWidth}
      searchStyle={searchStyle}
      onChange={onChange}
    />
  ) : null;

  const left = toolbarLeft ? (
    <div className="glb-datagrid__toolbar-left">{toolbarLeft}</div>
  ) : null;

  const right = toolbarRight ? (
    <div className="glb-datagrid__toolbar-right">{toolbarRight}</div>
  ) : null;

  const ordered =
    position === 'right' ? [left, right, search] : [left, search, right];

  const searchSide = showSearch ? position : 'left';

  return (
    <div
      className={[
        'glb-datagrid__toolbar',
        `glb-datagrid__toolbar--search-${searchSide}`,
      ].join(' ')}
    >
      {ordered}
    </div>
  );
}
