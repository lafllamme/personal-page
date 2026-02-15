# Run - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 2 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Event-/Bewegungskampagne mit kinetischer Energie und Community-Fokus.
- Orange auf dunkel schafft starke Richtung und Dringlichkeit.
- Swiss-Transfer: klare Eventdaten und harte visuelle Ordnung.

## 2) Grid und Layoutlogik
- Stark horizontales Raster fuer Zeitachsen, Countdown, Eventmodule.
- Hero plus Datenband als Kernmuster.
- Bildflaechen als Rhythmusgeber zwischen textlichen Infozonen.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold/Now fuer Zahl und Schlagzeilen.
- Secondary: Cabinet Grotesk fuer Untertitel.
- Meta: Space Grotesk fuer Datum, Orte, Programmpunkte.

## 4) Farbe, Kontrast, Tonalitaet
- Schwarz + leuchtendes Orange als Primarsystem.
- Weiss/Grau fuer Lesbarkeit und Distanz.
- Akzente streng auf CTA, Marker und Bewegungsachsen begrenzen.

## 5) Elemente und Interaktionsmuster
- Countdown Hero, Event Strip, City/Date Tokens, Motion Arrows.
- Community Claims in grossen Textbloecken.
- Programmsegmente als lineare Scanzeilen.

## 6) Bildsprache und Masking
- Motion-lastige Fotografien mit hohem Kontrast.
- Panorama-Crops und breite Bannerfenster.
- Lichteffekte nur aus Bildinhalt, nicht als UI-Glows.

## 7) Swiss-Style Ueberfuehrung
- Grosse Dynamik mit klarer Informationshierarchie verbinden.
- Zahlen/Daten immer typografisch einheitlich setzen.
- Richtungspfeile funktional als Navigationshilfe nutzen.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: CountdownHero, EventTicker, RouteInfoCard, CommunityStatement.
- Tokens: kinetic accent rules, numeric scales, event spacing cadence.
- Naechster Test: Pfeil-/Linienmengen reduzieren und Klarheit vergleichen.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/run`: `CountdownHero + EventTicker + RouteInfoCard` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `CountdownHero`, `EventTicker`, `RouteInfoCard`, `CommunityStatement` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=dense`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=kinetic`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?

## 11) Focus Update (2026-02-15) - Referenz: `img_1`
### Bildanalyse
- `img_1` liefert Event-/Countdown-Pattern mit horizontalem Zeitband und Bewegungsdynamik.
- Wichtig fuer System: Zahl/Datum/Ort-Komponenten muessen klar standardisiert sein.

### Abgeleitete Basis-Komponenten
- `CountdownHero`
- `EventTicker`
- `DateLocationTokenRow`
