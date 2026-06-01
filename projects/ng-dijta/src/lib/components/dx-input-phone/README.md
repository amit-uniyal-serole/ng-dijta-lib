# dx-input-phone

International phone number input with country selector, search, and format options.

## Overview

`dx-input-phone` is a Material form field that combines a country flag/dial-code dropdown with a phone number text input. It uses `libphonenumber-js` for parsing, validation, and formatting. The value stored in the form control is the full E.164 number (e.g. `+14155552671`). Supports country filtering, preferred country preloading, and multiple number format outputs. Implements `ControlValueAccessor` and `Validator`.

## Module Import

```typescript
import { DxInputPhoneModule } from 'ng-dijta';

@NgModule({
  imports: [DxInputPhoneModule]
})
export class AppModule {}
```

## Selector

`<dx-input-phone>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Read-only mode |
| `viewOnly` | `boolean` | `false` | View-only display mode |
| `required` | `boolean` | auto-detected | Mark as required |
| `noneLabel` | `boolean` | `false` | Hide the floating label |
| `noneBorder` | `boolean` | `false` | Hide the input border |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label/border outline style |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error style for `outer-label` mode |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Label position |
| `preferredCountries` | `string[]` | `[]` | ISO2 country codes shown at top of dropdown (e.g. `['us', 'gb', 'in']`) |
| `onlyCountries` | `string[]` | `[]` | Restrict dropdown to specific ISO2 codes |
| `enablePlaceholder` | `boolean` | `true` | Show a local phone format placeholder in the input |
| `inputPlaceholder` | `string` | — | Override the default placeholder text |
| `enableSearch` | `boolean` | `false` | Show a search field in the country dropdown |
| `searchPlaceholder` | `string` | `'Search ...'` | Placeholder for the country search field |
| `format` | `'default' \| 'national' \| 'international'` | `'default'` | Phone number display format. `default` = national number digits; `national` = national format; `international` = E.164 international |
| `tooltip` | `string` | — | Tooltip text |
| `tabIndex` | `number` | — | Tab index |
| `cssClass` | `string` | — | Custom CSS class on the inner phone contact component |
| `errorMessage` | `string` | `''` | Custom error message text |
| `invalidErrorMessage` | `string` | — | Message shown for invalid phone number |
| `id` | `string` | auto-generated | Element ID |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the input loses focus |
| `countryChanged` | `EventEmitter<Country>` | Emitted when the user changes the country selection |

### Types

```typescript
// Country model
interface Country {
  name: string;       // e.g. "United States"
  iso2: string;       // e.g. "us"
  dialCode: string;   // e.g. "1"
  priority: number;
  areaCodes?: string[];
  flagClass: string;
  placeHolder?: string;
}

// PhoneNumberFormat
type PhoneNumberFormat = 'default' | 'national' | 'international';
```

## Value Format

The form control value is stored as a full E.164 string (e.g. `+14155552671`). When writing a value back (e.g. from an API), the component accepts strings with or without the `+` prefix, and numeric values.

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
form = this.fb.group({
  phone: ['', Validators.required]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-input-phone formControlName="phone">
    <dx-label>Phone Number</dx-label>
  </dx-input-phone>
</form>
```

### Template-Driven Form

```html
<dx-input-phone [(ngModel)]="contactPhone" name="phone" required>
  <dx-label>Contact Phone</dx-label>
</dx-input-phone>
```

### With Preferred Countries

```html
<dx-input-phone
  formControlName="phone"
  [preferredCountries]="['us', 'gb', 'in', 'au']"
  [enableSearch]="true"
  searchPlaceholder="Search country...">
  <dx-label>Phone</dx-label>
</dx-input-phone>
```

### Restrict to Specific Countries

```html
<!-- Only show US and Canada -->
<dx-input-phone
  formControlName="phone"
  [onlyCountries]="['us', 'ca']"
  [preferredCountries]="['us']">
  <dx-label>North American Phone</dx-label>
</dx-input-phone>
```

### International Format Output

```html
<dx-input-phone
  formControlName="phone"
  format="international">
  <dx-label>International Phone</dx-label>
</dx-input-phone>
<!-- Displays formatted as: +1 415 555 2671 -->
```

### Country Change Event

```html
<dx-input-phone
  formControlName="phone"
  (countryChanged)="onCountrySelect($event)">
  <dx-label>Phone</dx-label>
</dx-input-phone>
```

```typescript
onCountrySelect(country: Country): void {
  console.log('Country selected:', country.name, country.dialCode);
}
```

## Features

- **International phone input** — country flag + dial code selector + number field
- **libphonenumber-js validation** — validates phone number format against selected country
- **E.164 value storage** — form control stores full international number (e.g. `+14155552671`)
- **Preferred countries** — pin commonly-used countries to the top of the dropdown
- **Country filtering** — restrict dropdown to a specific list of ISO2 country codes
- **Searchable dropdown** — optional search field for quick country lookup
- **Three display formats** — `default` (digits), `national`, or `international` formatting
- **Auto-format as you type** — formats number as user types when format is `national`/`international`
- **ControlValueAccessor + Validator** — full Angular Forms integration
