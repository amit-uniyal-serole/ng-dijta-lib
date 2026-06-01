---
description: Pick up and implement the next task from an epic plan
model: sonnet
---

# Implement Command

Pick up and implement the next task from an implementation plan in [progress/plans/](../../progress/plans/).

## Usage

- `/implement` — continue with the current active epic
- `/implement P1-E03` — work on a specific epic
- If no active epic exists, list available epics and ask

## Steps

### Step 1: Find Current Work

- If an epic ID was supplied in `$ARGUMENTS`, locate `progress/plans/phase-{N}/P{N}-E{NN}-*.md`
- Otherwise scan `progress/plans/phase-*/` for epics with status `in_progress`, then `planned`
- Read the full epic plan and `progress/plans/phase-{N}/_phase.md`

### Step 2: Check Prerequisites

- Verify every prerequisite checkbox in the epic is satisfied
- If a prerequisite epic is not complete, STOP, report it, and ask which epic to work on instead

### Step 3: Read Context

- Read ALL files listed in the epic's "Context Files" section
- Read the relevant `.claude/rules/` files for the layer being implemented (start with [rules-hierarchy.md](../rules/rules-hierarchy.md))
- Read [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) so you know the current public API surface

### Step 4: Material-First Check (MANDATORY for UI tasks)

Before writing a new component, confirm that [Angular Material](https://material.angular.io/components/categories) does NOT already provide the capability. If Material has it — or CDK primitives (`Overlay`, `A11yModule`, `DragDropModule`, `LayoutModule`, `ScrollingModule`) cover it — use them directly. Document the check in the commit message.

Also grep `projects/ng-dijta/src/lib/components/` to confirm an existing `dx-*` wrapper does not already exist.

### Step 5: Identify the Next Task

- Find the first incomplete task in the epic
- When resuming, use `git log` and file state to infer what's already done
- One task per session unless the user explicitly asks for more

### Step 6: Implement

- Create or checkout the feature branch: `git checkout -b feature/{slug}`
- Follow project conventions from [CLAUDE.md](../../CLAUDE.md) and `.claude/rules/`:
  - **Library components**: decorator-based NgModule pattern with external `templateUrl` / `styleUrls` (the existing 274 components follow this — match the surrounding code)
  - **OnPush**: `ChangeDetectionStrategy.OnPush` on every new component
  - **API style**: decorator (`@Input()` / `@Output()`) is valid and dominant; signal APIs (`input()` / `output()` / `model()`) are encouraged for brand-new components but not mandated — do NOT mix both in the same class
  - **Styling**: Material theme tokens for colors; declared `--dx-*` design tokens with fallbacks for layout/radius/spacing; NO hardcoded colors
  - **i18n**: every user-facing string and every ARIA label through `@jsverse/transloco`, keys prefixed `dx.`
  - **Accessibility**: WCAG AA (see [accessibility.md](../rules/accessibility.md)); trust Material's built-in ARIA / keyboard handling for Material components
  - **JSDoc**: class-level + per-input JSDoc on every public component, per [jsdoc.md](../rules/jsdoc.md) (compodoc consumes it)
  - **Public API**: re-export every new public symbol from [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) via a per-component `index.ts`
- Run the task's verification command after implementation; fix failures before moving on

### Step 7: Verify

```bash
# Typecheck + lint
npm run typecheck
npm run lint

# Library build (always when library files changed)
npx ng build ng-dijta

# Full verify (lint + typecheck + test + build)
npm run verify

# Tests (filter when possible)
npm test -- --watch=false
```

Also run the task-specific verification command listed in the epic.

### Step 8: Commit

Stage specific files, then use conventional commits with a project scope:

- `feat(ng-dijta): add dx-status-timeline component`
- `fix(ng-dijta): restore focus outline on dx-button`
- `test(ng-dijta): cover dx-breadcrumb collapsed state`
- `docs(ng-dijta): document dx-tile inputs`

Include the `Co-Authored-By` footer (see `/commit`). Do NOT push unless the user explicitly asks.

### Step 9: Update Progress

- Tick off completed exit criteria in the epic file
- Move epic status from `planned` → `in_progress` → `done` as appropriate
- Update `progress/plans/phase-{N}/_phase.md` epic table when an epic moves to `done`

## Key Principle

**The plan is the source of truth.** Do NOT:
- Re-explore the codebase to rediscover what to build
- Redesign components or APIs the plan already defines
- Add scope beyond what the plan specifies
- Skip steps or reorder tasks unless blocked

## Rules

- **One task per session** unless the user explicitly says otherwise
- **Commit after each completed task** — each task is a committable unit
- **Run verification after every task** — do not skip
- **If blocked**, document it in the epic's Notes section and ask the user
- **Do NOT push** to remote unless the user asks

## Related

- `/plan-epic` — Create new epic plans
- `/research` — Analyse requirements before planning
- `/verify` — Full project verification
- `/audit` — Compliance audit
- `/scaffold` — Generate component boilerplate
- `/hotfix` — Urgent production fix flow

$ARGUMENTS
