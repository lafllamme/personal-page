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
