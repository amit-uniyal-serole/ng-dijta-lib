---
description: Explore and explain a specific part of the ng-dijta codebase
model: sonnet
---

# Explore Codebase

Explore and explain a specific part of the `ng-dijta` Angular 18 + Material library, or the `practice` preview app. Produce a clear, structured summary — do not modify files.

## What to Explore

If arguments are provided, explore that specific area. Otherwise, give a top-level overview of the workspace.

Examples:
- `/explore theme` — How the Material theme + `--dx-*` tokens are assembled
- `/explore dx-button` — Anatomy of a specific library component
- `/explore i18n` — Transloco wiring and key conventions
- `/explore forms` — How reactive forms are wrapped in the library
- `/explore how the library is published` — ng-packagr + scss-bundle pipeline

## Procedure

Delegate broad searches to the `Explore` sub-agent when the question spans more than ~3 greps; otherwise read files directly.

1. Map the area — directory listing + key files.
2. Read entry points — `index.ts` barrels, `public-api.ts`, module files.
3. Trace the data flow — who calls what, which services are injected.
4. Note conventions — decorator vs. signal API, NgModule vs. standalone, external vs. inline templates.

## Output

For each area explored, provide:

1. **Purpose** — What this part of the code does
2. **Key files** — Most important files with clickable `[filename](path)` links
3. **Architecture** — How the pieces fit together (data flow, dependencies)
4. **Patterns used** — Decorator vs. signal APIs, NgModule vs. standalone, Material-first choices
5. **Entry points** — Where to start reading
6. **Related areas** — What else in the codebase interacts with this area
7. **Public API surface** — What consumers see via `@ngdx/dijta` (if relevant)

Keep the explanation concise. Use code snippets only when they clarify architecture. Do NOT include implementation suggestions — this command reports, it does not plan.

$ARGUMENTS
