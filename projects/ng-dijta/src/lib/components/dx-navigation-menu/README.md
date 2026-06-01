---
category: Components
type: Navigation
title: Navigation Menu
---

Accordion-style navigation menu that renders grouped sections, each with a list of clickable children linked to router paths. Commonly used as the primary navigation rail inside an application shell.

## When To Use

- When the application has a grouped navigation structure (sections containing child links).
- When you want accordion behaviour (expand / collapse per section) with optional tooltips.
- When the menu needs to integrate with Angular Router (router links, params).
- When a single click callback (instead of per-item wiring) is preferred for analytics or navigation handling.

## API

```html
<dx-navigation-menu
  [menu]="menu"
  [config]="{ expandMenu: true, showTooltip: true, tooltipPosition: 'right' }"
  (onClickMenu)="onMenuClick($event)">
</dx-navigation-menu>
```

### dx-navigation-menu

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[menu]` | Menu sections with children | `DxNavigationMenu[]` | `[]` |
| `[config]` | Menu behaviour configuration | `NavigationMenuConfig` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickMenu)` | Emitted when a child menu item is clicked | `EventEmitter<NavigationMenuChildren>` |

### Types

```typescript
interface DxNavigationMenu {
  title: string;
  children?: NavigationMenuChildren[];
}

interface NavigationMenuChildren {
  label: string;
  path?: MenuLink;
  id?: string;
  disabled?: boolean;
}

interface MenuLink {
  routerLink?: string;
  params?: Params;
}

interface NavigationMenuConfig {
  expandMenu?: boolean;
  showTooltip?: boolean;
  tooltipPosition?: 'above' | 'below' | 'left' | 'right';
  hideArrows?: boolean;
}
```

## Examples

### Basic grouped menu

```typescript
menu: DxNavigationMenu[] = [
  {
    title: 'Dashboard',
    children: [
      { label: 'Overview',  path: { routerLink: '/dashboard/overview' } },
      { label: 'Analytics', path: { routerLink: '/dashboard/analytics' } }
    ]
  },
  {
    title: 'Settings',
    children: [
      { label: 'Profile',     path: { routerLink: '/settings/profile' } },
      { label: 'Preferences', path: { routerLink: '/settings/preferences' } }
    ]
  }
];
```

```html
<dx-navigation-menu [menu]="menu" (onClickMenu)="onMenuClick($event)" />
```

### Compact menu with tooltips

```html
<dx-navigation-menu
  [menu]="menu"
  [config]="{ expandMenu: false, showTooltip: true, tooltipPosition: 'right', hideArrows: true }"
  (onClickMenu)="onMenuClick($event)">
</dx-navigation-menu>
```

## Import

```typescript
import { DxNavigationMenuModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxNavigationMenuModule]
})
export class YourModule { }
```
