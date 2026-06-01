# Rule Hierarchy

**Scope:** Defines precedence when rules conflict in the ng-dijta Angular 18 + Material frontend.

---

## Tier 1: Non-Negotiable

Rules that MUST be followed. Violations block merge.

- **[frontend-prohibited.md](frontend-prohibited.md)** — Forbidden patterns
- **[security.md](security.md)** — Security best practices (XSS, sanitization, data handling)
- **[accessibility.md](accessibility.md)** — WCAG AA compliance, ARIA, keyboard navigation

---

## Tier 2: Core Patterns

Rules that define how code is written.

- **[angular18.md](angular18.md)** — Angular 18 core patterns (NgModules, decorators, Material-era DI)
- **[angular-material.md](angular-material.md)** — Angular Material component usage and theming
- **[ng-dijta.md](ng-dijta.md)** — `ng-dijta` library conventions and `practice` preview app
- **[i18n.md](i18n.md)** — Transloco 7.5 i18n patterns and translation keys
- **[performance.md](performance.md)** — Bundle size, change detection, lazy loading
- **[theming.md](theming.md)** — SCSS tokens and `scss-bundle` conventions

---

## Tier 3: Quality Standards

Rules that ensure consistency.

- **[frontend-style-guide.md](frontend-style-guide.md)** — Naming and organization
- **[frontend-testing.md](frontend-testing.md)** — Karma + Jasmine test patterns
- **[jsdoc.md](jsdoc.md)** — JSDoc requirements for public APIs
- **[ai-md-maintenance.md](ai-md-maintenance.md)** — Keep AI.md in sync with public API

---

## Tier 4: Operational

- **[CLAUDE.md](../../CLAUDE.md)** — AI operational guidance

---

## Conflict Resolution

### Same Tier Conflict

Claude MUST:
1. **STOP** — Do not proceed
2. **REPORT** — Identify both rules and the conflict
3. **ASK** — Request clarification

### Different Tier Conflict

Higher tier wins. Claude MUST document the resolution:

> "Rule X from [file].md conflicts with rule Y from [file].md.
> [Higher tier file] is Tier N, [lower tier file] is Tier M.
> Following [higher tier] rule."

### No "Best Effort" Resolutions

- Ambiguity requires clarification
- Do not guess intent
- Do not make compromises between conflicting rules

---

## Quick Reference

| Tier | Rules | Conflicts |
|------|-------|-----------|
| 1 | frontend-prohibited, security, accessibility | STOP and ask |
| 2 | angular18, angular-material, ng-dijta, i18n, performance, theming | STOP and ask |
| 3 | frontend-style-guide, frontend-testing, jsdoc, ai-md-maintenance | Yield to higher |
| 4 | CLAUDE.md | Yield to all |

---

*When in doubt, STOP and ask.*
