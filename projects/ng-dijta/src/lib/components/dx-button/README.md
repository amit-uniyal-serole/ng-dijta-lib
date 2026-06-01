---
category: Components
type: General
title: Button
---

A versatile button for triggering actions. Wraps Angular Material `mat-button` and adds loading states, a multi-action dropdown, confirmation popover, permission gating, and conditional styling.

## When To Use

- When the user needs to trigger an operation such as submitting a form, opening a dialog, deleting a record, or navigating.
- Use the **multi-action dropdown** when a single trigger exposes several related actions (e.g. *Edit / Duplicate / Delete*).
- Use the **confirmation popover** for destructive or irreversible actions.
- Use the **loading state** for actions that take noticeable time (network calls, long computations).
- Use the **permission** input to hide or disable the button based on the current user's ability.

## API

```html
<dx-button
  title="Save"
  icon="save"
  dxType="primary"
  (onActionSelect)="onSave()">
</dx-button>
```

### dx-button

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Button text label | `string` | - |
| `[data]` | Custom payload carried with the button (generic `T`) | `T` | - |
| `[dxType]` | Button appearance type | `'primary' \| 'default'` | `'primary'` |
| `[class]` | Built-in style variant | `'dxBtn' \| 'secondary-btn' \| 'dxIconClass' \| 'text'` | `'dxBtn'` |
| `[customClass]` | Additional CSS classes to append | `string[]` | - |
| `[icon]` | Material icon name to display | `string` | - |
| `[src]` | Image source URL for a custom icon | `string` | - |
| `[size]` | Button size variant | `'small' \| 'big' \| ''` | `''` |
| `[color]` | Custom text color (CSS color) | `string` | - |
| `[disabled]` | Whether the button is disabled | `boolean` | `false` |
| `[show]` | Whether the button is rendered | `boolean` | `true` |
| `[isLoading]` | Show the loading indicator | `boolean` | `false` |
| `[loaderType]` | Loading indicator animation | `'semi-circle' \| 'arc' \| 'dual-arc' \| 'pulse' \| 'refresh'` | `'semi-circle'` |
| `[isReverseElement]` | Render the icon *after* the label | `boolean` | `false` |
| `[id]` | Unique button id (auto-generated when omitted) | `string` | `dx-button-{n}` |
| `[permission]` | CASL permission that gates button rendering | `DxPermission` | - |
| `[condition]` | Conditional CSS class configuration | `ConditionClass` | - |
| `[confirmationPopover]` | Confirmation-dialog configuration | `ConfirmationPopover` | - |
| `[multiActionDropDown]` | Multi-action dropdown configuration | `MultiActionDropDown` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onActionSelect)` | Emitted when the button itself is clicked | `EventEmitter<void>` |
| `(onClickMenuAction)` | Emitted when a dropdown menu item is selected; payload is the item's `event` key | `EventEmitter<string>` |

### Types

```typescript
type ButtonClasses   = 'dxBtn' | 'secondary-btn' | 'dxIconClass' | 'text';
type ButtonLoaderType = 'semi-circle' | 'arc' | 'dual-arc' | 'pulse' | 'refresh';

interface MultiActionDropDown {
  show?: boolean;
  disable?: boolean;
  label?: string;
  isOnlyDropdown?: boolean;
  permission?: DxPermission;
  menuList: MultiActionMenuList[];
}

interface MultiActionMenuList {
  id?: string;
  label: string;
  event: string;
  show?: boolean;
  icon?: string;
  disable?: boolean;
  src?: string;
  color?: string;
  confirmationPopover?: ConfirmationPopover;
  classCondition?: ConditionClass;
  permission?: DxPermission;
  btnType?: ButtonClasses;
}

interface ConfirmationPopover {
  isShow: boolean;
  header?: {
    title?: string;
    closeIcon?: boolean;
    icon?: { isShow: boolean; icon?: string; color?: string };
  };
  popoverPlacement?:
    | 'top'    | 'topLeft'    | 'topRight'
    | 'bottom' | 'bottomLeft' | 'bottomRight'
    | 'left'   | 'leftTop'    | 'leftBottom'
    | 'right'  | 'rightTop'   | 'rightBottom';
  content: { message: string };
  actions: Actions;
}
```

## Examples

### Basic

```html
<dx-button title="Submit" (onActionSelect)="onSubmit()"></dx-button>
```

### With icon

```html
<dx-button
  title="Save"
  icon="save"
  dxType="primary"
  (onActionSelect)="onSave()">
</dx-button>
```

### Loading state

```html
<dx-button
  title="Processing..."
  [isLoading]="isSubmitting"
  loaderType="pulse"
  [disabled]="isSubmitting"
  (onActionSelect)="submit()">
</dx-button>
```

### Confirmation popover

```typescript
confirmConfig: ConfirmationPopover = {
  isShow: true,
  header: {
    title: 'Confirm Delete',
    closeIcon: true,
    icon: { isShow: true, icon: 'warning', color: '#ff0000' }
  },
  content: { message: 'Are you sure you want to delete this item?' },
  actions: {
    confirm: { label: 'Delete', color: 'warn' },
    cancel:  { label: 'Cancel' }
  }
};
```

```html
<dx-button
  title="Delete"
  icon="delete"
  class="secondary-btn"
  [confirmationPopover]="confirmConfig"
  (onActionSelect)="onDelete()">
</dx-button>
```

### Multi-action dropdown

```typescript
multiAction: MultiActionDropDown = {
  show: true,
  label: 'Actions',
  menuList: [
    { label: 'Edit',      event: 'edit',      icon: 'edit' },
    { label: 'Duplicate', event: 'duplicate', icon: 'content_copy' },
    { label: 'Delete',    event: 'delete',    icon: 'delete', color: 'red' }
  ]
};
```

```html
<dx-button
  title="More"
  [multiActionDropDown]="multiAction"
  (onClickMenuAction)="handleAction($event)">
</dx-button>
```

### Permission-gated

```html
<dx-button
  title="Admin Only"
  [permission]="{ module: 'users', action: 'create' }"
  (onActionSelect)="createUser()">
</dx-button>
```

## Import

```typescript
import { DxButtonModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxButtonModule]
})
export class YourModule { }
```
