---
description: Generate component boilerplate for ng-dijta or practice (Angular 18 + Material)
model: sonnet
---

# /scaffold

Create the file structure for a new `dx-*` component. Matches the existing NgModule pattern used across `projects/ng-dijta/src/lib/components/`.

## Workflow

1. **Material-first check** — don't scaffold a custom component if Material already provides it
2. **Name + target** — component name and project (`ng-dijta` vs. `practice`)
3. **Generate files** — component, template, SCSS, module, index, spec
4. **Public API** — re-export via `public-api.ts`
5. **Verify** — lint + typecheck + build + spec

## Step 1 — Details

Ask the user for:
- Component name (e.g. `status-badge` → produces `dx-status-badge`)
- Category subfolder (optional; default: flat under `components/`)
- Target (`ng-dijta` library or `practice` app)

## Step 2 — Material-First Check (MANDATORY)

Confirm the need isn't already covered by Angular Material or CDK. If it is, STOP — use the Material primitive directly (or a thin wrapper only if the team has agreed to standardise).

Also grep existing components to avoid duplicates:

```bash
ls projects/ng-dijta/src/lib/components/ | grep -i {name-fragment}
```

## Step 3 — Directory Structure

### Library component (`ng-dijta`) — NgModule + external files

```
projects/ng-dijta/src/lib/components/dx-{name}/
├── dx-{name}.component.ts
├── dx-{name}.component.html
├── dx-{name}.component.scss
├── dx-{name}.component.spec.ts
├── dx-{name}.module.ts
└── index.ts
```

### Practice app component

```
projects/practice/src/app/{feature}/
├── {feature}.component.ts
├── {feature}.component.html
├── {feature}.component.scss
└── {feature}.component.spec.ts
```

## Step 4 — Templates

### `dx-{name}.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * {One-sentence description of what this component does}.
 *
 * @example
 * ```html
 * <dx-{name} [label]="'Hello'"></dx-{name}>
 * ```
 */
@Component({
  selector: 'dx-{name}',
  templateUrl: './dx-{name}.component.html',
  styleUrls: ['./dx-{name}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dx{PascalName}Component {
  /** Visible label for the control. */
  @Input() label = '';

  /** Disables user interaction. @default false */
  @Input() disabled = false;
}
```

### `dx-{name}.component.html`

```html
<div class="dx-{name}" [class.dx-{name}--disabled]="disabled">
  <ng-content></ng-content>
  <span class="dx-{name}__label">{{ label }}</span>
</div>
```

### `dx-{name}.component.scss`

```scss
@use '@angular/material' as mat;

:host {
  display: inline-flex;
}

.dx-{name} {
  display: inline-flex;
  align-items: center;
  gap: var(--dx-spacing-sm, 0.5rem);
  padding: var(--dx-spacing-sm, 0.5rem) var(--dx-spacing-md, 1rem);
  border-radius: var(--dx-radius-md, 0.5rem);
  background: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &__label {
    font: var(--mat-sys-body-medium);
  }
}
```

### `dx-{name}.module.ts`

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Dx{PascalName}Component } from './dx-{name}.component';

@NgModule({
  imports: [CommonModule],
  declarations: [Dx{PascalName}Component],
  exports: [Dx{PascalName}Component],
})
export class Dx{PascalName}Module {}
```

### `index.ts`

```typescript
export * from './dx-{name}.component';
export * from './dx-{name}.module';
```

### `dx-{name}.component.spec.ts` (Karma + Jasmine)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dx{PascalName}Component } from './dx-{name}.component';
import { Dx{PascalName}Module } from './dx-{name}.module';

describe('Dx{PascalName}Component', () => {
  let component: Dx{PascalName}Component;
  let fixture: ComponentFixture<Dx{PascalName}Component>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dx{PascalName}Module],
    }).compileComponents();

    fixture = TestBed.createComponent(Dx{PascalName}Component);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the label', () => {
    component.label = 'Hello';
    fixture.detectChanges();
    expect(element.textContent).toContain('Hello');
  });

  it('applies the disabled modifier', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(element.querySelector('.dx-{name}--disabled')).toBeTruthy();
  });
});
```

## Step 5 — Update `public-api.ts`

Append to [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts):

```typescript
export * from './lib/components/dx-{name}';
```

## Step 6 — Validate

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npx ng build ng-dijta
npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-{name}.component.spec.ts"
```

## Key Rules

- **Library components**: NgModule + external `templateUrl` / `styleUrls` — match the existing 274 components
- **All components**: `ChangeDetectionStrategy.OnPush`, `dx-` prefix, JSDoc on class + inputs
- **Styling**: Material theme tokens (`mat.get-theme-color` or `var(--mat-sys-*)`) and declared `--dx-*` design tokens with fallbacks. NO hardcoded colors
- **Tests**: Karma + Jasmine
- **Accessibility**: `aria-label` on interactive elements; `aria-hidden="true"` on decorative icons
- **i18n**: user-facing strings / ARIA labels through Transloco

## Related

- `/fe-build` — implement full component behaviour
- `/fe-test` — expand the spec
- `/fe-review` — validate compliance
- [fe-component-builder.md](../agents/fe-component-builder.md) — full patterns
