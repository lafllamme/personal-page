# DESIGNSYSTEM (P04-MPZ01 + RedXT)

Stand: 2026-02-22  
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

Der Button wird ueber zwei Dimensionen aufgebaut:
- `variant`: `default` | `accent`
- `type`: `primary` | `secondary` | `tertiary` | `quaternary`

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

Weight-Status (aktuell):
- Ohne `weight`-Prop greift der Rollen-Default aus `DsTypography`.
- `weight`-Overrides (`named` oder `100..900`) nur gezielt pro Use-Case setzen.
- Nicht verfuegbare Gewichte mappen auf den naechsten verfuegbaren Rollenschnitt.

Aktive Naming-Regel:
- Runtime verwendet `type-*` (z. B. `type-display-xl`, `type-body-md`).
- `ui-type-*` ist nicht mehr Teil des aktiven Design-System-Pfads.
