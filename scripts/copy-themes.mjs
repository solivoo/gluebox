import { cpSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src/styles/themes');
const destDir = path.join(root, 'dist/themes');

mkdirSync(destDir, { recursive: true });

for (const name of ['default.css', 'modern.css', 'enterprise.css', 'index.css']) {
  cpSync(path.join(srcDir, name), path.join(destDir, name));
}

console.log('Themes copied to dist/themes/');
