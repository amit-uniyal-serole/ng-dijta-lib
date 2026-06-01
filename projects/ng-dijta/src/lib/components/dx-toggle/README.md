---
category: Components
type: Data Entry
title: Toggle
---

An on/off switch form control wrapping Angular Material `mat-slide-toggle`. Implements `ControlValueAccessor` + `Validator` and projects an optional label via the `[dxLabel]` directive.

## When To Use
- When a boolean setting needs an immediate, visible on/off affordance (notifications on/off, feature flag).
- When the field must integrate with template-driven or reactive forms.
- When the label must support translation or custom template content via `[dxLabel]`.
- When required validation is needed for the on-state (e.g. accept-terms toggle).

## API

```html
<dx-toggle [(ngModel)]="isEnabled">
  <ng-container dxLabel>Enable notifications</ng-container>
</dx-toggle>
```

### dx-toggle

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Whether the toggle is disabled | `boolean` | `false` |
| `[readonly]` | Whether the toggle is read-only | `boolean` | `false` |
| `[required]` | Mark the control as required (must be `true` to pass validation) | `boolean` | `false` |
| `[labelPosition]` | Placement of the projected label | `'before' \| 'after'` | `'after'` |
| `[labelTouchSensitive]` | Whether clicking the label also toggles the control | `boolean` | `true` |
| `[tabIndex]` | Tab index of the underlying input | `number` | - |
| `[id]` | Element id (auto-generated when omitted) | `string` | `dx-toggle-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the toggle loses focus | `EventEmitter<FocusEvent>` |

### Content Slots

- `[dxLabel]` - Label content projected next to the toggle.

## Examples

### Basic (template-driven)

```html
<dx-toggle [(ngModel)]="darkMode">
  <ng-container dxLabel>Dark mode</ng-container>
</dx-toggle>
```

### Label before the toggle

```html
<dx-toggle [(ngModel)]="autoSave" labelPosition="before">
  <ng-container dxLabel>Auto-save</ng-container>
</dx-toggle>
```

### Reactive form with required

```typescript
form = new FormGroup({
  acceptTerms: new FormControl(false, Validators.requiredTrue),
});
```

```html
<form [formGroup]="form">
  <dx-toggle formControlName="acceptTerms" [required]="true">
    <ng-container dxLabel>I accept the terms and conditions</ng-container>
  </dx-toggle>
</form>
```

### Disabled

```html
<dx-toggle [(ngModel)]="value" [disabled]="true">
  <ng-container dxLabel>Read-only setting</ng-container>
</dx-toggle>
```

## Import

```typescript
import { DxToggleModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxToggleModule]
})
export class YourModule { }
```
