# Cloth - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 8 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Dark Fashion/Streetwear mit futuristischem Charakter und technoidem Ton.
- Starker Mix aus Commerce, Editorial und Szene-Credibility.
- Swiss-Transfer: klare Informationsordnung trotz hoher visueller Dichte.

## 2) Grid und Layoutlogik
- 12-Spalten mit vielen vertikalen Trennern fuer Magazincharakter.
- Sektionen als "Panels" denken: Hero, Artikel, Produktgruppen, Footer.
- Micro-Module in 2-3 Spalten fuer Meta und Utility.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Now oder Druk Bold fuer extrem hohe Schlagzeilenpraesenz.
- Secondary: Clash Display oder Cabinet Grotesk fuer Kontrast-Lagen.
- Body/Meta: Space Grotesk fuer technische Lesbarkeit im Dunkelmodus.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz/Navy als Basis, Lime/Acid als funktionaler Akzent.
- Helle Textflaechen fuer Zugriff, keine grauen Mittelkontraste uebertreiben.
- Akzente nur fuer Hinweise, aktive Tabs, kleine Marker.

## 5) Elemente und Interaktionsmuster
- Oversized Hero, horizontale Kategorie-Navigation, Feature-Cards.
- Editorial-Quote-Module und Produkt-Cluster kombiniert.
- Footer als starke Markenwiederholung.

## 6) Bildsprache und Masking
- Bilder als harte Rechtecke, teils absichtliche Abschneidungen.
- Leichte Korn/Noise-Textur moeglich, aber subtil und konsistent.
- Typo-Layer ueber Bild nur in 1-2 definierten Pattern.

## 7) Swiss-Style Ueberfuehrung
- Raster sichtbar machen (Linien/Spacing), auch im dunklen Theme.
- Lesepfade von links oben nach rechts unten strikt planen.
- Display-Exzesse durch ruhige Textmodule ausbalancieren.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: DarkHero, FeatureGrid, ProductRail, QuoteCard, BrandFooter.
- Tokens: dark-surface Staffelung, lime-accent roles, typographic scale map.
- Naechster Test: Content-Dichte A/B (kompakt vs luftiger) auf gleicher Struktur.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/cloth`: `DarkHero + FeatureGrid + ProductRail` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `DarkHero`, `FeatureGrid`, `ProductRail`, `QuoteCard` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenzen: `img_2`, `img_3`, `img_4`, `img_5`, `img_7`
### Bildanalyse
- `img_2`: Hero-Masterpattern mit Double Headline, Badges, Koordinaten-/Metazeile, rechts oben Utility-Typo.
- `img_3`-`img_5`: modulare Story-/Product-Zonen, dichte Navigationsrail, Marker/Badge-System.
- `img_7`: starker Footer/Outro mit Brand-Typo als Abschlussanker.
- Wichtig fuer System: dieses Set liefert ein nahezu komplettes Seitenmodell von Hero bis Footer.

### Abgeleitete Basis-Komponenten
- `HeroDoubleHeadline` (Display + Secondary Display)
- `BadgeMarkerRow`
- `CoordinateMetaRow`
- `DenseNavRail`
- `FeatureGrid`
- `BrandOutroFooter`

### Demo-Content-Richtung
- TechNews: "Market Pulse" als Double-Headline-Section, Badge-Marker fuer Prioritaet/Status.
