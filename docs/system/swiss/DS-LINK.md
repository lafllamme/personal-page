# DS Link (Default + Hover Underline)

Stand: 2026-02-25  
Status: aktiv

## Ziel
- Eine Link-Komponente mit zwei klaren Modi:
  - `underline="always"` (Default): Link ist im Content sofort erkennbar.
  - `underline="hover"`: Underline erscheint erst bei Hover/Fokus (z. B. Footer/Nav).

## Komponente
- Runtime-Komponente: [`frontend/app/components/ui/DesignSystem/DsTextLink.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTextLink.vue)
- Props:
  - `href?: string` (Default `#`)
  - `text?: string`
  - `underline?: 'always' | 'hover'` (Default `always`)

## UnoCSS Tokenisierung
- Link-Shortcuts:
  - `ui-link-base`
  - `ui-link-underline-hover` (L1 Sweep)
  - `ui-link-underline-always` (always + animated swap)
- Datei: [`frontend/app/assets/unocss/shortcuts.link.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.link.ts)

## Motion Tokens
- `motion-underline-duration`
- `motion-underline-ease`
- `motion-link-underline-offset`
- `motion-link-underline-thickness`
- `motion-link-underline-swap-delay`
- Datei: [`frontend/app/assets/unocss/palette.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)

## Timing-Referenz
- Osmo-Pattern orientiert an:
  - `duration-default: 0.6s`
  - `cubic-default: cubic-bezier(0.625, 0.05, 0, 1)`

