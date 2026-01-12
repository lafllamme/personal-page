# Context handoff: Liquid Glass Blob (TresJS + Three.js + Rapier)

We have a Vue SFC (`<script setup lang="ts">`) that renders a “liquid glass / metaballs” blob using:

- `@tresjs/core` (`TresCanvas`, `TresPerspectiveCamera`, lights)
- `three` + `MarchingCubes` (`three/examples/jsm/objects/MarchingCubes.js`)
- `@dimforge/rapier3d-compat` for physics (dynamic rigid bodies + a kinematic “mouse” collider)
- `@vueuse/core` for RAF loop, intersection observer visibility pause, global pointer events, DPR handling.

## Current behavior
- We spawn `N` dynamic Rapier spheres (“bodies”).
- Every frame:
    1) Raycast pointer onto an invisible plane to get a 3D `mouseTarget`
    2) Smooth with `mousePos.lerp(mouseTarget, lerp)`
    3) Move a kinematic Rapier collider to `mousePos`
    4) Step Rapier world
    5) Update forces per body (pull to center + speed/ang clamps)
    6) Convert body world positions into MarchingCubes field space (`pos * metaMapMul + offset`)
    7) Add metaballs: `addBall(x,y,z,strength,subtract,color)` and `update()`

## Key stability detail
Rapier wasm often returns temporary vec objects that must be freed. We always copy Rapier vecs into THREE `Vector3` via `readRapierVec3To()` and immediately free them before calling mutating methods (`resetForces`, `addForce`, etc.).

## Pointer handling
We use a global `window` `pointermove`/`pointerdown` and compute whether the pointer is inside the container rect, plus a deadzone near edges to avoid unwanted collisions:
- `pointerInside` and `pointerActive` determine whether mouseTarget is “parked” far away.

## New addition: Tailwind/UnoCSS settings panel
A settings panel (bottom-right) is added using Tailwind/UnoCSS utility classes (no inline styles).
It exposes parameters so we can tweak the look/feel without chatting:
- Perf: DPR cap, MarchingCubes resolution/max polys
- Field: marching scale, isolation, meta mapping multiplier, offsets
- Bodies: count, size min/max, density range, damping ranges, restitution, friction, pull ranges, speed caps, etc.
- Mouse: lerp, collider size multiplier, deadzone, parkZ, etc.
  Some settings trigger a rebuild of physics bodies/colliders or a rebuild of marching cubes.

## Repository reference
We are trying to match the “feel” (more liquid + natural shatter, less symmetric breakup, varied chunk sizes) from this repo:
https://github.com/bobbyroe/physics-liquid-glass

The other AI should:
- Inspect that repo’s implementation online (no need to clone).
- Compare parameters/approach (especially: body size distribution, damping/restitution/friction, center forces, mouse collider sizing, and how MarchingCubes isolation/strength/subtract are used).
- Help iterate using the settings panel: propose good defaults + ranges + maybe presets/export/import later.
