# Music - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 3 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Magazin-/Event-Plattform mit informationsreicher, modularer Startseite.
- Editorial plus Directory-Charakter (Events, Stories, Galerien).
- Swiss-Ansatz: klare Datenstruktur trotz Contentvielfalt.

## 2) Grid und Layoutlogik
- Breites Desktopraster mit Kartenlisten und Featured Areas.
- Listenmodule mit fester Zeilenhoehe fuer Events.
- Bildgitter als Sekundaerebene fuer redaktionelle Stories.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Nohemi oder Cabinet Grotesk.
- Body: Manrope/Geist fuer laengere Beschreibungen.
- Meta: Space Grotesk fuer Datum, Ort, Kategorien.

## 4) Farbe, Kontrast, Tonalitaet
- Milde, leicht warme Neutrale als Flaechenbasis.
- Orange/Olive als Akzente fuer aktive Elemente.
- Kontrast ueber Textebenen und Card-Trennung erzeugen.

## 5) Elemente und Interaktionsmuster
- Event List Row, Search Field, Featured Story, Gallery Mosaic.
- Category Tags und Pagination als wichtige Utility-Pattern.
- Hero-Carousel fuer Topstorys.

## 6) Bildsprache und Masking
- Klassische Bildkarten mit einheitlichem Seitenverhaeltnis.
- Einzelne Overlaps fuer Editorial-Spannung zulaessig.
- Ruhige Bildkanten fuer gute Scannability priorisieren.

## 7) Swiss-Style Ueberfuehrung
- Informationsarchitektur vor visueller Dramatik.
- Datenlabels (Datum/Ort) klar standardisieren.
- Komponenten konsistent zwischen Event- und Story-Bereich halten.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: EventTableCard, FeaturedCarousel, StoryGallery, FilterTagBar.
- Tokens: event list typography, card spacing, utility color semantics.
- Naechster Test: Event-List Kompaktheit auf Mobile optimieren.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/music`: `EventTableCard + FeaturedCarousel + StoryGallery` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `EventTableCard`, `FeaturedCarousel`, `StoryGallery`, `FilterTagBar` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=mixed`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
