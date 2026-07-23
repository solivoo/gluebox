import type { ComponentMeta } from '@/demo/playground/types';
import type { DataGridProps } from '@/components/DataGrid';
import type { DemoEmployee } from '@/demo/data/dataGridDemoData';

/** Controles del playground (dataSource/columns/keyExpr los inyecta el demo). */
export type DataGridPlaygroundDefaults = Partial<
  Omit<
    DataGridProps<DemoEmployee>,
    'dataSource' | 'columns' | 'keyExpr' | 'paging' | 'onPageChange' | 'onPageSizeChange'
  >
> & {
  /** Control plano → paging.enabled */
  pagingEnabled?: boolean;
  /** Control plano → paging.pageIndex (0-based) */
  pageIndex?: number;
  /** Control plano → paging.pageSize */
  pageSize?: number;
};

export const dataGridMeta: ComponentMeta<DataGridPlaygroundDefaults> = {
  name: 'DataGrid',
  description:
    'Tabla empresarial con dataSource, keyExpr, paging, búsqueda, selección, virtualización y layout auto (tabla/tarjetas).',
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
    height: undefined,
    maxHeight: undefined,
    rowHeight: 44,
    autoRowHeight: true,
    fullWidth: true,
    width: undefined,
    debounceMs: 300,
    virtualized: true,
    virtualThreshold: 30,
    overscan: 5,
    showRowCount: true,
    showSelectionCount: true,
    pagingEnabled: true,
    paginationMode: 'client',
    pageIndex: 0,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
    resizableColumns: true,
    reorderableColumns: true,
    layout: 'auto',
    cardOnMobile: true,
    cardBreakpoint: 640,
    maxRecords: undefined,
  },
  sections: [
    {
      title: 'Datos',
      props: [
        {
          name: 'dataSource',
          type: 'T[]',
          defaultValue: undefined,
          description:
            'Estructura: array plano de objetos fila (T[]). Requerido. `[]` OK. No pasar `{ items }` / `{ data }` — usá response.items.',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'keyExpr',
          type: 'keyof T | string',
          defaultValue: undefined,
          description:
            'Campo clave de cada fila (debe existir en T y ser string | number). Ej: "id".',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'columns',
          type: 'ColumnDef<T>[]',
          defaultValue: undefined,
          description:
            'Array de columnas tipadas: { key, header, sortable?, renderCell? }. key ∈ keyof T.',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'paging',
          type: 'DataGridPaging',
          defaultValue: undefined,
          description:
            'Paginación: { enabled?, pageIndex? (0-based), pageSize? }. Default pageSize 20 si se pasa el objeto.',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'totalRowCount',
          type: 'number',
          defaultValue: undefined,
          description: 'Total de registros en modo server (requerido si paginationMode="server").',
          control: 'number',
          hideInPlayground: true,
        },
      ],
    },
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
          name: 'selectedRowIds',
          type: 'Array<string | number>',
          defaultValue: undefined,
          description: 'IDs seleccionados en modo controlado (con onSelectionChange).',
          control: 'slot',
          hideInPlayground: true,
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
          name: 'searchKeys',
          type: 'Array<keyof T>',
          defaultValue: undefined,
          description: 'Claves sobre las que filtrar; por defecto todas las columnas visibles.',
          control: 'slot',
          hideInPlayground: true,
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
          name: 'pagingEnabled',
          type: 'boolean',
          defaultValue: true,
          description: 'Control del playground → paging.enabled.',
          control: 'boolean',
          hideInDocs: true,
        },
        {
          name: 'paginationMode',
          type: 'DataGridPaginationMode',
          defaultValue: 'client',
          description:
            'client: pagina datos filtrados localmente. server: dataSource es la página actual.',
          control: 'select',
          options: [
            { label: 'Client', value: 'client' },
            { label: 'Server', value: 'server' },
          ],
        },
      ],
    },
    {
      title: 'Paginación',
      props: [
        {
          name: 'pageIndex',
          type: 'number',
          defaultValue: 0,
          description: 'Control del playground → paging.pageIndex (0-based).',
          control: 'number',
          dependsOn: { prop: 'pagingEnabled', value: true },
          hideInDocs: true,
        },
        {
          name: 'pageSize',
          type: 'number',
          defaultValue: 20,
          description: 'Control del playground → paging.pageSize.',
          control: 'number',
          dependsOn: { prop: 'pagingEnabled', value: true },
          hideInDocs: true,
        },
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          defaultValue: [10, 20, 50, 100],
          description: 'Opciones del selector de filas por página.',
          control: 'slot',
          dependsOn: { prop: 'pagingEnabled', value: true },
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
          name: 'maxRecords',
          type: 'number',
          defaultValue: undefined,
          description:
            'Máximo de registros por vista/página. Limita pageSize y opciones del selector.',
          control: 'number',
        },
      ],
    },
    {
      title: 'Layout',
      props: [
        {
          name: 'layout',
          type: 'DataGridLayout',
          defaultValue: 'auto',
          description:
            'table: siempre tabla. card: siempre tarjetas. auto: card si el contenedor es estrecho.',
          control: 'select',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Tabla', value: 'table' },
            { label: 'Tarjetas', value: 'card' },
          ],
        },
        {
          name: 'renderCard',
          type: 'DataGridRenderCard<T>',
          defaultValue: undefined,
          description:
            'Función que recibe DataGridCardRenderContext (row, selected, selectionMode…) y renderiza la tarjeta.',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'renderCardComponent',
          type: 'DataGridCardComponent<T>',
          defaultValue: undefined,
          description:
            'Componente React con las props de DataGridCardRenderContext. Preferible a renderCard.',
          control: 'slot',
          hideInPlayground: true,
        },
        {
          name: 'cardOnMobile',
          type: 'boolean',
          defaultValue: true,
          description:
            'Con layout table: fuerza cards bajo cardBreakpoint (preferí layout=auto).',
          control: 'boolean',
        },
        {
          name: 'cardBreakpoint',
          type: 'number',
          defaultValue: 640,
          description: 'Ancho máximo (px) para activar layout card en auto / cardOnMobile.',
          control: 'number',
        },
      ],
    },
    {
      title: 'Apariencia',
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
          defaultValue: undefined,
          description:
            'Sin valor: se encoge a las filas. Con valor: techo (max-height) en fit-content.',
          control: 'text',
        },
        {
          name: 'maxHeight',
          type: 'string | number',
          defaultValue: undefined,
          description:
            'Tope de crecimiento. Si hay height, height prevalece como techo.',
          control: 'text',
        },
        {
          name: 'autoRowHeight',
          type: 'boolean',
          defaultValue: true,
          description:
            'Filas según contenido real (celdas de 2+ líneas). Ignorado con virtualización.',
          control: 'boolean',
        },
        {
          name: 'rowHeight',
          type: 'number | "auto"',
          defaultValue: 44,
          description:
            'Solo virtualización: estimación en px. Usá auto / autoRowHeight para fit-content.',
          control: 'number',
        },
        {
          name: 'virtualized',
          type: 'boolean',
          defaultValue: true,
          description:
            'Activa virtualización cuando hay suficientes filas y height/maxHeight.',
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
          description: 'Filas extra renderizadas fuera del viewport (buffer).',
          control: 'number',
        },
        {
          name: 'showRowCount',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra el contador total de registros.',
          control: 'boolean',
        },
        {
          name: 'showSelectionCount',
          type: 'boolean',
          defaultValue: true,
          description: 'Muestra cuántas filas hay seleccionadas.',
          control: 'boolean',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'Estado de carga (overlay sobre la tabla).',
          control: 'boolean',
        },
        {
          name: 'theme',
          type: 'DataGridThemePreset | DataGridTheme',
          defaultValue: undefined,
          description: 'Preset (ej. enterprise-dark) o tema parcial personalizado.',
          control: 'select',
          options: [
            { label: 'Global (inherit)', value: '' },
            { label: 'Default light', value: 'default-light' },
            { label: 'Default dark', value: 'default-dark' },
            { label: 'Modern light', value: 'modern-light' },
            { label: 'Modern dark', value: 'modern-dark' },
            { label: 'Enterprise light', value: 'enterprise-light' },
            { label: 'Enterprise dark', value: 'enterprise-dark' },
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
      payloadType: 'T',
    },
    {
      name: 'onSelectionChange',
      signature: '(selectedRows: T[]) => void',
      description:
        'Cambia el conjunto seleccionado (single y multiple). En card, al clic también se actualiza la selección.',
      handlerType: 'DataGridOnSelectionChangeHandler',
      payloadType: 'T[]',
    },
    {
      name: 'onCardSelect',
      signature: '(row: T) => void',
      description:
        'Se dispara al activar una tarjeta (layout card). No reemplaza onSelectionChange.',
      handlerType: 'DataGridOnCardSelectHandler',
      payloadType: 'T',
    },
    {
      name: 'onPageChange',
      signature: '(pageIndex: number) => void',
      description: 'Cambio de página (pageIndex 0-based).',
      handlerType: 'DataGridOnPageChangeHandler',
      payloadType: 'number',
    },
    {
      name: 'onPageSizeChange',
      signature: '(pageSize: number) => void',
      description: 'Cambio del tamaño de página.',
      handlerType: 'DataGridOnPageSizeChangeHandler',
      payloadType: 'number',
    },
  ],
};
