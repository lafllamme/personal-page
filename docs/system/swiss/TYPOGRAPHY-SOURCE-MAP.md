# Typography Source Map (P04-MPZ01)

Stand: 2026-02-20  
Status: REFERENCE (Herkunft und Rueckverfolgung)

## Zweck
- Sicherstellen, dass die Typografie-Logik auch ohne Exploration-View nachvollziehbar bleibt.
- Klare Trennung zwischen:
  - lesbarem Contract
  - raw Datenquellen
  - Prototype-Kontext

## Source Ladder

1. **Lesbarer Contract (entscheidungsfuehrend)**
   - [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md)
   - [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)

2. **Design-System Entscheidungen (entscheidungsfuehrend)**
   - [DESIGNSYSTEM.md](./DESIGNSYSTEM.md)

3. **Raw Pack Data (Nachweis)**
   - [`docs/inspiration/designs/tokens/variant-token-packs.v1.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/variant-token-packs.v1.json)

4. **Evaluationen (Nachweis)**
   - [`docs/inspiration/designs/tokens/evaluations/phase-1-technews-benchmark.2026-02-14.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/evaluations/phase-1-technews-benchmark.2026-02-14.json)
   - [`docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/tokens/evaluations/phase-2-mp-zalando-selection.2026-02-14.json)

5. **Prototype-Kontext (kann langfristig entfallen)**
   - [`frontend/app/pages/exploration.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/pages/exploration.vue)

## P04-MPZ01 Typo Snapshot
- Display: `Druk Bold`
- Headline: `Clash Display`
- Body: `Manrope`
- Meta/UI: `Space Grotesk`
- Quote: `Libre Baskerville`
- Metric/Signal: `Zalando Sans Expanded`

## Regel bei kuenftigen Aenderungen
1. `DESIGNSYSTEM.md` aktualisieren
2. `FOUNDATION-BASELINE.md` + `COMPONENT-CONTRACT.md` angleichen
3. Runtime-Token/Shortcuts aktualisieren
4. Diese Source Map nur als Nachweis nachziehen
