---
category: Components
type: Data Entry
title: Radio Button
---

A group of mutually exclusive radio options backed by Angular forms. Wraps Angular Material's radio primitives and implements `ControlValueAccessor` for use with template-driven and reactive forms.

## When To Use

- When a user must pick exactly one option from a small, fully visible list.
- When options fit in-line and a dropdown would hide choices unnecessarily.
- Prefer `dx-select` when there are many options or space is limited.

## API

```html
<dx-radio-button
  [options]="options"
  displayType="horizantal"
  [(ngModel)]="selectedValue"
  (onRadioChange)="onChange($event)">
</dx-radio-button>
```

### dx-radio-button

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | Radio options to render | `KeyValueModel[]` | - |
| `[displayType]` | Layout direction | `'horizantal' \| 'vertical'` | - |
| `[required]` | Marks the group as required | `boolean` | `false` |
| `[disabled]` | Disables all options in the group | `boolean` | `false` |
| `[viewOnly]` | Renders the selected value in read-only mode | `boolean` | `false` |
| `[readonly]` | Prevents user interaction but keeps controls enabled | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onRadioChange)` | Emitted when the selection changes | `EventEmitter<onRadioChange>` |

### Types

```typescript
interface onRadioChange {
  value: string | number | string[];
}

interface KeyValueModel {
  keyTt: string | number;
  valueTt: string;
  // ...additional optional fields
}
```

## Examples

### Horizontal group with reactive forms

```typescript
options: KeyValueModel[] = [
  { keyTt: 'M', valueTt: 'Male' },
  { keyTt: 'F', valueTt: 'Female' },
  { keyTt: 'O', valueTt: 'Other' }
];
genderCtrl = new FormControl('M');
```

```html
<dx-radio-button
  [options]="options"
  displayType="horizantal"
  [formControl]="genderCtrl">
</dx-radio-button>
```

### Vertical group with ngModel

```html
<dx-radio-button
  [options]="paymentOptions"
  displayType="vertical"
  [(ngModel)]="paymentMethod"
  (onRadioChange)="onPaymentMethodChange($event)">
</dx-radio-button>
```

### Disabled / read-only

```html
<dx-radio-button
  [options]="options"
  [disabled]="true"
  [(ngModel)]="selected">
</dx-radio-button>
```

## Import

```typescript
import { DxRadioButtonModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxRadioButtonModule]
})
export class YourModule { }
```
