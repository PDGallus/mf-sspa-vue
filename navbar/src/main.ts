import { type App, createApp, h } from "vue";
import singleSpaVue from "single-spa-vue";

import Application from "./App.vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(Application);
    },
  },
  async handleInstance(app: App, props: { singleSpa: object }) {
    app.provide("singleSpa", props.singleSpa);
    return Promise.resolve();
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
