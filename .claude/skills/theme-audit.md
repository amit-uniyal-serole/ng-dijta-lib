---
description: Theming audit — Material tokens, --dx-* design tokens, SCSS hygiene
model: sonnet
---

# /theme-audit

Run the theming guardrails from [.claude/rules/theming.md](../rules/theming.md) against `ng-dijta`. Reports only — does not edit.

## Scope

- `/theme-audit` — full workspace
- `/theme-audit {component-name}` — one component

## Checks

### 1. No hardcoded colors in component SCSS

```bash
grep -rE "(#[0-9a-fA-F]{3,8}|rgb\(|hsl\()" --include="*.scss" \
  projects/ng-dijta/src/lib/components/ | grep -v "^\s*//"
```

Component SCSS must read colors from Material theme tokens (`mat.get-theme-color(...)`, `var(--mat-sys-*)`) or declared `--dx-*` design tokens with fallbacks. Hardcoded values belong only in `projects/ng-dijta/src/lib/theme/tokens/`.

### 2. No color-manipulation libraries in component code

```bash
grep -rnE "import.*(chroma|tinycolor|color-convert)" --include="*.ts" \
  projects/ng-dijta/src/lib/components/
```

Color math belongs to theme partials, not components. A component importing `chroma` is always wrong.

### 3. Scheme-agnostic `--dx-*` names

Substrings that must NOT appear inside `var(--dx-*)`:
`light`, `dark`, `default`, `hover`, `active`, `disabled`, `focus`, `pressed`, `selected`, `expanded`

```bash
grep -rE "var\(--dx-[^)]*-(light|dark|default|hover|active|disabled|focus|pressed|selected|expanded)-" \
  --include="*.scss" projects/ng-dijta/
```

Scheme and state differences are resolved by the Material theme + CSS variables, NOT by encoding them into token names.

### 4. Kebab-case only

```bash
grep -rE "var\(--dx-[a-z0-9-]*[a-z][A-Z]" --include="*.scss" projects/ng-dijta/
```

No camelCase fragments in `--dx-*` names.

### 5. Design tokens declared with fallbacks

Every `var(--dx-foo)` reference in a component should include a fallback so consumers that haven't imported the bundled theme still get something sensible:

```scss
// Good
padding: var(--dx-spacing-md, 1rem);

// Bad — blows up for consumers without the theme
padding: var(--dx-spacing-md);
```

### 6. No `::ng-deep`

```bash
grep -rn "::ng-deep" --include="*.scss" projects/
```

`::ng-deep` is deprecated. Style Material children through the Material theme or use CDK APIs. An entry in a shared theme partial is acceptable; component SCSS is not.

### 7. Material private APIs

```bash
grep -rnE "@use.*'@angular/material/.*_private" --include="*.scss" projects/
grep -rnE "mat\.private-" --include="*.scss" projects/
```

Do not import Material private theming APIs from component code.

### 8. Theme bundle is current

```bash
# scss-bundle config sanity
cat scss-bundle.config.json
```

After theme-related changes, `npm run build:scss` must regenerate `dist/ng-dijta/theme.scss` without error. The bundled file is what consumers import — a failed bundle = broken consumer apps.

## Report Template

```markdown
## Theme Audit — {Scope}

### Guardrails
- [ ] No hardcoded colors in components (N violations)
- [ ] No color-manipulation imports in components (N violations)
- [ ] Scheme-agnostic --dx-* names (N violations)
- [ ] Kebab-case --dx-* names (N violations)
- [ ] Tokens declare fallbacks (N violations)
- [ ] No ::ng-deep (N violations)
- [ ] No Material private APIs (N violations)

### Findings
{File:line | Severity | Rule | Evidence | Fix}
```

## Related

- [theming.md](../rules/theming.md) — source rules
- [angular-material.md](../rules/angular-material.md) — Material integration
- `/audit theme` — broader pattern scan
- `/verify --theme` — inlined guardrail check in the verify flow
