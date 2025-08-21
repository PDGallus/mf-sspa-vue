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
const applications = constructApplications({
  routes,
  loadApp: async ({ name }) => await System.import(name),
});
applications.forEach(registerApplication);
addErrorHandler((error) => {
  if (getAppStatus(error.appOrParcelName) === LOAD_ERROR) {
    System.delete(System.resolve(error.appOrParcelName));
  }
});
start();
const layoutEngine = constructLayoutEngine({ routes, applications });
layoutEngine.activate();
