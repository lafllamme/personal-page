# Lenis Reference (Project Context)

## Current Usage In This Repo

- Global wrapper: [`frontend/app/app.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/app.vue) uses `<VueLenis root :options="lenisOptions" />`
- Current options in app shell:
  - `autoRaf: true`
  - `smoothWheel: true`
  - `syncTouch: false`
  - `autoResize: true`
- Existing "prevent smoothing" markers are used in the UI via `data-lenis-prevent`.

## Why This Matters For Scroll Animations

If Lenis and another animation engine both run frame loops independently, motion can feel less smooth or desynced.

For scroll-linked animations (Motion, GSAP, Framer Motion), prefer one shared update loop for both systems.

## Official References

- Lenis main docs (settings, events, considerations):
  - https://github.com/darkroomengineering/lenis#readme
- lenis/vue usage and hooks:
  - https://github.com/darkroomengineering/lenis/blob/main/packages/vue/README.md
- lenis/react examples, including Framer Motion shared-frame integration:
  - https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md

## Integration Notes For Agents

1. If integrating Lenis with another frame-driven animation system, set Lenis to manual RAF:
   - `autoRaf: false`
2. Drive `lenis.raf(time)` from the animation engine's frame ticker.
3. Keep one source of truth for timing to reduce jitter.
4. For nested scrollable areas, prefer `data-lenis-prevent` or Lenis `prevent` callback over enabling `allowNestedScroll`.
5. Re-evaluate `syncTouch` for mobile feel tests; Lenis docs note caveats on older iOS versions.
