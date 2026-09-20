import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DataGrid } from './DataGrid';
import type { ColumnDef } from './type/DataGrid.types';

interface TestRecord extends Record<string, unknown> {
  id: number;
  name: string;
  role: string;
}

const columns: ColumnDef<TestRecord>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nombre' },
  { key: 'role', header: 'Rol' },
];

const data: TestRecord[] = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Editor' },
  { id: 3, name: 'Charlie', role: 'Viewer' },
];

describe('DataGrid Touch Scroll & Surface Sizing', () => {
  beforeAll(() => {
    class ResizeObserverStub {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  });

  describe('Discriminación de clase glb-datagrid--surface-sized', () => {
    it('sin height ni maxHeight, NO incluye glb-datagrid--surface-sized (permite flujo natural de scroll)', () => {
      const html = renderToString(
        createElement(DataGrid<TestRecord>, {
          dataSource: data,
          keyExpr: 'id',
          columns,
          layout: 'table',
        }),
      );

      expect(html).toContain('glb-datagrid');
      expect(html).not.toContain('glb-datagrid--surface-sized');
      expect(html).not.toContain('glb-datagrid--card-layout');
    });

    it('con height en píxeles, SÍ incluye glb-datagrid--surface-sized', () => {
      const html = renderToString(
        createElement(DataGrid<TestRecord>, {
          dataSource: data,
          keyExpr: 'id',
          columns,
          layout: 'table',
          height: 400,
        }),
      );

      expect(html).toContain('glb-datagrid');
      expect(html).toContain('glb-datagrid--surface-sized');
    });

    it('con maxHeight en string (CSS), SÍ incluye glb-datagrid--surface-sized', () => {
      const html = renderToString(
        createElement(DataGrid<TestRecord>, {
          dataSource: data,
          keyExpr: 'id',
          columns,
          layout: 'table',
          maxHeight: '60vh',
        }),
      );

      expect(html).toContain('glb-datagrid');
      expect(html).toContain('glb-datagrid--surface-sized');
    });

    it('en layout card sin height, incluye glb-datagrid--card-layout pero NO glb-datagrid--surface-sized', () => {
      const html = renderToString(
        createElement(DataGrid<TestRecord>, {
          dataSource: data,
          keyExpr: 'id',
          columns,
          layout: 'card',
        }),
      );

      expect(html).toContain('glb-datagrid');
      expect(html).toContain('glb-datagrid--card-layout');
      expect(html).not.toContain('glb-datagrid--surface-sized');
    });

    it('en layout card con height, incluye tanto glb-datagrid--card-layout como glb-datagrid--surface-sized', () => {
      const html = renderToString(
        createElement(DataGrid<TestRecord>, {
          dataSource: data,
          keyExpr: 'id',
          columns,
          layout: 'card',
          height: 500,
        }),
      );

      expect(html).toContain('glb-datagrid');
      expect(html).toContain('glb-datagrid--card-layout');
      expect(html).toContain('glb-datagrid--surface-sized');
    });
  });

  describe('Verificación de Reglas CSS de Touch Scroll en DataGrid.css', () => {
    const cssContent = readFileSync(
      resolve(__dirname, 'css/DataGrid.css'),
      'utf-8',
    );

    it('contiene las reglas de flujo de viewport y scroll para modo tarjetas sin altura fija', () => {
      expect(cssContent).toContain(
        '.glb-datagrid--card-layout:not(.glb-datagrid--surface-sized) .glb-datagrid__viewport',
      );
      expect(cssContent).toContain(
        '.glb-datagrid--card-layout:not(.glb-datagrid--surface-sized) .glb-datagrid__scroll--cards',
      );
    });

    it('configura touch-action: pan-y y overscroll-behavior: auto en tarjetas sin altura fija', () => {
      expect(cssContent).toMatch(
        /\.glb-datagrid--card-layout:not\(\.glb-datagrid--surface-sized\)\s+\.glb-datagrid__scroll--cards\s*\{[^}]*overscroll-behavior:\s*auto;/,
      );
      expect(cssContent).toMatch(
        /\.glb-datagrid--card-layout:not\(\.glb-datagrid--surface-sized\)\s+\.glb-datagrid__scroll--cards\s*\{[^}]*touch-action:\s*pan-y;/,
      );
      expect(cssContent).toMatch(
        /\.glb-datagrid--card-layout\s+\.glb-datagrid__cards\s*\{[^}]*touch-action:\s*pan-y;/,
      );
      expect(cssContent).toMatch(
        /\.glb-datagrid--card-layout\s+\.glb-datagrid__card\s*\{[^}]*touch-action:\s*pan-y;/,
      );
    });

    it('contiene las reglas de flujo vertical y scroll horizontal para modo tabla sin altura fija', () => {
      expect(cssContent).toContain(
        '.glb-datagrid:not(.glb-datagrid--virtualized):not(.glb-datagrid--surface-sized):not(.glb-datagrid--card-layout) .glb-datagrid__viewport',
      );
      expect(cssContent).toContain(
        '.glb-datagrid:not(.glb-datagrid--virtualized):not(.glb-datagrid--surface-sized):not(.glb-datagrid--card-layout) .glb-datagrid__scroll',
      );
    });

    it('configura touch-action: pan-x pan-y y overscroll en tabla sin altura fija', () => {
      expect(cssContent).toMatch(
        /\.glb-datagrid:not\(\.glb-datagrid--virtualized\):not\(\.glb-datagrid--surface-sized\):not\(\.glb-datagrid--card-layout\)\s+\.glb-datagrid__scroll\s*\{[^}]*touch-action:\s*pan-x\s+pan-y;/,
      );
      expect(cssContent).toMatch(
        /\.glb-datagrid:not\(\.glb-datagrid--virtualized\):not\(\.glb-datagrid--surface-sized\):not\(\.glb-datagrid--card-layout\)\s+\.glb-datagrid__scroll\s*\{[^}]*overscroll-behavior-x:\s*contain;/,
      );
      expect(cssContent).toMatch(
        /\.glb-datagrid:not\(\.glb-datagrid--virtualized\):not\(\.glb-datagrid--surface-sized\):not\(\.glb-datagrid--card-layout\)\s+\.glb-datagrid__scroll\s*\{[^}]*overscroll-behavior-y:\s*auto;/,
      );
    });
  });
});
