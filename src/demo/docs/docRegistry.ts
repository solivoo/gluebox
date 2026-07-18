import type { ComponentMeta } from '@/demo/playground/types';
import { buttonMeta } from '@/demo/metadata/buttonMeta';
import { selectMeta } from '@/demo/metadata/selectMeta';
import { textBoxMeta } from '@/demo/metadata/textBoxMeta';
import { textAreaMeta } from '@/demo/metadata/textAreaMeta';
import { sidebarMeta } from '@/demo/metadata/sidebarMeta';
import { dateBoxMeta } from '@/demo/metadata/dateBoxMeta';
import { rangeDateBoxMeta } from '@/demo/metadata/rangeDateBoxMeta';
import { optionGroupMeta } from '@/demo/metadata/optionGroupMeta';
import { checkButtonMeta } from '@/demo/metadata/checkButtonMeta';
import { popupMeta } from '@/demo/metadata/popupMeta';
import { toastMeta } from '@/demo/metadata/toastMeta';
import { dataGridMeta } from '@/demo/metadata/dataGridMeta';
import { pageActionsMenuMeta } from '@/demo/metadata/pageActionsMenuMeta';

export interface DocEntry {
  component: string;
  label: string;
  description: string;
  meta: ComponentMeta<object>;
  importPath: string;
  installNote: string;
  /** Ejemplo de uso básico (reemplaza el snippet genérico en Getting Started) */
  basicUsage?: string;
  /** Notas / contrato de datos bajo Getting Started */
  dataContract?: string;
}

export const componentDocEntries: Record<string, DocEntry> = {
  button: {
    component: 'Button',
    label: 'Button',
    description:
      'Botón multi-variante con soporte para íconos, estado de carga, tema claro/oscuro y todos los estados interactivos.',
    meta: buttonMeta,
    importPath: "import { Button } from 'glubox';",
    installNote:
      'El botón usa Poppins como fuente (incluida en base.css). No requiere dependencias adicionales.',
  },
  select: {
    component: 'Select',
    label: 'Select',
    description:
      'Select con opciones, búsqueda type-ahead, navegación por teclado, label top/flotante/left, variantes visuales y estados de error/ayuda.',
    meta: selectMeta,
    importPath: "import { Select } from 'glubox';",
    installNote:
      'El Select gestiona su propio estado interno (abrir/cerrar, valor seleccionado). No requiere librerías externas de dropdown.',
  },
  textbox: {
    component: 'TextBox',
    label: 'TextBox',
    description:
      'Campo de texto con variantes visuales, label top/flotante/left, íconos izquierdo/derecho, botón de limpiar, estados de error/ayuda y temas.',
    meta: textBoxMeta,
    importPath: "import { TextBox } from 'glubox';",
    installNote:
      'TextBox extiende InputHTMLAttributes. Compatible con formularios controlados y no controlados.',
  },
  textarea: {
    component: 'TextArea',
    label: 'TextArea',
    description:
      'Campo de texto multilínea con filas configurables, resize, label top/flotante/outlined/left, clearable, estados de error/ayuda y temas.',
    meta: textAreaMeta,
    importPath: "import { TextArea } from 'glubox';",
    installNote:
      'TextArea extiende TextareaHTMLAttributes. Compatible con formularios controlados y no controlados.',
  },
  sidebar: {
    component: 'Sidebar',
    label: 'Sidebar',
    description:
      'Barra lateral de navegación con menú jerárquico multi-nivel, soporte de permisos RBAC/ABAC, colapsado, modo acordeón y temas.',
    meta: sidebarMeta,
    importPath: "import { Sidebar } from 'glubox';",
    installNote:
      'El Sidebar no depende de React Router. Recibe activePath y onNavigate como props, haciéndolo portable.',
  },
  datebox: {
    component: 'DateBox',
    label: 'DateBox',
    description:
      'Selector de fecha individual con variantes visuales, label top/flotante/left, icono de calendario, botón de limpiar, restricciones min/max y temas.',
    meta: dateBoxMeta,
    importPath: "import { DateBox } from 'glubox';",
    installNote:
      'DateBox usa el input nativo type="date" con calendario del navegador. No requiere librerías externas de date picker.',
  },
  rangedatebox: {
    component: 'RangeDateBox',
    label: 'RangeDateBox',
    description:
      'Selector de rango de fechas con campos inicio/fin vinculados, separador personalizable, validación, y todas las variantes y temas de gluBox.',
    meta: rangeDateBoxMeta,
    importPath: "import { RangeDateBox } from 'glubox';",
    installNote:
      'RangeDateBox vincula automáticamente los campos inicio/fin: la fecha de inicio no puede superar a la de fin y viceversa.',
  },
  optiongroup: {
    component: 'OptionGroup',
    label: 'OptionGroup',
    description:
      'Grupo de opciones de selección exclusiva (radio) con layouts vertical, horizontal y segmentado, label, error/ayuda y 6 presets de tema.',
    meta: optionGroupMeta,
    importPath: "import { OptionGroup } from 'glubox';",
    installNote:
      'OptionGroup es controlado o no controlado (value/defaultValue). Compatible con formularios y accesibilidad ARIA radiogroup.',
  },
  checkbutton: {
    component: 'CheckButton',
    label: 'CheckButton',
    description:
      'Botón con semántica de checkbox: alterna marcado/desmarcado con apariencia de botón, ícono de check, estado indeterminado y temas gluBox.',
    meta: checkButtonMeta,
    importPath: "import { CheckButton } from 'glubox';",
    installNote:
      'CheckButton usa role="checkbox" y aria-checked. Soporta checked/defaultChecked para modos controlado y no controlado.',
  },
  popup: {
    component: 'Popup',
    label: 'Popup',
    description:
      'Diálogo modal con ancho/alto configurables, contenido libre, pie con botones (alineación derecha por defecto), botón cerrar y arrastre desde la cabecera.',
    meta: popupMeta,
    importPath: "import { Popup } from 'glubox';",
    installNote:
      'Popup renderiza en portal a document.body. Requiere estado controlado open/onClose.',
  },
  toast: {
    component: 'Toast',
    label: 'Toast',
    description:
      'Notificaciones no bloqueantes con posicionamiento en viewport, título, botón cerrar y variantes success/warning/error/info.',
    meta: toastMeta,
    importPath: "import { ToastProvider, useToast } from 'glubox';",
    installNote:
      'Envolvé la app con ToastProvider y usá useToast().show() para encolar notificaciones.',
  },
  datagrid: {
    component: 'DataGrid',
    label: 'DataGrid',
    description:
      'Tabla empresarial con dataSource (T[] plano), keyExpr, columns, paging (pageIndex 0-based), búsqueda, selección y layout table/card/auto.',
    meta: dataGridMeta,
    importPath:
      "import { DataGrid, useDataGrid, type ColumnDef, type DataGridCardRenderContext } from 'glubox';",
    installNote:
      'Esperá dataSource: T[] (array plano de objetos), keyExpr (campo clave) y columns: ColumnDef<T>[]. No pasar { items } — usá response.items.',
    basicUsage: `interface Employee extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email' },
];

const rows: Employee[] = [
  { id: 1, name: 'Ana', email: 'ana@corp.com' },
];

<DataGrid
  dataSource={rows}
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
/>`,
    dataContract: `Estructura esperada
• dataSource: T[] — array plano de filas (objetos). [] es válido.
• keyExpr: nombre del campo clave en cada fila (string | number).
• columns: ColumnDef<T>[] — key debe existir en T.

Desde API con envoltorio:
  const { items, totalCount } = await api.getEmployees();
  <DataGrid dataSource={items} keyExpr="id" columns={cols} totalRowCount={totalCount} />

❌ dataSource={response}          // Object → error
❌ dataSource={response.items} olvidado
✅ dataSource={response.items}    // Array`,
  },
  pageactionsmenu: {
    component: 'PageActionsMenu',
    label: 'PageActionsMenu',
    description:
      'Menú hamburguesa de acciones de página (hijos surface: actions del nodo activo).',
    meta: pageActionsMenuMeta,
    importPath:
      "import { PageActionsMenu, pageActionsFromNode, findNavigationNodeByRoute } from 'glubox';",
    installNote:
      'El API entrega NavigationNode[]. Resolvé el nodo activo por route, luego pageActionsFromNode(node) → items del menú.',
    basicUsage: `const active = findNavigationNodeByRoute(navigation, location.pathname);
const actions = pageActionsFromNode(active);

<PageActionsMenu
  items={actions}
  renderIcon={renderIcon}
  onNavigate={(route) => navigate(route)}
  onActionSelect={(item) => {
    if (!item.route) refresh();
  }}
/>`,
    dataContract: `NavigationNode (handshake)
• surface: 'sidebar' | 'content' | 'actions'
• kind: 'group' | 'view' | 'action'
• children: NavigationNode[]

PageActionsMenu solo pinta surface: 'actions'
• Sidebar ← filterBySurface(tree, 'sidebar')
• Content tabs ← contentTabsFromNode(active)
• Acciones ← pageActionsFromNode(active)`,
  },
};

export function getDocEntry(componentId: string): DocEntry | undefined {
  return componentDocEntries[componentId];
}
