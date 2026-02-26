# Motion

Stand: 2026-02-23  
Status: SOURCE OF TRUTH fuer Motion-Tokens (Phase 1)

## Ziel
- Einheitliches Timing und Easing fuer Interaktionen.
- Motion bleibt funktional und ruhig (kein dekoratives Over-Animation).

## Aktive Motion-Tokens

### Secondary Sweep
- `motion-secondary-sweep-duration`: `0.32s`
- `motion-secondary-sweep-ease`: `cubic-bezier(0.22, 1, 0.36, 1)`

Einsatz:
- `secondary` (`default`, `accent`) fuer Hover / Active / Focus-Visible Fill
- Fill-Richtung: `translate-y-full` -> `translate-y-0`

### Tertiary Underline Morph
- `motion-underline-duration`: `0.6s`
- `motion-underline-ease`: `cubic-bezier(0.625, 0.05, 0, 1)`
- `motion-underline-offset`: `-0.01em`
- `motion-underline-thickness`: `0.125em`

Einsatz:
- `tertiary` (`default`, `accent`) fuer Underline/Morph-Interaktion

### Primary Rotate (Default)
- Default fuer `primary` (`default`, `accent`): `animation="rotate"`.
- Pattern: 2 Label-Layer, Rotation per GSAP, Trigger auf Button-Hover/Fokus.
- Osmo-nahe Geometrie via y-origin Tokens:
  - `motion-primary-rotate-origin-y-sm`
  - `motion-primary-rotate-origin-y-md`
  - `motion-primary-rotate-origin-y-lg`
  - plus `motion-primary-rotate-angle|duration|stagger`
- Guardrail: keine Primary-only Outer-Size-Overrides (Height/Padding bleiben ueber `ui-button-sm|md|lg` vereinheitlicht).

### Primary Decrypted Text (Optional)
- Aktiv nur mit `animation="decrypt"`.
- Config ueber `decrypt` Objekt in `DsButton`:
  - `speed`: `50ms`
  - `maxIterations`: `10`
  - `sequential`: `true`
  - `revealDirection`: `start`
  - `animateOn`: `both`
  - `useOriginalCharsOnly`: `false`

Einsatz:
- `primary` Label-Reveal via `DsDecryptedText`
- Hover/Fokus-Trigger auf Button-Ebene (nicht nur Text-Span)

## Richtlinien
- Hover und Focus-Visible sollen sich in der Richtung konsistent anfuehlen.
- Active bleibt ein kurzer Press-State (kein zweiter komplexer Motion-Track).
- Neue Motion-Tokens nur in `palette.ts` anlegen, nicht inline in Komponenten.

## Runtime-Quellen
- `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.variants.ts`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.button.ts`
