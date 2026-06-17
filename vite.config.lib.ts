import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      include: [
        'src/index.ts',
        'src/components/Sidebar/**/*',
        'src/components/Button/**/*',
        'src/components/Select/**/*',
        'src/components/TextBox/**/*',
        'src/components/DateBox/**/*',
        'src/components/RangeDateBox/**/*',
        'src/components/OptionGroup/**/*',
        'src/components/CheckButton/**/*',
      ],
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        'src/icons/**',
        'src/components/brand/**',
        'src/components/Sidebar/data/**',
        'src/components/Sidebar/mock/**',
        'src/components/Sidebar/test/**',
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
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'GluBox',
      formats: ['es'],
      fileName: () => 'glubox.js',
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
