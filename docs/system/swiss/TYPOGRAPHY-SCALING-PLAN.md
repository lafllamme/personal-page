# Typography Scaling Plan

Stand: 2026-02-22  
Status: IMPLEMENTED (Runtime + Tokens live)

## Ziel
- Voll fluide Typografie (`xs` bis `4xl`) ohne globales `body`-Scaling.
- Konsistente Rollenlogik fuer Design System Komponenten.
- Single Source fuer Naming, Mapping und UnoCSS-Syntax.

## Schreibregel (UnoCSS)
- In Klassen/Shortcuts immer `$token` nutzen.
- `var(--token)` nur in Token-Definitionen (`palette.ts`) oder Spezialfaellen (`calc()`).

---

## 1) Aktueller Runtime-Stand

Dateien:
- [/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue](/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue)
- [/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.typography.ts](/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.typography.ts)
- [/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts](/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)
- [/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts](/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts)

### 1.1 Size Scale (fluid, global)

| Size | Wert | Leading |
|---|---|---|
| `xs` | `clamp(0.75rem,0.68rem+0.22vw,0.875rem)` | `1.35` |
| `sm` | `clamp(0.875rem,0.8rem+0.3vw,1rem)` | `1.45` |
| `md` | `clamp(1rem,0.92rem+0.38vw,1.125rem)` | `1.55` |
| `lg` | `clamp(1.125rem,1rem+0.52vw,1.375rem)` | `1.35` |
| `xl` | `clamp(1.375rem,1.12rem+1.1vw,2rem)` | `1.12` |
| `2xl` | `clamp(1.75rem,1.35rem+1.9vw,3rem)` | `1.02` |
| `3xl` | `clamp(2.25rem,1.65rem+3vw,4.75rem)` | `0.95` |
| `4xl` | `clamp(2.6rem,1.85rem+4.1vw,6.2rem)` | `0.92` |

### 1.2 Display Family Split (Druk)

| Display Size | Family |
|---|---|
| `xs`, `sm` | `font-druk-text-bold` (`DrukTextBoldTrial`) |
| `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` | `font-druk-bold` (`DrukBoldTrial`) |

### 1.3 Display Tracking Curve (kuratiert)

Designregel:
- Sweetspot bei `md` (`0.05em`)
- Große Stufen werden nicht weiter gespreizt

| Size | Tracking (mobile / md) |
|---|---|
| `xs` | `0.042em / 0.044em` |
| `sm` | `0.046em / 0.048em` |
| `md` | `0.05em / 0.052em` |
| `lg` | `0.049em / 0.051em` |
| `xl` | `0.048em / 0.05em` |
| `2xl` | `0.046em / 0.048em` |
| `3xl` | `0.044em / 0.046em` |
| `4xl` | `0.042em / 0.044em` |

### 1.4 Meta Tracking Curve (size-basiert, negativ/tighter)

| Size | Tracking |
|---|---|
| `xs` | `-0.012em` |
| `sm` | `-0.013em` |
| `md` | `-0.015em` |
| `lg` | `-0.018em` |
| `xl` | `-0.02em` |
| `2xl` | `-0.022em` |
| `3xl` | `-0.024em` |
| `4xl` | `-0.025em` |

### 1.5 Weight + Italic Defaults (DsTypography)

- Role-Default Weight:
  - `display` -> `medium`
  - `headline`, `quote` -> `regular`
  - `meta` -> `medium`
  - `signal` -> `semibold`
  - `body` -> `light`
- Italic Default:
  - `quote` -> `true`
  - alle anderen Rollen -> `false`
- Runtime Overrides:
  - `weight="auto|thin|extralight|light|regular|medium|semibold|bold|extrabold|black|100..900"`
  - `:italic="true|false"`

- Role Weight Support (guarded):
  - `display` -> `500|700|800|900`
  - `headline` -> `200|300|400|500|700`
  - `body` -> `200|300|400|500|600|700|800`
  - `meta` -> `300|400|500|600|700`
  - `quote` -> `400|700`
  - `signal` -> `200|300|400|500|600|700|800|900`

Hinweis:
- Nicht verfuegbare Weights fallen nicht hart auf den Rollen-Default zurueck, sondern auf den naechsten verfuegbaren Schnitt der Rolle (z. B. `display: 600 -> 500`).

### 1.6 Runtime-Verwendung (Default vs. Override)

Designregel:
- Wenn `weight` nicht gesetzt ist, greift immer der Rollen-Default.
- Overrides nur fuer konkrete UI-Cases setzen (z. B. Hero-Headline, KPI, Badge), nicht pauschal.

Beispiel (Vue):

```vue
<!-- 1) Default-Verhalten: Headline nutzt automatisch den Rollen-Default (regular / 400) -->
<DsTypography as="h2" role="headline" size="lg">
  Default Headline
</DsTypography>

<!-- 2) Gezielter Override: gleicher Token, aber bewusster Weight-Boost -->
<DsTypography as="h2" role="headline" size="lg" weight="semibold">
  Emphasized Headline
</DsTypography>

<!-- 3) Numeric Override ist ebenfalls erlaubt -->
<DsTypography as="p" role="meta" size="sm" weight="700" uppercase>
  Meta Label Strong
</DsTypography>
```

---

## 2) Naming (final fuer Token Layer)

### 2.1 Foundation Tokens

- Size:
  - `type-size-xs`, `type-size-sm`, `type-size-md`, `type-size-lg`
  - `type-size-xl`, `type-size-2xl`, `type-size-3xl`, `type-size-4xl`
- Leading:
  - `type-leading-xs`, `type-leading-sm`, `type-leading-md`, `type-leading-lg`
  - `type-leading-xl`, `type-leading-2xl`, `type-leading-3xl`, `type-leading-4xl`
- Display tracking:
  - `type-track-display-xs` ... `type-track-display-4xl`
  - optional breakpoint tokens: `type-track-display-xs-md` ... `type-track-display-4xl-md`
- Meta tracking:
  - `type-track-meta-xs` ... `type-track-meta-4xl`
- Families (Uno Theme):
  - `font-display-hero` -> `DrukBoldTrial`
  - `font-display-compact` -> `DrukTextBoldTrial`
  - `font-headline` -> `ClashDisplay-Regular`
  - `font-body` -> `Manrope`
  - `font-meta` -> `Space Grotesk`
  - `font-quote` -> `Libre Baskerville`
  - `font-signal` -> `Zalando Sans Expanded`

### 2.2 Semantic Shortcuts (Runtime)

- `type-display-xs` ... `type-display-4xl`
- `type-headline-xs` ... `type-headline-4xl`
- `type-body-xs` ... `type-body-4xl`
- `type-meta-xs` ... `type-meta-4xl`
- `type-quote-xs` ... `type-quote-4xl`
- `type-signal-xs` ... `type-signal-4xl`

---

## 3) Umsetzung (abgeschlossen)

1. `palette.ts`
- `typographyTokens` als Foundation Tokens aktiv.
- `fontFamily` Mapping für Uno Theme aktiv (`typographyTheme.fontFamily`).

2. `shortcuts.typography.ts`
- `type-*` Rollen aktiv.
- Display-Family-Split + Display-Tracking im Shortcut aktiv.

3. `shortcuts.ts`
- `shortcuts.typography.ts` registriert.

4. `DsTypography.vue`
- harte Klassen entfernt.
- Mapping auf `type-${role}-${size}` aktiv.

5. QA
- `design-system-debug.vue`
- `DsTypography.stories.ts`

---

## 4) Abnahmekriterien

- Gleiche Werte in Runtime und Tokens (kein Drift).
- Display-Family-Split bleibt aktiv.
- Display-Tracking bleibt kuratiert (kein High-Size-Aufspreizen).
- Alle Typo-Varianten (`xs` bis `4xl`) in Debug und Storybook sichtbar.
- Keine Legacy-Namensreste (`ui-type-*`) im Runtime-Pfad.

## Referenzen
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/FOUNDATION-BASELINE.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/FOUNDATION-BASELINE.md)
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/COMPONENT-CONTRACT.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/COMPONENT-CONTRACT.md)
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md)
- [/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue](/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue)
