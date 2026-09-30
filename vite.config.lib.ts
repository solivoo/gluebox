import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

import fs from 'node:fs';

const componentsDir = path.resolve(__dirname, 'src/components');
const componentEntries: Record<string, string> = {
  glubox: path.resolve(__dirname, 'src/index.ts'),
};

for (const dir of fs.readdirSync(componentsDir)) {
  const indexPath = path.join(componentsDir, dir, 'index.ts');
  if (fs.existsSync(indexPath)) {
    componentEntries[`components/${dir}/index`] = indexPath;
  }
}

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: componentEntries,
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'glubox.[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
    emptyOutDir: true,
  },
});
