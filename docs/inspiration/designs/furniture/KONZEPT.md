# Furniture - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 3 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Vertrauensorientierter Corporate-Auftritt mit editorialem Storyblock.
- Menschliche Bildmotive + sachliche Textstruktur fuer Sicherheit und Naehe.
- Swiss-Komponente: inhaltliche Klarheit und ruhige Hierarchie.

## 2) Grid und Layoutlogik
- Zwei Hauptspalten mit grossen Bildflaechen und strukturierten Textkolumnen.
- Content-Abschnitte als logische Kapitel statt freier Mosaic.
- Konsistente vertikale Baselines fuer bessere Lesbarkeit.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Manrope oder Geist.
- Body: Manrope Regular mit luftiger Zeilenhoehe.
- Meta: Space Grotesk fuer Label, Namen, Zusatzdaten.

## 4) Farbe, Kontrast, Tonalitaet
- Heller Hintergrund, weiche Blau-/Grautoene als Vertrauensfarbe.
- Dunkle Typo fuer Kontrast, Akzente nur punktuell.
- Keine starke Sattheit, eher serioese Zurueckhaltung.

## 5) Elemente und Interaktionsmuster
- Statement-Bild, Programm-/Service-Teaser, Spaltenartikel.
- Kleine CTA-Pills oder Textlinks mit klarer Priorisierung.
- Informationsbloecke mit klaren Zwischenueberschriften.

## 6) Bildsprache und Masking
- Grossflaechige, realistische Fotos mit wenig Effektbearbeitung.
- Rechteckige Cardmasken, keine extravaganten Formen.
- Text ueber Bild nur mit klar abgesicherten Kontrastzonen.

## 7) Swiss-Style Ueberfuehrung
- Objektive Kommunikation und saubere Rasterausrichtung.
- Typografische Hierarchie vor dekorativer Gestaltung.
- Weissraum als zentrales Mittel fuer Ruhe und Vertrauen.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: TrustHero, ProgramCard, ColumnTextBlock, SoftCTA.
- Tokens: neutral-light palette, readable body sizes, conservative spacing.
- Naechster Test: kompaktere vs grosszuegige Textbreite fuer Lesedauer vergleichen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/furniture`: `TrustHero + ProgramCard + ColumnTextBlock` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `TrustHero`, `ProgramCard`, `ColumnTextBlock`, `SoftCTA` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
