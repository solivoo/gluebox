import { useLocation } from 'react-router-dom';
import './AppearancePage.css';

type AppearanceSection = 'temas' | 'modo-oscuro' | 'instalacion' | 'importacion' | 'personalizacion';

function parseAppearancePath(pathname: string): AppearanceSection {
  const segments = pathname.split('/').filter(Boolean);
  const section = segments[1] ?? 'temas';
  const map: Record<string, AppearanceSection> = {
    temas: 'temas',
    'modo-oscuro': 'modo-oscuro',
    instalacion: 'instalacion',
    importacion: 'importacion',
    personalizacion: 'personalizacion',
  };
  return map[section] ?? 'temas';
}

function sectionLabel(section: AppearanceSection): string {
  const map: Record<AppearanceSection, string> = {
    temas: 'Temas',
    'modo-oscuro': 'Modo Oscuro',
    instalacion: 'Instalación',
    importacion: 'Importación',
    personalizacion: 'Personalización',
  };
  return map[section];
}

function TemasContent() {
  return (
    <section className="apd__section">
      <h2>Temas</h2>
      <p>
        <strong>gluBox</strong> usa una sola familia visual, <strong>Commerce</strong>{' '}
        (Material Design / MUI), con modo claro y oscuro. El tema controla los colores
        de todos los componentes (Sidebar, Button, Select, TextBox, Switch) mediante
        variables CSS.
      </p>

      <h3>Tema disponible</h3>
      <table className="apd__table">
        <thead>
          <tr>
            <th>Tema</th>
            <th>data-theme</th>
            <th>Paleta</th>
            <th>CSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="apd__prop-name">Commerce</td>
            <td className="apd__prop-type">commerce</td>
            <td>Material Design (MUI) / Azul #1976D2</td>
            <td className="apd__prop-type">commerce.css</td>
          </tr>
        </tbody>
      </table>

      <h3>Cómo usar el tema</h3>
      <p>
        El tema se aplica en un solo lugar. Importá el CSS publicado (no existe{' '}
        <code>glubox/styles/base.css</code>) y seteá atributos en{' '}
        <code>&lt;html&gt;</code>:
      </p>
      <pre className="apd__code">{`// main.tsx o App.tsx
import 'glubox/style.css';
import 'glubox/themes/index.css';  // commerce (light + dark)
// o solo el tema:
import 'glubox/themes/commerce.css';`}</pre>

      <p>
        Luego aplicá los atributos <code>data-theme</code> y <code>data-mode</code> al{' '}
        <code>&lt;html&gt;</code>:
      </p>
      <pre className="apd__code">{`<html data-theme="commerce" data-mode="light">
  <!-- todos los componentes usan Commerce · Light -->
</html>

<html data-theme="commerce" data-mode="dark">
  <!-- todos los componentes usan Commerce · Dark (MUI) -->
</html>`}</pre>

      <h3>Override por componente</h3>
      <p>
        La prop <code>theme</code> es opcional: usala solo si un control debe
        ignorar el sistema. No redefinas <code>--select-*</code>,{' '}
        <code>--datagrid-*</code> ni <code>--textbox-*</code> en tu CSS.
      </p>
      <pre className="apd__code">{`<Button theme="commerce-dark">Dark override</Button>
<Select theme="commerce-light" options={[...]} />
<TextBox theme="commerce-dark" />
<Sidebar theme="commerce-light" />`}</pre>
    </section>
  );
}

function ModoOscuroContent() {
  return (
    <section className="apd__section">
      <h2>Modo Oscuro</h2>
      <p>
        El tema incluye modo oscuro (<code>data-mode="dark"</code>). La
        transición entre modos se maneja con variables CSS, sin necesidad de
        recargar la página ni manipular estilos inline.
      </p>

      <h3>Activación por atributo</h3>
      <pre className="apd__code">{`// Activar dark mode
document.documentElement.setAttribute('data-mode', 'dark');

// Volver a light
document.documentElement.setAttribute('data-mode', 'light');`}</pre>

      <h3>Persistencia y detección del sistema</h3>
      <p>Ejemplo completo con localStorage y prefers-color-scheme:</p>
      <pre className="apd__code">{`// Detectar preferencia del sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme-mode');
const mode = saved || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-mode', mode);

// Escuchar cambios del sistema
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-mode',
      e.matches ? 'dark' : 'light');
  });`}</pre>

      <h3>color-scheme</h3>
      <p>
        gluBox declara <code>color-scheme</code> junto a{' '}
        <code>--glb-app-bg</code> / <code>--glb-surface</code>. Los widgets
        nativos (scrollbars, date pickers del SO) siguen el modo. El pager del
        DataGrid usa el Select de gluBox, no un <code>&lt;select&gt;</code> nativo.
      </p>
      <pre className="apd__code">{`[data-mode="light"] { color-scheme: light; }
[data-mode="dark"]  { color-scheme: dark; }`}</pre>

      <h3>Variables CSS que cambian</h3>
      <p>El modo oscuro redefine estas variables a nivel :root:</p>
      <pre className="apd__code">{`[data-theme="commerce"][data-mode="dark"] {
  --glb-app-bg: #121212;
  --glb-app-text: #ffffff;
  --glb-toolbar-bg: #121212;
  --glb-surface: #1e1e1e;
  --glb-surface-hover: #2c2c2c;
  --glb-border: rgba(255, 255, 255, 0.12);
  --glb-input-bg: #1e1e1e;
  --glb-text: #ffffff;
  --glb-muted: rgba(255, 255, 255, 0.7);

  /* + variables del tema activo (--sidebar-*, --btn-*, etc.) */
}`}</pre>
    </section>
  );
}

function InstalacionContent() {
  return (
    <section className="apd__section">
      <h2>Instalación</h2>

      <h3>npm / pnpm / yarn</h3>
      <pre className="apd__code">{`# npm
npm install glubox

# pnpm
pnpm add glubox

# yarn
yarn add glubox`}</pre>

      <h3>Peer dependencies</h3>
      <p>
        <strong>gluBox</strong> requiere React 18+ y react-dom. Si usás iconos
        personalizados, necesitás <code>lucide-react</code> (usado en la demo).
      </p>

      <pre className="apd__code">{`{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`}</pre>

      <h3>Estilos</h3>
      <p>
        Los estilos son <strong>CSS puro</strong> (no CSS-in-JS). Solo necesitás
        importar el archivo CSS en tu entry point:
      </p>
      <pre className="apd__code">{`// main.tsx
import 'glubox/style.css';
import 'glubox/themes/index.css';
// o
import 'glubox/themes/commerce.css';`}</pre>
    </section>
  );
}

function ImportacionContent() {
  return (
    <section className="apd__section">
      <h2>Importación</h2>

      <h3>Import de componentes</h3>
      <p>Todos los componentes se importan desde el barrel export principal:</p>
      <pre className="apd__code">{`import { Button, Select, TextBox, Sidebar } from 'glubox';`}</pre>

      <h3>Import de tipos</h3>
      <p>Los tipos también se exportan desde el mismo paquete:</p>
      <pre className="apd__code">{`import type {
  ButtonProps,
  SelectProps,
  TextBoxProps,
  SidebarProps,
  MenuConfig,
  MenuItem,
  MenuSubItem,
} from 'glubox';`}</pre>

      <h3>Tree shaking y Subpath Exports</h3>
      <p>
        El paquete soporta tree shaking tanto desde el barrel raíz como mediante
        subpath exports directos por componente (<code>glubox/components/*</code>)
        para optimizar al máximo el tamaño final del bundle y la velocidad de
        resolución en TypeScript:
      </p>
      <pre className="apd__code">{`// Importación por subruta (Tree-shaking atómico)
import { Button } from 'glubox/components/Button';
import { Switch } from 'glubox/components/Switch';
import { DataGrid } from 'glubox/components/DataGrid';

// O desde el barrel principal
import { Button, Switch } from 'glubox';`}</pre>

      <h3>Estilos por componente</h3>
      <p>
        Los estilos de cada componente se inyectan automáticamente al importar
        el componente. No es necesario importar CSS por separado para cada uno.
      </p>
    </section>
  );
}

function PersonalizacionContent() {
  return (
    <section className="apd__section">
      <h2>Personalización</h2>

      <h3>Variables CSS</h3>
      <p>
        Todas las propiedades visuales de los componentes se controlan mediante
        variables CSS con el prefijo <code>--glb-</code> o específicas de
        componente (<code>--btn-</code>, <code>--sidebar-</code>, etc.).
      </p>

      <h3>Crear un tema propio</h3>
      <p>
        Personalizá los tokens de sistema (<code>--glb-*</code>). Los tokens de
        componente (<code>--select-*</code>, <code>--datagrid-*</code>,{' '}
        <code>--textbox-*</code>) ya apuntan a esas variables: no hace falta
        redefinirlos.
      </p>
      <pre className="apd__code">{`/* mi-tema.css */
[data-theme="mi-tema"] {
  --glb-app-bg: #1a1018;
  --glb-app-text: #e8e0e4;
  --glb-surface: #261a22;
  --glb-surface-hover: #322028;
  --glb-border: rgba(244, 114, 182, 0.12);
  --glb-input-bg: #261a22;
  --glb-text: #e8e0e4;
  --glb-muted: #786070;
}

[data-theme="mi-tema"][data-mode="dark"] {
  --glb-app-bg: #12101a;
  /* el resto de --glb-* */
}`}</pre>

      <h3>Fuente</h3>
      <p>
        La familia Commerce usa <strong>Roboto</strong> (Material Design) vía{' '}
        <code>--glb-font-family</code>; si no está disponible cae al stack del sistema.
      </p>
      <pre className="apd__code">{`// En tu CSS
:root {
  --glb-font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
}`}</pre>

      <h3>Override inline (theme prop)</h3>
      <p>
        Para casos puntuales, podés pasar un objeto de tema directamente a la
        prop <code>theme</code> del componente. Esto genera estilos inline que
        sobrescriben las variables CSS:
      </p>
      <pre className="apd__code">{`<Button
  theme={{
    background: '#8b5cf6',
    text: '#fff',
    border: '#7c3aed',
    hoverBackground: '#7c3aed',
    activeBackground: '#6d28d9',
  }}
>
  Personalizado
</Button>`}</pre>
    </section>
  );
}

const contentMap: Record<AppearanceSection, () => React.ReactElement> = {
  temas: TemasContent,
  'modo-oscuro': ModoOscuroContent,
  instalacion: InstalacionContent,
  importacion: ImportacionContent,
  personalizacion: PersonalizacionContent,
};

export function AppearancePage() {
  const { pathname } = useLocation();
  const section = parseAppearancePath(pathname);
  const Content = contentMap[section];

  return (
    <article className="apd">
      <header className="apd__header">
        <p className="apd__breadcrumb">Apariencia</p>
        <h1 className="apd__title">{sectionLabel(section)}</h1>
      </header>

      <div className="apd__body">
        <Content />
      </div>
    </article>
  );
}
