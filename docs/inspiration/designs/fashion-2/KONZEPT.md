# Fashion-2 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Reduzierter Interior/Fashion-Hybrid mit sehr grosser Typodominanz.
- Massive Wortmarken und viele ruhige Flaechen schaffen Statement-Charakter.
- Swiss-Naehe: harte Ordnung, grosse Klarheit, wenig visuelle Effekte.

## 2) Grid und Layoutlogik
- Strenges Raster mit grossen Weissflaechen und modularen Bildslots.
- Hero-Wortmarke ueber mehrere Spalten als Anker.
- Kleinteilige Produkt-/Raumdetails in kontrastierenden Minikarten.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now fuer ultragrosse Headlines.
- Secondary: Manrope/Geist fuer Funktions- und Claimtexte.
- Meta: Space Grotesk fuer Nummern, Labels, minimale Navigation.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz/Weiss als Kern; warmes Holz/Beige aus Bildern als Nebenfarbe.
- Farben nicht aktiv gestalten, sondern durch Fotomaterial zulassen.
- Hoher textlicher Kontrast ist Pflicht.

## 5) Elemente und Interaktionsmuster
- Typo-Hero, modulare Fotozeilen, kurze Claim-Bloecke.
- Punktuelle Icon-Marker statt umfangreicher Iconsets.
- Kontakt-/About-Module im Mikroformat.

## 6) Bildsprache und Masking
- Rechteckmasken und harte Schnitte, keine weichen Effekte.
- Teilweise extremes Cropping fuer Spannung.
- Ueberlagerungen sparsam und auf Hero beschraenkt.

## 7) Swiss-Style Ueberfuehrung
- Maximale Reduktion bei maximaler Informationsklarheit.
- Asymmetrie uebers Raster steuern, nicht ueber zufaellige Layer.
- Typografische Konstanz zwischen Sektionen sichern.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: TypoHeroXL, MicroImageRail, MinimalClaimBlock, TinyUtilityNav.
- Tokens: extreme display scale, oversized leading rules, strict margins.
- Naechster Test: gleiche Komposition mit 2 Display-Fonts auf Wirkung pruefen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/fashion-2`: `TypoHeroXL + MicroImageRail + MinimalClaimBlock` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `TypoHeroXL`, `MicroImageRail`, `MinimalClaimBlock`, `TinyUtilityNav` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=light`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
