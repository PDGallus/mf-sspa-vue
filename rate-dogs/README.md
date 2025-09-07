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
- If the rest of the system still uses single-spa, the root-config reference to @vue-mf/rate-dogs should be removed or adjusted accordingly.
