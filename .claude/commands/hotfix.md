---
description: Urgent production fix flow — branch from main, smallest viable change, fast verify, PR
model: sonnet
---

# Hotfix

Apply an urgent fix for a bug that is live in a consumer application. Optimised for speed and safety, NOT for comprehensive cleanup.

## Usage

- `/hotfix <short description>` — start a new hotfix flow
- `/hotfix <issue-url>` — start a hotfix from a GitHub issue

Examples:
- `/hotfix dx-datepicker crashes when value is null`
- `/hotfix https://github.com/ngdx/dijta/issues/456`

## Ground Rules

1. **Smallest viable change.** Fix the reported symptom, nothing else. No refactors, no cleanup, no JSDoc improvements, no migrating to signals. Those are separate PRs.
2. **Branch from `main`** (or from the active release tag if the user specifies one) — never from a feature branch.
3. **Add a regression test** alongside the fix. A hotfix without a test is incomplete.
4. **Keep the PR small.** If the diff exceeds ~80 lines, stop and ask — it may be a `/fix` rather than a hotfix.
5. **Do NOT push or open a PR** until the user confirms.

## Steps

### Step 1: Confirm the Target Branch

```bash
git fetch origin
git status -sb
git log -1 --oneline
```

If the user named a version to patch (e.g. "18.5.20"), branch from that tag. Otherwise branch from `main`.

### Step 2: Create the Hotfix Branch

```bash
git checkout -b hotfix/{short-slug}
```

Slug is kebab-case, 3-5 words, describing the symptom (e.g. `hotfix/dx-datepicker-null-guard`).

### Step 3: Reproduce

Write a failing Karma/Jasmine test that reproduces the bug. Run it and confirm it fails:

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{affected}.spec.ts"
```

If the bug cannot be reproduced in a spec (e.g. consumer-only reproduction), document the exact reproduction steps in the PR description — but still add a regression test covering the underlying logic.

### Step 4: Apply the Fix

- Read the affected file(s) and the relevant `.claude/rules/` for the layer
- Make the smallest change that turns the failing test green
- Do NOT change unrelated lines — even if they look tempting

### Step 5: Verify Locally

```bash
# Fast path
npx tsc --noEmit -p tsconfig.json
npm run lint
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{affected}.spec.ts"

# Full path (still required for a publish-bound hotfix)
npm run verify
npx ng build ng-dijta
```

If the theme or SCSS was touched, run `npm run build:scss` too.

### Step 6: Commit

Use `fix(ng-dijta):` scope, reference the issue if one exists:

```bash
git commit -m "$(cat <<'EOF'
fix(ng-dijta): guard dx-datepicker against null value

Closes #456

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Step 7: PR

Ask the user before pushing. When approved:

```bash
git push -u origin hotfix/{slug}
gh pr create --title "fix(ng-dijta): {summary}" --body "$(cat <<'EOF'
## Summary
- {One-line root cause}
- {One-line fix}
- {One-line test coverage}

## Impact
- Affected versions: {from -> to}
- Consumers to notify: {list, or "none"}

## Test Plan
- [ ] Regression spec fails on `main`, passes on this branch
- [ ] `npm run verify` passes
- [ ] Manual smoke in `practice` app (if applicable)

## Release Notes
{One short line for the changelog.}
EOF
)"
```

### Step 8: Release Follow-Up

After merge, the `release.yml` workflow on `main` publishes a patch. If the team is cutting a faster release, call `/release patch` explicitly (see that command for the manual dispatch path).

## Hotfix vs. /fix

| Situation | Use |
|-----------|-----|
| Live incident, production consumer broken | `/hotfix` |
| Bug reported but not blocking a live user | `/fix` |
| Fix that includes refactor / cleanup | `/fix` (possibly split) |

$ARGUMENTS
