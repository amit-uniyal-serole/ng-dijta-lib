---
description: Create a new implementation epic from a high-level requirement
model: opus
---

# Plan Epic Command

Create a new implementation epic in [progress/plans/](../../progress/plans/) from a high-level requirement.

## Usage

`/plan-epic <phase-number> <description>`

Examples:
- `/plan-epic 1 "Wrap Material Stepper into dx-stepper with custom tokens"`
- `/plan-epic 2 "Add dx-kanban-board component"`
- `/plan-epic 1 "Typed reactive-forms helpers for dx-form-builder"`

## Steps

### Step 1: Understand the Requirement

- Parse the phase number and description from `$ARGUMENTS`
- Read `progress/plans/phase-{N}/_phase.md` to learn the phase goals and exit criteria
- Read requirement / design notes in `docs/` if they exist
- Read [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) for the current public API
- Grep [projects/ng-dijta/src/lib/components/](../../projects/ng-dijta/src/lib/components/) to see whether a similar `dx-*` wrapper already exists

### Step 2: Material-First Check (MANDATORY)

Confirm that Angular Material / CDK does not already provide the needed capability. If Material has it, plan to wrap the Material primitive, NOT reinvent it. CDK candidates: `Overlay`, `A11yModule`, `DragDropModule`, `LayoutModule`, `ScrollingModule`, `PortalModule`. Document the check in the epic file.

### Step 3: Determine the Epic ID

- Read `progress/plans/phase-{N}/_phase.md` for existing epics
- If the phase directory doesn't exist, create `_phase.md` first (template below)
- Next sequential number: `P{N}-E{NN}`
- Slug: kebab-case, 3-5 words

### Step 4: Break into Tasks

Sizing rules:
- Each task completable in a single Claude session (30-90 min)
- Each task touches 1-3 components — not every layer at once
- Each task produces a committable unit
- Each task has a concrete verification command
- Split by layer when needed: interfaces → services → components → tests → practice integration

### Step 5: Write the Epic File

Write to `progress/plans/phase-{N}/P{N}-E{NN}-{slug}.md`:

```markdown
# P{N}-E{NN}: {Epic Title}

**Status:** planned
**Phase:** {N}
**Created:** {YYYY-MM-DD}

## Objective

{One paragraph describing what this epic delivers and why.}

## Material-First Check

{What Angular Material / CDK provides for this need. Which Material primitive is being wrapped, or why custom was required.}

## Prerequisites

- [ ] {Prerequisite 1}
- [ ] {Prerequisite 2}

## Exit Criteria

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit -p tsconfig.json` passes
- [ ] `npx ng build ng-dijta` passes (library) and `ng build` (if practice affected)
- [ ] `npm test -- --watch=false` passes
- [ ] {Feature-specific verifiable criterion}
- [ ] `projects/ng-dijta/src/public-api.ts` re-exports every new public symbol
- [ ] JSDoc present on every public component/input/output (see `.claude/rules/jsdoc.md`)
- [ ] `npm run doc` produces no new warnings

## Context Files

{List specific files Claude must read before implementing — be precise}

- `.claude/rules/angular18.md` — Angular 18 patterns
- `.claude/rules/angular-material.md` — Material usage rules
- `.claude/rules/ng-dijta.md` — Library conventions
- `.claude/rules/theming.md` — Theme tokens and guardrails
- {Other specific files relevant to this epic}

## Tasks

| # | Owner | What | Reference | Verification |
|---|-------|------|-----------|--------------|
| 1 | | {Description} | {Files} | `npx ng build ng-dijta` |
| 2 | | {Description} | {Files} | `npm test -- --watch=false --include="**/{name}.spec.ts"` |
| 3 | | {Description} | {Files} | `npm run verify` |

## Dependencies

- **Depends on:** {epic IDs or "none"}
- **Blocks:** {epic IDs or "none"}

## Notes

{Design decisions, trade-offs, open questions.}
```

### Step 6: Identify Dependencies

- Which existing epics must finish first?
- Which future epics will depend on this one?
- Cross-reference phase tables

### Step 7: Update Phase Tracking

- Add the new epic to `progress/plans/phase-{N}/_phase.md`
- Create `_phase.md` if the phase is new:

```markdown
# Phase {N}: {Phase Title}

**Status:** not_started
**Started:** —
**Target:** —

## Goal

{One paragraph describing what this phase achieves.}

## Exit Criteria

- [ ] `npm run verify` passes across the workspace
- [ ] {Phase-specific verifiable criteria}

## Epics

| # | Epic | Title | Status | Dependencies |
|---|------|-------|--------|--------------|
| P{N}-E01 | [Plan](P{N}-E01-{slug}.md) | {Title} | planned | — |

## Dependency Graph

```text
P{N}-E01 (Title)
  └── P{N}-E02 (Title)
```
```

### Step 8: Enforce Complete Coverage

- Do NOT scope down or defer features within an epic
- If the epic covers multiple component types, cover ALL of them
- If the work is too large, split into multiple epics that collectively deliver the feature
- Avoid language like "MVP", "start with", "initial release", or "defer to future"

### Step 9: STOP

After writing the epic and updating phase tracking, STOP. The plan is the deliverable — implementation happens separately. Present a one-paragraph summary: epic ID, task count, files touched, key decisions.

## Quality Checklist

- [ ] Material-first check recorded (MANDATORY)
- [ ] Every task has a concrete verification command
- [ ] Exit criteria are verifiable with shell commands
- [ ] Context files are specific, not "read all docs"
- [ ] Tasks are right-sized (30-90 min)
- [ ] Dependencies are explicit
- [ ] `.claude/rules/` referenced, not duplicated
- [ ] `public-api.ts` export task included when public API grows
- [ ] JSDoc task included for any new component
- [ ] Test tasks included for all new components / services
- [ ] `npm run doc` verification included when public API changes

## Rules

- **DO NOT implement anything** — planning only
- **DO** check Angular Material + CDK first
- **DO** read similar existing components in `projects/ng-dijta/src/lib/components/`
- **DO NOT** re-document `.claude/rules/` — reference them

$ARGUMENTS
