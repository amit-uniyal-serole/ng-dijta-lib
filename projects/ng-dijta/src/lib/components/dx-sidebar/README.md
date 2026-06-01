---
category: Components
type: Navigation
title: Sidebar
---

A configurable navigation container that ships three layouts: a vertical side menu (`dx-vertical`), a horizontal top menu (`dx-horizontal`), and an adaptive flex menu (`dx-flex-menu`) that collapses overflowing items into a more-menu based on available space.

## When To Use

- When the application needs a persistent left-hand navigation (`dx-vertical`).
- When a horizontal top-bar navigation fits the layout (`dx-horizontal`).
- When menu items should reflow automatically based on viewport height and reveal sub-menus on demand (`dx-flex-menu`).

## API

```html
<dx-flex-menu
  [menu]="menuItems"
  [logo]="logo"
  [isMenusLoading]="loading"
  (sidebarToggle)="onToggle($event)"
  (onMenuPin)="onPin($event)">
</dx-flex-menu>
```

### dx-flex-menu

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[menu]` | Menu items to render | `Menu[]` | `[]` |
| `[logo]` | Logo shown at the top of the sidebar | `any` | - |
| `[subMenu]` | Initial submenu state (`'in'` / `'out'`) | `SUB_MENU_TYPE` | - |
| `[width]` | Custom width in pixels | `number` | - |
| `[isMenusLoading]` | Shows skeleton loaders for menu items | `boolean` | `true` |
| `[disableDispalyConditions]` | Disables display-condition filtering of menu items | `boolean` | `true` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(sidebarToggle)` | Emitted when the submenu panel opens/closes | `EventEmitter<FlexMenuAction>` |
| `(onMenuPin)` | Emitted with the pin state when the user pins/unpins the menu | `EventEmitter<boolean>` |

### dx-vertical

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[menu]` | Menu items to render as a vertical list | `Menu[]` | `[]` |

### dx-horizontal

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[menu]` | Top-level menu items rendered inline | `Menu[]` | `[]` |

## Examples

### Vertical sidebar

```typescript
menu: Menu[] = [
  { label: 'Dashboard', icon: 'dashboard', route: { path: '/dashboard' } },
  { label: 'Users',     icon: 'group',     route: { path: '/users' } },
  { label: 'Settings',  icon: 'settings',
    children: [
      { label: 'Profile', route: { path: '/settings/profile' } },
      { label: 'Billing', route: { path: '/settings/billing' } }
    ]
  }
];
```

```html
<dx-vertical [menu]="menu"></dx-vertical>
```

### Horizontal top-bar

```html
<dx-horizontal [menu]="menu"></dx-horizontal>
```

### Flex menu with logo and loading state

```html
<dx-flex-menu
  [menu]="menu"
  [logo]="appLogo"
  [isMenusLoading]="isLoading"
  (sidebarToggle)="onSidebarToggle($event)">
</dx-flex-menu>
```

## Import

```typescript
import { DxSideBarModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxSideBarModule]
})
export class YourModule { }
```
