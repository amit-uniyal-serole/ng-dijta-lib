# Spacing & Radius Token Scales (Proposal)

**Status:** Phase 1 shipped • Phase 2 proposed — not implemented
**Phase 1 landed:** PR [#16](https://github.com/Serole/ng-dijta/pull/16), commit `a0a925a` on `main` (2026-05-19). Tokens declared at `:root` in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss); documented in [.claude/rules/theming.md](../../.claude/rules/theming.md) and [doc/llms.txt](../llms.txt).
**Audit log:** [doc/explore/library-gaps.md](../explore/library-gaps.md) rows T1–T4 (spacing) and T16 (radius) — marked ✅ pending release.

---

## TL;DR

1. The library now ships a canonical **5-step spacing scale** and **3-step radius scale** as CSS custom properties (`--dx-spacing-{xs,sm,md,lg,xl}` and `--dx-radius-{sm,md,lg}`).
2. Phase 1 (token declarations) is **non-breaking** — net-additive at `:root`, no TypeScript / selector / module surface changes, no value shift versus the literal fallbacks consumers were already using.
3. Phase 2 (proposed, **not implemented**) migrates raw `rem` / `px` literals across the library's own SCSS and across consumer apps to consume the new tokens. Same non-breaking shape, but multi-PR scope.

---

## Motivation

- Consumer apps were inventing `--dx-spacing-*` tokens locally — a Tier-1 theming-rule violation. The audit found 7 SCSS files in the consumer app declaring or referencing these names with literal fallbacks (`var(--dx-spacing-md, 1rem)`).
- The library's own rule documents ([theming.md](../../.claude/rules/theming.md), [frontend-style-guide.md](../../.claude/rules/frontend-style-guide.md)) already referenced `--dx-spacing-md` and `--dx-radius-md` as canonical examples — they just didn't ship.
- Library-internal SCSS scatters literal `rem` / `px` values across hundreds of partials. The same spacing rhythm is re-encoded by hand in every component file, with drift over time.

A canonical scale closes the gap on all three: it gives the consumer audit something to resolve against, makes the library's rule docs accurate, and gives library-internal SCSS a single source of truth to migrate to over time.

---

## Phase 1 — Token declarations (shipped)

Declared at `:root` in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss) alongside the existing MD3 color aliases. Same shape as the MD3-alias subset (sanctioned exception in [theming.md](../../.claude/rules/theming.md)): hardcoded fallbacks at `:root`, no scheme branching, no state words.

### Spacing scale

| Token | Value | Pixels | Typical use |
|-------|-------|--------|-------------|
| `--dx-spacing-xs` | `0.25rem` |  4px | Icon-to-text gap, tight inline spacing |
| `--dx-spacing-sm` | `0.5rem`  |  8px | Compact form rows, chip padding |
| `--dx-spacing-md` | `1rem`    | 16px | Default block padding, card content |
| `--dx-spacing-lg` | `1.5rem`  | 24px | Section gaps, dialog padding |
| `--dx-spacing-xl` | `2rem`    | 32px | Page-level vertical rhythm |

Geometry: `xs ¼ / sm ½ / md 1 / lg 1½ / xl 2`. Monotonic; `md` is the design baseline.

### Radius scale

| Token | Value | Pixels | Typical use |
|-------|-------|--------|-------------|
| `--dx-radius-sm` | `0.25rem` |  4px | Chips, small inputs |
| `--dx-radius-md` | `0.5rem`  |  8px | Cards, buttons (default) |
| `--dx-radius-lg` | `1rem`    | 16px | Modals, large surfaces |

### Naming compliance

Both families honour the mandatory `--dx-{target}-{property}` pattern from [theming.md](../../.claude/rules/theming.md):
- Target = `spacing` / `radius`
- Property = size modifier (`xs` / `sm` / `md` / `lg` / `xl`)
- No state words (Guardrail 3 — these are structural, not interaction state)
- Kebab-case only (Guardrail 4)

---

## Phase 2 — Codebase migration (proposed)

**Status:** Not implemented. Captured here for tech-lead review before scheduling.

### Scope

Two independent migration tracks, each safely splittable into many small PRs.

#### Track A — Library-internal SCSS

Replace raw `rem` / `px` literals in library partials with the new tokens.

| Surface | Files (approx.) | Effort |
|---------|-----------------|--------|
| `projects/ng-dijta/src/lib/components/**/*.scss` | ~270 component partials | Per-component, batched by domain (buttons → inputs → tables → cards → …) |
| `projects/ng-dijta/src/lib/theme/**/*.scss` | ~120 theme partials | Per-area (material-override, common, partials/material, …) |

Migration rule (mechanical, easy to review):

```scss
/* Before */
.dx-card { padding: 1rem; border-radius: 0.5rem; }

/* After */
.dx-card { padding: var(--dx-spacing-md, 1rem); border-radius: var(--dx-radius-md, 0.5rem); }
```

The literal fallback is preserved so the bundle still resolves cleanly if the variable is ever undefined.

#### Track B — Consumer app migration

For consumer apps that already use `var(--dx-spacing-md, 1rem)`-style declarations:

1. **xs/sm/md** — names match. Drop the literal fallback once the new library version is installed: `var(--dx-spacing-md, 1rem)` → `var(--dx-spacing-md)`.
2. **lg** — **value change.** The app's `--dx-spacing-lg` fallback was `2rem`. The canonical scale resolves `lg` to `1.5rem` (24px) and introduces `--dx-spacing-xl` for `2rem` (32px). Each existing `lg` site must be re-audited:
   - Keep `lg` if the visual rhythm reads well at 24px.
   - Switch to `xl` if a 2rem rhythm is intended.

This is the **one place where a visual shift can occur**, and it's contained to consumer apps that previously used a non-canonical fallback. Listed explicitly in the gap-log row for T4.

### Recommended sequencing

1. **Phase 2a** — pick one library component family (suggest `dx-card` or `dx-button`) as a pilot. Two PRs: one swaps literals to tokens, one swaps the radius family. Verify pixel-stable in Storybook / the practice app.
2. **Phase 2b** — roll the same swap across the rest of the library, batched by component domain. Each PR small enough for visual diffing.
3. **Phase 2c** — consumer-app migration tracked separately in [doc/explore/library-gaps.md](../explore/library-gaps.md). Each consumer signs off after re-auditing their `--dx-spacing-lg` sites for the `1.5rem` vs `2rem` decision.

---

## Impact analysis

### Phase 1 (shipped)

| Surface | Impact |
|---------|--------|
| Public TypeScript API (`index.d.ts` / `public-api.d.ts`) | None |
| Component selectors | None |
| Module exports | None |
| Bundled SCSS (`dist/ng-dijta/theme/_dx-theme.scss`) | +14 lines — 8 new `--dx-*` declarations |
| Runtime behaviour | None |
| Visual output for any existing consumer | None — `var(--dx-spacing-md, 1rem)` previously hit fallback (1rem); now resolves through the variable (1rem). Identical computed style. |
| Bundle size | +~280 bytes uncompressed in the theme bundle, ~140 bytes gzipped |
| Storybook / practice app | No change |

### Phase 2 (proposed)

| Surface | Impact |
|---------|--------|
| Public TypeScript API | None |
| Library-internal SCSS | Hundreds of files touched, each one replacing a literal with a `var()` reference. Reviewable per-component / per-domain. |
| Visual output (library) | **Pixel-stable by construction** — every replacement uses the literal as fallback. If a value shift slips through, it's a code-review miss, not a structural risk. |
| Visual output (consumer) | **One known shift point:** consumer-app sites currently using `--dx-spacing-lg` as `2rem` will resolve to `1.5rem` after they install the new library version. See breaking-change section. |
| Bundle size | Slightly **larger** uncompressed (more `var()` syntax) but **gzip-favourable** (high token repetition compresses well). Expect neutral to -1% on the gzipped theme bundle. |
| Runtime CSS cost | Negligible. CSS custom-property resolution is O(1) at parse time. |

---

## Breaking change analysis

### Phase 1 — Not a breaking change

Three independent checks confirm:

1. **No API surface change.** Diff of `dist/ng-dijta/index.d.ts` and `dist/ng-dijta/public-api.d.ts` before/after is empty.
2. **No value shift for consumers using fallbacks.** Every spacing/radius name the library now declares had no prior declaration. Consumers using `var(--dx-spacing-md, 1rem)` were getting `1rem` from the fallback; they now get `1rem` from the variable. Identical.
3. **No internal call sites to break.** Library component SCSS files don't reference `--dx-spacing-*` or `--dx-radius-*` yet — they use raw literals. Declaring the variables can't affect code that doesn't read them.

**Semver:** `feat(theme):` → **minor** bump.

### Phase 2 — Not a breaking change, with one caveat

Track A (library-internal SCSS) is purely mechanical literal → `var(literal, literal)` replacement. Pixel-stable.

Track B (consumer-app migration) has one **non-breaking-but-visible** caveat:

> **`--dx-spacing-lg` value:** the canonical scale resolves `lg` to `1.5rem` (24px). Consumer apps that previously used a `2rem` fallback (`var(--dx-spacing-lg, 2rem)`) will see a **2rem → 1.5rem** shift when they install the new library version.

Two reasons this is **not** classified as breaking:

1. The library never previously declared `--dx-spacing-lg`. A consumer choosing `2rem` as their fallback was making a local decision about an undefined variable — not depending on a library contract. The library is now defining the contract, and the contract is `1.5rem`.
2. The escape hatch is trivial: each site picks between `--dx-spacing-lg` (1.5rem) and `--dx-spacing-xl` (2rem) per its design intent. No new token needed.

Still, it warrants explicit consumer-side communication — flagged in T4 of [doc/explore/library-gaps.md](../explore/library-gaps.md) and called out in the PR #16 description.

---

## Risks & mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Consumer-app `lg`-as-2rem sites visually shift on library upgrade | Low–Medium | Medium (one-off layout adjustment) | T4 row in gap log lists the affected components; consumer team audits each before upgrading |
| R2 | Phase 2 mechanical migration introduces a stray value mismatch | Low | Low (caught in code review / Storybook diff) | Each PR small (one component family); fallback literal preserved in `var(token, literal)` |
| R3 | The canonical `lg = 1.5rem` choice doesn't match brand intent | Low | High if missed (would require a minor cycle to correct) | Tech-lead review (this doc) before Phase 2 starts; if values need adjustment, Phase 1 can be amended in the next release with semver-minor |
| R4 | Future design language wants intermediate steps (e.g. `md-tight = 0.75rem`) | Medium over years | Low (purely additive) | Adding a sixth step later is non-breaking; keep the 5-step geometry stable until that becomes a documented brand need |
| R5 | Dark-mode / theme-variant brand wants different spacing per scheme | Very low | Low | Spacing is structural, not chromatic. Treat scheme-dependent spacing as out-of-scope for this scale. |

---

## Open design questions

1. **Is `lg = 1.5rem` the right value?** The consumer audit found one site using `2rem`. Confirm the canonical geometry (xs ¼ / sm ½ / md 1 / lg 1½ / xl 2) is the right rhythm for the brand. *Recommendation: yes — 1.5rem is the conventional 24px section gap and matches Material's default spacing rhythm.*
2. **Should radius be 3 or 5 steps?** Phase 1 ships 3 (`sm` / `md` / `lg`). MD3 uses 5 (`xs` / `sm` / `md` / `lg` / `xl`) plus `none` and `full`. *Recommendation: ship 3 now, add `xs` / `xl` later if a need surfaces — they're additive.*
3. **Should we deprecate any existing component-scoped radius / spacing variables?** A grep across library partials would show what local variables exist (`$dx-padding-...`, `$dx-radius-...` etc.) — Phase 2 could consolidate them. *Recommendation: defer until Phase 2a; surface inventory then.*

---

## Consumer guidance (today, before Phase 2)

Consumers using `@ngdx/dijta` >= the version that ships Phase 1:

1. **xs / sm / md** — drop the literal fallback: `var(--dx-spacing-md, 1rem)` → `var(--dx-spacing-md)`.
2. **lg** — audit each site: keep `--dx-spacing-lg` (now 1.5rem) or move to `--dx-spacing-xl` (2rem).
3. **xl** — new token; use where a `2rem` rhythm is intended.
4. **Radius** — same pattern: drop literal fallbacks for `sm` / `md` / `lg`.
5. **Override** at `:root` in app `styles.scss` only if the brand needs a different scale; otherwise inherit the library defaults.

---

## Verification

### Phase 1 (done)

- [x] `ng build ng-dijta` — clean
- [x] `npm run build:scss` regenerates `dist/ng-dijta/theme/_dx-theme.scss` with 8 new declarations (lines 83-92 of bundled output)
- [x] No diff in `index.d.ts` / `public-api.d.ts`
- [x] PR #16 CI green
- [ ] Post-release smoke test in `practice` app — pending the auto-release run from the `feat:` merge

### Phase 2 (planned)

- [ ] Per-component-family Storybook visual diff before/after each migration PR
- [ ] Practice app pixel-stable on every PR
- [ ] Gzipped theme-bundle size measured and reported on the first batch PR

---

## Out of scope

- **Dark-mode pairings.** Spacing/radius are structural — they don't vary by scheme. No paired dark-mode tokens needed.
- **Typography scale.** Tracked separately (T17 in the gap log) — Material 18 theme tokens may already cover it; needs investigation before requesting a `--dx-font-size-*` family.
- **Renaming existing component-local SCSS variables.** Phase 2 can consume the new tokens without renaming `$dx-card-padding` etc.; full consolidation is a follow-up.
- **A `--dx-spacing-none` / `--dx-radius-full` extension.** Possibly useful (zero-padding utility, fully-rounded pills) but additive and easy to add later.

---

## Tracking

- **Phase 1 PR:** [#16](https://github.com/Serole/ng-dijta/pull/16) — merged 2026-05-19 (commit `a0a925a` / merge commit `531ff3c`)
- **Phase 2a–c PRs:** not opened yet — file separately per component family / consumer
- **Audit log:** rows T1–T4 (spacing), T16 (radius) in [doc/explore/library-gaps.md](../explore/library-gaps.md) — marked ✅ pending release
- **Related proposal:** [md3-tokens-phase-2.md](md3-tokens-phase-2.md) — same shape, different token family
