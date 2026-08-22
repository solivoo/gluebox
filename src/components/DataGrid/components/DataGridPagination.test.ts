import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { DataGrid } from '../DataGrid';
import type { ColumnDef } from '../type/DataGrid.types';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [{ key: 'name', header: 'Nombre' }];

const rows: Row[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Fila ${index + 1}`,
}));

describe('DataGrid pagination Select', () => {
  beforeAll(() => {
    class ResizeObserverStub {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  });

  it('usa el Select de glubox, no un <select> nativo', () => {
    const html = renderToString(
      createElement(DataGrid<Row>, {
        dataSource: rows,
        keyExpr: 'id',
        columns,
        layout: 'table',
        virtualized: false,
        showSearch: false,
        paging: { enabled: true, pageIndex: 0, pageSize: 10 },
      }),
    );

    expect(html).toContain('glb-datagrid__pagination');
    expect(html).toContain('glb-datagrid__pagination-select');
    expect(html).toContain('role="combobox"');
    expect(html).not.toMatch(/<select\b[^>]*glb-datagrid__pagination-select/);
  });
});

describe('DataGrid pagination CSS', () => {
  it('el pager no usa appearance nativo del SO', () => {
    const cssPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../css/DataGrid.css',
    );
    const css = readFileSync(cssPath, 'utf8');
    expect(css).toMatch(
      /\.glb-datagrid__pagination-select\s*\{[^}]*appearance:\s*none/s,
    );
    expect(css).not.toMatch(
      /\.glb-datagrid__pagination-select[^{]*\{[^}]*appearance:\s*(auto|menulist)/s,
    );
  });
});
