# Construct-2 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 3 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Architekturstudio mit Corporate-Fokus auf Team, Projekte, Werte.
- Mix aus heroischem Statement und sachlicher Projektstruktur.
- Swiss-Transfer: sachlich, geordnet, datenorientiert.

## 2) Grid und Layoutlogik
- Raster mit klaren vertikalen Leitlinien und card-basierten Sektionen.
- Team-Strip und Projektkarten als wiederholbare 5er/3er Module.
- Dunkel/Hell-Wechsel pro Abschnitt zur inhaltlichen Segmentierung.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Now oder Cabinet Grotesk fuer markanten Studionamen.
- Headline: Manrope/Geist fuer Services und Projekttexte.
- Meta: Space Grotesk fuer IDs, Jahre, Flaechenangaben.

## 4) Farbe, Kontrast, Tonalitaet
- Neutrale Grausala + Schwarz/Weiss, kaum starke Farbe.
- Leichte warme Grautoene fuer Humanitaet und Materialbezug.
- Kontrast ueber Gewicht und Flaechenhierarchie.

## 5) Elemente und Interaktionsmuster
- Hero-Building, Team-Row, Projektteaser, Service-Claim.
- Einheitliche Kartenkoepfe mit Nummerierung.
- Section-Labeling fuer schnelle Orientierung.

## 6) Bildsprache und Masking
- Architekturbilder mit klarer Perspektive und neutraler Bearbeitung.
- Portraits frontal, einheitliche Kachelgroesse.
- Transparenz-Layer nur dezent und zweckgebunden.

## 7) Swiss-Style Ueberfuehrung
- Klare Informationsobjektivitaet statt Inszenierungsueberschuss.
- Modulare Konsistenz zwischen Team, Cases und Services.
- Typografischer Rhythmus als primaere Dramaturgie.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: StudioHero, TeamStrip, ProjectStatsCard, ServiceStatement.
- Tokens: neutral surfaces, strict card paddings, numeric label style.
- Naechste Iteration: Team-/Projektmodule auf gleiche vertikale Abstaende normalisieren.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/construct-2`: `StudioHero + TeamStrip + ProjectStatsCard` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `StudioHero`, `TeamStrip`, `ProjectStatsCard`, `ServiceStatement` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=mixed`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenzen: `img_1`, `img_2`
### Bildanalyse
- `img_1` kombiniert dunklen Hero mit vertikalen Linien und klarer Positionierung.
- `img_2` fokussiert Team-/Projektkarten auf hellem Grund mit hoher Objektivitaet.
- Wichtig fuer System: Dark-Light Section-Wechsel als klares Kapitelmuster.

### Abgeleitete Basis-Komponenten
- `StudioHeroPanel`
- `TeamStrip`
- `ProjectStatCard`
- `SectionToneSwitch`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `img_1` | Dark hero panel with strict vertical guides | `DsStudioHeroPanel`, `DsGridGuides` | Layout/Pattern | P2 |
| `img_2` | Team + project stat cards on light canvas | `DsTeamStrip`, `DsMarketPulseItem`, `DsCard` | Pattern/Foundation | P1/P0 |
