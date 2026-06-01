---
description: Create well-formatted Conventional Commits for ng-dijta with validation
model: haiku
---

# /commit

Create commits with Conventional-Commits formatting, scope `ng-dijta` or `practice`, and verified pre-commit state.

## Workflow

1. **Inspect** — `git status`, `git diff`, `git diff --cached`
2. **Validate** — lint + typecheck + targeted tests (skip full build in the common path)
3. **Stage** — specific files only
4. **Commit** — conventional message with Co-Authored-By footer

## Instructions

### Step 1: Inspect

```bash
git status -sb
git diff
git diff --cached
git log -5 --oneline                   # match surrounding commit style
```

### Step 2: Validate

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json

# Targeted tests for the files actually changed
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{affected}.spec.ts"
```

For sweeping changes (theme, public-api.ts, multiple components) run `npm run verify` instead.

### Step 3: Stage

```bash
# Preferred — name files explicitly
git add projects/ng-dijta/src/lib/components/dx-button/dx-button.component.ts \
        projects/ng-dijta/src/lib/components/dx-button/dx-button.component.html
```

Never use `git add -A` / `git add .` — those sweep in unintended files (node_modules diffs, local-only configs, IDE files). Never stage `.env`, credentials, or lockfiles you did not intend to change.

### Step 4: Commit Message

Format:

```
{type}({scope}): {description}

{body}

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

Types:

| Type | Use For |
|------|---------|
| `feat` | New feature / new public API |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `refactor` | Internal change, no behaviour delta |
| `test` | Adding or adjusting tests only |
| `docs` | Documentation, JSDoc, compodoc |
| `chore` | Tooling, configs, lockfile bumps |
| `ci` | CI / workflow changes |
| `style` | Formatting, whitespace — no logic |
| `build` | Build pipeline (ng-packagr, scss-bundle) |

Scopes:

- `ng-dijta` — library code
- `practice` — preview app
- `theme` — `projects/ng-dijta/src/lib/theme/`
- `ci` — `.github/workflows/*`
- `release` — version/publish flow

Example:

```bash
git commit -m "$(cat <<'EOF'
feat(ng-dijta): add dx-status-timeline wrapping MatStepper

- New dx-status-timeline component (horizontal / vertical variants)
- Material theme tokens for every color
- JSDoc + spec + public-api.ts export

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Step 5: Verify Post-Commit

```bash
git log -1
git status
```

## Rules

### Must Do
- Lint + typecheck + targeted tests BEFORE commit
- Conventional commit format, scope = `ng-dijta` / `practice` / `theme` / `ci` / `release`
- Include `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- Stage files explicitly

### Must Not
- `git add -A` / `git add .`
- Commit `.env`, credentials, or unintended lockfile changes
- `--no-verify` unless the user explicitly asks
- Amend a pushed commit
- Force-push to `main`
- Create an empty commit

## Related

- `/fe-review` — review before commit
- `/pr` — push + open PR after commit
- `/hotfix` — urgent fix flow (which calls this)
