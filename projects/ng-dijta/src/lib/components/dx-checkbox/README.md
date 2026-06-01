# dx-checkbox

Material-based checkbox form control with read-only and view-only modes.

## Overview

`dx-checkbox` wraps Angular Material's `<mat-checkbox>` with ng-dijta form integration patterns — supporting `disabled`, `readonly`, and `viewOnly` display states, as well as custom content projection for labels and error messages. It implements `ControlValueAccessor` for seamless use with both Reactive and Template-Driven Forms.

## Module Import

```typescript
import { DxCheckboxModule } from 'ng-dijta';

@NgModule({
  imports: [DxCheckboxModule]
})
export class AppModule {}
```

## Selector

`<dx-checkbox>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable the checkbox — user cannot interact with it |
| `readonly` | `boolean` | `false` | Render as read-only — visually interactive but value cannot be changed |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction, suitable for display pages |
| `tabIndex` | `number` | — | Tab index for keyboard navigation |
| `id` | `string` | auto-generated | Element ID (auto-incremented `dx-checkbox-N`) |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onInputChange` | `EventEmitter<boolean>` | Emitted when the checkbox value changes — provides the new boolean value |
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the checkbox loses focus |

### Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label | `<dx-checkbox-label>` | Text label displayed beside the checkbox |
| Error | `<dx-checkbox-error>` | Error message shown when validation fails |

> **Note:** If `dx-checkbox-label` or `dx-checkbox-error` cause "unknown element" errors, add `CUSTOM_ELEMENTS_SCHEMA` to your module:
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> @NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
> ```

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
form = this.fb.group({
  acceptTerms: [false, Validators.requiredTrue]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-checkbox formControlName="acceptTerms">
    <dx-checkbox-label>I accept the Terms & Conditions</dx-checkbox-label>
    <dx-checkbox-error
      *ngIf="form.controls['acceptTerms'].invalid && form.controls['acceptTerms'].touched">
      You must accept the terms
    </dx-checkbox-error>
  </dx-checkbox>
</form>
```

### Template-Driven Form

```html
<dx-checkbox [(ngModel)]="isActive" name="active">
  <dx-checkbox-label>Active</dx-checkbox-label>
</dx-checkbox>
```

### Disabled and View-Only States

```html
<!-- Disabled: cannot toggle -->
<dx-checkbox formControlName="agreed" [disabled]="true">
  <dx-checkbox-label>Agreement</dx-checkbox-label>
</dx-checkbox>

<!-- View-only: display mode, no interaction -->
<dx-checkbox formControlName="agreed" [viewOnly]="true">
  <dx-checkbox-label>Agreement</dx-checkbox-label>
</dx-checkbox>
```

### With Change Event

```html
<dx-checkbox
  [(ngModel)]="isEnabled"
  (onInputChange)="onToggle($event)">
  <dx-checkbox-label>Enable Feature</dx-checkbox-label>
</dx-checkbox>
```

```typescript
onToggle(checked: boolean): void {
  console.log('Checkbox changed to:', checked);
}
```

## Features

- **Material checkbox** — uses Angular Material's `<mat-checkbox>` as the underlying control
- **ControlValueAccessor** — works with `formControlName`, `formControl`, and `ngModel`
- **Three display states** — `disabled`, `readonly`, and `viewOnly` for different use cases
- **Content projection** — supports `<dx-checkbox-label>` and `<dx-checkbox-error>` slots
- **Blur event** — enables touched state tracking for form validation
- **Auto-ID** — unique ID auto-generated per instance for accessibility
