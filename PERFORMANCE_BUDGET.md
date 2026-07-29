# Performance Budget

Updated: 2026-07-29T16:18:11Z

## Phase 1 implementation baseline

- `npm run build` passed and generated 21 static pages.
- Phase 1 added no new production dependencies.
- Mobile conversion action bar uses existing `lucide-react` icons and CSS tokens.
- Metadata foundation uses Next.js metadata primitives only.
- Shared design tokens centralize spacing, radius, overlay, and shadow values to avoid repeated one-off CSS values in later phases.

## Phase 2 cinematic hero budget

- Phase 2 added no new production dependencies.
- The cinematic hero layer uses CSS-only overlays for spotlight, aperture, and grain effects.
- `DumbbellScene.tsx` keeps compact/mobile DPR limits and disables shadows on compact viewports.
- Reduced-motion mode uses demand rendering for the 3D canvas and static visual composition.
- WebGL-disabled verification confirmed a non-blank static fallback so the hero does not depend on a successful GPU path.
- Browser verification found no document/body horizontal overflow at 360x800, 390x844, 768x1024, 1366x768, or 1440x900 for either `/en` or `/ar`.

## Protected rendering path

`src/components/home/DumbbellScene.tsx` remains on the hardened WebGL recovery path and now includes the Phase 2 cinematic lighting adjustments.

## Phase 3 homepage scroll-story budget

- Phase 3 added no new production dependencies.
- Homepage scroll storytelling uses one server-rendered React component, CSS sticky positioning, and transform/opacity animation ranges instead of runtime scroll listeners.
- The section is marked with `data-performance-mode="css-sticky"`, `data-motion-budget="transform-opacity"`, and `data-reduced-motion-safe="true"` for regression coverage.
- Mobile viewports disable the sticky pinning and reduced-motion mode disables animations/transforms for readable static content.

## Watch items for later phases

- Monitor mobile viewport space because the fixed conversion action bar intentionally reserves bottom safe-area space on small screens.
- Monitor bundle impact before adding any new production dependency.
- Treat Google Fonts network fetches as a CI/build reliability risk if builds run without stable outbound network access.
- Resolve the existing reduced-motion Framer Motion hydration mismatch in shared route/loading motion components before treating reduced-motion console output as completely clean.
