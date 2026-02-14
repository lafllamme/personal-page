# Photography-2 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 3 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Monochromer Personal-Brand-Auftritt fuer Fotograf/Videograf.
- Portfolio, Persona und Social Content sind eng verzahnt.
- Swiss-Idee: klare Selbstpositionierung ueber Typo und Raster.

## 2) Grid und Layoutlogik
- Hero links/rechts kombiniert mit modularen Contentfenstern.
- Zentrale Typoflaechen als Leitanker, Bildfelder flankieren.
- Projekt- und Social-Sektionen entlang gleicher Spaltenlogik.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Druk Bold oder Now fuer Name und Berufsrollen.
- Secondary: Manrope/Geist fuer Selbstbeschreibung.
- Meta: Space Grotesk fuer Projektlabels und kleine Utilities.

## 4) Farbe, Kontrast, Tonalitaet
- Fast komplett Schwarz/Weiss mit feinen Graustufen.
- Akzentfarbe optional nur fuer Interaktion.
- Kontrast ueber groesse und Gewicht priorisieren.

## 5) Elemente und Interaktionsmuster
- Personal Hero, Project Showcase, Social Media Panel, Contact Trigger.
- Rollenbeschreibung als typografisches Signature-Element.
- Bildbloecke in klarer rechteckiger Geometrie.

## 6) Bildsprache und Masking
- Portraits meist gross und frontal, harte Kanten.
- S/W-Bildsprache konsistent fuer Brandwiedererkennung.
- Ueberlagerte Typo nur in Hero und Section Headern.

## 7) Swiss-Style Ueberfuehrung
- Persoenliche Brandstimme mit objektiver Informationsstruktur kombinieren.
- Konsistenz zwischen Portfolio- und Content-Ansichten sichern.
- Reduktion statt Dekoration fuer zeitlosen Eindruck.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: PersonalHero, RoleStack, WorkGrid, SocialStrip.
- Tokens: monochrome palette, strong display sizes, tight section spacing.
- Naechster Test: Name/Role Hierarchie fuer schnellere Erstorientierung.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/photography-2`: `PersonalHero + RoleStack + WorkGrid` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `PersonalHero`, `RoleStack`, `WorkGrid`, `SocialStrip` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
