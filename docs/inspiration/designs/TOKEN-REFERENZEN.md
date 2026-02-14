# Token Referenzen und Herkunft

> Ziel: Rueckverfolgbarkeit. Jede Token-Entscheidung wird auf konkrete Inspirationsordner und Designideen gemappt.

## 1) Pack -> Herkunft (Ordner + Idee)

## P01 - Swiss Neutral Light
- Herkunftsordner: `agency`, `company`, `studio`, `portfolio-2`.
- Idee: helle, reduzierte Editorial-/Corporate-Flaechen mit hohem Weissraum und klarer Sans-Hierarchie.
- Uebernommen: ruhige Kontraste, grosse Freiflaechen, neutrale Typofuehrung.

## P02 - Swiss Editorial Serif
- Herkunftsordner: `photography`, `magazine-2`, `health`, `skate`.
- Idee: magazinartige Kompositionen mit kulturellem Ton und serifigem Akzent.
- Uebernommen: elegante Quote-/Headline-Anmutung, warme Off-White Flaechen, kontrollierte Dichte.

## P03 - Swiss Dark Impact
- Herkunftsordner: `magazine`, `product`, `portfolio`, `photography-2`.
- Idee: dunkle, kontraststarke Markenflaechen mit klarer, direkter Typo.
- Uebernommen: monochrome Grundwelt, starker Display-Impact, enge vertikale Rhythmen.

## P04 - Swiss Signal Orange
- Herkunftsordner: `brand`, `run`, `sport`, `estate`.
- Idee: campaign-getriebene Seiten mit starker Signalfarbe und urbaner Energie.
- Uebernommen: Orange als funktionaler Akzent, plakative Headline-Zonen, dense Story-Rails.

## P05 - Swiss Tech Luxe
- Herkunftsordner: `tech`, `construct-2`, `construct`.
- Idee: praezise Architektur-/Tech-Aesthetik mit Premium-Tonalitaet.
- Uebernommen: kuehl-dunkle Surface-Farbe, klare Daten-/Meta-Ebenen, ruhige Proportionen.

## P06 - Swiss Fashion Olive
- Herkunftsordner: `fashion`, `fashion-2`, `magazine-3`, `music`.
- Idee: editoriale Fashion-Welt mit warmen Naturtoenen und charakterstarker Typo.
- Uebernommen: Olive-Akzent, kompakte Storymodule, inszenierte aber geordnete Bildflaechen.

## P07 - Swiss Corporate Mono
- Herkunftsordner: `furniture`, `construct`, `construct-2`, `company`.
- Idee: sachliche, vertrauensvolle Unternehmensoberflaechen.
- Uebernommen: monochrome/helle Palette, lineare Informationsstruktur, konservative Spacing-Logik.

## P08 - Swiss Kinetic Night
- Herkunftsordner: `cloth`, `music`, `magazine-3`.
- Idee: dunkle, kinetische Kultur-/Entertainment-Looks mit hoher visueller Dichte.
- Uebernommen: Night-Surfaces, Neon-Akzent als Navigationssignal, starke Hero-Kontraste.

## 2) Ordner -> Token-Pack Rueckbezug

| Ordner | Primary Pack | Secondary Pack | Kurzbegruendung |
|---|---|---|---|
| agency | P01 | P02 | ruhiger Editorial-Grid mit neutraler Typo |
| brand | P04 | P03 | signalstarke Campaign-Sprache |
| cloth | P08 | P03 | dark + dense streetwear Richtung |
| company | P07 | P01 | klare Corporate-Lesbarkeit |
| construct | P07 | P05 | architektonisch, datenorientiert |
| construct-2 | P05 | P07 | tech/corporate Hybride |
| estate | P04 | P03 | urbanes Orange-Driven Layout |
| fashion | P06 | P02 | editorial-fashion mit warmem Ton |
| fashion-2 | P06 | P01 | reduzierte Typo + warme Flaechen |
| furniture | P07 | P01 | vertrauensvolle Corporate-Story |
| health | P02 | P06 | magazinartige, weichere Editorial-Wirkung |
| magazine | P03 | P08 | dark impact first |
| magazine-2 | P02 | P06 | serifige Magazinlogik |
| magazine-3 | P06 | P08 | dynamic editorial + dark kinetic |
| music | P08 | P06 | entertainment-dichte und starke Kontraste |
| photography | P02 | P01 | kulturell-editorial mit ruhigem Kontrast |
| photography-2 | P03 | P08 | monochromes Personal-Branding |
| portfolio | P03 | P07 | minimal dark listing |
| portfolio-2 | P01 | P02 | helles, ruhiges Portfolio |
| portfolio-3 | P07 | P03 | corporate-dark Mischform |
| product | P03 | P05 | monochromes Produkt-Storytelling |
| run | P04 | P08 | event-kampagne mit Signalakzent |
| skate | P02 | P01 | leichte, editorial-sportliche Richtung |
| sport | P04 | P08 | street/sports energiegeladen |
| studio | P01 | P05 | ruhige Premium-Architecture |
| tech | P05 | P03 | tech-luxe mit dark Alternative |

## 3) So recherchierst du pro Pack im Nachgang
1. Nimm den Pack (`P0x`) aus der Mapping-Tabelle.
2. Oeffne die genannten Herkunftsordner und deren `KONZEPT.md`.
3. Vergleiche dort Abschnitt `4) Farbe`, `3) Typografie` und `9) Komponenten-Proposals`.
4. Wenn ein Pack nicht mehr passt, passe zuerst Secondary, dann Primary an.

## 4) Systemregel fuer Aenderungen
- Kein Layout-Drift: `COMPONENT-MATRIX.md` bleibt stabil.
- Nur Token-Felder aendern: Fonts, Spacing-Dichte, Color-Roles, Media-Overlay.
- Jede Aenderung braucht Rueckverweis auf mindestens einen Herkunftsordner.

## 5) Phase-2 Fokus (P04 Derivatives)

- Freeze-Referenz: `CANDIDATE-2026-02-14-B` (aktive Referenz) auf Basis von `P04`.
- Artefakte:
  - `docs/inspiration/designs/tokens/candidates/candidate-2026-02-14-b.json`
  - `docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json`
- Ableitungen:
  - `P04-MPZ01` -> `brand`, `run`, `sport`, `estate` (OG Signal Orange + MP Zalando Delta)
  - `P04-Z01` -> `cloth`, `fashion`, `fashion-2`, `music`, `magazine-3` (Zalando Display Base)
  - `P04-T01` -> `brand`, `run`, `cloth`, `tech`, `music` (Neon Turquoise)
  - `P04-T01-MPZ01` -> `brand`, `run`, `cloth`, `tech`, `music` (Neon + MP Zalando Delta)
- Dokumentationspflicht:
  - pro Ableitung Akzentfarbe + Dark/Light-Verhalten notieren,
  - `basePack`, `experimentDelta`, `status` immer mitfuehren,
  - plus mindestens ein Satz zur visuellen Wirkung.
