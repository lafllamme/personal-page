# Token Layers (Active)

Status: verbindliche Naming-Konvention fuer den aktuellen UI-Build.

## 1) Foundation
- Zweck: rohe Farbquellen ohne UI-Bedeutung.
- Beispiele:
  - `pure-black`, `pure-white`
  - `toxic-1 ... toxic-12`
- Regel: keine Component-Namen, keine States.

## 2) Semantic
- Zweck: globale UI-Rollen, komponentenunabhaengig.
- Beispiele:
  - `color-primary`, `color-inverse`, `color-accent`
  - `background-solid`, `background-overlay-hover`
  - `border-primary`, `ring-default-primary`
- Regel: beschreibt Bedeutung/Rolle, nicht Komponente.

## 3) Variant
- Zweck: wiederverwendbare interaktive Muster fuer Intent + Style.
- Prefix: `v-`
- Schema: `v-{intent}-{style}` plus State-Suffixe.
- Beispiele:
  - `v-neutral-solid`
  - `v-accent-outline`
  - `v-neutral-ghost-hover`
  - `v-accent-soft-focus`
- Regel: darf in Button, Card, Accordion, Tabs etc. verwendet werden.

## 4) Structure
- Zweck: optionale strukturelle Klassen fuer wiederkehrende UI-Huellen.
- Prefix: `ui-`
- Aktiver Name:
  - `ui-button-base` (button-spezifische Grundhuelle)
- Regel: nur fuer echte Strukturwiederholung einsetzen, nicht fuer reine Farbzustande.

## Warum dieses Modell
- Foundation bleibt stabil als Single Source of Truth.
- Semantic bleibt lesbar fuer produktweite Rollen.
- Variant reduziert Duplikate fuer interaktive States ueber mehrere Komponenten hinweg.

## Guardrails
- Keine neuen `button-*` Farb-Tokens in `palette.ts`.
- Neue interaktive Patterns starten mit `v-*`.
- Bei neuen Varianten zuerst Intent/Style in `v-*` erweitern, dann in Komponenten mappen.
- Komponentenspezifische Struktur-Shortcuts (z. B. `ui-button-base`) liegen getrennt von Variants.
