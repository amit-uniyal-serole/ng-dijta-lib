---
category: Components
type: Feedback
title: Notifications
---

Notification panel shell that provides a translated header with *Mark all read* and *Show unread* actions, plus a content-projection slot for `dx-notification-item` entries. Designed to be rendered inside a drawer or overlay in an application shell.

## When To Use

- When building an in-app notifications inbox accessible from the header.
- When users need quick bulk actions (mark all as read, filter to unread) while browsing notifications.
- When a *Load more* affordance is required for paginated notifications.
- Pair with `<dx-notification-item>` to render individual messages.

## API

```html
<dx-notifications
  (onMarkAllAsRead)="markAllRead()"
  (onShowAllAsRead)="toggleUnreadFilter($event)"
  (onLoadMore)="loadMore()">
  <dx-notification-item
    *ngFor="let n of notifications"
    [data]="n"
    [url]="markReadUrl"
    (onMarkRead)="onRead(n)">
  </dx-notification-item>
</dx-notifications>
```

### dx-notifications

Uses content projection for the list of notification items; no inputs.

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onMarkAllAsRead)` | Emitted when the user clicks *Mark all read* | `EventEmitter<void>` |
| `(onShowAllAsRead)` | Emitted when the *Show unread* toggle changes; payload is the new checked state | `EventEmitter<boolean>` |
| `(onLoadMore)` | Emitted when the user requests more notifications | `EventEmitter<void>` |

### dx-notification-item

Individual notification row with an expand / collapse animation and mark-as-read action.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[data]` | Notification payload | `DxNotification` | `-` |
| `[url]` | Endpoint POSTed to when marking as read | `string` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onMarkRead)` | Emitted after the notification is successfully marked as read | `EventEmitter<void>` |
| `(onClose)` | Emitted when an anchor link inside the item is clicked | `EventEmitter<void>` |

### Types

```typescript
interface DxNotification {
  title?: string;
  message?: string;
  isRead?: boolean;
  userName?: string;
  pkId?: number;
  date?: string | Date;
}
```

## Examples

### Basic panel

```html
<dx-notifications
  (onMarkAllAsRead)="markAllRead()"
  (onShowAllAsRead)="filterUnread($event)">
  <dx-notification-item
    *ngFor="let n of notifications"
    [data]="n"
    [url]="'/api/notifications/mark-read'"
    (onMarkRead)="refresh()">
  </dx-notification-item>
</dx-notifications>
```

### With load-more action

```html
<dx-notifications
  (onMarkAllAsRead)="markAllRead()"
  (onLoadMore)="loadMore()">
  <dx-notification-item
    *ngFor="let n of notifications"
    [data]="n"
    [url]="'/api/notifications/mark-read'">
  </dx-notification-item>
</dx-notifications>
```

## Import

```typescript
import { DxNotificationModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxNotificationModule]
})
export class YourModule { }
```
