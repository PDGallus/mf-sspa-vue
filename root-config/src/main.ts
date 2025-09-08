import { addErrorHandler, getAppStatus, LOAD_ERROR, registerApplication, start } from 'single-spa';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';
import layout from './layout.html?raw';

const routes = constructRoutes(layout, {
  errors: {
    appError: '<h1>Loading Error...</h1>',
  },
  loaders: {},
  props: {},
});

// Eagerly load the styleguide to apply its global.css (fonts, variables, body background)
// We use native import() + import maps; vite-ignore prevents pre-bundling this bare specifier.
void import(/* @vite-ignore */ '@vue-mf/styleguide');

const applications = constructApplications({
  routes,
  // Use native dynamic import with import maps. No SystemJS.
  loadApp: async ({ name }): Promise<unknown> => import(/* @vite-ignore */ name),
});

applications.forEach(registerApplication);

addErrorHandler((error) => {
  // With native ESM, modules cannot be unloaded. If a load error occurs,
  // we log it and let single-spa retry per its internal backoff or user action.
  if (getAppStatus(error.appOrParcelName) === LOAD_ERROR) {
    console.error('Load error for app:', error.appOrParcelName, error);
  }
});

start();
const layoutEngine = constructLayoutEngine({ routes, applications });
layoutEngine.activate();
