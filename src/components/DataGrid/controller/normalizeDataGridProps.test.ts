import { describe, expect, it } from 'vitest';
import { normalizeDataGridProps } from './normalizeDataGridProps';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
}

const rows: Row[] = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
];

describe('normalizeDataGridProps', () => {
  it('dataSource + keyExpr → data y getRowId', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
    });
    expect(normalized.data).toBe(rows);
    expect(normalized.getRowId(rows[0])).toBe(1);
    expect(normalized.pagination).toBe(false);
  });

  it('paging.pageIndex 0-based → page interna 1-based', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
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
      paging: { pageIndex: 2 },
    });
    expect(normalized.page).toBe(3);
    expect(normalized.defaultPageSize).toBe(20);
  });

  it('paging sin pageIndex deja page no controlada', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
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
      paging: { enabled: false, pageSize: 10 },
    });
    expect(normalized.pagination).toBe(false);
  });

  it('sin paging: paginación desactivada', () => {
    const normalized = normalizeDataGridProps<Row>({
      dataSource: rows,
      keyExpr: 'id',
    });
    expect(normalized.pagination).toBe(false);
  });

  it('lanza si falta dataSource', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: undefined as unknown as Row[],
        keyExpr: 'id',
      }),
    ).toThrow(/dataSource/);
  });

  it('lanza si falta keyExpr', () => {
    expect(() =>
      normalizeDataGridProps<Row>({
        dataSource: rows,
        keyExpr: '' as 'id',
      }),
    ).toThrow(/keyExpr/);
  });
});
