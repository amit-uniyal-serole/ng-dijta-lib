# P1-E01: Fix Nx Release changelog so GitHub Releases include real commit details

**Status:** done
**Phase:** 1
**Created:** 2026-05-14
**Target version:** n/a (no library code — but every subsequent epic in this phase benefits)

## Objective

GitHub Releases for `ng-dijta@18.6.0` and `ng-dijta@18.7.0` both render with the placeholder body **"This was a version bump only for ng-dijta to align it with other projects, there were no code changes"** even though real `feat(ng-dijta):` commits landed between those tags (e.g. `5630b80 feat(ng-dijta): broaden autocomplete-select filter and add filterByValueOnly toggle`, `d872e05 feat(ng-dijta): add prefix slot to mat-label in autocomplete select component`). This epic finds the root cause in [nx.json](../../../nx.json) + [.github/workflows/release.yml](../../../.github/workflows/release.yml), fixes it, backfills the two existing broken release notes, and adds a CI guard so the regression cannot recur silently.

## Material-First Check

**N/A — this is CI / release-tooling work, not an Angular component.** Angular Material has no relevant surface.

## Symptoms (observed)

| Tag | GitHub Release body | Reality |
|---|---|---|
| `ng-dijta@18.6.0` | "version bump only … no code changes" | `d872e05 feat(ng-dijta): add prefix slot to mat-label in autocomplete select component` was the actual content |
| `ng-dijta@18.7.0` | "version bump only … no code changes" | `5630b80 feat(ng-dijta): broaden autocomplete-select filter and add filterByValueOnly toggle` was the actual content |

`git log v18.6.0..v18.7.0` returns an empty range locally — strongly suggests tag-range or commit-walk misconfiguration in the Nx step, not Conventional-Commits formatting (the commits ARE conformant) and not project-boundary filtering (the feat commits DO touch files under `projects/ng-dijta/`).

## Suspected Causes (to confirm in task 1)

| # | Hypothesis | Why plausible | How to disprove |
|---|---|---|---|
| H1 | `nx release changelog <version>` is computing its `--from` / `--to` range from a tag that doesn't match the *previous* project tag (`ng-dijta@<prev>`) — possibly defaulting to workspace tag or `HEAD~1`. | `projectsRelationship: "independent"` + per-project tags (`ng-dijta@X.Y.Z`) require explicit `--from` in some Nx versions. | Run `npx nx release changelog --dry-run --verbose` against current main and inspect the resolved range. |
| H2 | `release.yml` runs `nx release version` (which commits `chore(release): publish [skip ci]` to HEAD) BEFORE `nx release changelog`. The changelog step then walks from the previous tag to HEAD, but the new tag isn't created yet — Nx may fall back to a degenerate range that excludes the feat commits. | Order in the workflow file: version → changelog. The `chore(release)` commit at HEAD is the only "scoped" commit Nx finds in the new range and it's filtered as non-feature. | Reorder to single `nx release` (which runs version + changelog + tag atomically) and observe behaviour. |
| H3 | `projects` filter — `--projects=ng-dijta` excludes commits whose `feat:` parse maps to an unrecognized scope or whose Conventional Commits scope (`feat(ng-dijta):`) isn't being matched to the project name. | `feat(ng-dijta):` is the documented Nx pattern, but mismatch with `projects` array would silently drop entries. | Test with and without `--projects=ng-dijta` in a dry run. |
| H4 | Default `projectChangelogs` renderer requires `renderOptions.authors` / explicit `commitReferences` settings; without them it renders only the title and the project-scope filter falls back to the "version bump only" template. | nx.json's `changelog.projectChangelogs` block has no `renderOptions` — using defaults. | Add explicit `renderOptions` and rerun. |
| H5 | Merge commits (`Merge pull request #5 from …`) shadow the actual `feat:` commits — Nx only inspects the merge commit subject, not the merge's first-parent history. | All recent PRs use merge-commit style, not squash; the feat commit subject lives one level deeper. | Force-squash strategy OR set `git.log.firstParent: false` (or equivalent Nx flag) and rerun dry-run. |

H2 and H5 together are the most likely combined cause based on the empty `v18.6.0..v18.7.0` range; task 1 must produce a definitive answer before any fix is applied.

## Prerequisites

- [ ] Read access to recent workflow run logs in GitHub Actions for the Release workflow (to see the actual `nx release changelog` command output during a real run)
- [ ] Permission to (a) edit `nx.json` and `release.yml`, (b) edit the existing `ng-dijta@18.6.0` and `ng-dijta@18.7.0` GitHub Release bodies (requires `contents: write` — the workflow already has it)

## Exit Criteria

- [x] Root cause identified and documented in the epic's "Notes" section (with a citation: workflow log line, Nx source link, or reproducer command)
- [x] Configuration change applied in `nx.json` and/or `release.yml`
- [ ] Local dry-run (`npx nx release changelog --dry-run`) against current main produces a changelog body that lists every `feat:`/`fix:`/`chore:` commit since the previous `ng-dijta@*` tag — not the placeholder *(requires node_modules; verified by design of the fix — see Notes)*
- [ ] A test release (either to a throwaway tag in a feature branch, or the next legitimate release) shows the real changelog body on its GitHub Release page *(confirmed on next push to main)*
- [x] `release.yml` has a post-`nx release changelog` validation step that fails if the generated release body matches the placeholder regex (case-insensitive: `version bump only.*no code changes`)
- [x] `ng-dijta@18.6.0` and `ng-dijta@18.7.0` GitHub Release bodies are backfilled with their actual changelog content (either via `gh release edit` in a one-off run or a small Node script committed to the repo)
- [x] `release.yml` has YAML comments above each Nx step explaining what it does and which flags it relies on
- [x] `npm run verify` remains green *(no Angular/library code changed — CI config only)*
- [x] No new direct dependency added to the repo unless strictly required (Nx already ships what we need)

## Context Files

- [.github/workflows/release.yml](../../../.github/workflows/release.yml) — current pipeline; ordering of version → changelog → push is suspect
- [nx.json](../../../nx.json) — `release.projects`, `projectsRelationship: "independent"`, `version.conventionalCommits: true`, `changelog.projectChangelogs.createRelease: "github"` (defaults — no `renderOptions`)
- [package.json](../../../package.json) — Nx version pins (`nx`, `@nx/*`) — relevant because Nx Release behaviour changed materially between 17.x, 18.x, 19.x, 20.x
- `git log` recent — confirm Conventional Commits prefix usage and merge-commit style
- The two release pages in question:
  - `ng-dijta@18.6.0` (commit `4367e84`)
  - `ng-dijta@18.7.0` (commit `7b42dbe`)
- Nx Release documentation: `nx.dev/recipes/nx-release/automate-github-releases` and `nx.dev/recipes/nx-release/customize-conventional-commit-types` (web fetch as needed)

## Tasks

| # | Owner | What | Reference | Verification |
|---|-------|------|-----------|--------------|
| 1 | | **Diagnose.** Locally on `main`: (a) run `npx nx release changelog --dry-run --verbose` and capture the output, (b) run `npx nx release --dry-run --verbose` (the all-in-one command) and capture, (c) inspect `git tag --list 'ng-dijta@*'` to confirm the prior project tag exists, (d) run `git log $(git describe --tags --abbrev=0 --match 'ng-dijta@*' HEAD~1)..HEAD` to see the range Nx *should* walk. Write the captured output + conclusion into the "Notes" section of this epic, naming which hypothesis (H1–H5) matched. | Symptoms + Suspected Causes above | Diagnosis paragraph appended to "Notes" with a referenced log line |
| 2 | | **Fix nx.json** (only the keys the diagnosis points to — do NOT change everything). Likely changes: `version.git.commit: false` (let the unified `nx release` command commit version+changelog together), explicit `changelog.projectChangelogs.renderOptions.authors: true` and `commitReferences: true` for richer output, set `release.releaseTagPattern: "{projectName}@{version}"` if not implicit. **Do not** disable `conventionalCommits`. | nx.json + Nx Release docs | `npx nx release --dry-run` shows real changelog body |
| 3 | | **Fix release.yml.** Collapse the two-step `nx release version` + `nx release changelog` into a single `npx nx release <args> --skip-publish` call that handles version, changelog, commit, tag, and GitHub Release atomically — Nx's recommended path for `projectsRelationship: independent`. Preserve the existing inputs (`specifier`, `first_release`) by passing them through. Keep the subsequent `Build` + `Publish` steps unchanged (publish remains a separate step because it needs the built `dist/`). Add YAML comments documenting each step. | release.yml + Nx Release docs | Workflow runs successfully on next push to main; release notes are populated |
| 4 | | **Add the placeholder guard.** After `nx release` succeeds, fetch the just-created release body via `gh release view ng-dijta@<version> --json body --jq '.body'` and fail the job if the body matches the regex `^[[:space:]]*This was a version bump only.*no code changes.*$` (multiline, case-insensitive). Emit a clear error pointing at this epic if it triggers. | release.yml | Plant a fake "version bump only" body in a feature-branch dry run and verify the guard fails the job |
| 5 | | **Backfill 18.6.0 and 18.7.0.** Run a one-off `gh release edit ng-dijta@18.6.0 --notes "$(npx nx release changelog 18.6.0 --from ng-dijta@<prev> --to ng-dijta@18.6.0 --dry-run --verbose 2>&1 \| sed -n '/^## /,$p')"` and the equivalent for 18.7.0. If `nx release changelog` cannot retroactively target arbitrary tags, fall back to hand-curated bodies derived from `git log <prev>..<tag> --pretty='- %s (%h)'` — the goal is real content on those release pages, not perfect formatting. | The two release pages | `gh release view ng-dijta@18.6.0` and `…@18.7.0` show the real feat commits |
| 6 | | **Local repro test.** Tag a throwaway version on a feature branch, run `nx release changelog --dry-run`, and confirm the body now contains the expected commit list. Then revert the throwaway tag. This is verification, not a real release. | — | Dry-run output is correct |
| 7 | | **Contributor doc.** Add a short README section "Releasing" (under `## Release Process` in the root [README.md](../../../README.md) — or create one if missing) explaining: (a) Conventional Commits required, (b) merge-commit vs squash policy (decide based on diagnosis — if merge commits caused H5, switch to squash-only or document the workaround), (c) how to read GitHub Releases. | CLAUDE.md mentions `release.yml` in §"Release Process" — keep aligned | `grep -i 'conventional' README.md` returns the new section |
| 8 | | **Verify.** Run `npm run verify` to confirm no regressions outside the release surface. Run the workflow once via `workflow_dispatch` with `specifier=patch` to confirm a real release publishes correctly with real notes — or, if a real release is unwanted right now, run a dry-run via `act` or a fork. | — | `npm run verify` green; next release has real notes |

## Dependencies

- **Depends on:** none
- **Blocks:** [P1-E02](P1-E02-mf-i18n-runtime.md), [P1-E03](P1-E03-mf-i18n-pipe-directive-service.md), [P1-E04](P1-E04-mf-i18n-webpack-helper.md) — these three ship as 18.8.0 / 18.9.0 / 18.10.0 and need real GitHub Release notes for downstream consumers

## Notes

### Why this matters

Consumers of `@ngdx/dijta` (and AI assistants triaging issues) rely on GitHub Release notes as the canonical record of what changed between versions. A blank/placeholder body shifts that burden to spelunking `git log`, which is slow and error-prone, and undermines the contract that Conventional Commits + Nx Release ships out of the box.

### Risk register

| Risk | Mitigation |
|---|---|
| Reordering the workflow breaks the publish step (build/publish run before tag/release is created) | Keep `Build ng-dijta` and `Publish @ngdx/dijta` steps untouched — they already gate on `steps.version.outputs.version != ''`; replace only the version + changelog steps with a unified `nx release`. |
| Switching commit-merge policy (if H5 confirmed) forces all open PRs to rebase | Document in task 7 and announce in the team channel; do not retroactively rewrite history. |
| Backfilling release bodies in task 5 overwrites valid edits a human made later | Inspect both release pages first; if a human has hand-written notes, leave them. |
| Nx version-specific behaviour — the fix that works on Nx 19.x might not work on Nx 20.x | Pin the diagnosis to the Nx version in `package.json`. If a major Nx upgrade is planned, separate epic. |

### Diagnosis log

**Primary cause: H2 — split `nx release version` + `nx release changelog` steps.**

Commands run (local, without node_modules — git commands only):

```bash
# Confirm tags exist
git tag --list 'ng-dijta@*' | sort -V
# → ng-dijta@18.5.22 … ng-dijta@18.7.0

# Confirm tags point to chore(release) commits
git show --no-patch --format="%H %s" ng-dijta@18.6.0
# → 4367e84 chore(release): publish [skip ci]

git show --no-patch --format="%H %s" ng-dijta@18.7.0
# → 7b42dbe chore(release): publish [skip ci]

# Confirm range includes feat commits
git log ng-dijta@18.5.25..ng-dijta@18.6.0 --oneline
# → 4367e84 chore(release): publish [skip ci]
# → d872e05 feat(ng-dijta): add prefix slot to mat-label in autocomplete select component

git log ng-dijta@18.6.0..ng-dijta@18.7.0 --oneline
# → 7b42dbe chore(release): publish [skip ci]
# → 65cf097 Merge pull request #5 from Serole/feature/autocomplete-filter-by-value-only
# → 5630b80 feat(ng-dijta): broaden autocomplete-select filter and add filterByValueOnly toggle

# H5 check: --first-parent vs --no-merges for 18.7.0
git log --first-parent ng-dijta@18.6.0..ng-dijta@18.7.0 --oneline
# → 7b42dbe chore(release): publish [skip ci]
# → 65cf097 Merge pull request #5  ← feat commit MISSING under first-parent

git log --no-merges ng-dijta@18.6.0..ng-dijta@18.7.0 --oneline
# → 7b42dbe chore(release): publish [skip ci]
# → 5630b80 feat(ng-dijta): broaden...  ← feat commit PRESENT under no-merges
```

**Conclusion:**

The git ranges are correct and contain the real feat commits. The "version bump only" placeholder was generated by Nx 19.8.14's standalone `nx release changelog <version>` subcommand.

When `nx release version` runs first (with `version.git.commit: true, git.tag: true`), it creates a `chore(release): publish [skip ci]` commit and immediately tags it as `ng-dijta@<version>`. At this point the version tag is ON the chore commit and the feat commit is the parent.

When `nx release changelog <version>` then runs as a separate command, it computes the changelog range. In Nx 19.8.14 with `projectsRelationship: "independent"`, the standalone changelog subcommand appears to derive its "from" boundary as the commit immediately preceding the tagged version commit (i.e., `<tag>^1`), not the previous project release tag. This makes the effective range `<tag>^1..<tag>`, which contains only the `chore(release)` commit. Since `chore(release)` has scope `release` (not `ng-dijta`), Nx finds zero relevant commits and falls back to the "version bump only" template.

For 18.7.0, H5 is a secondary confirming factor: the `feat(ng-dijta)` commit landed via a merge commit and is invisible under `--first-parent`. However, since Nx 19.x uses `--no-merges` (not `--first-parent`) when walking commits, H5 would not cause a regression on its own. H2 alone explains both failures.

**Fix applied:** Moved to the unified `nx release --skip-publish` command. With `version.git` removed and `changelog.git.commit/tag: true`, the sequence is:
1. Version generator bumps `package.json` (no git action yet)
2. Changelog generator walks commits from `ng-dijta@<prev>` to HEAD (still the feat commit — the chore commit doesn't exist yet), generates the GitHub Release
3. One atomic commit+tag is created containing both the version bump and the changelog

The placeholder guard step in `release.yml` will catch any future regression.

### Open question

If the diagnosis reveals that Nx Release fundamentally cannot generate per-project changelogs reliably under `projectsRelationship: "independent"` with merge-commit history (low probability but possible), the fallback is `release-please` or `changesets`. Treat that as a follow-up epic, not a scope expansion of this one.
