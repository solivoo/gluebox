import type { CSSProperties } from 'react';
import type { DataGridSearchPosition } from '../type/DataGrid.types';

export interface DataGridToolbarProps {
  show: boolean;
  position: DataGridSearchPosition;
  value: string;
  placeholder: string;
  searchWidth?: string | number;
  searchStyle?: CSSProperties;
  onChange: (query: string) => void;
}

export function DataGridToolbar({
  show,
  position,
  value,
  placeholder,
  searchWidth,
  searchStyle,
  onChange,
}: DataGridToolbarProps) {
  if (!show) return null;

  return (
    <div
      className={[
        'glb-datagrid__toolbar',
        `glb-datagrid__toolbar--search-${position}`,
      ].join(' ')}
    >
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
    </div>
  );
}
