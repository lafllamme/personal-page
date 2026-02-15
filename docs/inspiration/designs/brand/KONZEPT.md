# Brand - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 4 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Kampagnenstarker Fashion-Brand-Auftritt mit hoher visuell/verbaler Lautstaerke.
- Wirkung entsteht aus grossen Wortmarken, harten Flaechen und Bildausschnitten.
- Swiss-Impuls: trotz Energie bleibt Struktur und Lesefluss kontrolliert.

## 2) Grid und Layoutlogik
- 12-Spalten-Grundraster, oft 6/6 oder 8/4 Hero-Splits.
- Uebergrosse Typoflaechen duerfen Spalten bewusst "brechen", aber entlang Baseline.
- Module fuer Kampagnen, Community und Produktstory klar separieren.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now (impact, kompakt, markant).
- Support-Headline: Nohemi oder Cabinet Grotesk.
- Body/Meta: Space Grotesk oder Geist fuer kontrollierte Kleinschrift.

## 4) Farbe, Kontrast, Tonalitaet
- Primarpalette: Rot/Orange/Schwarz + neutraler Gegenspieler.
- Farbflaechen als Signale, nicht als Dekor-Hintergrundmuster.
- Kontraststufen fuer CTA, Sektionen und Blickfuehrung definieren.

## 5) Elemente und Interaktionsmuster
- Massive Hero-Wortmarke, modulare Story-Karten, Community-Callout.
- Logo-Siegel als wiederkehrendes Marker-Element.
- Editorial-Slider + Produktteaser als wiederverwendbare Pattern.

## 6) Bildsprache und Masking
- Close-up Crops mit klaren Rechtecken und harten Kanten.
- Gezielte Layering-Effekte (Typo ueber Bild), aber nur auf Kernmodulen.
- Keine weichen Schatten/Frosted-Looks, eher plakativ-flach.

## 7) Swiss-Style Ueberfuehrung
- Konsequente Ausrichtung auf Rasterlinien statt freies Driften.
- Informationsprioritaet bleibt auch bei grosser Display-Typo eindeutig.
- Akzentfarbe in definierter Rolle (CTA, Marker, Hervorhebung).

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: CampaignHero, BrandManifesto, EditorialCarousel, UtilityTicker.
- Tokens: 2 Akzentfarben, 1 dominante Display-Skala, feste Abstandsleiter.
- Test in naechster Runde: gleiche Layouts mit Druk vs Now gegeneinander pruefen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/brand`: `CampaignHero + BrandManifesto + EditorialCarousel` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `CampaignHero`, `BrandManifesto`, `EditorialCarousel`, `UtilityTicker` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=accent`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_3`
### Bildanalyse
- `img_3` setzt auf Kampagnen-Hero mit uebergrosser Typografie, modulare CTA-Flaechen und markante Bild-Crops.
- Layoutwirkung: klare 2-Ebenen-Hierarchie (Brand Claim -> Action/Story).
- Wichtig fuer System: dominante Displayflaeche bleibt im Raster fix, nur Typo-/Color-Tokens variieren.

### Abgeleitete Basis-Komponenten
- `CampaignHero`
- `BrandClaimBlock`
- `PrimaryCtaRow`
- `PromoMediaTile`

### Demo-Content-Richtung
- TechNews Hero Claim + "Read Brief" / "View Signals" CTA-Paar.
