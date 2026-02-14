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

## 2026-02-14 - Exploration Phase 1 (TechNews Demo, 3 Pack-Varianten)

### Nutzerfeedback

- Gesamtfazit: sehr starke Runde, Input trifft die gewuenschte Richtung.
- Ranking (aktuell):
  1. `Demo 02 / P04` (Swiss Signal Orange) als klarer Gewinner.
  2. `Demo 01 / P01` als solide zweite Option.
  3. `Demo 03 / P05` als dritte Option mit Potenzial.
- Zielbild fuer das produktive System:
  - Primaer Schwarz/Weiss (hoher Kontrast)
  - Light + Dark Mode als feste Invarianten
  - Akzentfarbe nur gezielt fuer Special Cases/Signale
- Wunsch zur Vergleichbarkeit:
  - in den Demos pro Variante Fonts explizit anzeigen
  - Referenz-Herkunft (Ordner + Idee) sichtbar halten

### Konsequenz fuer die naechste Iteration

1. `P04` als Basisrichtung priorisieren (Demo 02 als Leitvariante).
2. Drei neue Varianten eng um P04 herum bauen (statt komplett andere Richtung):
   - P04-Core (Baseline)
   - P04-Soft (ruhigere Typo/Spacing)
   - P04-Tech (praezisere, technischere Meta-/Body-Fuehrung)
3. Fuer alle drei Varianten verpflichtend:
   - identisches Layout (kein Drift)
   - jeweils Light- und Dark-Invariante
   - gleiche Content-Laenge fuer fairen Vergleich
4. Farb-Invariante fuer farbige Varianten:
   - Wenn ein Pack eine charakteristische Section-Farbe nutzt, muss diese in Light **und** Dark sichtbar bleiben.
   - Kein \"neutrales Light vs farbiges Dark\" ohne explizite, dokumentierte Ausnahme.

### Entscheidung

- Akzentfarben duerfen pro Variante variieren.
- Jede Akzententscheidung wird dokumentiert (Farbe + Referenzidee), damit Herkunft und Wirkung nachvollziehbar bleiben.

## 2026-02-14 - Phase 2 Kickoff (P04 Derivatives + Candidate Freeze)

### Verbindlicher Input aus Scoring-JSON

- Gewinner bleibt `P04` mit `4.8`.
- Bewertungstreiber:
  - sehr starke 3-Sekunden-Hierarchie
  - hohe Scanbarkeit unter dichter Informationslage
  - klarer Brand-Fit fuer Swiss + TechNews
- Konkrete Schwachstelle:
  - Market-Pulse-Headlines benoetigen etwas mehr Raum/Alignment-Finetuning.

### Top-Tier Inspirationsordner (vom Nutzer priorisiert)

- `agency`, `brand`, `cloth`, `construct`, `construct-2`, `estate`,
  `fashion`, `fashion-2`, `magazine`, `magazine-2`, `magazine-3`,
  `music`, `photography`, `product`, `run`, `skate`, `sport`, `tech`

### Umsetzung fuer Phase 2

1. Drei neue Varianten bleiben im identischen Layout-Frame:
   - `P04-C01 Core Mono Signal`
   - `P04-C02 Editorial Olive`
   - `P04-C03 Tech Electric`
2. Light/Dark-Invariante bleibt fuer alle drei verpflichtend.
3. Farbcharakter bleibt je Variante in Light und Dark sichtbar.
4. Der Gewinner-Stand wird als Candidate-Token-Stand eingefroren,
   damit Iterationen rueckverfolgbar bleiben.

## 2026-02-14 - Phase 2 Selection Update (Market Pulse Font Test)

### Entscheidung

- Aktueller Gewinner: `P04-MPZ01` (`Swiss Signal Orange Clone (MP Zalando)`).
- Beibehalten als Kontrollvariante: `P04` (`Swiss Signal Orange`, OG Pattern).
- Zusaetzliche Explorationsvarianten:
  - `P04-Z01` (Zalando Display Variante)
  - `P04-T01` (Neon Turquoise)
  - `P04-T01-MPZ01` (Neon Clone mit MP Zalando)

### Warum gewonnen

- Die Systemwirkung von `P04` bleibt erhalten (Kontrast, Hierarchie, Tempo).
- Die einzige Veraenderung (`Market Pulse` Metric in `Zalando Sans Expanded`)
  erzeugt den bevorzugten typografischen Akzent ohne Layout-Drift.
- Damit ist der Eingriff klein genug fuer sichere Uebernahme ins System.

### Dokumentationsregeln ab jetzt

1. Jede neue Testvariante braucht `basePack`, `experimentDelta`, `status`.
2. `Reference Inputs` in der Exploration-UI muessen diese drei Felder anzeigen.
3. Gewinnerwechsel erzeugt immer einen neuen Candidate-Eintrag (inkrementell).
