import { describe, expect, it } from 'vitest';
import type { ColumnDef } from '../type/DataGrid.types';
import {
  CHECKBOX_COLUMN_WIDTH,
  computeColumnStickyMeta,
  resolveColumnStyle,
  resolveColumnWidthPx,
} from './columnLayoutUtils';

type Row = {
  id: number;
  code: string;
  name: string;
  category: string;
  actions: string;
} & Record<string, unknown>;

const baseColumns: ColumnDef<Row>[] = [
  { key: 'id', header: 'ID', width: 80 },
  { key: 'code', header: 'Código', width: 120 },
  { key: 'name', header: 'Nombre', width: 200 },
  { key: 'category', header: 'Categoría', width: 150 },
  { key: 'actions', header: 'Acciones', width: 100 },
];

describe('DataGrid Column Sticky calculations', () => {
  it('resuelve anchos en px correctamente con números, cadenas px/rem o fallback', () => {
    expect(resolveColumnWidthPx<Row>({ key: 'id', header: 'ID', width: 90 }, undefined)).toBe(90);
    expect(resolveColumnWidthPx<Row>({ key: 'id', header: 'ID', width: '150px' }, undefined)).toBe(150);
    expect(resolveColumnWidthPx<Row>({ key: 'id', header: 'ID', width: '10rem' }, undefined)).toBe(160);
    expect(resolveColumnWidthPx<Row>({ key: 'id', header: 'ID' }, 220)).toBe(220);
    expect(resolveColumnWidthPx<Row>({ key: 'id', header: 'ID' }, undefined, 80)).toBe(120);
  });

  it('comportamiento por defecto retrocompatible: primera columna sticky si stickyFirstColumn no es false', () => {
    const metaMap = computeColumnStickyMeta<Row>({
      columns: baseColumns,
      stickyFirstColumn: true,
      selectionMode: 'none',
    });

    const idMeta = metaMap.get('id');
    expect(idMeta).toEqual({
      isSticky: true,
      position: 'left',
      offset: 0,
      isEdge: true,
    });

    const codeMeta = metaMap.get('code');
    expect(codeMeta?.isSticky).toBe(false);
  });

  it('desactiva sticky si stickyFirstColumn es false y ninguna columna define sticky', () => {
    const metaMap = computeColumnStickyMeta<Row>({
      columns: baseColumns,
      stickyFirstColumn: false,
    });

    expect(metaMap.get('id')?.isSticky).toBe(false);
    expect(metaMap.get('code')?.isSticky).toBe(false);
  });

  it('agrega offset del checkbox cuando selectionMode es multiple', () => {
    const metaMap = computeColumnStickyMeta<Row>({
      columns: baseColumns,
      stickyFirstColumn: true,
      selectionMode: 'multiple',
    });

    const idMeta = metaMap.get('id');
    expect(idMeta?.offset).toBe(CHECKBOX_COLUMN_WIDTH);
    expect(idMeta?.isEdge).toBe(true);
  });

  it('soporta múltiples columnas sticky a la izquierda con cálculo acumulativo', () => {
    const columns: ColumnDef<Row>[] = [
      { key: 'id', header: 'ID', width: 80, sticky: 'left' },
      { key: 'code', header: 'Código', width: 120, sticky: true }, // sticky: true equivale a 'left'
      { key: 'name', header: 'Nombre', width: 200 },
      { key: 'category', header: 'Categoría', width: 150 },
      { key: 'actions', header: 'Acciones', width: 100 },
    ];

    const metaMap = computeColumnStickyMeta<Row>({
      columns,
      selectionMode: 'none',
    });

    expect(metaMap.get('id')).toEqual({
      isSticky: true,
      position: 'left',
      offset: 0,
      isEdge: false,
    });

    expect(metaMap.get('code')).toEqual({
      isSticky: true,
      position: 'left',
      offset: 80, // offset id (0) + width id (80)
      isEdge: true, // es la última de la izquierda
    });

    expect(metaMap.get('name')?.isSticky).toBe(false);
  });

  it('soporta columnas sticky a la derecha con cálculo acumulativo', () => {
    const columns: ColumnDef<Row>[] = [
      { key: 'id', header: 'ID', width: 80 },
      { key: 'code', header: 'Código', width: 120 },
      { key: 'name', header: 'Nombre', width: 200 },
      { key: 'category', header: 'Categoría', width: 150, sticky: 'right' },
      { key: 'actions', header: 'Acciones', width: 100, sticky: 'right' },
    ];

    const metaMap = computeColumnStickyMeta<Row>({
      columns,
    });

    expect(metaMap.get('actions')).toEqual({
      isSticky: true,
      position: 'right',
      offset: 0,
      isEdge: false,
    });

    expect(metaMap.get('category')).toEqual({
      isSticky: true,
      position: 'right',
      offset: 100, // width de actions
      isEdge: true, // es el borde izquierdo del grupo sticky derecho
    });
  });

  it('soporta simultáneamente columnas sticky a la izquierda y a la derecha', () => {
    const columns: ColumnDef<Row>[] = [
      { key: 'id', header: 'ID', width: 80, sticky: 'left' },
      { key: 'name', header: 'Nombre', width: 200 },
      { key: 'actions', header: 'Acciones', width: 100, sticky: 'right' },
    ];

    const metaMap = computeColumnStickyMeta<Row>({
      columns,
      selectionMode: 'multiple',
    });

    expect(metaMap.get('id')).toEqual({
      isSticky: true,
      position: 'left',
      offset: CHECKBOX_COLUMN_WIDTH,
      isEdge: true,
    });

    expect(metaMap.get('name')?.isSticky).toBe(false);

    expect(metaMap.get('actions')).toEqual({
      isSticky: true,
      position: 'right',
      offset: 0,
      isEdge: true,
    });
  });

  it('actualiza los offsets dinámicamente cuando cambian los columnWidths (redimensionamiento)', () => {
    const columns: ColumnDef<Row>[] = [
      { key: 'id', header: 'ID', width: 80, sticky: 'left' },
      { key: 'code', header: 'Código', width: 120, sticky: 'left' },
      { key: 'name', header: 'Nombre' },
    ];

    // Simula que la columna 'id' fue redimensionada a 140px
    const metaMap = computeColumnStickyMeta<Row>({
      columns,
      columnWidths: { id: 140 },
    });

    expect(metaMap.get('id')?.offset).toBe(0);
    expect(metaMap.get('code')?.offset).toBe(140);
  });

  it('resolveColumnStyle aplica position sticky y offsets inline', () => {
    const col: ColumnDef<Row> = { key: 'code', header: 'Código', width: 120, sticky: 'left' };
    const stickyMeta = {
      isSticky: true,
      position: 'left' as const,
      offset: 80,
      isEdge: true,
    };

    const style = resolveColumnStyle(col, undefined, 72, stickyMeta);
    expect(style.position).toBe('sticky');
    expect(style.left).toBe('80px');
    expect(style.right).toBeUndefined();

    const rightStickyMeta = {
      isSticky: true,
      position: 'right' as const,
      offset: 50,
      isEdge: true,
    };
    const rightStyle = resolveColumnStyle(col, undefined, 72, rightStickyMeta);
    expect(rightStyle.position).toBe('sticky');
    expect(rightStyle.right).toBe('50px');
    expect(rightStyle.left).toBeUndefined();
  });
});
