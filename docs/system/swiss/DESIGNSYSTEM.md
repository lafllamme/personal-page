# DESIGNSYSTEM (P04-MPZ01 + RedXT)

Stand: 2026-03-11  
Status: Single Source of Truth fuer den naechsten Komponentenbau
Hinweis: Wir sind aktuell aktiv dabei, das Design-System iterativ zu schreiben und zu verfeinern.

## 1) Scope
- Exploration-Views bleiben Referenz/Test, nicht Build-Quelle.
- Build-Basis ist:
  - Winner: `P04-MPZ01`
  - Accent-System: `Radix Teal 9/11` (RedXT-Kombo)

## 2) Verbindliche Stilregeln
- Grundflaechen: nur `pureBlack` / `pureWhite`.
- Accent nur als Signal:
  - primary CTA
  - active state (chips/tabs/toggles)
  - focus ring
  - status marker
- Keine zusaetzlichen Flaechenfarbwelten im Grundlayout.

## 3) Layout- und Rhythmusregeln
- Section-basiertes System, pro Abschnitt klare Rolle.
- `Section` kann `min-height: 100dvh` nutzen, aber nicht global erzwingen.
- Primärsystem: `DsSectionShell` (Y-Rhythmus) + `DsSectionBody` (max/gutter/mode).
- `PageContainer` bleibt als Transition-Layer fuer Legacy-/Default-Layout bestehen.
- Grid ist pro Section explizit entscheidbar (kein Zwangsgrid).
- Vertikaler Rhythmus bleibt im 8pt-System.

### 3.1 Aktuelle Container-Nutzung (Ist-Stand)
- `layouts/default.vue`: nutzt `PageContainer` (Transition-Layer).
- `layouts/design-system.vue`: nutzt `DsContainer` als neutrale Huelle.
- `pages/design-system-debug.vue`: nutzt bereits direkt `DsSectionShell` + `DsSectionBody`.
- `pages/design-system.vue`: nutzt aktuell noch `DsSectionContainer` (Legacy-Wrapper), intern aber auf `DsSectionShell` + `DsSectionBody`.

## 4) Komponentenstart (verbindliche Reihenfolge)
1. `Button` (`primary`, `secondary`, `tertiary`, `link` + states)
2. `TextLink`
3. `Container` (`Section`, `PageContainer`)
4. `Card` (base/elevated)
5. `Accordion`
6. `Toggle`
7. `ExpandableCard`

## 5) Visuelle Zielcharakteristik
- Nicht generisch, sondern:
  - dense editorial hierarchy
  - klare meta-rails
  - hoher Kontrast
  - kontrollierte, funktionale Signalfarbe
- Inspirationsanker: `cloth`, `run`, `estate`, `brand`, plus strukturierende Inputs aus `construct/construct-2`.

## 6) Aktive Referenzen
- Swiss Style Guidelines (allgemein): [SWISS-STYLE-GUIDELINES.md](./SWISS-STYLE-GUIDELINES.md)
- Accent Color Referenz: [ACCENT-COLOR-RADIX-TEAL-911.md](../../reference/ACCENT-COLOR-RADIX-TEAL-911.md)
- Foundation Baseline: [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md)
- Motion Baseline: [MOTION.md](./MOTION.md)
- Link Contract: [DS-LINK.md](./DS-LINK.md)
- Icon Contract: [DS-ICON.md](./DS-ICON.md)
- Input Contract (aktiv): [DS-INPUT.md](./DS-INPUT.md)
- Checkbox Contract (aktiv): [DS-CHECKBOX.md](./DS-CHECKBOX.md)
- Textarea Contract (aktiv): [DS-TEXTAREA.md](./DS-TEXTAREA.md)
- Select Contract (aktiv): [DS-SELECT.md](./DS-SELECT.md)
- Radio Contract (aktiv): [DS-RADIO.md](./DS-RADIO.md)
- Next Components Roadmap: [NEXT-COMPONENTS-ROADMAP.md](./NEXT-COMPONENTS-ROADMAP.md)
- Storybook / Nuxt Stubbing: [STUBBING.md](./STUBBING.md)
- Typography Scaling Plan: [TYPOGRAPHY-SCALING-PLAN.md](./TYPOGRAPHY-SCALING-PLAN.md)
- Component Contract: [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)
- Typography Source Map: [TYPOGRAPHY-SOURCE-MAP.md](./TYPOGRAPHY-SOURCE-MAP.md)
- Komponentenmatrix: [COMPONENT-MATRIX.md](../../inspiration/designs/COMPONENT-MATRIX.md)
- Inspiration (Inspo-Merge): [INSPIRATION.md](../../inspiration/designs/INSPIRATION.md)
- Token-Herkunft: [TOKEN-REFERENZEN.md](../../inspiration/designs/TOKEN-REFERENZEN.md)
- Variant-Track (REFERENCE): [VARIANT-TOKEN-PACKS.md](../../reference/VARIANT-TOKEN-PACKS.md)

## 7) Decision Snapshot (kompakt)
- Winner-Logik:
  - Basisgewinner: `P04` (Swiss Signal Orange, Phase 1)
  - Finaler Winner-Stand: `P04-MPZ01` (Zalando Sans Expanded als Signalrolle integriert)
- Aktiver Farbentscheid:
  - Basissystem bleibt Pure Black / Pure White
  - Aktiver Akzent: `Radix Teal 9/11` (`#12A594` light / `#0BD8B6` dark)
- Typografieentscheid zu Zalando:
  - `Clash Display` bleibt Headline-Lead.
  - `Zalando Sans Expanded` wird als `Signal`-Typo genutzt:
    - Kennzahlen (Market Pulse / Stats),
    - kurze Campaign-Stamps,
    - Section IDs / numerische Marker.
  - Kein Ersatz fuer Body oder klassische Fliesstext-Headline.
- Prozessentscheid:
  - Exploration bleibt Referenz, Build erfolgt nur aus diesem Dokument + aktiven Referenzen
  - Neue Komponenten werden nur mit `Font`, `Weight`, `Intention`, `Color` spezifiziert
- Form-Density-Entscheid (2026-03-08):
  - Horizontaler Form-Control-Inset ist vereinheitlicht auf `--form-control-inset-x`.
  - Defaultwert: `20px` (`var(--space-5)`), gilt fuer `DsInput`, `DsTextarea`, `DsSelect`.
- Form-Shape-Entscheid (2026-03-08):
  - Form-Controls unterstuetzen `shape='pill' | 'rounded'`.
  - Token-Level: `pill` (`--radius-form-pill = 1rem / 16px`) und `rounded` (`--radius-form-rounded = 0.5rem / 8px`).
  - Component-Defaults: `DsInput` + `DsTextarea` + `DsSelect` nutzen `rounded`.
- DS-Select Architekturstand (2026-03-08):
  - `DsSelect` laeuft jetzt vollstaendig ueber Uno-Shortcuts (`ui-select-*`), ohne komponentenspezifischen Styleblock.
  - Required-on-blur nutzt das Input-Pattern: nur Error-Message shake't, nicht das Feld selbst.
  - Storybook ist auf State-Parity ausgebaut (`DsSelect.stories.ts`): default/hover/focus/open/selected/error/disabled/empty + shape.
- DS-Checkbox Architekturstand (2026-03-11):
  - `DsCheckbox` ist aktiv im Runtime-Pfad (`motion-v` + `ui-checkbox-*` Shortcuts) und im Debug-View integriert.
  - Motion/Size-Grundwerte sind im Token-Set verankert (`--motion-checkbox-*`, `--size-checkbox-*`, `--radius-checkbox-*`).
  - State-Prioritaet bleibt: `disabled > invalid > focus-visible > hover > default`.
- DS-Radio Architekturstand (2026-03-12):
  - `DsRadio` ist aktiv im Runtime-Pfad (`ui-radio-*` Shortcuts) und im Debug-View integriert.
  - Basis-Visual folgt dem Base-Radio-Prinzip: neutraler Ring + animierter Dot, ohne gefuellte Control-Surface.
  - Required-on-blur + Error-Shake folgt dem gemeinsamen Field-Pattern.
- Naming-Migration Form Controls (2026-03-11):
  - Legacy-Field-Aliase in `palette.ts` wurden entfernt.
  - Aktive Form-Token laufen nur noch ueber `field`-Namen (`color-field-*`, `bg-field-*`, `border-field-*`).
- Scope-Cleanup (2026-03-09):
  - `DsStack`, `DsCluster`, `DsMediaFrame`, `DsTag` sind aus dem aktiven Build-Scope entfernt (deferred).
  - Begruendung: Fokus auf Form-Core + Selection-Block vor weiteren Surface-/Layout-Primitives.
  - Diese Komponenten gelten bis zur Reaktivierung als `out of active scope`.

## 8) Was wir bewusst nicht mehr pflegen
- A-E Exploration-Rahmen als System-Definition.
- Alte Swiss-Guide-Doppelungen mit gleichem Inhalt in mehreren Dateien.
- Generische UI-Kit-Ansatzdateien ohne P04-MPZ01-Stilbindung.

## 9) Storybook + UnoCSS Guardrail (verbindlich)
- Keine JS-String-Generierung fuer Klassen oder Markup in Stories.
- Keine Template-String-Loops fuer Matrix-Layouts (`.map(...)` + HTML-Strings).
- Story-Markup fuer Vergleichsblöcke immer als echte `.vue`-Komponente ausschreiben.
- Grund: UnoCSS kann dynamisch erzeugte Klassen nicht zuverlässig extrahieren; fehlende Klassen fuehren zu kaputtem Layout (z. B. fehlende `grid-cols`, `items-start`).

## 10) Button Contract (aktiver Stand)

Der Button wird ueber drei Dimensionen aufgebaut:
- `variant`: `default` | `accent` | `mixed`
- `type`: `primary` | `secondary` | `tertiary` | `quaternary`
- `shape`: `pill` | `rounded`

### 10.1 Variant x Type Mapping

| variant | type | shortcut |
|---|---|---|
| `default` | `primary` | `v-neutral-solid` |
| `default` | `secondary` | `v-neutral-outline` |
| `default` | `tertiary` | `v-neutral-ghost` |
| `default` | `quaternary` | `v-neutral-soft` |
| `accent` | `primary` | `v-accent-solid` |
| `accent` | `secondary` | `v-accent-outline` |
| `accent` | `tertiary` | `v-accent-ghost` |
| `accent` | `quaternary` | `v-accent-soft` |
| `mixed` | `primary` | `v-mixed-solid` |
| `mixed` | `secondary` | `v-mixed-outline` |
| `mixed` | `tertiary` | `v-mixed-ghost` |
| `mixed` | `quaternary` | `v-mixed-soft` |

### 10.2 Verbindliche States

| State | Pflicht |
|---|---|
| `default` | ja |
| `hover` | ja |
| `active` | ja |
| `focus-visible` | ja |
| `disabled` | ja |

### 10.3 Build-Ort (Runtime)
- Variant-Interaktion: [`frontend/app/assets/unocss/shortcuts.variants.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.variants.ts)
- Struktur-Shell: [`frontend/app/assets/unocss/shortcuts.button.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.button.ts)
- Tokenwerte: [`frontend/app/assets/unocss/palette.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)
- Komponenten-Mapping: [`frontend/app/components/ui/DesignSystem/DsButton.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsButton.vue)

### 10.4 Secondary Interaktionsregel (final)
- `secondary` (`default` + `accent`) nutzt Vertical-Sweep-Fill:
  - `before` startet unten (`translate-y-full`)
  - hover/active/focus fahren den Fill nach oben (`translate-y-0`) ueber `motion-secondary-sweep-*` Tokens
- Kein Container-Scale auf Hover/Active (Button-Groesse bleibt stabil).

### 10.5 Primary Text-Animation (final)
- `primary` (`default` + `accent`) nutzt standardmaessig `animation="rotate"` (staggered rotate labels).
- Optional steht `animation="decrypt"` fuer den Scramble-Effekt zur Verfuegung.
- Triggerverhalten:
  - `rotate`: Trigger auf Hover/Fokus am Button.
  - `decrypt`: Trigger ueber `decrypt.animateOn` (`view|hover|both`).
- Standardwerte:
  - `animation='rotate'`
  - (`decrypt` optional als Objekt: `{ speed: 50, sequential: true, maxIterations: 10, revealDirection: 'start', animateOn: 'both', useOriginalCharsOnly: false }`)
- Fokus auf stabile Geometrie:
  - Label-Breite bleibt stabil (kein Width-Jump waehrend Scramble).
  - Button-Box bleibt fuer alle Varianten/Sizes konsistent (keine Primary-only Height/Padding-Overrides).
  - Primary Rotate nutzt 2 Label-Layer + y-origin Token-Tuning (Osmo-nahe), aber ohne DS-Layout-Drift.

### 10.6 Focus Ring Konsistenz (verbindlich)
- `focus-visible` folgt immer derselben visuellen Systematik pro Variante:
  - Focus-Hintergrund entspricht dem jeweiligen Hover-Hintergrund (bzw. Hover-Fill bei Morph/Sweep Varianten).
  - Der aeussere Focus-Ring nutzt denselben Farbkontext wie der Focus-Fill (kein Farb-Mismatch).
- Ringbreiten werden zentral ueber Tokens gesetzt:
  - `--focus-ring-inner-width`
  - `--focus-ring-outer-width`
- Keine harten `2px`/`4px` Werte fuer Focus-Ringe in Variant-Shortcuts.
- Matrix/Story States muessen dieselbe Focus-Logik wie Runtime-Shortcuts spiegeln.

### 10.7 Button + Icon (aktiver Stand)
- `DsButton` unterstuetzt optional:
  - `icon?: string`
  - `iconPosition?: 'left' | 'right'`
  - `iconOnly?: boolean`
- Regel:
  - Textbutton mit Icon bleibt derselbe Kontrolltyp und wird nicht als eigene Wrapper-Komponente gebaut.
  - Das Icon rendert mit `currentColor` und folgt damit automatisch allen Text-/State-Farben.
  - `iconOnly` bleibt vorerst Teil von `DsButton` fuer Exploration; wenn daraus ein eigener Kontrolltyp mit abweichender Geometrie wird, wird spaeter ein eigener `DsIconButton` daraus.

### 10.7.1 Button Shape (aktiver Stand)
- `shape='pill'` bleibt der Default.
- `shape='rounded'` nutzt `radius-xs` (`0.125rem` / `2px`) fuer eine bewusst eckigere Variante.
- `shape` aendert nur den Radius, nicht Padding, Hoehe, Motion oder Variant-State-Logik.

### 10.7.2 Button Size Ladder (aktiver Stand)
- Die Osmo-nahe Referenzgroesse liegt im Designsystem jetzt auf `lg`, nicht auf `md`.
- Bedeutet:
  - `lg` = Referenz fuer den dichten Osmo-Default-Footprint
  - `md` = sichtbar kompaktere Standardstufe darunter
  - `sm` = Utility-/Tight-Stufe darunter
- Foundation zuerst, Button danach:
  - Primitive Control-Scale:
    - `size-control-sm = 2rem`
    - `size-control-md = 2.25rem`
    - `size-control-lg = 2.625rem`
  - Primitive Spacing-Scale:
    - `space-0_25 = 0.0625rem`
    - `space-3 = 0.75rem`
    - `space-3_5 = 0.875rem`
    - `space-4_75 = 1.1875rem`
  - Button-Aliase:
    - `button-height-sm|md|lg -> size-control-sm|md|lg`
    - `button-px-sm -> space-3`
    - `button-px-md -> space-3_5`
    - `button-px-lg -> space-4_75`
    - `button-pb-sm|md|lg -> space-0_25`
- Regel:
  - `pill` und `rounded` teilen dieselbe Groessenleiter
  - nur der Radius trennt die Shape-Wirkung

### 10.7.3 Button Label Density (aktiver Stand)
- Der Default-Button nutzt jetzt eine dichtere Label-Wirkung als zuvor:
  - `tracking='default'` ist der aktive Default
  - `line-height: 1`
  - Basis-Letter-Spacing im Button-Label: `-0.02em`
  - finale Control-Kalibrierung ueber:
    - `button-label-track-sm = -0.01em`
    - `button-label-track-md = -0.01em`
    - `button-label-track-lg = -0.01em`
  - `DsButton` bleibt dabei auf `DsTypography role='meta'`
  - Groessen-Mapping bleibt:
    - `sm -> meta/xs`
    - `md -> meta/sm`
    - `lg -> meta/md`
- Ziel:
  - Osmo-naehere Default-Dichte
  - keine luftige Standardwirkung mehr im Control

### 10.8 Button Active Press Motion
- Alle Button-Varianten verwenden im `active` denselben Press-Effekt:
  - kein `translateY`-Push mehr
  - stattdessen ein tokenisiertes Scale-Down ueber `motion-active-press-scale`
- Der visuelle Druck kommt aus der Kombination von:
  - `active`-Scale
  - bereits definierter dunklerem / dichteren `active`-Fill je Variante
- Regel:
  - Wenn sich der Press-Effekt zu stark oder zu schwach anfuehlt, nur den Tokenwert aendern
  - nicht pro Variante wieder eigene `active`-Transforms einfuehren

## 11) P04-MPZ01 Origin References (nicht verlieren)

Die originalen Referenzen fuer den heutigen Build-Stand:

- Exploration-Implementierung (P04-MPZ01 Vergleich + Iteration):
  - [`frontend/app/pages/exploration.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/pages/exploration.vue)
- Token-Pack-Basis (inkl. `P04`, `P04-MPZ01`, Varianten):
  - [`docs/inspiration/designs/tokens/variant-token-packs.v1.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/variant-token-packs.v1.json)
- Entscheidungs-/Evaluationssnapshots:
  - [`docs/inspiration/designs/tokens/evaluations/phase-1-technews-benchmark.2026-02-14.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/evaluations/phase-1-technews-benchmark.2026-02-14.json)
  - [`docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json)
- Aktive Farbuebersetzung fuer Build:
  - [`docs/reference/ACCENT-COLOR-RADIX-TEAL-911.md`](file:///Users/flame/Developer/Projects/personal-page/docs/reference/ACCENT-COLOR-RADIX-TEAL-911.md)

Regel: Neue Design- oder Token-Entscheidungen duerfen diese Herkunftslogik nicht stillschweigend brechen.

## 12) Typography Source Map (P04-MPZ01)

Damit die Typografie-Kombination nicht verloren geht, gilt diese Lesereihenfolge:

1. Human-readable Baseline (`SOURCE OF TRUTH`):
   - [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md)
   - [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)
2. Raw Pack Data (`REFERENCE`):
   - [`docs/inspiration/designs/tokens/variant-token-packs.v1.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/variant-token-packs.v1.json)
3. Prototype Context (`REFERENCE`):
   - [`frontend/app/pages/exploration.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/pages/exploration.vue)

Aktiver P04-MPZ01 Typo-Kern:
- Display: `Druk Bold`
- Headline: `Clash Display`
- Body: `Manrope`
- Meta/UI: `Space Grotesk`
- Quote: `Libre Baskerville`
- Metric/Signal: `Zalando Sans Expanded`

### 12.1 Aktueller Runtime-Pfad (Implementierung)
- Theme-Families: [`frontend/app/assets/unocss/theme.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts)
- Tokenwerte (Size/Leading/Tracking): [`frontend/app/assets/unocss/palette.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)
- Semantische Klassen: [`frontend/app/assets/unocss/shortcuts.typography.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.typography.ts)
- Komponenten-Mapping: [`frontend/app/components/ui/DesignSystem/DsTypography.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue)

Tracking-Status (aktuell):
- Display: kuratierte Tracking-Kurve (`type-track-display-*` + `*-md`)
- Headline: kein separates Tracking-Token (nur Family + Size/Leading)
- Meta: size-basierte, negative Tracking-Kurve (`type-track-meta-*`, `xs=-0.012em` bis `4xl=-0.025em`)
- Meta optional relaxed: `tracking="relaxed"` in `DsTypography` mapped auf `type-track-meta-*-relaxed` (`xs=0.06em` bis `4xl=0.12em`, aktuell nur wirksam fuer `role="meta"`)

Weight-Status (aktuell):
- Ohne `weight`-Prop greift der Rollen-Default aus `DsTypography`.
- `weight`-Overrides (`named` oder `100..900`) nur gezielt pro Use-Case setzen.
- Nicht verfuegbare Gewichte mappen auf den naechsten verfuegbaren Rollenschnitt.

Aktive Naming-Regel:
- Runtime verwendet `type-*` (z. B. `type-display-xl`, `type-body-md`).
- `ui-type-*` ist nicht mehr Teil des aktiven Design-System-Pfads.
