# Test Results

Updated: 2026-07-29T14:35:42Z

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
