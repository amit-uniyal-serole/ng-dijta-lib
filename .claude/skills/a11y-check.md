---
description: Accessibility (WCAG AA) audit for ng-dijta components
model: sonnet
---

# /a11y-check

Static accessibility audit for `ng-dijta` components per [.claude/rules/accessibility.md](../rules/accessibility.md). Reports findings only — does not edit.

## When to Use

- Before merging a component that ships public behaviour
- On any component that receives a bug report from assistive-tech users
- Periodically against the whole library

## Scope

- `/a11y-check` — all library components
- `/a11y-check <component-name>` — single component
- `/a11y-check practice` — the preview app

## Checks

### 1. Interactive elements have accessible names

```bash
# Icon-only mat-icon-button with no aria-label
grep -rn "mat-icon-button" --include="*.html" projects/ng-dijta/ projects/practice/ \
  | grep -v "aria-label\|aria-labelledby\|\[attr\.aria-label\]"
```

Every `mat-icon-button`, every custom icon-only control, must carry an `aria-label` (or `aria-labelledby`). Generic values (`"Action"`, `"Click"`, `"Button"`) fail — the label must describe the action in the user's language.

### 2. Decorative icons hidden

```bash
# mat-icon without aria-hidden or an explicit aria-label
grep -rn "<mat-icon" --include="*.html" projects/ng-dijta/ projects/practice/ \
  | grep -v "aria-hidden\|aria-label"
```

Decorative `<mat-icon>` elements must declare `aria-hidden="true"`. Semantic icons (status, error) must carry an explicit `aria-label`.

### 3. Form controls are labelled

- Every `<input matInput>` has a surrounding `<mat-form-field>` with `<mat-label>`, or an `aria-label`/`aria-labelledby`
- `<mat-error>` referenced by `aria-describedby` so screen readers announce errors
- Required fields announce required state (`aria-required="true"` or a visible required marker + text alternative)

### 4. Translations cover ARIA

```bash
# Bindings that set ARIA without going through Transloco
grep -rnE "\[attr\.aria-label\]=\"'[^']+'\"" --include="*.html" projects/ | grep -v transloco
grep -rnE "aria-label=\"[A-Z]" --include="*.html" projects/
```

All ARIA labels MUST be translatable via the `transloco` pipe or `TranslocoService`.

### 5. Keyboard & focus

- Custom (non-Material) interactive components handle `Enter`, `Space`, and `Escape` where relevant
- `tabindex="-1"` for disabled elements; never a positive `tabindex` value
- Focus indicator visible — do NOT rely on `outline: none` without a replacement

### 6. `prefers-reduced-motion`

- Components with animations have a `@media (prefers-reduced-motion: reduce)` override removing or shortening motion
- Uses `BreakpointObserver`-style animation gating for heavy transitions

### 7. Color contrast

- Component SCSS must not introduce contrast below WCAG AA (4.5:1 normal text, 3:1 large text / UI)
- Flag any overrides that darken text on a surface token

### 8. Live regions

- Dynamic status updates use `aria-live="polite"` (or `role="alert"` for errors)
- Modal dialogs rely on `MatDialog` (provides role/aria-modal/focus trap)

## Report Template

```markdown
## Accessibility Audit — {Scope}

### Summary
- Critical: N
- High: N
- Medium: N

### Critical
1. **Missing accessible name** — [dx-foo.component.html:12](...)
   - Control: `<button mat-icon-button>`
   - Fix: add `[attr.aria-label]="'dx.foo.remove' | transloco"`

### High
...

### Medium
...
```

## What This Does NOT Cover

- Runtime behaviour (focus order, reading order, live-region announcement timing) — runs through a manual screen-reader pass or axe-core
- Contrast verification against the actual Material theme — consider a runtime tool
- Motion preferences in animations defined outside component SCSS (shared animation partials)

## Related

- [.claude/rules/accessibility.md](../rules/accessibility.md) — source rules
- `/audit a11y` — broader compliance scan
- `/fe-review` — code review including accessibility
