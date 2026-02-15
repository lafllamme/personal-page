# DESIGNSYSTEM (P04-MPZ01 + RedXT)

Stand: 2026-02-14  
Status: Single Source of Truth fuer den naechsten Komponentenbau
Hinweis: Wir sind aktuell aktiv dabei, das Design-System iterativ zu schreiben und zu verfeinern.

## 1) Scope
- Exploration-Views bleiben Referenz/Test, nicht Build-Quelle.
- Build-Basis ist:
  - Winner: `P04-MPZ01`
  - Accent-System: `Radix Teal 9/11` (RedXT-Kombo)

## 2) Verbindliche Stilregeln
- Grundflaechen: nur `pureBlack` / `pureWhite`.
- Accent nur als Signal:
  - primary CTA
  - active state (chips/tabs/toggles)
  - focus ring
  - status marker
- Keine zusaetzlichen Flaechenfarbwelten im Grundlayout.

## 3) Layout- und Rhythmusregeln
- Section-basiertes System, pro Abschnitt klare Rolle.
- `Section` kann `min-height: 100dvh` nutzen, aber nicht global erzwingen.
- `PageContainer` steuert max-width + responsive paddings.
- Grid ist pro Section explizit entscheidbar (kein Zwangsgrid).
- Vertikaler Rhythmus bleibt im 8pt-System.

## 4) Komponentenstart (verbindliche Reihenfolge)
1. `Button` (`primary`, `secondary`, `tertiary`, `link` + states)
2. `TextLink`
3. `Container` (`Section`, `PageContainer`)
4. `Card` (base/elevated)
5. `Accordion`
6. `Toggle`
7. `ExpandableCard`

## 5) Visuelle Zielcharakteristik
- Nicht generisch, sondern:
  - dense editorial hierarchy
  - klare meta-rails
  - hoher Kontrast
  - kontrollierte, funktionale Signalfarbe
- Inspirationsanker: `cloth`, `run`, `estate`, `brand`, plus strukturierende Inputs aus `construct/construct-2`.

## 6) Aktive Referenzen
- Swiss Style Guidelines (allgemein): [SWISS-STYLE-GUIDELINES.md](./SWISS-STYLE-GUIDELINES.md)
- Palette: [PALETTE-RADIX-TEAL-911.md](../ui/PALETTE-RADIX-TEAL-911.md)
- Component-Spec-Standard: [COMPONENT-SPEC-STANDARD.md](./COMPONENT-SPEC-STANDARD.md)
- Komponentenmatrix: [COMPONENT-MATRIX.md](../../inspiration/designs/COMPONENT-MATRIX.md)
- Inspiration (Inspo-Merge): [INSPIRATION.md](../../inspiration/designs/INSPIRATION.md)
- Token-Herkunft: [TOKEN-REFERENZEN.md](../../inspiration/designs/TOKEN-REFERENZEN.md)
- Variant-Track: [VARIANT-TOKEN-PACKS.md](../../inspiration/designs/VARIANT-TOKEN-PACKS.md)

## 7) Decision Snapshot (kompakt)
- Winner-Logik:
  - Basisgewinner: `P04` (Swiss Signal Orange, Phase 1)
  - Finaler Winner-Stand: `P04-MPZ01` (Zalando Sans Expanded als Signalrolle integriert)
- Aktiver Farbentscheid:
  - Basissystem bleibt Pure Black / Pure White
  - Aktiver Akzent: `Radix Teal 9/11` (`#12A594` light / `#0BD8B6` dark)
- Typografieentscheid zu Zalando:
  - `Clash Display` bleibt Headline-Lead.
  - `Zalando Sans Expanded` wird als `Signal`-Typo genutzt:
    - Kennzahlen (Market Pulse / Stats),
    - kurze Campaign-Stamps,
    - Section IDs / numerische Marker.
  - Kein Ersatz fuer Body oder klassische Fliesstext-Headline.
- Prozessentscheid:
  - Exploration bleibt Referenz, Build erfolgt nur aus diesem Dokument + aktiven Referenzen
  - Neue Komponenten werden nur mit `Font`, `Weight`, `Intention`, `Color` spezifiziert

## 8) Was wir bewusst nicht mehr pflegen
- A-E Exploration-Rahmen als System-Definition.
- Alte Swiss-Guide-Doppelungen mit gleichem Inhalt in mehreren Dateien.
- Generische UI-Kit-Ansatzdateien ohne P04-MPZ01-Stilbindung.

## 9) Storybook + UnoCSS Guardrail (verbindlich)
- Keine JS-String-Generierung fuer Klassen oder Markup in Stories.
- Keine Template-String-Loops fuer Matrix-Layouts (`.map(...)` + HTML-Strings).
- Story-Markup fuer Vergleichsblöcke immer als echte `.vue`-Komponente ausschreiben.
- Grund: UnoCSS kann dynamisch erzeugte Klassen nicht zuverlässig extrahieren; fehlende Klassen fuehren zu kaputtem Layout (z. B. fehlende `grid-cols`, `items-start`).
