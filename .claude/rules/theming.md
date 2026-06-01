# Theming Rules

**Scope:** Theme system implementation and SCSS conventions for ng-dijta.

---

## Theme Architecture

| Layer | Owner | Technology |
|-------|-------|------------|
| Base theme | `projects/ng-dijta/src/lib/theme/_theme.scss` | Angular Material theming APIs |
| Component theme partials | `src/lib/theme/{component}/*.scss` | SCSS partials per component |
| Design tokens | `src/lib/theme/tokens/` | SCSS variables / CSS custom properties |
| Bundled SCSS | `dist/ng-dijta/theme.scss` | Generated via [scss-bundle.config.json](../../scss-bundle.config.json) |
| Component styling | Component inline `styles` | Material tokens + component-scoped classes |

Consumers import the bundled theme SCSS. Component selectors and classes all use the `dx-` prefix.

---

## Color Styling: Theme Tokens Only

**All colors come from the Material theme defined in `_theme.scss` or from documented design tokens.** Do not hardcode colors in component SCSS.

```scss
// CORRECT — Material theme tokens
@use '@angular/material' as mat;

.dx-card {
  background: mat.get-theme-color($theme, surface);
  color: mat.get-theme-color($theme, on-surface);
  border: 1px solid mat.get-theme-color($theme, outline);
}

// CORRECT — design token (declared in src/lib/theme/tokens/)
.dx-card {
  background: var(--dx-surface-card);
  border-radius: var(--dx-radius-md);
}

// WRONG — Hardcoded color
.dx-card {
  background: #f5f7f8;
  color: #333;
}
```

---

## Design Token Naming

```
--dx-{target}-{property}
```

| Rule | Status |
|------|--------|
| Kebab-case only | **MANDATORY** |
| No camelCase fragments | **MANDATORY** |
| No scheme words (`light`, `dark`) in token names | **MANDATORY** |
| No state words (`hover`, `focus`, `disabled`) in token names | **MANDATORY** |

Declare design tokens in `projects/ng-dijta/src/lib/theme/tokens/` with hardcoded fallbacks for consumers that haven't imported the theme:

```scss
:root {
  --dx-spacing-sm: 0.5rem;
  --dx-radius-md: 0.5rem;
}
```

Use in components with the fallback:

```scss
.dx-card {
  border-radius: var(--dx-radius-md, 0.5rem);
}
```

### MD3-aligned alias subset (sanctioned exception)

The library exposes a small set of MD3-style aliases (e.g. `--dx-primary`, `--dx-on-primary`, `--dx-on-surface`, `--dx-surface-variant`, `--dx-error`) declared in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss). These deviate from the `--dx-{target}-{property}` ordering — `on-*` is a modifier, not a target — and are accepted as a deliberate carve-out:

- **Rationale:** MD3 alignment is the explicit goal. Re-prefixing the family to fit our ordering rule would break recognition for any consumer familiar with Material 3 token names, with no functional gain. The carve-out has a clearer cost/benefit than re-prefixing the family.
- **Scope:** Limited to MD3 role tokens — `--dx-primary` / `--dx-on-primary` / `--dx-secondary` / `--dx-on-secondary` / `--dx-surface` / `--dx-on-surface` / `--dx-surface-variant` / `--dx-on-surface-variant` / `--dx-surface-card` / `--dx-error` / `--dx-on-error` / `--dx-error-container` / `--dx-on-error-container` / `--dx-outline` / `--dx-*-container`.
- **New tokens outside this subset still follow `--dx-{target}-{property}`.** Don't generalise the MD3 ordering to non-MD3 tokens.
- **No state words.** The MD3 subset still respects Guardrail 3 — variant is structural, not state.

### Spacing scale (canonical 5-step subset)

The library exposes a fixed 5-step spacing scale, declared in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss). Library components and consumer apps MUST reference these tokens for padding / margin / gap values instead of raw `rem` / `px` literals.

| Token | Value | Pixels | Typical use |
|-------|-------|--------|-------------|
| `--dx-spacing-xs` | `0.25rem` |  4px | Icon-to-text gap, tight inline spacing |
| `--dx-spacing-sm` | `0.5rem`  |  8px | Compact form rows, chip padding |
| `--dx-spacing-md` | `1rem`    | 16px | Default block padding, card content |
| `--dx-spacing-lg` | `1.5rem`  | 24px | Section gaps, dialog padding |
| `--dx-spacing-xl` | `2rem`    | 32px | Page-level vertical rhythm |

- **Pattern:** `--dx-{target}-{property}` with `spacing` as the target and the size modifier (`xs`/`sm`/`md`/`lg`/`xl`) as the property — fully compliant with the naming rule.
- **Geometry:** monotonically increasing; `md` is the design baseline (`1rem`). The progression (xs ¼ / sm ½ / md 1 / lg 1½ / xl 2) gives a calm, easy-to-reason rhythm; do not invent intermediate steps.
- **No state words.** Spacing scales describe structure, not interaction state.
- **Migration target.** Inline literals in library SCSS and consumer apps should be migrated to these tokens over time (tracked separately — out of scope for the token-shipping PR).

### Radius scale (canonical 3-step subset)

Paired with the spacing scale, also declared in [partials/_default.scss](../../projects/ng-dijta/src/lib/theme/partials/_default.scss).

| Token | Value | Pixels | Typical use |
|-------|-------|--------|-------------|
| `--dx-radius-sm` | `0.25rem` |  4px | Chips, small inputs |
| `--dx-radius-md` | `0.5rem`  |  8px | Cards, buttons (default) |
| `--dx-radius-lg` | `1rem`    | 16px | Modals, large surfaces |

Same rules apply: kebab-case, no state words, monotonic.

---

## Scheme Handling (Dark Mode)

Dark mode is driven by the Material theme (`_theme.scss`). Components read colors from Material theme APIs — they MUST NOT check or branch on the active scheme.

- **DO:** Use Material theme tokens / CSS variables
- **DO NOT:** Check or read the current scheme
- **DO NOT:** Use conditional logic based on light/dark mode inside a component
- **DO NOT:** Import Material private theming APIs from component code

Components must work identically in light and dark modes — all scheme differences are resolved via CSS variables.

---

## Guardrails

### Guardrail 1: No Hardcoded Colors in Components

Components MUST NOT use hardcoded hex, rgb, or hsl colors. Use Material theme tokens or declared design tokens.

**Verification:**
```bash
grep -rE "(#[0-9a-fA-F]{3,8}|rgb\(|hsl\()" --include="*.scss" projects/ng-dijta/src/lib/components
# Should return empty (excluding comments)
```

### Guardrail 2: No Runtime Color Computation in Components

UI components MUST NOT perform runtime color generation or manipulation. All colors come from the theme.

**Forbidden in components:**
- `chroma`, `tinycolor`, `color-convert` library imports
- HSL/RGB manipulation functions

**Verification:**
```bash
grep -rE "import.*(chroma|tinycolor|color-convert)" --include="*.ts" projects/ng-dijta/src/lib/components
# Must return empty
```

### Guardrail 3: Scheme-Agnostic Variable Names

CSS variable names MUST NOT include scheme or state identifiers.

**Forbidden substrings in `--dx-*` names:** `light`, `dark`, `default`, `hover`, `active`, `disabled`, `focus`, `pressed`, `selected`, `expanded`

**Verification:**
```bash
grep -rE "var\(--dx-[^)]*-(light|dark|default|hover|active|disabled|focus|pressed|selected|expanded)-" --include="*.scss" projects/ng-dijta
# Must return empty
```

### Guardrail 4: Kebab-Case Only

**Verification:**
```bash
grep -rE "var\(--dx-[a-z0-9-]*[a-z][A-Z]" --include="*.scss" projects/ng-dijta
# Must return empty
```

---

## Checklist

- [ ] Colors use Material theme tokens or declared `--dx-*` design tokens
- [ ] No hardcoded colors in component SCSS
- [ ] CSS variable names are kebab-case only
- [ ] No scheme / state words in variable names
- [ ] Components are scheme-agnostic (no conditional light/dark logic)
- [ ] No color manipulation libraries imported in component code
- [ ] No `::ng-deep` or Material private API usage in components
