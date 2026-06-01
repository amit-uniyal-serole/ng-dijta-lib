# dx-toggle

Toggle switch (slide switch) form control with configurable label position.

## Overview

`dx-toggle` wraps Angular Material's `<mat-slide-toggle>` as a form-integrated boolean control. It supports `disabled`, `readonly` states, label-touch sensitivity, and label placement before or after the toggle. Implements `ControlValueAccessor` for use with Reactive and Template-Driven Forms.

## Module Import

```typescript
import { DxToggleModule } from 'ng-dijta';

@NgModule({
  imports: [DxToggleModule]
})
export class AppModule {}
```

## Selector

`<dx-toggle>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable the toggle — user cannot interact |
| `readonly` | `boolean` | `false` | Read-only mode — visually shown but value cannot be changed |
| `labelPosition` | `'before' \| 'after'` | `'after'` | Position of the label relative to the toggle |
| `labelTouchSensitive` | `boolean` | `true` | Whether clicking the label area also toggles the switch |
| `tabIndex` | `number` | — | Tab index for keyboard navigation |
| `id` | `string` | auto-generated | Element ID (auto-incremented `dx-toggle-N`) |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the toggle loses focus |

### Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label | `<dx-label>` | Text label displayed beside the toggle |
| Error | `<dx-error>` | Error message shown when validation fails |

> **Note:** If `dx-label` or `dx-error` cause "unknown element" errors, add `CUSTOM_ELEMENTS_SCHEMA` to your module:
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> @NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
> ```

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
form = this.fb.group({
  notifications: [true]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-toggle formControlName="notifications">
    <dx-label>Enable Notifications</dx-label>
  </dx-toggle>
</form>
```

### Template-Driven Form

```html
<dx-toggle [(ngModel)]="isActive" name="active">
  <dx-label>Active</dx-label>
</dx-toggle>
```

### Label Before Toggle

```html
<dx-toggle
  formControlName="darkMode"
  labelPosition="before">
  <dx-label>Dark Mode</dx-label>
</dx-toggle>
```

### Disabled Toggle

```html
<dx-toggle formControlName="feature" [disabled]="true">
  <dx-label>Feature Flag (read-only)</dx-label>
</dx-toggle>
```

### With Blur Event

```html
<dx-toggle
  [(ngModel)]="setting"
  (blur)="onToggleBlur($event)">
  <dx-label>Auto-Save</dx-label>
</dx-toggle>
```

## Features

- **Material slide toggle** — built on Angular Material's `<mat-slide-toggle>`
- **ControlValueAccessor** — compatible with `formControlName`, `formControl`, and `ngModel`
- **Label position control** — place label `before` or `after` the toggle switch
- **Touch sensitivity** — configurable whether clicking the label area toggles the switch
- **Read-only and disabled states** — distinct modes for form display pages vs editable forms
- **Content projection** — `<dx-label>` and `<dx-error>` slots for label and validation messages
