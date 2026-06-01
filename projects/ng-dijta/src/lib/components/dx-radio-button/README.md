# dx-radio-button

Radio button group form control with horizontal/vertical layout and KeyValue options.

## Overview

`dx-radio-button` renders a group of radio buttons from a `KeyValueModel[]` options array. Supports horizontal and vertical display layouts, `required`, `disabled`, `readonly`, and `viewOnly` states. Implements `ControlValueAccessor` — integrates with Reactive and Template-Driven Forms. The selected value is the `keyTt` of the chosen option.

## Module Import

```typescript
import { DxRadioButtonModule } from 'ng-dijta';

@NgModule({
  imports: [DxRadioButtonModule]
})
export class AppModule {}
```

## Selector

`<dx-radio-button>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `KeyValueModel[]` | required | Array of radio options. Each item has `keyTt` (value) and `valueTt` (display label) |
| `displayType` | `'horizantal' \| 'vertical'` | — | Layout direction for radio buttons |
| `required` | `boolean` | `false` | Mark group as required |
| `disabled` | `boolean` | `false` | Disable all radio buttons — also disables the underlying FormControl |
| `readonly` | `boolean` | `false` | Read-only mode — radios shown but cannot be changed |
| `viewOnly` | `boolean` | `false` | View-only display mode — no interaction |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onRadioChange` | `EventEmitter<onRadioChange>` | Emitted when user selects a radio option |

### Types

```typescript
// KeyValueModel — option format
interface KeyValueModel {
  keyTt: string | number;   // value stored in form control
  valueTt: string;          // display label
  color?: string;           // optional color
}

// onRadioChange — event payload
interface onRadioChange {
  value: string | number | string[];
}
```

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
genderOptions: KeyValueModel[] = [
  { keyTt: 'male',   valueTt: 'Male' },
  { keyTt: 'female', valueTt: 'Female' },
  { keyTt: 'other',  valueTt: 'Other' },
];

form = this.fb.group({
  gender: ['', Validators.required]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-radio-button
    formControlName="gender"
    [options]="genderOptions"
    displayType="horizantal">
  </dx-radio-button>
</form>
```

### Template-Driven Form

```html
<dx-radio-button
  [(ngModel)]="selectedStatus"
  name="status"
  [options]="statusOptions"
  displayType="vertical">
</dx-radio-button>
```

### Vertical Layout with Required

```typescript
priorityOptions: KeyValueModel[] = [
  { keyTt: 1, valueTt: 'Low' },
  { keyTt: 2, valueTt: 'Medium' },
  { keyTt: 3, valueTt: 'High' },
];
```

```html
<dx-radio-button
  formControlName="priority"
  [options]="priorityOptions"
  displayType="vertical"
  [required]="true">
</dx-radio-button>
```

### With Change Event

```html
<dx-radio-button
  [options]="roleOptions"
  [(ngModel)]="selectedRole"
  (onRadioChange)="onRoleChange($event)">
</dx-radio-button>
```

```typescript
onRoleChange(event: onRadioChange): void {
  console.log('Selected role:', event.value);
}
```

### Disabled State

```html
<dx-radio-button
  formControlName="type"
  [options]="typeOptions"
  [disabled]="isReadonly">
</dx-radio-button>
```

## Features

- **KeyValue options** — powered by a `KeyValueModel[]` array for flexible option data
- **Horizontal/vertical layout** — configurable display direction
- **ControlValueAccessor** — works with `formControlName`, `formControl`, and `ngModel`
- **Reactive disable** — setting `disabled=true` also disables the underlying `FormControl`
- **Required support** — built-in required validation
- **Change event** — `onRadioChange` provides the selected value
