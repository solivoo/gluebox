import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';
import { DataGrid } from '../DataGrid';
import type { ColumnDef } from '../type/DataGrid.types';
import {
  assertColumns,
  assertDataSource,
  assertPageSizeOptions,
  normalizeDataGridProps,
} from './normalizeDataGridProps';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: 'id', header: 'Id' },
  { key: 'name', header: 'Nombre' },
];

const rows: Row[] = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
];

describe('normalizeDataGridProps', () => {
  it('dataSource + keyExpr + columns → data y getRowId', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
    });
    expect(normalized.data).toBe(rows);
    expect(normalized.columns).toBe(columns);
    expect(normalized.getRowId(rows[0])).toBe(1);
    expect(normalized.pagination).toBe(false);
  });

  it('dataSource: [] es válido', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: [],
      keyExpr: 'id',
      columns,
    });
    expect(normalized.data).toEqual([]);
    expect(normalized.columns).toHaveLength(2);
  });

  it('dataSource con 1 fila', () => {
    const one = [rows[0]];
    const normalized = normalizeDataGridProps<Row>({
      dataSource: one,
      keyExpr: 'id',
      columns,
    });
    expect(normalized.data).toHaveLength(1);
    expect(normalized.getRowId(one[0])).toBe(1);
  });

  it('paging.pageIndex 0-based → page interna 1-based', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
      paging: { enabled: true, pageIndex: 0, pageSize: 10 },
    });
    expect(normalized.pagination).toBe(true);
    expect(normalized.page).toBe(1);
    expect(normalized.pageSize).toBe(10);
    expect(normalized.pageControlled).toBe(true);
  });

  it('paging.pageIndex: 2 → page 3', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
      paging: { pageIndex: 2 },
    });
    expect(normalized.page).toBe(3);
    expect(normalized.defaultPageSize).toBe(20);
  });

  it('paging sin pageIndex deja page no controlada', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
      paging: { enabled: true, pageSize: 10 },
    });
    expect(normalized.page).toBeUndefined();
    expect(normalized.pageControlled).toBe(false);
    expect(normalized.pageSize).toBe(10);
  });

  it('paging.enabled: false desactiva paginación', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
      paging: { enabled: false, pageSize: 10 },
    });
    expect(normalized.pagination).toBe(false);
  });

  it('sin paging: paginación desactivada', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
      columns,
    });
    expect(normalized.pagination).toBe(false);
  });

  it('lanza si dataSource es null / undefined', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: undefined as unknown as Row[],
        keyExpr: 'id',
        columns,
      }),
    ).toThrow(/Se requiere `dataSource`/);

    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: null as unknown as Row[],
        keyExpr: 'id',
        columns,
      }),
    ).toThrow(/Se requiere `dataSource`/);
  });

  it('lanza si dataSource es envoltorio { items }', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: { items: rows } as unknown as Row[],
        keyExpr: 'id',
        columns,
      }),
    ).toThrow(/dataSource` debe ser un Array/);

    expect(() =>
      assertDataSource({ items: rows }),
    ).toThrow(/\{ items \}/);
  });

  it('lanza si dataSource es Object / otro tipo', () => {
    expect(() => assertDataSource({ Items: rows })).toThrow(/Array/);
    expect(() => assertDataSource(42)).toThrow(/Recibido: number/);
    expect(() => assertDataSource('rows')).toThrow(/Recibido: string/);
  });

  it('lanza si falta keyExpr', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: rows,
        keyExpr: '' as 'id',
        columns,
      }),
    ).toThrow(/keyExpr/);
  });

  it('lanza si columns no es array', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: rows,
        keyExpr: 'id',
        columns: { name: 'x' } as unknown as ColumnDef<Row>[],
      }),
    ).toThrow(/columns` debe ser un Array/);

    expect(() => assertColumns(null)).toThrow(/Se requiere `columns`/);
  });

  it('lanza si pageSizeOptions no es array', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: rows,
        keyExpr: 'id',
        columns,
        pageSizeOptions: { a: 10 } as unknown as number[],
      }),
    ).toThrow(/pageSizeOptions` debe ser un Array/);

    expect(() => assertPageSizeOptions({ ten: 10 })).toThrow(/Array/);
    expect(assertPageSizeOptions(undefined)).toBeUndefined();
  });
});

describe('DataGrid render con dataSource vacío / filas', () => {
  beforeAll(() => {
    class ResizeObserverStub {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  });

  it('dataSource: [] monta toolbar / empty / pager sin tirar', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: [],
        keyExpr: 'id',
        columns,
        layout: 'table',
        paging: { enabled: true, pageIndex: 0, pageSize: 10 },
        showSearch: true,
        emptyMessage: 'Sin datos',
      }),
    );

    expect(html).toContain('glb-datagrid');
    expect(html).toContain('Sin datos');
    expect(html).toContain('Filas por página');
  });

  it('dataSource con 1 fila renderiza la celda', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: [{ id: 1, name: 'Ana' }],
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        paging: { enabled: true, pageIndex: 0, pageSize: 10 },
      }),
    );

    expect(html).toContain('Ana');
  });

  it('dataSource con N filas renderiza varias', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: rows,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        paging: { enabled: true, pageIndex: 0, pageSize: 10 },
      }),
    );

    expect(html).toContain('Ana');
    expect(html).toContain('Bruno');
  });

  it('dataSource envoltorio lanza al renderizar', () => {
    expect(() =>
      renderToString(
        createElement(DataGrid<Row>, {
          dataSource: { items: rows } as unknown as Row[],
          keyExpr: 'id',
          columns,
        }),
      ),
    ).toThrow(/dataSource` debe ser un Array/);
  });
});
