import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssNesting from "postcss-nesting";
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
        main: "./src/main.ts",
      },
      preserveEntrySignatures: "strict",
      output: {
        format: "system",
        entryFileNames: "[name]-app.js",
      },
      external: ["single-spa-vue", "@vue-mf/styleguide"],
    },
  },
  experimental: {
    renderBuiltUrl() {
      return { relative: true };
    },
  },
  plugins: [vue()],
  base: "./",
  preview: {
    port: 8080,
    cors: true,
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
