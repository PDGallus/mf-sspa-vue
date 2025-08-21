import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssNesting from 'postcss-nesting';

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/index.ts',
      },
      preserveEntrySignatures: 'strict',
      output: {
        format: 'system',
        entryFileNames: 'style-guide.js',
      },
    },
  },
  experimental: {
    renderBuiltUrl() {
      return { relative: true };
    },
  },
  plugins: [vue()],
  base: './',
  preview: {
    port: 8100,
    cors: true,
  },
  server: {
    port: 8100,
  },
});
