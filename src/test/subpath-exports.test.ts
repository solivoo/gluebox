import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { build } from 'vite';

const projectRoot = path.resolve(__dirname, '../..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

describe('Subpath Exports & Tree-shaking Verification', () => {
  beforeAll(() => {
    const buttonDist = path.join(projectRoot, 'dist/components/Button/index.js');
    if (!fs.existsSync(buttonDist)) {
      execSync('pnpm build:lib', { cwd: projectRoot, stdio: 'ignore' });
    }
  });
  it('package.json exports tiene definidos los subpath exports para los 18 componentes + navigation', () => {
    const expectedComponents = [
      'Button',
      'CheckButton',
      'ColorPicker',
      'DataGrid',
      'DateBox',
      'FileBox',
      'FileUploader',
      'NumberBox',
      'OptionGroup',
      'PageActionsMenu',
      'Popup',
      'RangeDateBox',
      'Select',
      'Sidebar',
      'Switch',
      'TagBox',
      'TextArea',
      'TextBox',
      'Toast',
      'navigation',
    ];

    for (const comp of expectedComponents) {
      const subpath = `./components/${comp}`;
      expect(pkg.exports, `Missing export for ${subpath}`).toHaveProperty(subpath);
    }

    expect(pkg.exports).toHaveProperty('./components/*');
  });

  it('todos los archivos JS y d.ts apuntados en exports existen en dist/', () => {
    const exportsEntries = Object.entries(pkg.exports) as [string, unknown][];

    for (const [key, value] of exportsEntries) {
      if (key === './components/*') continue; // wildcard pattern

      if (typeof value === 'string') {
        const fullPath = path.join(projectRoot, value);
        expect(fs.existsSync(fullPath), `Target file ${value} for export "${key}" must exist`).toBe(true);
      } else if (value && typeof value === 'object') {
        const exp = value as { import?: string; types?: string };
        if (exp.import) {
          const importPath = path.join(projectRoot, exp.import);
          expect(fs.existsSync(importPath), `Target import ${exp.import} for export "${key}" must exist`).toBe(true);
        }
        if (exp.types) {
          const typesPath = path.join(projectRoot, exp.types);
          expect(fs.existsSync(typesPath), `Target types ${exp.types} for export "${key}" must exist`).toBe(true);
        }
      }
    }
  });

  it('package.json.files incluye dist/chunks para los chunks compartidos', () => {
    expect(pkg.files).toContain('dist/chunks');
  });

  it('Tree-shaking real: importar glubox/components/Button no incluye código de DataGrid ni FileBox', async () => {
    const buttonDist = path.join(projectRoot, 'dist/components/Button/index.js');
    expect(fs.existsSync(buttonDist)).toBe(true);

    const out = await build({
      configFile: false,
      logLevel: 'silent',
      build: {
        write: false,
        lib: { entry: buttonDist, formats: ['es'] },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
        },
      },
    });

    const outputChunk = Array.isArray(out)
      ? out[0]?.output[0]
      : 'output' in out
        ? out.output[0]
        : undefined;
    const code = outputChunk && 'code' in outputChunk ? outputChunk.code : '';

    // Debe incluir código de Button pero NADA de componentes no relacionados
    expect(code).toContain('Button');
    expect(code).not.toContain('glb-datagrid');
    expect(code).not.toContain('glb-filebox');
    expect(code).not.toContain('glb-colorpicker');

    // El tamaño debe ser menor a 25 KB (en contraposición a los ~240 KB del bundle completo)
    expect(code.length).toBeLessThan(25000);
  });

  it('Tree-shaking real: importar glubox/components/Switch no incluye DataGrid y es ultraligero (< 20 KB)', async () => {
    const switchDist = path.join(projectRoot, 'dist/components/Switch/index.js');
    expect(fs.existsSync(switchDist)).toBe(true);

    const out = await build({
      configFile: false,
      logLevel: 'silent',
      build: {
        write: false,
        lib: { entry: switchDist, formats: ['es'] },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
        },
      },
    });

    const outputChunk = Array.isArray(out)
      ? out[0]?.output[0]
      : 'output' in out
        ? out.output[0]
        : undefined;
    const code = outputChunk && 'code' in outputChunk ? outputChunk.code : '';

    expect(code).toContain('glb-switch');
    expect(code).not.toContain('glb-datagrid');
    expect(code).not.toContain('glb-datepicker');
    expect(code.length).toBeLessThan(20000);
  });
});
