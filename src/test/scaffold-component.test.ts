import { describe, expect, it } from 'vitest';
import {
  generateScaffoldFiles,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  writeScaffold,
} from '../../scripts/scaffold-component.ts';

describe('Scaffold Component Generator (scripts/scaffold-component.mjs)', () => {
  describe('Casing Helpers', () => {
    it('toPascalCase convierte strings variados a PascalCase', () => {
      expect(toPascalCase('badge')).toBe('Badge');
      expect(toPascalCase('status-indicator')).toBe('StatusIndicator');
      expect(toPascalCase('status_badge')).toBe('StatusBadge');
      expect(toPascalCase('ProgressBar')).toBe('ProgressBar');
    });

    it('toKebabCase convierte PascalCase a kebab-case para BEM', () => {
      expect(toKebabCase('Badge')).toBe('badge');
      expect(toKebabCase('StatusIndicator')).toBe('status-indicator');
      expect(toKebabCase('DataGridToolbar')).toBe('data-grid-toolbar');
    });

    it('toCamelCase convierte a camelCase para nombres de temas y metadata', () => {
      expect(toCamelCase('Badge')).toBe('badge');
      expect(toCamelCase('StatusIndicator')).toBe('statusIndicator');
      expect(toCamelCase('status-badge')).toBe('statusBadge');
    });
  });

  describe('generateScaffoldFiles', () => {
    const files = generateScaffoldFiles({
      name: 'StatusBadge',
      description: 'Etiqueta para indicar estados en tablas y listas.',
      category: 'general',
    });

    it('genera los 12 archivos requeridos del scaffold', () => {
      const paths = Object.keys(files);
      expect(paths).toContain('src/components/StatusBadge/StatusBadge.tsx');
      expect(paths).toContain('src/components/StatusBadge/type/StatusBadge.types.ts');
      expect(paths).toContain('src/components/StatusBadge/theme/StatusBadge.theme.types.ts');
      expect(paths).toContain('src/components/StatusBadge/theme/defaultThemes.ts');
      expect(paths).toContain('src/components/StatusBadge/theme/resolveTheme.ts');
      expect(paths).toContain('src/components/StatusBadge/css/StatusBadge.css');
      expect(paths).toContain('src/components/StatusBadge/StatusBadge.test.tsx');
      expect(paths).toContain('src/components/StatusBadge/index.ts');
      expect(paths).toContain('src/demo/metadata/statusBadgeMeta.ts');
      expect(paths).toContain('src/demo/pages/demos/StatusBadgeDemo.tsx');
      expect(paths).toContain('docs/components/status-badge.md');
      expect(paths).toContain('.agents/skills/gluebox-status-badge/SKILL.md');
    });

    it('implementa forwardRef y clases BEM glb-status-badge en el componente', () => {
      const code = files['src/components/StatusBadge/StatusBadge.tsx'];
      expect(code).toContain('export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>');
      expect(code).toContain("'glb-status-badge'");
      expect(code).toContain('`glb-status-badge--${size}`');
      expect(code).toContain('`glb-status-badge--${variant}`');
      expect(code).toContain("disabled && 'glb-status-badge--disabled'");
      expect(code).toContain('aria-disabled={disabled || undefined}');
    });

    it('declara tokens y variables CSS BEM sin Tailwind', () => {
      const css = files['src/components/StatusBadge/css/StatusBadge.css'];
      expect(css).toContain('.glb-status-badge {');
      expect(css).toContain('--glb-status-badge-bg: var(--glb-surface, #ffffff);');
      expect(css).toContain('.glb-status-badge--sm');
      expect(css).toContain('.glb-status-badge--primary');
      expect(css).not.toContain('@tailwind');
    });

    it('incluye suite de pruebas con mount y cleanup', () => {
      const testCode = files['src/components/StatusBadge/StatusBadge.test.tsx'];
      expect(testCode).toContain("describe('StatusBadge'");
      expect(testCode).toContain('renderiza correctamente el contenido children');
      expect(testCode).toContain('aplica las clases BEM de variante y tamaño por defecto');
      expect(testCode).toContain('permite asociar ref al elemento DOM');
    });

    it('define metadata con controles para el playground de la demo', () => {
      const meta = files['src/demo/metadata/statusBadgeMeta.ts'];
      expect(meta).toContain('export const statusBadgeMeta: ComponentMeta<StatusBadgeProps>');
      expect(meta).toContain("name: 'StatusBadge'");
      expect(meta).toContain("control: 'select'");
    });

    it('genera documentación para VitePress con ejemplos y tabla de props', () => {
      const doc = files['docs/components/status-badge.md'];
      expect(doc).toContain('# StatusBadge');
      expect(doc).toContain("import { StatusBadge, statusBadgeThemes } from 'glubox';");
      expect(doc).toContain("import { StatusBadge } from 'glubox/components/StatusBadge';");
    });

    it('genera skill de agente con frontmatter y especificaciones', () => {
      const skill = files['.agents/skills/gluebox-status-badge/SKILL.md'];
      expect(skill).toContain('name: gluebox-status-badge');
      expect(skill).toContain('Clase base: `.glb-status-badge`');
    });
  });

  describe('writeScaffold validations', () => {
    it('rechaza nombres inválidos que no sean PascalCase', () => {
      expect(() =>
        writeScaffold({
          name: '123invalid',
          dryRun: true,
        })
      ).toThrowError(/PascalCase/);
    });

    it('detecta colisiones con componentes existentes como Button o Switch', () => {
      expect(() =>
        writeScaffold({
          name: 'Button',
          dryRun: true,
        })
      ).toThrowError(/ya existe/);

      expect(() =>
        writeScaffold({
          name: 'Switch',
          dryRun: true,
        })
      ).toThrowError(/ya existe/);
    });

    it('en modo dryRun devuelve la lista de archivos creados y actualizados sin escribir en disco', () => {
      const result = writeScaffold({
        name: 'MockWidget',
        description: 'Componente ficticio para pruebas',
        dryRun: true,
      });

      expect(result.created).toHaveLength(12);
      expect(result.updated).toContain('src/index.ts');
      expect(result.updated).toContain('package.json');
      expect(result.updated).toContain('src/test/a11y.test.tsx');
    });
  });
});
