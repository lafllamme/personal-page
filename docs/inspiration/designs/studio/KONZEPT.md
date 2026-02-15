# Studio - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Interior-/Architecture-Studio mit luftiger Premium-Sachlichkeit.
- Groesse Headlines auf heller Flaeche kombinieren sich mit warmen Bildtoenen.
- Swiss-Prinzip: hohe Ordnung, objektive Projektkommunikation.

## 2) Grid und Layoutlogik
- Breites Raster mit grossen Freiflaechen und ruhigen Modulinseln.
- Hero-Claims ueber mehrere Spalten, Projektteaser in geordneten Slots.
- Baselines fuer kleine Datentexte und grosse Headline strikt trennen.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Cabinet Grotesk oder Manrope Bold fuer grosse Sachheadline.
- Optional serifiger Kontrast ueber Libre Baskerville fuer Akzentbegriffe.
- Meta: Space Grotesk klein fuer Standort, Jahr, Groesse.

## 4) Farbe, Kontrast, Tonalitaet
- Heller neutraler Hintergrund mit warmen Holz-/Beigetoenen aus Bildern.
- Dunkle Typo als ruhiger Kontrastanker.
- Minimaler Akzent nur fuer Interaktion oder Marker.

## 5) Elemente und Interaktionsmuster
- Studio Hero, Project Highlights, Metrics Mini-Blocks, About Section.
- Stern/Marker als sehr reduziertes Signature-Detail.
- Viel Weissraum rund um Kernbotschaften.

## 6) Bildsprache und Masking
- Rechteckige Bilder mit klaren, hochwertigen Crops.
- Keine schweren Effekte; Materialitaet kommt aus dem Motiv selbst.
- Ueberlagerungen dezent und klar begrenzt.

## 7) Swiss-Style Ueberfuehrung
- Objektivitaet und Lesbarkeit ueber dekorative Experimente stellen.
- Konsistente Kanten, Zeilenabstaende und Modulbreiten sichern.
- Asymmetrie ueber Rasterpositionierung, nicht ueber zufaellige Layer.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: StudioHero, ProjectSlotGrid, MetricBadge, QuietAboutBlock.
- Tokens: warm-neutral palette, premium whitespace scale, subtle marker style.
- Naechster Test: Serif-Akzent ja/nein fuer wahrgenommene Premiumwirkung.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/studio`: `StudioHero + ProjectSlotGrid + MetricBadge` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `StudioHero`, `ProjectSlotGrid`, `MetricBadge`, `QuietAboutBlock` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: Studio Whole Concept
### Bildanalyse
- Studio-Referenz arbeitet mit grossen Headline-Feldern, ruhigen Projektinseln und warmer Materialbildsprache.
- Wichtig fuer System: klare Kapitelblöcke mit viel Luft und präzisen Meta-Labels.

### Abgeleitete Basis-Komponenten
- `StudioIntroHero`
- `ProjectSlotGrid`
- `MetricMetaBadge`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `whole concept` | Spacious studio narrative with project islands | `DsStudioIntroHero`, `DsProjectSlotGrid`, `DsMetricMetaBadge` | Pattern | P1 |
