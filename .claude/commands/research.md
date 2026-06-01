---
description: Review a requirement, ask clarifying questions, write a recommendation
model: opus
---

# Research Command

Review a requirement or proposal, ask clarifying questions, then write a recommendation. Does NOT plan or implement — only reports a direction.

## Usage

- `/research <requirement text>`
- `/research <file-path>`

Examples:
- `/research "Add a status timeline component showing workflow progression"`
- `/research "We need a notification centre with stacking and auto-dismiss"`

## Steps

### Step 1: Read the Requirement

If `$ARGUMENTS` looks like a file path (contains `/` or `.md`):
- Read the file and use its content as the requirement

Otherwise, use the argument text as the requirement.

### Step 2: Understand the Scope

Internally assess:

1. **Problem** — What user or developer need is being solved?
2. **Known constraints**
   - Angular 18.1 + Angular Material 18.1 + CDK 18.1
   - Library patterns — `dx-` prefix, NgModule-based, external `templateUrl` / `styleUrls`, re-export from `public-api.ts`
   - **Material-first** — wrap Material primitives; fall back to CDK; only build custom when neither covers the need
   - Theme system — Material theme tokens + declared `--dx-*` design tokens; no hardcoded colors
   - i18n — every user-facing string and every ARIA label through `@jsverse/transloco`, `dx.` key prefix
   - Accessibility — WCAG AA, keyboard nav, ARIA, focus management
3. **Ambiguities** — What is under-specified? List gaps that would block implementation.
4. **Blast radius** — How many existing components/files are affected?
5. **Precedents** — Grep [projects/ng-dijta/src/lib/components/](../../projects/ng-dijta/src/lib/components/) and [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) for similar `dx-*` components.

### Step 3: Material-First Check (MANDATORY)

Check whether Angular Material or a CDK primitive already provides the capability. Record the result in the summary — most "new" UI needs are a wrapper around an existing Material component plus tokens/props.

### Step 4: Ask Clarifying Questions

Use `AskUserQuestion` to ask **targeted, high-value questions only**:

- Max 4 questions per call
- Only ask what would meaningfully change the recommendation
- Do NOT ask about implementation details that are already project conventions (Angular patterns, prefix, token naming, a11y rules)
- Provide concrete options where possible

Categories:

| Category | Example |
|----------|---------|
| Scope | New component vs. extension of existing `dx-*` |
| API Design | Standalone usage vs. within a reactive form |
| Variants | Which visual / size / density variants are required |
| Integration | Interop with `dx-form-builder`, navigation, permission system |
| States | Loading / empty / error / disabled requirements |
| Non-goals | What is explicitly out of scope |

### Step 5: Write the Research Summary

Present in chat (do NOT write to a file unless asked):

```markdown
## Research: {Title}

### Problem Statement
{1-3 sentences}

### Material-First Result
{Which Material / CDK primitive applies; what gaps need custom code}

### Proposed Approach
{High-level shape of the solution}

### Draft API
**Selector:** `dx-{name}`

**Inputs:**
| Input | Type | Default | Description |
|-------|------|---------|-------------|

**Outputs:**
| Output | Type | Description |
|--------|------|-------------|

### i18n Keys Needed
```
dx.{domain}.{context}.{description}
```

### Accessibility Requirements
- Role: {role}
- Keyboard: {keys}
- ARIA: {attributes}

### Theme Tokens Needed
```
--dx-{token-name}
```

### Open Questions
- [ ] ...

### Recommendation
{1-3 sentences — proceed / needs more info / don't do it}
```

### Step 6: STOP

After presenting the summary, STOP. Do not create a plan or implement anything — the user reads the summary and decides next steps (typically `/plan-epic`).

## Rules

- **DO NOT implement or plan** — research only
- **DO check Material + CDK first** — mandatory
- **DO read similar existing components** before recommending new ones
- **DO apply project conventions automatically** — don't ask about Angular patterns or token naming

$ARGUMENTS
