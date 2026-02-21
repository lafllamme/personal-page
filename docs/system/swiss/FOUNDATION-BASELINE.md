# Foundation Baseline (P04-MPZ01)

Stand: 2026-02-20  
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

| Token | Zielrolle | Size | Line-height | Tracking | Notiz |
|---|---|---|---|---|---|
| `display-xl` | Display | `clamp(2.4rem,6.2vw,5rem)` | `0.95` | `normal` | Hero / Key visual |
| `display-lg` | Display | `clamp(1.8rem,4.2vw,3.2rem)` | `1.02` | `normal` | Section Hero |
| `headline-lg` | Headline | `clamp(1.4rem,2.4vw,2rem)` | `1.12` | `normal` | Primare Headline |
| `headline-md` | Headline | `1.15rem` | `1.35` | `normal` | Sekundaere Headline |
| `headline-sm` | Headline | `1rem` | `1.45` | `normal` | Kleine Headline |
| `text-lg` | Body | `1rem` | `1.55` | `normal` | Leseorientiert |
| `text-md` | Body | `0.875rem` | `1.55` | `normal` | Standard Body |
| `text-sm` | Body | `0.75rem` | `1.45` | `normal` | Dense Content |
| `meta-sm` | Meta/UI | `11px` | `1.35` | `0.16em` | Labels / UI Meta |
| `meta-xs` | Meta/UI | `10px` | `1.35` | `0.14em` | Micro Labels |
| `signal-sm` | Signal | `0.75rem` | `1.35` | `0.16em` | IDs / Pulse |
| `quote-md` | Quote | `1.15rem` | `1.35` | `normal` | Editorial Contrast |

### Control-Mapping (verbindlich)
- Button `sm` -> `meta-xs`
- Button `md` -> `meta-sm`
- Button `lg` -> `meta-sm` (mit erhoehtem Tracking auf `0.18em`)
- Input/Select Placeholder -> `text-md`
- Helper / Hint Text -> `text-sm`

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
