# Company - Konzept (Exploration)

> Status: Arbeitsdokument fuer Exploration. Richtungen statt starre Vorgaben.
> Bildbasis: 1 Referenzgrafiken im Ordner.

## 1) Design-Idee und Wirkung
- Schlankes Corporate-Layout fuer Vertrauen, Klarheit und ruhige Orientierung.
- Wenig visuelle Mittel, Fokus auf kurze Nutzenargumente und Bilder.
- Swiss-Qualitaet: hohe Lesbarkeit, konsequente Ordnung, wenig Stilrauschen.

## 2) Grid und Layoutlogik
- Einfaches 2-Spalten-Schema fuer Desktop, auf Mobile als Single Column.
- Konstante vertikale Abstaende fuer saubere Informationsbloecke.
- Kartenmodule mit identischer Breite fuer schnelle Vergleichbarkeit.

## 3) Typografie-Richtung (vorlaeufig)
- Headline: Manrope oder Geist SemiBold.
- Body: Manrope Regular mit grosszuegiger Zeilenhoehe.
- Meta/Links: Space Grotesk klein fuer klare Utility-Notation.

## 4) Farbe, Kontrast, Tonalitaet
- Heller Neutralraum mit dezenten dunklen Texten.
- Akzent nur fuer Links/Actions, nicht flaechig ueberall.
- Kontrast primar ueber Typogewicht und Whitespace.

## 5) Elemente und Interaktionsmuster
- Image-Card + kurzer Teaser + "Learn more".
- Saubere CTA-Linie, keine komplexen Interaktionsmuster.
- Optionales Trust-Modul mit Kennzahlen oder Logos.

## 6) Bildsprache und Masking
- Rechteckige Bilder, neutrale Crops, kein dramatisches Framing.
- Stille Bildsprache unterstuetzt Information statt Show.
- Einheitliche Bildverhaeltnisse fuer visuelle Ruhe.

## 7) Swiss-Style Ueberfuehrung
- Funktion vor Form, jede Zeile muss inhaltlich beitragen.
- Konsistente Kanten und Ausrichtungen ueber alle Module.
- Wenige, stabile Komponenten fuer klare Systemlogik.

## 8) Design-System-Bausteine fuer naechste Iteration
- Bausteine: IntroHeadline, TwoUpCards, TrustStrip, SimpleCTA.
- Tokens: spacing ladder 8/16/24/32, text scale 14/18/36.
- Naechste Iteration: Variantenvergleich nur ueber Typo-Pairing und Zeilenlaenge.

## 9) Komponenten-Proposals fuer das Gesamtkonzept
- `PageBlueprint/company`: `IntroHeadline + TwoUpCards + TrustStrip` als Starttemplate fuer diese Stilrichtung.
- `Core-Komponenten`: `IntroHeadline`, `TwoUpCards`, `TrustStrip`, `SimpleCTA` bleiben als benannte Bausteine stabil und werden nur ueber Tokens variiert.
- `Variant-Regler`: `density=airy`, `tone=light`, `typeMix=sansOnly`, `mediaMode=calm`.
- `Assembly-Regel`: pro Seite mindestens `1 Hero`, `1 Content-Rail/Grid`, `1 CTA/Utility-Block`, `1 Footer/Meta-Block` fuer vergleichbare Screens.
- `System-Mapping`: lokale Bausteine werden auf globale Familien `Hero`, `Card`, `Rail`, `Meta`, `CTA`, `Footer` gemappt.

## 10) Offene Fragen fuer den naechsten Review
- Welche 2-3 Komponenten erzeugen die meiste Wiedererkennbarkeit dieses Stils?
- Wo koennen wir visuelle Dichte reduzieren, ohne Charakter zu verlieren?
- Welche Typokombination aus den Favoriten ist hier am robustesten fuer Desktop + Mobile?
