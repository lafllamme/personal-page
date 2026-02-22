# Foundation Baseline (P04-MPZ01)

Stand: 2026-02-21  
Status: SOURCE OF TRUTH (lesbarer Baseline-Contract)

## Zweck
- Menschlich lesbare Baseline fuer Typografie, Farbe und Rollen.
- Schnellstart fuer neue Komponenten ohne JSON-/Proto-Deep-Dive.
- Diese Datei beschreibt das "Warum + Was", nicht die Implementierungsdetails.

## Typografie-Baseline

| Rolle | Family | Einsatz |
|---|---|---|
| Display | Druk Bold | Hero-Impact, dominante Headlines |
| Headline | Clash Display | Section-Headlines, markante Titel |
| Body | Manrope | Fliesstext, leselastige Inhalte |
| Meta/UI | Space Grotesk | Labels, UI-Meta, Utility-Infos |
| Quote | Libre Baskerville | Editoriale Zitat-/Kontrastmomente |
| Signal | Zalando Sans Expanded | kurze IDs, Stamps, numerische Marker |

## Typografie-Scale (Foundation)

Diese Scale ist die gemeinsame Referenz fuer Komponenten (inkl. Buttons, Inputs, Labels).
Hinweis: Werte sind mit `TYPOGRAPHY-SCALING-PLAN.md` harmonisiert und im Runtime-Pfad live.

| Size Token | Font-size | Leading Token |
|---|---|---|
| `type-size-xs` | `clamp(0.75rem, calc(0.68rem + 0.22vw), 0.875rem)` | `type-leading-xs` (`1.35`) |
| `type-size-sm` | `clamp(0.875rem, calc(0.8rem + 0.3vw), 1rem)` | `type-leading-sm` (`1.45`) |
| `type-size-md` | `clamp(1rem, calc(0.92rem + 0.38vw), 1.125rem)` | `type-leading-md` (`1.55`) |
| `type-size-lg` | `clamp(1.125rem, calc(1rem + 0.52vw), 1.375rem)` | `type-leading-lg` (`1.35`) |
| `type-size-xl` | `clamp(1.375rem, calc(1.12rem + 1.1vw), 2rem)` | `type-leading-xl` (`1.12`) |
| `type-size-2xl` | `clamp(1.75rem, calc(1.35rem + 1.9vw), 3rem)` | `type-leading-2xl` (`1.02`) |
| `type-size-3xl` | `clamp(2.25rem, calc(1.65rem + 3vw), 4.75rem)` | `type-leading-3xl` (`0.95`) |
| `type-size-4xl` | `clamp(2.6rem, calc(1.85rem + 4.1vw), 6.2rem)` | `type-leading-4xl` (`0.92`) |

### Rollen-Mapping (Runtime)
- Display: `type-display-*` + Druk split (`font-display-compact` fuer `xs/sm`, `font-display-hero` ab `md`) + kuratiertes Display-Tracking
- Headline: `type-headline-*` + `font-headline`
- Body: `type-body-*` + `font-body`
- Meta: `type-meta-*` + `font-meta` + `type-track-meta-*` (size-basierte negative Tracking-Kurve)
- Quote: `type-quote-*` + `font-quote`
- Signal: `type-signal-*` + `font-signal`

### Weight / Italic Defaults (DsTypography)
- Weight Defaults:
  - Display: `medium` (`font-medium`)
  - Headline / Quote: `regular` (`font-normal`)
  - Body: `light` (`font-light`)
  - Meta: `medium` (`font-medium`)
  - Signal: `semibold` (`font-semibold`)
- Italic Default:
  - Quote: `italic = true`
  - Alle anderen Rollen: `italic = false`
- Override per Komponente:
  - `weight="auto|thin|extralight|light|regular|medium|semibold|bold|extrabold|black|100..900"`
  - `:italic="true|false"`

### Gewichtungs-Support pro Rolle (Runtime Guardrail)
- Display: `500|700|800|900`
- Headline: `200|300|400|500|700`
- Body: `200|300|400|500|600|700|800`
- Meta: `300|400|500|600|700`
- Quote: `400|700`
- Signal: `200|300|400|500|600|700|800|900`

Hinweis: Nicht unterstuetzte Weight-Overrides werden auf den naechsten verfuegbaren Schnitt der Rolle gemappt.

Praktische Runtime-Regel (Default vs. Override) inkl. Vue-Beispiel:
- [TYPOGRAPHY-SCALING-PLAN.md](./TYPOGRAPHY-SCALING-PLAN.md) -> Abschnitt `1.6 Runtime-Verwendung (Default vs. Override)`

### Control-Mapping (verbindlich)
- Button `sm` -> `type-meta-xs-*`
- Button `md` -> `type-meta-sm-*`
- Button `lg` -> `type-meta-sm-*` (mit erhoehtem Tracking auf `0.18em`)
- Input/Select Placeholder -> `type-body-md-*`
- Helper / Hint Text -> `type-body-sm-*`

## Farb-Baseline
- Basisflaechen: `pureBlack` / `pureWhite`
- Accent-System: `Radix Teal 9/11`
- Accent nur als Signal:
  - CTA
  - active
  - focus
  - status

## Komponenten-Baseline
- Jede Komponente wird mit 4 Kernfeldern spezifiziert:
  - Font
  - Weight
  - Intention
  - Color
- Verbindlicher Spec-Rahmen:
  - [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)

## Herkunft / Nachweis
- Detail-Source-Map:
  - [TYPOGRAPHY-SOURCE-MAP.md](./TYPOGRAPHY-SOURCE-MAP.md)
- Gesamtentscheidungen:
  - [DESIGNSYSTEM.md](./DESIGNSYSTEM.md)
