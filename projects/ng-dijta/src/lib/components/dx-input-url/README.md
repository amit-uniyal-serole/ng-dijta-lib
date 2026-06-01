# dx-input-url

URL input field with built-in URL format validation and link icon prefix.

## Overview

`dx-input-url` is a text input specialized for URL entry. It includes the `dxUrlValidator` directive, which validates that the entered value is a well-formed URL and shows an inline "URL Invalid" error message on failure. A `link` icon is displayed as a prefix. Implements `ControlValueAccessor` and `Validator` for full Angular Forms integration.

## Module Import

```typescript
import { DxInputUrlModule } from 'ng-dijta';

@NgModule({
  imports: [DxInputUrlModule]
})
export class AppModule {}
```

## Selector

`<dx-input-url>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Read-only mode — shows border, value cannot be edited |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction |
| `required` | `boolean` | auto-detected | Mark as required. Auto-detected from `Validators.required` on the FormControl |
| `noneLabel` | `boolean` | `false` | Hide the floating label |
| `minLength` | `number` | — | Minimum URL length |
| `maxLength` | `number` | — | Maximum URL length |
| `mask` | `string` | `''` | Input mask pattern |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label/border outline style |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Label position |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style when using `outer-label` outline |
| `tooltip` | `string` | — | Placeholder text shown inside the input |
| `tabIndex` | `number` | — | Tab index for keyboard navigation |
| `id` | `string` | auto-generated | Element ID (auto-incremented `dx-input-url-N`) |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the input loses focus |
| `onClickOption` | `EventEmitter<KeyValueModel>` | Emitted when an autocomplete option is selected (if used with autocomplete) |

### Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label | `<dx-label>` | Floating input label |
| Outer label | `[dxLabel]` | Label used with `outer-label` outline style |
| Prefix | `<dx-prefix>` | Content prepended before the input (after the link icon) |
| Suffix | `<dx-suffix>` | Content appended after the input |
| Hint | `<dx-hint>` | Helper text below the input |
| Error | `<dx-error>` | Custom validation error message |

## Validation

The component includes the `dxUrlValidator` directive which automatically validates that the input value is a properly formatted URL. On failure, an inline error `"URL Invalid"` is shown.

A custom error message can be added via `<dx-error>`:
```html
<dx-input-url formControlName="website">
  <dx-label>Website</dx-label>
  <dx-error>Please enter a valid URL (e.g. https://example.com)</dx-error>
</dx-input-url>
```

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
form = this.fb.group({
  website: ['', Validators.required]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-input-url formControlName="website">
    <dx-label>Website URL</dx-label>
    <dx-error *ngIf="form.controls['website'].errors?.urlInvalid">
      Please enter a valid URL
    </dx-error>
  </dx-input-url>
</form>
```

### Template-Driven Form

```html
<dx-input-url [(ngModel)]="profileUrl" name="profileUrl" required>
  <dx-label>Profile URL</dx-label>
</dx-input-url>
```

### With Outer Label Style

```html
<dx-input-url
  formControlName="repoUrl"
  outline="outer-label"
  outerLabelErrorType="astrict-error"
  [required]="true">
  <span dxLabel>Repository URL</span>
</dx-input-url>
```

### With Hint and Suffix

```html
<dx-input-url formControlName="docUrl">
  <dx-label>Documentation URL</dx-label>
  <dx-hint>Must start with https://</dx-hint>
  <dx-suffix>
    <mat-icon>open_in_new</mat-icon>
  </dx-suffix>
</dx-input-url>
```

## Features

- **Built-in URL validation** — `dxUrlValidator` directive validates format automatically
- **Link icon prefix** — Material `link` icon displayed before the input text
- **ControlValueAccessor + Validator** — full form integration including validation propagation
- **Auto-detected required** — reads `Validators.required` from the parent `FormControl`
- **Outline styles** — supports `floating`, `none-floating`, and `outer-label` label modes
- **Content projection** — label, error, hint, prefix and suffix slots
