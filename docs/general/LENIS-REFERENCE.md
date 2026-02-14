# Lenis Reference

This project uses Lenis via Nuxt module `lenis/nuxt` and component `<VueLenis />` from `lenis/vue`.

## Where Lenis Is Wired

- Nuxt module registration: `frontend/nuxt.config.ts`
- App-level wrapper: `frontend/app/app.vue`
- Lenis setup and GSAP bridge: `frontend/app/composables/useLenisOsmo.ts`
- Scroll listeners based on Lenis state: `frontend/app/composables/useHeaderVisibility.ts`

## Important Clarification

We do not use the archived GitHub package `zeokku/vue-lenis` in runtime.
The active integration is the official `lenis` package (`lenis/vue`, `lenis/nuxt`).

## Current Project Preset (Osmo-Style)

Configured in `frontend/app/app.vue`:

```ts
const { lenisOptions } = useLenisOsmo()
```

Intent:
- Match Osmo's smooth-but-direct feeling.
- Run Lenis via GSAP ticker loop (manual RAF) for deterministic timing.
- Respect nested UI controls via `data-lenis-prevent*` and widget guard.

GSAP integration used in composable:
- `lenis.on('scroll', ScrollTrigger.update)`
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- `gsap.ticker.lagSmoothing(500, 33)`

## Implementation Rule (Mandatory)

When touching Lenis in this project:

- Keep `frontend/app/app.vue` minimal (wrapper + composition only).
- Put Lenis runtime logic (watchers, ticker loop, ScrollTrigger bridge) into a dedicated composable.
- Default location: `frontend/app/composables/useLenisOsmo.ts`.
- If using Vue best-practice workflows, do not place animation orchestration directly in `app.vue`.

## Lenis Options We Can Use

Most relevant options for our setup:

- `smoothWheel: boolean`
- `lerp: number` (0..1, higher = less laggy, less smoothing)
- `duration: number` (alternative to `lerp`, usually use one or the other)
- `easing: (t) => number`
- `wheelMultiplier: number`
- `touchMultiplier: number`
- `syncTouch: boolean`
- `syncTouchLerp: number`
- `touchInertiaExponent: number`
- `autoRaf: boolean`
- `autoResize: boolean`
- `overscroll: boolean`
- `anchors: boolean | ScrollToOptions`
- `allowNestedScroll: boolean` (use with caution)
- `prevent: (node) => boolean`
- `virtualScroll: ({ deltaX, deltaY, event }) => boolean`

Structural options (for custom containers):

- `wrapper`
- `content`
- `eventsTarget`
- `orientation`
- `gestureOrientation`
- `infinite`
- `autoToggle`
- `naiveDimensions`
- `stopInertiaOnNavigate`

## Tuning Playbook

If scroll feels too strong/floaty:
- Increase `lerp` (for example `0.16 -> 0.22`)
- Reduce `wheelMultiplier` (for example `1 -> 0.85`)

If scroll feels too stiff:
- Decrease `lerp` (for example `0.2 -> 0.12`)
- Increase `wheelMultiplier` slightly

If nested panels should stay native:
- Add `data-lenis-prevent` on those containers
- Or use `prevent` option for explicit control

## Preset Suggestions

Use one of these as a start:

1. Stable (minimum effect)

```ts
{ smoothWheel: true, lerp: 0.24, wheelMultiplier: 0.85, touchMultiplier: 0.9 }
```

2. Balanced (less aggressive)

```ts
{ smoothWheel: true, lerp: 0.18, wheelMultiplier: 0.95, touchMultiplier: 0.95 }
```

3. Cinematic (stronger effect)

```ts
{ smoothWheel: true, lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1 }
```

## External Reference Baseline

Verified on February 13, 2026:

- Official Lenis docs (settings/methods): `https://github.com/darkroomengineering/lenis`
- Official Vue + Nuxt integration package: `https://www.npmjs.com/package/lenis`
- Osmo implementation benchmark: `https://www.osmo.supply/`
