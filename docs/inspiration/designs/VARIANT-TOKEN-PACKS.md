# Variant Token Packs v1

> Zweck: Stilvariation ohne Layout-Drift. Alle Packs nutzen dieselbe Component Matrix und denselben Content.
> Status: Proposals fuer Vergleichstests, nicht final.

## 1) Token Contract (gleich fuer alle Packs)

| Gruppe | Keys |
|---|---|
| Typography | `font.display`, `font.headline`, `font.body`, `font.meta`, `font.quote`, `font.metric` |
| Scale | `type.h1`, `type.h2`, `type.body`, `type.meta`, `type.quote`, `type.metric` |
| Spacing | `density.mode`, `space.section`, `space.block`, `space.inline` |
| Color Roles | `color.bg`, `color.surface`, `color.text`, `color.muted`, `color.accent`, `color.border` |
| Media | `media.ratio.hero`, `media.ratio.card`, `media.overlay` |

### Mode-Parity Regel
- Wenn ein Pack als farbige Stilrichtung definiert ist, bleibt der Farbcharakter in Light **und** Dark erhalten.
- Ein Wechsel auf neutrales Light ist nur erlaubt, wenn es als bewusste Ausnahme dokumentiert ist.

## 2) Pack Proposals

## Pack P01 - Swiss Neutral Light
- Wirkung: ruhig, editorial, sehr lesbar.
- Fonts: Display `Cabinet Grotesk`, Headline `Manrope`, Body `Geist`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `airy`.
- Colors: `bg #F7F7F5`, `surface #FFFFFF`, `text #111111`, `muted #6B6B6B`, `accent #1E1E1E`, `border #DADADA`.
- Use Cases: agency, company, studio, portfolio-2.

## Pack P02 - Swiss Editorial Serif
- Wirkung: kulturell, magazinartig, elegant.
- Fonts: Display `Nohemi`, Headline `Cabinet Grotesk`, Body `Manrope`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `balanced`.
- Colors: `bg #F4F1EB`, `surface #FFFFFF`, `text #151515`, `muted #707070`, `accent #2A2A2A`, `border #D8D2C9`.
- Use Cases: photography, magazine-2, health, skate.

## Pack P03 - Swiss Dark Impact
- Wirkung: stark, modern, kontrastreich.
- Fonts: Display `Druk Bold`, Headline `Now`, Body `Geist`, Meta `Space Grotesk`, Quote `Manrope`.
- Density: `dense`.
- Colors: `bg #090909`, `surface #121212`, `text #F3F3F3`, `muted #A0A0A0`, `accent #FFFFFF`, `border #2A2A2A`.
- Use Cases: magazine, product, portfolio, photography-2.

## Pack P04 - Swiss Signal Orange
- Wirkung: energiegeladen, campaign-driven, urban.
- Fonts: Display `Druk Bold`, Headline `Clash Display`, Body `Manrope`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `dense`.
- Colors: `bg #0B0B0B`, `surface #161616`, `text #F7F7F7`, `muted #A8A8A8`, `accent #FF4D00`, `border #2D2D2D`.
- Use Cases: brand, run, sport, estate.

## Pack P05 - Swiss Tech Luxe
- Wirkung: premium-tech, praezise, leicht futuristisch.
- Fonts: Display `Nohemi`, Headline `Cabinet Grotesk`, Body `Geist`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `balanced`.
- Colors: `bg #EDEBE5`, `surface #10312C`, `text #111111`, `muted #5E6663`, `accent #E34A1A`, `border #C9C2B8`.
- Use Cases: tech, construct-2, construct.

## Pack P06 - Swiss Fashion Olive
- Wirkung: editorial-fashion, warm, charakterstark.
- Fonts: Display `Nohemi`, Headline `Cabinet Grotesk`, Body `Manrope`, Meta `Space Grotesk`, Quote `Recoleta`.
- Density: `balanced`.
- Colors: `bg #ECE7DC`, `surface #101205`, `text #1A1A1A`, `muted #6D6D6D`, `accent #5D6B1F`, `border #D2CCBF`.
- Use Cases: fashion, fashion-2, magazine-3, music.

## Pack P07 - Swiss Corporate Mono
- Wirkung: sachlich, vertrauensvoll, systematisch.
- Fonts: Display `Cabinet Grotesk`, Headline `Manrope`, Body `Geist`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `balanced`.
- Colors: `bg #F2F2F2`, `surface #FFFFFF`, `text #131313`, `muted #656565`, `accent #2A2A2A`, `border #D7D7D7`.
- Use Cases: furniture, construct, construct-2, company.

## Pack P08 - Swiss Kinetic Night
- Wirkung: dynamisch, entertainment-orientiert, high-energy.
- Fonts: Display `Now`, Headline `Clash Display`, Body `Manrope`, Meta `Space Grotesk`, Quote `Libre Baskerville`.
- Density: `dense`.
- Colors: `bg #07090D`, `surface #10131A`, `text #F6F8FC`, `muted #9FA8B5`, `accent #C7FF2E`, `border #252B36`.
- Use Cases: cloth, music, magazine-3.

## 3) Mapping fuer eure 26 Ordner (Startzuordnung)

| Ordner | Primary Pack | Secondary Pack |
|---|---|---|
| agency | P01 | P02 |
| brand | P04 | P03 |
| cloth | P08 | P03 |
| company | P07 | P01 |
| construct | P07 | P05 |
| construct-2 | P05 | P07 |
| estate | P04 | P03 |
| fashion | P06 | P02 |
| fashion-2 | P06 | P01 |
| furniture | P07 | P01 |
| health | P02 | P06 |
| magazine | P03 | P08 |
| magazine-2 | P02 | P06 |
| magazine-3 | P06 | P08 |
| music | P08 | P06 |
| photography | P02 | P01 |
| photography-2 | P03 | P08 |
| portfolio | P03 | P07 |
| portfolio-2 | P01 | P02 |
| portfolio-3 | P07 | P03 |
| product | P03 | P05 |
| run | P04 | P08 |
| skate | P02 | P01 |
| sport | P04 | P08 |
| studio | P01 | P05 |
| tech | P05 | P03 |

## 4) Test Set Proposals (was ihr als erstes vergleichen solltet)
1. `T1`: B1 Editorial Balanced mit P01 vs P02 vs P06.
2. `T2`: B2 Visual Dense mit P03 vs P04 vs P08.
3. `T3`: B3 Corporate Clarity mit P05 vs P07 vs P01.

## 5) Bewertungslogik fuer den Abgleich
- `Readability`: Headline/Body auf 3 Geraete-Breiten pruefen.
- `Hierarchy`: 3-Sekunden-Test auf Fokus und CTA.
- `Brand Fit`: passt die Pack-Wirkung zur Referenzrichtung?
- `System Fit`: fuehlt sich jede Variante wie dieselbe Seite an?

## 6) Empfehlung fuer euren naechsten Schritt
- Start mit `B1 + P01/P02/P06`, weil das die kleinste Reibung und den klarsten Typovergleich bringt.
- Danach `B2 + P03/P04/P08` fuer den dichten, kontrastreichen Bereich.
- Dann erst Fine-Tuning von Akzentintensitaet und Spacing-Dichte.

## 7) Candidate Track (Freeze fuer Iterationen)

> Ziel: Stabile Zwischenstaende sichern, damit spaetere Experimente nachvollziehbar bleiben.

### CANDIDATE-2026-02-14-A (Winner Freeze)
- Basis: `P04` (Exploration Phase 1 Gewinner, Score 4.8)
- Rolle: Referenz-Stand fuer alle kommenden Iterationen.
- Regel: Keine Aenderung ohne neuen Candidate-Eintrag.
- Artefakte:
  - `docs/inspiration/designs/tokens/candidates/candidate-2026-02-14-a.json`
  - `docs/inspiration/designs/tokens/evaluations/phase-1-technews-benchmark.2026-02-14.json`

### Candidate-A Legacy-Hinweis
- Die damaligen Derivate `P04-C01`, `P04-C02`, `P04-C03` bleiben nur als Historie in:
  - `docs/inspiration/designs/tokens/candidates/candidate-2026-02-14-a.json`
- Sie sind **nicht** mehr Teil des aktiven Winner-Flows.

### CANDIDATE-2026-02-14-B (Winner Update)
- Basis: `P04`
- Gewinner-Delta: `P04-MPZ01` (nur `Market Pulse` Metric-Font geaendert)
- Rolle: neuer aktiver Referenz-Stand nach MP-Font-Experiment.
- Artefakte:
  - `docs/inspiration/designs/tokens/candidates/candidate-2026-02-14-b.json`
  - `docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json`

#### P04-MPZ01 - Swiss Signal Orange Clone (MP Zalando)
- Base Pack: `P04`
- Delta: `Market Pulse` Metric-Font -> `Zalando Sans Expanded`
- Light/Dark: unveraenderte P04 Farbwelt
- Wirkung: gleiche Swiss-Signal-Basis, staerkerer typografischer Punch in KPI-Reihen.

#### P04-T01 - Neon Turquoise
- Base Pack: `P04-T01`
- Delta: none (Accent-Welt)
- Akzent: `#00D9D2` (light), `#31FFF5` (dark)
- Wirkung: schwarz/weiss/beige Basis + heller Neon-Tuerkis-Signalton.

#### P04-T01-MPZ01 - Neon Turquoise Clone (MP Zalando)
- Base Pack: `P04-T01`
- Delta: `Market Pulse` Metric-Font -> `Zalando Sans Expanded`
- Light/Dark: unveraendert gegenueber `P04-T01`
- Wirkung: testet, ob Zalando-Impact auch in der Neon-Akzentwelt konsistent funktioniert.
