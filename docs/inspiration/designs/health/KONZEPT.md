# Health - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Fashion-/Editorial-Feed mit mobilem Fokus und magazinartiger Vielfalt.
- Viele kleine Storyeinheiten in klarer Kachelstruktur.
- Swiss-Prinzip: trotz Vielfalt bleibt Orientierung einfach.

## 2) Grid und Layoutlogik
- Desktop als modulare Mauer aus Karten; Mobile als Feed mit klaren Gruppen.
- Einheitliche Kartenbreiten fuer konsistente Scanbarkeit.
- Groessere Hero-Karte je Cluster als Einstiegspunkt.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Nohemi oder Clash Display fuer Magazincharakter.
- Headline/Text: Manrope oder Geist fuer saubere Lesbarkeit.
- Meta: Space Grotesk fuer Datum, Kategorie, Autor.

## 4) Farbe, Kontrast, Tonalitaet
- Warme neutrale Flaechen (Rose/Beige) + dunkle Gruentoene.
- Orange als punktueller CTA-Akzent.
- Kontrast durch Cardschatten/Flaechenstufen statt bunter Vielfalt.

## 5) Elemente und Interaktionsmuster
- Story Cards, Subscribe Module, Mobile Mockup Section, Category Tabs.
- Mix aus Bildfokus und textlastigen Artikelkacheln.
- Navigation in kleinen Utility-Layern.

## 6) Bildsprache und Masking
- Klassische Rechteckbilder mit teils enger Cropping-Logik.
- Overlap zwischen Karten moeglich, aber regelbasiert.
- Keine komplexen Maskenformen noetig fuer das Grundsystem.

## 7) Swiss-Style Ueberfuehrung
- Klare Kategoriemarkierung und rhythmische Typostufen.
- Gleiches Kartenraster fuer unterschiedliche Contenttypen.
- Reduktion auf wenige Farben fuer ruhigeres Gesamtbild.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: StoryGrid, SubscribeCard, MobileShowcase, CategoryChipRow.
- Tokens: card gaps, warm-neutral palette, micro typography rules.
- Naechster Test: Feed-Dichte in 2 Auspraegungen fuer mobile Lesbarkeit.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/health`: `StoryGrid + SubscribeCard + MobileShowcase` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `StoryGrid`, `SubscribeCard`, `MobileShowcase`, `CategoryChipRow` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=light`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
