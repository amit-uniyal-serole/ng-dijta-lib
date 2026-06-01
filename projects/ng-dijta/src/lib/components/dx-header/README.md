---
category: Components
type: Navigation
title: Header
---

Application top bar that composes branding, company switcher, notification menu, action icons and a user profile drawer. Built on Angular Material `mat-menu`, `mat-tabs`, `mat-badge` and the library's `dx-drawer` / `dx-avatar` primitives.

## When To Use

- As the primary top-bar for authenticated application shells.
- When the product needs a unified notification tray with read / unread tabs and load-more paging.
- When users can switch between companies / workspaces from the header.
- When profile actions (preferences, logout, layout toggle) should live in a side drawer.

## API

```html
<dx-header
  [companyInfo]="companyInfo"
  [currentUser]="currentUser"
  [headerIcons]="icons"
  [topBarNotificationData]="notifications"
  (onClickIcons)="onIcon($event)"
  (onClickProfileMenu)="onProfile($event)">
</dx-header>
```

### dx-header

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[companyInfo]` | Company list and default company for the switcher | `CompanyInfo` | - |
| `[currentUser]` | Profile object rendered in the avatar and profile drawer | `Profile` | - |
| `[headerIcons]` | Action icons rendered between notifications and the avatar | `HeaderIcons[]` | - |
| `[topBarNotificationData]` | Grouped notification payload for the menu | `Notifications \| undefined` | - |
| `[latestNotificationCount]` | Count shown on the notification badge | `number` | `0` |
| `[unReadNotificationCount]` | Unread count used for tab badges / mark-all-as-read visibility | `number` | `1` |
| `[isNewNotification]` | Flag indicating unseen notifications | `boolean` | `false` |
| `[notification]` | Enables the notification menu trigger | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickIcons)` | Emitted when a header icon is clicked; payload is the icon's `event` key | `EventEmitter<string>` |
| `(onClickProfileMenu)` | Emitted when the user picks an action from the profile drawer | `EventEmitter<ProfileBasicAction>` |
| `(onOpenNotificationMenu)` | Emitted when the notification menu opens | `EventEmitter<boolean>` |
| `(onCloseNotificationMenu)` | Emitted when the notification menu closes | `EventEmitter<boolean>` |
| `(onClickMarkAllasRead)` | Emitted when *mark all as read* is clicked | `EventEmitter<void>` |
| `(onNotificationTabChange)` | Emitted when the user switches notification tabs | `EventEmitter<MatTabChangeEvent>` |
| `(onReadNotification)` | Emitted when a single notification is marked read | `EventEmitter<ReadNotification>` |
| `(onClickLoadMore)` | Emitted when *load more* is clicked in the notification list | `EventEmitter<void>` |
| `(onClickCompanyAction)` | Emitted when the user selects a company | `EventEmitter<Company>` |
| `(onLayoutChange)` | Emitted when the layout toggle changes | `EventEmitter<string>` |

### Types

```typescript
interface CompanyInfo { defaultId?: number; companyList?: Company[]; }
interface Company { logo?: string; name?: string; default?: boolean; hideName?: boolean; }
interface HeaderIcons { event: string; icon: string; label: string; }
type Notifications = Notification[];
interface Notification { groupName?: string; groupList?: GroupList[]; showAvatar?: boolean; }
interface GroupList { pkId?: number; userName?: string; notificationData?: string; isRead?: boolean; notificationDate?: string; }
interface ReadNotification { id?: number; groupName?: string; isRead?: boolean; }
```

## Examples

### Basic

```html
<dx-header
  [companyInfo]="companyInfo"
  [currentUser]="currentUser"
  [headerIcons]="[
    { event: 'help',     icon: 'help_outline', label: 'dx.header.help' },
    { event: 'settings', icon: 'settings',     label: 'dx.header.settings' }
  ]"
  (onClickIcons)="onIcon($event)"
  (onClickProfileMenu)="onProfile($event)">
</dx-header>
```

### With notifications

```html
<dx-header
  [notification]="true"
  [topBarNotificationData]="groups"
  [latestNotificationCount]="unreadCount"
  [unReadNotificationCount]="unreadCount"
  [isNewNotification]="unreadCount > 0"
  (onClickMarkAllasRead)="markAllRead()"
  (onReadNotification)="markRead($event)"
  (onClickLoadMore)="loadMore()"
  (onNotificationTabChange)="onTab($event)">
</dx-header>
```

### With company switcher

```html
<dx-header
  [companyInfo]="{ companyList: companies, defaultId: 1 }"
  (onClickCompanyAction)="switchCompany($event)">
</dx-header>
```

## Import

```typescript
import { DxHeaderModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxHeaderModule]
})
export class YourModule { }
```
