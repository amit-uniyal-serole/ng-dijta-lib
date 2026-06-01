---
description: Open a pull request for ng-dijta with proper summary, test plan, and checklist
model: haiku
---

# /pr

Open a well-documented pull request. Runs review, pushes, creates the PR, returns the URL.

## Workflow

1. **Review** — run `/fe-review`
2. **Confirm commits** — no uncommitted work
3. **Push** — upstream the branch
4. **Create** — `gh pr create`

## Step 1 — Understand the Branch

```bash
git branch --show-current
git log main..HEAD --oneline
git diff main...HEAD --stat
git status -sb
```

Stop if:
- There are uncommitted changes — commit via `/commit` first
- The branch is `main` — PRs don't open against `main` from `main`

## Step 2 — Review

Run `/fe-review` against the diff. If critical findings remain, STOP and fix them before creating the PR.

## Step 3 — Push

```bash
git push -u origin $(git branch --show-current)
```

Never force-push to a shared / reviewed branch. If you rebased locally, ask the user before pushing with lease.

## Step 4 — Create the PR

Base branch is `main`. Title follows Conventional Commits (also enforced by [.github/workflows/pr-title.yml](../../.github/workflows/pr-title.yml)).

```bash
gh pr create --base main --title "{type}({scope}): {summary}" --body "$(cat <<'EOF'
## Summary
- {1-3 bullets, what changed and why}

## Changes
- {Files / components touched}

## Test Plan
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit -p tsconfig.json`
- [ ] `npx ng build ng-dijta`
- [ ] `npm test -- --watch=false --browsers=ChromeHeadless`
- [ ] Manual smoke in `practice` (if UI-affecting)

## Checklist
- [ ] Material-first — no custom reimplementation of Material primitives
- [ ] Library components follow NgModule + external `templateUrl` / `styleUrls` pattern
- [ ] Public symbols re-exported via `projects/ng-dijta/src/public-api.ts`
- [ ] JSDoc on new public classes / inputs / outputs
- [ ] No hardcoded colors (Material tokens or `--dx-*` tokens only)
- [ ] i18n keys routed through Transloco

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Print the PR URL when done. Do NOT enable auto-merge. Do NOT add reviewers or labels unless the user asks.

## PR Title Format

```
{type}({scope}): {summary}
```

Examples:
- `feat(ng-dijta): add dx-status-timeline wrapping MatStepper`
- `fix(ng-dijta): guard dx-datepicker against null value`
- `chore(ng-dijta): migrate dx-button inputs to signal API`
- `docs(ng-dijta): document dx-tile inputs`

## Related

- `/commit` — commit first
- `/fe-review` — review before PR
- `/hotfix` — urgent fix flow (opens PR at the end)
- `/release` — release flow on `main` post-merge
