import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxNotificationItemComponent } from './dx-notification-item.component';
import { DxNotificationModule } from '../dx-notification.module';
import type { DxNotification } from '../model/notification-item';

// ──────────────────────────────────────────────────────────────────────────
// `<dx-notification-item>` is a single notification row: optional avatar
// (from `userName`), title, sanitized HTML message, a relative date and a
// mark-as-read dot. Clicking the dot POSTs `[data].pkId` to `[url]` and emits
// `(onMarkRead)`; clicking an anchor inside the message emits `(onClose)`.
// The stories below frame the item so its avatar / message layout is visible.
// ──────────────────────────────────────────────────────────────────────────

const FRAME_STYLE =
  'width:360px; border:1px solid #e0e0e0; border-radius:8px; padding:8px;';

const baseItem: DxNotification = {
  pkId: 1,
  title: 'Deployment complete',
  message: 'Release <strong>v18.5.21</strong> is now live in production.',
  userName: 'Alex Morgan',
  isRead: false,
  date: '2026-05-29T09:00:00Z',
};

const meta: Meta<DxNotificationItemComponent> = {
  title: 'Overlays/Notification/Notification Item',
  component: DxNotificationItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNotificationModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A single notification row used inside `<dx-notifications>`. Renders an avatar (when ' +
          '`[data].userName` is set), a title, a sanitized HTML message, a relative date and an ' +
          'unread dot. Clicking the dot POSTs the notification `pkId` to `[url]` and emits ' +
          '`(onMarkRead)`; clicking an anchor inside the message emits `(onClose)`.',
      },
    },
  },
  argTypes: {
    data: { control: 'object', description: 'Notification payload. Type: `DxNotification`.' },
    url: { control: 'text', description: 'Endpoint POSTed to when the unread dot is clicked. Type: `string`.' },
    onMarkRead: { action: 'onMarkRead', description: 'Emitted after the notification is marked as read.' },
    onClose: { action: 'onClose', description: 'Emitted when an anchor link inside the message is clicked.' },
  },
  args: {
    data: baseItem,
    url: '/api/notifications/mark-read',
  },
  render: (args) => ({
    props: args,
    template: `<div style="${FRAME_STYLE}"><dx-notification-item [data]="data" [url]="url" (onMarkRead)="onMarkRead()" (onClose)="onClose()"></dx-notification-item></div>`,
  }),
};

export default meta;
type Story = StoryObj<DxNotificationItemComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Unread',
  parameters: { docs: { description: { story: 'Unread item with avatar, title, message and date — the unread dot is shown.' } } },
};

export const Read: Story = {
  name: 'Read',
  args: { data: { ...baseItem, isRead: true } },
  parameters: { docs: { description: { story: '`isRead: true` — the mark-as-read dot reflects the read state and the row no longer POSTs on click.' } } },
};

export const NoAvatar: Story = {
  name: 'No avatar',
  args: { data: { ...baseItem, userName: undefined } },
  parameters: { docs: { description: { story: 'Without `userName` the avatar slot is omitted and the message spans the full width.' } } },
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: { data: { pkId: 2, title: 'Password changed successfully', userName: 'Security', isRead: false, date: '2026-05-29T07:30:00Z' } },
  parameters: { docs: { description: { story: 'A short notification with no message body.' } } },
};

export const LongMessage: Story = {
  name: 'Long message',
  args: {
    data: {
      ...baseItem,
      title: 'Scheduled maintenance',
      message:
        'The platform will undergo scheduled maintenance on Saturday from 02:00 to 04:00 UTC. ' +
        'During this window some services may be temporarily unavailable. Please save your work in advance. ' +
        'See the <a href="#">status page</a> for live updates.',
    },
  },
  parameters: { docs: { description: { story: 'A longer message demonstrating the collapse height and an inline anchor (which emits `onClose` when clicked).' } } },
};
