---
category: Components
type: Data Entry
title: Checkbox
---

A form-integrated checkbox that wraps Angular Material `mat-checkbox` and implements `ControlValueAccessor` + `Validator` so it plugs into both template-driven and reactive forms. Labels and error messages are projected via `dx-label` / `dx-error` slots.

## When To Use

- When you need a single boolean input bound via `ngModel` or `formControlName`.
- When you want a consistently styled checkbox with a projected label and error slot.
- For multi-select from a list of options, use `dx-chip-select` or `mat-selection-list` instead.

## API

```html
<dx-checkbox formControlName="acceptTerms">
  <dx-label>I accept the terms and conditions</dx-label>
  <dx-error>This field is required</dx-error>
</dx-checkbox>
```

### dx-checkbox

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[id]` | Unique element id (auto-generated when omitted) | `string` | `dx-checkbox-{n}` |
| `[disabled]` | Whether the checkbox is disabled | `boolean` | `false` |
| `[readonly]` | Render as read-only (non-editable) | `boolean` | `false` |
| `[viewOnly]` | Render in view-only mode (display current value, no interaction) | `boolean` | `false` |
| `[required]` | Marks the checkbox as required (renders the asterisk) | `boolean` | `false` |
| `[tabIndex]` | Custom tab index for keyboard navigation | `number` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onInputChange)` | Emitted when the checked state changes; payload is the new boolean value | `EventEmitter<boolean>` |
| `(blur)` | Emitted when the checkbox loses focus | `EventEmitter<FocusEvent>` |

### Content Slots

- `dx-label` — Visible label text (required for accessibility).
- `dx-error` — Validation error message displayed when the bound control is invalid and touched.

## Examples

### Template-driven

```html
<dx-checkbox [(ngModel)]="isSubscribed" (onInputChange)="onToggle($event)">
  <dx-label>Subscribe to newsletter</dx-label>
</dx-checkbox>
```

### Reactive form with validation

```typescript
form = this.fb.group({
  acceptTerms: [false, Validators.requiredTrue]
});
```

```html
<form [formGroup]="form">
  <dx-checkbox formControlName="acceptTerms">
    <dx-label>I accept the terms</dx-label>
    <dx-error>You must accept the terms to continue</dx-error>
  </dx-checkbox>
</form>
```

### Disabled

```html
<dx-checkbox [(ngModel)]="isActive" [disabled]="true">
  <dx-label>Feature is locked</dx-label>
</dx-checkbox>
```

### View-only

```html
<dx-checkbox [(ngModel)]="savedValue" [viewOnly]="true">
  <dx-label>Auto-renewal enabled</dx-label>
</dx-checkbox>
```

## Import

```typescript
import { DxCheckboxModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxCheckboxModule]
})
export class YourModule { }
```
