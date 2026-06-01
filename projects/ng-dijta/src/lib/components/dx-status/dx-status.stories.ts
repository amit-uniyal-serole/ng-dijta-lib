import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxStatusComponent } from './dx-status.component';
import { DxStatusModule } from './dx-status.module';

const meta: Meta<any> = {
  title: 'Data Display/Status',
  component: DxStatusComponent,
  decorators: [
    moduleMetadata({
      imports: [DxStatusModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Pill / chip indicator driven by the `dxStatusChip` directive. Three input modes: ' +
          '(1) explicit `[color]` — paints the chip with whatever color you pass; ' +
          '(2) `[statusList]` — a `KeyValueModel[]` lookup; the chip resolves its color from the ' +
          'entry whose `keyTt` matches the current `[status]`; ' +
          '(3) `[isBusy]="true"` — replaces the chip with a `dx-skeleton-loader` while data ' +
          'is loading. Set `[link]="true"` to render the chip as an anchor and emit ' +
          '`(onStatusClick)` on click.',
      },
    },
  },
  argTypes: {
    status: { control: 'text', description: 'Status label / key to render inside the chip.' },
    color: { control: 'text', description: 'Override color (any CSS color string). Wins over `statusList` lookup.' },
    statusList: { control: 'object', description: '`KeyValueModel[]` mapping each status key to a color (`{ keyTt, valueTt, color }`).' },
    isBusy: { control: 'boolean', description: 'When `true`, the chip is replaced with a skeleton loader.' },
    link: { control: 'boolean', description: 'Render the chip as an anchor — clicks fire `(onStatusClick)`.' },
    onStatusClick: { action: 'onStatusClick', description: 'Fires when a `link`-mode chip is clicked.' },
  },
  args: {
    status: 'Active',
    color: '#2ECC71',
    statusList: undefined,
    isBusy: false,
    link: false,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-status
    [status]="status"
    [color]="color"
    [statusList]="statusList"
    [isBusy]="isBusy"
    [link]="link"
    (onStatusClick)="onStatusClick($event)">
  </dx-status>
`;

const STATUS_PALETTE = [
  { keyTt: 'Draft',     valueTt: 'Draft',     color: '#9E9E9E' },
  { keyTt: 'Pending',   valueTt: 'Pending',   color: '#F1C40F' },
  { keyTt: 'In review', valueTt: 'In review', color: '#F39C12' },
  { keyTt: 'Active',    valueTt: 'Active',    color: '#2ECC71' },
  { keyTt: 'Inactive',  valueTt: 'Inactive',  color: '#95A5A6' },
  { keyTt: 'Blocked',   valueTt: 'Blocked',   color: '#E74C3C' },
  { keyTt: 'Archived',  valueTt: 'Archived',  color: '#607D8B' },
];

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: { docs: { description: { story: 'Single status chip — green by explicit `[color]`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FromStatusList: Story = {
  name: 'Color from statusList',
  args: { color: undefined, statusList: STATUS_PALETTE, status: 'In review' },
  parameters: { docs: { description: { story: 'When `[color]` is omitted, the `dxStatusChip` directive looks up `status` in `statusList` and picks the matching `color`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Linkable: Story = {
  name: 'As a link',
  args: { link: true, color: '#3498DB', status: 'Open ticket' },
  parameters: { docs: { description: { story: '`[link]="true"` renders the chip as an anchor. Click → `(onStatusClick)` fires.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Loading: Story = {
  args: { isBusy: true },
  parameters: { docs: { description: { story: '`[isBusy]="true"` replaces the chip with a pill-shaped skeleton placeholder.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const ColorMatrix: Story = {
  name: 'All palette entries',
  parameters: { docs: { description: { story: 'Side-by-side render of every entry in the canonical `STATUS_PALETTE`.' } } },
  render: () => ({
    props: { items: STATUS_PALETTE },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        <dx-status *ngFor="let item of items" [status]="item.keyTt" [color]="item.color"></dx-status>
      </div>
    `,
  }),
};

export const ListLookup: Story = {
  name: 'List-driven palette',
  parameters: { docs: { description: { story: 'Same render via the `statusList` lookup path — only `[status]` changes per row.' } } },
  render: () => ({
    props: { items: STATUS_PALETTE.map(p => p.keyTt), palette: STATUS_PALETTE },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        <dx-status *ngFor="let s of items" [status]="s" [statusList]="palette"></dx-status>
      </div>
    `,
  }),
};

export const InsideTable: Story = {
  name: 'Inside a table row',
  parameters: { docs: { description: { story: 'Common usage — pill rendered inline next to other tabular data.' } } },
  render: () => ({
    props: {
      rows: [
        { id: 'INV-1001', customer: 'Acme Inc.',    status: 'Active',    color: '#2ECC71' },
        { id: 'INV-1002', customer: 'Globex Corp.', status: 'Pending',   color: '#F1C40F' },
        { id: 'INV-1003', customer: 'Initech',      status: 'Blocked',   color: '#E74C3C' },
        { id: 'INV-1004', customer: 'Soylent Corp.',status: 'Archived',  color: '#607D8B' },
      ],
    },
    template: `
      <table style="border-collapse:collapse; width:100%;">
        <thead>
          <tr style="text-align:left; border-bottom:1px solid #e0e0e0;">
            <th style="padding:8px 12px;">Invoice</th>
            <th style="padding:8px 12px;">Customer</th>
            <th style="padding:8px 12px;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" style="border-bottom:1px solid #f3f3f3;">
            <td style="padding:8px 12px;">{{ row.id }}</td>
            <td style="padding:8px 12px;">{{ row.customer }}</td>
            <td style="padding:8px 12px;"><dx-status [status]="row.status" [color]="row.color"></dx-status></td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};
