# dx-input

A versatile text and number input field with support for autocomplete, currency formatting, input masking, and @mentions.

## Overview

`dx-input` is the primary text input component in ng-dijta. It implements `ControlValueAccessor` and `Validator`, making it a first-class Angular forms citizen that works seamlessly with both reactive and template-driven forms. Use it for any single-line text or numeric input — it supports autocomplete dropdowns, locale-aware currency symbol display, ngx-mask patterns, and a mentions directive for @tagging workflows.

## Module Import

```typescript
import { DxInputModule } from 'ng-dijta';

@NgModule({
  imports: [DxInputModule]
})
export class AppModule {}
```

## Selector

`<dx-input>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'number'` | `'text'` | HTML input type |
| `disabled` | `boolean` | `false` | Disables the input |
| `readonly` | `boolean` | `false` | Sets the input to read-only (border visible) |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction |
| `required` | `boolean` | `false` | Marks the field as required; also auto-detected from FormControl validators |
| `noneLabel` | `boolean` | `false` | Hides the label |
| `noneBorder` | `boolean` | `false` | Removes the input border |
| `applyTrim` | `boolean` | `false` | Trims whitespace from the input value on change |
| `isCurrency` | `boolean` | `false` | Shows a currency symbol prefix/suffix |
| `currencyFormat` | `'wide' \| 'narrow'` | `'narrow'` | Currency symbol format (e.g. `USD` vs `$`) |
| `currencyPosition` | `'left' \| 'right'` | `'left'` | Position of the currency symbol |
| `isAutoComplete` | `boolean` | `false` | Enables the autocomplete dropdown |
| `options` | `KeyValueModel[]` | — | Autocomplete options array |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label style; can be set globally via `UI_COMPONENT_CONFIG` |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Position of outer label (used with `outer-label` outline) |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style for outer-label mode |
| `tooltip` | `string` | — | Placeholder / tooltip text |
| `mask` | `string` | — | ngx-mask pattern string (e.g. `'000-000-0000'`) |
| `maskingPatterns` | `object` | — | Custom pattern definitions for ngx-mask |
| `minLength` | `number` | — | Minimum value length (adds `Validators.minLength`) |
| `maxLength` | `number` | — | Maximum value length (adds `Validators.maxLength`) |
| `tabIndex` | `number` | — | Tab order index |
| `id` | `string` | auto | Unique element ID (auto-generated) |
| `mentionConfigData` | `MentionConfig` | — | Configuration for the @mentions directive |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onClickOption` | `EventEmitter<KeyValueModel>` | Emitted when an autocomplete option is selected |
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the input loses focus |
| `onEnter` | `EventEmitter<void>` | Emitted when the Enter key is pressed |
| `onInputChange` | `EventEmitter<string>` | Emitted on every keystroke with the current value |

### KeyValueModel Interface

```typescript
interface KeyValueModel {
  keyTt: string | number | boolean; // option value
  valueTt: string;                  // display label
  subtitle?: string;
  color?: string;
  data?: any;
  disabled?: boolean;
}
```

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
import { FormBuilder, Validators } from '@angular/forms';

form = this.fb.group({
  name: ['', Validators.required],
  notes: ['']
});

constructor(private fb: FormBuilder) {}
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-input formControlName="name">
    <dx-label>Full Name</dx-label>
    <dx-error *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
      Name is required
    </dx-error>
  </dx-input>
</form>
```

### Template-Driven Form

```html
<dx-input [(ngModel)]="name" required>
  <dx-label>Full Name</dx-label>
</dx-input>
```

### With Autocomplete

```typescript
options: KeyValueModel[] = [
  { keyTt: 1, valueTt: 'Angular' },
  { keyTt: 2, valueTt: 'React' },
  { keyTt: 3, valueTt: 'Vue' },
];
```

```html
<dx-input
  formControlName="framework"
  [isAutoComplete]="true"
  [options]="options"
  (onClickOption)="onSelect($event)">
  <dx-label>Framework</dx-label>
</dx-input>
```

### With Currency Symbol

```html
<dx-input
  formControlName="salary"
  type="number"
  [isCurrency]="true"
  currencyFormat="narrow"
  currencyPosition="left">
  <dx-label>Salary</dx-label>
</dx-input>
```

### With Input Mask

```html
<!-- Phone number mask -->
<dx-input
  formControlName="phone"
  mask="000-000-0000"
  tooltip="Enter phone number">
  <dx-label>Phone</dx-label>
</dx-input>
```

### With Mentions

```typescript
mentionConfig: MentionConfig = {
  mentions: [
    {
      triggerChar: '@',
      items: ['Alice', 'Bob', 'Carol'],
      labelKey: 'name'
    }
  ]
};
```

```html
<dx-input
  formControlName="message"
  [mentionConfigData]="mentionConfig">
  <dx-label>Message</dx-label>
</dx-input>
```

### Outer Label Style

```html
<dx-input
  formControlName="email"
  outline="outer-label"
  labelPosition="top"
  outerLabelErrorType="astrict-error">
  <div dxLabel>Email Address</div>
  <dx-error *ngIf="form.get('email')?.invalid">
    Valid email required
  </dx-error>
</dx-input>
```

## Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label (floating) | `dx-label` | Label inside the Material form field |
| Label (outer) | `[dxLabel]` | Label shown above the field in outer-label mode |
| Prefix | `dx-prefix` | Content before the input |
| Suffix | `dx-suffix` | Content after the input |
| Hint | `dx-hint` | Helper text below the field |
| Error | `dx-error` | Validation error message |

> **Note:** Use `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in your module if `dx-label`, `dx-hint`, `dx-suffix`, `dx-prefix`, and `dx-error` report unknown element errors.

## Global Configuration

The `outline` default can be set application-wide using `UI_COMPONENT_CONFIG`:

```typescript
import { UI_COMPONENT_CONFIG } from 'ng-dijta';

@NgModule({
  providers: [
    {
      provide: UI_COMPONENT_CONFIG,
      useValue: { value: { outline: 'floating' } }
    }
  ]
})
export class AppModule {}
```

## Features

- Implements `ControlValueAccessor` and `Validator` — works with reactive and template-driven forms
- Auto-detects `Validators.required` from FormControl — no need to pass `required` separately
- Three label styles: floating, non-floating, and outer-label
- Built-in autocomplete dropdown using `KeyValueModel[]` options
- Locale-aware currency symbol via Angular's `getCurrencySymbol`
- Input masking with ngx-mask (custom patterns supported)
- @mentions support via `MentionConfig` directive
- Whitespace trimming via `applyTrim`
- `disabled`, `readonly`, and `viewOnly` modes with distinct visual styles
- Auto-generated unique `id` for accessibility
