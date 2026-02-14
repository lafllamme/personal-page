# Tech - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Future-luxury Tech-Editorial mit Produktinnovation als Storyzentrum.
- Dunkles Tannengruen + cremefarbene Flaechen erzeugen Premium-Science-Ton.
- Swiss-Transfer: klare Informationsachsen trotz visueller Eleganz.

## 2) Grid und Layoutlogik
- Grosses Herofeld, flankiert von Produkt- und Storykarten.
- Spaltenraster fuer textliche Fakten und visuelle Detailshots.
- Sektionen klar in Produkt, Technologie, Markenstory teilen.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Libre Baskerville (editorial-tech Kontrast) oder Nohemi fuer modernere Schiene.
- Sans-Headline: Cabinet Grotesk/Manrope fuer strukturierende Ueberschriften.
- Meta: Space Grotesk fuer technische Marker und kleine Datensets.

## 4) Farbe, Kontrast, Tonalitaet
- Dunkles Gruen als Surface, Creme als Leseflaeche, Orange als Mikroakzent.
- Kontrastschichten fuer Text auf dunklem Grund strikt definieren.
- Bilder nur leicht farbkorrigieren, um Premiumrealismus zu halten.

## 5) Elemente und Interaktionsmuster
- Tech Hero, Product Feature Cards, Innovation Narrative Blocks, Micro UI Labels.
- Serif/Sans Wechsel als visuelle Hierarchiemarke.
- Kleine Symbolmarker fuer Kapitelnavigation.

## 6) Bildsprache und Masking
- Grossflaechige Close-ups, klare rechteckige Ausschnitte.
- Gelegentliche runde Details als Signature-Element moeglich.
- Layering nur fuer Fokus, nicht fuer reine Dekoration.

## 7) Swiss-Style Ueberfuehrung
- Klare Typohierarchie ist Pflicht bei eleganter Bildinszenierung.
- Rastersystem fuer alle Karten und Textcontainer verbindlich halten.
- Farbkontrast funktional absichern, damit Premiumlook nicht Lesbarkeit kostet.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: InnovationHero, FeatureCardSet, NarrativeColumn, SpecLabelRow.
- Tokens: dark-green semantic palette, serif/sans pairing rules, contrast tiers.
- Naechster Test: Serif-Anteil auf Headlines variieren (mehr Editorial vs mehr Tech).

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/tech`: `InnovationHero + FeatureCardSet + NarrativeColumn` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `InnovationHero`, `FeatureCardSet`, `NarrativeColumn`, `SpecLabelRow` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=mixed`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
