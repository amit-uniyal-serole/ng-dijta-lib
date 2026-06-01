---
description: Check key ng-dijta dependencies for outdated versions and security advisories
model: haiku
---

# Check Dependencies

Read [package.json](../../package.json) and check the latest stable versions of the following ng-dijta dependencies on the npm registry. Report outdated or vulnerable entries.

## Checks

- `@angular/*` (common, core, cdk, material, router, forms, animations)
- `@angular/material-moment-adapter`
- `@jsverse/transloco`
- `@casl/ability`, `@casl/angular`
- `rxjs`
- `typescript`
- `zone.js`
- `ng-packagr`
- `karma`, `karma-jasmine`, `jasmine-core`
- `@compodoc/compodoc`
- `scss-bundle`

## Procedure

1. Read `package.json`.
2. For each dependency above, query `npm view <pkg> version` (or use `WebFetch` against `https://registry.npmjs.org/<pkg>/latest`).
3. Run `npm audit --production --omit=dev 2>&1 | head -80` and summarise high/critical advisories.
4. Stay within the **Angular 18.x line** — major bumps for Angular / Material / CDK require a coordinated migration epic, never flag them as "just update".

## Output

```
| Dependency                    | Current  | Latest   | Status            |
|-------------------------------|----------|----------|-------------------|
| @angular/core                 | 18.1.0   | 18.2.13  | MINOR AVAILABLE   |
| @angular/material             | 18.1.0   | 18.2.13  | MINOR AVAILABLE   |
| @jsverse/transloco            | 7.5.0    | 7.6.2    | PATCH AVAILABLE   |
| typescript                    | 5.4.5    | 5.4.5    | OK                |
```

Flag:
- **MAJOR AVAILABLE** — major-version bump (informational; do NOT auto-upgrade)
- **MINOR AVAILABLE** / **PATCH AVAILABLE** — safe to upgrade inside same major
- **SECURITY** — `npm audit` returned a high/critical advisory

$ARGUMENTS
