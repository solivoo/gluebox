import { cpSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src/styles/themes');
const destDir = path.join(root, 'dist/themes');

mkdirSync(destDir, { recursive: true });

const themeFiles = ['default.css', 'modern.css', 'enterprise.css', 'index.css', 'pastel-accents.css'];

for (const name of themeFiles) {
  cpSync(path.join(srcDir, name), path.join(destDir, name));
}

console.log('Themes copied to dist/themes/');
