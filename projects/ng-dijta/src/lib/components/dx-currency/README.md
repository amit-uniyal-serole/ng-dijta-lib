# dx-currency

A currency display and formatting toolkit — display component, form input, pipe, and directives for handling monetary values.

## Overview

The `dx-currency` module provides four complementary tools for working with currency values in ng-dijta:

1. **`<dx-currency>`** — Display-only component that renders a formatted currency amount using the `dxcurrency` pipe. Not a form control.
2. **`<dx-input-currency>`** — Full form input component for entering currency values. Implements `ControlValueAccessor` — works with reactive and template-driven forms.
3. **`dxcurrency` pipe** — Standalone Angular pipe for inline currency formatting in templates.
4. **`DxCurrencyInputDirective` / `DxNumberInputDirective`** — Directives for adding currency or number formatting to plain `<input>` elements.

Formatting behavior (currency code, display type, locale) can be configured globally via `UI_COMPONENT_CONFIG`.

## Module Import

```typescript
import { DxCurrencyModule } from 'ng-dijta';

@NgModule({
  imports: [DxCurrencyModule]
})
export class AppModule {}
```

## Selectors

| Export | Selector / Token | Description |
|--------|-----------------|-------------|
| `DxCurrencyComponent` | `<dx-currency>` | Display component |
| `DxInputCurrencyComponent` | `<dx-input-currency>` | Form input component |
| `DxCurrencyPipe` | `dxcurrency` | Pipe |
| `DxCurrencyInputDirective` | `[dxCurrencyInput]` | Directive |
| `DxNumberInputDirective` | `[dxNumberInput]` | Directive |

---

## `<dx-currency>` — Display Component

Renders a formatted currency amount using the `dxcurrency` pipe. This is a display-only element — it does not implement `ControlValueAccessor`.

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `amount` | `number` | — | The numeric amount to display |
| `currencyCode` | `string` | config / locale | ISO 4217 currency code (e.g. `'USD'`, `'EUR'`) |
| `display` | `'code' \| 'symbol' \| 'symbol-narrow'` | `'symbol'` | How the currency is displayed |
| `digitsInfo` | `string` | config | Angular digits info string (e.g. `'1.2-2'`) |
| `locale` | `string` | config / LOCALE_ID | Locale for formatting (e.g. `'en-US'`) |

### Usage

```html
<!-- Basic usage — uses global config for currency code and locale -->
<dx-currency [amount]="1234.56"></dx-currency>
<!-- Output: $1,235 (with default config) -->

<!-- Explicit currency and format -->
<dx-currency
  [amount]="9876.50"
  currencyCode="EUR"
  display="symbol-narrow"
  digitsInfo="1.2-2"
  locale="de-DE">
</dx-currency>
<!-- Output: 9.876,50 EUR -->

<!-- In a table cell -->
<td>
  <dx-currency [amount]="row.totalAmount" currencyCode="GBP"></dx-currency>
</td>
```

---

## `<dx-input-currency>` — Form Input Component

A full-featured currency input with automatic currency symbol display and locale-aware number handling.

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables the input |
| `readonly` | `boolean` | `false` | Read-only mode (border visible) |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction |
| `required` | `boolean` | `false` | Marks the field as required |
| `noneLabel` | `boolean` | `false` | Hides the label |
| `noneBorder` | `boolean` | `false` | Removes the input border |
| `standard` | `boolean` | `true` | Shows the currency symbol suffix; hidden in `viewOnly` mode |
| `precision` | `number` | `0` | Number of decimal places |
| `seprater` | `boolean` | `true` | Enables thousands separator |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label style |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Position of outer label |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style |
| `tooltip` | `string` | — | Placeholder / tooltip text |
| `minLength` | `number` | — | Minimum character length |
| `maxLength` | `number` | — | Maximum character length |
| `tabIndex` | `number` | — | Tab order index |
| `id` | `string` | auto | Unique element ID (auto-generated) |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the input loses focus |

### Usage

```typescript
// component.ts
form = this.fb.group({
  amount: [null, Validators.required]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-input-currency formControlName="amount" [precision]="2">
    <dx-label>Invoice Amount</dx-label>
    <dx-error *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched">
      Amount is required
    </dx-error>
  </dx-input-currency>
</form>
```

```html
<!-- Template-driven -->
<dx-input-currency [(ngModel)]="price" [seprater]="true" [precision]="2">
  <dx-label>Price</dx-label>
</dx-input-currency>
```

---

## `dxcurrency` Pipe

A standalone pipe for inline currency formatting in templates.

### Signature

```
{{ value | dxcurrency: currencyCode: display: digitsInfo: locale }}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `number \| undefined` | Numeric value; returns `'-'` for `undefined` |
| `currencyCode` | `string` | ISO 4217 currency code |
| `display` | `'code' \| 'symbol' \| 'symbol-narrow'` | Display format |
| `digitsInfo` | `string` | Angular digits info (e.g. `'1.2-2'`) |
| `locale` | `string` | Locale string (e.g. `'en-US'`) |

### Usage

```html
<!-- Basic — uses global config defaults -->
{{ 5000 | dxcurrency }}
<!-- Output: $5,000 -->

<!-- With explicit options -->
{{ product.price | dxcurrency:'USD':'symbol':'1.2-2':'en-US' }}

<!-- INR with symbol -->
{{ price | dxcurrency:'INR':'symbol' }}
<!-- Output: ₹100.23 -->

<!-- Undefined safely returns '-' -->
{{ optionalAmount | dxcurrency }}
```

---

## Global Configuration

Configure defaults for all currency components and the pipe via `UI_COMPONENT_CONFIG`:

```typescript
import { UI_COMPONENT_CONFIG } from 'ng-dijta';

@NgModule({
  providers: [
    {
      provide: UI_COMPONENT_CONFIG,
      useValue: {
        value: {
          outline: 'floating',
          currency: {
            currencyCode: 'EUR',
            display: 'symbol',
            digitsInfo: '1.2-2'
          },
          locale: 'de-DE'
        }
      }
    }
  ]
})
export class AppModule {}
```

### Registering Non-Default Locales

To format with a non-default locale, register it with Angular before use:

```typescript
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
```

Then pass `locale="fr"` to the pipe or `dx-currency` component.

## Features

- Four complementary exports: display component, form input, pipe, and directives
- `dx-currency` is display-only — renders formatted amounts anywhere in templates
- `dx-input-currency` implements `ControlValueAccessor` — reactive and template-driven forms
- Shorthand entry in `dx-input-currency`: `5K` = 5,000 | `2M` = 2,000,000 | `1B` = 1,000,000,000 | `3T` = 3,000,000,000,000
- `dxcurrency` pipe safely returns `'-'` for `undefined` values
- All formatting options (currency code, display, locale, digits) configurable globally via `UI_COMPONENT_CONFIG`
- Auto-detects `Validators.required` from FormControl in `dx-input-currency`
- `disabled`, `readonly`, and `viewOnly` modes in `dx-input-currency`
- Locale-aware symbol placement (e.g., EUR symbol on the right for European locales)
