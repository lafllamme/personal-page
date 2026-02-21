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

- `layout-shell-y-sm-base` + `layout-shell-y-sm-md`
- `layout-shell-y-md-base` + `layout-shell-y-md-md`
- `layout-shell-y-lg-base` + `layout-shell-y-lg-md`
- `layout-shell-y-xl-base` + `layout-shell-y-xl-md`

Warum: Gleiche Section-Typen sehen über die ganze Seite gleich aus.

### C) Content Width + Gutter (Body)
Seitliche Einrückung und Breitenbegrenzung.

Gutter:
- `layout-body-gutter-0`
- `layout-body-gutter-sm-base` + `layout-body-gutter-sm-sm`
- `layout-body-gutter-md-base` + `layout-body-gutter-md-md`
- `layout-body-gutter-lg-base` + `layout-body-gutter-lg-sm` + `layout-body-gutter-lg-md`

Aktive Progression:
- `sm`: 16px -> 20px
- `md`: 16px -> 32px
- `lg`: 20px -> 24px -> 48px

Max-Width:
- `layout-body-max-5xl`
- `layout-body-max-6xl`
- `layout-body-max-7xl`
- `layout-body-max-full`

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
  - `ui-l-mode-bleed-0`
  - `ui-l-mode-bleed-sm`
  - `ui-l-mode-bleed-md`
  - `ui-l-mode-bleed-lg`

## 4) Regeln, damit es nicht kippt

1. Keine freien `px-*` / `py-*` Werte in Core-Layout-Komponenten.
2. Shell/Body dürfen nur auf Spacing-Tokens mappen.
3. Komponenten-Innenabstände (z. B. Card, Button) dürfen eigene Tokens haben, aber keine harten Magic Numbers.
4. Debug-Page bleibt als visuelle QA für Spacing.
5. Uno-Schreibweise: `$token` ist Standard. `var(--token)` nur bei Ausnahmen (z. B. `calc(...)` oder nicht eindeutig parsbare Utility-Fälle).

## 5) Nächster Schritt

1. `PageContainer` als Transition-Layer markieren (nicht als neue Source of Truth ausbauen).
2. `design-system.vue` mittelfristig von `DsSectionContainer` auf direkte `DsSectionShell` + `DsSectionBody` Komposition migrieren.
3. Debug-Page weiter als visuelle QA nutzen und nur Tokens feinjustieren, keine Hardcoded-Werte.
