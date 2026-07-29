# Performance Budget

Updated: 2026-07-29T02:32:47Z

## Phase 0 baseline

No production performance budget changes were made in Phase 0. The checkpoint is limited to automated test setup, test cleanup, and concise project reports.

## Current build status

`npm run build` passes and prerenders the locale routes successfully.

## Watch items for later phases

- Keep animation and WebGL work out of unit tests unless it can be tested through stable user-visible behavior.
- Monitor bundle impact before adding production dependencies.
- Treat Google Fonts network fetches as a CI/build reliability risk if builds run without stable outbound network access.
