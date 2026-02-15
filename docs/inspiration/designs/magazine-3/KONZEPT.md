# Magazine-3 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Musik-/Event-Editorial mit rauer Club- und Poster-Energie.
- Hohe Dynamik durch Collage, Schraeglagen und starke Typo.
- Swiss-Rahmen: Dynamik bleibt in einem klaren Raster kontrolliert.

## 2) Grid und Layoutlogik
- Grundraster bleibt gerade, visuelle Dynamik entsteht in Modulen.
- Hero mit grosser Display-Typo, darunter strukturierte Contentkarten.
- Sektionen mit klaren Trennflaechen fuer Lesefluss.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Clash Display oder Druk Bold fuer laute Headlines.
- Secondary: Cabinet Grotesk fuer ausgleichende Lesbarkeit.
- Body/Meta: Space Grotesk in kleineren Groessen.

## 4) Farbe, Kontrast, Tonalitaet
- Dunkelgruen/Schwarz als Base, helle Cremeflaechen als Kontrast.
- Wenig Akzentfarben, wenn dann punktuell und laut.
- Bilder duerfen in S/W und Farbe mischen, aber mit klaren Regeln pro Sektion.

## 5) Elemente und Interaktionsmuster
- Hero Banner, Event Card, Ticket CTA, Artist Tiles.
- Typografische Trennzeichen als visuelle Struktur.
- Mikro-Navigation und Utility-Topbar.

## 6) Bildsprache und Masking
- Kreis- und Rechteckmasken gemischt, aber begrenzt auf Signature-Momente.
- Fotoausschnitte bewusst roh, wenig retuschiert.
- Overlay-Typo kontrastsicher platzieren.

## 7) Swiss-Style Ueberfuehrung
- Postercharakter mit klarer Informationshierarchie verbinden.
- Feste Regeln fuer Rotationen/Schraeglagen definieren.
- Primarziele: Lesbarkeit und schnelle Event-Navigation.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: EventHero, ArtistGrid, TicketCTA, StoryQuoteBlock.
- Tokens: dynamic but bounded transform rules, dark+cream palette, display ladder.
- Naechster Test: Schraeglagen reduzieren und Impactverlust messen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/magazine-3`: `EventHero + ArtistGrid + TicketCTA` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `EventHero`, `ArtistGrid`, `TicketCTA`, `StoryQuoteBlock` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=mixed`, `typeMix=serifSans`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenzen: `img_1`, `img_3`
### Bildanalyse
- `img_1` liefert klares Post-Kartenmuster mit Meta-Labels.
- `img_3` zeigt Carousel/Slider-Logik fuer Featured Content.
- Wichtig fuer System: statische Card-Basis + optionale horizontale Bewegung.

### Abgeleitete Basis-Komponenten
- `EditorialPostCard`
- `FeaturedCarousel`
- `CarouselNavControls`
