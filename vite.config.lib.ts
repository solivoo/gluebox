import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/index.ts', 'src/components/Sidebar/**/*'],
      exclude: [
        'src/**/*.stories.*',
        'src/stories/**',
        'src/App.tsx',
        'src/main.tsx',
        'src/icons/**',
        'src/components/brand/**',
      ],
      rollupTypes: true,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'GluBox',
      formats: ['es'],
      fileName: 'glubox',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'glubox.[ext]',
      },
    },
    emptyOutDir: true,
  },
});
