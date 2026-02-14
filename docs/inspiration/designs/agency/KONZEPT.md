# Agency - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Editorial- und Kulturseite mit ruhiger, kuratierter Wirkung.
- Fokus liegt auf Inhalten, Objektcharakter von Bildern und klarer Lesefuehrung.
- Swiss-Naehe: Ordnung, viel Weissraum, asymmetrische Balance statt Deko.

## 2) Grid und Layoutlogik
- Desktop: 12 Spalten, grosser linker Textanker, rechts modulare Karten.
- Mobile: 4 Spalten, Hero zuerst, dann 1-spaltige Story-Module.
- Rhythmus: grosse Introflaechen + dichte Listenflaechen im Wechsel.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Cabinet Grotesk oder Clash Display (fuer Titel mit Haltung).
- Body: Manrope oder Geist fuer neutrale Lesbarkeit.
- Meta/Labels: Space Grotesk klein, eng gefuehrt fuer redaktionelle Markierung.

## 4) Farbe, Kontrast, Tonalitaet
- Basis hell (Off-White + Grauwerte), Akzente sehr sparsam.
- Kontrast eher durch Groesse/Gewicht als durch viele Farben.
- Bilder duerfen die groesste farbliche Last tragen.

## 5) Elemente und Interaktionsmuster
- Hero-Statement mit kurzer Utility-Navigation.
- Artikelkarten mit Datum, Kategorie, Autor, kurzer Teaser.
- Laufband/Ticker als horizontale Informationsschicht.

## 6) Bildsprache und Masking
- Objektive Fotografie, wenig Filter, klare Rahmen.
- Masken rechteckig, seltene Ueberlagerungen nur zur Hierarchie.
- Skalierung per Crop-Strategie statt Effekt-Layer.

## 7) Swiss-Style Ueberfuehrung
- Typo-Hierarchie als primaeres Navigationsmittel.
- Asymmetrie nur innerhalb eines stabilen Rasters.
- Jedes Modul muss Informationswert haben, keine rein dekorativen Bausteine.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: HeroSplit, EditorialCard, NewsRail, FooterDataBlock.
- Tokens: spacing-8er Raster, 3 Textgroessen fuer Meta/Kopie/Headline.
- Ziel fuer naechste Iteration: gleiche Komponenten mit 2-3 Typo-Sets vergleichen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/agency`: `HeroSplit + EditorialCard + NewsRail` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `HeroSplit`, `EditorialCard`, `NewsRail`, `FooterDataBlock` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
