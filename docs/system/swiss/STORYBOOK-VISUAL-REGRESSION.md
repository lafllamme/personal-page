# Storybook Visual Regression (lokal, Playwright)

Stand: 2026-03-15  
Status: aktiv

## Ziel
- Lokale visuelle Regressionstests ohne externen Service.
- Storybook bleibt die Quelle fuer UI-Referenzzustände.
- Baseline-Snapshots sind versioniert und PR-reviewbar.

## Scope (v1)
- Nur Stories unter `Design System/*`.
- Referenz-Demofaelle:
  - `DsButton` -> `Visual Regression / Baseline`
  - `DsInput` -> `State / Error`

## Kommandos
Alle Befehle laufen im Frontend-Paket:

```bash
pnpm --filter @tec/frontend run vr:update
pnpm --filter @tec/frontend run vr:test
pnpm --filter @tec/frontend run vr:report
pnpm --filter @tec/frontend run vr:clean
```

- `vr:update`: Storybook build + Snapshots neu erzeugen/aktualisieren.
- `vr:test`: Storybook build + Vergleich gegen vorhandene Baselines.
- `vr:report`: HTML-Report oeffnen.
- `vr:clean`: lokale Runtime-Artefakte entfernen.

## Ordner-Regeln
- versioniert:
  - `frontend/tests/visual/__screenshots__`
- nicht versioniert:
  - `frontend/tests/visual/playwright-report`
  - `frontend/tests/visual/test-results`

## Determinismus
- Visual-Runs setzen `VITE_VR_TEST_MODE=1`.
- Storybook `snapshotMode` deaktiviert Animationen/Transitions global.
- Playwright nutzt feste Viewport-/Motion-Settings und wartet auf `document.fonts.ready`.

## Team-Workflow
1. `vr:test` vor Aenderungen (sauberer Ausgangspunkt).
2. Nach UI-Aenderung wieder `vr:test`.
3. Gewollte Unterschiede via `vr:update` uebernehmen.
4. Geaenderte Baselines committen.
