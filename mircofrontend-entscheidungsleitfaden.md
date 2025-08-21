# Leitfaden: Lohnt sich Microfrontends (MFEs) für euer Projekt?
> Ziel: eine pragmatische Entscheidungshilfe inkl. Entscheidungsmatrix mit Scoring. Alles kompakt und umsetzbar.

## Was sind Microfrontends (in einem Satz)?
Ein Architekturansatz, der eine UI entlang fachlicher Domänen in unabhängig entwickel- und deploybare Frontend-Teile zerlegt, die zur Laufzeit oder Buildzeit komponiert werden.

## Kurzfassung (Decision Snapshot)

### Eher JA, wenn mindestens 3–4 Punkte stark zutreffen:
- Mehrere autonome Teams liefern parallel und brauchen unabhängige Deployments.
- Das System hat klare, fachliche Domänenschnitte (z. B. „Checkout“, „Suche“, „Account“).
- Ihr müsst heterogene Tech-Stacks oder inkrementelle Migration (Strangler-Pattern) unterstützen.
- Time-to-Market leidet aktuell unter Team-/Release-Koordination.
- Skalierbarkeit von Build/CI/CD ist ein Engpass (Monolith buildet zu langsam).

### Eher NEIN, wenn mehrere Punkte zutreffen:
- Kleines Team (≤ 6 Devs) oder ein Produktteam mit synchronem Release.
- Domänen sind stark gekoppelt, kein klarer Schnitt.
- Same tech, same cadence reicht (Monorepo + Libraries + Design-System).
- Performance-Budget sehr knapp und kein Bedarf an Runtime-Isolation.

### Unsicher? → Entscheidungsmatrix unten ausfüllen.

## Gute Gründe (Indikatoren)
- Team-Autonomie: Unabhängige Roadmaps/Deployments, minimierte Koordination.
- Domänenklarheit: Schnitte entlang Bounded Contexts (DDD).
- Skalierung: Viele Entwickler:innen, parallele Lieferströme, schnelle CI/CD.
- Legacy-Migration: Schrittweise Ablösung eines großen Frontends (Strangler Fig).
- Technologie-Freiheit: Verschiedene Frameworks/Versionen pro Domäne. - Regulatorik/Compliance: Getrennte Liefernachweise, Audit-Trails pro Modul.

## Schlechte Gründe (Anti-Patterns)
- „Klingt modern“ / Hype ohne Engpass.
- Keine Ownership-Klarheit: Gleiche Leute pflegen alle Teile → Overhead ohne Nutzen.
- Fehlende Domänenschnitte: Zersägen nach UI-Seiten statt nach Fachlichkeit.
- Ein Team, ein Release: MFE-Mehrkosten ohne Mehrwert.

## Risiken & Kosten (bewusst einplanen)
- Komplexeres Operate: Orchestrierung, Observability, Edge-/Runtime-Komposition.
- UX-Kohärenz: Design System & gemeinsame Shell sind Pflicht.
- Performance: Zusätzliche Bundles, mehrfaches Framework (falls heterogen).
- Security & Governance: CSP, AuthN/Z, CSRF, Dependency-Risiken je MFE.
- Tooling: CI/CD pro MFE, Versionierung, Contract-Tests, E2E über Schnittstellen.
- DX: Lokales Entwickeln/Debuggen über mehrere Repos/Module.

| Variante                                              | Zusammensetzung             | Vorteile                                 | Risiken / Wann meiden                            |
| ----------------------------------------------------- | --------------------------- | ---------------------------------------- | ------------------------------------------------ |
| **Build-Time Composition** (z. B. Libraries/Monorepo) | Bei Build verknüpfen        | Beste Performance, einfaches Deploy      | Geringe Team-Autonomie, gekoppelte Releases      |
| **Module Federation** (Webpack)                       | Runtime bundlegesteuert     | Gute Balance Autonomie/Performance       | Version/Shared Libs-Management, SSR knifflig     |
| **App Shell + Web Components**                        | Runtime via Custom Elements | Framework-Mix möglich, saubere Kapselung | Initial-Overhead, Styling/SSR knifflig           |
| **Single-spa / Orchestrator**                         | Runtime Router/Loader       | Sehr autonom, framework-agnostisch       | Höherer Runtime-Overhead, komplexe Observability |
| **Edge Composition** (SSR/ESI/Fragments)              | Server/Edge setzt zusammen  | SEO/SSR top, zentrale Kontrolle          | Edge-Infrastruktur & Caching-Komplexität         |

## Mindestvoraussetzungen (Checkliste)
- Produkt/Organisation: Klare Domänen-Ownership, abgestimmte API-Verträge.
- UX/Design: Design System, Token, konsistente Navigation/App-Shell.
- DevOps: CI/CD pro MFE, Release-/Rollback-Strategie, Observability (Logs, Traces).
- Quality Gates: Contract-/Consumer-Driven-Tests, E2E über Domänengrenzen.
- Security: Zentrale Auth, Berechtigungsmodell, CSP, Dependency-Policy.
- Performance-Budgets: Messbar (LCP/CLS/TTI), gemeinsame Telemetrie.

## Entscheidungsmatrix (Score 0–5, Gewichtung, Schwellen)
So nutzt du die Matrix:
1. Jede Frage mit 0–5 bewerten (0 = trifft nicht zu, 5 = trifft voll zu).
2. Mit Gewicht multiplizieren → Teilscore.
3. Alle Teilscoren summieren → Gesamtscore.
4. Interpretation siehe Schwellen.
> Tipp: Passt Gewichtung an eure Realität an (z. B. Autonomie höher gewichten).


| #  | Kriterium          | Leitfrage                                    | Gewicht | Bewertung (0–5) | Teilscore |
|----|--------------------|----------------------------------------------|--------:|----------------:|----------:|
| 1  | Team-Autonomie     | Brauchen Teams unabhängige Releases?         |       3 |                 |           |
| 2  | Domänenschnitt     | Sind Bounded Contexts klar & stabil?         |       3 |                 |           |
| 3  | Lieferengpass      | Leiden Time-to-Market & Koordination heute?  |       3 |                 |           |
| 4  | Skalierung         | Viele Devs/Streams parallel (≥ 2 Teams)?     |       2 |                 |           |
| 5  | Migration          | Müssen wir schrittweise modernisieren?       |       2 |                 |           |
| 6  | Heterogener Stack  | Benötigen wir Framework-/Version-Freiheit?   |       1 |                 |           |
| 7  | Performance-Budget | Können wir extra Overhead tragen/optimieren? |       2 |                 |           |
| 8  | DevOps-Reife       | CI/CD, Observability, Security vorhanden?    |       2 |                 |           |
| 9  | UX-Governance      | Design System + App-Shell etabliert?         |       2 |                 |           |
| 10 | Abhängigkeiten     | Geringe Cross-Domain Kopplung erreichbar?    |       2 |                 |           |
| 11 | Compliance         | Trennung/Audit pro Domäne gefordert?         |       1 |                 |           |
| 12 | Organisation       | Produkt- und Budget-Ownership je Domäne?     |       2 |                 |           |

**Gesamtscore = Σ (Bewertung × Gewicht)**:

**Schwellen:** ≤35 Nein · 36–60 Pilot · >60 Ja
