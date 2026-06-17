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
        <strong>gluBox</strong> incluye <strong>3 temas visuales</strong>, cada uno con
        su propio modo claro y oscuro. Los temas controlan los colores de todos los
        componentes (Sidebar, Button, Select, TextBox) mediante variables CSS.
      </p>

      <h3>Temas disponibles</h3>
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
            <td className="apd__prop-name">Default</td>
            <td className="apd__prop-type">default</td>
            <td>Indigo / Violeta</td>
            <td className="apd__prop-type">default.css</td>
          </tr>
          <tr>
            <td className="apd__prop-name">Modern</td>
            <td className="apd__prop-type">modern</td>
            <td>Emerald / Verde</td>
            <td className="apd__prop-type">modern.css</td>
          </tr>
          <tr>
            <td className="apd__prop-name">Enterprise</td>
            <td className="apd__prop-type">enterprise</td>
            <td>Blue / Slate</td>
            <td className="apd__prop-type">enterprise.css</td>
          </tr>
        </tbody>
      </table>

      <h3>Cómo usar un tema</h3>
      <p>Importá el CSS del tema en tu entry point:</p>
      <pre className="apd__code">{`// main.tsx o App.tsx
import 'glubox/styles/base.css';
import 'glubox/styles/themes/index.css';  // Todos los temas
// o solo uno:
import 'glubox/styles/themes/default.css';`}</pre>

      <p>
        Luego aplicá los atributos <code>data-theme</code> y <code>data-mode</code> al{' '}
        <code>&lt;html&gt;</code>:
      </p>
      <pre className="apd__code">{`<html data-theme="default" data-mode="light">
  <!-- todos los componentes usan el tema Default · Light -->
</html>

<html data-theme="modern" data-mode="dark">
  <!-- todos los componentes usan el tema Modern · Dark -->
</html>`}</pre>

      <h3>Override por componente</h3>
      <p>
        Cada componente acepta una prop <code>theme</code> que permite sobrescribir
        el tema global para esa instancia específica:
      </p>
      <pre className="apd__code">{`<Button theme="dark">Dark override</Button>
<Select theme="modern-dark" options={[...]} />
<TextBox theme="enterprise-light" />
<Sidebar theme="dark" />
// También aceptan objetos personalizados:
<Button theme={{ background: '#333', text: '#fff', ... }} />`}</pre>
    </section>
  );
}

function ModoOscuroContent() {
  return (
    <section className="apd__section">
      <h2>Modo Oscuro</h2>
      <p>
        Todos los temas incluyen modo oscuro (<code>data-mode="dark"</code>). La
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

      <h3>Variables CSS que cambian</h3>
      <p>El modo oscuro redefine estas variables a nivel :root:</p>
      <pre className="apd__code">{`[data-mode="dark"] {
  --glb-app-bg: #0f1117;
  --glb-app-text: #e2e8f0;
  --glb-toolbar-bg: #11131a;
  --glb-surface: #1a1d27;
  --glb-surface-hover: #22252f;
  --glb-border: #2d3139;
  --glb-input-bg: #1a1d27;
  --glb-text: #e2e8f0;
  --glb-muted: #64748b;

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
import 'glubox/styles/base.css';              // Fuente + tokens base
import 'glubox/styles/themes/index.css';      // Temas
// o
import 'glubox/styles/themes/default.css';    // Un solo tema`}</pre>
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

      <h3>Tree shaking</h3>
      <p>
        Si tu bundler soporta tree shaking (Vite, webpack 5+, Rollup), podés
        importar componentes individuales para reducir el bundle:
      </p>
      <pre className="apd__code">{`import { Button } from 'glubox/components/Button';`}</pre>

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
      <pre className="apd__code">{`/* mi-tema.css */
[data-theme="mi-tema"] {
  /* Sidebar */
  --sidebar-bg: #1a1a24;
  --sidebar-text: #e2e8f0;
  --sidebar-active-text: #f472b6;
  --sidebar-rail-active: #f472b6;

  /* Button */
  --btn-primary-bg: #f472b6;
  --btn-primary-hover-bg: #f9a8d4;

  /* Shell tokens */
  --glb-toolbar-bg: rgba(244, 114, 182, 0.06);
  --glb-app-bg: #1a1018;
  --glb-app-text: #e8e0e4;
  --glb-surface: #261a22;
  --glb-border: rgba(244, 114, 182, 0.12);
  --glb-text: #e8e0e4;
  --glb-muted: #786070;
}

[data-theme="mi-tema"][data-mode="dark"] {
  --sidebar-bg: #12101a;
  /* ... más overrides ... */
}`}</pre>

      <h3>Fuente</h3>
      <p>La fuente global es <strong>Poppins</strong>, controlada por:</p>
      <pre className="apd__code">{`// En tu CSS
:root {
  --glb-font-family: 'Poppins', sans-serif;
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
