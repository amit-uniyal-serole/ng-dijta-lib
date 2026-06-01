# dx-textarea

A multi-line text area with configurable rows, validation support, and optional @mentions.

## Overview

`dx-textarea` is the standard multi-line input component in ng-dijta. It implements `ControlValueAccessor` and `Validator`, integrating directly with Angular reactive and template-driven forms. Use it wherever users need to enter longer text content — comments, descriptions, notes. It supports the same label styles as other dx-form components and includes the @mentions directive for @tagging workflows.

## Module Import

```typescript
import { DxTextareaModule } from 'ng-dijta';

@NgModule({
  imports: [DxTextareaModule]
})
export class AppModule {}
```

## Selector

`<dx-textarea>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables the textarea |
| `readonly` | `boolean` | `false` | Sets the textarea to read-only (border visible) |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction |
| `required` | `boolean` | `false` | Marks the field as required; also auto-detected from FormControl validators |
| `noneLabel` | `boolean` | `false` | Hides the label |
| `noneBorder` | `boolean` | `false` | Removes the input border |
| `row` | `number` | `2` | Number of visible text rows |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label style; can be set globally via `UI_COMPONENT_CONFIG` |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Position of outer label (used with `outer-label` outline) |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style for outer-label mode |
| `tooltip` | `string` | — | Placeholder / tooltip text |
| `minLength` | `number` | — | Minimum character length (adds `Validators.minLength`) |
| `maxLength` | `number` | — | Maximum character length (adds `Validators.maxLength`) |
| `tabIndex` | `number` | — | Tab order index |
| `mentionConfigDetails` | `MentionConfig` | — | Configuration for the @mentions directive |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the textarea loses focus |

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
import { FormBuilder, Validators } from '@angular/forms';

form = this.fb.group({
  description: ['', [Validators.required, Validators.maxLength(500)]]
});

constructor(private fb: FormBuilder) {}
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-textarea formControlName="description">
    <dx-label>Description</dx-label>
    <dx-error *ngIf="form.get('description')?.errors?.['required'] && form.get('description')?.touched">
      Description is required
    </dx-error>
    <dx-error *ngIf="form.get('description')?.errors?.['maxlength']">
      Maximum 500 characters allowed
    </dx-error>
  </dx-textarea>
</form>
```

### Template-Driven Form

```html
<dx-textarea [(ngModel)]="notes" required>
  <dx-label>Notes</dx-label>
</dx-textarea>
```

### Configuring Rows and Length

```html
<dx-textarea
  formControlName="bio"
  [row]="5"
  [minLength]="50"
  [maxLength]="1000"
  tooltip="Tell us about yourself (50-1000 characters)">
  <dx-label>Bio</dx-label>
</dx-textarea>
```

### With Mentions

```typescript
mentionConfig: MentionConfig = {
  mentions: [
    {
      triggerChar: '@',
      items: [
        { name: 'Alice', id: 1 },
        { name: 'Bob', id: 2 }
      ],
      labelKey: 'name'
    }
  ]
};
```

```html
<dx-textarea
  formControlName="comment"
  [mentionConfigDetails]="mentionConfig"
  [row]="4">
  <dx-label>Comment</dx-label>
</dx-textarea>
```

### Outer Label Style

```html
<dx-textarea
  formControlName="notes"
  outline="outer-label"
  labelPosition="top"
  outerLabelErrorType="astrict-error">
  <div dxLabel>Internal Notes</div>
</dx-textarea>
```

### Read-Only and View-Only Modes

```html
<!-- Read-only: shows border, prevents editing -->
<dx-textarea formControlName="summary" [readonly]="true">
  <dx-label>Summary</dx-label>
</dx-textarea>

<!-- View-only: no border, display only -->
<dx-textarea formControlName="summary" [viewOnly]="true">
  <dx-label>Summary</dx-label>
</dx-textarea>
```

## Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label (floating) | `dx-label` | Label inside the Material form field |
| Label (outer) | `[dxLabel]` | Label shown above the field in outer-label mode |
| Hint | `dx-hint` | Helper text below the field |
| Error | `dx-error` | Validation error message |

> **Note:** Use `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in your module if `dx-label`, `dx-hint`, and `dx-error` report unknown element errors.

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
- Configurable row height via `row` input
- Three label styles: floating, non-floating, and outer-label
- Min/max length validation integrated directly into the FormControl
- @mentions support via `MentionConfig` directive
- `disabled`, `readonly`, and `viewOnly` modes with distinct visual styles
- Auto-generated unique `id` for accessibility
