# Estate - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Urbanes Campaign-Design mit hoher Dichte und aggressivem Editorial-Ton.
- Dark Interfaces, Orange-Signale und visuelle Kompression.
- Swiss-Einsatz: Ordnung in der Verdichtung durch striktes Raster.

## 2) Grid und Layoutlogik
- Mehrlagiges Grid mit ueberlappenden Panelzonen.
- Hero plus Produkt/Story-Kacheln in klarer horizontaler Taktung.
- Utility-Spalten fuer Filter, Kategorien, Meta.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now fuer komprimierte Schlagzeilen.
- Sekundaer: Clash Display fuer charakterstarke Zwischentitel.
- Body: Space Grotesk fuer technische Klarheit bei hoher Dichte.

## 4) Farbe, Kontrast, Tonalitaet
- Dunkelgrau/Schwarz als Basis, Orange als Energietraeger.
- Rot/Signalwerte punktuell fuer CTA/Status.
- Kontrast sauber staffeln, damit kleine Texte lesbar bleiben.

## 5) Elemente und Interaktionsmuster
- Hero-Collage, Story-Rows, Produktkarten, Utility-Footer.
- Badge- und Marker-System fuer Kategorisierung.
- Mikro-Teaser fuer schnelle scanning-faehige Navigation.

## 6) Bildsprache und Masking
- Ueberlagerte Bildausschnitte mit harten Kanten.
- Crop als Narrativ (Details + Totale kombinieren).
- Dunkle Overlays nur dort, wo Typokontrast gebraucht wird.

## 7) Swiss-Style Ueberfuehrung
- Dichte darf nicht zu Informationschaos fuehren: klare Lesereihenfolge sichern.
- Whitespace gezielt als "Atemfenster" einsetzen.
- Jeder Akzent braucht funktionale Bedeutung.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: DenseHero, OverlayStoryCard, UtilityColumn, BadgeCluster.
- Tokens: dark-accent pairs, headline scale steps, micro-label style.
- Naechster Test: gleiche Seite mit 15% weniger Overlay-Objekten vergleichen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/estate`: `DenseHero + OverlayStoryCard + UtilityColumn` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `DenseHero`, `OverlayStoryCard`, `UtilityColumn`, `BadgeCluster` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
