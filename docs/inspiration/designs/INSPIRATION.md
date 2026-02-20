# Designs - Gesamtkonzept (Exploration -> System)

> Ziel: Aus den Einzelanalysen ein konsistentes, swiss-orientiertes Designsystem ableiten, ohne die stilistischen Unterschiede zu verlieren.
> Status: Explorationsleitfaden, bewusst offen formuliert.

## 1) Gemeinsame Leitidee
- Alle Referenzen werden als Varianten eines gemeinsamen Systems verstanden, nicht als 26 isolierte Einzelwelten.
- Vergleichbarkeit entsteht ueber gleiches Komponenten-Skelett; Stilunterschiede laufen ueber Tokens und Typografie-Mixe.
- Swiss-Style bleibt Basis: Rasterklarheit, typografische Hierarchie, reduzierte Farbsemantik, hohe Lesbarkeit.

## 2) Stilcluster (uebergeordnete Ordnung)
- `Light Editorial`: agency, company, studio, portfolio-2, skate, furniture.
- `Dark Impact`: cloth, estate, magazine, product, run, sport, photography-2.
- `Hybrid Magazine`: fashion, fashion-2, health, magazine-2, magazine-3, music, photography.
- `Architectural Corporate`: construct, construct-2, tech, portfolio-3, brand.

## 3) Globales Komponentenmodell (v1)
- `Hero`: grosse Einstiegsbuehne mit Claim, Subline, optionaler Utility-Navigation.
- `Card`: standardisierte Contentkarte (Bild, Titel, Meta, Teaser, Action).
- `Rail/Grid`: modulare Ausspielung fuer Listen, Storystrips, Projektraster.
- `Meta`: Author Row, Datum, Kategorie, Tag Cluster, Kennzahlen.
- `Narrative`: Longform-Absatz, Quote Block, Manifesto Block.
- `Action`: CTA Strip, Link Group, Utility Buttons.
- `Footer`: Kontaktmatrix, Social Links, rechtliche Infos, Back-to-top.

## 4) Komponenten-Proposals fuer die naechste Iteration
- `HeroSplit` (A/B): Links Text, rechts Bild oder invertiert; Variante ueber `tone` und `density`.
- `EditorialCard` (S/M/L): Ein einheitliches Kartenmodell fuer Story, Projekt, Produkt.
- `MediaMosaic`: Rastermodul fuer 3-9 Bilder mit fixer Spaltendefinition statt freiem Collage-Drift.
- `AuthorMetaRow`: Name, Rolle, Datum, Lesedauer, Kategorie.
- `TagCluster`: semantische Tags mit max. 2 Prioritaetsstufen.
- `QuoteBlock`: typografisch dominanter, aber systematischer Zitatbaustein.
- `LongformBlock`: kontrollierte Textbreite, feste Absatzabstaende, optionale Initiale.
- `CTAStrip`: kurzer, horizontaler Aktionsbereich fuer Newsletter, Ticket, Kontakt, Shop.
- `StatsRail`: Kennzahlen- oder Faktenschiene fuer Corporate/Architecture-Screens.
- `FooterDataBlock`: wiederverwendbare Footerstruktur ueber alle Varianten.

## 5) Variant-Regler (damit Varianten vergleichbar bleiben)
- `density`: airy | balanced | dense.
- `tone`: light | dark | mixed | accent.
- `typeMix`: sansOnly | serifSans.
- `mediaMode`: calm | kinetic.
- `contrastTier`: low | medium | high (Text auf Bild strikt pruefen).

## 6) Typografie-Strategie mit euren Favoriten
- `Display`: Druk Bold, Now, Clash Display.
- `Headline`: Cabinet Grotesk, Nohemi, Manrope.
- `Body`: Geist, Manrope, Space Grotesk Regular.
- `Editorial Accent`: Libre Baskerville, Recoleta.
- Regel: pro Variante maximal 2 Hauptfamilien + 1 Akzentfamilie.

## 7) Swiss-Style Guardrails (systemweit)
- Raster vor Effekt: asymmetrisch ist erlaubt, aber nie rasterlos.
- Farbe als Funktion: Akzentfarben nur fuer Hierarchie, Aktion, Status.
- Lesbarkeit zuerst: Kontrast und Zeilenlaenge haben Vorrang vor Stilgimmicks.
- Komponenten statt Einzelloesungen: Wiederholung schafft Systemcharakter.

## 8) Was als naechstes konkret gebaut werden sollte
- Einheitliche `Component Spec Sheets` fuer Hero, Card, Meta, CTA, Footer erstellen.
- Fuer 3 Stilcluster je eine Referenzseite bauen (gleicher Content, andere Token).
- Vergleichsreview mit festen Kriterien: Lesedauer, Scanbarkeit, Markenwirkung, Konsistenz.
- Danach erst Feinheiten (Motion, Masking, Spezialmodule) systematisch aktivieren.

## 9) Finaler Input-Matrix-Check (aus aktueller Bildliste)

| Ordner | Fokusbilder | Extrahierter Kern fuer Komponenten |
|---|---|---|
| `agency` | `img_4` | Bilddominantes Editorial-Raster mit klaren Spaltenslots |
| `brand` | `img_3` | Kampagnenmodul mit grosser Display-Typo + Content-Image-Panel |
| `cloth` | `img_2`, `img_3`, `img_4`, `img_5`, `img_7` | Hero mit Double-Headline, Badge-Layer, Koordinaten-Meta, starker Footer-Brandblock |
| `construct` | `img_1`, `img_3` | Architekturkomposition mit strengem Modulraster und Projekt-/Text-Blockwechsel |
| `construct-2` | `img_1`, `img_2` | Team- und Projektmodule im stabilen Corporate-Grid |
| `estate` | `img_2` | Dichte Image-Gallery-Komposition mit klaren Utility-Spalten |
| `fashion` | `img` | Poster-Hero + textliche Utility-Cluster in dunkler Surface-Welt |
| `furniture` | `img_1` | Vertrauenslayout mit grossen Bildfenstern und ruhiger Textspalte |
| `magazine-2` | `img` | Vollstaendiges Editorial-Grid fuer Features + Listen |
| `magazine-3` | `img_1`, `img_3` | Post-/Carousel-Denke mit Event-Magazin-Rhythmus |
| `music` | `img` | Landingpage mit Eventliste, Featured-Modulen und Utility-Filtern |
| `photography` | `img_4` | Komplettes Magazinmuster fuer Cover, Story und Cluster |
| `portfolio` | `img_1` | Minimales Projektlisten-Layout mit klaren Divider-Zeilen |
| `product` | `img_1` | Monochromer Produkt-Hero mit Deko-/Objektinszenierung |
| `run` | `img_1` | Event-Concept mit Zahlenfokus, Tickerband und Bewegungsachse |
| `skate` | alle | Fast 1:1 uebertragbar als Academy-/Sport-Editorial-System |
| `sport` | `img_1` | Brandstarkes Hero-Layout mit Stories + Programmliste |
| `studio` | `img` | Luftiges Studio-Layout mit grossen Claimflaechen |
| `tech` | `img_1` | Future-Editorial mit Produktfokus und klarer Story-Achse |

## 10) Entscheidung fuer den naechsten Build-Schritt
- Wir koennen direkt loslegen; kein Blocker vor Komponentenbau.
- Vor dem eigentlichen Bauen werden nur zwei Dinge fixiert:
  1. Winner-Stand: `P04-MPZ01` als Baseline.
  2. Accent-System: `Radix Teal 9/11` gemaess [ACCENT-COLOR-RADIX-TEAL-911.md](../../reference/ACCENT-COLOR-RADIX-TEAL-911.md).
