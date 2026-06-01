import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxTabGroupComponent } from './dx-tab-group.component';
import { DxTabGroupModule } from './dx-tab-group.module';

const meta: Meta<DxTabGroupComponent> = {
  title: 'Navigation/Tab Group',
  component: DxTabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTabGroupModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Declarative tab navigation wrapping Angular Material `mat-tab-group`. Tabs, ' +
          'headers and content are projected via `dx-tab` / `dx-tab-header` / `dx-tab-content`. ' +
          'Supports alignment, four outline style variants, header position and a preselected tab.',
      },
    },
  },
  argTypes: {
    tabsAlign: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end'],
      description: 'Horizontal alignment of the tab strip.',
      table: { defaultValue: { summary: 'start' } },
    },
    outline: {
      control: { type: 'inline-radio' },
      options: ['filled', 'top_underline', 'bottom_underline_bg', 'none'],
      description: 'Visual style variant.',
      table: { defaultValue: { summary: 'none' } },
    },
    animationDuration: { control: 'text', description: 'Tab transition duration.', table: { defaultValue: { summary: '500ms' } } },
    headerPosition: {
      control: { type: 'inline-radio' },
      options: ['', 'below'],
      description: 'Position of the tab header strip.',
      table: { defaultValue: { summary: '' } },
    },
    color: { control: 'text', description: 'Material theme color for the indicator.' },
    backgroundColor: {
      control: { type: 'inline-radio' },
      options: ['', 'primary', 'accent', 'warn'],
      description: 'Material theme background palette.',
    },
    selectedIndex: { control: 'number', description: 'Index of the initially selected tab.', table: { defaultValue: { summary: '0' } } },
    selectFocusedIndex: { action: 'selectFocusedIndex' },
    selectedTabChange: { action: 'selectedTabChange' },
  },
  args: {
    tabsAlign: 'start',
    outline: 'none',
    animationDuration: '500ms',
    headerPosition: '',
    color: '',
    backgroundColor: '',
    selectedIndex: 0,
  },
};

export default meta;
type Story = StoryObj<DxTabGroupComponent>;

/** Three projected tabs sharing one panel-content snippet. */
const TABS = `
  <dx-tab>
    <dx-tab-header title="Overview" icon="info"></dx-tab-header>
    <dx-tab-content><div style="padding:16px;">Overview panel content.</div></dx-tab-content>
  </dx-tab>
  <dx-tab>
    <dx-tab-header title="Activity" icon="history"></dx-tab-header>
    <dx-tab-content><div style="padding:16px;">Activity panel content.</div></dx-tab-content>
  </dx-tab>
  <dx-tab>
    <dx-tab-header title="Settings" icon="settings"></dx-tab-header>
    <dx-tab-content><div style="padding:16px;">Settings panel content.</div></dx-tab-content>
  </dx-tab>
`;

/** Minimal usage, wired to the Controls panel. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <dx-tab-group
        [tabsAlign]="tabsAlign"
        [outline]="outline"
        [animationDuration]="animationDuration"
        [headerPosition]="headerPosition"
        [color]="color"
        [backgroundColor]="backgroundColor"
        [selectedIndex]="selectedIndex"
        (selectedTabChange)="selectedTabChange($event)"
        (selectFocusedIndex)="selectFocusedIndex($event)">
        ${TABS}
      </dx-tab-group>
    `,
  }),
};

/** Tab headers with leading Material icons. */
export const WithIcons: Story = {
  render: () => ({
    template: `<dx-tab-group>${TABS}</dx-tab-group>`,
  }),
};

/** All four `outline` style variants, stacked. */
export const AllOutlines: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:28px;">
        <div><p style="margin:0 0 4px; font-weight:600;">none</p><dx-tab-group outline="none">${TABS}</dx-tab-group></div>
        <div><p style="margin:0 0 4px; font-weight:600;">filled</p><dx-tab-group outline="filled">${TABS}</dx-tab-group></div>
        <div><p style="margin:0 0 4px; font-weight:600;">top_underline</p><dx-tab-group outline="top_underline">${TABS}</dx-tab-group></div>
        <div><p style="margin:0 0 4px; font-weight:600;">bottom_underline_bg</p><dx-tab-group outline="bottom_underline_bg">${TABS}</dx-tab-group></div>
      </div>
    `,
  }),
};

/** `tabsAlign` start / center / end. */
export const Alignments: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:28px;">
        <div><p style="margin:0 0 4px; font-weight:600;">start</p><dx-tab-group tabsAlign="start">${TABS}</dx-tab-group></div>
        <div><p style="margin:0 0 4px; font-weight:600;">center</p><dx-tab-group tabsAlign="center">${TABS}</dx-tab-group></div>
        <div><p style="margin:0 0 4px; font-weight:600;">end</p><dx-tab-group tabsAlign="end">${TABS}</dx-tab-group></div>
      </div>
    `,
  }),
};

/** Second tab preselected via `selectedIndex`. */
export const SelectedIndex: Story = {
  render: () => ({
    template: `<dx-tab-group [selectedIndex]="1">${TABS}</dx-tab-group>`,
  }),
};

/** A disabled tab is skipped by keyboard navigation and not selectable. */
export const DisabledTab: Story = {
  render: () => ({
    template: `
      <dx-tab-group>
        <dx-tab>
          <dx-tab-header title="General" icon="tune"></dx-tab-header>
          <dx-tab-content><div style="padding:16px;">General settings.</div></dx-tab-content>
        </dx-tab>
        <dx-tab [disabled]="true">
          <dx-tab-header title="Admin" icon="admin_panel_settings"></dx-tab-header>
          <dx-tab-content><div style="padding:16px;">Admin-only panel.</div></dx-tab-content>
        </dx-tab>
      </dx-tab-group>
    `,
  }),
};

/** Header strip rendered below the content via `headerPosition="below"`. */
export const HeaderBelow: Story = {
  render: () => ({
    template: `<dx-tab-group headerPosition="below">${TABS}</dx-tab-group>`,
  }),
};
