# Test Results

Updated: 2026-07-29T16:18:11Z

## Phase 3 command verification

| Command | Exit code | Result |
| --- | ---: | --- |
| `npm run test:ci -- src/tests/phase3-homepage-scroll-story.test.tsx` | 0 | Passed: 1 file, 2 tests |
| `npm run test:ci -- src/tests/phase3-gallery-readiness.test.tsx` | 0 | Passed: 1 file, 2 tests |
| `npm run test:ci` | 0 | Passed: 9 files, 16 tests |
| `npm run lint` | 0 | Passed |
| `npx tsc --noEmit` | 0 | Passed |
| `npm run build` | 0 | Passed; compiled successfully and generated 21 static pages |
| `git diff --check` | 0 | Passed; Git printed line-ending warnings for markdown/report files and touched TypeScript/CSS files only |

## Phase 3 route verification

Production server route verification with `next start -p 3002` passed: `/en/gallery` and `/ar/gallery` returned HTTP 200 and contained the localized gallery readiness title, no-stock/no-invented-photo warning, and verified-logo guidance.

## Phase 3 TDD evidence

The homepage cinematic scroll-story regression was written before production implementation and failed because the homepage had no scroll-story region, performance markers, or localized training chapters. After adding the localized homepage section, CSS-only sticky/transform animation styles, responsive fallbacks, and reduced-motion overrides, the targeted test passed and is included in the full `npm run test:ci` suite.

The gallery readiness regression was written before production implementation and failed because the gallery page had no `ContentStatusNotice`. After adding localized gallery readiness copy and rendering the shared notice before the gallery grid, the targeted test passed and is included in the full `npm run test:ci` suite.

## Phase 2 command verification

| Command | Exit code | Result |
| --- | ---: | --- |
| `npm run test:ci` | 0 | Passed: 6 files, 10 tests |
| `npm run lint` | 0 | Passed |
| `npx tsc --noEmit` | 0 | Passed |
| `npm run build` | 0 | Passed; compiled successfully and generated 21 static pages |
| `git diff --check` | 0 | Passed; Git printed line-ending warnings for `HomeHero.tsx` and `DumbbellScene.tsx` only |

## Browser verification

Local dev server: `npm run dev` on `http://localhost:3000`.

| Scope | Result |
| --- | --- |
| `/en` normal responsive | Passed at 360x800, 390x844, 768x1024, 1366x768, and 1440x900 |
| `/ar` normal responsive | Passed at 360x800, 390x844, 768x1024, 1366x768, and 1440x900 |
| Headline and primary CTA | Visible immediately in normal responsive verification |
| WhatsApp CTA | `https://wa.me/96569678350` present and available; mobile action bar clickable in normal verification |
| Facilities CTA | Hero Facilities CTA points to localized `/facilities` and is clickable in normal verification |
| Horizontal overflow | No document/body horizontal overflow in normal responsive verification |
| Navigation | Desktop nav and mobile menu remain usable in normal responsive verification |
| Mobile scrolling | Responsive at 360x800, 390x844, and 768x1024 |
| Console/hydration | No normal-mode critical console, hydration, or local 500 errors on `/en` or `/ar` |
| Reduced motion | Static/readable composition; no visible infinite animations; hero and mobile CTAs available |
| WebGL fallback | WebGL-disabled browser rendered fallback image/copy with no blank hero; navigation and CTAs usable |

## TDD evidence

The Phase 2 cinematic hero regression was written before production implementation and initially failed because `[data-home-cinematic]` was missing. After implementation, the targeted test passed and is included in the full `npm run test:ci` suite.

## Notes

- The Vite test command still reports the existing advisory that `vite-tsconfig-paths` is detected and Vite can now resolve tsconfig paths natively. This is advisory output, not a failing test condition.
- Chrome reduced-motion emulation surfaced an existing Framer Motion hydration mismatch warning from shared route/loading motion components. The hero remained readable/static and CTAs remained available; details are documented in `PHASE_2_VERIFICATION.md`.
