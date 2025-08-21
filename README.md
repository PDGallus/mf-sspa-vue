# mf-sspa-vue

Eine kleine Demo-Anwendung für Micro‑Frontends mit single-spa und Vue 3 (Vite). Das Repo ist als pnpm‑Workspace organisiert und enthält mehrere Teil‑Apps ("Remotes") sowie eine Root‑Konfiguration:

- root-config – orchestriert die Micro‑Frontends über single-spa und Import Maps
- dogs-dashboard – Beispiel‑Remote (Vue 3)
- rate-dogs – Beispiel‑Remote (Vue 3)
- navbar – Beispiel‑Remote (Vue 3)
- styleguide – gemeinsame Styles/Assets

## Voraussetzung
Um mit diesem Projekt arbeiten zu können, muss pnpm installiert sein.

- Node.js (empfohlen: LTS, z. B. >= 22)
- pnpm: Installation z. B. mit `npm i -g pnpm`

Hinweis: Einige Skripte verwenden feste Ports (z. B. 8080, 8081, 8090, 8100, 9000). Stelle sicher, dass diese frei sind.

## Installation
Im Projektwurzelverzeichnis:

```bash
pnpm i
```

## Entwicklung starten
Starte alle Teil‑Apps und die Root‑Konfiguration in einem Schritt:

```bash
pnpm start
```

Das Skript baut zunächst die Remotes und startet anschließend parallel:
- die Remotes (Preview/Serve)
- die Root‑Konfiguration
- die Styleguide‑App

Öffne danach die im Terminal ausgegebene URL der Root‑Konfiguration (z. B. http://localhost:4173). 

### Alternativ: Manuell starten
- Nur Remotes serven: `pnpm serve:remotes`
- Nur Root‑Konfiguration: `pnpm start:root`
- Nur Styleguide (Dev): `pnpm start:style`

## Build
Baue die Remotes für die Vorschau/Produktion:

```bash
pnpm build
```

## Nützliche Skripte
- `pnpm stop` – versucht die verwendeten Ports zu beenden (9000, 8080, 8081, 8090, 8100)
- `pnpm clean` – Platzhalter, falls Cleaning benötigt wird

## Projektstruktur (Auszug)
- `/root-config` – single-spa Root‑App (Vite)
- `/dogs-dashboard`, `/rate-dogs`, `/navbar` – Micro‑Frontends (Vite, Vue 3)
- `/styleguide` – gemeinsame Styles/Assets

## Fehlerbehebung
- Befehl `pnpm` nicht gefunden: Installiere pnpm mit `npm i -g pnpm`.
- Ports belegt: Nutze `pnpm stop` oder beende die Prozesse manuell.
- Abhängigkeiten fehlen/inkonsistent: Führe im Repo‑Root `pnpm install` aus (nicht in den Unterordnern).

