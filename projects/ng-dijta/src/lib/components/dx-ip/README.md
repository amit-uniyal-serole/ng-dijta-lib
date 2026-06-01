---
category: Components
type: Data Entry
title: IP Address
---

A segmented address input for IPv4, IPv4-with-mask, IPv6, and MAC addresses with per-block validation, paste handling, copy-mode selection, and reactive-forms integration as both a `ControlValueAccessor` and a `Validator`.

## When To Use

- When capturing an IPv4, IPv6, or MAC address on a form.
- When the user should type each octet / hextet in its own block with auto-advance on separator or max length.
- When disabling individual blocks (e.g. a fixed subnet prefix) is required.
- When pasting a full address should split automatically into blocks.

## API

```html
<dx-ip
  mode="ipv4"
  formControlName="address"
  [highlightInvalidBlocks]="true">
</dx-ip>
```

### dx-ip

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[mode]` | Address format | `'ipv4' \| 'ipv4WithMask' \| 'ipv6' \| 'mac' \| ''` | `'ipv4'` |
| `[value]` | Full address value | `string` | `''` |
| `[separator]` | Character between blocks (overrides mode default) | `string` | mode default |
| `[inputValidation]` | Keystroke validation level | `'none' \| 'char' \| 'block'` | `'block'` |
| `[copyMode]` | Copy behavior on Ctrl+C | `'block' \| 'address' \| 'select' \| undefined` | `'block'` |
| `[disabledBlocks]` | Bit map of disabled blocks (same length as block count) | `boolean[]` | `[]` |
| `[disabled]` | Disables the whole control | `boolean` | `false` |
| `[readonly]` | Renders the control read-only | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[highlightInvalidBlocks]` | Adds the `ngx-ip-error` class to invalid blocks | `boolean` | `true` |
| `[theme]` | CSS class applied as the theme | `string` | `''` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[tabIndex]` | Native `tabindex` applied to blocks | `number` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(change)` | Emitted when the full composed address changes | `EventEmitter<string>` |

### Types

```typescript
type ADDRESS_MODE_TYPE = 'ipv4' | 'ipv4WithMask' | 'ipv6' | 'mac' | '';
type COPY_METHOD       = 'block' | 'address';
type COPY_MODE_TYPE    = 'block' | 'address' | 'select' | undefined;
type VALIDATION_TYPE   = 'none' | 'char' | 'block';
```

## Examples

### Basic IPv4

```html
<dx-ip mode="ipv4" formControlName="address"></dx-ip>
```

### IPv4 with mask, disabled subnet octets

```html
<dx-ip
  mode="ipv4WithMask"
  [disabledBlocks]="[true, true, false, false, false]"
  formControlName="address">
</dx-ip>
```

### IPv6 with copy-full-address behavior

```html
<dx-ip
  mode="ipv6"
  copyMode="address"
  [highlightInvalidBlocks]="true"
  (change)="onAddressChange($event)">
</dx-ip>
```

## Import

```typescript
import { DxIpModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxIpModule]
})
export class YourModule { }
```
