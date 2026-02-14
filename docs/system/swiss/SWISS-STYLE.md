# Swiss Style (UI Blueprint)

Stand: 2026-02-13

## 1) Ziel

Dieses Dokument uebersetzt Swiss Style (International Typographic Style) in konkrete UI-Regeln
fuer unser News-/Product-Interface.

Fokus dieser Runde:
- gleiche Layoutstruktur in mehreren Varianten
- Vergleich ueber Typografie statt ueber unterschiedliche Layouts
- klare Entscheidungsvorlage fuer ein tokenisiertes Designsystem

## 2) Input aus den drei angefragten Artikeln

### 2.1 Medium (Design Bootcamp)

Der Artikel betont Swiss Design als Reduktionsprinzip: Funktion vor Dekor,
klare Typohierarchie, Raster als Ordnungslogik, hohe Lesbarkeit.

UI-Ableitung:
- visuelle Wirkung kommt primaer aus Typografie, Kontrast, Abstand
- Komponenten brauchen klare Informationsrollen statt dekorativer Variationen

### 2.2 UXPlanet

Die Story ist als "member-only" markiert, aber Titel/Teaser bestaetigen den
"more of less"-Ansatz: weniger Stilgeraeusch, mehr strukturelle Klarheit.

UI-Ableitung:
- weniger visuelle Effekte, mehr strukturelle Konsistenz
- gleiche Komponentenarchitektur, Unterschiede nur ueber typografische Stimme

### 2.3 Goodmoodprints

Der Beitrag beschreibt klassische Swiss-Merkmale: asymmetrische Raster,
sans-serif Dominanz, funktionale Bild-/Textordnung, objektive Kommunikation.

UI-Ableitung:
- asymmetrisch ja, aber strikt rastergebunden
- Schriftwahl entscheidet Ton (editorial vs product vs campaign)

## 3) Swiss UI Prinzipien (verbindlich)

1. Raster zuerst
- Desktop: 12 Spalten, Mobile: 4 Spalten.
- Asymmetrie nur in festen Verhaeltnissen (z. B. 7/5, 8/4, 9/3).

2. Typografie als primare Hierarchie
- Maximal 2 Kernfamilien + 1 Meta-Familie pro Variante.
- Meta immer klein, uppercase, tracking erhoeht.

3. Kontrast und Ruhe
- Schwarz/Off-White tragen die Flaeche.
- Akzentfarbe nur fuer Status oder Interaktion.
- Bei UnoCSS Borders immer Stil explizit setzen (`border-solid` als Standard).

4. Konsistenter Vertikalrhythmus
- 4px Baseline.
- Stufen: 8, 12, 16, 24, 32, 48, 64.

5. Motion nur als Orientierung
- kurze transitions (120-300ms) fuer State-Wechsel.
- kein permanentes visuelles Rauschen in Leseseiten.

## 4) News-Page Blueprint (vergleichbar)

Fuer faire Variantenvergleiche bleibt die Struktur identisch:

1. Variant Header
- Label + Stilname + top divider.

2. Hero + Design Panel
- links: grosse Display-Headline + Teaser + Signal-Stats.
- rechts: Idee, Font Stack, Type Scale, Spacing-Logik.

3. Lead Story + Side Stories
- links: ein grosser Leitartikel mit Meta und CTA.
- rechts: drei kleinere Stories in gleicher Kartenlogik.

4. Quote + Feedback Input
- links: Tonalitaets-Quote fuer typografische Wirkung.
- rechts: kurzes Feedbackfeld fuer Review-Runden.

## 5) Font Power Matrix (deine Favoriten)

Legende "Power":
- 5 = dominante Display-Stimme
- 4 = starke Headline-Praesenz
- 3 = neutrale, robuste Arbeitsschrift
- 2 = zurueckhaltend/unterstuetzend

Hinweis: Bei einigen Fonts liegen oeffentliche technische Spezifikationen nicht vollstaendig offen vor;
bei diesen Eintraegen ist die Einschaetzung explizit eine Design-Inferenz aus
lokalem Einsatz, Dateiformat und sichtbarer Formensprache.

| Font | Kategorie | Power | Typische Rolle | Staerke im UI | Risiko |
| --- | --- | --- | --- | --- | --- |
| Druk Bold | Display Sans | 5 | Hero Display | maximale Autoritaet, plakativ | dominiert zu schnell lange Seiten |
| Zalando Sans Expanded | Expanded Sans | 5 | Signal Display | breite, markante Headlines | braucht viel Weissraum |
| Clash Display Regular | Display Sans | 4 | Headline | charaktervoll, modern | bei langer Lesestrecke schnell laut |
| Cabinet Grotesk | Grotesk Sans | 4 | Headline/Subhead | swiss-nahe Klarheit mit Charakter | braucht sauberes Tracking |
| Nohemi | Sans/Display Hybrid | 4 | Display/Headline | stark aber kontrollierbar | kann mit starken Displays kollidieren |
| Recoleta | Serif Display | 4 | Quote/Accent | hochwertige editoriale Note | als Body oft zu ornamental |
| Mondea | Display Sans | 4 (Inference) | Hero Accent | markante Gestik in kurzen Headlines | unruhig bei hoher Dichte |
| Geist | Neo Grotesk Sans | 3 | Headline/UI | ruhig, praezise, produktnah | alleinstehend manchmal zu neutral |
| Space Grotesk | Grotesk Sans | 3 | Body/Meta/Head | technisch klar, gute UI-Lesbarkeit | kann kuhl wirken ohne Kontrastpartner |
| Manrope | Sans | 3 | Body/UI Text | stabile Lesbarkeit, neutral | verliert Charakter ohne starke Headlines |
| Now | Sans | 3 (Inference) | Headline/UI | sauber und vielseitig | ohne Kontrast schnell generisch |
| Libre Baskerville | Serif | 2 | Quote/Longread Accent | editorialer Kontrast, Zitatstaerke | fuer dichte UI-Meta zu weich |

## 6) Empfohlene Font-Kombinationen fuer unsere drei Varianten

### Variante A - Swiss Editorial Classic

Idee:
- maximale redaktionelle Praesenz bei klarer Informationsordnung.

Fonts:
- Display: Druk Bold
- Headline: Cabinet Grotesk
- Body: Space Grotesk
- Meta: JetBrains Mono
- Quote Accent: Libre Baskerville

Spacing:
- 4px baseline, harte Divider, square cards.

### Variante B - Neo Swiss Product

Idee:
- produktnahe Ruhe mit klarer Conversion-Lesbarkeit.

Fonts:
- Display: Nohemi
- Headline: Geist
- Body: Manrope
- Meta: Space Grotesk
- Quote Accent: Libre Baskerville

Spacing:
- gleiches Grid, etwas rundere Surfaces, weniger Tracking-Spitzen.

### Variante C - Swiss Expanded Signal

Idee:
- expressive Schlagzeile ohne Layoutbruch, als kontrollierter Gegencheck.

Fonts:
- Display: Zalando Sans Expanded
- Headline: Clash Display Regular
- Body: Manrope
- Meta: JetBrains Mono
- Quote Accent: Recoleta

Spacing:
- gleiches Grundraster, staerkere Border-Kontraste, engere Headline-Fuehrung.

## 7) Token-Vorschlag (Startpunkt)

```css
/* Spacing */
--swiss-space-1: 4px;
--swiss-space-2: 8px;
--swiss-space-3: 12px;
--swiss-space-4: 16px;
--swiss-space-5: 24px;
--swiss-space-6: 32px;
--swiss-space-7: 48px;

/* Type roles */
--swiss-display: clamp(3.2rem, 8vw, 6.8rem);
--swiss-headline: clamp(1.8rem, 3.2vw, 2.8rem);
--swiss-body: 1rem;
--swiss-meta: 0.68rem;

/* UI borders */
--swiss-border-soft: rgba(0, 0, 0, 0.15);
--swiss-border-strong: rgba(0, 0, 0, 0.28);
```

## 8) Entscheidungslogik fuer die naechste Runde

1. Wenn redaktionelle Staerke dominiert: A als System-Default.
2. Wenn Conversion/Product-Usability dominiert: B als Product-Surface-Default.
3. C bleibt als gezielter Hero/Signal-Substil, nicht als Vollsystem.

## 9) Look & Feel Benchmarks (UI, 2026 Research)

Diese Leitlinien sind aus aktuellen Swiss-/International-Style Quellen abgeleitet und
auf digitale Interfaces uebersetzt.

### 9.1 Was "geil" wirkt im Swiss UI (Praxis)

1. Grosses typografisches Foreshadowing
- Hero-Headline darf dominieren, solange Meta/Body den Einstieg sofort lesbar machen.
- In unserem Setup: Display gross, aber Body immer ruhig und neutral.

2. Strenge Grids mit lebendiger Asymmetrie
- Wirkung entsteht, wenn eine Seite klar geordnet wirkt, aber nicht symmetrisch ist.
- Praktisch: 7/5 oder 8/4 Strukturen konstant nutzen, nicht pro Sektion neu erfinden.

3. Monochrom + ein technischer Akzent
- Schwarz/Off-White + ein Akzent (z. B. Teal) funktioniert deutlich besser als mehrere Accent-Farben.
- Akzent nur fuer Interaktion, Marker, aktive Zustaende.

4. Bilder als Kontrastfeld, nicht als Deko
- Hochaufgeloeste Architektur-/Objektbilder geben dem Layout Spannung.
- Bilder muessen mit klaren Kartenkanten und Typo-Hierarchie gerahmt bleiben.

5. Meta-Disziplin
- Kleine uppercase Meta-Zeilen halten die Seite "Swiss" und technisch praezise.
- Meta-Font sollte in allen Komponenten gleich bleiben (keine Mischungen innerhalb einer Variante).

### 9.2 Red Flags (schnell un-Swiss)

1. Zu viele Schriftstimmen pro Sektion.
2. Effekte ohne Informationsfunktion (Daueranimationen, laute Hintergruende).
3. Inkonsistente Border-Regeln (deshalb `border-solid` Standard).
4. Unterschiedliche Grid-Logiken zwischen visuell aehnlichen Modulen.
5. Zu wenig Weissraum bei starken Expanded/Condensed Headlines.

### 9.3 Konkrete Ableitung fuer unsere Varianten A-E

1. C und E wirken typografisch am markantesten fuer Hero/Brand-Moment.
2. B ist am robustesten fuer produktnahe Flows und Conversion.
3. D ist der weichere Gegenpol (humaner Ton), gut fuer Longread-nahe Zonen.
4. A bleibt die klassische redaktionelle "Backbone"-Option mit hoher Autoritaet.

### 9.4 Bild-Qualitaetsregel fuer Prototyping

- Fuer Vergleichsseiten immer identische Bilder je Variante verwenden.
- Zielauflosung: mindestens 2000px Kantenlaenge, bevorzugt 3840px Quellen.
- Empfehlung: Architektur/Geometrie in monochromem Ton fuer Swiss-Tests.

## Quellen

- Medium (Design Bootcamp):
  [https://medium.com/design-bootcamp/ux-blueprint-09-why-does-swiss-design-have-a-minimal-style-and-why-is-it-adopted-in-many-ui-0122a95e7387](https://medium.com/design-bootcamp/ux-blueprint-09-why-does-swiss-design-have-a-minimal-style-and-why-is-it-adopted-in-many-ui-0122a95e7387)
- UXPlanet:
  [https://uxplanet.org/philosophy-of-swiss-design-how-to-to-make-more-of-less-fda6943de391](https://uxplanet.org/philosophy-of-swiss-design-how-to-to-make-more-of-less-fda6943de391)
- Goodmoodprints:
  [https://www.goodmoodprints.com/en-DE/goodnews/what-is-swiss-design-exploring-the-influential-design-style](https://www.goodmoodprints.com/en-DE/goodnews/what-is-swiss-design-exploring-the-influential-design-style)
- Swiss National Library (International Style):
  [https://www.nb.admin.ch/snl/en/home/publications-research/dossiers/swiss-poster/international-style.html](https://www.nb.admin.ch/snl/en/home/publications-research/dossiers/swiss-poster/international-style.html)
- Encyclopaedia Britannica (International Typographic Style):
  [https://www.britannica.com/topic/International-Typographic-Style](https://www.britannica.com/topic/International-Typographic-Style)
- Geist (Vercel font docs):
  [https://vercel.com/font](https://vercel.com/font)
- Space Grotesk (GitHub repository):
  [https://github.com/floriankarsten/space-grotesk](https://github.com/floriankarsten/space-grotesk)
- Manrope (GitHub repository):
  [https://github.com/sharanda/manrope](https://github.com/sharanda/manrope)
- Zalando Sans Expanded source:
  [https://github.com/micku7zu/zalando-sans](https://github.com/micku7zu/zalando-sans)
- Libre Baskerville source:
  [https://github.com/impallari/Libre-Baskerville](https://github.com/impallari/Libre-Baskerville)
- Druk (Commercial Type):
  [https://commercialtype.com/catalog/druk](https://commercialtype.com/catalog/druk)

## 10) Web Research Addendum (Chrome MCP, 2026-02-14)

Diese Ergaenzung basiert auf externer Web-Recherche im Browser (nicht auf Lokalhost-Inhalten)
und dient als belastbare Referenz fuer die naechste Swiss-Style-Iteration.

### 10.1 Gepruefte Quellen

1. Swiss National Library (amtlicher Kontext):
   [https://www.nb.admin.ch/snl/en/home/publications-research/dossiers/swiss-poster/international-style.html](https://www.nb.admin.ch/snl/en/home/publications-research/dossiers/swiss-poster/international-style.html)
2. Encyclopaedia Britannica (historische Einordnung):
   [https://www.britannica.com/topic/International-Typographic-Style](https://www.britannica.com/topic/International-Typographic-Style)
3. Smashing Magazine (Web-Transfer von Swiss-Prinzipien):
   [https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/](https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/)
4. Grid-System-Referenzsammlung (Methoden/Tools):
   [https://www.thegridsystem.org/](https://www.thegridsystem.org/)

### 10.2 Visuelle Snapshots (Recherchebelege)

- `docs/assets/swiss-research/01-swiss-national-library.png`
- `docs/assets/swiss-research/02-britannica-international-typographic-style.png`
- `docs/assets/swiss-research/03-smashing-swiss-style-lessons.png`
- `docs/assets/swiss-research/04-grid-system-reference.png`

### 10.3 Konsolidierte Erkenntnisse

1. Historischer Kern bleibt stabil:
- Swiss/International Style = rationale Komposition, typografische Klarheit, reduzierte Ornamentik, starke Rasterbindung.

2. Typografie + Grid sind das Primaersystem:
- Die Quellen bestaetigen, dass visuelle Spannung ueber Proportion, Schriftkontrast und Ausrichtung kommt, nicht ueber dekorative Effekte.

3. Fotoeinsatz ist funktional, nicht atmosphaerisch:
- Bildmaterial soll Information und Rhythmus stuetzen; starke Farb- oder Effektlayers schwachen die typografische Fuehrung.

4. Web-Uebertragung funktioniert nur mit Disziplin:
- Swiss-Look entsteht im UI erst dann konsistent, wenn Headlines, Meta, Body und Divider-Regeln als System fest verdrahtet sind.

### 10.4 Was in unserer Doku aktuell noch fehlt

1. Harte Messkriterien fuer Variantenvergleich A-E:
- Es fehlt ein verbindlicher Scoring-Bogen mit festen Messachsen (Scan-Speed, Longform-Komfort, Meta-Klarheit, Hero-Impact).

2. Praezise Lesbarkeitsgrenzen:
- Es fehlen dokumentierte Zielkorridore fuer Zeilenlaenge, Zeilenhoehe und Tracking je Rolle (Display/Headline/Body/Meta/Quote).

3. Raster-Governance pro Breakpoint:
- Die Asymmetrie ist beschrieben, aber nicht als pruefbare Regelmatrix hinterlegt (z. B. erlaubte Spaltenverhaeltnisse je Modul).

4. Bild-zu-Typo-Regeln fuer Stress-Test:
- Es fehlt eine feste Bewertungslogik, wie stark Bildkontrast die Lesbarkeit von Headline/Meta innerhalb derselben Karte beeinflusst.

5. Entscheidungsprotokoll:
- Es fehlt ein dokumentierter Entscheidungsablauf, wann eine Variante als Default, Substil oder verworfen markiert wird.

### 10.5 Empfohlene neue Doku-Bausteine (naechster Schritt)

1. `docs/SWISS-SCORECARD.md`
- Einheitliche Bewertungsmatrix fuer A-E (0-5 je Kriterium, mit klaren Schwellen fuer Entscheidung).

2. `docs/SWISS-TYPO-TOKENS.md`
- Verbindliche Rollenwerte: font-size, line-height, tracking, case, measure, inkl. mobile/desktop.

3. `docs/SWISS-GRID-RULES.md`
- Erlaubte Verhaeltnisse je Sektion (Hero, Lead, Side, CTA, Stress-Test), inklusive No-Go-Kombinationen.

4. `docs/SWISS-REVIEW-RITUAL.md`
- Wiederholbarer Ablauf fuer neue Runden: Vorbereitung, Blind-Vergleich, Scoring, Entscheidung, Token-Transfer.

### 10.6 Explorative Arbeitsdokumente (neu)

Diese Dateien sind absichtlich als \"Input\" statt als finale Spezifikation geschrieben:

- `docs/SWISS-SCORECARD.md`
- `docs/SWISS-TYPO-TOKENS.md`
- `docs/SWISS-GRID-RULES.md`

## 11) Medium + Framer Field Notes (2026-02-14)

Diese Sektion dokumentiert zusaetzliche Exploration-Inputs aus:

- Medium-Artikel (Bootcamp):
  [https://medium.com/design-bootcamp/ux-blueprint-09-why-does-swiss-design-have-a-minimal-style-and-why-is-it-adopted-in-many-ui-0122a95e7387](https://medium.com/design-bootcamp/ux-blueprint-09-why-does-swiss-design-have-a-minimal-style-and-why-is-it-adopted-in-many-ui-0122a95e7387)
- Framer-Referenzseite aus dem Artikel:
  [https://no-one.framer.website/?source=post_page-----0122a95e7387---------------------------------------](https://no-one.framer.website/?source=post_page-----0122a95e7387---------------------------------------)

### 11.1 Was der Medium-Artikel als praktikabel bestaetigt

1. UI-Uebersetzung von Swiss Style:
- Grid-basierte Ordnung, klare Hierarchie, reduzierte Farbigkeit, typografischer Fokus.

2. Relevanz fuer heutige UIs:
- Der Artikel argumentiert Swiss Style als robust fuer Readability, schnelle Orientierung und responsive Skalierung.

3. Zusaetzlicher, nuetzlicher Punkt:
- \"Objective photography\" wird explizit als Stilmerkmal benannt, passend zu eurem Image-Stress-Test.

### 11.2 Framer-Site Beobachtungen (DOM + Styling, explorativ)

1. Typografische Stimme:
- Dominant: `Inter Display` in grossen Headlines.
- Headline-Beispiel (DOM-Readout): ca. 64px mit engerem Letter-Spacing (negativ).

2. Farbklima:
- Sehr reduzierte Palette mit warmem Off-White Hintergrund und dunklem Rot/Braun als Primarton.
- Inference aus Style-Tokens/Computed Styles:
  - `rgb(255, 255, 248)` als Flaechenbasis
  - `rgb(70, 10, 10)` als starker Text-/Akzentton
  - neutrale Grauwerte fuer sekundaere Texte

3. Layoutcharakter:
- Viel Whitespace, grosse Typo-Momente, klare Segmentierung von Intro/Meta/Gallery.
- Streng reduzierte Navigation und wiederkehrende Footerstruktur.

4. Bildstrategie:
- Bildmaterial ist zentral und inhaltstragend (Portfolio-Narrativ), nicht rein dekorativ.
- Gute Referenz fuer euren \"Image Stress Test\", wenn Typo-zu-Bild-Spannung bewertet wird.

### 11.3 Abgleich mit eurem aktuellen Swiss-System

1. Bereits stark abgedeckt:
- Rasterdisziplin, reduzierte Farbigkeit, Fokus auf Typo-Hierarchie.

2. Neu zu schaerfen (weiterhin explorativ):
- Warm-neutrales Swiss-Farbspektrum als Alternative zu rein Schwarz/Weiss dokumentieren.
- \"Objective photography\" als explizites Review-Kriterium in die Scorecard aufnehmen.
- Headline-Tracking als eigene Messachse notieren (nicht nur Font Choice und Size).

### 11.4 Direkt umsetzbare Inputs fuer die naechste Exploration

1. Color-Tone Experiment (ohne Layout-Aenderung):
- Eine Runde mit warmem Off-White + dunklem Rotbraun als Swiss-Alternative testen.

2. Typo-Mikrotest:
- Gleiches Font-Setup, aber 2-3 Tracking-Varianten fuer Display/Headline gegeneinander pruefen.

3. Photo-Objektivitaet pruefen:
- Bei identischen Bildern notieren, ob Motivwahl \"objektiv/informativ\" oder \"zu editorial/inszeniert\" wirkt.
