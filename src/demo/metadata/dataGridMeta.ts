import type { ComponentMeta } from '@/demo/playground/types';
import type { DataGridProps } from '@/components/DataGrid';
import type { DemoEmployee } from '@/demo/data/dataGridDemoData';

/** Props expuestas en el playground (data/columns/getRowId los inyecta el demo). */
export type DataGridPlaygroundDefaults = Partial<
  Omit<DataGridProps<DemoEmployee>, 'data' | 'columns' | 'getRowId'>
>;

export const dataGridMeta: ComponentMeta<DataGridPlaygroundDefaults> = {
  name: 'DataGrid',
  description:
    'Tabla empresarial con búsqueda, ordenamiento, selección, paginación, virtualización y layout auto (tabla/tarjetas). Lógica en useDataGridController.',
  sourcePath: 'src/components/DataGrid/DataGrid.tsx',
  fullWidthPreview: true,
  defaults: {
    selectionMode: 'multiple',
    showSearch: true,
    searchPosition: 'left',
    stickyFirstColumn: true,
    loading: false,
    searchPlaceholder: 'Buscar empleados...',
    searchWidth: undefined,
    height: 380,
    rowHeight: 44,
    fullWidth: true,
    width: undefined,
    debounceMs: 300,
    virtualized: true,
    virtualThreshold: 30,
    overscan: 5,
    showRowCount: true,
    showSelectionCount: true,
    pagination: true,
    paginationMode: 'client',
    defaultPageSize: 25,
    resizableColumns: true,
    reorderableColumns: true,
    layout: 'auto',
    cardOnMobile: true,
    cardBreakpoint: 640,
    maxRecords: undefined,
  },
  sections: [
    {
      title: 'Comportamiento',
      props: [
        {
          name: 'selectionMode',
          type: 'DataGridSelectionMode',
          defaultValue: 'multiple',
          description: 'Modo de selección: none, single o multiple (checkboxes).',
          control: 'select',
          options: [
            { label: 'Ninguna', value: 'none' },
            { label: 'Única', value: 'single' },
            { label: 'Múltiple', value: 'multiple' },
          ],
        },
        {
          name: 'showSearch',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra el buscador integrado en la cabecera.',
          control: 'boolean',
        },
        {
          name: 'searchPosition',
          type: 'DataGridSearchPosition',
          defaultValue: 'left',
          description: 'Posición del buscador en la toolbar: izquierda o derecha.',
          control: 'select',
          options: [
            { label: 'Izquierda', value: 'left' },
            { label: 'Derecha', value: 'right' },
          ],
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          defaultValue: 'Buscar empleados...',
          description: 'Placeholder del input de búsqueda.',
          control: 'text',
        },
        {
          name: 'searchWidth',
          type: 'string | number',
          defaultValue: undefined,
          description:
            'Ancho del campo de búsqueda. Ej: "240px", 280, "100%". Sin valor usa ancho flexible (máx. 24rem).',
          control: 'text',
        },
        {
          name: 'debounceMs',
          type: 'number',
          defaultValue: 300,
          description: 'Retraso del debounce de búsqueda en milisegundos.',
          control: 'number',
        },
        {
          name: 'stickyFirstColumn',
          type: 'boolean',
          defaultValue: true,
          description: 'Fija la primera columna al hacer scroll horizontal.',
          control: 'boolean',
        },
        {
          name: 'pagination',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra paginación en el pie del grid.',
          control: 'boolean',
        },
        {
          name: 'paginationMode',
          type: 'DataGridPaginationMode',
          defaultValue: 'client',
          description: 'client: pagina datos filtrados localmente. server: data es la página actual.',
          control: 'select',
          options: [
            { label: 'Client', value: 'client' },
            { label: 'Server', value: 'server' },
          ],
        },
        {
          name: 'defaultPageSize',
          type: 'number',
          defaultValue: 25,
          description: 'Cantidad de filas por página (no controlado).',
          control: 'number',
        },
        {
          name: 'resizableColumns',
          type: 'boolean',
          defaultValue: true,
          description: 'Permite redimensionar columnas desde el borde del header.',
          control: 'boolean',
        },
        {
          name: 'reorderableColumns',
          type: 'boolean',
          defaultValue: true,
          description: 'Permite reordenar columnas arrastrando el header.',
          control: 'boolean',
        },
        {
          name: 'layout',
          type: 'DataGridLayout',
          defaultValue: 'auto',
          description:
            'table, card o auto (recomendado: card si el ancho del grid ≤ cardBreakpoint).',
          control: 'select',
          options: [
            { label: 'Auto (responsive)', value: 'auto' },
            { label: 'Tabla', value: 'table' },
            { label: 'Card', value: 'card' },
          ],
        },
        {
          name: 'cardOnMobile',
          type: 'boolean',
          defaultValue: true,
          description:
            'Solo con layout table: pasa a card si el grid es estrecho. Con auto no hace falta.',
          control: 'boolean',
        },
        {
          name: 'cardBreakpoint',
          type: 'number',
          defaultValue: 640,
          description:
            'Ancho máximo del contenedor del grid (px) para usar cards en auto / cardOnMobile.',
          control: 'number',
        },
        {
          name: 'maxRecords',
          type: 'number',
          defaultValue: undefined,
          description:
            'Máximo de registros por vista/página. Limita pageSize y opciones del selector.',
          control: 'number',
        },
        {
          name: 'showRowCount',
          type: 'boolean',
          defaultValue: true,
          description:
            'Muestra el total de registros en la barra de resumen (sobre la paginación).',
          control: 'boolean',
        },
        {
          name: 'showSelectionCount',
          type: 'boolean',
          defaultValue: true,
          description:
            'Muestra cuántas filas están seleccionadas en la barra de resumen.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Layout',
      props: [
        {
          name: 'fullWidth',
          type: 'boolean',
          defaultValue: true,
          description: 'Si true, el grid ocupa todo el ancho disponible.',
          control: 'boolean',
        },
        {
          name: 'width',
          type: 'string | number',
          defaultValue: undefined,
          description:
            'Ancho fijo del grid. Ej: "320px", 720, "100%". Prevalece sobre fullWidth.',
          control: 'text',
        },
        {
          name: 'height',
          type: 'string | number',
          defaultValue: 380,
          description:
            'Altura del viewport con scroll. En table y card controla el área desplazable.',
          control: 'number',
        },
        {
          name: 'rowHeight',
          type: 'number',
          defaultValue: 44,
          description: 'Altura fija de cada fila en px (usada por la virtualización).',
          control: 'number',
        },
        {
          name: 'virtualized',
          type: 'boolean',
          defaultValue: true,
          description: 'Activa virtualización cuando hay suficientes filas.',
          control: 'boolean',
        },
        {
          name: 'virtualThreshold',
          type: 'number',
          defaultValue: 30,
          description: 'Cantidad mínima de filas para activar virtualización.',
          control: 'number',
        },
        {
          name: 'overscan',
          type: 'number',
          defaultValue: 5,
          description: 'Filas extra renderizadas como buffer fuera del viewport.',
          control: 'number',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'Muestra overlay de carga sobre la tabla.',
          control: 'boolean',
        },
      ],
    },
    {
      title: 'Tema',
      props: [
        {
          name: 'theme',
          type: 'DataGridThemeInput',
          defaultValue: undefined,
          description: 'Preset o tema personalizado del grid.',
          control: 'select',
          options: [
            { label: 'Default (sin override)', value: '' },
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Modern Dark', value: 'modern-dark' },
            { label: 'Modern Light', value: 'modern-light' },
            { label: 'Enterprise Dark', value: 'enterprise-dark' },
            { label: 'Enterprise Light', value: 'enterprise-light' },
          ],
        },
      ],
    },
  ],
  events: [
    {
      name: 'onRowSelect',
      signature: '(row: T) => void',
      description: 'Se dispara al seleccionar una fila en modo single.',
      handlerType: 'DataGridOnRowSelectHandler',
    },
    {
      name: 'onSelectionChange',
      signature: '(selectedRows: T[]) => void',
      description: 'Se dispara cuando cambia el conjunto de filas seleccionadas.',
      handlerType: 'DataGridOnSelectionChangeHandler',
    },
    {
      name: 'onCardSelect',
      signature: '(row: T) => void',
      description:
        'Se dispara al activar una tarjeta en layout card. Entrega la fila seleccionada o pulsada.',
      handlerType: 'DataGridOnCardSelectHandler',
    },
    {
      name: 'onPageChange',
      signature: '(page: number) => void',
      description: 'Se dispara al cambiar de página (1-based).',
      handlerType: 'DataGridOnPageChangeHandler',
    },
    {
      name: 'onPageSizeChange',
      signature: '(pageSize: number) => void',
      description: 'Se dispara al cambiar el tamaño de página.',
      handlerType: 'DataGridOnPageSizeChangeHandler',
    },
  ],
};
