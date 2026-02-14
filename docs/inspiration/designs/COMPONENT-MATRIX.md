# Component Matrix v1 (Layout Fixed)

> Zweck: Ein fixes Seiten-Skelett definieren, damit wir Typografie, Spacing und Color fair vergleichen koennen.
> Status: Explorativ, aber als verbindliche Arbeitsbasis fuer die naechste Iteration gedacht.

## 1) Fixed Layout Blueprint

### 1.1 Container und Grid
| Regel | Desktop | Tablet | Mobile |
|---|---|---|---|
| Max Content Width | 1440px | 100% | 100% |
| Seitenpadding | 48px | 32px | 20px |
| Spalten | 12 | 8 | 4 |
| Gutter | 24px | 20px | 16px |
| Baseline Unit | 8px | 8px | 8px |

### 1.2 Vertikaler Seitenrhythmus
| Token | Wert | Einsatz |
|---|---|---|
| `space.section.xl` | 160px | Hero zu Main Transition |
| `space.section.l` | 112px | Hauptsektionen |
| `space.section.m` | 80px | Sektionen in dichteren Views |
| `space.section.s` | 56px | engere Gruppierungen |
| `space.block` | 32px | innerhalb einer Komponente |
| `space.inline` | 16px | innerhalb von Rows |

### 1.3 Page Skeleton (Reihenfolge fix)
1. `Top Utility / Micro Nav`
2. `Hero` (HeroSplit oder HeroStack)
3. `Meta Row` (Author, Tags, Date, Reading Time)
4. `Primary Content Rail/Grid`
5. `Narrative Block` (Longform oder Quote)
6. `CTA Strip`
7. `Footer Data Block`

## 2) Invariant vs Variant (Systemregel)

| Ebene | Fix (Invariant) | Variabel (Variant) |
|---|---|---|
| Informationsarchitektur | Reihenfolge der 7 Slots | keine |
| Komponenten-Anatomie | Pflichtfelder je Komponente | Typostil, spacing-dichte, Farbe |
| Grid | 12/8/4 + Gutter + Seitenpadding | keine |
| Typografie | Rollenmodell (Display, Headline, Body, Meta, Quote) | konkrete Fontfamilien pro Rolle |
| Spacing | Tokenstruktur (`section`, `block`, `inline`) | Wertepack (`airy`, `balanced`, `dense`) |
| Farbe | Rollen (`bg`, `surface`, `text`, `muted`, `accent`) | Hex-Werte je Pack |

## 3) Komponentenmatrix (v1 Proposals)

| Komponente | Rolle im Flow | Pflicht-Anatomie (fix) | Variant Knobs | No-Go |
|---|---|---|---|---|
| `TopUtilityBar` | Orientierung | Logo/Brand, 2-6 Links, optional Search | Typo-Size, Divider-Stil, Color-Tone | keine zweite Hauptnavigation |
| `HeroSplit` | Einstieg | Eyebrow, H1, Supporting Copy, Visual, Primary CTA | Bildratio, Display-Scale, Textbreite | frei schwebende Elemente ohne Rasterbezug |
| `HeroStack` | Alternative Einstieg | Eyebrow, H1, 1-2 Supporting Blocks, Visual optional | vertikaler Abstand, Max-Textbreite | unklare H1/H2-Hierarchie |
| `AuthorMetaRow` | Kontext | Author, Rolle, Datum, Kategorie, Reading Time | Label-Stil, Separator, Tag-Style | fehlende semantische Reihenfolge |
| `TagCluster` | Filtern/Markieren | 3-8 Tags, 1 active state | Pill vs Texttag, Contrast Tier | mehr als 2 visuelle Prioritaeten |
| `EditorialCard` | Content Unit | Image, Kicker, Title, Meta, Teaser, Action | Card density, Crop ratio, Accent usage | inkonsistente Titelzeilenlaengen |
| `MediaMosaic` | Dichte Bildausspielung | 3-9 Items im festen Grid | Bildratio-Sets, gap scale | freie Collage ohne Grid |
| `LongformBlock` | Tiefe / Argumentation | H2, 2-5 Paragraphen, optional Pull-Quote | max line width, paragraph spacing | zu breite Textzeilen |
| `QuoteBlock` | Kontrast im Lesefluss | Quote Text, Source, optional Marker | Quote font role, marker color | dekorative Zitate ohne Inhalt |
| `StatsRail` | Fakten/Trust | 3-6 Kennzahlen, Label, unit | Zahl-Groesse, divider style | uneinheitliche Zahlformate |
| `CTAStrip` | Aktivierung | kurzer Claim, 1 primary action, optional secondary | accent intensity, border style, icon use | mehr als 2 CTA-Ebenen |
| `FooterDataBlock` | Abschluss | Kontakt, Social, Legal, optional BackToTop | link density, column count | fehlende Lesbarkeit im Low-Contrast |

## 4) Assembly Proposals (schnell testbar)

| Blueprint | Ziel | Zusammensetzung |
|---|---|---|
| `B1 Editorial Balanced` | Lesbarkeit + Struktur | TopUtilityBar + HeroSplit + AuthorMetaRow + EditorialCard Grid + LongformBlock + CTAStrip + FooterDataBlock |
| `B2 Visual Dense` | Hohe Dichte kontrollieren | TopUtilityBar + HeroSplit + TagCluster + MediaMosaic + QuoteBlock + CTAStrip + FooterDataBlock |
| `B3 Corporate Clarity` | Vertrauen + Fakten | TopUtilityBar + HeroStack + StatsRail + EditorialCard List + LongformBlock + CTAStrip + FooterDataBlock |

## 5) Decision Gates fuer Reviews

| Gate | Frage | Bestehen wenn |
|---|---|---|
| `Hierarchy Gate` | Ist der Fokus in 3 Sekunden klar? | H1, Primarbild, CTA sind sofort identifizierbar |
| `Scan Gate` | Kann ich Content ohne Scroll-Frust scannen? | Meta und Cards sind rhythmisch und einheitlich |
| `Readability Gate` | Bleiben Texte auf allen Tonalitaeten lesbar? | Kontrast + Zeilenlaenge innerhalb der Limits |
| `System Gate` | Fuehlt es sich wie ein System an? | Komponenten wiederholen sich klar ueber Varianten |

## 6) Direkt naechster Umsetzungsschritt
1. `B1` als Referenzseite bauen.
2. Mit mindestens 3 Token-Packs rendern.
3. Review nach den 4 Gates.
4. Erst danach Einzelkomponenten verfeinern.
