# Sport - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Skate-/Street-Kulturseite mit starker Brandhaltung und hoher Kontrastkraft.
- Dominante Wortmarke + markante Actionfotos treiben die Seite.
- Swiss-Einfluss: klare Struktur unter der expressiven Oberflaeche.

## 2) Grid und Layoutlogik
- Hero-Split mit starkem Typoanker und daneben Story-/Newsmodule.
- Program-/Facility-Bereich als klare Liste mit zugeordnetem Bild.
- Footerdaten in strengem Mehrspaltenlayout.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now fuer Brandname/Claims.
- Secondary: Cabinet Grotesk fuer Subheads und Sektionstitel.
- Body/Meta: Space Grotesk fuer Adressen, Zeiten, Utility.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz/Weiss als Grundgeruest, Orange als starke Signalfarbe.
- Grautoene fuer Zwischenebenen.
- Akzentfarbe auf CTA und Marker begrenzen.

## 5) Elemente und Interaktionsmuster
- Brand Hero, Latest Stories, Program List, Utility Footer.
- Kompakte Karten mit Bild + Teaser + Readmore.
- Grosse Abschluss-CTA als Markenmoment.

## 6) Bildsprache und Masking
- Bildfenster rechteckig, einzelne Rundungen als Signature moeglich.
- Harte Crops und starke Bewegungsmotive.
- Overlayflaechen nur zur Lesbarkeit einsetzen.

## 7) Swiss-Style Ueberfuehrung
- Typografischer Fokus bleibt primaer fuer schnelle Orientierung.
- Rasterdisziplin sichert Klarheit in dynamischer Bildwelt.
- Informationsdichte im Footer strukturiert statt gestapelt halten.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: StreetHero, StoryCards, ProgramList, BigOutroCTA.
- Tokens: orange accent semantics, dark/light text rules, card paddings.
- Naechster Test: Footer-Komplexitaet reduzieren fuer bessere mobile Usability.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/sport`: `StreetHero + StoryCards + ProgramList` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `StreetHero`, `StoryCards`, `ProgramList`, `BigOutroCTA` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_1`
### Bildanalyse
- `img_1` zeigt kraftvollen Brand-Hero, modulare Storyblöcke und starke Abschlusssektion.
- Wichtig fuer System: hoher Kontrast + klare Funktionsbereiche (Story, Program, CTA).

### Abgeleitete Basis-Komponenten
- `StreetHero`
- `LatestStoriesGrid`
- `ProgramList`
- `OutroBanner`

## 12) Component Extraction Map (Storybook Input)
| Ref | Observed Pattern | Pull Component | Type | Priority |
|---|---|---|---|---|
| `img_1` | Brand-led hero + stories + program list composition | `DsStreetHero`, `DsLatestStoriesGrid`, `DsProgramList`, `DsOutroBanner` | Pattern | P1 |
