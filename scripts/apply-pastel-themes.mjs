/**
 * Aplica tokens pastel a bloques primary/danger en theme CSS globales.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themesDir = path.join(root, 'src/styles/themes');

const replacements = [
  // Button primary
  [
    /--btn-primary-bg: #[^;]+; --btn-primary-text: #[^;]+; --btn-primary-border: #[^;]+;/g,
    '--btn-primary-bg: var(--glb-accent-surface); --btn-primary-text: var(--glb-accent-on-fill); --btn-primary-border: var(--glb-accent-border);',
  ],
  [
    /--btn-primary-hover-bg: #[^;]+; --btn-primary-hover-border: #[^;]+;/g,
    '--btn-primary-hover-bg: var(--glb-accent-surface-hover); --btn-primary-hover-border: var(--glb-accent-border-strong);',
  ],
  [
    /--btn-primary-active-bg: #[^;]+; --btn-primary-active-border: #[^;]+;/g,
    '--btn-primary-active-bg: var(--glb-accent-surface-active); --btn-primary-active-border: var(--glb-accent-border-strong);',
  ],
  [
    /--btn-primary-focus-ring: [^;]+;/g,
    '--btn-primary-focus-ring: var(--glb-accent-focus-ring);',
  ],
  [
    /--btn-primary-spinner: #[^;]+;/g,
    '--btn-primary-spinner: var(--glb-accent-on-fill);',
  ],
  // Button danger
  [
    /--btn-danger-bg: #[^;]+; --btn-danger-text: #[^;]+; --btn-danger-border: #[^;]+;/g,
    '--btn-danger-bg: var(--glb-danger-surface); --btn-danger-text: var(--glb-danger-on-fill); --btn-danger-border: var(--glb-danger-border);',
  ],
  [
    /--btn-danger-hover-bg: #[^;]+; --btn-danger-hover-border: #[^;]+;/g,
    '--btn-danger-hover-bg: var(--glb-danger-surface-hover); --btn-danger-hover-border: var(--glb-danger-border);',
  ],
  [
    /--btn-danger-active-bg: #[^;]+; --btn-danger-active-border: #[^;]+;/g,
    '--btn-danger-active-bg: var(--glb-danger-surface-active); --btn-danger-active-border: var(--glb-danger-border);',
  ],
  [
    /--btn-danger-focus-ring: [^;]+;/g,
    '--btn-danger-focus-ring: var(--glb-danger-focus-ring);',
  ],
  [
    /--btn-danger-spinner: #[^;]+;/g,
    '--btn-danger-spinner: var(--glb-danger-on-fill);',
  ],
  // Sidebar accents
  [
    /--sidebar-active-text: #[^;]+; --sidebar-active-icon: #[^;]+;/g,
    '--sidebar-active-text: var(--glb-accent-sidebar); --sidebar-active-icon: var(--glb-accent-sidebar);',
  ],
  [
    /--sidebar-rail-active: #[^;]+;/g,
    '--sidebar-rail-active: var(--glb-accent-sidebar-muted);',
  ],
  // Select / TextBox focus & options (default family patterns)
  [
    /--select-primary-hover-border: #[^;]+;/g,
    '--select-primary-hover-border: var(--glb-accent-border-strong);',
  ],
  [
    /--select-primary-focus-border: #[^;]+; --select-primary-focus-ring: [^;]+;/g,
    '--select-primary-focus-border: var(--glb-accent-border-strong); --select-primary-focus-ring: var(--glb-accent-focus-ring);',
  ],
  [
    /--select-primary-option-hover-bg: #[^;]+; --select-primary-option-hover-text: #[^;]+;/g,
    '--select-primary-option-hover-bg: var(--glb-accent-option-hover-bg); --select-primary-option-hover-text: var(--glb-accent-option-hover-text);',
  ],
  [
    /--select-primary-option-selected-bg: [^;]+; --select-primary-option-selected-text: #[^;]+;/g,
    '--select-primary-option-selected-bg: var(--glb-accent-subtle-bg); --select-primary-option-selected-text: var(--glb-accent-subtle-text);',
  ],
  [
    /--select-secondary-option-selected-bg: [^;]+; --select-secondary-option-selected-text: #[^;]+;/g,
    '--select-secondary-option-selected-bg: var(--glb-accent-subtle-bg); --select-secondary-option-selected-text: var(--glb-accent-subtle-text);',
  ],
  [
    /--select-outline-option-selected-bg: [^;]+; --select-outline-option-selected-text: #[^;]+;/g,
    '--select-outline-option-selected-bg: var(--glb-accent-subtle-bg); --select-outline-option-selected-text: var(--glb-accent-subtle-text);',
  ],
  [
    /--select-ghost-option-selected-bg: [^;]+; --select-ghost-option-selected-text: #[^;]+;/g,
    '--select-ghost-option-selected-bg: var(--glb-accent-subtle-bg); --select-ghost-option-selected-text: var(--glb-accent-subtle-text);',
  ],
  [
    /--textbox-primary-hover-border: #[^;]+;/g,
    '--textbox-primary-hover-border: var(--glb-accent-border-strong);',
  ],
  [
    /--textbox-primary-focus-border: #[^;]+; --textbox-primary-focus-ring: [^;]+;/g,
    '--textbox-primary-focus-border: var(--glb-accent-border-strong); --textbox-primary-focus-ring: var(--glb-accent-focus-ring);',
  ],
];

for (const file of ['default.css', 'modern.css', 'enterprise.css']) {
  const filePath = path.join(themesDir, file);
  let content = readFileSync(filePath, 'utf8');
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
