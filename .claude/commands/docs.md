---
description: Generate or refresh the compodoc API docs and verify JSDoc coverage
model: sonnet
---

# Docs

Generate and sanity-check the `ng-dijta` API documentation. This project uses [compodoc](https://compodoc.app/) driven from JSDoc comments — see [.claude/rules/jsdoc.md](../rules/jsdoc.md) and [.claude/rules/ai-md-maintenance.md](../rules/ai-md-maintenance.md).

## Usage

- `/docs` — regenerate compodoc + report coverage
- `/docs check` — coverage report only (no regeneration)
- `/docs <component-name>` — scoped check of a specific component

## Steps

### 1. Regenerate

```bash
npm run doc
```

Output lands under `doc/`. Warnings during generation MUST be addressed — every one is either a missing JSDoc tag, a broken `@see` reference, or an export drift against `public-api.ts`.

### 2. JSDoc Coverage (per [jsdoc.md](../rules/jsdoc.md))

For every public component, directive, pipe, service re-exported from [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts):

- Class-level JSDoc is present
- `@example` block on every component class
- Every `@Input()` / `input()` / `input.required()` has JSDoc
- Every optional input has `@default` in its JSDoc
- Every `@Output()` / `output()` has a JSDoc starting with "Emitted when..."
- Every `model()` has JSDoc with `@default`
- No JSDoc on private members, internal computed signals, view/content queries, or lifecycle hooks

Quick grep to spot the worst offenders:

```bash
# Public components with no class-level JSDoc above the decorator
grep -B1 "^export class Dx.*Component" projects/ng-dijta/src/lib/components/**/*.component.ts \
  | grep -v "\*/" | grep "^export class"

# @Input without a JSDoc comment on the preceding line (rough)
grep -B1 "@Input(" projects/ng-dijta/src/lib/components/**/*.component.ts \
  | grep -v "^\s*\*"
```

### 3. Public API Drift

- Every component folder under `projects/ng-dijta/src/lib/components/` has an `index.ts`
- Every public symbol is re-exported via `public-api.ts`
- Removed symbols are ALSO removed from `public-api.ts`

```bash
# Folders missing an index.ts
for d in projects/ng-dijta/src/lib/components/*/; do
  [ -f "$d/index.ts" ] || echo "MISSING index.ts: $d"
done

# Symbols exported but file missing
grep "^export " projects/ng-dijta/src/public-api.ts | head
```

### 4. README Sync (optional)

If this session adds or removes public components, call it out — consumers' copy-paste README examples may need updating. This command does NOT edit the top-level README automatically.

## Output

```
Compodoc generation:   OK | FAIL (list warnings)
Class-level JSDoc:     N/M components covered
Input JSDoc:           N/M inputs covered
Output JSDoc:          N/M outputs covered
Public-api.ts drift:   N missing, N stale
Index.ts drift:        N missing
```

Do NOT fix anything — this command reports only. Use `/fix` or `/cleanup` for fixes.

$ARGUMENTS
