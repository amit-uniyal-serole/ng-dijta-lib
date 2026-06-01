# DxButton

A versatile button component with support for multi-action dropdowns, confirmation popovers, loading states, and permission-based visibility.

## Overview

`DxButton` is the primary button component in ng-dijta. It supports a main action with an optional multi-action dropdown, five animated loader styles, an inline confirmation popover before executing actions, and CASL-based permission gating. Use it wherever you need a styled button with rich interaction patterns.

## Module Import

```typescript
import { DxButtonModule } from 'ng-dijta';

@NgModule({
  imports: [DxButtonModule]
})
```

## Selector

`<dx-button>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | — | Button label text. Supports i18n via Transloco. |
| `data` | `T` | — | Generic data payload passed to condition directives for dynamic class evaluation. |
| `condition` | `ConditionClass` | — | Condition directive config for applying CSS classes dynamically based on `data`. |
| `permission` | `DxPermission` | — | CASL permission config (`{ apiName, permission }`). Disables and shows a lock icon when permission is denied. |
| `disabled` | `boolean` | — | Disables the button when `true`. |
| `show` | `boolean` | `true` | Controls whether the button is rendered. |
| `src` | `string` | — | Path to an image displayed inside the button. |
| `class` | `ButtonClasses` | `'dxBtn'` | Base style class: `'dxBtn'` (primary), `'secondary-btn'`, or `'dxIconClass'`. |
| `customClass` | `string[]` | — | Additional CSS classes applied to the button element, overriding the `class` input. |
| `multiActionDropDown` | `MultiActionDropDown` | — | Configuration object for the dropdown portion of a split-button. See `MultiActionDropDown` interface. |
| `icon` | `string` | — | Material Icons ligature name displayed before the title. |
| `size` | `'default' \| 'small' \| 'big'` | `'default'` | Controls button size via CSS modifier classes. |
| `confirmationPopover` | `ConfirmationPopover` | — | When `isShow: true`, intercepts the click and shows a confirmation popover before emitting `onActionSelect`. |
| `isLoading` | `boolean` | `false` | When `true`, renders the loader animation and disables the button. |
| `loaderType` | `ButtonLoaderType` | `'semi-circle'` | Loader animation style: `'semi-circle'`, `'arc'`, `'dual-arc'`, `'pulse'`, or `'refresh'`. |
| `isReverseElement` | `boolean` | `false` | When `true`, reverses the layout order of icon and label (column-reverse). |
| `id` | `string` | `dx-button-{n}` | Auto-generated unique element ID. Can be overridden. |

### MultiActionDropDown Interface

```typescript
interface MultiActionDropDown {
  show?: boolean;          // Whether to render the split-button dropdown
  disable?: boolean;       // Disables the dropdown toggle button
  label?: string;          // Optional label shown on the dropdown toggle
  isOnlyDropdown?: boolean; // Renders only the dropdown with no main action button
  permission?: DxPermission;
  menuList: MultiActionMenuList[];
}

interface MultiActionMenuList {
  id?: string;
  label: string;           // Menu item label
  event: string;           // Event string emitted via onClickMenuAction
  show?: boolean;
  icon?: string;           // Material Icons ligature
  disable?: boolean;
  src?: string;            // Image path
  color?: string;          // Hex color for icon and label
  confirmationPopover?: ConfirmationPopover;
  classCondition?: ConditionClass;
  permission?: DxPermission;
}
```

### ConfirmationPopover Interface

```typescript
interface ConfirmationPopover {
  isShow: boolean;
  header?: {
    title?: string;
    closeIcon?: boolean;
    icon?: { isShow: boolean; icon?: string; color?: string; };
  };
  popoverPlacement?: 'top' | 'topLeft' | 'topRight' | 'leftTop' | 'left' | 'leftBottom'
    | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight';
  content: { message: string; };
  actions: {
    secondary: { title: string; }; // Cancel button label
    primary: { title: string; };   // Confirm button label
  };
}
```

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onActionSelect` | `EventEmitter<void>` | Emitted when the main button is clicked (after confirmation if configured). |
| `onClickMenuAction` | `EventEmitter<string>` | Emitted when a dropdown menu item is clicked, with the item's `event` string as payload. |

### Public Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `click()` | `(): void` | Programmatically triggers `onActionSelect`. |
| `toggleMultiActonMenu()` | `(): void` | Opens or closes the multi-action dropdown. |
| `fillLabelColor(color)` | `(color: string): CustomLabelColor` | Returns a style object `{ color }` for applying hex color to menu item icons/labels. |

## Usage Examples

### Basic Usage

```html
<dx-button
  title="Save"
  (onActionSelect)="onSave()">
</dx-button>
```

### Secondary Style with Icon

```html
<dx-button
  title="Delete"
  class="secondary-btn"
  icon="delete"
  (onActionSelect)="onDelete()">
</dx-button>
```

### Loading State

```html
<dx-button
  title="Submitting..."
  [isLoading]="isSubmitting"
  loaderType="arc"
  (onActionSelect)="onSubmit()">
</dx-button>
```

### Multi-Action Split Button

```typescript
multiActionDropDown: MultiActionDropDown = {
  show: true,
  menuList: [
    { label: 'Edit',   event: 'edit',   icon: 'edit' },
    { label: 'Delete', event: 'delete', icon: 'delete', color: '#f44336' }
  ]
};
```

```html
<dx-button
  title="Actions"
  [multiActionDropDown]="multiActionDropDown"
  (onActionSelect)="onPrimaryAction()"
  (onClickMenuAction)="onMenuAction($event)">
</dx-button>
```

### Confirmation Popover on Click

```typescript
confirmationPopover: ConfirmationPopover = {
  isShow: true,
  header: { title: 'Confirm Delete', closeIcon: true },
  content: { message: 'This action cannot be undone.' },
  actions: {
    secondary: { title: 'Cancel' },
    primary: { title: 'Delete' }
  }
};
```

```html
<dx-button
  title="Delete Record"
  [confirmationPopover]="confirmationPopover"
  (onActionSelect)="onDelete()">
</dx-button>
```

### Permission-Gated Button

```html
<dx-button
  title="Approve"
  [permission]="{ apiName: 'approvals', permission: 'create' }"
  (onActionSelect)="onApprove()">
</dx-button>
```

## Features

- Split-button with configurable multi-action dropdown menu
- Five animated loader variants: semi-circle, arc, dual-arc, pulse, refresh
- Inline confirmation popover intercepting the click before action emission
- Per-button and per-menu-item CASL permission gating with lock icon indicator
- Dynamic CSS class application via `ConditionClass` directive
- Three size variants: default, small, big
- Support for Material Icons, image sources, and reversed icon/label layout
- Transloco i18n support on all text content
- Auto-prevention of double-click via `appPreventDoubleClick` directive
- Unique auto-generated element ID for accessibility and testing
