import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import loadVersion from 'vite-plugin-package-version';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import postcssNested from 'postcss-nested';

import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
  plugins: [loadVersion(), tsconfigPaths(), tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
});
