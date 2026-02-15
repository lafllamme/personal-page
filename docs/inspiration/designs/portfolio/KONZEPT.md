# Portfolio - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Minimales, dunkles Portfolio mit Fokus auf Projektliste und Kontakt.
- Statt visueller Effekte steht klare Selektion im Vordergrund.
- Swiss-Naehe: direkte, funktionale Kommunikation.

## 2) Grid und Layoutlogik
- Einspaltige Hauptliste mit klaren horizontalen Trennern.
- Projektzeilen als wiederholbares List-Pattern.
- Vorschau rechts als optionales Kontextfenster.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Manrope/Geist, sauber und lesbar.
- Projektzeilen: etwas groesser fuer schnelle Navigation.
- Meta: Space Grotesk fuer Kategorien und Kontakthinweise.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarzer Hintergrund mit weisser/hellgrauer Typo.
- Akzente nur fuer Hover/aktive Projektzeile.
- Hoher Kontrast als Hauptmerkmal.

## 5) Elemente und Interaktionsmuster
- Project List Item, Preview Thumb, Contact Line.
- Klares "Want to see more"-Pattern.
- Minimal Navigation ohne visuelle Last.

## 6) Bildsprache und Masking
- Kleine rechteckige Preview-Bilder.
- Keine komplexen Formen, Fokus auf Text und Reihenfolge.
- Bild nur als Kontext, nicht als Dominanz.

## 7) Swiss-Style Ueberfuehrung
- Maximale Reduktion bei klarer Funktion.
- Typografische Ordnung ersetzt visuelle Dekoration.
- Konsequente Wiederholung gleicher Zeilenstruktur.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: ProjectList, ProjectRow, InlinePreview, ContactFooter.
- Tokens: divider style, row paddings, interaction states.
- Naechster Test: mit/ohne Vorschaupanel fuer Fokus auf Entscheidgeschwindigkeit.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/portfolio`: `ProjectList + ProjectRow + InlinePreview` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `ProjectList`, `ProjectRow`, `InlinePreview`, `ContactFooter` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_1`
### Bildanalyse
- `img_1` fokussiert die lineare Projektliste als primäres Navigationsmuster.
- Wichtig fuer System: List-first Komponente fuer schnelle Auswahl statt visuellem Overhead.

### Abgeleitete Basis-Komponenten
- `ProjectListRail`
- `ProjectRow`
- `InlinePreview`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `img_1` | Linear project rail for fast selection | `DsProjectListRail`, `DsProjectRow` | Pattern | P1 |
| `img_1` | Inline preview alongside list | `DsInlinePreview` | Pattern | P2 |
