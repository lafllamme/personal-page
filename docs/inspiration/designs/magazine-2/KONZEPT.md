# Magazine-2 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Fashion-News und Features in klassischem Editorial-Raster.
- Mischung aus ruhigem Grundlayout und starkem Bildfokus.
- Swiss-Nutzung: reduzierte Mittel, klare Informationsreihenfolge.

## 2) Grid und Layoutlogik
- Kachelbasierte Magazinstruktur mit Hero- und Nebenmodulen.
- Spalten fuer Liste + Bildcluster, klare Gutter.
- Wiederkehrende Cardhoehen fuer konsistenten Scanfluss.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Nohemi oder Cabinet Grotesk.
- Body: Manrope/Geist fuer lange Teasertexte.
- Meta: Space Grotesk fuer Datum/Kategorie/Autor.

## 4) Farbe, Kontrast, Tonalitaet
- Olive/Schwarz/Off-White als Kernwelt.
- Orange als fokussierter Aktionsakzent.
- Satte Bildfarben nur in Contentkacheln, nicht im UI-Chrome.

## 5) Elemente und Interaktionsmuster
- Feature Card, Multi-Story Grid, Author Meta, View-All Links.
- Kleinere Story-Karten als supportive Informationsebene.
- Horizontale Trenner fuer redaktionelle Abschnitte.

## 6) Bildsprache und Masking
- Rechteckige Bildfenster mit enger Crop-Fuehrung.
- Ueberlagerung erlaubt, aber auf definierte Hero-Module begrenzen.
- Textbloecke stets auf ruhigen Flaechen verankern.

## 7) Swiss-Style Ueberfuehrung
- Starke Spaltenlogik und klare typografische Prioritaeten.
- Wenige, kontrollierte Akzentfarben fuer Orientierung.
- Keine unnoetigen Ornament-Layer.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: FeatureHero, StoryMosaic, AuthorMetaRow, EditorialDivider.
- Tokens: olive accent map, card ratio set, editorial spacing rhythms.
- Naechster Test: 2 Meta-Dichten fuer schnellere mobile Erfassbarkeit.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/magazine-2`: `FeatureHero + StoryMosaic + AuthorMetaRow` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `FeatureHero`, `StoryMosaic`, `AuthorMetaRow`, `EditorialDivider` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=mixed`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img` (Whole Layout)
### Bildanalyse
- Komplettes Magazinlayout mit Event-/Postlisten, Sidebar-Elementen und klaren Kategoriemarkern.
- Wichtig fuer System: Listen-Hierarchie + wiederholbare Content Cards in hoher Dichte.

### Abgeleitete Basis-Komponenten
- `EventList`
- `PostCard`
- `CategoryPill`
- `SidebarModule`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `img` | Complete magazine layout with list-first scan flow | `DsEventList`, `DsPostCard`, `DsCategoryPill` | Pattern | P1 |
| `img` | Dense editorial information lanes | `DsSectionHeader`, `DsDivider`, `DsTag` | Foundation | P0 |
