import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxNotificationsComponent } from './dx-notification.component';
import { DxNotificationModule } from './dx-notification.module';
import type { DxNotification } from './model/notification-item';

// ──────────────────────────────────────────────────────────────────────────
// `<dx-notifications>` is a panel shell: a translated header with
// "Mark all read" / "Show unread" actions and a content-projection slot for
// `<dx-notification-item>` rows. It is normally rendered inside a drawer or
// overlay. The stories wrap it in a fixed-size, bordered frame so the panel
// reads like the in-app notifications inbox it powers, and project a realistic
// set of items so the body is populated.
// ──────────────────────────────────────────────────────────────────────────

const SAMPLE_ITEMS: DxNotification[] = [
  {
    pkId: 1,
    title: 'Deployment complete',
    message: 'Release <strong>v18.5.21</strong> is now live in production.',
    userName: 'Alex Morgan',
    isRead: false,
    date: '2026-05-29T09:00:00Z',
  },
  {
    pkId: 2,
    title: 'New comment on your report',
    message: 'Priya left a note: "Please double-check the Q2 totals."',
    userName: 'Priya Nair',
    isRead: false,
    date: '2026-05-29T08:12:00Z',
  },
  {
    pkId: 3,
    title: 'Backup finished',
    message: 'Nightly backup completed successfully.',
    userName: 'System',
    isRead: true,
    date: '2026-05-28T03:00:00Z',
  },
];

const FRAME_STYLE =
  'height:420px; width:380px; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);';

const meta: Meta<DxNotificationsComponent> = {
  title: 'Overlays/Notification',
  component: DxNotificationsComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNotificationModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Notification panel shell (`<dx-notifications>`). Renders a translated header with ' +
          '*Mark all read* and *Show unread* bulk actions, plus a content-projection slot for ' +
          '`<dx-notification-item>` rows. Designed to live inside a drawer / overlay in an app ' +
          'shell. It exposes three outputs — `(onMarkAllAsRead)`, `(onShowAllAsRead)` (payload is ' +
          'the new toggle state) and `(onLoadMore)` — wired to the Actions panel below. The ' +
          'component itself has no inputs; the body is supplied entirely via content projection.',
      },
    },
  },
  argTypes: {
    onMarkAllAsRead: { action: 'onMarkAllAsRead', description: 'Emitted when *Mark all read* is clicked.' },
    onShowAllAsRead: { action: 'onShowAllAsRead', description: 'Emitted when the *Show unread* toggle changes; payload is the new checked state.' },
    onLoadMore: { action: 'onLoadMore', description: 'Emitted when the user requests more notifications.' },
  },
};

export default meta;
type Story = StoryObj<DxNotificationsComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'With items',
  parameters: {
    docs: { description: { story: 'Populated inbox — a mix of unread and read items projected into the body.' } },
  },
  render: (args) => ({
    props: { ...args, items: SAMPLE_ITEMS },
    template: `
      <div style="${FRAME_STYLE}">
        <dx-notifications
          (onMarkAllAsRead)="onMarkAllAsRead()"
          (onShowAllAsRead)="onShowAllAsRead($event)"
          (onLoadMore)="onLoadMore()">
          <dx-notification-item
            *ngFor="let n of items"
            [data]="n"
            url="/api/notifications/mark-read">
          </dx-notification-item>
        </dx-notifications>
      </div>
    `,
  }),
};

export const Empty: Story = {
  name: 'Empty state',
  parameters: {
    docs: { description: { story: 'No items projected — the header and bulk actions remain, the body is empty.' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="${FRAME_STYLE}">
        <dx-notifications
          (onMarkAllAsRead)="onMarkAllAsRead()"
          (onShowAllAsRead)="onShowAllAsRead($event)"
          (onLoadMore)="onLoadMore()">
        </dx-notifications>
      </div>
    `,
  }),
};

export const SingleUnread: Story = {
  name: 'Single unread item',
  parameters: {
    docs: { description: { story: 'A single unread notification — the minimal populated panel.' } },
  },
  render: (args) => ({
    props: { ...args, items: SAMPLE_ITEMS.slice(0, 1) },
    template: `
      <div style="${FRAME_STYLE}">
        <dx-notifications
          (onMarkAllAsRead)="onMarkAllAsRead()"
          (onShowAllAsRead)="onShowAllAsRead($event)"
          (onLoadMore)="onLoadMore()">
          <dx-notification-item
            *ngFor="let n of items"
            [data]="n"
            url="/api/notifications/mark-read">
          </dx-notification-item>
        </dx-notifications>
      </div>
    `,
  }),
};
