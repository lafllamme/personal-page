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
| Metric | Zalando Sans Expanded | Kennzahlen, Market Pulse |
| Signal | Zalando Sans Expanded | kurze IDs, Stamps, numerische Marker |

## Typografie-Scale (Foundation)

Diese Scale ist die gemeinsame Referenz fuer Komponenten (inkl. Buttons, Inputs, Labels).
Hinweis: Werte sind mit `TYPOGRAPHY-SCALING-PLAN.md` harmonisiert (Option 2).

| Token | Zielrolle | Size | Line-height | Tracking | Notiz |
|---|---|---|---|---|---|
| `type-display-xl-*` | Display | `clamp(2.4rem,6.2vw,5rem)` | `0.95` | `normal` | Hero / Key visual |
| `type-display-lg-*` | Display | `clamp(1.8rem,4.2vw,3.2rem)` | `1.02` | `normal` | Section hero |
| `type-headline-lg-*` | Headline | `clamp(1.4rem,2.4vw,2rem)` | `1.12` | `normal` | Primaere Headline |
| `type-headline-md-*` | Headline | `clamp(1.1rem,1.4vw,1.35rem)` | `1.25` | `normal` | Sekundaere Headline |
| `type-headline-sm-*` | Headline | `1rem` | `1.35` | `normal` | Kleine Headline |
| `type-body-lg-*` | Body | `1rem` | `1.55` | `normal` | Leseorientiert |
| `type-body-md-*` | Body | `0.875rem` | `1.55` | `normal` | Standard body |
| `type-body-sm-*` | Body | `0.75rem` | `1.45` | `normal` | Dense content |
| `type-meta-sm-*` | Meta/UI | `11px` | `1.35` | `0.16em` | Labels / UI meta |
| `type-meta-xs-*` | Meta/UI | `10px` | `1.35` | `0.14em` | Micro labels |
| `type-signal-sm-*` | Signal | `0.75rem` | `1.35` | `0.16em` | IDs / pulse |
| `type-quote-md-*` | Quote | `1.15rem` | `1.35` | `normal` | Editorial contrast |

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
