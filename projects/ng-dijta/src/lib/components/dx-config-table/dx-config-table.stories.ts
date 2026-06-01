import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of, type Observable } from 'rxjs';
import { DxConfigTableComponent } from './dx-config-table.component';
import { DxConfigTableModule } from './dx-config-table.module';
import { TableServiceService } from './table-service.service';
import type { DxTableConfig } from './model/dx-config-table';

const meta: Meta<any> = {
  title: 'Data Display/Config Table',
  component: DxConfigTableComponent,
  decorators: [
    moduleMetadata({ imports: [DxConfigTableModule] }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Server-driven `dx-table` — fetches its column / setting / pagination / filter config ' +
          'from `[configUrl]`, then loads page data from the returned `tableConfig.dataUrl`. ' +
          'In Storybook the `TableServiceService` is stubbed so each story can show what the ' +
          'rendered table looks like for a given JSON config without standing up a backend.',
      },
    },
  },
  argTypes: {
    configUrl: { control: 'text', description: 'Endpoint that returns a `DxTableConfig<T>` payload.' },
    onAction: { action: 'onAction' },
    onFilterClick: { action: 'onFilterClick' },
    onCheckboxChange: { action: 'onCheckboxChange' },
  },
  args: {
    configUrl: '/api/sample/table-config',
  },
};

export default meta;
type Story = StoryObj<any>;

// ──────────────────────────────────────────────────────────────────────────
// Canned config + data payloads (what the live API would return)
// ──────────────────────────────────────────────────────────────────────────

const USERS_PAGE = {
  content: [
    { pkId: 1, name: 'Ada Lovelace',      email: 'ada@example.com',     status: 'Active',   role: 'Engineer', joined: '2024-01-15' },
    { pkId: 2, name: 'Grace Hopper',      email: 'grace@example.com',   status: 'Active',   role: 'Architect', joined: '2024-02-08' },
    { pkId: 3, name: 'Margaret Hamilton', email: 'margaret@example.com',status: 'Inactive', role: 'Engineer', joined: '2023-11-22' },
    { pkId: 4, name: 'Linus Torvalds',    email: 'linus@example.com',   status: 'Active',   role: 'Maintainer',joined: '2024-03-01' },
    { pkId: 5, name: 'Brendan Eich',      email: 'brendan@example.com', status: 'Active',   role: 'Engineer', joined: '2024-04-12' },
  ],
  totalElements: 42,
  size: 10,
};

const USERS_CONFIG: DxTableConfig<any> = {
  tableConfig: {
    dataUrl: '/api/sample/users',
    col: [
      { field: 'name',   title: 'Name',   type: 'text',   columnDef: 'name',   sortable: true },
      { field: 'email',  title: 'Email',  type: 'email',  columnDef: 'email' },
      { field: 'role',   title: 'Role',   type: 'text',   columnDef: 'role',   sortable: true },
      { field: 'status', title: 'Status', type: 'text',   columnDef: 'status' },
      { field: 'joined', title: 'Joined', type: 'date',   columnDef: 'joined', sortable: true },
    ],
    setting: { totalItems: 42, pageSize: 10 } as any,
    pageable: { pageNo: 0, pageSize: 10 },
  },
};

const ORDERS_PAGE = {
  content: [
    { pkId: 1001, order: 'INV-1001', customer: 'Acme Inc.',    amount: 12450, status: 'Paid',    placed: '2026-04-12' },
    { pkId: 1002, order: 'INV-1002', customer: 'Globex Corp.', amount: 8200,  status: 'Pending', placed: '2026-04-18' },
    { pkId: 1003, order: 'INV-1003', customer: 'Initech',      amount: 540,   status: 'Refunded',placed: '2026-04-20' },
    { pkId: 1004, order: 'INV-1004', customer: 'Soylent Corp.',amount: 22000, status: 'Paid',    placed: '2026-04-25' },
  ],
  totalElements: 18,
  size: 10,
};

const ORDERS_CONFIG: DxTableConfig<any> = {
  tableConfig: {
    dataUrl: '/api/sample/orders',
    col: [
      { field: 'order',    title: 'Order',    type: 'text',     columnDef: 'order',    sortable: true },
      { field: 'customer', title: 'Customer', type: 'text',     columnDef: 'customer' },
      { field: 'amount',   title: 'Amount',   type: 'currency', columnDef: 'amount',   sortable: true } as any,
      { field: 'status',   title: 'Status',   type: 'text',     columnDef: 'status' },
      { field: 'placed',   title: 'Placed',   type: 'date',     columnDef: 'placed',   sortable: true },
    ],
    setting: { totalItems: 18, pageSize: 10 } as any,
    pageable: { pageNo: 0, pageSize: 10 },
  },
};

const EMPTY_CONFIG: DxTableConfig<any> = {
  tableConfig: {
    dataUrl: '/api/sample/empty',
    col: [
      { field: 'name', title: 'Name', type: 'text', columnDef: 'name' },
    ],
    setting: { totalItems: 0, pageSize: 10 } as any,
    pageable: { pageNo: 0, pageSize: 10 },
  },
};

const EMPTY_PAGE = { content: [], totalElements: 0, size: 10 };

// ──────────────────────────────────────────────────────────────────────────
// Stub service factory — returns config / page based on the URL the
// component asks for, so each story can pick its dataset by simply choosing
// a `configUrl` arg.
// ──────────────────────────────────────────────────────────────────────────

class StubTableService {
  private readonly registry: Record<string, { config: DxTableConfig<any>; page: any }> = {
    '/api/sample/table-config': { config: USERS_CONFIG,  page: USERS_PAGE },
    '/api/sample/users':        { config: USERS_CONFIG,  page: USERS_PAGE },
    '/api/sample/orders-config':{ config: ORDERS_CONFIG, page: ORDERS_PAGE },
    '/api/sample/orders':       { config: ORDERS_CONFIG, page: ORDERS_PAGE },
    '/api/sample/empty-config': { config: EMPTY_CONFIG,  page: EMPTY_PAGE },
    '/api/sample/empty':        { config: EMPTY_CONFIG,  page: EMPTY_PAGE },
  };

  private match(url: string) {
    if (!url) return this.registry['/api/sample/table-config'];
    // strip any query string the generic service appended
    const base = url.split('?')[0];
    return this.registry[base] ?? this.registry['/api/sample/table-config'];
  }

  getTableConfig(url: string): Observable<DxTableConfig<any>> {
    return of(this.match(url).config);
  }

  getTableData(url: string): Observable<any> {
    return of(this.match(url).page);
  }
}

const stubServiceDecorator = moduleMetadata({
  providers: [{ provide: TableServiceService, useClass: StubTableService }],
});

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box;">
    <dx-config-table
      [configUrl]="configUrl"
      (onAction)="onAction($event)"
      (onFilterClick)="onFilterClick($event)"
      (onCheckboxChange)="onCheckboxChange($event)">
    </dx-config-table>
  </div>
`;

export const Default: Story = {
  name: 'Users table',
  decorators: [stubServiceDecorator],
  args: { configUrl: '/api/sample/table-config' },
  parameters: {
    docs: {
      description: {
        story: '5-column user table — name (sortable), email, role (sortable), status, joined (sortable). Stubbed config returns 5 rows with 42 total elements.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const OrdersTable: Story = {
  name: 'Orders table (currency column)',
  decorators: [stubServiceDecorator],
  args: { configUrl: '/api/sample/orders-config' },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a currency-typed column alongside text + date columns.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty state',
  decorators: [stubServiceDecorator],
  args: { configUrl: '/api/sample/empty-config' },
  parameters: {
    docs: {
      description: {
        story: '`content: []` — the underlying `dx-table` shows its empty state.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
