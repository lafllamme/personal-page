# Photography - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Mode-/Kulturmagazin mit starker typografischer Signatur und Storytiefe.
- Editoriale Grossflaechen + modulare Storycluster.
- Swiss-Logik: klare Kapitel, klare Kanten, klare Hierarchien.

## 2) Grid und Layoutlogik
- Heroflaechen plus dichte Folge-Module in sauberen Spalten.
- Desktop eher magazinartig, Mobile als sequenzieller Feed.
- Grosse Zwischenraeume fuer visuelle Atmung.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Nohemi oder Recoleta/Libre Baskerville fuer editoriale Note.
- Headline-Sans: Cabinet Grotesk/Manrope fuer klare Struktur.
- Meta: Space Grotesk klein und systematisch.

## 4) Farbe, Kontrast, Tonalitaet
- Olive, Schwarz, Off-White als charakterstarke aber reduzierte Palette.
- Orange als diskreter Akzent fuer CTA.
- Kontrast immer typografisch absichern.

## 5) Elemente und Interaktionsmuster
- Magazine Covers, Feature Story, Celebrity Updates, Photo Grid.
- Desktop/Mobile-Paritaet als wiederkehrendes Vergleichsmuster.
- Author- und Kategorieinfos fest verankert.

## 6) Bildsprache und Masking
- Bilder meistens rechteckig, teils mit collageartigen Ueberlagerungen.
- Portraits prominent, Crops auf Mimik/Kleidung fokussiert.
- Masking sparsam halten, damit Typo dominant bleibt.

## 7) Swiss-Style Ueberfuehrung
- Editorial-Emotion in ein diszipliniertes Raster einfassen.
- Wenige Farben, harte Ausrichtung, hoher Textkontrast.
- Cross-device Konsistenz als Systemziel festhalten.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: CoverRail, FeatureArticle, CelebrityStrip, PhotoMosaic.
- Tokens: editorial font pairing, image ratio catalog, accent usage rules.
- Naechster Test: Serif/Sans Mischquote fuer Lesbarkeit langer Artikel.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/photography`: `CoverRail + FeatureArticle + CelebrityStrip` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `CoverRail`, `FeatureArticle`, `CelebrityStrip`, `PhotoMosaic` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=mixed`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_4`
### Bildanalyse
- `img_4` zeigt ein sauberes Portfolio-Editorial mit grossen Bildankern und ruhigen Textspalten.
- Wichtig fuer System: Bild und Text sind gleichberechtigte Module mit klaren Abständen.

### Abgeleitete Basis-Komponenten
- `PortfolioHeroFrame`
- `ProjectMetaColumn`
- `ImageStoryGrid`
