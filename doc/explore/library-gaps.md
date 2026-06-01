# `@ngdx/dijta` — library gap log

> Append-only log. When the construction-hub app needs a UI primitive or design token the
> library doesn't ship, **do not author it in the app**. Record it here and use a fallback
> (Material → Bootstrap utility → raw value). The library team picks up entries from this
> file.
>
> **Source of truth for "does the library ship this?":**
> - **Components:** [.claude/llms.txt](../../.claude/llms.txt) (component inventory) and `node_modules/@ngdx/dijta/index.d.ts` (the actual exports).
> - **Tokens:** [.claude/llms.txt](../../.claude/llms.txt) (brand contract block) **plus** `node_modules/@ngdx/dijta/theme/_dx-theme.scss` (the compiled bundle, which adds component-scoped `--dx-*` tokens).
> - The union of the two is the allow-list used by `/audit` section 5a.
>
> Workflow:
> 1. New gap discovered → add a row to the appropriate table below.
> 2. Use the fallback chain in code; do not add an `--app-*` token or an app primitive.
> 3. When the library ships the entry, mark the row ✅ in `Resolved` and link the
>    `@ngdx/dijta` version that shipped it. The app can then migrate off the fallback.
>
> The rules that mandate this log:
> - [.claude/rules/frontend/dijta-consumer.md](../../.claude/rules/frontend/dijta-consumer.md)
> - [.claude/rules/frontend/theming.md](../../.claude/rules/frontend/theming.md)
> - [.claude/rules/frontend/frontend-prohibited.md](../../.claude/rules/frontend/frontend-prohibited.md)
> - Enforced by `/audit` (sections 5, 5a, 5b).

---

## Missing components

> Primitives the library doesn't ship that the app has needed. Fallback should be Material/CDK
> or a Bootstrap utility. Do **not** author the primitive in the app.

| # | Need | Surfaced in | Current handling | Logged | Resolved |
|---|------|------------|------------------|--------|----------|
| _none yet — record entries here as they surface_ | | | | | |

---

## Missing tokens

> Design tokens used by the app today that don't exist in `node_modules/@ngdx/dijta/theme/_dx-theme.scss`.
> Each row is a Tier-1 violation today; the resolution is "library adds it" not "app declares it".
> Until then, code should use raw `rem` / `px` values or a Material/Bootstrap equivalent.

### Spacing scale (highest priority — invented in 7 SCSS files)

**Library decision 2026-05-19:** ship the existing `--dx-spacing-{xs,sm,md,lg}` names (extending with `xl`) rather than introducing a new numbered scale. Names already match `--dx-{target}-{property}` and are consistent with the documented examples in `theming.md`. Canonical 5-step values: xs `0.25rem` / sm `0.5rem` / md `1rem` / lg `1.5rem` / xl `2rem`.

| # | Token name in use | Library exposes | Used by | Logged | Resolved |
|---|-------------------|-----------------|---------|--------|----------|
| T1 | `--dx-spacing-xs` (0.25rem) | `--dx-spacing-xs` (0.25rem) — shipped in `partials/_default.scss`, pending next `@ngdx/dijta` release | `app-saved-view-picker`, `fsm-transition-modal` | 2026-05-19 | ✅ pending release |
| T2 | `--dx-spacing-sm` (0.5rem)  | `--dx-spacing-sm` (0.5rem) — shipped, pending release | `app-list-filter-panel`, `app-saved-view-picker`, `fsm-transition-modal` | 2026-05-19 | ✅ pending release |
| T3 | `--dx-spacing-md` (1rem)    | `--dx-spacing-md` (1rem) — shipped, pending release | `app-module-list`, `custom-fields-form`, `fsm-transition-modal` | 2026-05-19 | ✅ pending release |
| T4 | `--dx-spacing-lg` (≈2rem)   | `--dx-spacing-lg` (1.5rem) — shipped, pending release. **Note value change:** the app's `lg` fallback was 2rem; the canonical scale resolves `lg` to 1.5rem and introduces `--dx-spacing-xl` (2rem). Audit consumer sites that used the 2rem fallback and route them to `--dx-spacing-xl` if a 2rem rhythm is intended. | `app-module-list` | 2026-05-19 | ✅ pending release (value migration required) |

**App migration plan once shipped:**

1. No find/replace needed for xs/sm/md — names match.
2. Audit `--dx-spacing-lg` sites: keep `lg` if a 1.5rem (24px) value is acceptable, otherwise switch the site to the new `--dx-spacing-xl` (2rem).
3. Drop the literal fallbacks (`var(--dx-spacing-md, 1rem)` → `var(--dx-spacing-md)`) once the new `@ngdx/dijta` version is installed.

### Material-3-style colour & surface aliases

The app uses MD3-flavoured names (`--dx-primary`, `--dx-on-surface`, `--dx-surface-variant`,
…) that don't exist in the library. The library's actual contract uses the unprefixed
`--primary-base` / `--surface-on-base` / `--surface-light` family. Either:

- (a) The library exposes MD3 aliases (`--dx-primary` → resolves to `--primary-base`,
  `--dx-on-surface` → `--surface-on-base`, etc.) so apps can use Material-tokens-style
  names, **or**
- (b) The app standardises on the library's existing names (no library change required).

Until decided, the app should use the existing library names (option b).

| # | Token name in use | Library equivalent (option b) | Library should consider exposing (option a) | Used by | Logged | Resolved |
|---|-------------------|------------------------------|----------------------------------------------|---------|--------|----------|
| T5 | `--dx-primary` | `--primary-base` | `--dx-primary` as an MD3 alias | `fsm-transition-modal`, `confirm-modal`, `app-module-list-page` | 2026-05-19 | — |
| T6 | `--dx-on-primary` | `--primary-on-base` | `--dx-on-primary` | `confirm-modal`, `app-module-list-page` | 2026-05-19 | — |
| T7 | `--dx-on-surface` | `--surface-on-base` | `--dx-on-surface` | `confirm-modal` | 2026-05-19 | — |
| T8 | `--dx-on-surface-variant` | `--color-text-secondary` (library declares this in `_dx-theme.scss`) | `--dx-on-surface-variant` | `fsm-transition-modal` | 2026-05-19 | — |
| T9 | `--dx-surface` | `--surface-base` | `--dx-surface` | (one-off, audit-detected) | 2026-05-19 | — |
| T10 | `--dx-surface-card` | **Deprecated** in next `@ngdx/dijta` release (library decision 2026-05-19). App migration complete: 2 button sites replaced with `<dx-button>`; 3 `<th>` sites migrated to `--dx-surface-variant` (already shipped). | (was: milestones-tab, schedule-tab, task-dependencies-modal) | 2026-05-19 | App-side ✅; library deprecation pending |
| T11 | `--dx-surface-variant` | `--surface-light` | `--dx-surface-variant` | (audit-detected) | 2026-05-19 | — |
| T12 | `--dx-error`, `--dx-on-error`, `--dx-error-container` | `--error-fc` / `--color-error-bg` / `--color-error-border` (declared in app `styles.scss`) | A full MD3 error trio | (audit-detected) | 2026-05-19 | — |
| T13 | `--dx-outline` | (no direct equivalent) | An outline / divider token | (audit-detected) | 2026-05-19 | — |
| T14 | `--dx-focus-ring` | (no direct equivalent) | A focus-ring token | (audit-detected) | 2026-05-19 | — |
| T15 | `--dx-primary-container`, `--dx-secondary-container` | (no direct equivalents) | MD3 *-container tokens | (audit-detected) | 2026-05-19 | — |

### Shape / typography

| # | Token name in use | Library should expose | Used by | Logged | Resolved |
|---|-------------------|----------------------|---------|--------|----------|
| T16 | `--dx-radius-sm` | `--dx-radius-{sm,md,lg}` — shipped in `partials/_default.scss`, pending next `@ngdx/dijta` release. Values: sm `0.25rem` / md `0.5rem` / lg `1rem`. | (audit-detected) | 2026-05-19 | ✅ pending release |
| T17 | `--dx-font-size-md` | A font-size scale (Material 18 theme tokens may cover this — check before requesting) | (audit-detected) | 2026-05-19 | — |

### Brand surface tokens (lowest priority — currently `--app-*`)

These are app-only inventions and arguably out of scope for the shared library — but
since the rule bans **all** app-namespace tokens, they're recorded here for the decision
to either (a) move to library tokens or (b) replace with raw values.

| # | Token name in use | Suggested resolution | Used by | Logged | Resolved |
|---|-------------------|----------------------|---------|--------|----------|
| T18 | `--app-brand-primary` | Replace with `var(--primary-base)` | (audit-detected) | 2026-05-19 | — |
| T19 | `--app-brand-primary-soft` | Replace with `var(--primary-hover)` | (audit-detected) | 2026-05-19 | — |
| T20 | `--app-brand-primary-strong` | Replace with `var(--primary-dark)` | (audit-detected) | 2026-05-19 | — |
| T21 | `--app-form-border` | Replace with `var(--input-border-fc)` | (audit-detected) | 2026-05-19 | — |
| T22 | `--app-surface-on-canvas` | Replace with `var(--surface-base)` or `var(--background-on-light)` | (audit-detected) | 2026-05-19 | — |

### Semantic state colours (currently declared in app `styles.scss` :root)

The app declares an error / success / warning trio at `:root` because the library brief
(`.claude/llms.txt`) doesn't list them. These are common to most apps and a natural
addition to the brand contract.

| # | Token name | Library should expose | Logged | Resolved |
|---|------------|----------------------|--------|----------|
| T23 | `--color-error-bg`, `--color-error-border` | Add to the brand contract; the library could also include `--color-error-fc` to round out the trio | 2026-05-19 | — |
| T24 | `--color-warning-bg`, `--color-warning-border` | Add to the brand contract | 2026-05-19 | — |
| T25 | `--color-success-bg`, `--color-success-border` | Add to the brand contract | 2026-05-19 | — |
| T26 | `--field-border-color` | Likely a synonym for `--input-border-fc` (already in the contract). Drop the app declaration. | 2026-05-19 | — |
| T27 | `--dx-card-shadow` (declared with custom value) | The library ships `--dx-card-*` tokens (background, border-radius, header-*) but not a shadow token. Add `--dx-card-shadow` to complete the card-component set. | 2026-05-19 | — |

---

## How to add a new entry

1. Re-run section 5a of `/audit` (or just `comm` the `node_modules/@ngdx/dijta/theme/_dx-theme.scss` allow-list against `var(--…)` usage in app SCSS) to confirm the gap.
2. For a component gap, confirm by grepping `node_modules/@ngdx/dijta/index.d.ts` for any similar `dx-*`.
3. Add a row in the appropriate table. Include: name in use, what the library should expose, where it surfaced, today's date.
4. In the offending code, use the fallback (raw value / Material token / Bootstrap utility) and link this entry in a comment if the workaround is non-obvious.

## Resolving an entry

When the library ships the token or component:

1. Update the row's `Resolved` column with the `@ngdx/dijta` version.
2. Find/replace the temporary fallback in app code with the new library API.
3. Re-run `/audit` — invented-token count should drop.
