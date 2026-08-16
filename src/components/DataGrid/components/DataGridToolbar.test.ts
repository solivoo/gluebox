import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';
import { DataGrid } from '../DataGrid';
import type { ColumnDef, DataGridToolbarContext } from '../type/DataGrid.types';
import { filterRowsBySearch } from '../utils/gridUtils';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
  module: string;
}

const columns: ColumnDef<Row>[] = [
  { key: 'name', header: 'Nombre' },
  { key: 'module', header: 'Módulo' },
];

const rows: Row[] = [
  { id: 1, name: 'Ana', module: 'Ventas' },
  { id: 2, name: 'Bruno', module: 'IT' },
];

describe('DataGrid toolbar slots', () => {
  beforeAll(() => {
    class ResizeObserverStub {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  });

  it('toolbar ausente si no hay search ni slots', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: rows,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        showSearch: false,
      }),
    );

    expect(html).not.toContain('glb-datagrid__toolbar');
  });

  it('toolbarRight se renderiza junto al search', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: rows,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        showSearch: true,
        toolbarRight: createElement('span', { className: 'toolbar-slot-right' }, 'Módulo'),
      }),
    );

    expect(html).toContain('glb-datagrid__toolbar');
    expect(html).toContain('glb-datagrid__search');
    expect(html).toContain('glb-datagrid__toolbar-right');
    expect(html).toContain('toolbar-slot-right');
    expect(html).toContain('Módulo');
  });

  it('renderToolbar recibe filteredData actualizado al cambiar search', () => {
    let captured: DataGridToolbarContext<Row> | undefined;

    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: rows,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        showSearch: true,
        debounceMs: 0,
        renderToolbar: (ctx) => {
          captured = ctx;
          return createElement(
            'span',
            { 'data-filtered': ctx.filteredData.map((row) => row.name).join(',') },
            null,
          );
        },
      }),
    );

    expect(captured).toBeDefined();
    expect(captured?.dataSource).toEqual(rows);
    expect(captured?.filteredData).toEqual(rows);
    expect(captured?.searchQuery).toBe('');
    expect(html).toContain('data-filtered="Ana,Bruno"');
    expect(html).not.toContain('glb-datagrid__search');

    const afterSearch = filterRowsBySearch(captured?.filteredData ?? [], 'bru', ['name']);
    expect(afterSearch.map((row) => row.name)).toEqual(['Bruno']);

    const parentFiltered = rows.filter((row) => row.module === 'IT');
    let capturedFiltered: DataGridToolbarContext<Row> | undefined;
    const htmlFiltered = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: parentFiltered,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        showSearch: true,
        debounceMs: 0,
        renderToolbar: (ctx) => {
          capturedFiltered = ctx;
          return createElement(
            'span',
            { 'data-filtered': ctx.filteredData.map((row) => row.name).join(',') },
            null,
          );
        },
      }),
    );

    expect(capturedFiltered?.dataSource).toEqual(parentFiltered);
    expect(capturedFiltered?.filteredData).toEqual(parentFiltered);
    expect(htmlFiltered).toContain('data-filtered="Bruno"');
  });
});
