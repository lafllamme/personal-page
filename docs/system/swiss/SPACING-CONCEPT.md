# Spacing Concept (Draft)

## Ziel
Wir wollen ein Spacing-System, das:
- konsistent ist (immer gleiche Abstände für gleiche Situationen),
- schnell nutzbar ist (klare Tokens statt freie Werte),
- skalierbar ist (wenn wir neue Komponenten bauen, bleibt alles im gleichen Raster).

## 1) Was wir wirklich brauchen

### A) Foundation Spacing (Basisraster)
Das sind die rohen Größen, aus denen alles andere gebaut wird.

Empfohlene Stufen:
- `space-1` = 4px
- `space-2` = 8px
- `space-3` = 12px
- `space-4` = 16px
- `space-5` = 20px
- `space-6` = 24px
- `space-8` = 32px
- `space-10` = 40px
- `space-12` = 48px
- `space-14` = 56px
- `space-16` = 64px
- `space-20` = 80px

Warum: Das deckt UI-Details, Cards, Sections und Hero-Abstände sauber ab.

### B) Section Vertical Rhythm (Shell)
Abstände oben/unten pro Section-Level.

- `section-shell-y-sm`
- `section-shell-y-md`
- `section-shell-y-lg`
- `section-shell-y-xl`

Warum: Gleiche Section-Typen sehen über die ganze Seite gleich aus.

### C) Content Width + Gutter (Body)
Seitliche Einrückung und Breitenbegrenzung.

Gutter:
- `section-body-gutter-none`
- `section-body-gutter-sm`
- `section-body-gutter-md`
- `section-body-gutter-lg`

Max-Width:
- `section-body-max-5xl`
- `section-body-max-6xl`
- `section-body-max-7xl`
- `section-body-max-full`

Warum: Wir trennen sauber zwischen "wie breit darf Inhalt werden" und "wie viel Seitenabstand hat Inhalt".

## 2) Layout-Modi im Body

Wir bleiben bei drei Modi:
- `contained` (Default): zentriert + max width + gutter
- `fluid`: volle Breite ohne Begrenzung
- `bleed`: gezielter Ausbruch aus dem Gutter-System

Warum: Das deckt 95% aller echten Layout-Fälle ab, ohne Sonderlogik pro Komponente.

## 3) Naming (final)

Wir trennen bewusst API-Sprache und technische Shortcut-Sprache:

1. Komponenten-API (lesbar, semantisch):
- `mode="contained|fluid|bleed"`

2. UNO-Shortcuts (kurz, namespaced, konsistent):
- Shell:
  - `ui-l-shell-sm`
  - `ui-l-shell-md`
  - `ui-l-shell-lg`
  - `ui-l-shell-xl`
- Body width:
  - `ui-l-body-5xl`
  - `ui-l-body-6xl`
  - `ui-l-body-7xl`
  - `ui-l-body-full`
- Body gutter:
  - `ui-l-gx-0`
  - `ui-l-gx-sm`
  - `ui-l-gx-md`
  - `ui-l-gx-lg`
- Body mode:
  - `ui-l-mode-contained`
  - `ui-l-mode-fluid`
  - `ui-l-mode-bleed`

## 4) Regeln, damit es nicht kippt

1. Keine freien `px-*` / `py-*` Werte in Core-Layout-Komponenten.
2. Shell/Body dürfen nur auf Spacing-Tokens mappen.
3. Komponenten-Innenabstände (z. B. Card, Button) dürfen eigene Tokens haben, aber keine harten Magic Numbers.
4. Debug-Page bleibt als visuelle QA für Spacing.

## 5) Nächster Schritt

1. Tokens in `palette.ts` ergänzen (`space-12/14/16/20`, `section-shell-*`, `section-body-*`).
2. UNO-Shortcuts für Shell/Body anlegen.
3. `DsSectionShell` und `DsSectionBody` auf Token-Mapping umstellen.
4. Debug-Page prüfen und ggf. 1–2 Werte feinjustieren.
