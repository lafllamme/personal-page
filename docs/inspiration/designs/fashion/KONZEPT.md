# Fashion - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Architektur- und Fashionanmutung im Premium-Magazin-Look.
- Dunkle Basis mit cyanfarbenen Bildakzenten und starker Typoflaeche.
- Swiss-Lesart: plakativ, aber sachlich strukturiert.

## 2) Grid und Layoutlogik
- Posterartige Hero-Module auf 12-Spalten-Raster.
- Sekundaere Contentflaechen als geordnete Kachelgruppen.
- Klare linke Kante fuer Headlines und Navigationspunkte.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Cabinet Grotesk fuer grossen Impact.
- Headline/Section: Manrope SemiBold fuer saubere Lesbarkeit.
- Meta: Space Grotesk fuer technische Beschriftung.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz als Hauptflaeche, Cyan/Tuerkis als Bild- und Akzentwelt.
- Neon-Lime nur als Mikrosignal.
- Kontrastmatrix fuer Text auf Bild zwingend definieren.

## 5) Elemente und Interaktionsmuster
- Large Hero Card, Areas of Expertise List, Team Strip, Image Tiles.
- Kombination aus Editorial- und Corporate-Elementen.
- Kontakt-Badge als wiederkehrendes Interaktionssignal.

## 6) Bildsprache und Masking
- Abgerundete Masken vereinzelt als Signature-Detail.
- Ansonsten harte Crops fuer Klarheit.
- Diagonal/Rotation nur auf Hero-Ebene, nicht global.

## 7) Swiss-Style Ueberfuehrung
- Typo klar priorisieren: erst Aussage, dann Bilddetails.
- Rasterlinien fuer alle Rotationen/Masken als Referenz behalten.
- Farbakzente funktional begrenzen.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: PosterHero, ExpertiseList, TeamGallery, ContactBadge.
- Tokens: dark surface scale + cyan accent set, corner radius tiers.
- Naechster Test: runde Masken vs reine Rechtecke auf Lesegeschwindigkeit vergleichen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/fashion`: `PosterHero + ExpertiseList + TeamGallery` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `PosterHero`, `ExpertiseList`, `TeamGallery`, `ContactBadge` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img`
### Bildanalyse
- Das Hauptbild zeigt posterartige Komposition mit klarer linker Headline-Kante und modularen Medienfeldern.
- Wichtig fuer System: starke Hero-Flanke + nachgelagerte Expertise-/Team-Module.

### Abgeleitete Basis-Komponenten
- `PosterHero`
- `ExpertiseList`
- `MediaTileRow`
- `ContactMarker`
