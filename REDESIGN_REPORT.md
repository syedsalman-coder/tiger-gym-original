# Redesign Report

Updated: 2026-07-29T14:35:42Z

## Phase 0 checkpoint

Phase 0 cleanup remains complete in local checkpoint commit `d9d6fc4e9c476bb2b0221ae2dd4c18e891047083`.

## Phase 1 implementation

Phase 1 includes production UI implementation rather than verification-only documentation.

### Design system and global shell

- Expanded shared CSS tokens for brand glow, overlay surfaces, layout gaps, mobile action height, radius scale, and reusable elevation.
- Refined global page shell helpers, responsive grid helpers, shared button behavior, mobile-safe spacing, and RTL-aware styling.

### Navigation and conversion surfaces

- Refined desktop navigation into a compact pill-style route cluster with active states.
- Refined mobile navigation dialog with localized IDs and stronger link structure.
- Added fixed mobile action bar for WhatsApp, Call, and Directions.
- Added footer directions CTA and RTL icon mirroring.

### Localization and metadata

- Added localized conversion-action accessibility copy.
- Extended metadata generation with `metadataBase`, canonical/alternate language links, Open Graph locale data, alternate locale data, and Twitter card metadata.
- Preserved English and Arabic RTL layout behavior through logical CSS properties and targeted RTL overrides.

## DumbbellScene checkpoint

The pre-existing `src/components/home/DumbbellScene.tsx` change is isolated in local checkpoint commit `25fd6b6 fix: harden DumbbellScene WebGL recovery`.

## Phase 2 implementation

Phase 2 combines the earlier content-readiness slice with the adaptive cinematic Tiger Gym hero work. The current hero implementation was preserved; the work was not redesigned or restarted.

### Content readiness

- Added a reusable `ContentStatusNotice` component with localized English/Arabic status labels.
- Facilities show a pending readiness notice before the training-area list so visitors understand equipment/category details are not final.
- Membership shows a pending readiness notice before plan cards so visitors understand prices/access terms require direct confirmation.
- Added CSS for the notice surface using the existing dark/yellow Tiger Gym design language.
- Added regression tests covering the English facilities notice and Arabic membership notice.

### Adaptive cinematic home hero

- `HomeHero.tsx` now includes an aria-hidden cinematic layer around the existing hero stage, with key/rim spotlights, aperture falloff, and grain treatment.
- `DumbbellScene.tsx` keeps the existing WebGL recovery/fallback flow and uses stronger cinematic studio lighting, including a rect area light.
- `globals.css` adds responsive cinematic stage treatments for mobile, tablet, desktop, Arabic RTL mirroring, and reduced-motion-safe styling.
- `home-hero-cinematic.test.tsx` locks the cinematic layer and lighting contract so the hero is not accidentally downgraded.

## Verification

- `npm run test:ci` passed: 6 files, 10 tests.
- `npm run lint` passed.
- `npx tsc --noEmit` passed.
- `npm run build` passed and generated 21 static pages.
- `git diff --check` passed with line-ending warnings only.
- `/en` and `/ar` passed normal responsive checks at 360x800, 390x844, 768x1024, 1366x768, and 1440x900.
- English LTR and Arabic RTL layouts render with visible headline/CTAs, usable navigation, responsive mobile scrolling, and no horizontal document/body overflow.
- Reduced-motion mode renders a readable static composition with CTAs available and no visible infinite animations. A pre-existing shared-motion hydration mismatch warning appears under Chrome reduced-motion emulation and is recorded in `PHASE_2_VERIFICATION.md`.
- WebGL-disabled fallback renders non-blank fallback content and preserves navigation/CTA usability.

No push or merge was performed.
