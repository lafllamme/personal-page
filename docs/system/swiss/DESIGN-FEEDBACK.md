# Design Feedback Log

Dieses Dokument sammelt laufendes visuelles Feedback, damit Entscheidungen
zwischen Sessions stabil bleiben.

## 2026-02-13 - Exploration Runde 1

### Nutzerfeedback

- Gesamtfazit: erste Exploration ist "sehr gut".
- Variante B: Headline wirkt sehr gut und ist ein starker Favorit.
- Variante A: gefaellt ebenfalls stark (insgesamt sehr robust).
- Variante C (alte Fassung): gefaellt nicht.
- Wunsch: mehr Content und mehr ausformulierte Komponenten, damit man besser bewerten kann.
- Technikpraeferenz: vorerst UnoCSS Utility-Classes direkt im Template; spaeter Auslagerung moeglich.

### Konsequenz fuer naechste Iteration

1. Variante A und B inhaltlich und komponentenseitig deutlich erweitern.
2. Variante C komplett ueberarbeiten (nicht nur leicht anpassen).
3. Swiss-Style-Leitlinien als eigene Referenz pflegen (`docs/SWISS-STYLE.md`).
4. Nach der naechsten Runde Gewinner-Pattern in tokenisierte Komponenten ueberfuehren.

### Offene Entscheidung

- Soll Variante C als eigenstaendige Richtung erhalten bleiben,
  oder als Substil von A/B weitergefuehrt werden?

## 2026-02-13 - Exploration Runde 2

### Nutzerfeedback

- Variante B Headline wirkt weiterhin besonders stark.
- Variante A bleibt ebenfalls ein klarer Favorit.
- Die letzte Variante soll nicht als komplett anderer Layouttyp laufen, sondern als fair vergleichbarer Gegencheck.
- Wunsch nach deutlich mehr Content und mehr komponentenbasierten Vergleichsflaechen.
- Wichtig: oberhalb der Varianten einen klaren "Gedankengang"-/Notizbereich, damit die Vergleichslogik direkt sichtbar ist.
- Vergleich soll auf einer News-seitigen Struktur laufen (wie bestehende Section-Idee), nicht auf stark wechselnden Layoutmustern.
- Gewuenscht ist eine staerkere Font-Analyse inkl. "Power"/Wirkung je Typeface.

### Konsequenz fuer naechste Iteration

1. Drei Varianten in identischer News-Layout-Struktur vergleichen.
2. In jeder Variante explizit dokumentieren: Idee, Font-Stack, Type Scale, Spacing-Logik.
3. Swiss-Style-Dokument um UI-Blueprint und Font-Power-Matrix erweitern.
4. Nach visueller Bewertung Gewinner-Kombination in Tokens und wiederverwendbare Komponenten ueberfuehren.

### Offene Entscheidung

- Welche Kombination wird System-Default?
  - A als Editorial-Default
  - B als Product-Default
  - C nur als Hero-/Signal-Substil

## 2026-02-14 - Swiss Style Research (Web only)

### Durchgefuehrte Recherche

- Externe Swiss-Style-Recherche via Browser (Chrome MCP), keine Lokalhost-Analyse.
- Quellenfokus: Swiss National Library, Britannica, Smashing Magazine, Grid-System-Referenz.
- Snapshot-Belege abgelegt unter `docs/assets/swiss-research/`.

### Kernerkenntnisse

1. Unser Swiss-Fokus ist grundsaetzlich korrekt:
- Typografie + Raster + reduzierte Farbe bleiben die drei dominanten Hebel.

2. Fuer belastbare Variantenentscheidung fehlt aktuell ein Messrahmen:
- Ohne Scorecard bleiben A/B/C/D/E-Entscheidungen zu subjektiv.

3. Doku-Luecken betreffen vor allem Operationalisierung:
- Es fehlen harte Token-Grenzen fuer Lesbarkeit und eine definierte Review-Routine.

### Konsequenz fuer naechste Iteration

1. Bewertungsmatrix als eigenes Dokument anlegen (A-E mit festen Kriterien).
2. Typografische Rollenwerte als Tokens dokumentieren (Display/Headline/Body/Meta/Quote).
3. Rasterregeln je Breakpoint als pruefbare Matrix festschreiben.

## 2026-02-14 - Medium + Framer Review (Exploration Input)

### Scope

- Medium-Beitrag erneut geprueft (Bootcamp, 2024-10-10).
- Verlinkte Framer-Site (`no-one`) in mehreren Seiten und Viewports gesichtet.
- DOM/Styling als Input ausgewertet (explorativ, nicht als harte Spezifikation).

### Beobachtungen

1. Die Framer-Referenz bestaetigt den Swiss-Kern:
- reduzierte Farbigkeit, starke Typografie, klare Segmentierung, viel negative Space.

2. Warmes Swiss-Farbschema als zusaetzliche Option:
- Off-White + dunkler Rot/Braun-Ton wirkt weiterhin sachlich, aber weniger hart als reines Schwarz.

3. Bildmaterial traegt die Erzaehlung:
- Fotografie wird als inhaltliche Struktur genutzt, nicht nur als Dekoration.

4. Typo-Detail, das wir staerker vergleichen sollten:
- Enge Headline-Tracking-Werte beeinflussen die wahrgenommene Autoritaet deutlich.

### Konsequenz fuer die naechste Test-Runde

1. Eine explorative Farbvariante mit warm-neutralem Hintergrund zusaetzlich pruefen.
2. Tracking als eigenes Compare-Kriterium in A-E aufnehmen.
3. \"Objective photography\" als Beobachtungspunkt im Bild-Stress-Test protokollieren.
