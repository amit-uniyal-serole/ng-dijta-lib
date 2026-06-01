---
category: Components
type: Data Entry
title: Currency
---

Currency primitives for displaying and capturing monetary amounts with locale, symbol, and format awareness. `dx-currency` formats a number for read-only display; `dx-input-currency` is a reactive-forms-compatible input with optional localized number formatting, compact notations (K/M/B/T) and min/max validation.

## When To Use

- When rendering a monetary value with a currency code, locale or custom number format.
- When capturing an amount in a form with symbol prefix and numeric-only keys.
- When the value must support compact shortcuts such as `1K`, `2.5M`, `3B`, `4T`.
- When the display must degrade gracefully to a placeholder when no value is present.
- When the field should match other `dx-*` form controls (outline, outer label, required).

## API

```html
<!-- Read-only display -->
<dx-currency
  [amount]="order.total"
  currencyCode="USD"
  [appCurrencyConfig]="currencyConfig"
  [decimal]="2">
</dx-currency>

<!-- Input -->
<dx-input-currency
  formControlName="amount"
  currencySymbol="$"
  [decimalPlaces]="2">
  <dx-label>Amount</dx-label>
</dx-input-currency>
```

### dx-currency

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[amount]` | Amount to display | `number` | `-` |
| `[currencyCode]` | ISO currency code (e.g. `USD`, `EUR`) | `string` | `-` |
| `[display]` | Controls digit / symbol display | `DisplayDigitsType` | `-` |
| `[digitsInfo]` | Angular `CurrencyPipe` digits-info string (e.g. `'1.2-2'`) | `string` | `-` |
| `[locale]` | Locale id used when formatting | `string` | `-` |
| `[appCurrencyConfig]` | Localized number format config; when set, enables compact notations | `NumberFormatVariant` | `-` |
| `[decimal]` | Maximum number of decimal places for localized formatting | `number` | `-` |

### dx-input-currency

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[currencySymbol]` | Prefix symbol to show before the input | `NumberFormatVariant` | `-` |
| `[appCurrencyConfig]` | Localized number format config | `NumberFormatVariant` | `-` |
| `[decimalPlaces]` | Decimal places enforced for localized input | `number` | `-` |
| `[minLength]` | Minimum input length | `number` | `-` |
| `[maxLength]` | Maximum input length | `number` | `-` |
| `[precision]` | Maximum number of digits | `number` | `0` |
| `[seprater]` | Render thousands separator | `boolean` | `true` |
| `[standard]` | Use standard symbol suffix when no `currencySymbol` is provided | `boolean` | `true` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'outer-label'` |
| `[outerLabelErrorType]` | Error style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[noneLabel]` | Hide the label slot | `boolean` | `false` |
| `[noneBorder]` | Render without field border | `boolean` | `false` |
| `[readonly]` | Render read-only | `boolean` | `false` |
| `[viewOnly]` | Display-only mode | `boolean` | `false` |
| `[disabled]` | Disabled state | `boolean` | `false` |
| `[required]` | Marks as required | `boolean` | `false` |
| `[tabIndex]` | Native tab index | `number` | `-` |
| `[tooltip]` | Tooltip / placeholder | `string` | `-` |
| `[id]` | Host element id | `string` | `dx-input-currency-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted by `dx-input-currency` on focus loss | `EventEmitter<FocusEvent>` |

### Content Slots (dx-input-currency)

- `<dx-label>` / `[dxLabel]` — Field label
- `<dx-prefix>` / `<dx-suffix>` — Prefix / suffix content
- `<dx-hint>` — Helper text
- `<dx-error>` — Error slot

## Examples

### Basic read-only display

```html
<dx-currency [amount]="199.99" currencyCode="USD"></dx-currency>
```

### Localized, compact notation

```html
<dx-currency
  [amount]="1250000"
  currencyCode="USD"
  [appCurrencyConfig]="compactConfig"
  [decimal]="1">
</dx-currency>
```

### Form input with symbol

```html
<dx-input-currency
  formControlName="price"
  currencySymbol="€"
  [decimalPlaces]="2"
  [required]="true">
  <dx-label>Price</dx-label>
</dx-input-currency>
```

### Input with min / max length and shortcut multipliers

Typing `5K`, `2M`, `3B` or `1T` auto-expands to the scaled number.

```html
<dx-input-currency
  formControlName="amount"
  [minLength]="1"
  [maxLength]="15"
  [precision]="12">
  <dx-label>Amount</dx-label>
</dx-input-currency>
```

## Import

```typescript
import { DxCurrencyModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxCurrencyModule]
})
export class YourModule { }
```
