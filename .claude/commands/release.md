---
description: Trigger or prepare an ng-dijta npm release via GitHub Actions
model: sonnet
---

# Release

Prepare or trigger a release of `@ngdx/dijta`. Publication happens via [.github/workflows/release.yml](../../.github/workflows/release.yml) — this command helps you drive that workflow safely.

## Usage

- `/release` — run pre-release checks on the current branch
- `/release patch` — trigger a patch release (manual dispatch)
- `/release minor` — trigger a minor release (manual dispatch)
- `/release major` — trigger a major release (manual dispatch, ask twice)
- `/release <exact-version>` — trigger with an explicit version (e.g. `18.5.22`)
- `/release dry-run` — run the release script locally without publishing

## Ground Rules

1. Only the user decides when to publish. Never publish automatically.
2. Major version bumps require explicit user confirmation AND a short impact summary of breaking changes. Ask before proceeding.
3. Release runs against `main`. If the branch is not `main`, stop and explain.
4. Commits since the last tag must follow Conventional Commits so `release.yml` can compute the version from them when no specifier is provided.

## Steps

### Step 1: Pre-Release Sanity

```bash
# Clean working tree, on main, up to date
git status -sb
git fetch origin
git log --oneline -10

# Last tag and the commits since it
git describe --tags --abbrev=0 2>/dev/null
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

Stop immediately if:
- Working tree is not clean
- Current branch is not `main`
- `main` is behind `origin/main`

### Step 2: Verify

```bash
npm run verify           # lint + typecheck + tests + build
npx ng build ng-dijta
npm run build:scss
```

If any step fails, STOP. Do not publish a broken library.

### Step 3: Review Commits

Summarise the commits since the last tag, grouped by Conventional Commits type:

- `feat(…)` → minor
- `fix(…)` → patch
- `feat!:` / `BREAKING CHANGE:` → major

Show the summary to the user and ask them to confirm the version bump before dispatching the workflow.

### Step 4: Trigger the Release

With `gh`:

```bash
# From convention-derived version (no specifier)
gh workflow run release.yml --ref main

# With explicit specifier
gh workflow run release.yml --ref main -f specifier=patch
gh workflow run release.yml --ref main -f specifier=minor
gh workflow run release.yml --ref main -f specifier=major
gh workflow run release.yml --ref main -f specifier=18.5.22

# First release only — skip prior-tag lookup
gh workflow run release.yml --ref main -f first_release=true
```

After dispatch, watch progress:

```bash
gh run watch $(gh run list --workflow=release.yml --limit=1 --json databaseId --jq '.[0].databaseId')
```

### Step 5: Verify Publication

```bash
# Wait a few seconds, then confirm the new version on the registry
npm view @ngdx/dijta version
```

If the workflow failed:
- Read the logs: `gh run view --log-failed`
- Common causes: auth (`NPM_PUBLISH_TOKEN`), version already exists, git identity, missing `publishConfig` target
- Fix the underlying issue — never force a tag move as a workaround

### Step 6: Post-Release

- Announce internally (link to the new GitHub release + changelog)
- Notify active consumer apps of any breaking changes
- Close relevant hotfix / feature issues

## Dry-Run

```bash
# Skip publish; simulate version bump locally
npx nx release --dry-run --verbose
```

## Local-Only Paths (discouraged)

Hand-rolled publishing (`npm publish` from a developer workstation) is explicitly off the happy path. Only use it if the runner is unavailable AND the user explicitly authorises it.

$ARGUMENTS
