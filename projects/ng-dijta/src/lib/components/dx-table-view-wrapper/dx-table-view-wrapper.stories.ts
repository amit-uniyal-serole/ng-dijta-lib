import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxTableViewWrapperComponent } from './dx-table-view-wrapper.component';
import { DxTableViewWrapperModule } from './dx-table-view-wrapper.module';
import { DxCanvas } from '../dx-canvas/data';
import type { DxTableColumn, DxTableSetting } from '../dx-table/interfaces/dx-table.interface';
import type { DxTableData } from '../dx-table/interfaces/dx-additional.interface';
import type { MultiViewTable } from './model/table-view-wrapper.interface';

const meta: Meta<any> = {
  title: 'Data Display/Table View Wrapper',
  component: DxTableViewWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTableViewWrapperModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Switching shell that renders either `dx-table` or `dx-canvas` for the same row dataset, ' +
          'driven by `[multiViewTable].selectedView` (`"dx-table"` | `"dx-canvas"`). Pass both the ' +
          'tabular config (`[columns]` + `[dataSource]` + `[setting]`) and the canvas config ' +
          '(`[canvasDataSource]` + `[canvasSetting]` + `[cardActions]`); the wrapper picks one and ' +
          'forwards all events back. Set `multiViewTable.isMultiViewToggle=true` to enable the ' +
          'built-in view-switcher in the active child component.',
      },
    },
  },
  argTypes: {
    multiViewTable: { control: 'object', description: '`{ selectedView: "dx-table" | "dx-canvas", isMultiViewToggle? }`.' },
    columns: { control: 'object', description: '`DxTableColumn<T>[]` — used by the `dx-table` branch.' },
    dataSource: { control: 'object', description: '`DxTableData<T>[]` — used by the `dx-table` branch.' },
    setting: { control: 'object', description: '`DxTableSetting` — table-level chrome.' },
    canvasDataSource: { control: 'object', description: '`DxCanvasData<T>[]` — used by the `dx-canvas` branch.' },
    canvasSetting: { control: 'object', description: '`DxCanvasSetting` — canvas-level chrome.' },
    cardActions: { control: 'object', description: '`DxTableColumn<T>` shaped action config consumed by the canvas card menu.' },
    isBusy: { control: 'boolean' },
    isAvatar: { control: 'boolean' },
    onTableViewAction: { action: 'onTableViewAction' },
    onTableViewSort: { action: 'onTableViewSort' },
    onTableViewCheckboxChange: { action: 'onTableViewCheckboxChange' },
    onTableViewFilterClick: { action: 'onTableViewFilterClick' },
    onTableViewPaginationClick: { action: 'onTableViewPaginationClick' },
    onTableViewEventChange: { action: 'onTableViewEventChange' },
    onTableViewRowSelection: { action: 'onTableViewRowSelection' },
    onTablePageSizeChange: { action: 'onTablePageSizeChange' },
    onCanvasViewCheckboxChange: { action: 'onCanvasViewCheckboxChange' },
    onCanvasViewPaginationClick: { action: 'onCanvasViewPaginationClick' },
    onClickCanvasViewHeaderAction: { action: 'onClickCanvasViewHeaderAction' },
    onClickCanvasViewAction: { action: 'onClickCanvasViewAction' },
    onCanvasPageSizeChange: { action: 'onCanvasPageSizeChange' },
  },
};

export default meta;
type Story = StoryObj<any>;

// ──────────────────────────────────────────────────────────────────────────
// Shared seed data — same domain rendered two ways
// ──────────────────────────────────────────────────────────────────────────

type User = { pkId: number; name: string; email: string; role: string; status: string; joined: Date; amount: number };

const USERS: User[] = [
  { pkId: 1, name: 'Ada Lovelace',      email: 'ada@example.com',      role: 'Engineer',   status: 'Active',   joined: new Date('2024-01-15'), amount: 4200 },
  { pkId: 2, name: 'Grace Hopper',      email: 'grace@example.com',    role: 'Architect',  status: 'Active',   joined: new Date('2024-02-08'), amount: 8400 },
  { pkId: 3, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer',   status: 'Inactive', joined: new Date('2023-11-22'), amount: 1200 },
  { pkId: 4, name: 'Linus Torvalds',    email: 'linus@example.com',    role: 'Maintainer', status: 'Active',   joined: new Date('2024-03-01'), amount: 9500 },
];

const TABLE_COLUMNS: DxTableColumn<User>[] = [
  { title: 'Name',   field: 'name',   type: 'text',     columnDef: 'name',   sortable: true },
  { title: 'Email',  field: 'email',  type: 'email',    columnDef: 'email' },
  { title: 'Role',   field: 'role',   type: 'text',     columnDef: 'role',   sortable: true },
  { title: 'Status', field: 'status', type: 'text',     columnDef: 'status' },
  { title: 'Joined', field: 'joined', type: 'date',     columnDef: 'joined', sortable: true },
  { title: 'Amount', field: 'amount', type: 'currency', columnDef: 'amount', sortable: true, setting: { currency: { currencyCode: 'USD' } as any } },
];

const TABLE_ROWS: DxTableData<User>[] = USERS.map(u => ({ data: u }));

const TABLE_SETTING: DxTableSetting = {
  pagination: true,
  pageSize: 5,
  totalItems: USERS.length,
  paginationFirstLastButtons: true,
  defaultSort: { columnDef: 'name', direction: 'asc' },
};

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box;">
    <dx-table-view-wrapper
      [multiViewTable]="multiViewTable"
      [columns]="columns"
      [dataSource]="dataSource"
      [setting]="setting"
      [canvasDataSource]="canvasDataSource"
      [canvasSetting]="canvasSetting"
      [cardActions]="cardActions"
      [isBusy]="isBusy"
      [isAvatar]="isAvatar"
      (onTableViewAction)="onTableViewAction($event)"
      (onTableViewSort)="onTableViewSort($event)"
      (onTableViewCheckboxChange)="onTableViewCheckboxChange($event)"
      (onTableViewPaginationClick)="onTableViewPaginationClick($event)"
      (onCanvasViewCheckboxChange)="onCanvasViewCheckboxChange($event)"
      (onCanvasViewPaginationClick)="onCanvasViewPaginationClick($event)">
    </dx-table-view-wrapper>
  </div>
`;

const baseArgs = {
  columns: TABLE_COLUMNS,
  dataSource: TABLE_ROWS,
  setting: TABLE_SETTING,
  canvasDataSource: DxCanvas.CardListData,
  canvasSetting: { ...DxCanvas.MockSetting },
  cardActions: DxCanvas.CardActions,
  isBusy: false,
  isAvatar: false,
};

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const TableView: Story = {
  name: 'Table view',
  args: { ...baseArgs, multiViewTable: { selectedView: 'dx-table', isMultiViewToggle: true } as MultiViewTable },
  parameters: { docs: { description: { story: '`selectedView: "dx-table"` — renders the tabular branch. The view-switcher in the table toolbar swaps to canvas (the wrapper listens via `onClickViewSwitcher`).' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const CanvasView: Story = {
  name: 'Canvas view',
  args: { ...baseArgs, multiViewTable: { selectedView: 'dx-canvas', isMultiViewToggle: true } as MultiViewTable },
  parameters: { docs: { description: { story: '`selectedView: "dx-canvas"` — same dataset rendered as cards via `dx-canvas`. Uses the bundled `DxCanvas.CardListData` / `MockSetting` so cards have real content.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const TableViewNoToggle: Story = {
  name: 'Table view (no switcher)',
  args: { ...baseArgs, multiViewTable: { selectedView: 'dx-table', isMultiViewToggle: false } as MultiViewTable },
  parameters: { docs: { description: { story: '`isMultiViewToggle: false` hides the built-in switcher — the parent app fully controls the active view.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const DefaultBranch: Story = {
  name: 'Default branch (unknown selectedView)',
  args: { ...baseArgs, multiViewTable: { selectedView: 'unknown' as any } as MultiViewTable },
  parameters: { docs: { description: { story: 'When `selectedView` does not match either case, `*ngSwitchDefault` falls back to `dx-table` — the safe default.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const BusyState: Story = {
  name: 'Busy (skeleton)',
  args: { ...baseArgs, multiViewTable: { selectedView: 'dx-table' } as MultiViewTable, isBusy: true },
  parameters: { docs: { description: { story: '`[isBusy]="true"` forwards to the active child — the table shows its skeleton placeholder.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty datasets',
  args: { ...baseArgs, multiViewTable: { selectedView: 'dx-table' } as MultiViewTable, dataSource: [], canvasDataSource: [], setting: { ...TABLE_SETTING, totalItems: 0 } },
  parameters: { docs: { description: { story: 'Both branches receive empty data. The active branch renders its own empty state.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
