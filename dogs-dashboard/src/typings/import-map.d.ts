// Ambient module declarations for import-map provided remotes
// This allows vue-tsc/tsc to type-check imports that are resolved at runtime via import maps.

declare module '@vue-mf/styleguide' {
  import type { Component } from 'vue';
  export const PageHeader: Component;
}
