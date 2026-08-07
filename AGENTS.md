# AGENTS.md

## Project Overview

Anchor is a desktop wallet for Antelope (formerly EOSIO) based blockchains.

## Core Priorities

1. Performance first.
2. Reliability first.

If a tradeoff is required, choose correctness and robustness over short-term convenience.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## Simplicity

Do not add helper functions or abstractions by default. Keep simple one-off logic inline.

Extract only when it clearly reduces duplication, improves readability, isolates meaningful edge cases, or matches an existing project pattern.

## Task Completion Requirements

Run commands from the repo `root` with **yarn**, on the Node version pinned in `.nvmrc` (`nvm use`).

- `yarn lint`, `yarn build`, `yarn package-win-local`, and `yarn dev` must pass before considering tasks completed.
  - `yarn lint` — ESLint.
  - `yarn build` — Production builds.
  - `yarn package-win-local` — Windows local build. **Run this on Windows.** Windows packaging cannot be
    cross-compiled from macOS or Linux: `node-hid` ships `pkg-prebuilds` binaries that `@electron/rebuild`
    does not recognise, so it attempts a node-gyp source build and fails on a non-Windows host. Building on
    Windows also means the Ledger HID/USB native modules that ship are the ones actually exercised.
  - `yarn dev` — Development server.
- Use `yarn lint-fix` to apply ESLint fixes when formatting fixes are needed.

There is no automated test suite. The Jest/Enzyme suite dated from 2019, stopped being run when CI broke,
and was removed in full. Verify changes by building and exercising the app.

Make sure to stop the development server after you're done.
