# Construct - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 6 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Architektur-/Studioauftritt mit editorialem Projektkatalog-Charakter.
- Starke Gegenueberstellung von dunklen und hellen Flaechen.
- Swiss-Idee: visuelle Strenge + praezise Informationshierarchie.

## 2) Grid und Layoutlogik
- Mehrspaltiges Raster mit festen Bildfenstern und Textslots.
- Projektindex, Blog und Services als getrennte Navigationszonen.
- Grosse Heroflaeche, danach modulare Projektmatrix.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Cabinet Grotesk oder Manrope Bold.
- Subheadline: Nohemi oder Geist Medium fuer sachliche Eleganz.
- Meta: Space Grotesk/Geist Mono-Aehnlich fuer Datenwerte.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz, Weiss, kuehles Grau als Hauptbereich.
- Akzentfarbe minimal einsetzen (z. B. Linien oder aktive States).
- Kontrast ueber Flaechenwechsel und Typostufen statt bunter Paletten.

## 5) Elemente und Interaktionsmuster
- Project Mosaic, Blog List, Service Column, Directional Arrows.
- Groesseres Navigationspanel fuer Bereiche/Disziplinen.
- Footer mit reduzierter Kontaktmatrix.

## 6) Bildsprache und Masking
- Architekturfotos als klare Fenster, oft mit viel negativem Raum.
- Harte geometrische Zuschnitte statt organischer Masken.
- Bild- und Textkanten exakt an Raster ausrichten.

## 7) Swiss-Style Ueberfuehrung
- Objektive Bildsprache, klare Daten-/Projektbeschriftung.
- Asymmetrie durch Rasterversatz, nicht durch Zufall.
- Navigation als typografisches System statt dekorative UI.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: ArchitectureHero, ProjectGrid, ServiceList, ArticleIndex.
- Tokens: image ratios (4:5, 16:10), neutral scale, line separators.
- Naechster Test: 2 Dichtegrade fuer Projektkarte (minimal vs info-rich).

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/construct`: `ArchitectureHero + ProjectGrid + ServiceList` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `ArchitectureHero`, `ProjectGrid`, `ServiceList`, `ArticleIndex` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=mixed`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenzen: `img_1`, `img_3`
### Bildanalyse
- `img_1` liefert Projektgrid mit harten Kanten und klaren Meta-Labels.
- `img_3` zeigt strukturierte Content-Aufteilung (Blog/Services) mit hoher Lesbarkeit.
- Wichtig fuer System: Architektur aus wiederholbaren Karten + klaren Section-Koepfen.

### Abgeleitete Basis-Komponenten
- `ProjectGrid`
- `ProjectCard`
- `SectionHeader`
- `ServiceListRail`
