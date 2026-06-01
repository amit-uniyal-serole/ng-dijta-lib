import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgxTabsComponent } from './tabs.component';
import { TabsModule } from './tabs.module';

const meta: Meta<NgxTabsComponent> = {
  title: 'Navigation/Tab/Tabs',
  component: NgxTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [TabsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Tab navigation (`d-tabs` / `d-tab`). Supports five visual `type` variants ' +
          '(tabs, pills, options, wrapped, slider), four sizes, vertical orientation, and ' +
          'closeable / addable tabs. Each `d-tab` projects its panel content as child markup.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['tabs', 'pills', 'options', 'wrapped', 'slider'],
      description: 'Visual style of the tab strip.',
      table: { defaultValue: { summary: 'tabs' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md', 'sm', 'xs'],
      description: 'Tab size.',
      table: { defaultValue: { summary: 'md' } },
    },
    vertical: { control: 'boolean', description: 'Stack tabs vertically.', table: { defaultValue: { summary: 'false' } } },
    closeable: { control: 'boolean', description: 'Show a close icon on each tab.', table: { defaultValue: { summary: 'false' } } },
    addable: { control: 'boolean', description: 'Show an add (+) button after the tabs.', table: { defaultValue: { summary: 'false' } } },
    showContent: { control: 'boolean', description: 'Render the active tab panel.', table: { defaultValue: { summary: 'true' } } },
    activeTab: { control: 'text', description: 'Id of the active tab.' },
    activeTabChange: { action: 'activeTabChange' },
    addOrDeleteTabChange: { action: 'addOrDeleteTabChange' },
  },
  args: {
    type: 'tabs',
    size: 'md',
    vertical: false,
    closeable: false,
    addable: false,
    showContent: true,
  },
};

export default meta;
type Story = StoryObj<NgxTabsComponent>;

/** Three tabs sharing one panel-content snippet. */
const TABS = `
  <d-tab [tabId]="0" title="Overview"><div style="padding:16px;">Overview panel content.</div></d-tab>
  <d-tab [tabId]="1" title="Activity"><div style="padding:16px;">Activity panel content.</div></d-tab>
  <d-tab [tabId]="2" title="Settings"><div style="padding:16px;">Settings panel content.</div></d-tab>
`;

/** Minimal usage, wired to the Controls panel. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <d-tabs
        [type]="type"
        [size]="size"
        [vertical]="vertical"
        [closeable]="closeable"
        [addable]="addable"
        [showContent]="showContent"
        (activeTabChange)="activeTabChange($event)"
        (addOrDeleteTabChange)="addOrDeleteTabChange($event)">
        ${TABS}
      </d-tabs>
    `,
  }),
};

/** All five `type` variants. */
export const Types: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:28px;">
        <div><p style="margin:0 0 4px; font-weight:600;">tabs</p><d-tabs type="tabs">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">pills</p><d-tabs type="pills">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">options</p><d-tabs type="options">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">wrapped</p><d-tabs type="wrapped">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">slider</p><d-tabs type="slider">${TABS}</d-tabs></div>
      </div>
    `,
  }),
};

/** All four sizes. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:28px;">
        <div><p style="margin:0 0 4px; font-weight:600;">lg</p><d-tabs size="lg">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">md</p><d-tabs size="md">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">sm</p><d-tabs size="sm">${TABS}</d-tabs></div>
        <div><p style="margin:0 0 4px; font-weight:600;">xs</p><d-tabs size="xs">${TABS}</d-tabs></div>
      </div>
    `,
  }),
};

/** Vertically stacked tabs. */
export const Vertical: Story = {
  render: () => ({
    template: `<d-tabs [vertical]="true">${TABS}</d-tabs>`,
  }),
};

/** A disabled tab is skipped and not selectable. */
export const DisabledTab: Story = {
  render: () => ({
    template: `
      <d-tabs>
        <d-tab [tabId]="0" title="General"><div style="padding:16px;">General settings.</div></d-tab>
        <d-tab [tabId]="1" title="Admin" [disabled]="true"><div style="padding:16px;">Admin-only.</div></d-tab>
        <d-tab [tabId]="2" title="About"><div style="padding:16px;">About this app.</div></d-tab>
      </d-tabs>
    `,
  }),
};

/** Closeable tabs render a close icon; closing emits `addOrDeleteTabChange`. */
export const Closeable: Story = {
  render: () => ({
    template: `<d-tabs [closeable]="true">${TABS}</d-tabs>`,
  }),
};

/** An add (+) button after the tabs emits `addOrDeleteTabChange`. */
export const Addable: Story = {
  render: () => ({
    template: `<d-tabs [addable]="true">${TABS}</d-tabs>`,
  }),
};

/** Fixed-width tabs via `customWidth`. */
export const CustomWidth: Story = {
  render: () => ({
    template: `<d-tabs customWidth="160px">${TABS}</d-tabs>`,
  }),
};

/**
 * Rich tab headers via the `dTabTitle` template directive instead of the plain
 * `title` string.
 */
export const CustomTitle: Story = {
  render: () => ({
    template: `
      <d-tabs>
        <d-tab [tabId]="0">
          <ng-template dTabTitle>
            <span style="display:inline-flex; align-items:center; gap:6px;">⭐ <b>Starred</b></span>
          </ng-template>
          <div style="padding:16px;">Starred items.</div>
        </d-tab>
        <d-tab [tabId]="1">
          <ng-template dTabTitle>
            <span style="display:inline-flex; align-items:center; gap:6px;">🔔 Alerts
              <span style="background:#d9363e;color:#fff;border-radius:8px;padding:0 6px;font-size:11px;">3</span>
            </span>
          </ng-template>
          <div style="padding:16px;">You have 3 alerts.</div>
        </d-tab>
      </d-tabs>
    `,
  }),
};

/**
 * Many tabs with `scrollMode="auto"` — when the strip overflows its container,
 * prev/next scroll controls and an overflow dropdown appear.
 */
export const Scrollable: Story = {
  render: () => ({
    template: `
      <div style="max-width:560px; border:1px solid var(--dx-outline, #e0e0e0);">
        <d-tabs scrollMode="auto" [activeTab]="0">
          ${Array.from({ length: 12 }, (_, i) =>
            `<d-tab [tabId]="${i}" title="Section ${i + 1}"><div style="padding:16px;">Section ${i + 1} content.</div></d-tab>`
          ).join('')}
        </d-tabs>
      </div>
    `,
  }),
};

/**
 * `beforeChange` guards tab switching. Here it blocks switching to the third
 * tab (returns `false`); the guard can also return a `Promise`/`Observable`.
 */
export const BeforeChange: Story = {
  render: () => ({
    props: { beforeChange: (next: number | string) => next !== 2 },
    template: `
      <d-tabs [beforeChange]="beforeChange">
        <d-tab [tabId]="0" title="Overview"><div style="padding:16px;">Overview — switching is allowed.</div></d-tab>
        <d-tab [tabId]="1" title="Activity"><div style="padding:16px;">Activity — switching is allowed.</div></d-tab>
        <d-tab [tabId]="2" title="Locked"><div style="padding:16px;">You should not be able to reach this tab.</div></d-tab>
      </d-tabs>
    `,
  }),
};

/** `showContent="false"` renders the tab strip only, with no panel area. */
export const WithoutContent: Story = {
  render: () => ({
    template: `<d-tabs [showContent]="false">${TABS}</d-tabs>`,
  }),
};
