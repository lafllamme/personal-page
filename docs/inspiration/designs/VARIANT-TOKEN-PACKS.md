# Variant Token Packs (Active)

Status: Kompaktfassung fuer den aktiven Build-Flow.

## 1) Zweck
- Dieses Dokument definiert nur den aktiven Token-Stand fuer den Komponentenbau.
- Historische Explorationen bleiben archiviert (siehe Abschnitt 5).

## 2) Aktiver Winner-Stand
- Winner Base: `P04-MPZ01`
- Profilname: `Swiss Signal (MP Zalando)`
- Akzentprofil: `Radix Teal 9/11`
- Light/Dark-Invariante ist verpflichtend.

## 3) Aktiver Token Contract

### 3.1 Typography Roles
- `font.display`: `Druk Bold`
- `font.headline`: `Clash Display`
- `font.body`: `Manrope`
- `font.meta`: `Space Grotesk`
- `font.quote`: `Libre Baskerville`
- `font.metric`: `Zalando Sans Expanded` (Kennzahlen / Market Pulse)
- `font.signal`: `Zalando Sans Expanded` (kurze Stamps, IDs, numerische Marker)

### 3.2 Spacing and Density
- `density.mode`: `dense`
- Baseline: 8pt-System
- Layout-Rhythmus via [COMPONENT-MATRIX.md](./COMPONENT-MATRIX.md)

### 3.3 Color Roles
- `color.bg.light`: `pureWhite`/off-white surface
- `color.bg.dark`: `pureBlack`
- `color.text.light`: `#111111`
- `color.text.dark`: `#F7F7F7`
- `color.accent.light`: `#12A594`
- `color.accent.dark`: `#0BD8B6`
- `color.border`: neutral, low-contrast divider

## 4) Guardrails (verbindlich)
- Kein Layout-Drift gegen die Component Matrix.
- Akzentfarbe nur als Signal (CTA, active, focus, status).
- `font.signal` (Zalando) nur kurz und dosiert, nie als Fliesstext oder Hauptheadline.
- Keine neuen Token-Familien ohne expliziten Entscheid in [DESIGNSYSTEM.md](../../system/swiss/DESIGNSYSTEM.md).

## 5) Archivierte Explorationen
- Historische Pack-Varianten und Candidate-Schritte liegen in:
  - [tokens/candidates](./tokens/candidates/)
  - [tokens/evaluations](./tokens/evaluations/)
- Diese Artefakte sind Referenzmaterial, aber keine aktive Build-Quelle.
