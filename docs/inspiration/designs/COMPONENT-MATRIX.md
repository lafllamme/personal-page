# Component Matrix v2 - Foundation Only

> Status: Active Build Matrix (2026-02-15)
> Ziel: Nur Basis-Komponenten definieren, damit wir danach gezielt Screens und Storybook-artige Demos bauen.
> Scope: Pure Black / Pure White + Accent-Familie (Radix Teal), Swiss-Style Struktur, TechNews Demo-Content.

## 1) Arbeitsprinzip
- Layoutstruktur bleibt stabil (`Section -> Container -> Grid/Stack`).
- Komponenten werden zuerst neutral/foundation gebaut, danach erst in komplexe Kompositionen ueberfuehrt.
- Jede Foundation-Komponente bekommt feste States und klare Token-Abhaengigkeiten.

## 2) Quellenbasis (dieser Sprint)
- `agency/img_4`
- `brand/img_3`
- `cloth/img_2`, `cloth/img_3`, `cloth/img_4`, `cloth/img_5`, `cloth/img_7`
- `construct/img_1`, `construct/img_3`
- `construct-2/img_1`, `construct-2/img_2`
- `estate/img_2`
- `fashion/img`
- `furniture/img_1`
- `magazine-2/img`
- `magazine-3/img_1`, `magazine-3/img_3`
- `music` (Landing)
- `photography/img_4`
- `portfolio/img_1`
- `product/img_1`
- `run/img_1`
- `skate` (whole concept)
- `sport/img_1`
- `studio` (whole concept)
- `tech/img_1`

## 3) Foundation-Komponenten (P0 zuerst)

| Prio | Komponente | Zweck | Pflicht-States | Primäre Referenzen | Demo-Content (TechNews) |
|---|---|---|---|---|---|
| P0 | `DsSection` | Vollbreiten-Sektionsblock mit vertikalem Rhythmus | n/a | `cloth/img_2`, `studio`, `tech/img_1` | Kapitel: Hero, Pulse, Features, Footer |
| P0 | `DsPageContainer` | Content-Breite + responsive Gutter | n/a | `agency/img_4`, `construct/img_1` | 12/8/4 Spalten mit festen Rändern |
| P0 | `DsGrid` | Rastersteuerung fuer asymmetrische/gleichmaessige Layouts | n/a | `construct-2/img_1`, `estate/img_2` | Storygrid, Market-Pulse-Rail |
| P0 | `DsHeadingBlock` | Kicker + Title + Dek + Meta | n/a | `cloth/img_2`, `brand/img_3`, `run/img_1` | "TechNews Weekly", Datum, Autor |
| P0 | `DsButton` | Primary/Secondary/Tertiary/Quartery CTA | `default,hover,active,focus-visible,disabled` | `brand/img_3`, `music`, `sport/img_1` | "Read Brief", "View Signals" |
| P0 | `DsTextLink` | Inline Aktion im Fliesstext | `default,hover,focus-visible,visited,disabled` | `magazine-2/img`, `portfolio/img_1` | "Read full report" |
| P0 | `DsInput` | Eingabe-Feldsystem | `default,hover,focus-visible,error,disabled` | `magazine-2/img`, `agency/img_4` | Search, Newsletter, Filter |
| P0 | `DsTag` | Kategorisierung/Filterchips | `default,hover,active,focus-visible,disabled` | `cloth/img_3`, `magazine-3/img_1` | AI, Infra, Policy, Security |
| P0 | `DsCard` | Universelle Kartenflaeche fuer Story/Media/Meta | `default,hover,focus-within,disabled` | `agency/img_4`, `estate/img_2`, `photography/img_4` | Storykarten mit Bild+Teaser |
| P0 | `DsDivider` | Kapitel- und Modultrenner | n/a | `portfolio/img_1`, `construct/img_3` | horizontale Rules im Feed |

## 4) Foundation-Komponenten (P1 direkt danach)

| Prio | Komponente | Zweck | Pflicht-States | Primäre Referenzen | Demo-Content (TechNews) |
|---|---|---|---|---|---|
| P1 | `DsAuthorRow` | Autor, Rolle, Datum, Lesedauer | n/a | `cloth/img_2`, `magazine-3/img_1` | "Mara Stein / 8 min / Feb 2026" |
| P1 | `DsMarketPulseItem` | Kennzahl + Label + Note | n/a | `run/img_1`, `construct-2/img_2`, `tech/img_1` | "Critical incidents: 03" |
| P1 | `DsAccordion` | Expandierbare Info-Cluster | `default,hover,focus-visible,open,disabled` | `skate`, `music` | "Signal Notes", "Policy Update" |
| P1 | `DsMediaFrame` | Bild-/Video-Frame mit Ratio-Handling | n/a | `estate/img_2`, `product/img_1`, `photography/img_4` | Hero image, article cover |
| P1 | `DsCarouselControls` | Navigation fuer Slider/Featured-Rails | `default,hover,active,focus-visible,disabled` | `magazine-3/img_3`, `music` | Featured stories carousel |
| P1 | `DsFooterBlock` | strukturierter Abschluss (links + legal + social) | n/a | `cloth/img_7`, `sport/img_1`, `portfolio/img_1` | About, Legal, Contact |

## 5) Noch nicht bauen (Out of Scope in Foundation)
- Komplexe Hero-Collagen mit freiem Layering.
- Individuelle Kampagnenanimationen pro Seite.
- Vollstaendige page-spezifische Kompositionen (`CampaignHero`, `InnovationHero`) als eigene Endkomponenten.

## 6) Token-Abhaengigkeiten (verbindlich)
- Farbe: Pure Black / Pure White + Radix Teal Stufen aus `DsColorScheme`.
- Typografie-Basis: P04-MPZ01 Mapping (Display/Headline/Body/Meta/Quote + Signal-Rolle).
- Spacing: section/block/inline als feste Leiter.
- Border-Regel: bei UnoCSS immer `border-solid`, sobald `border*` verwendet wird.

## 7) Nächster Schritt (nach dieser Matrix)
1. `P0` Komponenten in Design-System-Page als State-Matrix darstellen.
2. Jede P0-Komponente mit TechNews Dummy Content fuellen.
3. Danach `P1` Komponenten ergänzen und erste Landing-Komposition aufbauen.
