import { useParams, useLocation } from 'react-router-dom';
import { getDocEntry, type DocEntry } from '@/demo/docs/docRegistry';
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
      <pre className="dcd__code">{`import { ${entry.label} } from 'glubox';

function App() {
  return <${entry.label} />;
}`}</pre>

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
  return (
    <section className="dcd__section">
      <h2>Props</h2>
      {entry.meta.sections.map((sec) => (
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

function EventsTable({ entry }: { entry: DocEntry }) {
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
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {entry.meta.events.map((event) => (
              <tr key={event.name}>
                <td className="dcd__prop-name">{event.name}</td>
                <td className="dcd__prop-type">{event.signature}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function TypesSection({ entry }: { entry: DocEntry }) {
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
      <pre className="dcd__code">
        {types[entry.label] ?? '// Tipos definidos en el módulo del componente'}
      </pre>
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
        {section === 'events' && <EventsTable entry={entry} />}
        {section === 'types' && <TypesSection entry={entry} />}
        {section === 'accessibility' && <AccessibilitySection entry={entry} />}
      </div>
    </article>
  );
}
