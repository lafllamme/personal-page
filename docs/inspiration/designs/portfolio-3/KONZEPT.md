# Portfolio-3 - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 4 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Persoenliches Portfolio mit dunkler, moderner Produktpraesenz.
- Kombiniert Intro, Achievement und Projektkarten auf einer Seite.
- Swiss-Transfer: trotz Layering klare Lesebahnen sichern.

## 2) Grid und Layoutlogik
- Hero oben, darunter modulare Cards in klaren Reihen.
- Projektkarten als wiederholtes Rasterelement.
- Social/CTA-Ebene als funktionale Sektion trennen.

## 3) Typografie-Richtung (vorlaeufig)
- Display: Now oder Druk Bold fuer Namen/Brand.
- Headline/Text: Manrope/Geist fuer Informationsebene.
- Meta: Space Grotesk fuer Labels, Plattformnamen, Actions.

## 4) Farbe, Kontrast, Tonalitaet
- Dunkelgrau/Schwarz als Basis mit hellen Kartenflaechen.
- Akzente sparsam fuer Interaktionspunkte.
- Kontrast ueber Blockwechsel und Typogewicht aufbauen.

## 5) Elemente und Interaktionsmuster
- Personal Intro, Achievement Strip, Featured Project Cards, Social Buttons.
- Button-Sets als wiederkehrendes Utility-Muster.
- Karten mit Thumbnail + Kurztext + Link.

## 6) Bildsprache und Masking
- Projektthumbnails rechteckig, gleiches Seitenverhaeltnis.
- Hero-Overlaps moeglich, aber auf oberste Sektion beschraenken.
- Rausch-/Textur-Layer optional und sehr subtil.

## 7) Swiss-Style Ueberfuehrung
- Modulare Wiederholung statt freier Einzelgestaltung.
- Klare Typoskala fuer Intro/Section/Card sichern.
- Interaktive Elemente semantisch klar und einheitlich auszeichnen.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: IntroHero, AchievementRow, ProjectCardGrid, SocialActionBar.
- Tokens: card radii, dark surface ladder, button hierarchy.
- Naechster Test: Projektkarte mit weniger Text fuer schnelleren Scan.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/portfolio-3`: `IntroHero + AchievementRow + ProjectCardGrid` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `IntroHero`, `AchievementRow`, `ProjectCardGrid`, `SocialActionBar` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=balanced`, `tone=dark`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
