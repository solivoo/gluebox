#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultProjectRoot = path.resolve(__dirname, '..');

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function toPascalCase(str: string): string {
  return str
    .replace(/[-_ ]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

export interface ScaffoldOptions {
  name: string;
  description?: string;
  category?: string;
}

export function generateScaffoldFiles({
  name,
  description,
  category: _category = 'general',
}: ScaffoldOptions): Record<string, string> {
  const PascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);
  const camelName = toCamelCase(name);
  const desc = description || `Componente ${PascalName} accesible para aplicaciones empresariales.`;

  const files: Record<string, string> = {};

  // 1. Component Implementation: src/components/[ComponentName]/[ComponentName].tsx
  files[`src/components/${PascalName}/${PascalName}.tsx`] = `import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { ${PascalName}Props } from './type/${PascalName}.types';
import { resolveTheme, themeToStyle } from './theme/resolveTheme';
import '@/components/${PascalName}/css/${PascalName}.css';

/**
 * ${desc}
 */
export const ${PascalName} = forwardRef<HTMLDivElement, ${PascalName}Props>(
  function ${PascalName}(props, ref) {
    const {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      theme,
      className,
      style,
      ...rest
    } = props;

    const themeStyle = themeToStyle(resolveTheme(theme));
    const computedStyle: CSSProperties = {
      ...themeStyle,
      ...style,
    };

    const classNames = [
      'glb-${kebabName}',
      \`glb-${kebabName}--\${size}\`,
      \`glb-${kebabName}--\${variant}\`,
      disabled && 'glb-${kebabName}--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={computedStyle}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
`;

  // 2. Types: src/components/[ComponentName]/type/[ComponentName].types.ts
  files[`src/components/${PascalName}/type/${PascalName}.types.ts`] = `import type { HTMLAttributes, ReactNode } from 'react';
import type { ${PascalName}ThemeInput } from '../theme/${PascalName}.theme.types';

export type ${PascalName}Size = 'sm' | 'md' | 'lg';
export type ${PascalName}Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ${PascalName}Props extends HTMLAttributes<HTMLDivElement> {
  /** Contenido interno del componente */
  children?: ReactNode;
  /** Variante visual */
  variant?: ${PascalName}Variant;
  /** Tamaño del control */
  size?: ${PascalName}Size;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Preset de tema ('commerce-light' | 'commerce-dark') o tokens personalizados */
  theme?: ${PascalName}ThemeInput;
}
`;

  // 3. Theme Types: src/components/[ComponentName]/theme/[ComponentName].theme.types.ts
  files[`src/components/${PascalName}/theme/${PascalName}.theme.types.ts`] = `export interface ${PascalName}ThemeTokens {
  background?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
}

export type ${PascalName}ThemePreset = 'commerce-light' | 'commerce-dark';

export type ${PascalName}ThemeInput = ${PascalName}ThemeTokens | ${PascalName}ThemePreset;
`;

  // 4. Default Themes: src/components/[ComponentName]/theme/defaultThemes.ts
  files[`src/components/${PascalName}/theme/defaultThemes.ts`] = `import type { ${PascalName}ThemePreset, ${PascalName}ThemeTokens } from './${PascalName}.theme.types';

export const ${camelNameThemes(PascalName, camelName)}: Record<${PascalName}ThemePreset, ${PascalName}ThemeTokens> = {
  'commerce-light': {
    background: 'var(--glb-surface, #ffffff)',
    textColor: 'var(--glb-text, #1e293b)',
    borderColor: 'var(--glb-border, #e2e8f0)',
    borderRadius: 'var(--glb-radius, 6px)',
  },
  'commerce-dark': {
    background: 'var(--glb-surface, #1e1e1e)',
    textColor: 'var(--glb-text, #ffffff)',
    borderColor: 'var(--glb-border, rgba(255, 255, 255, 0.12))',
    borderRadius: 'var(--glb-radius, 6px)',
  },
};
`;

  // 5. Theme Resolver: src/components/[ComponentName]/theme/resolveTheme.ts
  files[`src/components/${PascalName}/theme/resolveTheme.ts`] = `import type { CSSProperties } from 'react';
import type { ${PascalName}ThemeInput, ${PascalName}ThemeTokens } from './${PascalName}.theme.types';
import { ${camelNameThemes(PascalName, camelName)} } from './defaultThemes';

export function resolveTheme(theme?: ${PascalName}ThemeInput): ${PascalName}ThemeTokens | undefined {
  if (!theme) return undefined;
  if (typeof theme === 'string') return ${camelNameThemes(PascalName, camelName)}[theme];
  return theme;
}

export function themeToStyle(theme?: ${PascalName}ThemeTokens): CSSProperties | undefined {
  if (!theme) return undefined;
  return {
    ...(theme.background ? { '--glb-${kebabName}-bg': theme.background } : {}),
    ...(theme.textColor ? { '--glb-${kebabName}-text': theme.textColor } : {}),
    ...(theme.borderColor ? { '--glb-${kebabName}-border': theme.borderColor } : {}),
    ...(theme.borderRadius ? { '--glb-${kebabName}-radius': theme.borderRadius } : {}),
    ...(theme.fontSize ? { '--glb-${kebabName}-font-size': theme.fontSize } : {}),
  } as CSSProperties;
}
`;

  // 6. CSS (BEM & Tokens): src/components/[ComponentName]/css/[ComponentName].css
  files[`src/components/${PascalName}/css/${PascalName}.css`] = `/* ==========================================================================
   Gluebox ${PascalName} (BEM: glb-${kebabName})
   ========================================================================== */

.glb-${kebabName} {
  --glb-${kebabName}-bg: var(--glb-surface, #ffffff);
  --glb-${kebabName}-text: var(--glb-text, #1e293b);
  --glb-${kebabName}-border: var(--glb-border, #e2e8f0);
  --glb-${kebabName}-radius: var(--glb-radius, 6px);
  --glb-${kebabName}-font-size: 0.875rem;
  --glb-${kebabName}-padding: 0.5rem 0.75rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--glb-${kebabName}-font-size);
  padding: var(--glb-${kebabName}-padding);
  border-radius: var(--glb-${kebabName}-radius);
  background: var(--glb-${kebabName}-bg);
  color: var(--glb-${kebabName}-text);
  border: 1px solid var(--glb-${kebabName}-border);
  transition: all 0.15s ease-in-out;
}

/* Modificadores de tamaño */
.glb-${kebabName}--sm {
  --glb-${kebabName}-font-size: 0.75rem;
  --glb-${kebabName}-padding: 0.25rem 0.5rem;
}

.glb-${kebabName}--md {
  --glb-${kebabName}-font-size: 0.875rem;
  --glb-${kebabName}-padding: 0.5rem 0.75rem;
}

.glb-${kebabName}--lg {
  --glb-${kebabName}-font-size: 1rem;
  --glb-${kebabName}-padding: 0.75rem 1rem;
}

/* Modificadores de variante */
.glb-${kebabName}--primary {
  --glb-${kebabName}-bg: var(--glb-primary, #1976d2);
  --glb-${kebabName}-text: #ffffff;
  --glb-${kebabName}-border: transparent;
}

.glb-${kebabName}--secondary {
  --glb-${kebabName}-bg: var(--glb-muted-surface, #f1f5f9);
  --glb-${kebabName}-text: var(--glb-text, #1e293b);
  --glb-${kebabName}-border: transparent;
}

.glb-${kebabName}--outline {
  --glb-${kebabName}-bg: transparent;
  --glb-${kebabName}-text: var(--glb-primary, #1976d2);
  --glb-${kebabName}-border: var(--glb-primary, #1976d2);
}

.glb-${kebabName}--ghost {
  --glb-${kebabName}-bg: transparent;
  --glb-${kebabName}-text: var(--glb-text, #1e293b);
  --glb-${kebabName}-border: transparent;
}

/* Estado deshabilitado */
.glb-${kebabName}--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
`;

  // 7. Component Unit Tests: src/components/[ComponentName]/[ComponentName].test.tsx
  files[`src/components/${PascalName}/${PascalName}.test.tsx`] = `/** @vitest-environment happy-dom */

import { createElement, act, createRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { ${PascalName} } from './${PascalName}';

let root: Root | null = null;
let host: HTMLDivElement | null = null;

function mount(node: ReturnType<typeof createElement>): HTMLDivElement {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root?.render(node);
  });
  return host;
}

function cleanup(): void {
  act(() => {
    root?.unmount();
  });
  host?.remove();
  root = null;
  host = null;
  document.body.replaceChildren();
}

afterEach(cleanup);

describe('${PascalName}', () => {
  it('renderiza correctamente el contenido children', () => {
    const container = mount(createElement(${PascalName}, null, 'Prueba ${PascalName}'));
    expect(container.textContent).toContain('Prueba ${PascalName}');
  });

  it('aplica las clases BEM de variante y tamaño por defecto', () => {
    const container = mount(createElement(${PascalName}, null, 'Test'));
    const el = container.firstElementChild as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('glb-${kebabName}')).toBe(true);
    expect(el.classList.contains('glb-${kebabName}--md')).toBe(true);
    expect(el.classList.contains('glb-${kebabName}--primary')).toBe(true);
  });

  it('aplica clase y aria-disabled cuando disabled=true', () => {
    const container = mount(createElement(${PascalName}, { disabled: true }, 'Deshabilitado'));
    const el = container.firstElementChild as HTMLElement;
    expect(el.classList.contains('glb-${kebabName}--disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');
  });

  it('permite asociar ref al elemento DOM', () => {
    const ref = createRef<HTMLDivElement>();
    mount(createElement(${PascalName}, { ref }, 'Con ref'));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
`;

  // 8. Component Index: src/components/[ComponentName]/index.ts
  files[`src/components/${PascalName}/index.ts`] = `export { ${PascalName} } from './${PascalName}';
export type {
  ${PascalName}Props,
  ${PascalName}Size,
  ${PascalName}Variant,
} from './type/${PascalName}.types';
export type {
  ${PascalName}ThemeTokens,
  ${PascalName}ThemePreset,
  ${PascalName}ThemeInput,
} from './theme/${PascalName}.theme.types';
export { ${camelNameThemes(PascalName, camelName)} } from './theme/defaultThemes';
`;

  // 9. Playground Metadata: src/demo/metadata/[componentName]Meta.ts
  files[`src/demo/metadata/${camelName}Meta.ts`] = `import type { ComponentMeta } from '@/demo/playground/types';
import type { ${PascalName}Props } from '@/components/${PascalName}';

export const ${camelName}Meta: ComponentMeta<${PascalName}Props> = {
  name: '${PascalName}',
  description: '${desc}',
  sourcePath: 'src/components/${PascalName}/${PascalName}.tsx',
  fullWidthPreview: false,
  defaults: {
    children: 'Ejemplo de ${PascalName}',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  sections: [
    {
      title: 'Contenido',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          defaultValue: 'Ejemplo de ${PascalName}',
          description: 'Contenido interno del ${PascalName}.',
          control: 'text',
        },
      ],
    },
    {
      title: 'Apariencia',
      props: [
        {
          name: 'variant',
          type: '${PascalName}Variant',
          defaultValue: 'primary',
          description: 'Variante visual.',
          control: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        {
          name: 'size',
          type: '${PascalName}Size',
          defaultValue: 'md',
          description: 'Tamaño del control.',
          control: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      ],
    },
    {
      title: 'Estado',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Deshabilita la interacción con el componente.',
          control: 'boolean',
        },
      ],
    },
  ],
};
`;

  // 10. Demo Page: src/demo/pages/demos/[ComponentName]Demo.tsx
  files[`src/demo/pages/demos/${PascalName}Demo.tsx`] = `import { ${PascalName} } from '@/components/${PascalName}';
import { ${camelName}Meta } from '@/demo/metadata/${camelName}Meta';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';

export function ${PascalName}Demo() {
  return <ComponentPlayground meta={${camelName}Meta} Component={${PascalName}} />;
}
`;

  // 11. VitePress Documentation: docs/components/[slug].md
  files[`docs/components/${kebabName}.md`] = `# ${PascalName}

${desc}

## Importación

\`\`\`tsx
import { ${PascalName}, ${camelNameThemes(PascalName, camelName)} } from 'glubox';
import type { ${PascalName}Props } from 'glubox';

// O mediante subpath export granular:
import { ${PascalName} } from 'glubox/components/${PascalName}';
\`\`\`

## Uso básico

\`\`\`tsx
import { ${PascalName} } from 'glubox';

export function Example() {
  return (
    <${PascalName} variant="primary" size="md">
      Texto ${PascalName}
    </${PascalName}>
  );
}
\`\`\`

## Props

| Prop | Tipo | Por defecto | Descripción |
|------|------|-------------|-------------|
| \`children\` | \`ReactNode\` | \`undefined\` | Contenido interno |
| \`variant\` | \`'primary' \\| 'secondary' \\| 'outline' \\| 'ghost'\` | \`'primary'\` | Variante visual |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Tamaño del control |
| \`disabled\` | \`boolean\` | \`false\` | Deshabilita la interacción |
| \`theme\` | \`${PascalName}ThemeInput\` | \`undefined\` | Preset o tokens personalizados |

## Accesibilidad

- Cumple estándares WCAG con foco visible, contraste suficiente y soporte para \`aria-disabled\`.
`;

  // 12. Agent Skill: .agents/skills/gluebox-[slug]/SKILL.md
  files[`.agents/skills/gluebox-${kebabName}/SKILL.md`] = `---
name: gluebox-${kebabName}
description: Use this skill when implementing, styling, or debugging the Gluebox ${PascalName} component.
---

# Gluebox ${PascalName}

${desc}

## Importación

\`\`\`tsx
import { ${PascalName}, ${camelNameThemes(PascalName, camelName)} } from 'glubox';
import type { ${PascalName}Props } from 'glubox';
\`\`\`

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| \`children\` | \`ReactNode\` | \`undefined\` | Contenido interno |
| \`variant\` | \`'primary' \\| 'secondary' \\| 'outline' \\| 'ghost'\` | \`'primary'\` | Variante visual |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Tamaño del control |
| \`disabled\` | \`boolean\` | \`false\` | Deshabilita la interacción |
| \`theme\` | \`${PascalName}ThemeInput\` | \`undefined\` | Tokens o preset de tema |

## Convenciones BEM

- Clase base: \`.glb-${kebabName}\`
- Modificadores: \`.glb-${kebabName}--[variant]\`, \`.glb-${kebabName}--[size]\`, \`.glb-${kebabName}--disabled\`
- Sin dependencias de Tailwind. Usa variables de tema \`--glb-*\`.
`;

  return files;
}

function camelNameThemes(_PascalName: string, camelName: string): string {
  return `${camelName}Themes`;
}

export interface WriteScaffoldOptions extends ScaffoldOptions {
  dryRun?: boolean;
  projectRoot?: string;
}

export interface WriteScaffoldResult {
  created: string[];
  updated: string[];
}

export function writeScaffold({
  name,
  description,
  category = 'general',
  dryRun = false,
  projectRoot = defaultProjectRoot,
}: WriteScaffoldOptions): WriteScaffoldResult {
  const PascalName = toPascalCase(name);
  const camelName = toCamelCase(name);

  // Validación de nombre
  if (!/^[A-Z][A-Za-z0-9]+$/.test(PascalName)) {
    throw new Error(
      `El nombre del componente debe ser PascalCase (ej: 'Badge', 'Avatar'). Recibido: '${name}'`
    );
  }

  const componentDir = path.join(projectRoot, `src/components/${PascalName}`);
  if (fs.existsSync(componentDir)) {
    throw new Error(
      `El componente '${PascalName}' ya existe en ${componentDir}. Operación cancelada para evitar sobreescritura accidental.`
    );
  }

  const filesToCreate = generateScaffoldFiles({ name: PascalName, description, category });
  const created: string[] = [];
  const updated: string[] = [];

  if (dryRun) {
    return {
      created: Object.keys(filesToCreate),
      updated: ['src/index.ts', 'package.json', 'src/test/a11y.test.tsx'],
    };
  }

  // 1. Crear todos los archivos nuevos
  for (const [relPath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(projectRoot, relPath);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    created.push(relPath);
  }

  // 2. Actualizar src/index.ts
  const indexTsPath = path.join(projectRoot, 'src/index.ts');
  if (fs.existsSync(indexTsPath)) {
    let indexContent = fs.readFileSync(indexTsPath, 'utf8');

    // Añadir import de CSS tras el último import de componentes/css
    const cssImport = `import '@/components/${PascalName}/css/${PascalName}.css';\n`;
    const lastCssImportIndex = indexContent.lastIndexOf("import '@/components/");
    if (lastCssImportIndex !== -1) {
      const lineEnd = indexContent.indexOf('\n', lastCssImportIndex);
      indexContent =
        indexContent.slice(0, lineEnd + 1) + cssImport + indexContent.slice(lineEnd + 1);
    } else {
      indexContent = cssImport + indexContent;
    }

    // Añadir re-export de tipos y componentes al final
    const exportsBlock = `
export type {
  ${PascalName}Props,
  ${PascalName}Size,
  ${PascalName}Variant,
  ${PascalName}ThemeTokens,
  ${PascalName}ThemePreset,
  ${PascalName}ThemeInput,
} from './components/${PascalName}';

export {
  ${PascalName},
  ${camelName}Themes,
} from './components/${PascalName}';
`;
    indexContent += exportsBlock;
    fs.writeFileSync(indexTsPath, indexContent, 'utf8');
    updated.push('src/index.ts');
  }

  // 3. Actualizar package.json subpath exports
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (pkg.exports) {
      const exportKey = `./components/${PascalName}`;
      const exportVal = {
        types: `./dist/components/${PascalName}/index.d.ts`,
        import: `./dist/components/${PascalName}/index.js`,
      };

      // Insertar antes del comodín "./components/*"
      const newExports: Record<string, unknown> = {};
      let inserted = false;
      for (const [k, v] of Object.entries(pkg.exports)) {
        if (k === './components/*' && !inserted) {
          newExports[exportKey] = exportVal;
          inserted = true;
        }
        newExports[k] = v;
      }
      if (!inserted) {
        newExports[exportKey] = exportVal;
      }
      pkg.exports = newExports;
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      updated.push('package.json');
    }
  }

  // 4. Actualizar src/test/a11y.test.tsx
  const a11yTestPath = path.join(projectRoot, 'src/test/a11y.test.tsx');
  if (fs.existsSync(a11yTestPath)) {
    let a11yContent = fs.readFileSync(a11yTestPath, 'utf8');
    const importStatement = `import { ${PascalName} } from '../components/${PascalName}/${PascalName}';\n`;
    const lastComponentImport = a11yContent.lastIndexOf("import { DataGrid } from '../components/DataGrid/DataGrid';");
    if (lastComponentImport !== -1) {
      const lineEnd = a11yContent.indexOf('\n', lastComponentImport);
      a11yContent =
        a11yContent.slice(0, lineEnd + 1) + importStatement + a11yContent.slice(lineEnd + 1);
    }

    const testCase = `
  it('${PascalName} no tiene violaciones a11y', async () => {
    const el = renderIntoDom(<${PascalName}>Prueba ${PascalName}</${PascalName}>);
    expect(await axe(el)).toHaveNoViolations();
  });
`;
    const lastItIndex = a11yContent.lastIndexOf('  it(');
    if (lastItIndex !== -1) {
      const closingBrace = a11yContent.indexOf('  });', lastItIndex);
      if (closingBrace !== -1) {
        const insertPos = closingBrace + 5;
        a11yContent = a11yContent.slice(0, insertPos) + testCase + a11yContent.slice(insertPos);
        fs.writeFileSync(a11yTestPath, a11yContent, 'utf8');
        updated.push('src/test/a11y.test.tsx');
      }
    }
  }

  return { created, updated };
}

// Interactive CLI Execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Uso:
  pnpm new:component
  pnpm new:component <Nombre> [Descripción] [Categoría] [--dry-run]

Ejemplos:
  pnpm new:component Badge "Insignia o etiqueta de estado informativa"
  pnpm new:component Breadcrumb "Navegación jerárquica con migas de pan" navigation
  pnpm new:component Spinner --dry-run

Opciones:
  --dry-run      Muestra los archivos que se crearían y modificarían sin escribir en disco.
  -h, --help     Muestra esta ayuda.
`);
    process.exit(0);
  }

  const dryRun = args.includes('--dry-run');
  const positionalArgs = args.filter((a) => !a.startsWith('--'));

  let name = positionalArgs[0];
  let description = positionalArgs[1];
  let category = positionalArgs[2] || 'general';

  if (!name) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      name = await rl.question(' Nombre del componente (PascalCase, ej: Badge, Avatar): ');
      name = name.trim();
      if (!name) {
        console.error('El nombre del componente es obligatorio.');
        process.exit(1);
      }

      description = await rl.question(' Descripción breve del componente: ');
      description = description.trim();

      const catInput = await rl.question(' Categoría [general/forms/buttons/navigation/overlays]: ');
      if (catInput.trim()) {
        category = catInput.trim();
      }
    } finally {
      rl.close();
    }
  }

  const PascalName = toPascalCase(name);
  console.log(`\n🚀 Generando scaffold para componente: \x1b[36m${PascalName}\x1b[0m...`);
  if (dryRun) {
    console.log('🔍 Modo DRY RUN activo (no se modificará ningún archivo)');
  }

  try {
    const { created, updated } = writeScaffold({
      name: PascalName,
      description,
      category,
      dryRun,
    });

    console.log('\n Archivos generados:');
    for (const file of created) {
      console.log(`  \x1b[32m+\x1b[0m ${file}`);
    }

    console.log('\n Integraciones actualizadas:');
    for (const file of updated) {
      console.log(`  \x1b[33m~\x1b[0m ${file}`);
    }

    console.log(`
🎉 ¡Scaffold de \x1b[36m${PascalName}\x1b[0m completado con éxito!

Próximos pasos recomendados:
  1. Personalizar la implementación en: \x1b[34msrc/components/${PascalName}/${PascalName}.tsx\x1b[0m
  2. Ajustar estilos BEM en: \x1b[34msrc/components/${PascalName}/css/${PascalName}.css\x1b[0m
  3. Ejecutar los tests: \x1b[32mpnpm test\x1b[0m
  4. Verificar el bundle y tipos: \x1b[32mpnpm build:lib\x1b[0m
  5. Iniciar el entorno de desarrollo: \x1b[32mpnpm dev\x1b[0m
`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\x1b[31mError:\x1b[0m ${message}`);
    process.exit(1);
  }
}

// Si se ejecuta directamente desde la línea de comandos
if (process.argv[1] && process.argv[1].endsWith('scaffold-component.ts')) {
  main();
}
