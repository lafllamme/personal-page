# Uno Token Naming (Runtime Note)

Status: Runtime-Notiz fuer UnoCSS.  
Verbindlicher Contract liegt in:
- [`docs/system/ui/TOKEN-LAYERS.md`](file:///Users/flame/Developer/Projects/personal-page/docs/system/ui/TOKEN-LAYERS.md)

## Kurzregeln fuer Implementierung

- In UnoCSS nur statische Klassen verwenden.
- Keine dynamisch gebauten Klassenstrings.
- Varianten auf voll ausgeschriebene Klassen mappen.
- Struktur-Shortcuts in `shortcuts.button.ts`.
- Interaktions-Varianten in `shortcuts.variants.ts`.

## Syntax-Hinweis

- Tokenverwendung in Uno-Shortcuts:
  - `color-$color-primary`
  - `bg-$bg-solid`
  - `border-$border-accent`
  - `bg-$toxic-4`
