# Next Components Roadmap

Stand: 2026-03-13  
Status: aktiv (Build-Priorisierung)

## Ziel
- Den aktuellen Design-System-Ist-Zustand kompakt festhalten.
- Die naechsten sinnvollen Komponenten in einer belastbaren Reihenfolge priorisieren.
- Verhindern, dass neue Komponenten ohne Fundament-Check ad hoc entstehen.

## Ist-Zustand (aktiver Build)

### Foundations
- Farbe: aktiv und tokenisiert
- Typografie: aktiv und tokenisiert
- Motion: aktiv und tokenisiert
- Spacing: primitive Scale + erste semantische Nutzung aktiv
- Sizing: fuer Controls aktiv
- Light/Dark: aktiv

### Layout Primitives
- `DsSectionShell`
- `DsSectionBody`
- `DsContainer`
- `PageContainer` (Legacy-/Transition-Layer)

### Core Primitives
- `DsTypography`
- `DsButton`
- `DsLink`
- `DsIcon`
- `DsInput`
- `DsTextarea`
- `DsSelect`
- `DsCheckbox`
- `DsRadio`
- `DsSwitch`

### Runtime / Tooling
- UnoCSS Token-Layer aktiv
- Storybook aktiv
- Nuxt / Storybook Stubbing aktiv

## Aktuelle Reife (kompakt)
- `Button`: belastbar genug fuer reale Nutzung
- `Link`: belastbar genug inkl. `external`
- `Icon`: belastbare Primitive, aber in realen Komponenten weiter verproben
- `Typography`: als Foundation stabil

## Naechster Build-Block (empfohlen)
Der sinnvollste naechste Block sind Form-Primitives.  
Grund: Sie nutzen direkt eure bestehenden Foundations (Typografie, Spacing, Focus, States) und decken viele echte UI-Flaechen ab.

### Phase 1: Form Core
1. `DsInput` (done)
2. `DsTextarea` (done)
3. `DsSelect` (done)

Ziel:
- gemeinsamer Field-Contract
- gleicher Height-/Padding-/Border-/Focus-Ring-Pfad
- gleiche Label-/Hint-/Error-Logik vorbereiten
- Form Density konsistent: horizontaler Inset ueber `--form-control-inset-x` (Default 20px)

### Phase 2: Form Selection
4. `DsCheckbox` (done)
5. `DsRadio` (done)
6. `DsSwitch` (done)

Ziel:
- gleicher State-Contract (`default`, `hover`, `active`, `focus-visible`, `disabled`, optional `checked`)
- gleiche Accent-Regel fuer aktive Auswahl

## Danach (sinnvolle Folge)

### Phase 3: Surface / Utility
7. `DsBadge`
8. `DsDivider`
9. `DsCard` / `DsSurface`

### Phase 4: Feedback / Status
10. `Empty`
11. `Loading`
12. `Notice / Status`

## Verbindliche Guardrails
- Neue Komponenten folgen immer dem [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md).
- Keine ad-hoc Typografie, wenn ein passender Foundation-Token existiert.
- Keine neuen Spacing-Werte ohne Einordnung in die primitive Scale.
- Hover / Active / Focus-visible muessen vor Storybook-Freigabe als kompletter State-Contract stehen.

## Nächste konkrete Umsetzung
Als naechste echte Komponente bauen wir:
1. `DsBadge`
2. danach `DsDivider`

Begruendung:
- `DsInput` und `DsTextarea` sind bereits umgesetzt und stabil.
- `DsSelect` ist jetzt umgesetzt und schliesst den Field-Contract fuer Form Core.
- `DsCheckbox` ist umgesetzt und als aktiver Contract dokumentiert.
- `DsRadio` ist umgesetzt und als aktiver Contract dokumentiert.
- `DsSwitch` ist umgesetzt und als aktiver Contract dokumentiert.
- Der Selection-Block ist damit abgeschlossen.
- `DsBadge` ist jetzt als doc-first Contract angelegt und bereit fuer Runtime-Umsetzung.

## Scope-Cleanup (2026-03-09)
- Aus dem aktiven Build entfernt (deferred):
  - `DsStack`
  - `DsCluster`
  - `DsMediaFrame`
  - `DsTag`
- Diese Komponenten sind kein Teil des aktuellen Basics-Scopes und werden spaeter neu bewertet.

Aktiver Plan fuer den ersten Schritt:
- [DS-INPUT.md](./DS-INPUT.md)
- [DS-CHECKBOX.md](./DS-CHECKBOX.md)
- [DS-TEXTAREA.md](./DS-TEXTAREA.md)
- [DS-SELECT.md](./DS-SELECT.md)
- [DS-RADIO.md](./DS-RADIO.md)
- [DS-SWITCH.md](./DS-SWITCH.md)
- [DS-BADGE.md](./DS-BADGE.md)
