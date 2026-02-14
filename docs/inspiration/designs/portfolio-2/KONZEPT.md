# Portfolio-2 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 1 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Lichtes, minimalistisches Portfolio mit fotografischem Fokus.
- Typografie und viel Weissraum tragen die Hauptwirkung.
- Swiss-Orientierung: klare Achsen, wenig visuelle Reibung.

## 2) Grid und Layoutlogik
- Grosszuegige Spalten und grossflaechige Leerraeume.
- Hero + Projektteaser in klar definierten Zonen.
- Navigationspunkte klein und zurueckhaltend positionieren.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Cabinet Grotesk oder Manrope Bold.
- Body: Geist/Manrope fuer neutrale Lesbarkeit.
- Meta: Space Grotesk fuer Nummern und kleine Labels.

## 4) Farbe, Kontrast, Tonalitaet
- Helle Neutralwerte mit wenigen dunklen Kontrasten.
- Akzente nur, wenn inhaltlich sinnvoll.
- Bilder tragen den groessten Farbanteil.

## 5) Elemente und Interaktionsmuster
- Hero Statement, Project Teasers, Simple Nav, Detail Captions.
- Grosse Namens-/Titleflaechen als Markenanker.
- Ruhige CTA-Elemente ohne laute Buttons.

## 6) Bildsprache und Masking
- Rechteckige Bildfenster, oft mit grossem umgebendem Weissraum.
- Harte Kanten und klare Positionierung.
- Keine dekorativen Overlay-Effekte notwendig.

## 7) Swiss-Style Ueberfuehrung
- Whitespace als aktive Gestaltungsressource nutzen.
- Typo-Hierarchie zur Navigationsfuehrung einsetzen.
- Konsequente Reduktion auf wenige Muster.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: LightHero, ProjectTeaserRow, QuietNav, CaptionBlock.
- Tokens: large margins, light neutrals, subtle divider logic.
- Naechster Test: typografische Kontraste zwischen Name und Projektlisten.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/portfolio-2`: `LightHero + ProjectTeaserRow + QuietNav` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `LightHero`, `ProjectTeaserRow`, `QuietNav`, `CaptionBlock` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
