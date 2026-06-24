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

Run commands from the repo `root` with **yarn**.

- `yarn lint`, `yarn build`, and `yarn package-win-local` must pass before considering tasks completed.
  - `yarn lint` — ESLint.
  - `yarn build` — Production builds.
  - `yarn package-win-local` — Windows local build.
- Use `yarn lint-fix` to apply ESLint fixes when formatting fixes are needed.
