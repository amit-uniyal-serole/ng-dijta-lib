import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxTableComponent } from './components/dx-table/dx-table.component';
import { FlexTableModule } from './dx-table.module';
import type {
  DxTableColumn,
  DxTableSetting,
  BulkActions,
} from './interfaces/dx-table.interface';
import type { DxTableData } from './interfaces/dx-additional.interface';

const meta: Meta<DxTableComponent<any>> = {
  title: 'Data Display/Table',
  component: DxTableComponent,
  decorators: [
    moduleMetadata({ imports: [FlexTableModule] }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Public table component (`<dx-table>`). Driven by `[columns]: DxTableColumn<T>[]` and ' +
          '`[dataSource]: DxTableData<T>[]`. The column `type` selects a cell renderer ' +
          '(35+ types — text / currency / date / avatar / chip / link / menu / toggle / lookup / ' +
          'file / custom / …), and per-row `DxTableData` properties (`multiCheckbox`, `toggle`, ' +
          '`menu`, `link`, `tooltip`, `disabled`, `progressBar`, `multiChip`, `dropdown`, etc.) ' +
          'override behaviour for that row. The 38 internal cell components are not surfaced as ' +
          'menu entries — only `dx-table` is public.',
      },
    },
  },
  argTypes: {
    columns: { control: 'object', description: '`DxTableColumn<T>[]` — `{ title, field, type, columnDef, sortable?, sticky?, footer?, setting?, menuOptions?, … }`.' },
    dataSource: { control: 'object', description: '`DxTableData<T>[]` — `[{ data, multiCheckbox?, toggle?, menu?, link?, tooltip?, multiChip?, ngDxAvatar?, disabled?, progressBar?, dropdown?, … }]`.' },
    setting: { control: 'object', description: '`DxTableSetting` — `multiSelect`, `singleRowSelect`, `pagination`, `pageSize`, `defaultSort`, `rowArrange`, `enableRowClick`, …' },
    pageSizeList: { control: 'object', description: '`BulkActions` config for the page-size dropdown.' },
    isBusy: { control: 'boolean', description: 'Show the skeleton instead of rows.' },
    tableHeight: { control: 'text', description: 'CSS height — enables sticky header / scrolling viewport.' },
    type: { control: { type: 'inline-radio' }, options: ['classic', 'default', 'canvas'], description: 'Visual flavor.' },
    onAction: { action: 'onAction' },
    onSort: { action: 'onSort' },
    onCheckboxChange: { action: 'onCheckboxChange' },
    onFilterClick: { action: 'onFilterClick' },
    onPaginationClick: { action: 'onPaginationClick' },
    onClickRow: { action: 'onClickRow' },
    onRowDrop: { action: 'onRowDrop' },
    onClickMenuAction: { action: 'onClickMenuAction' },
    onToggleEventChange: { action: 'onToggleEventChange' },
  },
};

export default meta;
type Story = StoryObj<DxTableComponent<any>>;

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box;">
    <dx-table
      [type]="type"
      [columns]="columns"
      [dataSource]="dataSource"
      [setting]="setting"
      [pageSizeList]="pageSizeList"
      [isBusy]="isBusy"
      [tableHeight]="tableHeight"
      (onAction)="onAction($event)"
      (onSort)="onSort($event)"
      (onCheckboxChange)="onCheckboxChange($event)"
      (onFilterClick)="onFilterClick($event)"
      (onPaginationClick)="onPaginationClick($event)"
      (onClickRow)="onClickRow($event)"
      (onRowDrop)="onRowDrop($event)"
      (onClickMenuAction)="onClickMenuAction($event)"
      (onToggleEventChange)="onToggleEventChange($event)">
    </dx-table>
  </div>
`;

// ──────────────────────────────────────────────────────────────────────────
// Shared user dataset (used by overview stories)
// ──────────────────────────────────────────────────────────────────────────

type User = { pkId: number; name: string; email: string; role: string; status: string; joined: Date; amount: number };

const USER_ROWS: User[] = [
  { pkId: 1, name: 'Ada Lovelace',      email: 'ada@example.com',     role: 'Engineer',  status: 'Active',   joined: new Date('2024-01-15'), amount: 4200 },
  { pkId: 2, name: 'Grace Hopper',      email: 'grace@example.com',   role: 'Architect', status: 'Active',   joined: new Date('2024-02-08'), amount: 8400 },
  { pkId: 3, name: 'Margaret Hamilton', email: 'margaret@example.com',role: 'Engineer',  status: 'Inactive', joined: new Date('2023-11-22'), amount: 1200 },
  { pkId: 4, name: 'Linus Torvalds',    email: 'linus@example.com',   role: 'Maintainer',status: 'Active',   joined: new Date('2024-03-01'), amount: 9500 },
  { pkId: 5, name: 'Brendan Eich',      email: 'brendan@example.com', role: 'Engineer',  status: 'Active',   joined: new Date('2024-04-12'), amount: 3300 },
];

const wrap = <T>(rows: T[]): DxTableData<T>[] => rows.map(r => ({ data: r }));

const USER_COLUMNS_BASIC: DxTableColumn<User>[] = [
  { title: 'Name',   field: 'name',   type: 'text',  columnDef: 'name',   sortable: true },
  { title: 'Email',  field: 'email',  type: 'email', columnDef: 'email' },
  { title: 'Role',   field: 'role',   type: 'text',  columnDef: 'role',   sortable: true },
  { title: 'Status', field: 'status', type: 'text',  columnDef: 'status' },
  { title: 'Joined', field: 'joined', type: 'date',  columnDef: 'joined', sortable: true },
];

const USER_COLUMNS_RICH: DxTableColumn<User>[] = [
  { title: 'Name',   field: 'name',   type: 'text',     columnDef: 'name',   sortable: true, sticky: 'start' },
  { title: 'Email',  field: 'email',  type: 'email',    columnDef: 'email' },
  { title: 'Role',   field: 'role',   type: 'text',     columnDef: 'role',   sortable: true },
  { title: 'Status', field: 'status', type: 'text',     columnDef: 'status', backgroundClass: true },
  { title: 'Joined', field: 'joined', type: 'date',     columnDef: 'joined', sortable: true, setting: { date: { format: 'DD-MM-YYYY' as any } } },
  { title: 'Amount', field: 'amount', type: 'currency', columnDef: 'amount', sortable: true, footer: { showAsFooterValue: true, title: 'Total' }, setting: { currency: { currencyCode: 'USD' } as any } },
];

const DEFAULT_SETTING: DxTableSetting = {
  pagination: true,
  pageSize: 5,
  totalItems: 25,
  paginationFirstLastButtons: true,
};

const PAGE_SIZE_LIST: BulkActions = {
  type: 'mini-btn',
  show: true,
  label: '5',
  actions: [
    { type: '5',  label: '5',  defaultPageSize: true } as any,
    { type: '10', label: '10' } as any,
    { type: '25', label: '25' } as any,
  ] as any,
};

// ──────────────────────────────────────────────────────────────────────────
// OVERVIEW STORIES (existing variants)
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Basic table',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: DEFAULT_SETTING, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '5 columns — `text` / `email` / `text` / `text` / `date`. Sortable on name / role / joined.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const RichColumns: Story = {
  name: 'Currency footer + sticky + sort',
  args: { type: 'default', columns: USER_COLUMNS_RICH, dataSource: wrap(USER_ROWS), setting: { ...DEFAULT_SETTING, defaultSort: { columnDef: 'amount', direction: 'desc' } }, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '`sticky:"start"`, `backgroundClass`, `setting.date.format`, `footer.showAsFooterValue` (renders sum in footer), `setting.defaultSort`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: { ...DEFAULT_SETTING, multiSelect: true }, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '`setting.multiSelect=true` — checkbox column + master toggle.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const SingleRowSelect: Story = {
  name: 'Single-row radio',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: { ...DEFAULT_SETTING, singleRowSelect: true }, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '`setting.singleRowSelect=true` — radio column.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const RowReorder: Story = {
  name: 'Row drag-and-drop',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: { ...DEFAULT_SETTING, rowArrange: true, pagination: false } },
  parameters: { docs: { description: { story: '`setting.rowArrange=true` — drag handle column + `(onRowDrop)`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const BusyState: Story = {
  name: 'Busy (skeleton)',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: [], setting: DEFAULT_SETTING, pageSizeList: PAGE_SIZE_LIST, isBusy: true },
  parameters: { docs: { description: { story: '`[isBusy]=true` — skeleton placeholder.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty state',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: [], setting: { ...DEFAULT_SETTING, totalItems: 0 }, pageSizeList: PAGE_SIZE_LIST, showDefaultEmptyContent: true },
  parameters: { docs: { description: { story: '`dataSource: []` + `showDefaultEmptyContent` — built-in empty state.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const StickyHeader: Story = {
  name: 'Sticky header (scroll viewport)',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap([...USER_ROWS, ...USER_ROWS, ...USER_ROWS, ...USER_ROWS]), setting: { ...DEFAULT_SETTING, pagination: false }, pageSizeList: PAGE_SIZE_LIST, tableHeight: '300px' },
  parameters: { docs: { description: { story: '`[tableHeight]="300px"` — scrolling viewport with sticky header.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const ClassicType: Story = {
  name: 'Classic visual flavor',
  args: { type: 'classic', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: DEFAULT_SETTING, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '`type="classic"` — older chrome.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const RowClick: Story = {
  name: 'Row click enabled',
  args: { type: 'default', columns: USER_COLUMNS_BASIC, dataSource: wrap(USER_ROWS), setting: { ...DEFAULT_SETTING, enableRowClick: true }, pageSizeList: PAGE_SIZE_LIST },
  parameters: { docs: { description: { story: '`setting.enableRowClick=true` → `(onClickRow)` fires per row.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

// ──────────────────────────────────────────────────────────────────────────
// DxTableColumnType GALLERY — one story per cell renderer
// ──────────────────────────────────────────────────────────────────────────

const cellSetting: DxTableSetting = { pagination: false };
const cellRender = (args: any) => ({ props: { type: 'default', setting: cellSetting, pageSizeList: undefined, ...args }, template: FULL_TEMPLATE });

export const ColTypeText: Story = {
  name: 'type: text',
  parameters: { docs: { description: { story: 'Plain string cell. Common for names / labels / identifiers.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name',   type: 'text', columnDef: 'name' },
      { title: 'Role',   field: 'role',   type: 'text', columnDef: 'role' },
      { title: 'Status', field: 'status', type: 'text', columnDef: 'status' },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeNumber: Story = {
  name: 'type: number',
  parameters: { docs: { description: { story: 'Right-aligned numeric cell.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name',   type: 'text',   columnDef: 'name' },
      { title: 'Amount', field: 'amount', type: 'number', columnDef: 'amount' },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeCurrency: Story = {
  name: 'type: currency',
  parameters: { docs: { description: { story: 'Currency-formatted cell via `setting.currency`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name',   type: 'text', columnDef: 'name' },
      { title: 'USD',    field: 'amount', type: 'currency', columnDef: 'usd', setting: { currency: { currencyCode: 'USD' } as any } },
      { title: 'EUR',    field: 'amount', type: 'currency', columnDef: 'eur', setting: { currency: { currencyCode: 'EUR' } as any } },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypePercentage: Story = {
  name: 'type: percentage',
  parameters: { docs: { description: { story: 'Percentage-formatted cell.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',     field: 'name',   type: 'text',       columnDef: 'name' },
      { title: 'Progress', field: 'amount' as any, type: 'percentage', columnDef: 'progress' },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Alpha', amount: 0.42 },
      { name: 'Beta',  amount: 0.78 },
      { name: 'Gamma', amount: 1 },
    ]),
  }),
};

export const ColTypeDate: Story = {
  name: 'type: date / datetime',
  parameters: { docs: { description: { story: '`date` shows `DD-MM-YYYY`; `datetime` adds the time portion. Format configurable via `setting.date.format`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name',   type: 'text',     columnDef: 'name' },
      { title: 'Joined', field: 'joined', type: 'date',     columnDef: 'joined' },
      { title: 'When',   field: 'joined', type: 'datetime', columnDef: 'when' },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeEmailContact: Story = {
  name: 'type: email + contact',
  parameters: { docs: { description: { story: '`email` → `mailto:` link with icon; `contact` → tel link.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',  field: 'name',  type: 'text',    columnDef: 'name' },
      { title: 'Email', field: 'email', type: 'email',   columnDef: 'email' },
      { title: 'Phone', field: 'phone' as any, type: 'contact', columnDef: 'phone' },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Ada',   email: 'ada@example.com',   phone: '+1 415 555 0100' },
      { name: 'Grace', email: 'grace@example.com', phone: '+1 415 555 0200' },
    ]),
  }),
};

export const ColTypeURL: Story = {
  name: 'type: URL + link',
  parameters: { docs: { description: { story: '`URL` shows a clickable external link; `link` resolves via per-row `DxTableData.link` settings (path / params / openInNewTab).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',    field: 'name',    type: 'text', columnDef: 'name' },
      { title: 'Website', field: 'website' as any, type: 'URL',  columnDef: 'website' },
      { title: 'Open',    field: 'name' as any,    type: 'link', columnDef: 'open' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Acme',   website: 'https://acme.example' },  link: { name: { displayLabel: 'View Acme',   path: '/accounts/1', openInNewTab: true,  type: 'external' } } },
      { data: { name: 'Globex', website: 'https://globex.example' }, link: { name: { displayLabel: 'View Globex', path: '/accounts/2', openInNewTab: false, type: 'internal' } } },
    ] as any,
  }),
};

export const ColTypeIconText: Story = {
  name: 'type: icon-text',
  parameters: { docs: { description: { story: 'Cell with a Material icon + text. `iconTextSetting` points at the field carrying the icon name.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Severity', field: 'label' as any, type: 'icon-text', columnDef: 'severity', iconTextSetting: 'icon' as any },
      { title: 'Reason',   field: 'reason' as any, type: 'text', columnDef: 'reason' },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { label: 'Critical', icon: 'error',    reason: 'API timeout' },
      { label: 'Warning',  icon: 'warning',  reason: 'High latency' },
      { label: 'Info',     icon: 'info',     reason: 'New deployment' },
    ]),
  }),
};

export const ColTypeAvatar: Story = {
  name: 'type: avatar + avatar_group',
  parameters: { docs: { description: { story: '`avatar` shows a single avatar from `DxTableData.ngDxAvatar[0]`; `avatar_group` renders multiple avatars (with "+N" overflow).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Owner', field: 'name',  type: 'avatar',       columnDef: 'owner', avatarType: 'avatar_with_text' },
      { title: 'Team',  field: 'team' as any, type: 'avatar_group', columnDef: 'team' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada', team: 'Platform' },        ngDxAvatar: [{ avatarName: 'Ada Lovelace' }, { avatarName: 'Grace Hopper' }, { avatarName: 'Linus Torvalds' }] },
      { data: { name: 'Grace', team: 'Compilers' },     ngDxAvatar: [{ avatarName: 'Grace Hopper' }, { avatarName: 'Margaret Hamilton' }] },
    ] as any,
  }),
};

export const ColTypeMultiChip: Story = {
  name: 'type: multi_chip + tag',
  parameters: { docs: { description: { story: '`multi_chip` renders chips from `DxTableData.multiChip[]` (color + icon per chip). `tag` renders status-style pills.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',       field: 'name', type: 'text',       columnDef: 'name' },
      { title: 'Skills',     field: 'name' as any, type: 'multi_chip', columnDef: 'skills' },
      { title: 'Status',     field: 'status' as any, type: 'tag', columnDef: 'status' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada',   status: 'Active' },   multiChip: [{ name: 'Angular', bgColor: '#dd0031', color: '#fff' }, { name: 'TS', bgColor: '#3178c6', color: '#fff' }] },
      { data: { name: 'Grace', status: 'On leave' }, multiChip: [{ name: 'Compilers', bgColor: '#16A085', color: '#fff' }] },
    ] as any,
  }),
};

export const ColTypeCheckbox: Story = {
  name: 'type: checkbox',
  parameters: { docs: { description: { story: 'Per-cell checkbox driven by the bound field.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name',   type: 'text',     columnDef: 'name' },
      { title: 'Active', field: 'active' as any, type: 'checkbox', columnDef: 'active' },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Ada',   active: true },
      { name: 'Grace', active: false },
      { name: 'Linus', active: true },
    ]),
  }),
};

export const ColTypeSlideToggle: Story = {
  name: 'type: slide-toggle',
  parameters: { docs: { description: { story: 'Slide toggle column. Per-row state and disable via `DxTableData.toggle: { checked, disable, label }`. Emits `(onToggleEventChange)`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',     field: 'name', type: 'text',         columnDef: 'name' },
      { title: 'Enabled',  field: 'name' as any, type: 'slide-toggle', columnDef: 'enabled' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada' },        toggle: { checked: true } },
      { data: { name: 'Grace' },      toggle: { checked: false } },
      { data: { name: 'Margaret' },   toggle: { checked: true, disable: true } },
    ] as any,
  }),
};

export const ColTypeAction: Story = {
  name: 'type: action / flat-action',
  parameters: { docs: { description: { story: '`action` exposes per-row actions via `actionType: ["edit","delete","expand","next","menu"]`. `flat-action` is a single inline button.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name', type: 'text',        columnDef: 'name' },
      { title: 'Actions',field: 'name' as any, type: 'action', columnDef: 'actions', actionType: ['edit', 'delete'] },
      { title: 'Open',   field: 'name' as any, type: 'flat-action', columnDef: 'flat', actionType: ['next'] },
    ] as DxTableColumn<any>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeMenu: Story = {
  name: 'type: menu + context-menu',
  parameters: { docs: { description: { story: '`menu` renders a per-row "⋮" menu populated from `menuOptions`. `context-menu` is right-click style (driven by `contextMenuSettings`).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',  field: 'name', type: 'text', columnDef: 'name' },
      { title: 'Menu',  field: 'pkId' as any, type: 'menu', columnDef: 'menu',
        menuOptions: [
          { event: 'view',   label: 'View',   icon: 'visibility' },
          { event: 'edit',   label: 'Edit',   icon: 'edit' },
          { event: 'delete', label: 'Delete', icon: 'delete' },
        ],
      },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeButton: Story = {
  name: 'type: button',
  parameters: { docs: { description: { story: 'Inline action button. Visibility + label per row via `DxTableData.button: BulkActions`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name', type: 'text',   columnDef: 'name' },
      { title: 'Action', field: 'name' as any, type: 'button', columnDef: 'action' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada' },   button: { show: true, label: 'Invite',  icon: 'send' } },
      { data: { name: 'Grace' }, button: { show: true, label: 'Resend',  icon: 'refresh' } },
      { data: { name: 'Linus' }, button: { show: false } },
    ] as any,
  }),
};

export const ColTypeProgressBar: Story = {
  name: 'progressBar flag (numeric + bar)',
  parameters: { docs: { description: { story: 'Set `column.progressBar=true` to render a progress bar alongside the numeric value. Color per row via `DxTableData.progressBar.color`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',     field: 'name',   type: 'text',   columnDef: 'name' },
      { title: 'Progress', field: 'pct' as any, type: 'number', columnDef: 'pct', progressBar: true },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Alpha', pct: 25 }, progressBar: { color: '#3498DB', show: true } },
      { data: { name: 'Beta',  pct: 64 }, progressBar: { color: '#16A085', show: true } },
      { data: { name: 'Gamma', pct: 92 }, progressBar: { color: '#E67E22', show: true } },
    ] as any,
  }),
};

export const ColTypeInputSelect: Story = {
  name: 'type: input + select (inline edit)',
  parameters: { docs: { description: { story: '`input` and `select` render editable cells. Per-row config via `DxTableData.input` / `selectSetting` (`disable`, `readonly`, `required`, options).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',  field: 'name',  type: 'text',  columnDef: 'name' },
      { title: 'Notes', field: 'notes' as any, type: 'input',  columnDef: 'notes' },
      { title: 'Role',  field: 'role' as any, type: 'select', columnDef: 'role' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada',   notes: 'On call this week', role: 'engineer' },
        input: { type: 'text' },
        selectSetting: { option: [{ label: 'Engineer', value: 'engineer' }, { label: 'Manager', value: 'manager' }] },
      },
      { data: { name: 'Grace', notes: '',                  role: 'manager'  },
        input: { type: 'text' },
        selectSetting: { option: [{ label: 'Engineer', value: 'engineer' }, { label: 'Manager', value: 'manager' }] },
      },
    ] as any,
  }),
};

export const ColTypeHtml: Story = {
  name: 'type: html / ONLY_HTML',
  parameters: { docs: { description: { story: 'Renders the field value as trusted HTML. Use sparingly.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name', type: 'text', columnDef: 'name' },
      { title: 'Rich',   field: 'html' as any, type: 'html', columnDef: 'html', htmlView: true },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Ada',   html: '<strong>Active</strong> <span style="color:#16A085">●</span>' },
      { name: 'Grace', html: '<em>On leave</em> <span style="color:#9E9E9E">●</span>' },
    ]),
  }),
};

export const ColTypeFile: Story = {
  name: 'type: file',
  parameters: { docs: { description: { story: 'File cell — displays a file thumbnail / name from `DxTableData.dxFiles.recordFile` (`FileCellDto`).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',    field: 'name', type: 'text', columnDef: 'name' },
      { title: 'Attach',  field: 'name' as any, type: 'file', columnDef: 'file' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada' },   dxFiles: { recordFile: { fileName: 'spec.pdf', fileOriginalName: 'design-spec.pdf', mimeType: 'application/pdf', size: 245_000, downloadUrl: '#' } } },
      { data: { name: 'Grace' }, dxFiles: { recordFile: { fileName: 'preview.png', fileOriginalName: 'preview.png', mimeType: 'image/png', size: 88_000, downloadUrl: '#' } } },
    ] as any,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// DxTableData PROPERTY GALLERY — per-row overrides
// ──────────────────────────────────────────────────────────────────────────

export const DataTooltip: Story = {
  name: 'data: tooltip per row',
  parameters: { docs: { description: { story: '`DxTableData.tooltip[field]: { message, bgColor, txtColor }` shows a tooltip on the matching cell.' } } },
  render: () => cellRender({
    columns: USER_COLUMNS_BASIC,
    dataSource: USER_ROWS.slice(0, 3).map(r => ({
      data: r,
      tooltip: { name: { message: `Owner since ${r.joined.toDateString()}`, bgColor: '#3498DB', txtColor: '#fff' } },
    })) as any,
  }),
};

export const DataDisabledRow: Story = {
  name: 'data: disabled / disableRow',
  parameters: { docs: { description: { story: '`DxTableData.disabled` dims a single cell; `DxTableData.disableRow` dims the entire row. Both accept `{ isDisabled, message }`.' } } },
  render: () => cellRender({
    columns: USER_COLUMNS_BASIC,
    dataSource: [
      { data: USER_ROWS[0] },
      { data: USER_ROWS[1], disableRow: { isDisabled: true, message: 'Row locked by policy' } },
      { data: USER_ROWS[2] },
      { data: USER_ROWS[3], disabled: { isDisabled: true, message: 'Awaiting approval' } },
    ] as any,
  }),
};

export const DataMultiCheckbox: Story = {
  name: 'data: multiCheckbox (per-row state)',
  parameters: { docs: { description: { story: 'Pre-checked rows + disabled checkboxes. Pair with `setting.multiSelect=true`.' } } },
  render: () => cellRender({
    columns: USER_COLUMNS_BASIC,
    setting: { multiSelect: true, pagination: false },
    dataSource: [
      { data: USER_ROWS[0], multiCheckbox: { checked: true } },
      { data: USER_ROWS[1] },
      { data: USER_ROWS[2], multiCheckbox: { disable: true, message: 'Inactive — can\'t select' } },
      { data: USER_ROWS[3], multiCheckbox: { checked: true } },
    ] as any,
  }),
};

export const DataRowHighlight: Story = {
  name: 'data: styleTableRowBg (highlight)',
  parameters: { docs: { description: { story: '`DxTableData.styleTableRowBg.isHighLightRow=true` flags VIP / focused rows with a background tint.' } } },
  render: () => cellRender({
    columns: USER_COLUMNS_BASIC,
    dataSource: USER_ROWS.slice(0, 4).map((r, i) => ({
      data: r,
      styleTableRowBg: { isHighLightRow: i === 1 || i === 3 },
    })) as any,
  }),
};

export const DataStatusReason: Story = {
  name: 'data: statusReasons',
  parameters: { docs: { description: { story: '`DxTableData.statusReasons[field]: { message, color, icon }` adds a side indicator + reason text to a cell.' } } },
  render: () => cellRender({
    columns: USER_COLUMNS_BASIC,
    dataSource: USER_ROWS.slice(0, 3).map((r, i) => ({
      data: r,
      statusReasons: i === 2
        ? { status: { message: 'Inactive — last login > 90d', color: '#EF5350', icon: 'warning' } }
        : undefined,
    })) as any,
  }),
};

export const DataMixedRich: Story = {
  name: 'data: mixed (everything per row)',
  parameters: { docs: { description: { story: 'Combines `multiCheckbox`, `toggle`, `tooltip`, `statusReasons`, `multiChip`, `disableRow`, and `styleTableRowBg` in a single dataset.' } } },
  render: () => cellRender({
    columns: [
      ...USER_COLUMNS_BASIC,
      { title: 'Skills',  field: 'name' as any,  type: 'multi_chip',   columnDef: 'skills' },
      { title: 'Enabled', field: 'name' as any,  type: 'slide-toggle', columnDef: 'enabled' },
    ] as DxTableColumn<any>[],
    setting: { multiSelect: true, pagination: false },
    dataSource: [
      { data: USER_ROWS[0],
        multiCheckbox: { checked: true },
        toggle: { checked: true },
        styleTableRowBg: { isHighLightRow: true },
        multiChip: [{ name: 'Angular', bgColor: '#dd0031', color: '#fff' }, { name: 'RxJS', bgColor: '#B7178C', color: '#fff' }],
        tooltip: { name: { message: 'Top contributor', bgColor: '#16A085', txtColor: '#fff' } },
      },
      { data: USER_ROWS[1],
        toggle: { checked: false, disable: true },
        multiChip: [{ name: 'Compilers', bgColor: '#16A085', color: '#fff' }],
      },
      { data: USER_ROWS[2],
        multiCheckbox: { disable: true, message: 'Inactive' },
        statusReasons: { status: { message: 'Last login > 90d', color: '#EF5350', icon: 'warning' } },
        multiChip: [{ name: 'Mainframes', bgColor: '#607D8B', color: '#fff' }],
      },
      { data: USER_ROWS[3],
        disableRow: { isDisabled: true, message: 'Pending review' },
        multiChip: [{ name: 'Kernels', bgColor: '#34495E', color: '#fff' }],
      },
    ] as any,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Remaining column-type variants
// ──────────────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { keyTt: 'draft',    valueTt: 'Draft',     color: '#9E9E9E' },
  { keyTt: 'pending',  valueTt: 'Pending',   color: '#F1C40F' },
  { keyTt: 'review',   valueTt: 'In review', color: '#F39C12' },
  { keyTt: 'active',   valueTt: 'Active',    color: '#2ECC71' },
  { keyTt: 'blocked',  valueTt: 'Blocked',   color: '#E74C3C' },
  { keyTt: 'archived', valueTt: 'Archived',  color: '#607D8B' },
];

export const ColTypeDropdown: Story = {
  name: 'type: dropdown (status with color)',
  parameters: { docs: { description: { story: 'Per-row status dropdown — options + color come from `DxTableData.dropdown[field]: TableKeyValueModel[]`. Selected entry\'s `color` paints the trigger; emits `(onEventChange)` on change.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Order',  field: 'order',  type: 'text',     columnDef: 'order' },
      { title: 'Status', field: 'status' as any, type: 'dropdown', columnDef: 'status' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { order: 'INV-1001', status: 'active' },   dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1002', status: 'pending' },  dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1003', status: 'blocked' },  dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1004', status: 'archived' }, dropdown: { status: STATUS_OPTIONS } },
    ] as any,
  }),
};

export const ColTypeFilledDropdown: Story = {
  name: 'type: filled_dropdown (status pill with color)',
  parameters: { docs: { description: { story: '`filled_dropdown` paints the entire trigger with the selected entry\'s `color` — a chunkier status pill. Options + colors come from `DxTableData.dropdown[field]`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Order',  field: 'order',  type: 'text',            columnDef: 'order' },
      { title: 'Status', field: 'status' as any, type: 'filled_dropdown', columnDef: 'status', setting: { dropdown: { blinking: false } } },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { order: 'INV-1001', status: 'active' },   dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1002', status: 'pending' },  dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1003', status: 'review' },   dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1004', status: 'draft' },    dropdown: { status: STATUS_OPTIONS } },
      { data: { order: 'INV-1005', status: 'blocked' },  dropdown: { status: STATUS_OPTIONS } },
    ] as any,
  }),
};

export const ColTypeInlineDropdown: Story = {
  name: 'type: inline-dropdown',
  parameters: { docs: { description: { story: 'Inline editable dropdown that displays the current value as text and reveals the dropdown on click. Wire options via `column.inlineDropdownSetting` (field name carrying options).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',  field: 'name', type: 'text',            columnDef: 'name' },
      { title: 'Role',  field: 'role' as any, type: 'inline-dropdown', columnDef: 'role', inlineDropdownSetting: 'roleOptions' as any },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Ada',   role: 'engineer',  roleOptions: [{ keyTt: 'engineer', valueTt: 'Engineer' }, { keyTt: 'manager',  valueTt: 'Manager' }] },
      { name: 'Grace', role: 'architect', roleOptions: [{ keyTt: 'engineer', valueTt: 'Engineer' }, { keyTt: 'architect',valueTt: 'Architect' }] },
    ]),
  }),
};

export const ColTypeContextMenu: Story = {
  name: 'type: context-menu',
  parameters: { docs: { description: { story: 'Standalone context-menu cell — the column owns the trigger styling. Per-row `DxTableData.contextMenuSetting: { label, class, color, dropDown? }` controls the chip text + theme.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name', field: 'name', type: 'text',         columnDef: 'name' },
      { title: 'Tier', field: 'name' as any, type: 'context-menu', columnDef: 'tier' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { name: 'Ada' },   contextMenuSetting: { label: 'Gold',     color: '#F1C40F' } },
      { data: { name: 'Grace' }, contextMenuSetting: { label: 'Platinum', color: '#3498DB' } },
      { data: { name: 'Linus' }, contextMenuSetting: { label: 'Silver',   color: '#95A5A6' } },
    ] as any,
  }),
};

export const ColTypeHoveMenu: Story = {
  name: 'type: hove-menu (hover menu)',
  parameters: { docs: { description: { story: 'Hover-triggered menu (source typo: `hove-menu`). Same `menuOptions` shape as `menu` but the menu reveals on hover instead of click.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name', field: 'name', type: 'text',     columnDef: 'name' },
      { title: 'More', field: 'pkId' as any, type: 'hove-menu', columnDef: 'more',
        menuOptions: [
          { event: 'view',    label: 'View details',  icon: 'visibility' },
          { event: 'archive', label: 'Archive',       icon: 'archive' },
        ],
      },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeLookup: Story = {
  name: 'type: lookup',
  parameters: { docs: { description: { story: 'Lookup cell — opens a popover / drawer for the linked entity. Per-row config via `DxTableData.lookup[field]: { displayValue, path, displayPopoverConfig, avatar }`. Clicking emits `(onClickLookupLink)`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Order',    field: 'order',    type: 'text',   columnDef: 'order' },
      { title: 'Customer', field: 'customer' as any, type: 'lookup', columnDef: 'customer' },
    ] as DxTableColumn<any>[],
    dataSource: [
      { data: { order: 'INV-1001', customer: 'acme' },   lookup: { customer: { displayValue: 'Acme Inc.',    path: '/customers/1' } } },
      { data: { order: 'INV-1002', customer: 'globex' }, lookup: { customer: { displayValue: 'Globex Corp.', path: '/customers/2' } } },
      { data: { order: 'INV-1003', customer: 'initech' },lookup: { customer: { displayValue: 'Initech',      path: '/customers/3' } } },
    ] as any,
  }),
};

export const ColTypeServiceData: Story = {
  name: 'type: service_data',
  parameters: { docs: { description: { story: 'Cell that lazily fetches its display value from a service. Use `column.contextMenuSettings: { url, method, data }` to point at an endpoint — the cell shows a skeleton until the response resolves. In Storybook (no backend) the cell remains in its skeleton state — included so the type appears in the gallery.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',     field: 'name', type: 'text',         columnDef: 'name' },
      { title: 'External', field: 'pkId' as any, type: 'service_data', columnDef: 'external',
        contextMenuSettings: { url: '/api/sample/enrich', method: 'GET' } as any,
      },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

export const ColTypeEditRow: Story = {
  name: 'type: edit-row',
  parameters: { docs: { description: { story: '`edit-row` puts an "edit" trigger on the row that swaps the row into inline-edit mode. Pair with `DxTableData.isEditable=true`. Emits `(onClickEditRow)`.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',  field: 'name',  type: 'text',     columnDef: 'name' },
      { title: 'Email', field: 'email', type: 'email',    columnDef: 'email' },
      { title: 'Edit',  field: 'pkId' as any, type: 'edit-row', columnDef: 'edit' },
    ] as DxTableColumn<User>[],
    dataSource: USER_ROWS.slice(0, 3).map(r => ({ data: r, isEditable: true })) as any,
  }),
};

export const ColTypeOnlyHtml: Story = {
  name: 'type: ONLY_HTML',
  parameters: { docs: { description: { story: '`ONLY_HTML` skips all wrapper chrome and dumps the field as raw HTML — useful for cells that need full control (icons + inline elements + microcopy).' } } },
  render: () => cellRender({
    columns: [
      { title: 'Item',   field: 'name', type: 'text',      columnDef: 'name' },
      { title: 'Status', field: 'html' as any, type: 'ONLY_HTML', columnDef: 'html' },
    ] as DxTableColumn<any>[],
    dataSource: wrap([
      { name: 'Build #421', html: '<span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:8px; height:8px; border-radius:50%; background:#2ECC71;"></span>Passing</span>' },
      { name: 'Build #420', html: '<span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:8px; height:8px; border-radius:50%; background:#E74C3C;"></span>Failed: 3 specs</span>' },
      { name: 'Build #419', html: '<span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:8px; height:8px; border-radius:50%; background:#F1C40F;"></span>Flaky</span>' },
    ]),
  }),
};

export const ColTypeCustom: Story = {
  name: 'type: custom (dynamic component)',
  parameters: { docs: { description: { story: '`type: "custom"` lets you mount any Angular component as the cell renderer via `column.component: Type<any>`. The cell instantiates the component for each row and passes the row data in. Useful for one-off bespoke widgets that don\'t fit any of the built-in types. In Storybook this is a placeholder for the technique — most teams use it sparingly.' } } },
  render: () => cellRender({
    columns: [
      { title: 'Name',   field: 'name', type: 'text',   columnDef: 'name' },
      { title: 'Custom', field: 'name' as any, type: 'custom', columnDef: 'custom' },
    ] as DxTableColumn<User>[],
    dataSource: wrap(USER_ROWS.slice(0, 3)),
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// DxTableSetting GALLERY — one story per setting flag
// ──────────────────────────────────────────────────────────────────────────

const settingRender = (setting: Partial<DxTableSetting>, extra: Partial<{ pageSizeList: BulkActions; tableHeight: string }> = {}) => ({
  props: {
    type: 'default',
    columns: USER_COLUMNS_BASIC,
    dataSource: wrap(USER_ROWS),
    setting: { pagination: false, ...setting },
    pageSizeList: extra.pageSizeList,
    tableHeight: extra.tableHeight,
    isBusy: false,
  },
  template: FULL_TEMPLATE,
});

const SAMPLE_BULK_ACTIONS: BulkActions = {
  type: 'mini-btn',
  show: true,
  label: 'Bulk',
  icon: 'tune',
  actions: [
    { type: 'export', label: 'Export CSV', icon: 'download' },
    { type: 'archive', label: 'Archive selected', icon: 'archive' },
    { type: 'delete',  label: 'Delete selected',  icon: 'delete', color: '#EF5350' },
  ],
};

const LEFT_DROPDOWN: BulkActions = {
  type: 'mini-btn',
  show: true,
  label: 'All users',
  icon: 'filter_list',
  actions: [
    { type: 'all',      label: 'All users' },
    { type: 'active',   label: 'Active only' },
    { type: 'inactive', label: 'Inactive only' },
  ],
};

export const SettingPagination: Story = {
  name: 'setting: pagination',
  parameters: { docs: { description: { story: '`pagination: true` + `pageSize` + `totalItems` enable the bottom pager.' } } },
  render: () => settingRender({ pagination: true, pageSize: 5, totalItems: 25, paginationFirstLastButtons: true }, { pageSizeList: PAGE_SIZE_LIST }),
};

export const SettingPaginatorFirstLast: Story = {
  name: 'setting: paginationFirstLastButtons',
  parameters: { docs: { description: { story: 'Adds "first" / "last" buttons to the paginator alongside next / previous.' } } },
  render: () => settingRender({ pagination: true, paginationFirstLastButtons: true, pageSize: 2, totalItems: 25 }, { pageSizeList: PAGE_SIZE_LIST }),
};

export const SettingHidePageSize: Story = {
  name: 'setting: isHidePageSizeSelection',
  parameters: { docs: { description: { story: 'Hides the page-size dropdown but keeps the rest of the paginator chrome.' } } },
  render: () => settingRender({ pagination: true, isHidePageSizeSelection: true, pageSize: 5, totalItems: 25 }),
};

export const SettingDefaultSort: Story = {
  name: 'setting: defaultSort',
  parameters: { docs: { description: { story: '`defaultSort: { columnDef, direction }` applies an initial sort on first render.' } } },
  render: () => settingRender({ defaultSort: { columnDef: 'name', direction: 'asc' } }),
};

export const SettingColumnDefaultSorts: Story = {
  name: 'setting: columnDefaultSorts',
  parameters: { docs: { description: { story: '`columnDefaultSorts: Record<columnDef, "asc" | "desc">` — per-column default sort directions (first non-empty entry wins).' } } },
  render: () => settingRender({ columnDefaultSorts: { joined: 'desc' } }),
};

export const SettingMultiSelect: Story = {
  name: 'setting: multiSelect',
  parameters: { docs: { description: { story: '`multiSelect: true` adds the checkbox column.' } } },
  render: () => settingRender({ multiSelect: true }),
};

export const SettingMultiSelectLabel: Story = {
  name: 'setting: multiSelectWithLabel',
  parameters: { docs: { description: { story: '`multiSelectWithLabel: "Select"` shows a label next to the master checkbox in the header.' } } },
  render: () => settingRender({ multiSelect: true, multiSelectWithLabel: 'Select' }),
};

export const SettingSingleRowSelect: Story = {
  name: 'setting: singleRowSelect',
  parameters: { docs: { description: { story: 'Radio column — only one row is selectable.' } } },
  render: () => settingRender({ singleRowSelect: true }),
};

export const SettingMultiRowSelect: Story = {
  name: 'setting: multiRowSelect',
  parameters: { docs: { description: { story: '`multiRowSelect: true` — multiple rows selectable via click; emits `(onRowSelection)` with the accumulated selection.' } } },
  render: () => settingRender({ multiRowSelect: true, enableRowClick: true }),
};

export const SettingRowArrange: Story = {
  name: 'setting: rowArrange',
  parameters: { docs: { description: { story: '`rowArrange: true` adds drag handles. Reordering emits `(onRowDrop)`.' } } },
  render: () => settingRender({ rowArrange: true }),
};

export const SettingColArrange: Story = {
  name: 'setting: colArrange',
  parameters: { docs: { description: { story: '`colArrange: true` enables column drag-and-drop reorder on the header row.' } } },
  render: () => settingRender({ colArrange: true }),
};

export const SettingResize: Story = {
  name: 'setting: resize',
  parameters: { docs: { description: { story: '`resize: true` enables drag-resize handles between header cells.' } } },
  render: () => settingRender({ resize: true }),
};

export const SettingEnableRowClick: Story = {
  name: 'setting: enableRowClick',
  parameters: { docs: { description: { story: 'Whole-row click → `(onClickRow)` fires with the row data.' } } },
  render: () => settingRender({ enableRowClick: true }),
};

export const SettingLeftActions: Story = {
  name: 'setting: leftActions',
  parameters: { docs: { description: { story: '`leftActions: MenuAction[]` renders action buttons on the left of the table header row.' } } },
  render: () => settingRender({
    leftActions: [
      { type: 'refresh',  label: 'Refresh', icon: 'refresh' },
      { type: 'export',   label: 'Export',  icon: 'download' },
    ],
  }),
};

export const SettingRightActions: Story = {
  name: 'setting: rightActions',
  parameters: { docs: { description: { story: '`rightActions: MenuAction[]` renders buttons on the right of the header.' } } },
  render: () => settingRender({
    rightActions: [
      { type: 'create', label: 'New user', icon: 'add' },
      { type: 'filter', label: 'Filter',   icon: 'filter_list' },
    ],
  }),
};

export const SettingBulkActions: Story = {
  name: 'setting: bulkActions',
  parameters: { docs: { description: { story: '`bulkActions: BulkActions` appears above the table when multi-select is on — usually used for export / archive / delete selected.' } } },
  render: () => settingRender({ multiSelect: true, bulkActions: SAMPLE_BULK_ACTIONS }),
};

export const SettingLeftDropdown: Story = {
  name: 'setting: leftDropDown (filter)',
  parameters: { docs: { description: { story: '`leftDropDown: BulkActions` puts a filter / scope dropdown in the top-left — emits `(onLeftDropDownSearch)`.' } } },
  render: () => settingRender({ leftDropDown: LEFT_DROPDOWN }),
};

export const SettingMultiActionButton: Story = {
  name: 'setting: multiActionButtonSettings',
  parameters: { docs: { description: { story: 'Primary "+ New" style button with a dropdown of secondary creation paths.' } } },
  render: () => settingRender({
    multiActionButtonSettings: {
      title: 'New user',
      type: 'create',
      show: true,
      class: 'dxBtn',
      multiActionDropDown: {
        show: true,
        menuList: [
          { label: 'Invite by email', event: 'invite' },
          { label: 'Bulk import',     event: 'import' },
        ],
      },
    } as any,
  }),
};

export const SettingPaginatorMultiSelect: Story = {
  name: 'setting: paginatorMultiSelect',
  parameters: { docs: { description: { story: '`paginatorMultiSelect: true` adds a multi-select column on the paginator bar (used for paginator-scoped bulk actions).' } } },
  render: () => settingRender({ pagination: true, paginatorMultiSelect: true, pageSize: 5, totalItems: 25 }, { pageSizeList: PAGE_SIZE_LIST }),
};

export const SettingTabsConfig: Story = {
  name: 'setting: tabConfig (tabs / pills / options)',
  parameters: { docs: { description: { story: '`tabConfig: { type, tabs, activeTab, scrollMode }` adds a tab strip above the table. `type` can be `tabs`, `pills`, `options`, `wrapped`, or `slider`.' } } },
  render: () => settingRender({
    tabConfig: {
      type: 'pills',
      activeTab: 'all',
      tabs: [
        { event: 'all',      tabName: 'All',      tabID: 'all' },
        { event: 'active',   tabName: 'Active',   tabID: 'active' },
        { event: 'inactive', tabName: 'Inactive', tabID: 'inactive' },
        { event: 'archived', tabName: 'Archived', tabID: 'archived', disable: true },
      ],
    },
  }),
};

export const SettingTabsSliderMode: Story = {
  name: 'setting: tabConfig type=slider',
  parameters: { docs: { description: { story: '`tabConfig.type: "slider"` uses the slider tab style.' } } },
  render: () => settingRender({
    tabConfig: {
      type: 'slider',
      activeTab: 'active',
      tabs: [
        { event: 'all',      tabName: 'All',      tabID: 'all' },
        { event: 'active',   tabName: 'Active',   tabID: 'active' },
        { event: 'inactive', tabName: 'Inactive', tabID: 'inactive' },
      ],
    },
  }),
};

export const SettingEnableUI: Story = {
  name: 'setting: enableUI (toolbar enabled)',
  parameters: { docs: { description: { story: '`enableUI: true` keeps the toolbar / actions / paginator chrome wired up. Default is `true` for most surfaces.' } } },
  render: () => settingRender({ enableUI: true, pagination: true, pageSize: 5, totalItems: 25 }, { pageSizeList: PAGE_SIZE_LIST }),
};

export const SettingPageIndex: Story = {
  name: 'setting: pageIndex (initial page)',
  parameters: { docs: { description: { story: '`pageIndex: 1` starts on page 2 instead of page 1.' } } },
  render: () => settingRender({ pagination: true, pageSize: 2, totalItems: 25, pageIndex: 1, paginationFirstLastButtons: true }, { pageSizeList: PAGE_SIZE_LIST }),
};

export const SettingFullToolbar: Story = {
  name: 'setting: full toolbar (all flags)',
  parameters: { docs: { description: { story: 'Stress-test combining `leftDropDown`, `leftActions`, `rightActions`, `bulkActions`, `multiActionButtonSettings`, `multiSelect`, `tabConfig`, pagination, default sort.' } } },
  render: () => settingRender({
    multiSelect: true,
    pagination: true,
    pageSize: 5,
    totalItems: 25,
    paginationFirstLastButtons: true,
    defaultSort: { columnDef: 'name', direction: 'asc' },
    leftDropDown: LEFT_DROPDOWN,
    leftActions:  [{ type: 'refresh', label: 'Refresh', icon: 'refresh' }],
    rightActions: [{ type: 'export',  label: 'Export',  icon: 'download' }],
    bulkActions: SAMPLE_BULK_ACTIONS,
    multiActionButtonSettings: {
      title: 'New user', type: 'create', show: true, class: 'dxBtn',
      multiActionDropDown: { show: true, menuList: [{ label: 'Invite', event: 'invite' }] },
    } as any,
    tabConfig: {
      type: 'tabs',
      activeTab: 'all',
      tabs: [
        { event: 'all', tabName: 'All', tabID: 'all' },
        { event: 'active', tabName: 'Active', tabID: 'active' },
      ],
    },
  }, { pageSizeList: PAGE_SIZE_LIST }),
};

