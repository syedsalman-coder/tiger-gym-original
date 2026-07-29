# Performance Budget

Updated: 2026-07-29T03:35:57Z

## Phase 1 implementation baseline

- `npm run build` passed and generated 21 static pages.
- Phase 1 added no new production dependencies.
- Mobile conversion action bar uses existing `lucide-react` icons and CSS tokens.
- Metadata foundation uses Next.js metadata primitives only.
- Shared design tokens centralize spacing, radius, overlay, and shadow values to avoid repeated one-off CSS values in later phases.

## Protected rendering path

`src/components/home/DumbbellScene.tsx` was not edited, staged, reset, or reverted by this implementation. Its current WebGL recovery and compact/mobile rendering work remains intact.

- Diff hash: `db3daa450c5dac86890a02b339146a66e8ada011`
- SHA-256: `459c4ec573c3cd4528b8aef2bfdba9cbdc11b7f35a807fe54a1ff16ed7eb6835`

## Watch items for later phases

- Monitor mobile viewport space because the fixed conversion action bar intentionally reserves bottom safe-area space on small screens.
- Monitor bundle impact before adding any new production dependency.
- Treat Google Fonts network fetches as a CI/build reliability risk if builds run without stable outbound network access.
