import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { DxHeaderComponent } from './dx-header.component';
import { DxHeaderModule } from './dx-header.module';
import { DxDrawerRef } from '../dx-drawer';

// `dx-profile` is normally opened inside a drawer, so it injects `DxDrawerRef`.
// Rendered standalone in a story there is no drawer, so we supply a stub that
// satisfies the injection (the component only calls `close()`).
const stubDrawerRef = {
  afterClose: EMPTY,
  afterOpen: of(undefined),
  close: () => {},
  open: () => {},
  getContentComponent: () => null,
} as unknown as DxDrawerRef;

// ──────────────────────────────────────────────────────────────────────────
// Sample data mirroring a real signed-in session (company "Tune", a notification
// feed, and the current user) so the header renders fully populated.
// ──────────────────────────────────────────────────────────────────────────

const SAMPLE_COMPANY_INFO = {
  defaultId: 1,
  companyList: [{ name: 'Tune', default: true }],
};

// Material font-icon names rendered as header action buttons (see HeaderIcons).
const SAMPLE_HEADER_ICONS = [
  { event: 'search', icon: 'search', label: 'Search' },
  { event: 'apps', icon: 'apps', label: 'Apps' },
  { event: 'help', icon: 'help_outline', label: 'Help' },
];

// `notificationDate` is intentionally omitted: the `dateAgo` pipe calls
// `moment(date).tz(...)`, and moment-timezone is not loaded in the Storybook
// bundle, so a date value throws. Without it the pipe safely renders '-'.
const SAMPLE_NOTIFICATIONS = [
  {
    groupName: 'Today',
    showAvatar: true,
    groupList: [
      { pkId: 1, userName: 'Aisha Khan', notificationData: 'commented on your policy review.', isRead: false },
      { pkId: 2, userName: 'Liam Patel', notificationData: 'approved your endorsement request.', isRead: false },
    ],
  },
  {
    groupName: 'Earlier',
    showAvatar: true,
    groupList: [
      { pkId: 3, userName: 'System', notificationData: 'Your renewal is due in 7 days.', isRead: true },
    ],
  },
];

// Drives both the header avatar/name/email and the profile drawer opened on click.
const SAMPLE_PROFILE = {
  profileBasic: {
    name: 'Murali Mohan',
    email: 'muralimohan.pagadala@serole.com',
    layoutType: 'compact',
    showLayoutOption: false,
    footerTitle: '© 2026 Indigit. All rights Reserved',
    companyList: [{ name: 'Tune', default: true }],
    profileActions: [
      { label: 'View Profile', type: 'view' },
      { label: 'Sign Out', type: 'logout', color: '#c8102e' },
    ],
  },
};

const meta: Meta<any> = {
  title: 'Layout/Header',
  component: DxHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxHeaderModule],
      providers: [provideAnimations(), { provide: DxDrawerRef, useValue: stubDrawerRef }],
    }),
    // Pad the dx-header inside a surface wrapper so the bar isn't flush to the canvas edges.
    componentWrapperDecorator((story) => `<div style="padding:24px; background:#f5f5f7; min-height:160px;">${story}</div>`),
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    companyInfo: { control: 'object', description: 'Type: `CompanyInfo`.' },
    topBarNotificationData: { control: 'object', description: 'Type: `Notifications | undefined`.' },
    headerIcons: { control: 'object', description: 'Type: `HeaderIcons[]`.' },
    currentUser: { control: 'object', description: 'Type: `Profile`.' },
    latestNotificationCount: { control: 'number', description: 'Type: `number`.' },
    unReadNotificationCount: { control: 'number', description: 'Type: `number`.' },
    isNewNotification: { control: 'object' },
    notification: { control: 'object' },
    onClickProfileMenu: { action: 'onClickProfileMenu' },
    onClickIcons: { action: 'onClickIcons' },
    onOpenNotificationMenu: { action: 'onOpenNotificationMenu' },
    onCloseNotificationMenu: { action: 'onCloseNotificationMenu' },
    onClickMarkAllasRead: { action: 'onClickMarkAllasRead' },
    onNotificationTabChange: { action: 'onNotificationTabChange' },
    onReadNotification: { action: 'onReadNotification' },
    onClickLoadMore: { action: 'onClickLoadMore' },
    onClickCompanyAction: { action: 'onClickCompanyAction' },
    onLayoutChange: { action: 'onLayoutChange' },
  },
  args: {
    companyInfo: SAMPLE_COMPANY_INFO,
    topBarNotificationData: SAMPLE_NOTIFICATIONS,
    headerIcons: SAMPLE_HEADER_ICONS,
    currentUser: SAMPLE_PROFILE,
    latestNotificationCount: 0,
    unReadNotificationCount: 2,
    isNewNotification: false,
    notification: true,
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  name: 'Header',
  parameters: { docs: { description: { story: 'The full `dx-header` bar — company branding ("Tune"), the notification bell, and the current user. Clicking the profile opens the profile drawer.' } } },
};

// ──────────────────────────────────────────────────────────────────────────
// Anatomy — the header's sub-components rendered in isolation. These replace
// the former `Layout/Header/*` sub-folder entries.
// ──────────────────────────────────────────────────────────────────────────

export const NotificationPanel: Story = {
  name: 'Anatomy: notification',
  parameters: { docs: { description: { story: 'The `dx-notification` sub-component — the grouped notification list shown in the header bell dropdown.' } } },
  render: () => ({
    props: { topBarNotificationData: SAMPLE_NOTIFICATIONS, unReadNotificationCount: 2 },
    template: `
      <div style="width:360px; border:1px solid #ececec; border-radius:6px; overflow:hidden;">
        <dx-notification [topBarNotificationData]="topBarNotificationData" [unReadNotificationCount]="unReadNotificationCount"></dx-notification>
      </div>`,
  }),
};

export const ProfileMenu: Story = {
  name: 'Anatomy: profile',
  parameters: { docs: { description: { story: 'The `dx-profile` sub-component — the user card, tenant switcher, and action row shown in the profile drawer.' } } },
  render: () => ({
    props: { profile: SAMPLE_PROFILE },
    template: `
      <div style="width:320px; border:1px solid #ececec; border-radius:6px; overflow:hidden;">
        <dx-profile [profile]="profile"></dx-profile>
      </div>`,
  }),
};
