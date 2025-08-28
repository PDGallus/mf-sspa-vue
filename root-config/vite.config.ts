import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    vitePluginSingleSpa({
      type: 'root',
      importMaps: {
        type: 'systemjs-importmap',
        dev: ['./importMaps.json'],
        build: ['./importMaps.json'],
      },
      imo: () => './cdn/import-map-overrides.js',
      imoUi: {
        buttonPos: 'bottom-right',
        localStorageKey: 'devtools',
        variant: 'full',
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'cdn/**/*',
          dest: 'cdn',
        },
      ],
    }),
  ],
  base: './',
  preview: {
    port: 9000,
    cors: true,
  },
  server: {
    port: 9000,
  },
});
