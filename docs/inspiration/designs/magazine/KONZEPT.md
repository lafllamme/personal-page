# Magazine - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Cyberpunk/Techwear-Editorial mit starkem Dark-Mode-Manifest.
- Groesse, Kontrast und reduzierte Farbigkeit bestimmen die Wirkung.
- Swiss-Transfer: harte Ordnung im High-Contrast-Kontext.

## 2) Grid und Layoutlogik
- Herozentrierte Rasterflaeche mit klaren Spalten fuer Text und Produktbilder.
- Sektionen stark typografisch getrennt (Who we are, Collections, Products).
- Mobile als lange vertikale Story mit fixen Kapitelmodulen.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Now/Druk Bold fuer dominante Schlagzeilen.
- Secondary: Cabinet Grotesk fuer Untertitel und Kapitel.
- Body/Meta: Space Grotesk fuer technisch praezise Kleintexte.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz/Weiss mit minimalen Graustufen.
- Bildmaterial liefert Kontrast und Stimmung.
- Akzentfarbe sparsam fuer CTA oder aktive Navigation.

## 5) Elemente und Interaktionsmuster
- Hero Product Shot, Collection List, Story Text Blocks, Product Grid.
- Utility-Navigation klein und hochpositioniert.
- Produktkategorien als lineare Typosektion.

## 6) Bildsprache und Masking
- Klar rechteckige Bildfenster, starke Crops.
- Objektfotos isoliert auf dunklen Flaechen fuer Fokus.
- Keine weichen Schattenstacks; eher hart und posterhaft.

## 7) Swiss-Style Ueberfuehrung
- Objektive Informationsstruktur trotz futuristischer Inszenierung.
- Typo-Hierarchie muss auch bei XXL-Headlines sauber bleiben.
- Whitespace gezielt einsetzen, um Dichte zu kontrollieren.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: TechHero, CollectionRail, ProductShowcase, ManifestoBlock.
- Tokens: monochrome scale, high-impact display sizes, narrow utility text.
- Naechster Test: Druk vs Now fuer Lesbarkeit auf kleineren Screens.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/magazine`: `TechHero + CollectionRail + ProductShowcase` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `TechHero`, `CollectionRail`, `ProductShowcase`, `ManifestoBlock` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
