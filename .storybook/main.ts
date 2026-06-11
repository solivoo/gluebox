import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../docs/storybook/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'Documentación',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE ?? '/',
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    });
  },
};

export default config;
