Rate Dogs (Angular)

This folder has been migrated from a Vue 3 single-spa microfrontend to a standalone Angular 20 application.

How to run:
- pnpm --filter "./rate-dogs" install (from repo root, if needed)
- pnpm --filter "./rate-dogs" serve
  - Serves on http://localhost:8090

How to build:
- pnpm --filter "./rate-dogs" build
  - Output in rate-dogs/dist

Notes:
- Running zoneless: Zone.js is not used. The Angular app explicitly opts into zoneless change detection using provideZonelessChangeDetection() in src/main.ts and uses ngZone: 'noop' in the single-spa entry.
- To run as a single-spa microfrontend with native ESM + import maps:
  - Dev: pnpm --filter "./rate-dogs" serve:mfe (serves on http://localhost:8090)
  - Build: pnpm --filter "./rate-dogs" build:mfe (outputs to rate-dogs/dist)
  - In root-config import map, add an import pointing to the built file without hashing, e.g.:
    {
      "imports": {
        "@org/ng20-mfe": "http://localhost:8090/main.single-spa.js"
      }
    }
  - And register in root-config:
    registerApplication({
      name: '@org/ng20-mfe',
      app: () => import('@org/ng20-mfe'),
      activeWhen: (loc) => loc.pathname.startsWith('/ng20'),
      customProps: { baseHref: '/ng20' }
    });
