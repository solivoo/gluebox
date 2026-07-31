/**
 * Post-process published .d.ts files:
 * - Strip CSS side-effect imports (runtime-only)
 * - Rewrite `@/` path aliases to relative paths from each file
 * - Fix barrel `../components|shared` → `./components|shared` if still present
 *
 * Root cause of consumer `any` types: vite-plugin-dts rewrote `@/` from
 * dist/src/index.d.ts to `../components/...` (missing sibling under dist/src).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');

function walkDts(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDts(full, out);
    else if (entry.name.endsWith('.d.ts')) out.push(full);
  }
  return out;
}

function toRelativeImport(fromFile, absTarget) {
  let rel = path.relative(path.dirname(fromFile), absTarget).replaceAll('\\', '/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let text = original;

  // Drop CSS side-effect imports from declaration files.
  text = text.replace(/^\s*import\s+['"][^'"]+\.css['"]\s*;?\s*$/gm, '');

  // Safety: barrel one-level-too-high re-exports.
  if (path.basename(filePath) === 'index.d.ts' && path.dirname(filePath) === distRoot) {
    text = text.replace(
      /from\s+['"]\.\.\/(components|shared)\//g,
      "from './$1/",
    );
  }

  // Rewrite remaining @/ aliases → relative paths under dist/.
  text = text.replace(
    /(['"])@\/([^'"]+)\1/g,
    (_m, quote, aliasPath) => {
      const target = path.join(distRoot, aliasPath);
      const rel = toRelativeImport(filePath, target);
      return `${quote}${rel}${quote}`;
    },
  );

  // Collapse blank lines left by stripped imports (keep single separators).
  text = text.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '');

  if (text !== original) {
    fs.writeFileSync(filePath, text);
    return true;
  }
  return false;
}

const files = walkDts(distRoot);
let changed = 0;
for (const file of files) {
  if (fixFile(file)) changed += 1;
}

const indexPath = path.join(distRoot, 'index.d.ts');
if (!fs.existsSync(indexPath)) {
  console.error('[fix-dts-paths] missing dist/index.d.ts');
  process.exit(1);
}

const index = fs.readFileSync(indexPath, 'utf8');
if (index.includes("from '../components/") || index.includes("from '../shared/")) {
  console.error('[fix-dts-paths] dist/index.d.ts still has broken ../ re-exports');
  process.exit(1);
}
if (index.includes("'@/") || index.includes('"@/')) {
  console.error('[fix-dts-paths] dist/index.d.ts still has @/ aliases');
  process.exit(1);
}

const remainingAlias = files.filter((f) => {
  const t = fs.readFileSync(f, 'utf8');
  return t.includes("'@/") || t.includes('"@/');
});
if (remainingAlias.length) {
  console.error('[fix-dts-paths] leftover @/ aliases in:', remainingAlias);
  process.exit(1);
}

console.log(`[fix-dts-paths] fixed ${changed}/${files.length} declaration files`);
