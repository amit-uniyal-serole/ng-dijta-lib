---
category: Components
type: Data Entry
title: Input Phone
---

An international phone-number input with country selector, preferred-country ordering, search, and pluggable formatting. Integrates with Angular Forms as both a `ControlValueAccessor` and a `Validator`.

## When To Use

- When capturing a phone number that may span multiple countries and needs a dial-code selector.
- When the user list should be biased to a few preferred countries or restricted to a whitelist.
- When the display format must follow E.164 / national / international conventions.
- When the field should share the same outline / error / label behavior as other DX inputs.

## Label Variants

`dx-input-phone` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-phone formControlName="phone">
  <dx-label>Display Label</dx-label>
</dx-input-phone>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-phone outline="outer-label" formControlName="phone">
  <p dxLabel>Display Label</p>
</dx-input-phone>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-phone
  formControlName="phone"
  [preferredCountries]="['in', 'us', 'gb']"
  [enableSearch]="true"
  format="international"
  (countryChanged)="onCountry($event)">
</dx-input-phone>
```

### dx-input-phone

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders as static display-only text | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[noneBorder]` | Removes the form-field outline | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[preferredCountries]` | ISO-2 country codes promoted to the top of the list | `string[]` | `[]` |
| `[onlyCountries]` | ISO-2 country codes — restricts the list to these entries | `string[]` | `[]` |
| `[enablePlaceholder]` | Auto-generate a sample-number placeholder | `boolean` | `true` |
| `[inputPlaceholder]` | Explicit placeholder (overrides the auto one) | `string` | - |
| `[enableSearch]` | Show a search box in the country dropdown | `boolean` | `false` |
| `[searchPlaceholder]` | Placeholder for the country search box | `string` | - |
| `[format]` | Phone number display format | `'default' \| 'national' \| 'international'` | `'default'` |
| `[name]` | Form control name attribute | `string` | - |
| `[cssClass]` | Extra CSS class applied to the wrapper | `string` | - |
| `[errorStateMatcher]` | Custom Material error-state matcher | `ErrorStateMatcher` | Material default |
| `[errorMessage]` | Message shown for the required error | `string` | `''` |
| `[invalidErrorMessage]` | Message shown for invalid phone numbers | `string` | - |
| `[describedBy]` | `aria-describedby` target id | `string` | `''` |
| `[ctrRequired]` | Forces the required indicator | `boolean` | `false` |
| `[tabIndex]` | Native `tabindex` applied to the input | `number` | - |
| `[id]` | Unique id applied to the input | `string` | `dx-input-phone-{n}` |
| `[tooltip]` | Tooltip text rendered on the field | `string` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |
| `(countryChanged)` | Emitted when the selected country changes | `EventEmitter<Country>` |

### Types

```typescript
type PhoneNumberFormat = 'default' | 'national' | 'international';
```

## Examples

### Basic

```html
<dx-input-phone formControlName="phone"></dx-input-phone>
```

### Preferred countries with search

```html
<dx-input-phone
  formControlName="phone"
  [preferredCountries]="['in', 'us', 'gb']"
  [enableSearch]="true"
  searchPlaceholder="Search country"
  format="international">
</dx-input-phone>
```

### Restricted country list with outer label

```html
<dx-input-phone
  outline="outer-label"
  formControlName="phone"
  [onlyCountries]="['in', 'ae', 'sa']"
  [required]="true"
  (countryChanged)="onCountry($event)">
  <span dxLabel>Mobile</span>
</dx-input-phone>
```

## Import

```typescript
import { DxInputPhoneModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputPhoneModule]
})
export class YourModule { }
```
