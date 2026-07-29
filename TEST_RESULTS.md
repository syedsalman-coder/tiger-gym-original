# Test Results

Updated: 2026-07-29T16:21:36Z

## Phase 2 verification commands

| Command | Exit code | Result |
| --- | ---: | --- |
| `npm run test:ci -- src/tests/phase2-content-readiness.test.tsx` | 0 | Passed: 1 file, 2 tests |
| `npm run test:ci` | 0 | Passed: 5 files, 9 tests |
| `npm run lint` | 0 | Passed |
| `npx tsc --noEmit` | 0 | Passed |
| `npm run build` | 0 | Passed; 21 static pages generated |
| `git diff --check` | 0 | Passed |

## TDD evidence

The Phase 2 regression test was run before production code and failed as expected because no content-readiness `role="status"` notice existed on the facilities or membership pages.

After implementation, the same targeted test passed.

## Notes

The Vite test command still reports the existing advisory that `vite-tsconfig-paths` is detected and Vite can now resolve tsconfig paths natively. This is advisory output, not a failing test condition.
