# Public API Documentation Maintenance

**Scope:** Keeping the ng-dijta library's public API surface and documentation in sync with the code.

Note: ng-dijta does NOT currently ship an `AI.md` summary file. API documentation is produced by [compodoc](https://compodoc.app/) (`npm run doc`) using JSDoc comments on public classes. This rule enforces that the following documentation surfaces stay in sync with the code.

---

## Documentation Surfaces

| Surface | Location | Authority |
|---------|----------|-----------|
| Public exports | [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) | Canonical — what consumers can import |
| Per-component barrel | `projects/ng-dijta/src/lib/components/{name}/index.ts` | Re-exports component + module |
| JSDoc on public classes | Component / service / pipe / directive `.ts` files | Consumed by compodoc |
| Generated compodoc output | `doc/` | Generated; do not hand-edit |
| Project README | [README.md](../../README.md) | Consumer-facing intro |
| AI summary (optional) | `projects/ng-dijta/AI.md` — **currently missing** | Machine-readable API summary |

---

## Core Requirement

| Requirement | Status |
|-------------|--------|
| Every new public component/service/model/pipe/directive exported from `public-api.ts` | **MANDATORY** |
| Every public class has class-level JSDoc (per [jsdoc.md](jsdoc.md)) | **MANDATORY** |
| Renamed / removed exports updated in `public-api.ts` and per-component `index.ts` | **MANDATORY** |
| `npm run doc` still generates cleanly after the change | **MANDATORY** |

---

## When Changing a Component / Service / Model

Before marking the change complete, verify:

1. **Public API** — Is the new symbol re-exported from [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) (via a per-component `index.ts`)? Is any removed symbol also removed from `public-api.ts`?
2. **JSDoc** — Class-level JSDoc present; every public input / output / model documented (see [jsdoc.md](jsdoc.md)).
3. **compodoc** — Run `npm run doc` locally — no new warnings introduced.
4. **README (if applicable)** — Only touch the top-level README when adding a major capability or renaming a publicly advertised feature.

---

## Optional AI.md Summary

If a machine-readable API summary is added at `projects/ng-dijta/AI.md`, keep it in sync with every public component / service / model change. Suggested structure per entry:

```markdown
### ComponentName

**Selector:** `dx-component-name`
One-line description.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `inputName` | `type` | `default` | Description |

| Output | Type | Description |
|--------|------|-------------|
| `outputName` | `type` | Description |

**Content Slots:** (if any)
- `[slot-name]` — Description
```

Until that file exists, compodoc output + JSDoc serve as the machine-readable source of truth.

---

## What NOT to Include in Docs

- Internal / private state, signals, computed values, or methods
- Implementation details
- `viewChild()` / `contentChildren()` queries
- Private helper functions not exported from `public-api.ts`

---

## Checklist

- [ ] New public symbol re-exported from `public-api.ts` via a per-component `index.ts`
- [ ] Removed / renamed symbols fully removed from `public-api.ts` and barrels
- [ ] Public class has class-level JSDoc (see `jsdoc.md`)
- [ ] All public inputs / outputs / models have JSDoc with `@default` where applicable
- [ ] `npm run doc` generates without new warnings
- [ ] AI.md (if it exists) reflects the change
