# SWISS GRID RULES (Exploration Guide)

Stand: 2026-02-14
Status: Leitfaden fuer Exploration, keine finalen Layout-Contracts.

Ziel: Layout-Drift verhindern, damit Variantenvergleich A-E typografisch fair bleibt.

## 1) Kernregel fuer diese Phase

- Layout bleibt stabil.
- Getestet werden nur Typografie, Rhythmus und feine Spacing-Unterschiede.

## 2) Weiche Rasterregeln

1. Gemeinsame Struktur beibehalten
- Alle Varianten nutzen dieselbe Modulreihenfolge.
- Keine Variante bekommt exklusive Sektionen.

2. Asymmetrie nur innerhalb bekannter Muster
- Zulaessig sind etablierte Verhaeltnisse (z. B. 7/5, 8/4, 1.2/0.8 aehnlich).
- Keine spontane Neuverteilung nur fuer eine Variante.

3. Vertikalrhythmus bewusst eng fuehren
- Spacing in kleinen, nachvollziehbaren Stufen halten.
- Unterschiede zwischen Varianten nur leicht staffeln, nicht springen.

4. Surfaces vergleichbar halten
- Border-Intensitaet darf variieren, Formlogik bleibt gleich.
- Keine zusaetzlichen Effekte, die eine Variante "reicher" wirken lassen.

## 3) Border-Regel (verbindlich)

Bei UnoCSS immer:
- Wenn `border*` verwendet wird, immer auch `border-solid` setzen.

Beispiel:
- `border-solid border border-pureBlack/20 dark:border-pureWhite/20`

## 4) Bildmodule im Vergleich

- Identische Bilder pro Variante.
- Gleiche Crops/Ratio/Anzahl.
- Kein variantspezifisches Color-Grading oder Overlay-Experiment.

## 5) Explorative Review-Fragen

1. Erzeugt eine Variante nur durch Typo mehr Klarheit?
2. Fuehlt sich ein Modul durch Spacing ruhiger an, ohne dass die Struktur kippt?
3. Entsteht visuelle Bevorzugung durch Surface-Styling statt durch Typografie?

## 6) Noch nicht final festlegen

- Harte Spaltenverhaeltnisse pro Breakpoint als unveraenderliche Contracts
- Endgueltige Spacing-Token pro Modul
- Vollstaendige Component-Library-Regeln

Diese Punkte folgen nach der finalen Variantenentscheidung.
