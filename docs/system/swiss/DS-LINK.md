# DS Link (Default + Hover Underline)

Stand: 2026-02-25  
Status: aktiv

## Ziel
- Eine Link-Komponente mit zwei klaren Modi:
  - `underline="always"` (Default): Link ist im Content sofort erkennbar.
  - `underline="hover"`: Underline erscheint erst bei Hover/Fokus (z. B. Footer/Nav).
- Varianten analog zu Buttons:
  - `variant="default"` (neutral)
  - `variant="accent"` (toxic colorway)

## Komponente
- Runtime-Komponente: [`frontend/app/components/ui/DesignSystem/DsLink.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsLink.vue)
- Props:
  - `href?: string` (Default `#`)
  - `to?: string` (Default leer, aktiviert interne Nuxt-Navigation)
  - `text?: string`
  - `variant?: 'default' | 'accent'` (Default `default`)
  - `size?: 'sm' | 'md' | 'lg'` (Default `md`)
  - `underline?: 'always' | 'hover'` (Default `always`)
  - `external?: boolean` (Default `false`, zeigt rechts ein External-Icon)
- Render-Regel:
  - `to` gesetzt -> `NuxtLink`
  - sonst -> `<a>`
- Storybook-Referenz: [STUBBING.md](./STUBBING.md)

## Size System
- `sm` = `meta / xs` fuer Footer, Utility-Links, kompakte Nav
- `md` = `meta / sm` als Default-Variante
- `lg` = `meta / md` fuer prominentere CTA-Links und Section-Links
- Underline-Geometrie skaliert pro Groesse mit, damit `sm` nicht zu schwer und `lg` nicht zu filigran wirkt

## UnoCSS Tokenisierung
- Link-Shortcuts:
  - `ui-link-base`
  - `ui-link-sm`
  - `ui-link-md`
  - `ui-link-lg`
  - `ui-link-external`
  - `ui-link-external-text`
  - `ui-link-external-text-underline-hover`
  - `ui-link-external-text-underline-always`
  - `ui-link-external-arrow`
  - `ui-link-external-arrow-default`
  - `ui-link-external-arrow-accent`
  - `ui-link-variant-default`
  - `ui-link-variant-default-external`
  - `ui-link-variant-accent`
  - `ui-link-variant-accent-external`
  - `ui-link-underline-hover` (L1 Sweep)
  - `ui-link-underline-always` (always visible, hover runs line out; re-enters on mouseout)
- Datei: [`frontend/app/assets/unocss/shortcuts.link.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.link.ts)

## Motion Tokens
- `motion-underline-duration`
- `motion-underline-ease`
- `motion-link-underline-offset`
- `motion-link-underline-thickness`
- `motion-link-stagger-line-duration`
- `motion-link-stagger-line-ease`
- `motion-link-stagger-arrow-duration`
- `motion-link-stagger-arrow-ease`
- `motion-link-stagger-arrow-delay`
- Datei: [`frontend/app/assets/unocss/palette.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)

## Color Token
- `color-link-hover`:
  - light: `sand-10`
  - dark: `sand-10`
- `color-link-accent`:
  - light: `toxic-11`
  - dark: `toxic-11`
- `color-link-accent-hover`:
  - light: `toxic-12`
  - dark: `toxic-9`
- `color-link-arrow-default-idle`:
  - light: `sand-11`
  - dark: `sand-11`
- `color-link-arrow-accent-idle`:
  - light: `toxic-10`
  - dark: `toxic-10`

## Timing-Referenz
- Osmo-Pattern orientiert an:
  - `duration-default: 0.6s`
  - `cubic-default: cubic-bezier(0.625, 0.05, 0, 1)`

## External Link
- `external=true` bleibt Teil von `DsLink`, keine separate Komponente.
- Der Arrow rendert ueber [`DsIcon.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsIcon.vue) mit `variant="inherit"`.
- Der Text traegt die Underline separat, damit das Stagger-Verhalten sauber getrennt laeuft.
- Der Root-Link wechselt bei `external` nicht global die Hover-Farbe; Text und Arrow werden getrennt orchestriert.
- `underline="always"`:
  - der Text-Underline zieht sich auf Hover/Fokus zuerst zurueck
  - danach startet der Arrow diagonal nach oben rechts
  - der Arrow hat vorher einen subtileren Ton und geht dann auf den aktiven Zielton
- `underline="hover"`:
  - der Text-Underline erscheint normal auf Hover/Fokus
  - der Arrow nutzt dieselbe verzogene Motion
  - der Arrow hat auch hier einen eigenen Idle-/Hover-Ton
