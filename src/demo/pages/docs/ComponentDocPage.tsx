import { useParams, useLocation } from 'react-router-dom';
import { getDocEntry, type DocEntry } from '@/demo/docs/docRegistry';
import {
  getEventTypesDoc,
  SHARED_EVENT_UTILITIES,
} from '@/demo/docs/eventTypesRegistry';
import './ComponentDocPage.css';

type DocSection =
  | 'getting-started'
  | 'how-to'
  | 'props'
  | 'methods'
  | 'events'
  | 'types'
  | 'accessibility';

function parseSection(pathname: string): DocSection {
  const segments = pathname.split('/').filter(Boolean);

  // /componentes/button → default
  if (segments.length <= 2) return 'getting-started';

  const section = segments[2];
  const sub = segments[3];

  if (section === 'overview') {
    return (sub as DocSection) || 'getting-started';
  }
  if (section === 'api') {
    return (sub as DocSection) || 'props';
  }
  if (section === 'accessibility') {
    return 'accessibility';
  }

  return 'getting-started';
}

function breadcrumbLabel(pathname: string, entry: DocEntry): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 2) return entry.label;

  const last = segments[segments.length - 1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const parent =
    segments.length > 3
      ? segments[segments.length - 2]
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : '';

  return parent ? `${entry.label} › ${parent} › ${last}` : `${entry.label} › ${last}`;
}

/* ── Sub-components ── */

function GettingStarted({ entry }: { entry: DocEntry }) {
  const basicUsage =
    entry.basicUsage ??
    `import { ${entry.label} } from 'glubox';

function App() {
  return <${entry.label} />;
}`;

  return (
    <section className="dcd__section">
      <h2>Getting Started</h2>
      <p>
        <strong>{entry.label}</strong> es un componente de la librería{' '}
        <code>gluBox</code>. {entry.description}
      </p>

      <h3>Instalación</h3>
      <p>{entry.installNote}</p>

      <h3>Importación</h3>
      <pre className="dcd__code">{entry.importPath}</pre>

      <h3>Uso básico</h3>
      <pre className="dcd__code">{basicUsage}</pre>

      {entry.dataContract && (
        <>
          <h3>Estructura de datos</h3>
          <pre className="dcd__code">{entry.dataContract}</pre>
        </>
      )}

      <h3>Configuración global</h3>
      <p>
        Los componentes de <strong>gluBox</strong> usan variables CSS para su estilado.
        Asegurate de importar los estilos base y el tema deseado:
      </p>
      <pre className="dcd__code">{`// En tu entry point (main.tsx / App.tsx)
import 'glubox/styles/base.css';           // Fuente + tokens base
import 'glubox/styles/themes/index.css';   // Temas`}</pre>
    </section>
  );
}

function HowTo({ entry }: { entry: DocEntry }) {
  const examples: Record<string, string> = {
    Button: `// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Con estado de carga
<Button loading>Guardando...</Button>

// Deshabilitado
<Button disabled>No disponible</Button>

// Tamaños
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Tema
<Button theme="dark">Dark</Button>
<Button theme="modern-light">Modern Light</Button>

// Ancho
<Button width={200}>200px</Button>
<Button fullWidth>Full Width</Button>`,
    Select: `// Opciones
<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  placeholder="Elegí framework"
/>

// Con label
<Select label="Framework" options={[...]} />

// Label flotante
<Select label="Framework" labelPosition="floating" options={[...]} />

// Estado de error
<Select error errorMessage="Requerido" options={[...]} />

// Tema
<Select theme="modern-dark" options={[...]} />`,
    TextBox: `// Campo básico
<TextBox placeholder="Nombre" />

// Con label
<TextBox label="Email" placeholder="usuario@ejemplo.com" />

// Label flotante
<TextBox label="Nombre" labelPosition="floating" />

// Con botón de limpiar
<TextBox label="Búsqueda" clearable />

// Estado de error
<TextBox label="Email" error errorMessage="Formato inválido" />

// Variante outline
<TextBox variant="outline" />`,
    TextArea: `// Campo básico
<TextArea placeholder="Escribí tu mensaje..." />

// Con label y filas
<TextArea label="Comentarios" rows={5} />

// Label flotante
<TextArea label="Descripción" labelPosition="floating" />

// Sin resize
<TextArea label="Notas" resize="none" clearable />

// Estado de error
<TextArea label="Motivo" error errorMessage="Campo requerido" />

// Variante outline
<TextArea variant="outline" label="Observaciones" />`,
    DataGrid: `// 1) Tipá la fila (T extends Record<string, unknown>)
interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
}

// 2) columns: ColumnDef<T>[] — key debe existir en T
const columns: ColumnDef<User>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
];

// 3) dataSource: T[] plano (no { items })
const users: User[] = [
  { id: 1, name: 'Ana', email: 'ana@corp.com' },
];

<DataGrid
  dataSource={users}
  keyExpr="id"
  columns={columns}
  paging={{ enabled: true, pageIndex: 0, pageSize: 10 }}
  selectionMode="multiple"
  onSelectionChange={(rows) => setSelected(rows)}
/>

// Desde API con envoltorio:
// const { items, totalCount } = await api.list();
// <DataGrid dataSource={items} keyExpr="id" columns={columns} totalRowCount={totalCount} />

// Hook headless (API interna distinta):
const grid = useDataGrid({ data: users, columns, getRowId: (r) => r.id });`,
    Sidebar: `// Con React Router
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar
      menu={menuConfig}
      userPermissions={['admin:read']}
      activePath={location.pathname}
      onNavigate={(path) => navigate(path)}
      brand={MyBrand}
      renderIcon={renderIcon}
    />
  );
}`,
  };

  return (
    <section className="dcd__section">
      <h2>How To</h2>
      <h3>Casos de uso comunes</h3>
      <pre className="dcd__code">
        {examples[entry.label] ?? '// Próximamente más ejemplos'}
      </pre>
    </section>
  );
}

function PropsTable({ entry }: { entry: DocEntry }) {
  const sections = entry.meta.sections
    .map((sec) => ({
      ...sec,
      props: sec.props.filter((prop) => !prop.hideInDocs),
    }))
    .filter((sec) => sec.props.length > 0);

  return (
    <section className="dcd__section">
      <h2>Props</h2>
      {sections.map((sec) => (
        <div key={sec.title} className="dcd__props-group">
          <h3>{sec.title}</h3>
          <table className="dcd__table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Tipo</th>
                <th>Default</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {sec.props.map((prop) => (
                <tr key={prop.name}>
                  <td className="dcd__prop-name">{prop.name}</td>
                  <td className="dcd__prop-type">{prop.type}</td>
                  <td className="dcd__prop-default">
                    {String(prop.defaultValue ?? '—')}
                  </td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

function EventsTable({ entry, componentId }: { entry: DocEntry; componentId: string }) {
  const eventTypesDoc = getEventTypesDoc(componentId);

  return (
    <section className="dcd__section">
      <h2>Events</h2>
      {entry.meta.events.length === 0 ? (
        <p>Este componente no expone eventos propios.</p>
      ) : (
        <table className="dcd__table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Signatura</th>
              <th>Tipo exportado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {entry.meta.events.map((event) => (
              <tr key={event.name}>
                <td className="dcd__prop-name">{event.name}</td>
                <td className="dcd__prop-type">{event.signature}</td>
                <td className="dcd__prop-type">
                  {event.handlerType ? (
                    <>
                      <code>{event.handlerType}</code>
                      {event.payloadType && (
                        <span className="dcd__payload">
                          {' '}
                          · payload: <code>{event.payloadType}</code>
                        </span>
                      )}
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {eventTypesDoc && (
        <>
          <h3>Importar tipos de eventos</h3>
          <pre className="dcd__code">{eventTypesDoc.importTypes}</pre>

          <h3>Ejemplo tipado</h3>
          <pre className="dcd__code">{eventTypesDoc.usageExample}</pre>
        </>
      )}
    </section>
  );
}

function TypesSection({ entry, componentId }: { entry: DocEntry; componentId: string }) {
  const eventTypesDoc = getEventTypesDoc(componentId);

  const types: Record<string, string> = {
    Button: `export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonThemeInput = ThemePreset | ButtonTheme;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  width?: string | number;
  theme?: ButtonThemeInput;
}`,
    Select: `export type SelectLabelPosition = 'top' | 'floating' | 'left';
export type SelectVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  labelPosition?: SelectLabelPosition;
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  fullWidth?: boolean;
  width?: string | number;
  theme?: SelectThemeInput;
  onChange?: (value: string) => void;
}`,
    TextBox: `export type TextBoxLabelPosition = 'top' | 'floating' | 'left';
export type TextBoxVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type TextBoxSize = 'sm' | 'md' | 'lg';

export interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: TextBoxLabelPosition;
  variant?: TextBoxVariant;
  size?: TextBoxSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  clearable?: boolean;
  fullWidth?: boolean;
  width?: string | number;
  theme?: TextBoxThemeInput;
}`,
    TextArea: `export type TextAreaLabelPosition = 'top' | 'floating' | 'outlined' | 'left';
export type TextAreaVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelPosition?: TextAreaLabelPosition;
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  rows?: number;
  resize?: TextAreaResize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  clearable?: boolean;
  fullWidth?: boolean;
  width?: string | number;
  theme?: TextAreaThemeInput;
}`,
    DataGrid: `// Fila: objeto plano (T extends Record<string, unknown>)
// dataSource: T[]  — array plano, no { items }

export type ColumnDef<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  renderCell?: (value: T[keyof T], row: T, rowIndex: number) => ReactNode;
  // + width, minWidth, align…
};

export interface DataGridPaging {
  enabled?: boolean;
  pageIndex?: number; // 0-based
  pageSize?: number;
}

export interface DataGridCardRenderContext<T> {
  row: T;
  rowIndex: number;
  selected: boolean;
  selectionMode: 'none' | 'single' | 'multiple';
  columns: ColumnDef<T>[];
}

export interface DataGridProps<T extends Record<string, unknown>> {
  dataSource: T[];                 // requerido, Array.isArray
  keyExpr: keyof T | string;       // campo clave en cada fila
  columns: ColumnDef<T>[];         // requerido
  paging?: DataGridPaging;
  pageSizeOptions?: number[];
  selectionMode?: 'none' | 'single' | 'multiple';
  renderCardComponent?: DataGridCardComponent<T>;
  onSelectionChange?: (selectedRows: T[]) => void;
  onPageChange?: (pageIndex: number) => void;
}`,
    Sidebar: `export interface MenuConfig { items: MenuItem[]; }

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  permissions?: string[];
  children?: MenuSubItem[];
  position?: 'top' | 'bottom';
}

export interface MenuSubItem {
  id: string;
  label: string;
  path?: string;
  permissions?: string[];
  children?: MenuSubItem[];
}

export interface SidebarProps {
  menu: MenuConfig;
  userPermissions: string[];
  collapsed?: boolean;
  width?: number | string;
  theme?: SidebarThemeInput;
  brand?: ComponentType<{ collapsed: boolean }>;
  activePath?: string;
  collapseOthersOnSelect?: boolean;
  renderIcon?: (name: string, className: string) => ReactElement;
  onCollapsedChange?: (collapsed: boolean) => void;
  onNavigate?: (path: string) => void;
}`,
  };

  return (
    <section className="dcd__section">
      <h2>Types</h2>

      <h3>Props y tipos del componente</h3>
      <pre className="dcd__code">
        {types[entry.label] ?? '// Tipos definidos en el módulo del componente'}
      </pre>

      {eventTypesDoc && (
        <>
          <h3>Tipos de eventos exportados</h3>
          <p>
            Todos los handlers están disponibles desde <code>glubox</code> para tipar
            callbacks sin depender de las props del componente.
          </p>
          <table className="dcd__table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Signatura</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {eventTypesDoc.handlers.map((handler) => (
                <tr key={handler.handlerType}>
                  <td className="dcd__prop-name">
                    <code>{handler.handlerType}</code>
                  </td>
                  <td className="dcd__prop-type">{handler.signature}</td>
                  <td>{handler.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Importación</h3>
          <pre className="dcd__code">{eventTypesDoc.importTypes}</pre>

          <h3>Uso</h3>
          <pre className="dcd__code">{eventTypesDoc.usageExample}</pre>
        </>
      )}

      <h3>Utilidades genéricas</h3>
      <p>
        Para eventos sin alias dedicado, podés derivar el tipo desde las props con las
        utilidades exportadas:
      </p>
      <pre className="dcd__code">{SHARED_EVENT_UTILITIES}</pre>
    </section>
  );
}

function AccessibilitySection({ entry }: { entry: DocEntry }) {
  const a11y: Record<string, string> = {
    Button: `- Rol implícito: button — no requiere role explícito.
- Estado deshabilitado: usa disabled y aria-disabled.
- Estado de carga: aria-busy="true" cuando loading={true}.
- Foco: recibe foco por teclado (Tab). Activación con Enter/Space.
- Contraste: colores WCAG AA en todos los temas.`,
    Select: `- Rol: combobox con aria-expanded (abierto/cerrado).
- Lista: role="listbox", opciones role="option".
- Teclado: ↑↓ para mover, Enter para elegir, Escape para cerrar.
- Type-ahead: buscar entre opciones escribiendo.
- Label: asociado vía aria-labelledby automático.`,
    TextBox: `- Rol: input (implícito).
- Label: asociado vía <label htmlFor> automático con prop label.
- Errores: aria-invalid="true" + aria-describedby al mensaje.
- Helper: aria-describedby también referencia helperText.
- Placeholder: no sustituye al label. Usar label + placeholder.`,
    TextArea: `- Rol: textbox (implícito en <textarea>).
- Label: asociado vía <label htmlFor> automático con prop label.
- Errores: aria-invalid="true" + aria-describedby al mensaje.
- Helper: aria-describedby también referencia helperText.
- Multilínea: soporta resize nativo configurable con resize.`,
    DataGrid: `- Rol: grid en la tabla.
- Ordenamiento: aria-sort en encabezados sortables.
- Selección: aria-selected en filas; checkboxes con labels en modo multiple.
- Búsqueda: input type="search" con aria-label.
- Scroll: viewport dedicado; primera columna sticky en móvil.`,
    Sidebar: `- Rol: navigation en <nav>.
- Ítems expandibles: aria-expanded en botones con hijos.
- Ítem activo: aria-current="page" en la página actual.
- Ancestro activo: aria-current="true" en padres con hijo activo.
- Colapsado: labels ocultos con display: none.`,
  };

  return (
    <section className="dcd__section">
      <h2>Accessibility</h2>
      <p>
        Todos los componentes de <strong>gluBox</strong> siguen las pautas{' '}
        <strong>WCAG 2.1 AA</strong>.
      </p>
      <div className="dcd__a11y">
        <pre className="dcd__code">
          {a11y[entry.label] ?? '- Información de accesibilidad próximamente.'}
        </pre>
      </div>
    </section>
  );
}

const sectionTitle: Record<DocSection, string> = {
  'getting-started': 'Getting Started',
  'how-to': 'How To',
  props: 'API · Props',
  methods: 'API · Methods',
  events: 'API · Events',
  types: 'API · Types',
  accessibility: 'Accessibility',
};

/* ── Main page ── */

export function ComponentDocPage() {
  const { component } = useParams<{ component: string }>();
  const { pathname } = useLocation();

  if (!component) {
    return (
      <article className="dcd">
        <h1>Componente no especificado</h1>
      </article>
    );
  }

  const entry = getDocEntry(component);
  if (!entry) {
    return (
      <article className="dcd">
        <h1>Componente no encontrado</h1>
        <p>
          No hay documentación para <code>{component}</code>.
        </p>
      </article>
    );
  }

  const section = parseSection(pathname);

  return (
    <article className="dcd">
      <header className="dcd__header">
        <p className="dcd__breadcrumb">{breadcrumbLabel(pathname, entry)}</p>
        <h1 className="dcd__title">
          {entry.label} · {sectionTitle[section]}
        </h1>
        <p className="dcd__subtitle">{entry.description}</p>
      </header>

      <div className="dcd__body">
        {section === 'getting-started' && <GettingStarted entry={entry} />}
        {section === 'how-to' && <HowTo entry={entry} />}
        {section === 'props' && <PropsTable entry={entry} />}
        {section === 'events' && <EventsTable entry={entry} componentId={component} />}
        {section === 'types' && <TypesSection entry={entry} componentId={component} />}
        {section === 'accessibility' && <AccessibilitySection entry={entry} />}
      </div>
    </article>
  );
}
