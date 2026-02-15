# Skate - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 5 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Leichtes Sport-/Academy-Layout mit freundlicher, zuganglicher Wirkung.
- Editoriale Typo + grosse Bildflaechen vermitteln Coaching/Community.
- Swiss-Potenzial: klares Raster, ruhige Priorisierung, einfache Wege.

## 2) Grid und Layoutlogik
- Grosses Herofeld plus flankierende Info-Module.
- Sektionen in klaren Bloecken mit viel Weissraum.
- Mobile als lineare Story mit deutlichen Kapiteltrennern.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Libre Baskerville oder Recoleta fuer elegante Editorial-Note.
- Headline-Sans: Manrope/Geist fuer klare Sachtexte.
- Meta: Space Grotesk fuer kleine Label/Tag/Datum-Bausteine.

## 4) Farbe, Kontrast, Tonalitaet
- Hellgrau/Creme als Basis, Pastellgruen als charakterlicher Akzent.
- Dunkles Violett/Schwarz nur fuer Kontrastanker.
- Insgesamt niedrige Saettigung fuer ruhigen Ton.

## 5) Elemente und Interaktionsmuster
- Hero Story, Program Benefits, Image Highlights, Soft CTA.
- Community-/Coach-Hinweise als kurze Infobloecke.
- Dezente Badge-Elemente fuer Kursstatus.

## 6) Bildsprache und Masking
- Rundungen in Cards moeglich, aber systematisch begrenzen.
- Bilder eher ruhig, weniger harte Schnitte.
- Text nie auf unruhigen Bildbereichen platzieren.

## 7) Swiss-Style Ueberfuehrung
- Lesbarkeit und klare Sequenz fuer Onboarding priorisieren.
- Asymmetrie nur leicht einsetzen, nicht zu experimentell.
- Wenige komponentenstabile Muster fuer Skalierung bauen.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: AcademyHero, BenefitGrid, CoachSpotlight, ProgramCTA.
- Tokens: soft neutral palette, editorial serif/sans pairing, generous spacing.
- Naechster Test: Serif-Intensitaet reduzieren und Conversion-Readability pruefen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/skate`: `AcademyHero + BenefitGrid + CoachSpotlight` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `AcademyHero`, `BenefitGrid`, `CoachSpotlight`, `ProgramCTA` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=serifSans`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: Whole Concept (1:1 Kandidat)
### Bildanalyse
- Das Gesamtkonzept ist bereits sehr komponentenreif: Hero, Program, Storycards, Footer folgen klaren Mustern.
- Wichtig fuer System: Skate ist ein direkter 1:1 Transfer-Kandidat fuer eine Landing-Variante.

### Abgeleitete Basis-Komponenten
- `AcademyHero`
- `ProgramAccordion`
- `StoryTileGrid`
- `BigOutroCta`
