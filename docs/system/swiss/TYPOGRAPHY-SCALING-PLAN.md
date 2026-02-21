# Typography Scaling Plan (Container + Clamp)

Stand: 2026-02-20  
Status: PROPOSAL (zur Abnahme, danach in Runtime umsetzen)

## Ziel
- Responsives, kontrolliertes Typografie-Scaling ohne globalen `body`-Override.
- Konsistente Hierarchie zwischen `display`, `headline`, `body`, `meta`, `signal`.
- Stabiler UI-Look fuer Controls (Buttons/Inputs), auch bei Viewportwechsel.

## Kernentscheidung
- **Kein globales `body { font-size: ... }` Scaling**.
- Scaling in 2 Ebenen:
  1. **Layout-Container-Tokens** fuer Breite/Rhythmus
  2. **Role-basierte Typo-Tokens** (nur Display/Headline fluid per `clamp`)

## Container-System

Ein Basissystem mit 3 Nutzungsmodi:
- `container` (default)
- `container-narrow` (textlastig)
- `container-wide` (hero/media)

Alle basieren auf demselben Root-Containerwert:

```css
:root {
  --size-container-ideal: 1440;
  --size-container-min: 320px;
  --size-container-max: 1920px;
  --size-container: clamp(var(--size-container-min), 100vw, var(--size-container-max));
}

.container {
  max-width: var(--size-container);
}

.container-narrow {
  max-width: calc(var(--size-container) * 0.8);
}

.container-wide {
  max-width: calc(var(--size-container) * 1.1);
}
```

## Typo-Scaling-Regel

### Fluid (mit `clamp`)
- `display-*`
- `headline-lg`, `headline-md`

### Stabil / Near-Stable
- `body-*`
- `meta-*`
- `signal-*`
- `button-*` / Controls

## Beispielwerte (Startpunkt)

```css
:root {
  --type-display-xl: clamp(2.4rem, 6.2vw, 5rem);
  --type-display-lg: clamp(1.8rem, 4.2vw, 3.2rem);

  --type-headline-lg: clamp(1.4rem, 2.4vw, 2rem);
  --type-headline-md: clamp(1.15rem, 1.2vw, 1.35rem);

  --type-body-md: 0.875rem;
  --type-body-sm: 0.75rem;

  --type-meta-sm: 11px;
  --type-meta-xs: 10px;
}
```

## Mapping auf Rollen

| Rolle | Token | Verhalten |
|---|---|---|
| Display XL | `--type-display-xl` | fluid |
| Display LG | `--type-display-lg` | fluid |
| Headline LG | `--type-headline-lg` | fluid |
| Headline MD | `--type-headline-md` | fluid (moderat) |
| Body MD | `--type-body-md` | stabil |
| Body SM | `--type-body-sm` | stabil |
| Meta SM | `--type-meta-sm` | stabil |
| Meta XS | `--type-meta-xs` | stabil |

## Button-Size-Mapping (nach Foundation)

| Button Size | Textrolle | Tracking |
|---|---|---|
| `sm` | `meta-xs` | `0.14em` |
| `md` | `meta-sm` | `0.16em` |
| `lg` | `meta-sm` | `0.18em` |

## Umsetzungsschritte
1. Container-Tokens in UnoCSS/Theme verankern.
2. Typo-Tokens fuer fluid/stabil finalisieren.
3. `DsTypography` auf Token-Namen mappen (Storybook Matrix als Referenz).
4. Danach Buttons/Inputs auf finale Type-Scale mappen.
5. Viewport-Review in Storybook (`mobile/tablet/desktop/wide`).

## Abnahmekriterien
- Display/Headline wachsen sichtbar, aber kontrolliert.
- Body/Meta bleiben lesbar und stabil.
- Buttons behalten konstante visuelle Balance ueber Viewports.
- Kein globaler Stilbruch durch `body`-Scaling.

## Referenzen
- [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md)
- [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)
- [DESIGNSYSTEM.md](./DESIGNSYSTEM.md)
- [DOC-ARCHITECTURE-ROADMAP.md](./DOC-ARCHITECTURE-ROADMAP.md)
