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
- This app is no longer a single-spa microfrontend and will not be mounted via root-config/import maps.
- Running zoneless: Zone.js was removed and the Angular app explicitly opts into zoneless change detection using provideZonelessChangeDetection(). This prevents NG0908 even if Zone.js is present globally from other microfrontends. If you add libraries depending on NgZone/Zone.js, you may need to refactor them or re-add Zone.js.
- If the rest of the system still uses single-spa, the root-config reference to @vue-mf/rate-dogs should be removed or adjusted accordingly.
