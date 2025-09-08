import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssNesting from 'postcss-nesting';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting()],
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './src/main.ts',
      },
      preserveEntrySignatures: 'strict',
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
      },
      external: ['@vue-mf/styleguide'],
    },
  },
  experimental: {
    renderBuiltUrl() {
      return { relative: true };
    },
  },
  plugins: [cssInjectedByJsPlugin(), vue()],
  base: './',
  preview: {
    port: 8081,
    cors: true,
  },
  server: {
    port: 8081,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
