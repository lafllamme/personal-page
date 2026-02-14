# Design System Konzept FINAL (Swiss First)

Stand: 2026-02-13
Status: Finales Konzept (Single Source of Truth)

## 1) Exploration Varianten A-E (Quick Reference)

Ziel: schneller Gegenabgleich zur Exploration-View (gleicher Content, gleiches Layout, nur Typo/Spacing-Wirkung).

### Variante A - Swiss Editorial Classic
- Fonts: `Druk Bold` (Display), `Cabinet Grotesk` (Headline), `Space Grotesk` (Body), `JetBrains Mono` (Meta), `Libre Baskerville` (Quote)
- Wirkung: hohe Autoritaet, klar redaktionell, starke Headline-Praesenz

### Variante B - Neo Swiss Product
- Fonts: `Nohemi` (Display), `Geist` (Headline), `Manrope` (Body), `Space Grotesk` (Meta), `Libre Baskerville` (Quote)
- Wirkung: ruhiger, produktnah, sehr gut fuer klare Conversion- und UI-Lesbarkeit

### Variante C - Swiss Expanded Signal
- Fonts: `Zalando Sans Expanded` (Display), `Clash Display` (Headline), `Manrope` (Body), `JetBrains Mono` (Meta), `Recoleta` (Quote)
- Wirkung: expressiv, signalstark, hoher Hero-Impact bei mehr typografischer Spannung

### Variante D - Swiss Soft Signal
- Fonts: `Mondea` (Display), `Now` (Headline), `Manrope` (Body), `Space Grotesk` (Meta), `Libre Baskerville` (Quote)
- Wirkung: weicher/humaner Ton, ruhiger Einstieg, longform-freundlich

### Variante E - Swiss Expanded Signal (Baskerville)
- Fonts: `Zalando Sans Expanded` (Display), `Clash Display` (Headline), `Manrope` (Body), `Space Grotesk` (Meta), `Libre Baskerville` (Quote)
- Wirkung: wie C in der Signalwirkung, aber entspannter in Meta/Quote und damit lesefreundlicher

## 2) Diagnose (Ist-Zustand)

Der visuelle Kern ist stark, aber es gibt Drift in drei Ebenen:

1. **Typografie-Drift**
- Sehr viele Fonts sind verfuegbar und aktiv nutzbar.
- Die Rollen sind nicht hart definiert (Display/Body/Meta mischt je Seite).

2. **Pattern-Drift**
- Mindestens drei Stilwelten laufen parallel:
  - Editorial-News (`NewsSection`)
  - Premium-Marketing (`join`, `showcase`, `login`)
  - Experimental/Lab (`index`, 3D/Shader/Metaballs)

3. **Motion-Drift**
- Sehr gute Motion-Qualitaet in Teilen, aber nicht auf ein gemeinsames Timing-/Easing-System normalisiert.

## 3) North Star (Swiss First)

Das Designsystem priorisiert:

1. Kontrastreiche Schwarz-Weiss-Komposition
2. Typografische Hierarchie statt visueller Effekte
3. Asymmetrische, klare Raster
4. Strenge Reduktion bei Farben und Motion
5. Editorial-Craft + Produktklarheit

## 4) Design Prinzipien (verbindlich)

1. **2-Farben-Fuehrung**
- Schwarz und Off-White tragen 90-95% der Flaeche.
- Akzentfarbe ist optional und maximal punktuell (Links, Status, aktive Marker).

2. **Typo vor Dekor**
- Headlines, Labels und Spacing bauen die Hierarchie.
- Keine lauten Gradients als primaere Designsprache.

3. **Asymmetrie mit System**
- Layout darf versetzt und ungleich sein, aber immer rastergebunden.

4. **Motion als Information**
- Motion erklaert Zustand/Struktur, nicht Show-Effekt.

## 5) Foundations V1 (Token-Ebene)

### 5.1 Color Tokens

```css
--ds-bg: #f2efe6;
--ds-fg: #000000;
--ds-surface: #f7f5ef;
--ds-surface-strong: #ece8dc;
--ds-border-soft: rgba(0,0,0,0.12);
--ds-border-strong: rgba(0,0,0,0.28);

--ds-bg-dark: #000000;
--ds-fg-dark: #f2efe6;
--ds-surface-dark: #0d0d0d;
--ds-surface-dark-strong: #151515;
--ds-border-soft-dark: rgba(242,239,230,0.16);
--ds-border-strong-dark: rgba(242,239,230,0.32);

--ds-accent: #0bd8b6;      /* optional */
--ds-accent-dark: #0aa88f; /* optional */
```

Regel:
- Akzent nur fuer Interaktion/Information, nicht fuer Flaechen.

### 5.2 Typografie-Rollen

Nur 4 Rollen im Produktivsystem:

1. `display`
2. `headline`
3. `body`
4. `meta`

Skala (Richtwerte):

```txt
Display XL: clamp(4rem, 11vw, 9rem)
Display L : clamp(3rem, 8vw, 6rem)
Headline  : clamp(1.6rem, 3vw, 2.5rem)
Body L    : 1.125rem
Body M    : 1rem
Meta      : 0.72rem - 0.82rem (uppercase, tracking +)
```

### 5.3 Spacing und Grid

- Basis: 4px Grid
- Rhythmus: 8 / 12 / 16 / 24 / 32 / 48 / 64
- Desktop: 12 Spalten
- Mobile: 4 Spalten
- Swiss-Asymmetrie-Patterns:
  - 7/5
  - 8/4
  - 9/3
  - Offset-Blocks mit klarer Baseline

### 5.4 Motion Tokens

```txt
micro   120-160ms  ease-out
ui      220-300ms  cubic-bezier(0.33,1,0.68,1)
section 420-560ms  cubic-bezier(0.25,1,0.5,1)
```

Nicht erlaubt:
- dauerhafte, dominante Ambient-Animationen im Lesekontext
- starke Bounce/Overshoot-Effekte

## 6) Komponenten-System V1

### 6.1 Kanonische Komponentenfamilien

1. `SwissMasthead`
2. `SwissSectionFrame`
3. `SwissStoryCard` (`featured`, `regular`, `ticker`)
4. `SwissMetaRow` (Datum, Autor, Kategorie, Reading Time)
5. `SwissCTACluster` (`primary`, `secondary`, `ghost`)
6. `SwissInputField`

### 6.2 Mapping auf bestehende Komponenten

- `NewsSection` in `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/Section/NewsSection/NewsSection.vue` wird zum Editorial-Blueprint.
- `FeaturedCard`/`TrendingCard` werden in eine gemeinsame `SwissStoryCard`-API ueberfuehrt.
- `join`/`showcase`/`login` werden auf denselben Surface-, Border- und Typo-Regeln harmonisiert.
- `index` bleibt zunaechst `Lab/Experimental`, nicht System-Default.

## 7) Varianten-Mapping fuer Systementscheidungen (A-E)

Explorationsstatus:
- A-E bleiben aktiv als Vergleichsraum.
- Dieses Konzept priorisiert nur die produktive Richtung, ohne Exploration abzuschneiden.

1. Variante A (Swiss Editorial Classic)
- Primarer Kandidat fuer Editorial-Default.
- Staerken: Autoritaet, klare Hierarchie, starke Nachrichten-Anmutung.

2. Variante B (Neo Swiss Product)
- Primarer Kandidat fuer produktnahe Oberflaechen.
- Staerken: ruhige Lesbarkeit, neutrale UI-Disziplin, Conversion-Fit.

3. Variante C (Swiss Expanded Signal)
- Substil fuer starke Signal-/Hero-Momente.
- Staerken: hohe visuelle Durchsetzung, markante Display-Wirkung.

4. Variante D (Swiss Soft Signal)
- Optionaler humanerer Substil fuer Longform-nahe Kontexte.
- Staerken: weichere Tonalitaet, entspannter Einstieg in Textstrecken.

5. Variante E (Swiss Expanded Signal, calmer rails)
- Kontrollierter Gegencheck zu C.
- Staerken: aehnlicher Impact wie C, aber ruhigere Meta-/Quote-Wirkung.

## 8) Seitenklassifizierung (ab sofort)

### Productive System Surface

- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/section.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/blog/index.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/join.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/showcase.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/login.vue`

### Lab / Experimental (nicht tonangebend fuer V1)

- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/index.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/three.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/liquid.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/glass.vue`

## 9) Do / Do Not fuer Swiss V1

Do:
- max. 2 Kernfamilien + 1 Meta-Family pro Variante
- harte Kontraste, klare Divider, grosszuegige Weissraeume
- asymmetrische Layouts mit festen Rasterregeln

Do Not:
- beliebige Fontwechsel je Komponente
- grosse Farbverlaeufe als primaere Flaechenlogik
- permanente Effekt-Hintergruende in Reading-Sections
- neue Component-Styles ohne Tokenbindung

## 10) Konkreter Pilot-Plan fuer die naechste Runde

1. **Variante A als Hauptkandidat** in `section` + `blog` testen
2. **Variante B** in `join` + `login` als Conversion-Check testen
3. Danach Entscheidung:
   - A+B kombiniert als finales System
   - C nur als Hero-Substyle fuer ausgewahlte Module

## 11) Ergebnisentscheidung (Empfohlene Richtung)

Wenn du heute festlegen willst:

1. **System-Default:** Konzept A (Swiss Editorial Classic)
2. **Produktseiten-Overlay:** Konzept B (Neo Swiss Product)
3. **Experimental Add-on:** Konzept C nur selektiv

Damit bekommst du:
- eine klare Swiss-Basis
- weniger Stilbruch zwischen Seiten
- genug gestalterische Flexibilitaet fuer Hero-Momente ohne Systemverlust

## 12) Hinweis und Kontextbasis (nachgelagert)

Hinweis:
- Dieses Dokument bleibt das finale Konzeptdokument.
- Die laufende Exploration (A-E, Scorecards, Field Notes) bleibt in den separaten Swiss-Dateien dokumentiert:
  - `/Users/flame/Developer/Projects/personal-page/docs/system/swiss/SWISS-STYLE.md`
  - `/Users/flame/Developer/Projects/personal-page/docs/system/swiss/SWISS-SCORECARD.md`
  - `/Users/flame/Developer/Projects/personal-page/docs/system/swiss/SWISS-TYPO-TOKENS.md`
  - `/Users/flame/Developer/Projects/personal-page/docs/system/swiss/SWISS-GRID-RULES.md`

Kontext und Basis:
- Dieses Konzept folgt Swiss Style als oberster Leitlinie fuer das produktive System.
- Analysierte Quellen:
  - `/Users/flame/Developer/Projects/personal-page/ai-agent-skills/skills/wednesday-design/SKILL.md`
  - `/Users/flame/Developer/Projects/personal-page/ai-agent-skills/skills/wednesday-design/references/TOKENS.md`
  - `/Users/flame/Developer/Projects/personal-page/ai-agent-skills/skills/wednesday-design/references/COMPONENTS.md`
  - `/Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md`
  - `/Users/flame/Developer/Projects/personal-page/docs/general/PRODUCT.md`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/index.vue`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/section.vue`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/font.vue`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/Section/NewsSection/NewsSection.vue`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/fonts/main.scss`
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/data/fonts.model.ts`

Zusatz:
- Cursor-Skills im Projekt wurden geprueft (`.cursor/skills/*`). Sie sind technisch stark (Nuxt/Vue/UnoCSS), liefern aber keine harte gestalterische Swiss-Leitlinie.
