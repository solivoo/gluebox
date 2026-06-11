process.env.STORYBOOK_BASE = process.env.STORYBOOK_BASE ?? '/gluebox/storybook/';

import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

mkdirSync('docs/public/storybook', { recursive: true });

const result = spawnSync(
  'pnpm',
  ['exec', 'storybook', 'build', '-o', 'docs/public/storybook'],
  { stdio: 'inherit', shell: true },
);

process.exit(result.status ?? 1);
