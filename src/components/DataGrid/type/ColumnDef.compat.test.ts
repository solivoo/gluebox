import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import type { ColumnDef, DataGridProps } from './DataGrid.types';

type Row = { id: string; name: string; qty: number } & Record<string, unknown>;

describe('ColumnDef / DataGridProps compat 0.1.18', () => {
  it('infiere T[K] en renderCell aunque T tenga Record<string, unknown>', () => {
    const columns: ColumnDef<Row>[] = [
      {
        key: 'name',
        header: 'Nombre',
        renderCell: (_value: Row['name'], row: Row) => row.name,
      },
      {
        key: 'qty',
        header: 'Cantidad',
        renderCell: (value: number) => String(value),
      },
    ];

    expect(columns[0]?.key).toBe('name');
  });

  it('acepta renderCell de 2 args (rowIndex opcional)', () => {
    const columns: ColumnDef<Row>[] = [
      {
        key: 'name',
        header: 'Nombre',
        renderCell: (_value, row) => row.name,
      },
    ];

    expect(columns).toHaveLength(1);
  });

  it('acepta emptyState como ReactNode', () => {
    const columns: ColumnDef<Row>[] = [{ key: 'id', header: 'Id' }];
    const props: DataGridProps<Row> = {
      dataSource: [],
      columns,
      keyExpr: 'id',
      emptyState: createElement('p', null, 'Vacío'),
    };

    expect(props.emptyState).toBeTruthy();
  });
});
