# dx-ip

IP address input with segmented block editing, multi-mode support (IPv4, IPv6, MAC), validation, and clipboard copy functionality.

## Overview

`dx-ip` is a form-integrated IP address input component that renders each octet/block as a separate input field. It supports IPv4, IPv6 with mask (`ipv4WithMask`), IPv6, and MAC address formats. Navigation between blocks happens automatically as each block is filled. Implements `ControlValueAccessor` and `Validator` for seamless Angular Forms integration.

## Module Import

```typescript
import { DxIpModule } from 'ng-dijta';

@NgModule({
  imports: [DxIpModule]
})
```

## Selector

`<dx-ip>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `'ipv4' \| 'ipv4WithMask' \| 'ipv6' \| 'mac' \| ''` | `'ipv4'` | Address format mode. Determines block count, separators and validation rules |
| `value` | `string` | `''` | Current IP address value (also writable via `ngModel`/`formControl`) |
| `disabled` | `boolean` | `false` | Disable all input blocks |
| `readonly` | `boolean` | `false` | Make all blocks read-only |
| `required` | `boolean` | `false` | Mark field as required — validated automatically |
| `disabledBlocks` | `boolean[]` | `[]` | Immutable array to disable individual blocks (e.g. `[true, false, false, false]`) |
| `separator` | `string` | mode-specific | Override the octet separator character (defaults to `.` for IPv4, `:` for IPv6/MAC) |
| `inputValidation` | `'none' \| 'char' \| 'block'` | `'block'` | Keystroke validation level. `none` — no validation; `char` — only valid chars; `block` — only chars that form a valid block value |
| `copyMode` | `'block' \| 'address' \| 'select' \| undefined` | `'block'` | Clipboard copy behaviour: `block` — copies current block; `address` — copies full address; `select` — prompts user to choose |
| `highlightInvalidBlocks` | `boolean` | `true` | Adds `ngx-ip-error` CSS class to invalid blocks |
| `theme` | `string` | `''` | CSS class applied to the host container for custom theming |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Position of the field label |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label/border outline style |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style when using `outer-label` outline |
| `tabIndex` | `number` | — | Tab index for keyboard navigation |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `change` | `EventEmitter<string>` | Emitted when the full address value changes |

## Address Modes

| Mode | Format | Blocks | Example |
|------|--------|--------|---------|
| `ipv4` | IPv4 dotted-decimal | 4 | `192.168.1.1` |
| `ipv4WithMask` | IPv4 with CIDR mask | 5 | `192.168.1.0/24` |
| `ipv6` | IPv6 colon-hex | 8 | `2001:db8::1` |
| `mac` | MAC address | 6 | `00:1A:2B:3C:4D:5E` |

## Usage Examples

### Basic IPv4 (Reactive Form)

```typescript
// component.ts
form = this.fb.group({
  ipAddress: ['', Validators.required]
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-ip
    formControlName="ipAddress"
    label="Server IP Address">
  </dx-ip>
</form>
```

### Template-Driven Form

```html
<dx-ip
  [(ngModel)]="serverIp"
  label="IP Address"
  required>
</dx-ip>
```

### IPv4 with Subnet Mask

```html
<dx-ip
  formControlName="network"
  mode="ipv4WithMask"
  label="Network CIDR">
</dx-ip>
<!-- Output: "192.168.1.0/24" -->
```

### MAC Address

```html
<dx-ip
  formControlName="macAddr"
  mode="mac"
  label="MAC Address">
</dx-ip>
<!-- Output: "00:1A:2B:3C:4D:5E" -->
```

### Disable Specific Blocks

```html
<!-- Disable first two octets (lock network prefix) -->
<dx-ip
  formControlName="hostIp"
  [disabledBlocks]="[true, true, false, false]"
  label="Host Address">
</dx-ip>
```

### With Copy Mode

```html
<!-- Full address copied on Ctrl+C -->
<dx-ip
  formControlName="ip"
  copyMode="address"
  label="IP Address">
</dx-ip>
```

### With Outer Label and Error Styling

```html
<dx-ip
  formControlName="ip"
  label="Server IP"
  outline="outer-label"
  outerLabelErrorType="astrict-error"
  required>
</dx-ip>
```

## Features

- **Multi-format support** — IPv4, IPv4 with CIDR mask, IPv6, and MAC address modes
- **Block-based editing** — each octet is a separate focusable input; cursor auto-advances when block is full
- **Smart paste** — paste a full address string and it splits correctly across all blocks
- **Block-level validation** — invalid blocks are highlighted with `ngx-ip-error` CSS class
- **Three validation levels** — `none`, `char`, and `block` keystroke validation
- **Clipboard copy modes** — copy individual block or full address to clipboard
- **Selective disable** — disable individual blocks while keeping others editable
- **Separator override** — customize the character used between octets (affects display and paste splitting)
- **Reactive & Template-Driven Forms** — full `ControlValueAccessor` + `Validator` support
- **Keyboard navigation** — Tab and separator key move focus to next block; Backspace on empty block moves to previous
