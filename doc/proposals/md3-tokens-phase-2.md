# MD3 Token Aliases — Phase 2 (Proposal)

**Status:** Proposal — not implemented
**Phase 1 landed:** T5–T11 + `--dx-error` shipped as aliases in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss) (resolve through existing library tokens, brand overrides flow through automatically).

This document captures the audit-detected tokens that **do not have a library source today** and would require introducing new defaults rather than aliasing existing ones.

---

## Scope

| ID | Token(s) | Audit usage |
|----|----------|-------------|
| T12-rest | `--dx-on-error`, `--dx-error-container` (and `--dx-on-error-container`) | App declares `--color-error-bg` / `--color-error-border` in its own `styles.scss` |
| T13 | `--dx-outline` | Audit-detected, no library equivalent |
| T14 | `--dx-focus-ring` | Audit-detected, no library equivalent |
| T15 | `--dx-primary-container`, `--dx-secondary-container` (and the `--dx-on-*-container` pair) | Audit-detected, no library equivalent |

These are **net-new tokens**, not aliases. Phase 1 was safe because every alias resolved through a token the library already owned; phase 2 requires the library to pick default values.

---

## Why split this from phase 1

- **Phase 1 is mechanical** — `var(--primary-base)` already has a brand value, the alias just adds a second name for it. Zero design decision.
- **Phase 2 introduces values the library has never expressed.** What is the default outline color? The default focus-ring color? The default error-container fill? Those are theme decisions, not naming decisions, and they need brand + a11y sign-off.

Keeping them separate means phase 1 ships in days, phase 2 ships when defaults are agreed.

---

## Open design questions

### T12-rest — full MD3 error trio

The library has `--error-fc` (foreground / text color, default `#bd3232`). MD3 expects:

| MD3 token | Role | Library has? | Proposed default |
|-----------|------|--------------|------------------|
| `--dx-error` | Error text / icon foreground | ✓ (aliased to `--error-fc` in phase 1) | `#bd3232` |
| `--dx-on-error` | Foreground on a solid error surface (typically white) | ✗ | `#FFFFFF` (tentative) |
| `--dx-error-container` | Low-emphasis error background fill | ✗ — app declares `--color-error-bg` itself | Needs brand pick (the app uses something in the pink/red-50 family) |
| `--dx-on-error-container` | Foreground on the error-container fill | ✗ — app declares `--color-error-border` for related role | Needs brand pick |

**Decisions needed:**
1. Single source of truth — should the library declare these directly, or should they also alias through new legacy names (e.g. `--error-container-bg`)? Recommendation: declare directly under `--dx-*` since there's no legacy name to preserve.
2. Brand defaults for the container colors. Capture the values the consumer apps are already using in `styles.scss` and standardize on those.
3. Contrast verification — the container/on-container pair must clear WCAG AA (4.5:1 for body text) per [accessibility.md](../../.claude/rules/accessibility.md).

### T13 — `--dx-outline`

MD3 uses `outline` for borders on form fields, dividers between sections, low-emphasis component edges. Today the library scatters border colors across component partials (`--input-border-fc`, hardcoded `#e0e0e0`-family values in component SCSS, Material's `--mdc-outlined-button-*`).

**Decisions needed:**
1. Default value — Material 3 reference is roughly `rgba(0,0,0,0.12)` for light mode. Recommendation: pick a single neutral that matches existing form-field outlines.
2. Whether to retro-fit existing `--input-border-fc` to alias from `--dx-outline`, or leave that out of scope.

### T14 — `--dx-focus-ring`

**Tier-1 accessibility concern.** Per [accessibility.md](../../.claude/rules/accessibility.md), focus indicators must meet 3:1 contrast against the adjacent background. A library-wide focus ring token must:
- Be visible against `--dx-surface` (light) and any future dark surface
- Default to a value that clears 3:1 on both
- Document the contrast guarantee in the token's declaration comment

**Decisions needed:**
1. Default value — typically the brand primary or a dedicated focus color (MD3 uses the primary by default).
2. Whether the token represents the **color** only, or the full ring (color + width + offset). Recommendation: color only — let consumers compose the `outline` shorthand.

### T15 — `--dx-primary-container`, `--dx-secondary-container`

MD3 container tokens are lower-emphasis fills derived from primary/secondary, used for chips, badges, info tiles, etc. The library has no equivalent today — components either use `--primary-base` directly (high emphasis) or fall back to neutral surfaces.

**Decisions needed:**
1. Default values per brand. MD3 reference uses tonal palette steps (primary-90 / secondary-90 in light mode); we don't ship a tonal palette, so this needs a manual pick per brand.
2. Whether to add the matching `--dx-on-primary-container` / `--dx-on-secondary-container` pair at the same time. Recommendation: yes — container tokens without on-* tokens are an a11y trap.

---

## Recommended sequencing

1. **Phase 2a — Error container** (T12-rest). Smallest scope; the consumer apps already have concrete values we can lift as defaults.
2. **Phase 2b — Outline + focus ring** (T13, T14). Needs a11y review.
3. **Phase 2c — MD3 surface + role containers** (T15 + T10 follow-up). Largest design surface; depends on brand input. Lands `--dx-surface-container-low`, `--dx-surface-container`, `--dx-primary-container`, `--dx-secondary-container` (each with its `--dx-on-*` pair), then deprecates `--dx-surface-card` per the T10 follow-up below.

Each phase remains non-breaking — adding a `--dx-*` token the library didn't declare before only improves resolution for consumers that were already using it.

---

## T10 follow-up — deprecate `--dx-surface-card`

Phase 1 shipped `--dx-surface-card` as an alias for `--surface-base`. After consumer-side review, the right long-term move is to **deprecate the token** rather than re-point it. Captured here so phase 2c carries the migration.

### Why it was added in phase 1 anyway

The audit detected `--dx-surface-card` in the consumer codebase, so an alias was the safest landing: it stops the unresolved `var()` from biting today and gives us time to decide the right shape. With the consumer-side review done, we now know what should happen next.

### What the audit actually found

| Group | Usage | Correct token | Notes |
|-------|-------|---------------|-------|
| Group A | Button surface (white card-style backing) | `--dx-surface` or component-level `--dx-card-background` | Real card-like usage. `--surface-base` mapping is right. |
| Group B | Table-header backings (3 sites) | `--dx-surface-variant` (already shipped in phase 1) | Misclassification — author was reaching for the whole MD3 vocabulary (same files also used `--dx-spacing-*`, `--dx-outline`, `--dx-primary-container`, `--dx-radius-sm`). Not a deliberate semantic choice. |

So `--dx-surface-card` covers no use case that another shipped token doesn't already cover. Keeping it long-term means two names for one concept — the duplication smell flagged in the original audit.

### Phase 2c plan

1. **When `--dx-surface-container-low` ships** (with the rest of T15), update Group A consumers to use that token (the MD3-correct one for cards on a tinted page).
2. **Migrate Group B consumers** to `--dx-surface-variant`. Already possible today — doesn't depend on any new token.
3. **Mark `--dx-surface-card` deprecated** in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss) with an inline comment pointing to the replacements.
4. **Remove `--dx-surface-card`** in the next library major (or after the deprecation window the team agrees on — likely one minor cycle).

### Consumer guidance until phase 2c lands

- New code targeting cards on the default white surface: prefer `--dx-surface` or `--dx-card-background`.
- New code targeting secondary / tinted backgrounds (e.g. table headers, info strips): use `--dx-surface-variant`.
- Don't add new uses of `--dx-surface-card`. Existing uses continue to resolve through the alias without change.

---

## What consumers should do in the meantime

For any phase-2 token not yet shipped, declare it at `:root` in the app's own `styles.scss`. Example:

```scss
:root {
  /* Until --dx-error-container ships in the library */
  --dx-error-container: #fde7e7;
  --dx-on-error-container: #5a1212;
}
```

When the library ships the token, the consumer's local declaration takes precedence in the cascade — no breakage, no rush to migrate.

---

## Out of scope

- Migrating component partials to use the new tokens. Phase 1/2 only declare the tokens; component-level adoption is a separate, opt-in change.
- Dark-mode pairings. The library has no dark-mode story yet (see [theming.md](../../.claude/rules/theming.md) — components must be scheme-agnostic). When dark mode lands, every MD3 token in scope here gets a paired dark value at the theme switch layer.
- Renaming the existing legacy tokens (`--primary-base`, `--surface-light`, etc.). They stay — the MD3 names are aliases / additions, never replacements.

---

## Tracking

- Phase 1 PR: this branch (`feat/md3-token-aliases`)
- Phase 2 PRs: not opened yet — file separately as each sub-phase has defaults agreed
- Audit log reference: rows T12 (partial), T13, T14, T15 — logged 2026-05-19
