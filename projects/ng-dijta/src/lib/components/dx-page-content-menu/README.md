---
category: Components
type: Navigation
title: Page Content Menu
---

In-page navigation menu that lists sections (and their nested children) as an expandable accordion. Used to navigate between anchors or sub-routes within a single page.

## When To Use

- When a long page has multiple sections that benefit from a side-rail navigator.
- When a form wizard or settings page has grouped sub-sections with nested items.
- When the navigator needs to emit a single click event so the host page can scroll, fragment-navigate, or route as needed.
- Pair with `<dx-content-menu-accrodian>` directly when a single section needs to be rendered outside the main menu.

## API

```html
<dx-page-content-menu
  menuTitle="On this page"
  [menuList]="menu"
  (onClickMenu)="scrollTo($event)">
</dx-page-content-menu>
```

### dx-page-content-menu

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[menuTitle]` | Title shown above the menu | `string` | `-` |
| `[menuList]` | Menu entries (each may contain nested children) | `ContentMenu[]` | `[]` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickMenu)` | Emitted when a menu entry is clicked; payload is the clicked entry | `EventEmitter<ContentMenu>` |

### dx-content-menu-accrodian

Individual accordion row used by `dx-page-content-menu`. Exposed for standalone use.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[item]` | Menu entry to render | `ContentMenu` | `-` |
| `[showContent]` | Whether the entry's children are initially expanded | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickMenu)` | Emitted when the entry (or one of its children) is clicked | `EventEmitter<ContentMenu>` |

### Types

```typescript
interface ContentMenu {
  label: string;
  path?: string;
  id?: string;
  children?: ContentMenu[];
  params?: { [key: string]: string };
  fragment?: string;
}
```

## Examples

### Flat section list

```typescript
menu: ContentMenu[] = [
  { label: 'Overview',    id: 'overview' },
  { label: 'Details',     id: 'details' },
  { label: 'Attachments', id: 'attachments' }
];
```

```html
<dx-page-content-menu
  menuTitle="On this page"
  [menuList]="menu"
  (onClickMenu)="scrollTo($event.id)">
</dx-page-content-menu>
```

### Nested sections

```typescript
menu: ContentMenu[] = [
  {
    label: 'Profile',
    children: [
      { label: 'Basic info', id: 'basic' },
      { label: 'Contact',    id: 'contact' }
    ]
  },
  {
    label: 'Security',
    children: [
      { label: 'Password',        id: 'password' },
      { label: 'Two-factor auth', id: 'mfa' }
    ]
  }
];
```

```html
<dx-page-content-menu
  menuTitle="Settings"
  [menuList]="menu"
  (onClickMenu)="navigateTo($event)">
</dx-page-content-menu>
```

## Import

```typescript
import { DxPageContentMenuModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxPageContentMenuModule]
})
export class YourModule { }
```

