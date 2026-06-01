# Releasing ng-dijta

This document describes how `@ngdx/dijta` is versioned, changelogged, tagged, and published. Most releases happen automatically; this is the reference for when the automation needs to be understood, nudged, or overridden.

## TL;DR

1. Write your work in a feature branch off `main`.
2. Use **conventional-commits** for every commit (`feat:`, `fix:`, `perf:`, `docs:`, `chore:`, `ci:`, `build:`, `refactor:`, `style:`, `test:`, `revert:`).
3. **Put real prose in your commit body** — paragraphs explaining what changed and why. The release-notes renderer surfaces those paragraphs verbatim under the bullet in [projects/ng-dijta/CHANGELOG.md](projects/ng-dijta/CHANGELOG.md) and the matching GitHub Release.
4. Open a PR, merge to `main`. The [Release workflow](.github/workflows/release.yml) computes the next version and publishes to the private npm registry automatically.

## What triggers a release

| Trigger | Behaviour |
|---|---|
| Push to `main` (typically a PR merge) | Workflow runs. Nx Release decides whether a version bump is warranted based on (a) conventional-commit types since the last `ng-dijta@*` tag AND (b) whether those commits touched files inside `projects/ng-dijta/**`. If yes → bump, tag, push, build, publish. If no → workflow exits cleanly with no release. |
| Manual `workflow_dispatch` | Lets you force a release with an explicit `specifier` input: `patch` / `minor` / `major` / or an exact version like `18.12.0`. Useful when an automatic run no-op'd but you still want to ship. |

### The "no project file changed" gotcha

Nx Release runs with `projectsRelationship: "independent"` and only releases a project for commits that touched **files under that project's source tree** (`projects/ng-dijta/**` for the library). A docs-only or build-script-only PR — even when the commit subject is `feat(...)` — won't trigger an auto-release because nothing under `projects/ng-dijta/` changed.

**Escape hatch:** run the workflow manually with `specifier: patch`:

```bash
gh workflow run release.yml --ref main -f specifier=patch
```

That forces a patch bump and publishes whatever's currently on `main` (e.g. doc fixes, build-tooling improvements, this `RELEASING.md` itself).

## Commit-message convention (what the renderer expects)

The release notes are generated from your commits. Two parts of the commit shape the output:

1. **Subject line** — single line, conventional-commits format:
   ```
   feat(theme): expose MD3-aligned token aliases on existing surface and primary roles
   ```
   - `feat` → minor bump, listed under "🚀 Features".
   - `fix` → patch bump, listed under "🐞 Bug Fixes".
   - `perf` → patch bump, listed under "⚡ Performance".
   - All other prefixes (`docs`, `chore`, `ci`, `build`, `refactor`, `style`, `test`, `revert`) → no version bump but still grouped in the changelog. See [nx.json](nx.json) `release.conventionalCommits.types` for the full mapping.

2. **Commit body** — paragraphs that follow the subject (with a blank line between). **This is where you explain the change**. The [custom renderer](tools/release/changelog-renderer.js) takes everything in the body and appends it under the bullet, indented two spaces. So a commit shaped like:

   ```
   feat(theme): expose MD3-aligned token aliases on existing surface and primary roles

   Add eight CSS custom properties to partials/_default.scss that resolve
   through the library's existing role tokens. Both name families resolve
   to the same value, including under consumer brand overrides at :root.

   Aliases shipped: --dx-primary, --dx-on-primary, --dx-surface,
   --dx-on-surface, --dx-surface-card, --dx-surface-variant,
   --dx-on-surface-variant, --dx-error.
   ```

   …produces a release entry that includes both the headline and those two paragraphs. **Write the body as if a downstream consumer were reading it in the release notes — because they will.**

### What the renderer strips

The renderer removes two kinds of lines from the body before rendering:

- Conventional-commits breaking-change footers (the uppercase-marker, space-separated, colon-terminated form) — Nx already promotes those to a separate "Breaking Changes" section.
- `Co-Authored-By:` / `Signed-off-by:` trailers — authors are listed in the "Thank You" section anyway.

Everything else in the body is preserved.

### ⚠️ Commit-body landmine — the breaking-change marker

Nx scans commit bodies for an exact 16-character substring: uppercase `BREAKING`, a single space, uppercase `CHANGE`, a colon. If that exact substring appears **anywhere** in the body — even in prose describing what the renderer strips, or in a sentence quoting the marker for documentation — Nx interprets the commit as a breaking change and forces a **major** version bump.

This project's versioning is **Angular-major-aligned**: `18.x.y` means the library is compatible with Angular 18, `19.0.0` would imply Angular 19 compatibility. A wrong major bump is a wrong compatibility claim, not just a semver inconvenience.

#### Rules when discussing breaking-change semantics in a commit body

- **Don't write the exact uppercase marker in prose.** If you need to reference it, use a hyphen variant (`BREAKING-CHANGE`), an underscore variant (`BREAKING_CHANGE`), lowercase (`breaking change` with no colon), or describe it indirectly ("the conventional-commits breaking-change footer").
- **For genuine breaking changes**, signal them via the subject `!` marker (`feat!:`, `fix(scope)!:`) — that's the documented mechanism and Nx handles it correctly. Don't rely on the footer form for new breaks.
- **If you get bitten anyway**, revert by: deleting the tag and GitHub Release for the bad major, force-resetting `main` past the bot's release commit, and re-running the workflow with an explicit `specifier` (e.g. `gh workflow run release.yml --ref main -f specifier=<correct-version>`). See the history of commit `99a115a` / the 18.13.0 publish for an example.

### One-line commits are still fine

If the change really is self-explanatory in the subject (a typo fix, a dep bump, a rename), don't pad the body just to fill space. The renderer is purely additive — a bodyless commit produces the same single-line bullet it always did.

## Pipeline anatomy

[.github/workflows/release.yml](.github/workflows/release.yml) runs these steps in order:

1. **Nx release (version + changelog + GitHub Release)** — `npx nx release --skip-publish`. Bumps the version in [projects/ng-dijta/package.json](projects/ng-dijta/package.json), regenerates [projects/ng-dijta/CHANGELOG.md](projects/ng-dijta/CHANGELOG.md) using the custom renderer, creates the GitHub Release with the same body, and tags `ng-dijta@<version>` on HEAD. Commits as `chore(release): publish <version> [skip ci]`.
2. **Detect release tag on HEAD** — checks whether step 1 actually tagged. If not (no version-warranting change), downstream steps skip.
3. **Push release commit and tag** — `git push --follow-tags origin HEAD:main`.
4. **Guard against placeholder release body** — fails the run if the GitHub Release body ever contains the literal "version bump only" placeholder. Backstop against regressions of the unified version+changelog ordering.
5. **Build ng-dijta** — `npx nx build ng-dijta --configuration=production`, then `node scripts/patch-dist-webpack.js` (copies webpack helper + ships `llms.txt` into `dist/ng-dijta/`), then `npm run build:scss` (bundles `dist/ng-dijta/theme/_dx-theme.scss`).
6. **Publish @ngdx/dijta** — `npm publish ./dist/ng-dijta` to the private Nexus registry.

## Editing a published release (last resort)

A release's GitHub UI body can be edited after the fact with:

```bash
gh release edit "ng-dijta@<version>" --notes-file path/to/new-notes.md
```

This only changes the GitHub Release UI. The published npm artifact is immutable. Don't use this routinely — fix the commit-message convention instead.

The markdown `CHANGELOG.md` entry can be patched in a follow-up `docs:` commit. The change ships with the next release.

## Related files

- [nx.json](nx.json) — release configuration (`release.*` block), conventional-commit type → semver mapping, and the `renderer` wiring.
- [tools/release/changelog-renderer.js](tools/release/changelog-renderer.js) — the custom renderer that surfaces commit bodies.
- [.github/workflows/release.yml](.github/workflows/release.yml) — the CI workflow.
- [scripts/patch-dist-webpack.js](scripts/patch-dist-webpack.js) — post-build asset copy (webpack helper + `llms.txt`).
- [projects/ng-dijta/CHANGELOG.md](projects/ng-dijta/CHANGELOG.md) — generated, do not edit by hand except for retroactive backfills.
