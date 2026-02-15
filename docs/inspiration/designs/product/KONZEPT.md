# Product - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Monochromes Produkt-Storytelling fuer Tech/Gadget-Marke.
- Kombiniert markige Claims mit detaillierten Produktshots.
- Swiss-Eignung: starkes Raster, klare Produktinformation, keine Effektsucht.

## 2) Grid und Layoutlogik
- Hero mit grosser Produktabbildung + typografischem Claimblock.
- Produktdetails in geordneten Modulen darunter.
- Nutzung von Leerraum, um Hardware als Objekt zu isolieren.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now fuer Produktclaims.
- Body: Manrope/Geist fuer Features und Beschreibung.
- Meta: Space Grotesk fuer Specs/ID/Utility.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz/Weiss/Grau als primaere Welt.
- Optional ein einziger Akzent fuer aktive States.
- Kontrast sauber fuer Specs auf dunklem Grund halten.

## 5) Elemente und Interaktionsmuster
- Product Hero, Feature Claims, Detail Specs, CTA Slots.
- Grosses Naming als wiederkehrender Markenanker.
- Visual Focus auf Objekt und Material.

## 6) Bildsprache und Masking
- Produktfotos freigestellt oder auf cleanen Hintergruenden.
- Klar rechteckige Bildfenster mit praezisem Crop.
- Kein dekoratives Blurring, eher technische Schaerfe.

## 7) Swiss-Style Ueberfuehrung
- Informationsklarheit ueber visuelle Dramatik stellen.
- Typografische Ordnung zwischen Marketing und Spezifikation ausbalancieren.
- Objektivitaet in Bildsprache und Terminologie beibehalten.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: ProductHero, SpecGrid, FeatureStatement, TechnicalFooter.
- Tokens: monochrome semantic set, product image slots, spec typography.
- Naechster Test: hero claim scale vs sichtbare Produktflaeche.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/product`: `ProductHero + SpecGrid + FeatureStatement` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `ProductHero`, `SpecGrid`, `FeatureStatement`, `TechnicalFooter` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_1`
### Bildanalyse
- `img_1` verbindet Produkt-Hero, grosse Claims und technische Objektpraesentation.
- Wichtig fuer System: Product-first Aufbau mit geordneten Spezifikationsblöcken.

### Abgeleitete Basis-Komponenten
- `ProductHero`
- `SpecGrid`
- `FeatureStatement`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `img_1` | Product hero with big claim and object spotlight | `DsProductHero`, `DsFeatureStatement`, `DsSpecGrid` | Pattern | P1 |
