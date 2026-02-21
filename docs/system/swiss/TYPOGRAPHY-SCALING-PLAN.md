# Typography Scaling Plan

Stand: 2026-02-21  
Status: READY FOR TOKENIZATION (nach finalem Review)

## Ziel
- Voll fluide Typografie (`xs` bis `4xl`) ohne globales `body`-Scaling.
- Konsistente Rollenlogik fuer Design System Komponenten.
- Single Source fuer Naming, Mapping und UnoCSS-Syntax.

## Schreibregel (UnoCSS)
- In Klassen/Shortcuts immer `$token` nutzen.
- `var(--token)` nur in Token-Definitionen (`palette.ts`) oder Spezialfaellen (`calc()`).

---

## 1) Aktueller Runtime-Stand (DsTypography)

Datei:
- [/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue](/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue)

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
- Families:
  - `type-family-display-hero` -> `font-druk-bold`
  - `type-family-display-compact` -> `font-druk-text-bold`
  - `type-family-headline` -> `font-clash-regular`
  - `type-family-body` -> `font-manrope`
  - `type-family-meta` -> `space-grotesk-regular`
  - `type-family-quote` -> `font-baskerville`
  - `type-family-signal` -> `zalando-sans-expanded`

### 2.2 Semantic Shortcuts (ui-type)

- `ui-type-display-xs` ... `ui-type-display-4xl`
- `ui-type-headline-xs` ... `ui-type-headline-4xl`
- `ui-type-body-xs` ... `ui-type-body-4xl`
- `ui-type-meta-xs` ... `ui-type-meta-4xl`
- `ui-type-quote-xs` ... `ui-type-quote-4xl`
- `ui-type-signal-xs` ... `ui-type-signal-4xl`

---

## 3) Geplante Umsetzung (nach Freigabe)

1. `palette.ts`
- `typographyTokens` als Foundation Tokens ergänzen.

2. `shortcuts.typography.ts`
- alle `ui-type-*` anlegen.
- Display-Family-Split + Display-Tracking im Shortcut lösen.

3. `shortcuts.ts`
- `shortcuts.typography.ts` registrieren.

4. `DsTypography.vue`
- harte Klassen entfernen.
- Mapping auf `ui-type-${role}-${size}` umstellen.

5. QA
- `design-system-debug.vue`
- `DsTypography.stories.ts`

---

## 4) Abnahmekriterien

- Gleiche Werte in Runtime und Tokens (kein Drift).
- Display-Family-Split bleibt aktiv.
- Display-Tracking bleibt kuratiert (kein High-Size-Aufspreizen).
- Alle Typo-Varianten (`xs` bis `4xl`) in Debug und Storybook sichtbar.

## Referenzen
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/FOUNDATION-BASELINE.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/FOUNDATION-BASELINE.md)
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/COMPONENT-CONTRACT.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/COMPONENT-CONTRACT.md)
- [/Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md](/Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md)
- [/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue](/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTypography.vue)
